// src/components/ContactContent.tsx
"use client";

import { useState } from 'react';
import Header from '@/components/layout/Navbar';
import { Mail, MapPin, Send, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { dictionary } from '@/lib/dictionary';

export default function ContactContent() {
  const { language } = useAppStore();
  const t = dictionary[language].contact;

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'), // Added Phone
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.form.errorGeneric);
      }

      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.message || t.form.errorGeneric);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="bg-white pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            
            {/* Left: Contact Info */}
            <div>
              <h1 className="text-6xl font-black tracking-tighter mb-8">
                {t.hero.titleStart} <span className="text-brand-primary">{t.hero.titleEnd}</span>
              </h1>
              <p className="text-gray-500 text-lg mb-12">
                {t.hero.desc}
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-brand-secondary rounded-xl flex items-center justify-center text-brand-dark"><Mail size={20}/></div>
                  <div><p className="text-xs font-bold text-gray-400 uppercase">{t.info.emailLabel}</p><p className="font-bold">support@dioxera.com</p></div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-brand-secondary rounded-xl flex items-center justify-center text-brand-dark"><MapPin size={20}/></div>
                  <div><p className="text-xs font-bold text-gray-400 uppercase">{t.info.hqLabel}</p><p className="font-bold whitespace-pre-line">{t.info.hqValue}</p></div>
                </div>
              </div>
            </div>

            {/* Right: The Form or Success Message */}
            <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 relative min-h-[500px] flex flex-col justify-center">
              
              {status === 'success' ? (
                // SUCCESS STATE UI
                <div className="flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center text-brand-dark shadow-2xl shadow-brand-primary/30">
                    <CheckCircle size={48} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black tracking-tight mb-2">{t.success.title}</h3>
                    <p className="text-gray-500 max-w-xs mx-auto">{t.success.desc}</p>
                  </div>
                  <button 
                    onClick={() => setStatus('idle')} 
                    className="mt-4 text-sm font-bold text-brand-dark underline decoration-brand-primary decoration-2 underline-offset-4 hover:text-brand-primary transition"
                  >
                    {t.success.btn}
                  </button>
                </div>
              ) : (
                // FORM STATE UI
                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                  {status === 'error' && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-bold border border-red-100 animate-in slide-in-from-top-2">
                      <AlertCircle size={18} /> {errorMessage}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">{t.form.nameLabel}</label>
                      <input name="name" required className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-brand-primary transition font-bold" placeholder={t.form.namePlaceholder} />
                    </div>
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">{t.form.emailLabel}</label>
                      <input name="email" type="email" required className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-brand-primary transition font-bold" placeholder={t.form.emailPlaceholder} />
                    </div>
                    {/* Phone - NEW */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">{t.form.phoneLabel}</label>
                      <input name="phone" type="tel" className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-brand-primary transition font-bold" placeholder={t.form.phonePlaceholder} />
                    </div>
                    {/* Subject - UPDATED TO DROPDOWN */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">{t.form.subjectLabel}</label>
                      <div className="relative">
                        <select 
                          name="subject" 
                          required 
                          defaultValue="" 
                          className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-brand-primary transition font-bold appearance-none cursor-pointer"
                        >
                          <option value="" disabled>{t.form.subjectPlaceholder}</option>
                          <option value="General Inquiry">{t.form.subjectOptions.general}</option>
                          <option value="Technical Support">{t.form.subjectOptions.support}</option>
                          <option value="Sales & Orders">{t.form.subjectOptions.sales}</option>
                          <option value="Partnership">{t.form.subjectOptions.partnership}</option>
                          <option value="Other">{t.form.subjectOptions.other}</option>
                        </select>
                        {/* Custom Arrow Icon */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">{t.form.messageLabel}</label>
                    <textarea name="message" rows={5} required className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-brand-primary transition font-medium resize-none" placeholder={t.form.messagePlaceholder}></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-5 bg-brand-dark text-white rounded-full font-bold text-lg hover:bg-brand-primary hover:text-brand-dark transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-brand-dark/20"
                  >
                    {loading ? <><Loader2 className="animate-spin" /> {t.form.btnSending}</> : <>{t.form.btnSend} <Send size={18}/></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}