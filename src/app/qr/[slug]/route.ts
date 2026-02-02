import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> } // Updated for Next.js 15+
) {
  const { slug } = await params;

  // 1. Initialize Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 2. Find the Real Destination
  const { data } = await supabase
    .from('qr_codes')
    .select('destination')
    .eq('slug', slug)
    .single();

  if (!data || !data.destination) {
    // If link doesn't exist, go to Home Page
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 3. Count the Scan (Fire and forget, don't wait for it)
  supabase.rpc('increment_qr_scan', { slug_input: slug });

  // 4. Handle External vs Internal Links
  let finalUrl = data.destination;

  // If it's an external link (youtube, drive) and missing http, add it
  if (!finalUrl.startsWith('http') && !finalUrl.startsWith('/')) {
    finalUrl = `https://${finalUrl}`;
  }
  
  // If it's a local path (starts with /), make it absolute
  if (finalUrl.startsWith('/')) {
    finalUrl = new URL(finalUrl, request.url).toString();
  }

  // 5. Redirect the User
  return NextResponse.redirect(finalUrl);
}