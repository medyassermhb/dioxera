// src/components/AboutContent.tsx
"use client";

import Header from '@/components/layout/Navbar';
import Link from 'next/link';
import { Target, Users, Globe, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { dictionary } from '@/lib/dictionary';

export default function AboutContent() {
  const { language } = useAppStore();
  const t = dictionary[language].about;

  return (
    <>
      <Header />
      <main className="bg-white">
        
        {/* --- HERO SECTION --- */}
        <section className="pt-40 pb-20 bg-gray-50 border-b border-gray-200">
          <div className="container px-6 mx-auto">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-brand-dark text-white text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                {t.hero.est}
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-brand-dark mb-8 leading-[1.1]">
                {t.hero.titleLine1} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-dark">{t.hero.titleLine2}</span>
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
                {t.hero.description}
              </p>
            </div>
          </div>
        </section>

        {/* --- OUR STORY (Split Layout) --- */}
        <section className="py-24">
          <div className="container px-6 mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              
              {/* Left: Image / Visual */}
              <div className="lg:w-1/2">
                <div className="bg-brand-dark rounded-[3rem] aspect-[4/5] p-12 relative overflow-hidden flex flex-col justify-between text-white">
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-2">{t.story.location}</h3>
                    <p className="text-brand-primary font-bold uppercase tracking-widest text-xs">{t.story.hq}</p>
                  </div>

                  <div className="relative z-10 space-y-6">
                    <p className="text-lg leading-relaxed text-gray-300">
                      {t.story.quote}
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                       <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold">JD</div>
                       <div>
                         <p className="font-bold">John Doe</p>
                         <p className="text-xs text-gray-400 uppercase tracking-wider">{t.story.founderRole}</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Text Content */}
              <div className="lg:w-1/2 lg:pt-12 space-y-12">
                <div>
                  <h2 className="text-4xl font-black tracking-tight mb-6">{t.story.heading}</h2>
                  <div className="prose text-gray-500 leading-relaxed space-y-6">
                    <p>{t.story.p1}</p>
                    <p>
                      {t.story.p2Part1} <strong>{t.story.p2Part2}</strong>{t.story.p2Part3}
                    </p>
                    <p>{t.story.p3}</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-8 py-8 border-y border-gray-100">
                  <div>
                    <p className="text-4xl font-black text-brand-dark">99.9%</p>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">{t.story.stats.purity}</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-brand-dark">15+</p>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">{t.story.stats.patents}</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-brand-dark">24h</p>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">{t.story.stats.support}</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-brand-dark">5yr</p>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">{t.story.stats.warranty}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- VALUES GRID --- */}
        <section className="py-24 bg-brand-dark text-white">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-6">{t.values.heading}</h2>
              <p className="text-gray-400">{t.values.subheading}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <Target size={48} className="text-brand-primary mb-6" />
                <h3 className="text-xl font-bold mb-4">{t.values.v1Title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {t.values.v1Desc}
                </p>
              </div>
              
              <div className="bg-white/5 p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <ShieldCheck size={48} className="text-brand-primary mb-6" />
                <h3 className="text-xl font-bold mb-4">{t.values.v2Title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {t.values.v2Desc}
                </p>
              </div>

              <div className="bg-white/5 p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <Globe size={48} className="text-brand-primary mb-6" />
                <h3 className="text-xl font-bold mb-4">{t.values.v3Title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {t.values.v3Desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- TEAM / CTA --- */}
        <section className="py-32 bg-white text-center">
          <div className="container px-6 mx-auto max-w-3xl">
            <Award size={64} className="text-brand-dark mx-auto mb-8" />
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8">{t.cta.title}</h2>
            <p className="text-xl text-gray-500 mb-10">
              {t.cta.desc}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/products" className="px-10 py-5 bg-brand-dark text-white rounded-full font-bold text-lg hover:bg-brand-primary hover:text-brand-dark transition-all shadow-xl">
                {t.cta.btn1}
              </Link>
              <Link href="/contact" className="px-10 py-5 bg-gray-100 text-brand-dark rounded-full font-bold text-lg hover:bg-gray-200 transition-all">
                {t.cta.btn2}
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}