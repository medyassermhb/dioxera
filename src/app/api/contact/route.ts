import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmails } from '@/lib/sendGeneralEmail';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // 1. Basic Validation
    if (!email || !message || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Save to Supabase (contact_submissions table)
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          subject: subject || 'General Inquiry',
          message,
          // created_at is usually auto-handled by Supabase, 
          // but you can add it if your schema requires explicit input
        }
      ]);

    if (dbError) {
      console.error("Supabase Insertion Error:", dbError);
      // We generally continue to try sending the email even if DB fails, 
      // or you can return an error here depending on preference.
      // For now, we log it and proceed so we don't lose the message entirely.
    }

    // 3. Send the branded emails (User Receipt + Admin Alert)
    // We pass the new fields so the admin sees them
    await sendContactEmails({ name, email, message, phone, subject });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact Route Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}