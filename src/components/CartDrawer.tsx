"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { dictionary } from '@/lib/dictionary';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles, Plus, Globe } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, removeItem, addItem, language } = useAppStore();
  const t = dictionary[language as keyof typeof dictionary] || dictionary.en;

  const [suggestedAddons, setSuggestedAddons] = useState<any[]>([]);
  
  useEffect(() => {
    async function fetchAddons() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .or('name.ilike.%distiller%,name.ilike.%sodium%,name.ilike.%chlorite%')
        .limit(2);
      
      if (data) setSuggestedAddons(data);
    }
    fetchAddons();
  }, []);

  const hasGenerator = items.some(item => {
    const name = item.name?.toLowerCase() || '';
    return name.includes('dioxera') || name.includes('3000') || name.includes('gen');
  });

  const activeSuggestions = suggestedAddons.filter(addon => 
    hasGenerator && !items.some(cartItem => cartItem.id === addon.id)
  );

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // --- REMOVED FREE SHIPPING LOGIC --- 

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-[60]"
          />
          
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
              <h2 className="text-xl font-black tracking-tighter flex items-center gap-2">
                {t.cart.title} <span className="bg-brand-primary text-brand-dark text-xs px-2 py-1 rounded-full">{items.length}</span>
              </h2>
              <button onClick={closeCart} className="hover:rotate-90 transition-transform p-2"><X size={24}/></button>
            </div>

            {/* NEW: Simple Shipping Announcement (Replaces Progress Bar) */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 shrink-0">
               <p className="text-[10px] font-bold uppercase tracking-widest text-center text-gray-500 flex items-center justify-center gap-2">
                 <Globe size={12} className="text-brand-dark"/>
                 <span>Worldwide Shipping Available</span>
               </p>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-4 min-h-[200px]">
                   <ShoppingBag size={48} className="opacity-20"/>
                   <p className="font-bold text-gray-400">{t.cart.empty}</p>
                   <button onClick={closeCart} className="text-brand-primary text-sm font-bold uppercase tracking-widest hover:text-brand-dark transition">{t.cart.startShopping}</button>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    {items.map((item) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={item.id} 
                        className="flex gap-4 group"
                      >
                        {/* Image Logic */}
                        <div className="w-20 h-20 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                           {item.image ? (
                             /* eslint-disable-next-line @next/next/no-img-element */
                             <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2 mix-blend-multiply" />
                           ) : (
                             <span>{item.name?.toLowerCase().includes('gen') ? '🧬' : '🧪'}</span>
                           )}
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                          <div className="flex justify-between items-start">
                             <h4 className="font-bold text-sm leading-tight pr-4 text-brand-dark line-clamp-2">{item.name}</h4>
                             <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition"><Trash2 size={14}/></button>
                          </div>
                          
                          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">
                            {item.name.includes('Generator') ? t.cart.equipment : t.cart.supplies}
                          </p>

                          <div className="flex justify-between items-end mt-2">
                             <span className="text-[10px] font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600">Qty: {item.quantity}</span>
                             <span className="font-bold text-sm text-brand-dark">€{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  {activeSuggestions.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles size={14} className="text-brand-primary fill-brand-primary" />
                        <h3 className="font-bold text-xs uppercase tracking-widest text-gray-500">{t.cart.recommended}</h3>
                      </div>
                      
                      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x">
                        {activeSuggestions.map(addon => (
                          <div key={addon.id} className="min-w-[200px] snap-center bg-gray-50 border border-gray-100 p-3 rounded-xl flex gap-3 items-center group hover:border-brand-primary transition-colors">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-lg shadow-sm shrink-0 overflow-hidden">
                              {addon.image ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={addon.image} alt={addon.name} className="w-full h-full object-contain p-1" />
                              ) : (
                                <span>🧪</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                               <h4 className="font-bold text-xs truncate">{addon.name}</h4>
                               <div className="flex justify-between items-center mt-1">
                                  <span className="text-xs font-bold text-gray-500">€{addon.price}</span>
                                  <button 
                                    onClick={() => addItem({ ...addon, quantity: 1 })}
                                    className="bg-black text-white p-1 rounded-full hover:bg-brand-primary hover:text-black transition"
                                  >
                                    <Plus size={12} />
                                  </button>
                               </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-white shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-10">
              <div className="flex justify-between mb-4 text-brand-dark items-end">
                <span className="font-bold text-gray-400 uppercase tracking-wider text-xs">{t.cart.subtotal}</span>
                <span className="text-2xl font-black tracking-tight">€{total.toFixed(2)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                 <Link 
                   href="/cart" 
                   onClick={closeCart}
                   className="py-3.5 bg-gray-100 text-brand-dark rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all text-[10px] md:text-xs uppercase tracking-widest"
                 >
                   {t.cart.viewBag}
                 </Link>
                 
                 <Link 
                   href="/checkout" 
                   onClick={closeCart}
                   className="py-3.5 bg-brand-dark text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-brand-dark transition-all text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-brand-dark/20"
                 >
                   {t.cart.checkout} <ArrowRight size={14} />
                 </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}