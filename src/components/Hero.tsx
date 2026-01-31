import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-8 animate-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Gen-1 Series Available</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-brand-dark leading-[1.1]">
              Molecular <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-dark">Purity.</span>
            </h1>
            
            <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
              Experience the next standard in automated CDL generation. Swiss-engineered for clinical precision, safety, and 99.9% purity.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/products/cdl-generator" className="px-8 py-4 bg-brand-dark text-white rounded-full font-bold hover:bg-brand-primary hover:text-brand-dark transition-all flex items-center gap-2 shadow-xl shadow-brand-dark/10">
                Shop Gen-1 System <ArrowRight size={18} />
              </Link>
              <Link href="/technology" className="px-8 py-4 bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200 transition-all">
                How it Works
              </Link>
            </div>
            
            <div className="flex items-center gap-6 pt-4 text-sm font-bold text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-brand-primary" />
                <span>5-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-brand-primary" />
                <span>Swiss Made</span>
              </div>
            </div>
          </div>

          {/* Hero Image / Graphic */}
          <div className="w-full lg:w-1/2 relative animate-in fade-in zoom-in duration-1000">
            {/* Abstract Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-3xl -z-10"></div>
            
            {/* Placeholder for Product Image */}
            <div className="relative bg-gradient-to-b from-gray-50 to-gray-100 rounded-[3rem] border border-gray-200 aspect-square flex items-center justify-center shadow-2xl">
              <div className="text-center space-y-4">
                <div className="w-64 h-64 bg-white rounded-full shadow-inner mx-auto flex items-center justify-center">
                  <span className="text-xs font-mono text-gray-300">PRODUCT RENDER</span>
                </div>
                <p className="font-mono text-sm text-gray-400 uppercase tracking-widest">Dioxera Gen-1 Unit</p>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Concentration</p>
                <p className="text-3xl font-black text-brand-dark">3000 <span className="text-sm font-bold text-gray-400">PPM</span></p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}