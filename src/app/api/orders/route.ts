import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendOrderConfirmation } from '@/lib/sendOrderEmail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customer, email, total, method, shipping_cost } = body;

    // 1. Setup Admin Client
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ success: false, error: "Server Config Error" }, { status: 500 });
    }
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 2. Insert Order
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .insert({
        customer_email: email,
        customer_details: customer,
        items: items,
        total_amount: total,
        shipping_cost: shipping_cost,
        payment_method: method,
        payment_status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase Error:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // 3. SEND EMAIL (Use AWAIT here!)
    console.log("👉 Triggering email send...");
    await sendOrderConfirmation(order); 

    return NextResponse.json({ success: true, orderId: order.id });

  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}