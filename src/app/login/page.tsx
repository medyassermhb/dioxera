"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else alert("Check your email to confirm signup!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert(error.message);
      } else {
        // Redirect based on who it is
        if (email === "m.mymaouhoubi@mam-nature.com") { // HARDCODED ADMIN CHECK
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center p-6 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-primary/5 to-transparent pointer-events-none"></div>

      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative z-10">
        <div className="text-center mb-8">
           <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-brand-primary">
             <Lock size={24} />
           </div>
           <h1 className="text-2xl font-black tracking-tighter">
             {isSignUp ? "Create Account" : "Access Portal"}
           </h1>
           <p className="text-gray-400 text-sm mt-2">Dioxera Secure Environment</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2 mb-1 block">Email</label>
            <div className="relative">
               <Mail size={16} className="absolute left-4 top-4 text-gray-500"/>
               <input 
                 type="email" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-brand-primary outline-none transition-colors"
                 placeholder="admin@dioxera.com"
                 required
               />
            </div>
          </div>
          
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2 mb-1 block">Password</label>
            <div className="relative">
               <Lock size={16} className="absolute left-4 top-4 text-gray-500"/>
               <input 
                 type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-brand-primary outline-none transition-colors"
                 placeholder="••••••••"
                 required
               />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-brand-primary text-brand-dark font-bold py-4 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : (isSignUp ? "Sign Up" : "Login")}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-center mt-6 text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
        >
          {isSignUp ? "Already have an account? Login" : "New Customer? Create Account"}
        </button>
        
        <div className="mt-8 text-center">
            <Link href="/" className="text-xs text-brand-primary hover:underline">Return Home</Link>
        </div>
      </div>
    </div>
  );
}