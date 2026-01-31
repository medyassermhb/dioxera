import Link from 'next/link';
import { ArrowUpRight, ShoppingBag } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default async function Accessories() {
  // Fetch ONLY Sodium Chlorite and Water Distiller
  const { data: accessories } = await supabase
    .from('products')
    .select('*')
    .or('slug.eq.sodium-chlorite-28,slug.eq.water-distiller-pro')
    .order('price', { ascending: true }); // Show cheaper item first

  if (!accessories || accessories.length === 0) return null;

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container px-6 mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black tracking-tight mb-2 text-brand-dark">Essential Supplies</h2>
            <p className="text-gray-500">Required for the operation of your Dioxera 3000.</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 font-bold text-brand-dark hover:text-brand-primary transition">
            View full catalog <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Grid adjusted for 2 items to look good */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {accessories.map((item) => (
            <Link href={`/products/${item.id}`} key={item.id} className="group block">
              
              {/* Product Card Image */}
              <div className="bg-gray-50 rounded-[2rem] aspect-[4/3] mb-6 flex items-center justify-center group-hover:bg-gray-100 transition-colors relative overflow-hidden border border-gray-100">
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-gray-100 z-10 shadow-sm">
                  Essential
                </div>
                
                {item.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-3/4 h-3/4 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                   <ShoppingBag className="text-gray-200" size={48} />
                )}
              </div>

              {/* Product Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl text-brand-dark group-hover:text-brand-primary transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 font-bold mt-1">€{item.price.toFixed(2)}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-brand-dark group-hover:text-brand-primary group-hover:border-brand-dark transition-all">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <div className="mt-10 md:hidden">
            <Link href="/products" className="w-full py-4 rounded-full border border-gray-200 font-bold flex items-center justify-center gap-2 hover:bg-gray-50">
                View Full Catalog
            </Link>
        </div>
      </div>
    </section>
  );
}