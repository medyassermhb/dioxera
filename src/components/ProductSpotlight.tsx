import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default async function ProductSpotlight() {
  // Fetch specifically the DIOXERA 3000
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', 'dioxera-3000') // Targets the new main product
    .single();

  if (!product) return null;

  return (
    <section className="py-24 overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className="bg-brand-dark rounded-[3rem] p-8 lg:p-20 text-white relative overflow-hidden shadow-2xl">
          
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
            {/* Left: Text */}
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-block px-4 py-1 rounded-full border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-widest animate-pulse">
                New Release
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">
                {product.name}
              </h2>
              
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                The ultimate automated CDL production system. Generates exactly 3000 PPM solution with Swiss precision.
              </p>
              
              <ul className="space-y-4">
                {['3000 PPM Precision', 'Fully Automated Cycle', 'Zero-Leak Technology', 'Medical Grade Materials'].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-medium text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-brand-dark">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="pt-8 flex flex-wrap gap-4">
                <Link href={`/products/${product.id}`} className="px-10 py-5 bg-white text-brand-dark rounded-full font-bold hover:bg-brand-primary transition-all text-lg flex items-center gap-2 shadow-lg hover:shadow-xl">
                  Buy Now - €{product.price} <ArrowRight size={18}/>
                </Link>
                <Link href="/technology" className="px-10 py-5 border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-all text-lg">
                  See Technology
                </Link>
              </div>
            </div>

            {/* Right: Product Image */}
            <div className="lg:w-1/2 w-full flex justify-center">
              <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] border border-white/10 flex items-center justify-center backdrop-blur-sm p-8 group">
                {product.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <span className="font-mono text-white/30 uppercase tracking-[1em] -rotate-45">NO IMAGE</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}