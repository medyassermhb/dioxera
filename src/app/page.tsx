import Header from '@/components/layout/Navbar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Features from '@/components/Features';
import ProductSpotlight from '@/components/ProductSpotlight';
import Accessories from '@/components/Accessories';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer'; // Added Footer for completeness
import PageNavigation from '@/components/PageNavigation'; // The new component

export default function Home() {
  return (
    <>
      <Header />
      
      {/* The Sticky Navigation Rail */}
      <PageNavigation />

      <main className="overflow-hidden">
        
        {/* 1. START SECTION */}
        <section id="hero">
          <Hero />
        </section>

        {/* 2. TECHNOLOGY SECTION */}
        <section id="technology">
          <TrustBar />
          <Features />
        </section>

        {/* 3. FEATURES / SPOTLIGHT SECTION */}
        <section id="features">
          <ProductSpotlight />
        </section>

        {/* 4. SHOP / ACCESSORIES SECTION */}
        <section id="shop">
          <Accessories />
        </section>

        {/* OTHER SECTIONS (Not linked to Nav) */}
        <section id="FAQ">
          <FAQ />
        </section>
        <Newsletter />
      
      </main>
    </>
  );
}