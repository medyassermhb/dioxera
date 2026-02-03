"use client";
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { dictionary } from '@/lib/dictionary';

export default function FAQ() {
  const { language } = useAppStore();
  const t = dictionary[language].faq;
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    { q: t.q1, a: t.a1 },
    { q: t.q2, a: t.a2 },
    { q: t.q3, a: t.a3 },
    { q: t.q4, a: t.a4 },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container px-6 mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black tracking-tight mb-4">{t.heading}</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-lg">{faq.q}</span>
                {open === i ? <Minus size={20} className="text-brand-primary"/> : <Plus size={20} className="text-gray-400"/>}
              </button>
              
              <div className={`px-6 overflow-hidden transition-all duration-300 ${open === i ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}