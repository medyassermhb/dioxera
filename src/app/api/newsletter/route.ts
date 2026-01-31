import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendNewsletterWelcome } from '@/lib/sendGeneralEmail';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    console.log("📨 Newsletter Request for:", email);

    // 1. Check for Service Key
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("❌ MISSING KEY: SUPABASE_SERVICE_ROLE_KEY is undefined.");
      return NextResponse.json({ success: false, error: 'Server Config Error' }, { status: 500 });
    }

    // 2. Init Admin Client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 3. Insert into DB
    const { error } = await supabaseAdmin
      .from('subscribers')
      .insert({ email })

    if (error) {
      console.error("❌ Database Error:", error.message);
      console.error("   Hint: Did you run the SQL to create the 'subscribers' table?");
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // 4. Send Email
    console.log("👉 Sending Welcome Email...");
    const emailSent = await sendNewsletterWelcome(email);
    
    if (!emailSent) {
      console.warn("⚠️ Database saved, but email failed to send (Check SMTP config).");
      // We still return success because the subscription worked
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("❌ CRITICAL SERVER ERROR:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}