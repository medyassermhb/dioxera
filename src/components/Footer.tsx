import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-24 pb-12 px-6 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          
          {/* COLUMN 1: LOGO & SOCIALS */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="block relative w-40 h-10 mb-6">
              {/* brightness-0 invert makes the black logo white for the footer */}
              <Image 
                src="https://losdmrjfozfpvhuejdsp.supabase.co/storage/v1/object/public/dioxera/logo%20dioxera.svg" 
                alt="Dioxera"
                fill
                className="object-contain object-left brightness-0 invert" 
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Leading the world in high-purity CDL generation technology. Swiss engineering, global impact.
            </p>
            <div className="flex space-x-4">
              <Facebook className="hover:text-brand-primary cursor-pointer w-5 h-5" />
              <Instagram className="hover:text-brand-primary cursor-pointer w-5 h-5" />
              <Twitter className="hover:text-brand-primary cursor-pointer w-5 h-5" />
            </div>
          </div>

          {/* COLUMN 2: PRODUCTS */}
          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Products</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><Link href="/shop" className="hover:text-brand-primary transition">CDL Generator Gen-1</Link></li>
              <li><Link href="/shop" className="hover:text-brand-primary transition">Codiom Clorique</Link></li>
              <li><Link href="/shop" className="hover:text-brand-primary transition">Water Distiller</Link></li>
              <li><Link href="/shop" className="hover:text-brand-primary transition">Replacement Kits</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: SUPPORT */}
          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><Link href="/contact" className="hover:text-brand-primary transition">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-brand-primary transition">Global Shipping</Link></li>
              <li><Link href="/warranty" className="hover:text-brand-primary transition">Warranty Claims</Link></li>
              <li><Link href="/faq" className="hover:text-brand-primary transition">Help Center</Link></li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER */}
          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Join the elite circle of Dioxera owners.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full bg-neutral-900 border border-neutral-800 py-3 px-4 rounded-lg focus:outline-none focus:border-brand-primary text-sm transition-colors text-white placeholder-gray-600"
              />
              <button className="absolute right-2 top-2 bg-brand-primary text-brand-dark px-3 py-1 rounded font-bold text-xs hover:bg-white transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4 font-bold tracking-wide">
          <p>© {new Date().getFullYear()} DIOXERA TECHNOLOGY. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 hover:text-white cursor-pointer transition"><Globe size={14}/> Worldwide (EN)</span>
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}