"use client";

import { useEffect, useState, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
    { id: "technology", label: "Technology" },
    { id: "features", label: "Features" },
    { id: "shop", label: "Order Now" },
    { id: "FAQ", label: "FAQ" },
];

export default function PageNavigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 1. Visibility Logic (Show after scrolling 100px)
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    // 2. Robust Intersection Observer for Active Section
    const options = {
      root: null,
      rootMargin: "-40% 0px -60% 0px", // Focuses detection on the center-top of the screen
      threshold: 0,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.current?.observe(el);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.current?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* =======================================
              MOBILE: STICKY BAR (Horizontal)
             ======================================= */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="md:hidden fixed top-[104px] left-0 w-full z-40 bg-[#0a0a0a] border-b border-white/10 shadow-2xl py-2"
          >
            <div className="flex justify-around items-center px-2">
              {sections.map((item) => (
                <NavPill 
                  key={item.id} 
                  item={item} 
                  isActive={activeSection === item.id} 
                  layoutId="active-pill-mobile"
                  offset={-140}
                />
              ))}
            </div>
          </motion.div>

          {/* =======================================
              DESKTOP: FLOATING BAR (Vertical)
             ======================================= */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 
                       bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 shadow-2xl
                       p-3 rounded-3xl" 
          >
            {/* UPDATED: Changed rounded-full to rounded-3xl on the container above.
               This prevents the "stretched capsule" look while keeping soft corners.
            */}
            {sections.map((item) => (
              <NavPill 
                key={item.id} 
                item={item} 
                isActive={activeSection === item.id} 
                layoutId="active-pill-desktop"
                offset={-100}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Reusable "Pill" Component
function NavPill({ item, isActive, layoutId, offset }: { item: any, isActive: boolean, layoutId: string, offset: number }) {
  return (
    <ScrollLink
      to={item.id}
      smooth={true}
      duration={800}
      offset={offset}
      className={`
        relative px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider 
        transition-all duration-300 cursor-pointer whitespace-nowrap text-center flex items-center justify-center
        ${isActive ? "text-brand-dark" : "text-gray-400 hover:text-white"}
      `}
    >
      {/* Sliding Yellow Pill Background */}
      {isActive && (
        <motion.div
          layoutId={layoutId}
          className="absolute inset-0 bg-brand-primary rounded-full shadow-[0_0_15px_rgba(203,218,8,0.5)]"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative z-10">{item.label}</span>
    </ScrollLink>
  );
}