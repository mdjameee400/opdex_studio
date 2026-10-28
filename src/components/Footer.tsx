"use client";

import React from "react";
import { Sparkles, ArrowUp, Heart, Code2 } from "lucide-react";
import { playClick, playPop } from "@/utils/audio";

export default function Footer() {
  const scrollToTop = () => {
    playClick(600);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full mt-16 border-t-[3.5px] border-[#121212] bg-[#FFE66D] overflow-hidden">
      
      {/* Animated Marquee Ticker */}
      <div className="py-2.5 bg-[#121212] text-white font-mono text-xs font-bold overflow-hidden select-none border-b-2 border-black">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6">
          <span>⚡ NEO BRUTALISM UI COMPONENT LIBRARY</span>
          <span>✦ 4 INTERACTIVE HTML LABS</span>
          <span>★ PLAYFUL TECH STYLE</span>
          <span>● NEXT.JS 15 + TAILWIND CSS</span>
          <span>♥ 60 FPS WEBGL & THREE.JS</span>
          <span>■ ZERO DELAY INSTANT LOADING</span>
          <span>⚡ NEO BRUTALISM UI COMPONENT LIBRARY</span>
          <span>✦ 4 INTERACTIVE HTML LABS</span>
          <span>★ PLAYFUL TECH STYLE</span>
          <span>● NEXT.JS 15 + TAILWIND CSS</span>
          <span>♥ 60 FPS WEBGL & THREE.JS</span>
          <span>■ ZERO DELAY INSTANT LOADING</span>
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FF5E5B] border-2 border-black flex items-center justify-center shadow-brutal-sm rotate-2">
            <Sparkles size={24} className="text-white fill-white" />
          </div>
          <div>
            <div className="font-display font-extrabold text-xl text-black">
              OPDEX STUDIO
            </div>
            <p className="text-xs text-black/70 font-mono">
              Sleek & Playful Modern SaaS Web Design
            </p>
          </div>
        </div>

        {/* Center Credits */}
        <div className="text-center font-display font-bold text-xs md:text-sm text-black flex items-center gap-1.5">
          <span>Crafted with</span>
          <Heart size={14} className="text-[#FF5E5B] fill-[#FF5E5B] animate-pulse" />
          <span>for ultra-fast loading & playful interactivity</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={scrollToTop}
            className="neo-pressable flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-black rounded-xl text-xs font-bold shadow-brutal-sm"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      <div className="text-center pb-6 text-[11px] font-mono text-black/60">
        © 2026 Opdex Studio · All 4 HTML Projects Ready in <code className="font-bold text-black">public/projects/</code>
      </div>
    </footer>
  );
}
