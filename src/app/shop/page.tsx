// src/app/shop/page.tsx
import { supabase } from '@/lib/supabase';
import ShopContent from '@/components/ShopContent'; // Import the client component

// Force dynamic rendering so new products appear instantly
export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  // 1. Fetch All Products (Server Side)
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('price', { ascending: false }); // Show expensive items (Generator) first

  // 2. Render Client Component
  return <ShopContent products={products} />;
}