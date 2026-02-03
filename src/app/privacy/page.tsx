import Header from "@/components/layout/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "01. Information Collection",
      content: "We collect information you provide directly to us when purchasing a Dioxera 3000 generator, creating an account, or contacting support. This includes your name, email address, shipping address, and payment information processed securely via Stripe or PayPal."
    },
    {
      title: "02. Data Usage",
      content: "Your data is used to process orders, provide technical support for your CDL systems, and send occasional updates regarding maintenance kits or firmware for your devices. We do not sell your personal data to third parties."
    },
    {
      title: "03. Security Standards",
      content: "We implement industry-standard encryption and security protocols. Our integration with Supabase and modern payment gateways ensures that your sensitive information is handled with molecular-level precision and safety."
    },
    {
      title: "04. Cookies & Tracking",
      content: "We use essential cookies to manage your shopping cart and session state. Technical logs may be collected to improve the performance of the Dioxera Store interface."
    }
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Header />
      <main className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            PRIVACY <span className="text-brand-primary">POLICY.</span>
          </h1>
          <p className="text-gray-400 text-lg mb-16 font-medium">Last Updated: February 2024</p>

          <div className="space-y-12">
            {sections.map((section, idx) => (
              <section key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
                <h2 className="text-brand-primary font-bold uppercase tracking-widest text-sm mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg font-light">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}