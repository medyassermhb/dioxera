// src/components/ShopContent.tsx
"use client";

import Header from '@/components/layout/Navbar';
import Link from 'next/link';
import { ArrowUpRight, ShoppingBag, Filter } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { dictionary } from '@/lib/dictionary';

export default function ShopContent({ products }: { products: any[] | null }) {
  const { language } = useAppStore();
  const t = dictionary[language].shop;

  return (
    <>
      <Header />
      <main className="pt-32 pb-20 bg-white min-h-screen">
        <div className="container px-6 mx-auto">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-brand-dark mb-4">
                {t.title}
              </h1>
              <p className="text-gray-500 text-lg max-w-md">
                {t.description}
              </p>
            </div>
            
            {/* Visual Filter Button */}
            <button className="px-6 py-3 rounded-full border border-gray-200 font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <Filter size={18} /> {t.filter}
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products && products.length > 0 ? (
              products.map((product) => (
                <Link 
                  href={`/shop/${product.id}`} 
                  key={product.id} 
                  className="group block"
                >
                  {/* Image Card */}
                  <div className="bg-gray-50 rounded-[2.5rem] aspect-[4/3] mb-6 flex items-center justify-center p-8 border border-gray-100 relative overflow-hidden group-hover:border-brand-primary/30 transition-all duration-500">
                    
                    {/* Status Badge */}
                    <div className="absolute top-6 left-6 bg-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-100 shadow-sm z-10">
                      {t.inStock}
                    </div>

                    {/* Product Image */}
                    {product.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    ) : (
                       <ShoppingBag className="text-gray-200" size={64} />
                    )}

                    {/* Hover Action */}
                    <div className="absolute bottom-6 right-6 w-12 h-12 bg-brand-dark rounded-full flex items-center justify-center text-brand-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-1 px-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                        {product.name}
                      </h3>
                      <span className="font-mono text-sm text-gray-400">01</span>
                    </div>
                    <p className="text-lg font-bold text-gray-500">
                      €{product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              // Empty State
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-400 text-lg">{t.loading}</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </>
  );
}