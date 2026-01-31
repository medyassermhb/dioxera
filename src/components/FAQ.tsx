"use client";
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: "How long does the generator take to produce a batch?", a: "The Gen-1 system produces 500ml of 3000 PPM solution in approximately 45 minutes." },
  { q: "Is it safe to use at home?", a: "Yes. Unlike manual mixing which releases gas, our hermetically sealed chamber prevents any gas leakage, making it safe for indoor use." },
  { q: "What maintenance is required?", a: "We recommend flushing the system with distilled water after every 5 uses. The reaction chamber should be replaced annually." },
  { q: "Do you ship internationally?", a: "Yes, we ship from Switzerland to anywhere in Europe and North America via DHL Express." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container px-6 mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black tracking-tight mb-4">Frequently Asked Questions</h2>
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