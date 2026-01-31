import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmails } from '@/lib/sendGeneralEmail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Send the branded emails
    await sendContactEmails({ name, email, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}