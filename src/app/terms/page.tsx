import Header from "@/components/layout/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  const terms = [
    {
      label: "Purchase Agreement",
      text: "By placing an order for a Dioxera system, you agree to provide accurate shipping and payment information. Orders are subject to verification and availability."
    },
    {
      label: "Payment Methods",
      text: "We accept Stripe, PayPal (Capture), and Direct Bank Transfers. For bank transfers, orders will remain in 'Pending' status until funds are cleared by our Swiss financial partners."
    },
    {
      label: "Intellectual Property",
      text: "All technology, designs, and content on this site related to the Dioxera 3000 and CDL generation are the exclusive property of Dioxera Technology. Unauthorized reproduction is strictly prohibited."
    },
    {
      label: "Liability",
      text: "Dioxera Technology is not liable for damages resulting from improper use of industrial-grade CDL generators. Users must follow the provided technical specifications and safety manuals."
    }
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans">
      <Header />
      <main className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            TERMS OF <span className="text-brand-primary">SERVICE.</span>
          </h1>
          <p className="text-gray-400 text-lg mb-16 font-medium tracking-wide">SYSTEM USAGE PROTOCOLS</p>

          <div className="grid gap-6">
            {terms.map((item, i) => (
              <div key={i} className="group border-l-2 border-white/10 hover:border-brand-primary pl-8 py-4 transition-colors">
                <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">{item.label}</h3>
                <p className="text-gray-400 leading-relaxed font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 bg-brand-primary rounded-[2.5rem] text-brand-dark">
            <h4 className="font-black text-2xl mb-2">Questions regarding our protocols?</h4>
            <p className="font-bold opacity-80 mb-6">Our legal and technical teams are available for consultation.</p>
            <a href="/contact" className="inline-block bg-brand-dark text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
              CONTACT LEGAL DEPT
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}