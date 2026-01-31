import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { sendOrderConfirmation } from '@/lib/sendOrderEmail';

// FIX: Updated apiVersion to match your installed library
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
apiVersion: "2026-01-28.clover",
}); 
// Note: If you get an error again, copy the EXACT string the error asks for (e.g., "2026-01-28.clover") 
// and paste it above. But usually, "2025-02-24.acacia" is the standard stable one right now.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, email, customer, shipping_cost } = body;

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Create Order
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_email: email,
        customer_details: customer,
        items: items,
        total_amount: body.total,
        shipping_cost: shipping_cost,
        payment_method: "stripe",
        payment_status: "pending", 
      })
      .select()
      .single();

    if (orderError) {
      return NextResponse.json({ error: "Could not create order" }, { status: 500 });
    }

    // 2. SEND EMAIL
    console.log("👉 Triggering Stripe email send...");
    await sendOrderConfirmation(order);

    // 3. Create Stripe Session
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    if (shipping_cost > 0) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: { name: "Express Shipping" },
          unit_amount: Math.round(shipping_cost * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success?method=stripe&id=${order.id}`,
      cancel_url: `${req.headers.get("origin")}/checkout`,
      customer_email: email,
      metadata: { orderId: order.id },
    });

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}