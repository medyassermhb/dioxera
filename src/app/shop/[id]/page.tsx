// src/app/shop/[id]/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ProductContent from '@/components/ProductContent';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

// Dynamic SEO Generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  const { data: product } = await supabase
    .from('products')
    .select('name, description, image')
    .eq('id', id)
    .single();

  if (!product) return { title: 'Product Not Found' };

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | DIOXERA`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  // 1. Fetch Main Product
  const { data: product, error: pError } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (pError || !product) return notFound();

  // 2. Fetch Related Products (Random 3 excluding current)
  const { data: related } = await supabase
    .from('products')
    .select('*')
    .neq('id', id)
    .limit(3);

  // 3. Render Client Component
  return <ProductContent product={product} related={related || []} />;
}