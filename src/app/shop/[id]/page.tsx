// src/app/shop/[id]/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ProductContent from '@/components/ProductContent'; // The new Client Component

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. Fetch Main Product
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product) return notFound();

  // 2. Fetch Related Products (Random 3 excluding current)
  const { data: related } = await supabase
    .from('products')
    .select('*')
    .neq('id', id)
    .limit(3);

  // 3. Render Client Component
  return <ProductContent product={product} related={related} />;
}