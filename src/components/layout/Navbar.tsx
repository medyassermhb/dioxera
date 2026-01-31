"use client";

import { ShoppingBag, Globe, Menu, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/store';
import { supabase } from '@/lib/supabase'; // Import Supabase
import CartDrawer from '@/components/CartDrawer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { items, toggleCart } = useCart();
  const router = useRouter();
  
  // State
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Handle Hydration, Scroll & Auth
  useEffect(() => {
    setMounted(true);
    
    // 1. Scroll Handler
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // 2. Check User Session
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    // 3. Listen for Login/Logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh(); 
  };

  // Determine where the "Account" button goes
  const accountLink = user?.email === "m.mymaouhoubi@mam-nature.com" ? "/admin" : "/dashboard";

  // Prevent hydration mismatch by rendering a safe default first
  const cartCount = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <>
      {/* Header Container */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* 1. Announcement Bar */}
        <div className="bg-brand-primary text-brand-dark text-center py-2 text-[10px] lg:text-xs font-black tracking-[0.2em] uppercase">
          Global Shipping — Free Express Delivery on Gen-1 Units
        </div>
        
        {/* 2. Navigation */}
        <nav 
          className={`
            w-full border-b transition-all duration-500 px-6
            ${scrolled 
              ? 'bg-[#1a1a1a]/90 backdrop-blur-xl border-white/5 py-3 shadow-lg' 
              : 'bg-[#1a1a1a]/70 backdrop-blur-md border-transparent py-5' 
            }
          `}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            {/* LOGO */}
            <Link href="/" className="relative w-40 h-10 block">
              <Image 
                src="https://losdmrjfozfpvhuejdsp.supabase.co/storage/v1/object/public/dioxera/logo%20dioxera.svg" 
                alt="Dioxera Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>
            
            {/* Desktop Links */}
            <div className="hidden md:flex space-x-10 text-xs font-bold uppercase tracking-widest text-gray-300">
              <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
              <Link href="/technology" className="hover:text-white transition-colors">Technology</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-6 text-white">
              
              {/* Globe / Language */}
              <button className="hidden md:block hover:text-brand-primary transition">
                <Globe className="w-5 h-5" />
              </button>

              {/* ACCOUNT ICON */}
              {user ? (
                <>
                  <Link href={accountLink} className="hidden md:block hover:text-brand-primary transition" title="My Account">
                    <User className="w-5 h-5" />
                  </Link>
                  <button onClick={handleLogout} className="hidden md:block hover:text-red-500 transition" title="Logout">
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <Link href="/login" className="hidden md:block hover:text-brand-primary transition" title="Login / Register">
                  <User className="w-5 h-5" />
                </Link>
              )}
              
              {/* Cart Trigger */}
              <button onClick={toggleCart} className="relative group">
                <ShoppingBag className="w-6 h-6 group-hover:text-brand-primary transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-brand-primary text-brand-dark text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1a1a1a] border-b border-white/10 absolute w-full px-6 py-8 space-y-6 shadow-2xl animate-in slide-in-from-top-5 text-white">
             <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-black uppercase tracking-wider hover:text-brand-primary transition">Shop</Link>
             <Link href="/technology" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-black uppercase tracking-wider hover:text-brand-primary transition">Technology</Link>
             <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-black uppercase tracking-wider hover:text-brand-primary transition">About</Link>
             <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-black uppercase tracking-wider hover:text-brand-primary transition">Contact</Link>
             
             <hr className="border-white/10" />
             
             {/* Mobile Account Links */}
             {user ? (
                <>
                  <Link href={accountLink} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-lg font-black uppercase tracking-wider hover:text-brand-primary transition">
                    <User size={20} /> My Account
                  </Link>
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="flex items-center gap-2 text-lg font-black uppercase tracking-wider hover:text-red-500 transition w-full text-left">
                    <LogOut size={20} /> Logout
                  </button>
                </>
             ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-lg font-black uppercase tracking-wider hover:text-brand-primary transition">
                  <User size={20} /> Login / Register
                </Link>
             )}
          </div>
        )}
      </header>
      
      <CartDrawer />
    </>
  );
}