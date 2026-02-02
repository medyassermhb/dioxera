"use client";

import { motion } from "framer-motion";
import { Play, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";

// Mock Data for Videos (Replace with your actual YouTube/Vimeo/S3 links)
const videos = [
  {
    id: "setup",
    title: "Initial Setup & Calibration",
    duration: "4:20",
    thumbnail: "/images/video-thumb-1.jpg", // Replace with real images or remove
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=Example", // Replace!
    description: "Step-by-step guide to unboxing and calibrating your Dioxera 3000.",
  },
  {
    id: "production",
    title: "Generating CDL Solution",
    duration: "8:15",
    thumbnail: "/images/video-thumb-2.jpg",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=Example",
    description: "How to safely produce high-purity solutions using the reactor.",
  },
  {
    id: "maintenance",
    title: "Cleaning & Maintenance",
    duration: "3:45",
    thumbnail: "/images/video-thumb-3.jpg",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=Example",
    description: "Routine maintenance to ensure longevity of the electrodes.",
  },
];

export default function InstructionsPage() {
  const [activeVideo, setActiveVideo] = useState(videos[0]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-block px-4 py-1 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary text-xs font-black uppercase tracking-widest mb-4">
            Authorized Access Only
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Operator <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-white">Manual</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Welcome to the Dioxera digital resource center. Below you will find critical operational protocols and visual guides for your unit.
          </p>
        </motion.div>

        {/* MAIN VIDEO PLAYER */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: Video Player */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(203,218,8,0.1)] bg-black">
              <iframe 
                src={activeVideo.url} 
                title={activeVideo.title}
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold uppercase tracking-wide flex items-center gap-3">
                <Play className="w-6 h-6 text-brand-primary fill-brand-primary" />
                {activeVideo.title}
              </h2>
              <p className="text-gray-400 leading-relaxed border-l-2 border-brand-primary/30 pl-4">
                {activeVideo.description}
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Video Playlist */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 flex flex-col gap-4"
          >
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-2">Select Chapter</h3>
            
            {videos.map((video, idx) => (
              <button
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`
                  group flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-300 border
                  ${activeVideo.id === video.id 
                    ? "bg-white/5 border-brand-primary/50 shadow-[0_0_20px_rgba(203,218,8,0.1)]" 
                    : "bg-transparent border-white/5 hover:bg-white/5 hover:border-white/20"}
                `}
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1 font-mono text-xs text-gray-400 group-hover:text-white transition-colors">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className={`font-bold text-sm uppercase tracking-wide transition-colors ${activeVideo.id === video.id ? "text-brand-primary" : "text-gray-200 group-hover:text-white"}`}>
                    {video.title}
                  </h4>
                  <span className="text-xs text-gray-500 mt-1 block">{video.duration} Mins</span>
                </div>
              </button>
            ))}

            {/* QUICK LINKS / RESOURCES */}
            <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
               <h3 className="text-sm font-black uppercase tracking-widest text-gray-500">Essential Docs</h3>
               
               <a href="/docs/manual.pdf" className="flex items-center gap-3 text-sm text-gray-400 hover:text-brand-primary transition-colors">
                  <FileText className="w-4 h-4" /> Download PDF Manual
               </a>
               <a href="/contact" className="flex items-center gap-3 text-sm text-gray-400 hover:text-brand-primary transition-colors">
                  <AlertTriangle className="w-4 h-4" /> Report an Issue
               </a>
               <div className="flex items-center gap-3 text-sm text-green-500/80">
                  <CheckCircle className="w-4 h-4" /> System Online v3.0.1
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}