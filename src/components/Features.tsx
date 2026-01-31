import { Zap, Shield, Cpu, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Electrolytic Activation",
    desc: "Our proprietary electrolysis chamber activates Sodium Chlorite with zero acid residue, ensuring the purest CDL solution available."
  },
  {
    icon: Cpu,
    title: "Smart Monitoring",
    desc: "Integrated sensors continuously monitor PPM levels and temperature, adjusting the reaction in real-time for perfect consistency."
  },
  {
    icon: Shield,
    title: "Hermetic Seal",
    desc: "The closed-loop system prevents gas leakage, maximizing potency while ensuring complete safety for the operator."
  },
  {
    icon: RefreshCw,
    title: "Auto-Cycle Technology",
    desc: "One-touch operation. The system handles the mixing, activation, and stabilization phases automatically."
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container px-6 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">Technology Refined.</h2>
          <p className="text-gray-500">We stripped away the complexity of manual generation to create a device that is safer, faster, and more potent.</p>
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