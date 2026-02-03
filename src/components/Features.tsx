"use client";

import { Zap, Shield, Cpu, RefreshCw } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { dictionary } from '@/lib/dictionary';

export default function Features() {
  const { language } = useAppStore();
  const t = dictionary[language].features;

  const features = [
    {
      icon: Zap,
      title: t.f1_title,
      desc: t.f1_desc
    },
    {
      icon: Cpu,
      title: t.f2_title,
      desc: t.f2_desc
    },
    {
      icon: Shield,
      title: t.f3_title,
      desc: t.f3_desc
    },
    {
      icon: RefreshCw,
      title: t.f4_title,
      desc: t.f4_desc
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container px-6 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">{t.heading}</h2>
          <p className="text-gray-500">{t.subheading}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-brand-primary/50 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-brand-dark transition-colors">
                <f.icon size={24} />
              </div>
              <h3 className="font-bold text-lg mb-3">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}