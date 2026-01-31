import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateInvoicePDF } from '@/lib/generateInvoiceServer';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

  // 1. Create Admin Client
  // This bypasses RLS policies to ensure we can fetch the order details
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // 2. Fetch Order (Expects UUID)
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !order) {
      console.error("Database Error:", error);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // 3. Generate PDF
    const pdfBuffer = await generateInvoicePDF(order);

    // 4. Download
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Dioxera_Invoice_${id.slice(0,8)}.pdf"`,
      },
    });

  } catch (err) {
    console.error("Download Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}