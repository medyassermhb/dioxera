import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendOrderConfirmation } from "@/lib/sendOrderEmail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { details, items, email, customer, total, shipping_cost } = body;

    // 1. Verify Payment (Basic check: did PayPal give us an ID?)
    if (!details.id || details.status !== 'COMPLETED') {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    // 2. Setup Admin Client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 3. Save Order to Supabase
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .insert({
        customer_email: email,
        // Removed the duplicate 'customer_details: customer' line here
        items: items,
        total_amount: total,
        shipping_cost: shipping_cost,
        payment_method: 'paypal',
        payment_status: 'paid', 
        // We only keep this one, which adds the Transaction ID to the details
        customer_details: { ...customer, paypal_transaction_id: details.id } 
      })
      .select()
      .single();

    if (error) throw error;

    // 4. Send Confirmation Email
    console.log("👉 PayPal Order Saved. Sending Email...");
    await sendOrderConfirmation(order);

    return NextResponse.json({ success: true, orderId: order.id });

  } catch (err: any) {
    console.error("PayPal API Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}