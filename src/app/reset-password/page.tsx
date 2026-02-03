// src/app/reset-password/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { dictionary } from '@/lib/dictionary';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const { language } = useAppStore();
  const t = dictionary[language].resetPassword;
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // 1. Handle the Code Exchange (Login via Link)
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      const exchangeCode = async () => {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setMessage({ text: error.message, type: 'error' });
        }
      };
      exchangeCode();
    }
  }, [searchParams]);

  // 2. Handle Password Update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage({ text: t.errorMatch, type: 'error' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({ password: password });
      
      if (error) throw error;

      setMessage({ text: t.success, type: 'success' });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (error: any) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center p-6 text-white relative">
      {/* Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-brand-primary/10 to-transparent pointer-events-none"></div>

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative z-10 animate-in fade-in zoom-in duration-500">
        
        <div className="text-center mb-8">
           <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-brand-primary">
             <Lock size={24} />
           </div>
           <h1 className="text-2xl font-black tracking-tighter">{t.title}</h1>
           <p className="text-gray-400 text-sm mt-2">{t.desc}</p>
        </div>

        {message && (
          <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-bold ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {message.type === 'success' ? <CheckCircle size={18}/> : <AlertCircle size={18}/>}
            {message.text}
          </div>
        )}

        {message?.type === 'success' ? (
           <p className="text-center text-gray-400 animate-pulse">{t.redirecting}</p>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            
            {/* Password Input */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2 mb-1 block">{t.passwordLabel}</label>
              <div className="relative">
                 <input 
                   type={showPassword ? "text" : "password"}
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 focus:border-brand-primary outline-none transition-colors"
                   placeholder={t.placeholder}
                   required
                   minLength={6}
                 />
                 <button 
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute right-4 top-3.5 text-gray-500 hover:text-white transition"
                 >
                   {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                 </button>
              </div>
            </div>

            {/* Confirm Input */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2 mb-1 block">{t.confirmLabel}</label>
              <div className="relative">
                 <input 
                   type="password"
                   value={confirmPassword}
                   onChange={(e) => setConfirmPassword(e.target.value)}
                   className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-4 pr-4 focus:border-brand-primary outline-none transition-colors"
                   placeholder={t.placeholder}
                   required
                 />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-brand-primary text-brand-dark font-bold py-4 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" /> : t.btn}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}