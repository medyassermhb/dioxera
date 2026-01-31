import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendStatusUpdateEmail } from '@/lib/sendOrderEmail';

export async function POST(req: NextRequest) {
  try {
    const { orderId, newStatus, adminEmail } = await req.json();

    // 1. Security Check (Basic)
    if (adminEmail !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 2. Update Database
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .update({ payment_status: newStatus })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;

    // 3. Send Email Notification
    console.log(`👉 Order ${orderId} status changed to ${newStatus}. Sending email...`);
    await sendStatusUpdateEmail(order, newStatus);

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("Update Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}