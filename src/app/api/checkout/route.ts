// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
// REMOVED: import { sendOrderConfirmation } from '@/lib/sendOrderEmail'; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover", // Use the version matching your install
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, email, customer, shipping_cost } = body;

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Create Order (Status: PENDING)
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_email: email,
        customer_details: customer,
        items: items,
        total_amount: body.total,
        shipping_cost: shipping_cost,
        payment_method: "stripe",
        payment_status: "pending", // <--- Important: Starts as pending
      })
      .select()
      .single();

    if (orderError) {
      return NextResponse.json({ error: "Could not create order" }, { status: 500 });
    }

    // ❌ DELETED: await sendOrderConfirmation(order); 
    // We do NOT send email here anymore. We wait for the Webhook.

    // 2. Create Stripe Session
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
      metadata: { orderId: order.id }, // <--- We need this ID for the webhook
    });

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}