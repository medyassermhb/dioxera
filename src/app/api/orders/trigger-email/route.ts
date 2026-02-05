import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendOrderConfirmation } from "@/lib/sendOrderEmail";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Missing Order ID" }, { status: 400 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Fetch the Order
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 2. Optional: Mark as Paid (Since they reached success page)
    if (order.payment_status === 'pending') {
       await supabaseAdmin
        .from("orders")
        .update({ payment_status: 'paid' })
        .eq("id", orderId);
        
       // Update local object for email
       order.payment_status = 'paid';
    }

    // 3. Send Email
    console.log(`📧 Triggering success email for order ${orderId}`);
    await sendOrderConfirmation(order);

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Email Trigger Error:", err);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}