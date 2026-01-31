"use client";

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('idle'); // Or show error
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-24 bg-[#111] text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest mb-6 text-brand-primary">
            <Mail size={12} /> Stay Updated
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
            Join the <span className="text-brand-primary">Inner Circle</span>
          </h2>
          
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Get exclusive access to Gen-2 prototypes, medical protocol updates, and early-bird pricing on new equipment.
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'success'}
              className="w-full h-16 pl-6 pr-36 rounded-full bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary focus:bg-white/5 transition-all"
            />
            
            <button 
              type="submit" 
              disabled={status !== 'idle'}
              className={`absolute right-2 top-2 h-12 px-6 rounded-full font-bold transition-all flex items-center gap-2
                ${status === 'success' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-brand-primary text-brand-dark hover:bg-white'
                }
              `}
            >
              {status === 'loading' ? (
                <Loader2 className="animate-spin" size={18} />
              ) : status === 'success' ? (
                <><CheckCircle2 size={18} /> Joined</>
              ) : (
                <>Join <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <p className="mt-6 text-xs text-gray-600 uppercase tracking-widest">
            No Spam. Unsubscribe Anytime.
          </p>
        </div>
      </div>
    </section>
  );
}