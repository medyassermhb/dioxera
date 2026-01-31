"use client";

import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "hero", label: "Start" },
  { id: "technology", label: "Technology" },
  { id: "features", label: "Features" },
  { id: "shop", label: "Order Now" },
];

export default function PageNavigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Show only after scrolling past the very top
      setIsVisible(window.scrollY > 100);

      // 2. Detect Active Section
      const current = sections.find(section => {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const viewportMiddle = window.innerHeight / 2;
          return rect.top <= viewportMiddle && rect.bottom >= viewportMiddle;
        }
        return false;
      });
      
      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* =======================================
              MOBILE: STICKY BAR UNDER NAVBAR
             ======================================= */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            // Fixed at top: 60px (assuming navbar height) with Solid Background
            className="md:hidden fixed top-[60px] left-0 w-full z-40 bg-[#0a0a0a] border-b border-white/10 shadow-2xl py-2"
          >
            <div className="flex justify-around items-center px-2 overflow-x-auto no-scrollbar">
              {sections.map((item) => (
                <ScrollLink
                  key={item.id}
                  to={item.id}
                  smooth={true}
                  duration={800}
                  offset={-140} // Offset for Mobile Header + Nav Bar
                  className={`
                    relative px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap
                    ${activeSection === item.id ? "text-black" : "text-gray-400 hover:text-white"}
                  `}
                >
                  {/* Sliding Yellow Pill */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="active-pill-mobile"
                      className="absolute inset-0 bg-brand-primary rounded-full shadow-[0_0_15px_rgba(203,218,8,0.5)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </ScrollLink>
              ))}
            </div>
          </motion.div>

          {/* =======================================
              DESKTOP: VERTICAL LEFT CAPSULE
             ======================================= */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-6 
                       bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 shadow-2xl
                       px-3 py-6 rounded-full"
          >
            {sections.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <ScrollLink
                  key={item.id}
                  to={item.id}
                  smooth={true}
                  duration={800}
                  offset={-100}
                  className="group relative flex items-center justify-center cursor-pointer"
                >
                  {/* The Line Indicator inside the capsule */}
                  <div className={`
                    w-1 rounded-full transition-all duration-500
                    ${isActive 
                      ? "h-8 bg-brand-primary shadow-[0_0_15px_#CBDA08]" 
                      : "h-3 bg-gray-600 group-hover:bg-white group-hover:h-5"}
                  `} />
                  
                  {/* The Label (Floating outside to the right) */}
                  <div className={`
                    absolute left-8 bg-black/80 backdrop-blur px-3 py-1 rounded-md border border-white/10
                    text-[10px] font-bold uppercase tracking-widest whitespace-nowrap pointer-events-none
                    transition-all duration-300
                    ${isActive 
                      ? "opacity-100 translate-x-0 text-white" 
                      : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-gray-400"}
                  `}>
                    {item.label}
                    {/* Tiny triangle pointing left */}
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-r-[4px] border-r-black/80 border-b-[4px] border-b-transparent"></div>
                  </div>
                </ScrollLink>
              );
            })}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}