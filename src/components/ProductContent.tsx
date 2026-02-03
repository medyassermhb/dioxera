// src/components/ProductContent.tsx
"use client";

import Header from '@/components/layout/Navbar';
import AddToCartButton from '@/components/AddToCartButton';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Box, FileText, Truck } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { dictionary } from '@/lib/dictionary';

interface ProductContentProps {
  product: any;
  related: any[] | null;
}

export default function ProductContent({ product, related }: ProductContentProps) {
  const { language } = useAppStore();
  const t = dictionary[language].product;

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 bg-white min-h-screen">
        <div className="container px-6 mx-auto">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-8 uppercase tracking-wider">
             <Link href="/shop" className="hover:text-brand-dark transition">{t.breadcrumbShop}</Link> 
             <span>/</span>
             <span className="text-brand-dark">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* --- LEFT COL: GALLERY --- */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-gray-50 rounded-[2.5rem] aspect-square flex items-center justify-center p-12 border border-gray-100 relative overflow-hidden group">
                 {/* Background Blur Effect */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                 
                 {product.image ? (
                   /* eslint-disable-next-line @next/next/no-img-element */
                   <img 
                     src={product.image} 
                     alt={product.name} 
                     className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                   />
                 ) : (
                   <span className="font-mono text-gray-300">{t.noImage}</span>
                 )}
              </div>

              {/* Detail Thumbnails */}
              <div className="grid grid-cols-3 gap-4">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="bg-gray-50 rounded-2xl aspect-square flex items-center justify-center border border-gray-100">
                      <span className="text-xs text-gray-300 font-mono">{t.detail} {i}</span>
                   </div>
                 ))}
              </div>
            </div>

            {/* --- RIGHT COL: STICKY INFO --- */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-10">
              
              {/* Header Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                   <span className="bg-brand-primary text-brand-dark px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                     {t.series}
                   </span>
                   <span className="text-green-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> {t.inStock}
                   </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-brand-dark mb-4 leading-[1.1]">
                  {product.name}
                </h1>
                <p className="text-3xl text-gray-900 font-bold">€{product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-400 font-medium mt-1">{t.vat}</p>
              </div>

              <div className="h-px bg-gray-100 w-full"></div>

              {/* Main Description (From DB - usually stays English unless you add translation cols) */}
              <div className="prose prose-sm text-gray-500 leading-relaxed">
                {product.description || "Engineered for absolute purity."}
              </div>

              {/* Add To Cart */}
              <div className="space-y-4">
                <AddToCartButton product={product} />
                <p className="text-center text-xs text-gray-400 font-medium">
                  {t.freeShipping}
                </p>
              </div>

              {/* Accordion Sections */}
              <div className="border-t border-gray-100 pt-6 space-y-4">
                 <DetailsRow icon={FileText} title={t.specifications}>
                    <ul className="list-disc pl-4 space-y-1 text-gray-500">
                       <li>{t.specs.cap}</li>
                       <li>{t.specs.conc}</li>
                       <li>{t.specs.pwr}</li>
                       <li>{t.specs.mat}</li>
                    </ul>
                 </DetailsRow>
                 <DetailsRow icon={Box} title={t.boxContents}>
                    <p className="text-gray-500">{t.boxText}</p>
                 </DetailsRow>
                 <DetailsRow icon={Truck} title={t.shippingReturns}>
                    <p className="text-gray-500">{t.shippingText}</p>
                 </DetailsRow>
                 <DetailsRow icon={ShieldCheck} title={t.warranty}>
                    <p className="text-gray-500">{t.warrantyText}</p>
                 </DetailsRow>
              </div>

            </div>
          </div>

          {/* --- RELATED PRODUCTS --- */}
          {related && related.length > 0 && (
            <div className="mt-32 border-t border-gray-100 pt-20">
              <h3 className="text-2xl font-black tracking-tight mb-10">{t.related}</h3>
              <div className="grid md:grid-cols-3 gap-8">
                 {related.map((item) => (
                    <Link href={`/shop/${item.id}`} key={item.id} className="group block">
                       <div className="bg-gray-50 rounded-[2rem] aspect-[4/3] mb-4 flex items-center justify-center p-6 border border-gray-100 group-hover:border-brand-primary/50 transition-colors">
                          {item.image ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={item.image} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"/>
                          ) : (
                            <span className="text-xs text-gray-300">{t.noImage}</span>
                          )}
                       </div>
                       <div className="flex justify-between items-start">
                          <div>
                             <h4 className="font-bold text-brand-dark group-hover:text-brand-primary transition-colors">{item.name}</h4>
                             <p className="text-sm font-bold text-gray-400">€{item.price}</p>
                          </div>
                          <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-brand-dark group-hover:text-brand-primary transition-colors">
                             <ArrowUpRight size={14}/>
                          </div>
                       </div>
                    </Link>
                 ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}

// Helper Component for Accordion Rows
function DetailsRow({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) {
  return (
    <div className="group">
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-1.5 py-4 text-gray-900 transition hover:text-brand-primary">
          <div className="flex items-center gap-3 font-bold text-sm uppercase tracking-wider">
             <Icon size={18} className="text-gray-400 group-hover:text-brand-primary transition-colors"/>
             {title}
          </div>
          <span className="relative size-5 shrink-0">
            <svg
              className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg
              className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </summary>
        <div className="pb-4 text-sm leading-relaxed text-gray-500 animate-in slide-in-from-top-2">
           {children}
        </div>
      </details>
      <div className="h-px bg-gray-100 w-full"></div>
    </div>
  );
}