"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, ArrowRight, KeyRound, ArrowLeft, CheckCircle, AlertCircle, X } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { dictionary } from '@/lib/dictionary';
import { motion, AnimatePresence } from 'framer-motion';

// --- TOAST COMPONENT ---
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -50, scale: 0.9 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }} 
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl border backdrop-blur-md min-w-[320px] max-w-md
        ${type === 'success' 
          ? 'bg-green-500/10 border-green-500/50 text-green-400' 
          : 'bg-red-500/10 border-red-500/50 text-red-400'
        }`}
    >
      <div className={`p-1 rounded-full ${type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
        {type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
      </div>
      <p className="flex-1 text-sm font-bold text-white">{message}</p>
      <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
        <X size={14} />
      </button>
    </motion.div>
  );
}

export default function LoginPage() {
  const { language } = useAppStore();
  const t = dictionary[language].login;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Notification State
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // View State
  const [view, setView] = useState<'login' | 'signup' | 'forgot'>('login');
  
  const router = useRouter();

  // Auto-dismiss notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null); // Clear previous

    try {
      if (view === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        
        setNotification({ message: t.alertSignup, type: 'success' });
        setTimeout(() => setView('login'), 2000);
      } 
      else if (view === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/dashboard/profile`,
        });
        if (error) throw error;
        
        setNotification({ message: t.alertReset, type: 'success' });
        setTimeout(() => setView('login'), 3000);
      } 
      else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        // Success notification before redirect
        setNotification({ message: "Login successful. Redirecting...", type: 'success' });
        
        if (email === "m.mymaouhoubi@mam-nature.com") {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (error: any) {
      setNotification({ message: error.message || "An error occurred", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center p-6 text-white relative overflow-hidden">
      
      {/* Toast Notification Container */}
      <AnimatePresence>
        {notification && (
          <Toast 
            message={notification.message} 
            type={notification.type} 
            onClose={() => setNotification(null)} 
          />
        )}
      </AnimatePresence>

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-primary/5 to-transparent pointer-events-none"></div>

      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative z-10 animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="text-center mb-8">
           <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-brand-primary">
             {view === 'forgot' ? <KeyRound size={24} /> : <Lock size={24} />}
           </div>
           <h1 className="text-2xl font-black tracking-tighter">
             {view === 'signup' ? t.createAccount : (view === 'forgot' ? t.resetTitle : t.accessPortal)}
           </h1>
           <p className="text-gray-400 text-sm mt-2">{t.environment}</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          
          {/* Email Field (Always Visible) */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2 mb-1 block">{t.emailLabel}</label>
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
          
          {/* Password Field (Hidden for Forgot Password) */}
          {view !== 'forgot' && (
            <div>
              <div className="flex justify-between items-center mb-1 ml-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t.passwordLabel}</label>
                {view === 'login' && (
                  <button 
                    type="button" 
                    onClick={() => { setView('forgot'); setNotification(null); }}
                    className="text-[10px] font-bold text-brand-primary hover:text-white transition-colors uppercase tracking-widest"
                  >
                    {t.forgotPassword}
                  </button>
                )}
              </div>
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
          )}

          {/* Action Button */}
          <button 
            disabled={loading}
            className="w-full bg-brand-primary text-brand-dark font-bold py-4 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 mt-6"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              view === 'signup' ? t.signUpBtn : (view === 'forgot' ? t.resetBtn : t.loginBtn)
            )}
            {!loading && (view === 'forgot' ? <Mail size={18} /> : <ArrowRight size={18} />)}
          </button>
        </form>

        {/* Footer Links */}
        <div className="space-y-4 mt-6">
          {view === 'forgot' ? (
             <button 
               onClick={() => { setView('login'); setNotification(null); }}
               className="w-full text-center text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
             >
               <ArrowLeft size={12} /> {t.backToLogin}
             </button>
          ) : (
            <button 
              onClick={() => { setView(view === 'login' ? 'signup' : 'login'); setNotification(null); }}
              className="w-full text-center text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
            >
              {view === 'signup' ? t.toggleToLogin : t.toggleToSignUp}
            </button>
          )}
          
          <div className="text-center pt-2 border-t border-white/5">
              <Link href="/" className="text-xs text-brand-primary hover:underline">{t.returnHome}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}