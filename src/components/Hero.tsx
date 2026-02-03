"use client";

import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { dictionary } from '@/lib/dictionary';

export default function Hero() {
  const { language } = useAppStore();
  const t = dictionary[language].hero;

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-8 animate-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{t.available}</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-brand-dark leading-[1.1]">
              {t.titleLine1} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-dark">{t.titleLine2}</span>
            </h1>
            
            <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
              {t.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/products/cdl-generator" className="px-8 py-4 bg-brand-dark text-white rounded-full font-bold hover:bg-brand-primary hover:text-brand-dark transition-all flex items-center gap-2 shadow-xl shadow-brand-dark/10">
                {t.btnPrimary} <ArrowRight size={18} />
              </Link>
              <Link href="/technology" className="px-8 py-4 bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200 transition-all">
                {t.btnSecondary}
              </Link>
            </div>
            
            {/* REMOVED: 5-Year Warranty & Swiss Made Badges */}
          </div>

          {/* Hero Image */}
          <div className="w-full lg:w-1/2 relative animate-in fade-in zoom-in duration-1000">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-3xl -z-10"></div>
            
            <div className="relative bg-gradient-to-b from-gray-50 to-gray-100 rounded-[3rem] border border-gray-200 aspect-square flex items-center justify-center shadow-2xl">
              <div className="text-center space-y-4">
                <div className="w-64 h-64 bg-white rounded-full shadow-inner mx-auto flex items-center justify-center">
                  <span className="text-xs font-mono text-gray-300">{t.renderText}</span>
                </div>
                <p className="font-mono text-sm text-gray-400 uppercase tracking-widest">{t.unitName}</p>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">{t.concentration}</p>
                <p className="text-3xl font-black text-brand-dark">3000 <span className="text-sm font-bold text-gray-400">PPM</span></p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}