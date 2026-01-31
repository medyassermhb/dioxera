import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import { sendMail } from '@/lib/mail';
import { generateInvoicePDF } from '@/lib/generateInvoiceServer';
import { getStripeSuccessEmail, getAdminOrderEmail } from '@/lib/email-templates';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { session_id } = await req.json();

    if (!session_id) {
      return NextResponse.json({ error: "Missing Session ID" }, { status: 400 });
    }

    // 1. Retrieve the Session from Stripe to verify payment
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent'],
    });

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    // 2. Check if Order already exists in Supabase to prevent duplicates
    const { data: existing } = await supabase
      .from('orders')
      .select('id')
      .eq('stripe_session_id', session_id)
      .single();

    if (existing) {
      return NextResponse.json({ success: true, message: "Order already processed" });
    }

    // 3. Prepare Order Data
    const customerEmail = session.customer_details?.email || "";
    const customerName = session.customer_details?.name || "Valued Customer";
    const amountTotal = (session.amount_total || 0) / 100; // Convert cents to Euro

    // 4. Save to Database (THIS DEFINES THE 'order' VARIABLE)
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        customer_email: customerEmail,
        customer_details: {
          name: customerName,
          email: customerEmail,
          address: session.customer_details?.address,
        },
        items: session.line_items?.data || [], 
        total_amount: amountTotal,
        payment_method: 'stripe',
        status: 'paid',
        stripe_session_id: session_id
      })
      .select()
      .single();

    if (error) throw error;

    // 5. Generate PDF Invoice
    let attachments = [];
    try {
      const pdfBuffer = await generateInvoicePDF(order);
      attachments.push({
        filename: `Dioxera_Invoice_${order.id.slice(0, 8)}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      });
    } catch (e) {
      console.error("PDF Generation Failed:", e);
    }

    // 6. Send Professional Email to Customer
    await sendMail({
      to: customerEmail,
      subject: `Order Confirmed: #${order.id.slice(0, 8).toUpperCase()}`,
      html: getStripeSuccessEmail(customerName, order.id.slice(0, 8).toUpperCase(), amountTotal),
      attachments
    });

    // 7. Send Notification to Admin
    if (process.env.ADMIN_EMAIL) {
      await sendMail({
        to: process.env.ADMIN_EMAIL,
        subject: `[New Order] €${amountTotal} (Stripe)`,
        html: getAdminOrderEmail(order.id, amountTotal, 'stripe', customerEmail),
        attachments
      });
    }

    return NextResponse.json({ success: true, orderId: order.id });

  } catch (error: any) {
    console.error("Stripe Verify Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}