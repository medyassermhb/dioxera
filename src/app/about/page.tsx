import Header from '@/components/layout/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Target, Users, Globe, Award, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
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
                Est. 2024
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-brand-dark mb-8 leading-[1.1]">
                We are building the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-dark">future of sanitation.</span>
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
                Dioxera was founded on a simple premise: Industrial-grade purity should be accessible to everyone. We engineer automated systems that remove the danger and guesswork from Chlorine Dioxide generation.
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
                    <h3 className="text-3xl font-black mb-2">Zug, Switzerland</h3>
                    <p className="text-brand-primary font-bold uppercase tracking-widest text-xs">Global Headquarters</p>
                  </div>

                  <div className="relative z-10 space-y-6">
                    <p className="text-lg leading-relaxed text-gray-300">
                      "We saw a market filled with dangerous, manual mixing kits and unstable solutions. We knew there had to be a better way—a way to use precision engineering to guarantee safety."
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                       <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold">JD</div>
                       <div>
                         <p className="font-bold">John Doe</p>
                         <p className="text-xs text-gray-400 uppercase tracking-wider">Founder & CEO</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Text Content */}
              <div className="lg:w-1/2 lg:pt-12 space-y-12">
                <div>
                  <h2 className="text-4xl font-black tracking-tight mb-6">From Lab to Living Room.</h2>
                  <div className="prose text-gray-500 leading-relaxed space-y-6">
                    <p>
                      For decades, generating high-purity Chlorine Dioxide (CDL) was a process reserved for industrial chemists. It involved hazardous acids, toxic fumes, and precise temperature controls that were impossible to replicate at home.
                    </p>
                    <p>
                      Dioxera changed that. By miniaturizing the electrolytic activation process used in municipal water treatment, we created the <strong>Gen-1 Series</strong>.
                    </p>
                    <p>
                      Today, we are proud to serve over 5,000 customers across Europe and North America, providing them with the tools to generate medical-grade purity on demand.
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-8 py-8 border-y border-gray-100">
                  <div>
                    <p className="text-4xl font-black text-brand-dark">99.9%</p>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Purity Grade</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-brand-dark">15+</p>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Patents Filed</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-brand-dark">24h</p>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Global Support</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-brand-dark">5yr</p>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Warranty</p>
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
              <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-6">Our Core Principles</h2>
              <p className="text-gray-400">We don't cut corners. Every device we build is a testament to these three non-negotiable values.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <Target size={48} className="text-brand-primary mb-6" />
                <h3 className="text-xl font-bold mb-4">Precision First</h3>
                <p className="text-gray-400 leading-relaxed">
                  In chemistry, "close enough" is dangerous. Our sensors are calibrated to 0.01% tolerance to ensure your solution is exactly 3000 PPM.
                </p>
              </div>
              
              <div className="bg-white/5 p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <ShieldCheck size={48} className="text-brand-primary mb-6" />
                <h3 className="text-xl font-bold mb-4">Safety by Design</h3>
                <p className="text-gray-400 leading-relaxed">
                  We engineer out the risk. Hermetic seals, child-locks, and auto-shutoff features protect you and your family from accidents.
                </p>
              </div>

              <div className="bg-white/5 p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <Globe size={48} className="text-brand-primary mb-6" />
                <h3 className="text-xl font-bold mb-4">Sustainability</h3>
                <p className="text-gray-400 leading-relaxed">
                  We build for longevity, not obsolescence. Our borosilicate glass and stainless steel components are designed to last a lifetime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- TEAM / CTA --- */}
        <section className="py-32 bg-white text-center">
          <div className="container px-6 mx-auto max-w-3xl">
            <Award size={64} className="text-brand-dark mx-auto mb-8" />
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-8">Join the movement.</h2>
            <p className="text-xl text-gray-500 mb-10">
              Experience the difference of Swiss engineering. Stop settling for impure solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/products" className="px-10 py-5 bg-brand-dark text-white rounded-full font-bold text-lg hover:bg-brand-primary hover:text-brand-dark transition-all shadow-xl">
                View Our Products
              </Link>
              <Link href="/contact" className="px-10 py-5 bg-gray-100 text-brand-dark rounded-full font-bold text-lg hover:bg-gray-200 transition-all">
                Contact Support
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}