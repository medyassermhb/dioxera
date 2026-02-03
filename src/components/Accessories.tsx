"use client";

import Link from 'next/link';
import { ArrowUpRight, ShoppingBag } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/lib/store';
import { dictionary } from '@/lib/dictionary';
import { useEffect, useState } from 'react';

export default function Accessories() {
  const { language } = useAppStore();
  const t = dictionary[language].accessories;
  const [accessories, setAccessories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAccessories() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .or('slug.eq.sodium-chlorite-28,slug.eq.water-distiller-pro')
        .order('price', { ascending: true });
      
      if (data) setAccessories(data);
    }
    fetchAccessories();
  }, []);

  if (!accessories || accessories.length === 0) return null;

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container px-6 mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black tracking-tight mb-2 text-brand-dark">{t.heading}</h2>
            <p className="text-gray-500">{t.subheading}</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 font-bold text-brand-dark hover:text-brand-primary transition">
            {t.viewCatalog} <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {accessories.map((item) => (
            <Link href={`/products/${item.id}`} key={item.id} className="group block">
              
              <div className="bg-gray-50 rounded-[2rem] aspect-[4/3] mb-6 flex items-center justify-center group-hover:bg-gray-100 transition-colors relative overflow-hidden border border-gray-100">
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-gray-100 z-10 shadow-sm">
                  {t.essentialBadge}
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
        
        <div className="mt-10 md:hidden">
            <Link href="/products" className="w-full py-4 rounded-full border border-gray-200 font-bold flex items-center justify-center gap-2 hover:bg-gray-50">
                {t.viewAllMobile}
            </Link>
        </div>
      </div>
    </section>
  );
}