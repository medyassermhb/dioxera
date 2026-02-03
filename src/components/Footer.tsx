"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Globe } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { dictionary } from '@/lib/dictionary';

export default function Footer() {
  const { language, setLanguage } = useAppStore();
  const t = dictionary[language].footer;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <footer className="bg-brand-dark text-white pt-24 pb-12 px-6 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          
          {/* COLUMN 1 */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="block relative w-40 h-10 mb-6">
              <Image 
                src="https://losdmrjfozfpvhuejdsp.supabase.co/storage/v1/object/public/dioxera/logo%20dioxera.svg" 
                alt="Dioxera"
                fill
                className="object-contain object-left brightness-0 invert" 
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t.tagline}
            </p>
            <div className="flex space-x-4">
              <Facebook className="hover:text-brand-primary cursor-pointer w-5 h-5" />
              <Instagram className="hover:text-brand-primary cursor-pointer w-5 h-5" />
              <Twitter className="hover:text-brand-primary cursor-pointer w-5 h-5" />
            </div>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">{t.col1}</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><Link href="/shop" className="hover:text-brand-primary transition">CDL Generator Gen-1</Link></li>
              <li><Link href="/shop" className="hover:text-brand-primary transition">Codiom Clorique</Link></li>
              <li><Link href="/shop" className="hover:text-brand-primary transition">Water Distiller</Link></li>
              <li><Link href="/shop" className="hover:text-brand-primary transition">Replacement Kits</Link></li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">{t.col2}</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><Link href="/contact" className="hover:text-brand-primary transition">{t.contact}</Link></li>
              <li><Link href="/shipping" className="hover:text-brand-primary transition">{t.shipping}</Link></li>
              <li><Link href="/warranty" className="hover:text-brand-primary transition">{t.warranty}</Link></li>
              <li><Link href="/faq" className="hover:text-brand-primary transition">{t.help}</Link></li>
            </ul>
          </div>

          {/* COLUMN 4 */}
          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">{t.col3}</h4>
            <p className="text-gray-400 text-sm mb-4">{t.col3_desc}</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full bg-neutral-900 border border-neutral-800 py-3 px-4 rounded-lg focus:outline-none focus:border-brand-primary text-sm transition-colors text-white placeholder-gray-600"
              />
              <button className="absolute right-2 top-2 bg-brand-primary text-brand-dark px-3 py-1 rounded font-bold text-xs hover:bg-white transition-colors">
                {t.joinBtn}
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4 font-bold tracking-wide">
          <p>© {new Date().getFullYear()} {t.rights}</p>
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 hover:text-white cursor-pointer transition"
            >
              <Globe size={14}/> {language === 'en' ? 'Worldwide (EN)' : 'Monde (FR)'}
            </button>
            <Link href="/privacy" className="hover:text-white transition">{t.privacy}</Link>
            <Link href="/terms" className="hover:text-white transition">{t.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}