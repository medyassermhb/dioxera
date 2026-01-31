import { Award, Droplets, Globe2, FlaskConical } from 'lucide-react';

const trustItems = [
  { icon: Globe2, label: "Swiss Engineering", sub: "Designed in Zug" },
  { icon: FlaskConical, label: "Lab Certified", sub: "99.9% Purity Guaranteed" },
  { icon: Droplets, label: "Zero Residue", sub: "Advanced Distillation" },
  { icon: Award, label: "Medical Grade", sub: "ISO Compliant Materials" },
];

export default function TrustBar() {
  return (
    <section className="bg-brand-dark text-white py-12 border-y border-white/10">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustItems.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-3 group hover:opacity-100 opacity-70 transition-opacity cursor-default">
              <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-brand-primary group-hover:text-brand-dark transition-colors duration-300">
                <item.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-wide">{item.label}</h4>
                <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}