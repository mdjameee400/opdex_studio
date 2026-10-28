"use client";

import React, { useState } from "react";
import { Sparkles, Plus, ExternalLink, Menu, X, Layers, Github } from "lucide-react";
import { playClick, playPop } from "@/utils/audio";

interface NavbarProps {
  onAddProjectClick: () => void;
  projectCount: number;
}

export default function Navbar({ onAddProjectClick, projectCount }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full px-4 pt-4 pb-2">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md border-[3px] border-black rounded-2xl shadow-brutal px-4 py-3 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a 
          href="#"
          onClick={() => playPop(540)}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FF5E5B] border-2 border-black flex items-center justify-center shadow-brutal-sm group-hover:rotate-6 transition-transform">
            <Sparkles size={20} className="text-white fill-white" />
          </div>
          <div>
            <div className="font-display font-extrabold text-base md:text-lg tracking-tight flex items-center gap-1.5 text-black">
              <span>OPDEX</span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#FFE66D] border border-black rounded-md">
                STUDIO
              </span>
            </div>
            <div className="text-[10px] font-mono text-black/60 hidden sm:block">
              Neo-Brutalist UI & Interactive Labs
            </div>
          </div>
        </a>

        {/* Center Nav Links - Desktop */}
        <nav className="hidden md:flex items-center gap-6 font-display font-bold text-sm">
          <a 
            href="#hero-card" 
            onClick={() => playClick(500)}
            className="text-black/80 hover:text-black hover:underline decoration-2 underline-offset-4 transition"
          >
            Living Card
          </a>
          <a 
            href="#projects-showcase" 
            onClick={() => playClick(550)}
            className="text-black/80 hover:text-black hover:underline decoration-2 underline-offset-4 transition flex items-center gap-1.5"
          >
            <span>Projects Lab</span>
            <span className="w-5 h-5 rounded-full bg-[#4ECCA3] border border-black text-[10px] font-mono flex items-center justify-center">
              {projectCount}
            </span>
          </a>
          <a 
            href="#playful-features" 
            onClick={() => playClick(600)}
            className="text-black/80 hover:text-black hover:underline decoration-2 underline-offset-4 transition"
          >
            Design Principles
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              playPop(650);
              onAddProjectClick();
            }}
            className="neo-pressable flex items-center gap-1.5 px-3 md:px-4 py-2 bg-[#FFE66D] border-2 border-black rounded-xl text-xs md:text-sm font-bold shadow-brutal-sm"
          >
            <Plus size={16} strokeWidth={3} />
            <span>Add Project</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => {
              playClick(500);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 bg-white border-2 border-black rounded-xl shadow-brutal-sm"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white border-[3px] border-black rounded-2xl shadow-brutal p-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-3 font-display font-bold text-sm">
            <a 
              href="#hero-card" 
              onClick={() => {
                playClick(500);
                setMobileMenuOpen(false);
              }}
              className="p-2 hover:bg-[#FAF7EE] rounded-lg"
            >
              Living Card
            </a>
            <a 
              href="#projects-showcase" 
              onClick={() => {
                playClick(550);
                setMobileMenuOpen(false);
              }}
              className="p-2 hover:bg-[#FAF7EE] rounded-lg flex items-center justify-between"
            >
              <span>Projects Lab</span>
              <span className="px-2 py-0.5 rounded-full bg-[#4ECCA3] border border-black text-xs font-mono">
                {projectCount} Labs
              </span>
            </a>
            <a 
              href="#playful-features" 
              onClick={() => {
                playClick(600);
                setMobileMenuOpen(false);
              }}
              className="p-2 hover:bg-[#FAF7EE] rounded-lg"
            >
              Design Principles
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
