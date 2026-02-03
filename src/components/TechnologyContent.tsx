// src/components/TechnologyContent.tsx
"use client";

import Header from '@/components/layout/Navbar';
import Link from 'next/link';
import { Zap, ShieldCheck, Droplets, ArrowRight, Beaker, Flame, Wind } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { dictionary } from '@/lib/dictionary';

export default function TechnologyContent() {
  const { language } = useAppStore();
  const t = dictionary[language].technology;

  return (
    <>
      <Header />
      <main className="bg-white">
        
        {/* --- HERO SECTION --- */}
        <section className="pt-40 pb-20 bg-brand-dark text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="container px-6 mx-auto relative z-10 text-center">
            <div className="inline-block px-4 py-1 mb-6 rounded-full border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-widest animate-in fade-in zoom-in duration-700">
              {t.hero.badge}
            </div>
            <h1 className="text-5xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
              {t.hero.titleLine1} <br/><span className="text-brand-primary">{t.hero.titleLine2}</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
          </div>
        </section>

        {/* --- THE PROBLEM VS SOLUTION --- */}
        <section className="py-24 bg-gray-50">
           <div className="container px-6 mx-auto">
             <div className="grid lg:grid-cols-2 gap-16 items-center">
               
               {/* The Old Way */}
               <div className="bg-white p-10 rounded-[2.5rem] border border-gray-200 opacity-60 hover:opacity-100 transition-opacity">
                 <div className="flex items-center gap-4 mb-6 text-gray-400">
                   <Beaker size={32} />
                   <h3 className="text-2xl font-bold">{t.comparison.oldTitle}</h3>
                 </div>
                 <p className="text-gray-500 mb-6">
                   {t.comparison.oldDesc}
                 </p>
                 <ul className="space-y-2 text-sm font-bold text-red-400">
                   <li className="flex gap-2"><Flame size={16}/> {t.comparison.oldPoints[0]}</li>
                   <li className="flex gap-2"><Wind size={16}/> {t.comparison.oldPoints[1]}</li>
                   <li className="flex gap-2"><Beaker size={16}/> {t.comparison.oldPoints[2]}</li>
                 </ul>
               </div>

               {/* The Dioxera Way */}
               <div className="bg-white p-10 rounded-[2.5rem] border-2 border-brand-primary shadow-2xl shadow-brand-primary/10 relative">
                 <div className="absolute -top-4 -right-4 bg-brand-primary text-brand-dark font-black px-4 py-2 rounded-full text-xs uppercase tracking-wider">
                   {t.comparison.newBadge}
                 </div>
                 <div className="flex items-center gap-4 mb-6 text-brand-dark">
                   <Zap size={32} className="text-brand-primary" fill="currentColor"/>
                   <h3 className="text-2xl font-black">{t.comparison.newTitle}</h3>
                 </div>
                 <p className="text-gray-500 mb-6">
                   {t.comparison.newDesc}
                 </p>
                 <ul className="space-y-2 text-sm font-bold text-brand-dark">
                   <li className="flex gap-2"><ShieldCheck size={16} className="text-brand-primary"/> {t.comparison.newPoints[0]}</li>
                   <li className="flex gap-2"><ShieldCheck size={16} className="text-brand-primary"/> {t.comparison.newPoints[1]}</li>
                   <li className="flex gap-2"><ShieldCheck size={16} className="text-brand-primary"/> {t.comparison.newPoints[2]}</li>
                 </ul>
               </div>

             </div>
           </div>
        </section>

        {/* --- HOW IT WORKS (STEPS) --- */}
        <section className="py-32">
          <div className="container px-6 mx-auto">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-center mb-24">{t.steps.heading}</h2>
            
            <div className="space-y-24">
              {/* Step 1 */}
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2 flex justify-center">
                   <div className="w-64 h-64 rounded-full bg-blue-50 flex items-center justify-center relative">
                      <div className="absolute inset-0 border border-blue-100 rounded-full animate-ping opacity-20"></div>
                      <Zap size={64} className="text-blue-500" />
                   </div>
                </div>
                <div className="lg:w-1/2 space-y-6">
                  <span className="text-9xl font-black text-gray-100 absolute -translate-y-12 -translate-x-6 -z-10 select-none">01</span>
                  <h3 className="text-3xl font-bold">{t.steps.step1Title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    {t.steps.step1Desc}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                <div className="lg:w-1/2 flex justify-center">
                   <div className="w-64 h-64 rounded-full bg-green-50 flex items-center justify-center">
                      <Wind size={64} className="text-green-500" />
                   </div>
                </div>
                <div className="lg:w-1/2 space-y-6">
                  <span className="text-9xl font-black text-gray-100 absolute -translate-y-12 -translate-x-6 -z-10 select-none">02</span>
                  <h3 className="text-3xl font-bold">{t.steps.step2Title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    {t.steps.step2Desc}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2 flex justify-center">
                   <div className="w-64 h-64 rounded-full bg-brand-primary/10 flex items-center justify-center">
                      <Droplets size={64} className="text-brand-dark" />
                   </div>
                </div>
                <div className="lg:w-1/2 space-y-6">
                  <span className="text-9xl font-black text-gray-100 absolute -translate-y-12 -translate-x-6 -z-10 select-none">03</span>
                  <h3 className="text-3xl font-bold">{t.steps.step3Title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    {t.steps.step3Desc}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- SPECS GRID --- */}
        <section className="py-24 bg-brand-dark text-white">
          <div className="container px-6 mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-8 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors">
                <h4 className="text-brand-primary font-bold uppercase tracking-widest text-xs mb-2">{t.specs.chamber}</h4>
                <p className="text-2xl font-bold">{t.specs.chamberVal}</p>
              </div>
              <div className="p-8 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors">
                <h4 className="text-brand-primary font-bold uppercase tracking-widest text-xs mb-2">{t.specs.electrodes}</h4>
                <p className="text-2xl font-bold">{t.specs.electrodesVal}</p>
              </div>
              <div className="p-8 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors">
                <h4 className="text-brand-primary font-bold uppercase tracking-widest text-xs mb-2">{t.specs.seals}</h4>
                <p className="text-2xl font-bold">{t.specs.sealsVal}</p>
              </div>
              <div className="p-8 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors">
                <h4 className="text-brand-primary font-bold uppercase tracking-widest text-xs mb-2">{t.specs.calibration}</h4>
                <p className="text-2xl font-bold">{t.specs.calibrationVal}</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA --- */}
        <section className="py-32 bg-white text-center">
           <div className="container px-6 mx-auto">
             <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8">{t.cta.title}</h2>
             <Link href="/shop" className="inline-flex items-center gap-2 bg-brand-dark text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-brand-primary hover:text-brand-dark transition-all">
               {t.cta.btn} <ArrowRight />
             </Link>
           </div>
        </section>

      </main>
    </>
  );
}