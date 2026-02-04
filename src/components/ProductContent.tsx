// src/components/ProductContent.tsx
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AddToCartButton from '@/components/AddToCartButton';
import Link from 'next/link';
import { Zap, ArrowUpRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { dictionary } from '@/lib/dictionary';

// --- TYPES ---
interface ProductSpec {
  label: string;
  value: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  images?: string[];
  specs?: ProductSpec[]; 
  features?: string[];
  in_the_box?: string[]; 
  inTheBox?: string[]; 
  specs_fr?: ProductSpec[];
  features_fr?: string[];
  in_the_box_fr?: string[];
}

interface ProductContentProps {
  product: Product;
  related: Product[] | null;
}

// --- SUB-COMPONENTS ---

const TabButton = ({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`relative px-4 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
      active ? 'text-black' : 'text-gray-400 hover:text-gray-600'
    }`}
  >
    {label}
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute bottom-0 left-0 w-full h-[2px] bg-[#CBDA08]"
      />
    )}
  </button>
);

export default function ProductContent({ product, related }: ProductContentProps) {
  const { language } = useAppStore();
  
  // UI States
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'box'>('specs');
  const [mainImage, setMainImage] = useState(product.image);

  // Dictionary
  const t = dictionary[language as keyof typeof dictionary]?.product || dictionary.en.product;

  // --- DATA LOGIC ---
  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image]; 

  const rawBoxEn = product.in_the_box || product.inTheBox || [];
  const boxContents = (language === 'fr' && product.in_the_box_fr && product.in_the_box_fr.length > 0)
    ? product.in_the_box_fr 
    : rawBoxEn;

  const featureList = (language === 'fr' && product.features_fr && product.features_fr.length > 0)
    ? product.features_fr 
    : (product.features || []);

  const specList = (language === 'fr' && product.specs_fr && product.specs_fr.length > 0)
    ? product.specs_fr 
    : (product.specs || []);

  return (
    <main className="pt-32 pb-24 bg-white min-h-screen text-slate-900 selection:bg-[#CBDA08] selection:text-black">
      <div className="container px-6 mx-auto max-w-7xl">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-12 uppercase tracking-widest">
           <Link href="/shop" className="hover:text-[#CBDA08] transition-colors">{t.breadcrumbShop}</Link> 
           <span>/</span>
           <span className="text-slate-800">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* --- LEFT COL: GALLERY (Sticky) --- */}
          <div className="lg:col-span-7 flex flex-col gap-12 lg:sticky lg:top-32">
            
            <div className="space-y-6">
                <div className="relative w-full aspect-square bg-slate-50 rounded-[3rem] border border-slate-100 overflow-hidden group flex items-center justify-center">
                
                {mainImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <motion.img 
                        key={mainImage}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        src={mainImage} 
                        alt={product.name} 
                        className="relative z-10 w-full h-full object-contain mix-blend-multiply p-12 hover:scale-105 transition-transform duration-700 ease-out"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-300 font-mono">{t.noImage}</div>
                )}

                <div className="absolute top-8 left-8 z-20">
                    <span className="font-mono text-[10px] text-slate-500 border border-slate-200 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full">
                        V.3.0 IND
                    </span>
                </div>
                </div>

                {galleryImages.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                        {galleryImages.map((img, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setMainImage(img)}
                                className={`relative aspect-square rounded-2xl bg-slate-50 border overflow-hidden transition-all duration-300 ${
                                    mainImage === img 
                                    ? 'border-[#CBDA08] ring-1 ring-[#CBDA08] ring-offset-2' 
                                    : 'border-slate-100 hover:border-slate-300'
                                }`}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */ }
                                <img src={img} alt={`Detail ${idx}`} className="w-full h-full object-contain mix-blend-multiply p-2"/>
                            </button>
                        ))}
                    </div>
                )}
            </div>
          </div>

          {/* --- RIGHT COL: INFO & TABS --- */}
          <div className="lg:col-span-5 relative space-y-10">
              
              {/* Header Info */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                   <span className="bg-[#CBDA08] text-black px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm shadow-[#CBDA08]/20">
                     {t.series}
                   </span>
                   {product.stock > 0 && (
                     <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                       {t.inStock}
                     </span>
                   )}
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-[1.1]">
                  {product.name}
                </h1>
                
                <p className="text-slate-500 leading-relaxed text-sm mb-6">
                  {product.description || t.defaultDesc}
                </p>

                <div className="flex items-baseline gap-2 mb-2">
                    <p className="text-4xl text-slate-900 font-bold font-mono tracking-tight">
                        €{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">{t.vat}</p>
                </div>
              </div>

              {/* === ADD TO CART (Clean) === */}
              <div className="mt-8">
                 <AddToCartButton product={product} />
              </div>

              {/* Tabs Section */}
              <div className="pt-8 border-t border-slate-100 mt-10">
                <div className="flex border-b border-slate-100 mb-8 overflow-x-auto">
                  <TabButton active={activeTab === 'specs'} label={t.tabSpecs} onClick={() => setActiveTab('specs')} />
                  <TabButton active={activeTab === 'features'} label={t.tabFeatures} onClick={() => setActiveTab('features')} />
                  <TabButton active={activeTab === 'box'} label={t.tabBox} onClick={() => setActiveTab('box')} />
                </div>

                <div className="min-h-[200px]">
                  <AnimatePresence mode="wait">
                    
                    {/* TAB: SPECS */}
                    {activeTab === 'specs' && (
                      <motion.div
                        key="specs"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 gap-3"
                      >
                        {specList.length > 0 ? specList.map((spec, i) => (
                          <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <span className="text-[10px] uppercase tracking-widest text-gray-400">{spec.label}</span>
                            <span className="text-sm font-bold font-mono text-slate-800 text-right">{spec.value}</span>
                          </div>
                        )) : (
                          <p className="text-gray-400 italic">{t.noSpecs}</p>
                        )}
                      </motion.div>
                    )}

                    {/* TAB: FEATURES */}
                    {activeTab === 'features' && (
                      <motion.div key="features" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                        {featureList.length > 0 ? featureList.map((feat, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="p-1.5 bg-white rounded-lg text-[#CBDA08] border border-slate-100 shadow-sm"><Zap size={14} /></div>
                            <span className="font-medium text-slate-700 text-sm">{feat}</span>
                          </div>
                        )) : (
                          <p className="text-gray-400 italic">{t.noFeatures}</p>
                        )}
                      </motion.div>
                    )}
                    
                    {/* TAB: BOX CONTENTS */}
                    {activeTab === 'box' && (
                      <motion.div key="box" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <ul className="space-y-4">
                          {boxContents.length > 0 ? boxContents.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="mt-0.5 w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-400 shadow-sm shrink-0">{i + 1}</div>
                              <span className="text-slate-700 font-medium text-sm leading-tight">{item}</span>
                            </li>
                          )) : (
                            <li className="text-gray-400 italic">{t.noContent}</li>
                          )}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
          </div>
        </div>

        {/* --- RELATED PRODUCTS --- */}
        {related && related.length > 0 && (
          <div className="mt-32 border-t border-slate-100 pt-20">
            <h3 className="text-2xl font-black tracking-tight mb-10 text-slate-900">{t.related}</h3>
            <div className="grid md:grid-cols-3 gap-8">
               {related.map((item) => (
                  <Link href={`/shop/${item.id}`} key={item.id} className="group block">
                     <div className="bg-slate-50 rounded-[2.5rem] aspect-[4/3] mb-5 flex items-center justify-center p-8 border border-slate-100 group-hover:border-[#CBDA08] transition-all duration-300 relative overflow-hidden">
                        {item.image && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 relative z-10"/>
                        )}
                     </div>
                     <div className="flex justify-between items-start px-2">
                        <div>
                           <h4 className="font-bold text-slate-900 group-hover:text-[#CBDA08] transition-colors">{item.name}</h4>
                           <p className="text-sm font-bold text-gray-400 font-mono mt-1">€{item.price}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#CBDA08] group-hover:text-black transition-colors">
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
  );
}