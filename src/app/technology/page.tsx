import Header from '@/components/layout/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Zap, ShieldCheck, Droplets, ArrowRight, Beaker, Flame, Wind } from 'lucide-react';

export default function TechnologyPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        
        {/* --- HERO SECTION --- */}
        <section className="pt-40 pb-20 bg-brand-dark text-white relative overflow-hidden">
          {/* Abstract Background */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="container px-6 mx-auto relative z-10 text-center">
            <div className="inline-block px-4 py-1 mb-6 rounded-full border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-widest animate-in fade-in zoom-in duration-700">
              Patented Electrolysis
            </div>
            <h1 className="text-5xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
              Purity through <br/><span className="text-brand-primary">Physics.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              We replaced dangerous acid mixing with precision voltage. The result is a 99.9% pure Chlorine Dioxide solution, free from contaminants and byproducts.
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
                   <h3 className="text-2xl font-bold">The Old Method</h3>
                 </div>
                 <p className="text-gray-500 mb-6">
                   Traditional "Manual Mixing" involves combining Sodium Chlorite with Hydrochloric Acid. This uncontrolled reaction leaves <strong>residual acid</strong> in your final solution and releases dangerous fumes into the air.
                 </p>
                 <ul className="space-y-2 text-sm font-bold text-red-400">
                   <li className="flex gap-2"><Flame size={16}/> High Acid Residue</li>
                   <li className="flex gap-2"><Wind size={16}/> Toxic Fumes Leakage</li>
                   <li className="flex gap-2"><Beaker size={16}/> Inconsistent PPM</li>
                 </ul>
               </div>

               {/* The Dioxera Way */}
               <div className="bg-white p-10 rounded-[2.5rem] border-2 border-brand-primary shadow-2xl shadow-brand-primary/10 relative">
                 <div className="absolute -top-4 -right-4 bg-brand-primary text-brand-dark font-black px-4 py-2 rounded-full text-xs uppercase tracking-wider">
                   Gen-1 Technology
                 </div>
                 <div className="flex items-center gap-4 mb-6 text-brand-dark">
                   <Zap size={32} className="text-brand-primary" fill="currentColor"/>
                   <h3 className="text-2xl font-black">The Dioxera Method</h3>
                 </div>
                 <p className="text-gray-500 mb-6">
                   Our generator uses <strong>Nano-Electrolysis</strong> to activate the precursor solution. The pure gas is generated in a hermetically sealed chamber and infused into distilled water.
                 </p>
                 <ul className="space-y-2 text-sm font-bold text-brand-dark">
                   <li className="flex gap-2"><ShieldCheck size={16} className="text-brand-primary"/> Zero Acid Residue</li>
                   <li className="flex gap-2"><ShieldCheck size={16} className="text-brand-primary"/> Hermetically Sealed Safety</li>
                   <li className="flex gap-2"><ShieldCheck size={16} className="text-brand-primary"/> Exact 3000 PPM Every Time</li>
                 </ul>
               </div>

             </div>
           </div>
        </section>

        {/* --- HOW IT WORKS (STEPS) --- */}
        <section className="py-32">
          <div className="container px-6 mx-auto">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-center mb-24">The Activation Cycle</h2>
            
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
                  <h3 className="text-3xl font-bold">Electrolytic Separation</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    A precise low-voltage current is applied to the Sodium Chlorite solution. This separates the Chlorine Dioxide molecule without requiring a harsh acid activator.
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
                  <h3 className="text-3xl font-bold">Gas Transfer</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    The pure ClO2 gas is released into the system. Unlike liquids, the gas is inherently pure. It travels through a medical-grade silicone bridge, leaving all heavy salts and impurities behind in the reaction chamber.
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
                  <h3 className="text-3xl font-bold">Molecular Infusion</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    The gas is captured in chilled, distilled water until it reaches saturation at exactly 3000 PPM. The system sensors detect saturation and auto-stop the process to prevent over-concentration.
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
                <h4 className="text-brand-primary font-bold uppercase tracking-widest text-xs mb-2">Reaction Chamber</h4>
                <p className="text-2xl font-bold">Borosilicate Glass 3.3</p>
              </div>
              <div className="p-8 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors">
                <h4 className="text-brand-primary font-bold uppercase tracking-widest text-xs mb-2">Electrodes</h4>
                <p className="text-2xl font-bold">Medical Grade Titanium</p>
              </div>
              <div className="p-8 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors">
                <h4 className="text-brand-primary font-bold uppercase tracking-widest text-xs mb-2">Seals</h4>
                <p className="text-2xl font-bold">Viton™ Chemical Resistant</p>
              </div>
              <div className="p-8 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors">
                <h4 className="text-brand-primary font-bold uppercase tracking-widest text-xs mb-2">Calibration</h4>
                <p className="text-2xl font-bold">Digital Photo-Sensor</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA --- */}
        <section className="py-32 bg-white text-center">
           <div className="container px-6 mx-auto">
             <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8">Ready to upgrade?</h2>
             <Link href="/shop" className="inline-flex items-center gap-2 bg-brand-dark text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-brand-primary hover:text-brand-dark transition-all">
               Shop the Gen-1 System <ArrowRight />
             </Link>
           </div>
        </section>

      </main>
    </>
  );
}