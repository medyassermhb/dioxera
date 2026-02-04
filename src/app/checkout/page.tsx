"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Navbar';
import CheckoutForm from '@/components/CheckoutForm'; 
import { useAppStore } from '@/lib/store'; 
import { dictionary } from '@/lib/dictionary';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, ShoppingCart, User, ArrowRight, Truck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, language } = useAppStore(); 
  const t = dictionary[language as keyof typeof dictionary].checkout;

  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<'gate' | 'login' | 'register' | 'checkout'>('gate'); 
  const [loading, setLoading] = useState(false);
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setMounted(true);
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setView('checkout'); 
    } else {
      setView('gate');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      checkUser(); 
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      alert("Account created! Please check your email to confirm, or login now.");
      checkUser();
    }
    setLoading(false);
  };

  const handleGuest = () => {
    setView('checkout');
  };

  if (!mounted) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // --- UPDATED SHIPPING LOGIC: Flat Rate Only (No Free Threshold) ---
  const shipping = 25.00; 
  const total = subtotal + shipping;

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 px-6 bg-[#F9F9F9] min-h-screen">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          
          {/* LEFT: MAIN CONTENT AREA */}
          <div className="lg:col-span-2">
            
            {/* === VIEW 1: AUTH GATE === */}
            {view === 'gate' && (
              <div className="space-y-8">
                <h1 className="text-3xl font-black tracking-tighter mb-8 text-brand-dark">{t.gate.title}</h1>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Option A: Login / Register */}
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-200">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-6"><User /></div>
                    <h3 className="text-xl font-bold mb-2">{t.gate.hasAccount}</h3>
                    <p className="text-gray-500 mb-6 text-sm">{t.gate.loginDesc}</p>
                    <div className="space-y-3">
                      <button onClick={() => setView('login')} className="w-full py-3 bg-black text-white rounded-xl font-bold hover:opacity-80 transition">{t.gate.loginBtn}</button>
                      <button onClick={() => setView('register')} className="w-full py-3 border-2 border-black text-black rounded-xl font-bold hover:bg-gray-50 transition">{t.gate.createBtn}</button>
                    </div>
                  </div>

                  {/* Option B: Guest */}
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-200 relative overflow-hidden group cursor-pointer" onClick={handleGuest}>
                    <div className="absolute top-0 right-0 p-32 bg-brand-primary/10 rounded-full blur-2xl -mr-16 -mt-16 transition group-hover:bg-brand-primary/20"></div>
                    <div className="w-12 h-12 bg-brand-primary text-black rounded-full flex items-center justify-center mb-6 relative z-10"><ArrowRight /></div>
                    <h3 className="text-xl font-bold mb-2 relative z-10">{t.gate.guestTitle}</h3>
                    <p className="text-gray-500 mb-6 text-sm relative z-10">{t.gate.guestDesc}</p>
                    <button className="w-full py-3 bg-brand-primary text-black rounded-xl font-bold hover:brightness-110 transition relative z-10">{t.gate.guestBtn}</button>
                  </div>
                </div>
              </div>
            )}

            {/* === VIEW 2: LOGIN FORM === */}
            {view === 'login' && (
              <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-200 max-w-lg mx-auto">
                <button onClick={() => setView('gate')} className="text-sm text-gray-400 font-bold mb-6 hover:text-black">← {t.auth.back}</button>
                <h2 className="text-2xl font-black mb-6">{t.auth.welcome}</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <input type="email" placeholder={t.auth.email} value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 bg-gray-50 border rounded-xl" required />
                  <input type="password" placeholder={t.auth.password} value={password} onChange={e => setPassword(e.target.value)} className="w-full p-4 bg-gray-50 border rounded-xl" required />
                  <button disabled={loading} className="w-full py-4 bg-black text-white rounded-xl font-bold">
                    {loading ? t.auth.signingIn : t.auth.loginAndCheckout}
                  </button>
                </form>
              </div>
            )}

            {/* === VIEW 3: REGISTER FORM === */}
            {view === 'register' && (
              <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-200 max-w-lg mx-auto">
                <button onClick={() => setView('gate')} className="text-sm text-gray-400 font-bold mb-6 hover:text-black">← {t.auth.back}</button>
                <h2 className="text-2xl font-black mb-6">{t.auth.create}</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                  <input type="email" placeholder={t.auth.email} value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 bg-gray-50 border rounded-xl" required />
                  <input type="password" placeholder={t.auth.password} value={password} onChange={e => setPassword(e.target.value)} className="w-full p-4 bg-gray-50 border rounded-xl" required />
                  <button disabled={loading} className="w-full py-4 bg-brand-primary text-black rounded-xl font-bold">
                    {loading ? t.auth.creating : t.auth.registerAndCheckout}
                  </button>
                </form>
              </div>
            )}

            {/* === VIEW 4: ACTUAL CHECKOUT === */}
            {view === 'checkout' && (
              <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-sm border border-gray-200/60 animate-in fade-in slide-in-from-bottom-4">
                <h1 className="text-3xl font-black tracking-tighter mb-8 flex items-center gap-3 text-brand-dark">
                  {t.main.secureCheckout} <ShieldCheck className="text-brand-primary" />
                </h1>
                
                {items.length > 0 ? (
                  <CheckoutForm /> 
                ) : (
                  <div className="text-center py-20">
                     <p className="text-gray-400 mb-4">{t.main.empty}</p>
                     <Link href="/shop" className="text-brand-dark font-bold underline">{t.main.return}</Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#111] text-white p-8 rounded-[2rem] sticky top-32 shadow-2xl shadow-black/20">
              <h3 className="text-xl font-bold mb-8 tracking-widest uppercase border-b border-white/10 pb-4">{t.summary.title}</h3>
              
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 mb-8 scrollbar-thin scrollbar-thumb-brand-primary scrollbar-track-transparent">
                {items.length === 0 ? (
                   <div className="text-gray-500 text-sm italic flex items-center gap-2">
                     <ShoppingCart size={16}/> {t.summary.empty}
                   </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-start">
                      <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 relative overflow-hidden border border-white/10">
                         {item.image ? (
                           /* eslint-disable-next-line @next/next/no-img-element */
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90 mix-blend-overlay" />
                         ) : (
                           <span>📦</span>
                         )}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm leading-tight text-gray-200">{item.name}</p>
                        <p className="text-xs text-brand-primary mt-1">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-mono text-sm text-white">
                        €{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-3 text-sm border-t border-white/10 pt-6 mb-8">
                <div className="flex justify-between text-gray-400">
                  <span>{t.summary.subtotal}</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>{t.summary.shipping}</span>
                  <span>€{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>{t.summary.tax}</span>
                  <span>€{(total * 0.2).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-white/10 pt-6">
                 <span className="font-bold uppercase tracking-widest text-xs text-gray-400">{t.summary.total}</span>
                 <span className="text-4xl font-black text-brand-primary tracking-tighter">€{total.toFixed(2)}</span>
              </div>
              
              {/* --- CHANGED: Standard Worldwide Shipping Text --- */}
              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                 <Truck size={12} /> Worldwide Standard Shipping
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}