"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Navbar';
import CheckoutForm from '@/components/CheckoutForm'; 
import { useCart } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, Package, ShoppingCart, User, Lock, ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState<'gate' | 'login' | 'register' | 'checkout'>('gate'); // Controls what screen is shown
  const [loading, setLoading] = useState(false);
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const cartStore = useCart(); 
  
  useEffect(() => {
    setMounted(true);
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setView('checkout'); // Skip gate if already logged in
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
      checkUser(); // Will switch to checkout automatically
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
      // Optional: Auto-login if Supabase is set to allow it without confirmation
      checkUser();
    }
    setLoading(false);
  };

  const handleGuest = () => {
    setView('checkout');
  };

  if (!mounted) return null;

  const items = cartStore.items;
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 25.00;
  const total = subtotal + shipping;

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 px-6 bg-[#F9F9F9] min-h-screen">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          
          {/* LEFT: MAIN CONTENT AREA */}
          <div className="lg:col-span-2">
            
            {/* === VIEW 1: AUTH GATE (Login / Register / Guest) === */}
            {view === 'gate' && (
              <div className="space-y-8">
                <h1 className="text-3xl font-black tracking-tighter mb-8 text-brand-dark">How would you like to checkout?</h1>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Option A: Login / Register */}
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-200">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-6"><User /></div>
                    <h3 className="text-xl font-bold mb-2">Have an account?</h3>
                    <p className="text-gray-500 mb-6 text-sm">Login to access saved addresses and order history.</p>
                    <div className="space-y-3">
                      <button onClick={() => setView('login')} className="w-full py-3 bg-black text-white rounded-xl font-bold hover:opacity-80 transition">Login</button>
                      <button onClick={() => setView('register')} className="w-full py-3 border-2 border-black text-black rounded-xl font-bold hover:bg-gray-50 transition">Create Account</button>
                    </div>
                  </div>

                  {/* Option B: Guest */}
                  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-200 relative overflow-hidden group cursor-pointer" onClick={handleGuest}>
                    <div className="absolute top-0 right-0 p-32 bg-brand-primary/10 rounded-full blur-2xl -mr-16 -mt-16 transition group-hover:bg-brand-primary/20"></div>
                    <div className="w-12 h-12 bg-brand-primary text-black rounded-full flex items-center justify-center mb-6 relative z-10"><ArrowRight /></div>
                    <h3 className="text-xl font-bold mb-2 relative z-10">Guest Checkout</h3>
                    <p className="text-gray-500 mb-6 text-sm relative z-10">No account required. You can create one later if you want.</p>
                    <button className="w-full py-3 bg-brand-primary text-black rounded-xl font-bold hover:brightness-110 transition relative z-10">Continue as Guest</button>
                  </div>
                </div>
              </div>
            )}

            {/* === VIEW 2: LOGIN FORM === */}
            {view === 'login' && (
              <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-200 max-w-lg mx-auto">
                <button onClick={() => setView('gate')} className="text-sm text-gray-400 font-bold mb-6 hover:text-black">← Back</button>
                <h2 className="text-2xl font-black mb-6">Welcome Back</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 bg-gray-50 border rounded-xl" required />
                  <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-4 bg-gray-50 border rounded-xl" required />
                  <button disabled={loading} className="w-full py-4 bg-black text-white rounded-xl font-bold">
                    {loading ? 'Signing in...' : 'Login & Checkout'}
                  </button>
                </form>
              </div>
            )}

            {/* === VIEW 3: REGISTER FORM === */}
            {view === 'register' && (
              <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-200 max-w-lg mx-auto">
                <button onClick={() => setView('gate')} className="text-sm text-gray-400 font-bold mb-6 hover:text-black">← Back</button>
                <h2 className="text-2xl font-black mb-6">Create Account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                  <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 bg-gray-50 border rounded-xl" required />
                  <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-4 bg-gray-50 border rounded-xl" required />
                  <button disabled={loading} className="w-full py-4 bg-brand-primary text-black rounded-xl font-bold">
                    {loading ? 'Creating...' : 'Register & Checkout'}
                  </button>
                </form>
              </div>
            )}

            {/* === VIEW 4: ACTUAL CHECKOUT === */}
            {view === 'checkout' && (
              <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-sm border border-gray-200/60 animate-in fade-in slide-in-from-bottom-4">
                <h1 className="text-3xl font-black tracking-tighter mb-8 flex items-center gap-3 text-brand-dark">
                  SECURE CHECKOUT <ShieldCheck className="text-brand-primary" />
                </h1>
                
                {items.length > 0 ? (
                  <CheckoutForm /> // No props needed as it uses Context, but you can pass pre-filled user email if needed
                ) : (
                  <div className="text-center py-20">
                     <p className="text-gray-400 mb-4">Your cart is empty.</p>
                     <Link href="/products" className="text-brand-dark font-bold underline">Return to Shop</Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Order Summary (Always Visible) */}
          <div className="lg:col-span-1">
            <div className="bg-[#111] text-white p-8 rounded-[2rem] sticky top-32 shadow-2xl shadow-black/20">
              <h3 className="text-xl font-bold mb-8 tracking-widest uppercase border-b border-white/10 pb-4">Order Summary</h3>
              
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 mb-8 scrollbar-thin scrollbar-thumb-brand-primary scrollbar-track-transparent">
                {items.length === 0 ? (
                   <div className="text-gray-500 text-sm italic flex items-center gap-2">
                     <ShoppingCart size={16}/> Cart is empty
                   </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-start">
                      <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 relative overflow-hidden border border-white/10">
                         {item.image ? (
                           /* eslint-disable-next-line @next/next/no-img-element */
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90" />
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
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-brand-primary font-bold">FREE</span> : `€${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Sales Tax (Included)</span>
                  <span>€{(total * 0.2).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-white/10 pt-6">
                 <span className="font-bold uppercase tracking-widest text-xs text-gray-400">Total to pay</span>
                 <span className="text-4xl font-black text-brand-primary tracking-tighter">€{total.toFixed(2)}</span>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                 <Package size={12} /> Global Swiss Logistics
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}