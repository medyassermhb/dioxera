"use client";

import Header from '@/components/layout/Navbar';
import { useCart } from '@/lib/store';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Sparkles, PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; 

export default function CartPage() {
  const { items, removeItem, addItem } = useCart();
  const [mounted, setMounted] = useState(false);
  const [suggestedAddons, setSuggestedAddons] = useState<any[]>([]);

  // 1. Fetch "Distiller" and "Sodium" from Supabase
  useEffect(() => {
    setMounted(true);
    
    async function fetchAddons() {
      // This query looks for products containing "distiller", "sodium", or "chlorite"
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or('name.ilike.%distiller%,name.ilike.%sodium%,name.ilike.%chlorite%')
        .limit(2);

      if (data) {
        console.log("Supabase found add-ons:", data); // Check your console to see if products are found!
        setSuggestedAddons(data);
      } else if (error) {
        console.error("Error fetching add-ons:", error);
      }
    }

    fetchAddons();
  }, []);

  const cartItems = items || [];
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // --- UPSELL LOGIC ---
  
  // A. Check if "Dioxera 3000" is in the cart
  const hasGenerator = cartItems.some(item => {
    const name = item.name?.toLowerCase() || '';
    // Checks for "dioxera", "3000", or "generator"
    return name.includes('dioxera') || name.includes('3000') || name.includes('gen');
  });

  // B. Filter Add-ons (Show if: Has Generator + Addon not already in cart)
  const activeSuggestions = suggestedAddons.filter(addon => 
    hasGenerator && !cartItems.some(cartItem => cartItem.id === addon.id)
  );

  if (!mounted) return null;

  return (
    <>
      <Header />
      <main className="bg-white pt-40 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-6xl font-black tracking-tighter mb-12">YOUR BAG<span className="text-brand-primary">.</span></h1>

          {cartItems.length === 0 ? (
             <div className="text-center py-20 bg-gray-50 rounded-[3rem]">
                <p className="text-2xl font-bold mb-6">Your bag is currently empty.</p>
                <Link href="/shop" className="inline-block bg-brand-dark text-white px-8 py-4 rounded-full font-bold">Start Shopping</Link>
             </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-16">
              
              {/* --- LEFT COL: ITEMS & UPSELLS --- */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* 1. Cart Items List */}
                <div className="space-y-8">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-8 border-b border-gray-100 pb-8 items-center">
                      <div className="w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl border border-gray-100 shrink-0">
                         {/* Icon Logic */}
                         {item.name?.toLowerCase().includes('dioxera') || item.name?.toLowerCase().includes('3000') ? '🧬' : (item.name?.toLowerCase().includes('water') ? '💧' : '🧪')}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <h3 className="text-xl font-bold">{item.name}</h3>
                          <p className="text-xl font-bold">€{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        
                        <p className="text-sm text-gray-400 mb-6 uppercase tracking-widest">
                          Unit Price: €{item.price}
                        </p>
                        
                        <div className="flex items-center gap-6">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                             <button className="px-3 py-1 hover:bg-gray-100 text-gray-400"><Minus size={16}/></button>
                             <span className="px-3 font-bold text-sm">{item.quantity}</span>
                             <button onClick={() => addItem(item)} className="px-3 py-1 hover:bg-gray-100"><Plus size={16}/></button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-xs font-bold text-red-500 underline">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 2. UPSELL SECTION (Dynamic from Supabase) */}
                {activeSuggestions.length > 0 && (
                  <div className="mt-12 pt-8 border-t-4 border-brand-primary/20 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center gap-2 mb-6 text-brand-dark">
                      <Sparkles size={20} className="text-brand-primary fill-brand-primary" />
                      <h3 className="font-bold text-lg uppercase tracking-widest">Recommended Extras</h3>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      {activeSuggestions.map(addon => (
                        <div key={addon.id} className="group border border-gray-200 p-4 rounded-2xl flex items-center gap-4 hover:border-brand-primary transition-all bg-gray-50/50">
                          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 shrink-0">
                             {/* Dynamic Icon */}
                             {addon.name.toLowerCase().includes('water') ? '💧' : '🧪'}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm">{addon.name}</h4>
                            <p className="text-xs text-gray-500 mb-2 line-clamp-1">{addon.description || "Essential add-on."}</p>
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-sm">€{addon.price}</span>
                              <button 
                                onClick={() => addItem({ ...addon, quantity: 1 })}
                                className="flex items-center gap-1 text-[10px] font-black bg-black text-white px-3 py-1.5 rounded-full hover:bg-brand-primary hover:text-black transition-colors"
                              >
                                <PlusCircle size={12} /> ADD
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Link href="/shop" className="inline-flex items-center gap-2 font-bold text-sm text-gray-500 hover:text-brand-dark mt-4">
                  <ArrowLeft size={16}/> Continue Shopping
                </Link>
              </div>

              {/* --- RIGHT COL: SUMMARY --- */}
              <div className="bg-gray-50 p-10 rounded-[2.5rem] h-fit sticky top-32">
                <h3 className="text-xl font-bold mb-6 uppercase tracking-widest">Summary</h3>
                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">€{total.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span className="text-gray-400">Calculated at checkout</span></div>
                  <div className="flex justify-between"><span>Tax (Estimated)</span><span className="text-gray-400">--</span></div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-black text-3xl">€{total.toFixed(2)}</span>
                  </div>
                </div>

                <Link 
                   href="/checkout"
                   className="block w-full py-5 bg-brand-dark text-white text-center rounded-xl font-bold text-lg hover:bg-brand-primary hover:text-brand-dark transition-all shadow-xl shadow-brand-dark/10 mb-6"
                >
                   PROCEED TO CHECKOUT
                </Link>
                
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                   <ShieldCheck size={14} /> Secure Checkout
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
    </>
  );
}