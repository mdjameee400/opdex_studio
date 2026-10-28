"use client";

import React, { useState } from "react";
import { Zap, Palette, Cpu, Sparkles, Smile, ShieldCheck, MousePointerClick, Heart } from "lucide-react";
import { playClick, playPop } from "@/utils/audio";

export default function PlayfulFeatures() {
  const [likes, setLikes] = useState(128);
  const [hasLiked, setHasLiked] = useState(false);
  const [activeBadge, setActiveBadge] = useState<string>("Sleek & Playful");

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((l) => l + 1);
      setHasLiked(true);
      playPop(660);
    } else {
      setLikes((l) => l - 1);
      setHasLiked(false);
      playClick(440);
    }
  };

  const features = [
    {
      title: "Playful SaaS Tech Style",
      desc: "Illustration-heavy modern web aesthetics featuring bold 3.5px solid strokes, vibrant curated pastels, and zero-blur tactile drop shadows.",
      color: "#FFE66D",
      icon: Palette,
      tag: "Design Language",
    },
    {
      title: "Blazing Fast Loading",
      desc: "Optimized with Next.js App Router, Tailwind CSS JIT compilation, and native WebGL/Canvas pipelines for 60fps buttery smooth performance.",
      color: "#4ECCA3",
      icon: Zap,
      tag: "Performance",
    },
    {
      title: "Living HTML Projects Hub",
      desc: "Instant live sandboxing for any single-file HTML, Three.js, or GSAP application without complex build setups or bundling friction.",
      color: "#38BDF8",
      icon: Cpu,
      tag: "Architecture",
    },
    {
      title: "Tactile Physical Feedback",
      desc: "Micro-interactions powered by Web Audio API synthesizers that bring buttons, keycaps, and toggles to life with responsive sound pops.",
      color: "#FF5E5B",
      icon: MousePointerClick,
      tag: "Micro-interactions",
    },
  ];

  return (
    <section id="playful-features" className="w-full max-w-6xl mx-auto px-4 py-16">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#A084E8] text-white border-2 border-black rounded-full text-xs font-bold shadow-brutal-sm mb-3">
          <Sparkles size={14} />
          <span>Neo-Brutalist Architecture</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#121212] font-display tracking-tight mb-3">
          Playful Tech Meets Raw Speed
        </h2>
        <p className="text-sm md:text-base text-black/75">
          Designed to capture the vibrant, playful spirit of modern SaaS illustration style while delivering instantaneous load times.
        </p>
      </div>

      {/* 4 Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.title}
              className="neo-pressable bg-white border-[3px] border-[#121212] rounded-[24px] p-6 shadow-brutal flex flex-col justify-between"
            >
              <div>
                <div 
                  className="w-12 h-12 rounded-2xl border-2 border-black flex items-center justify-center shadow-brutal-sm mb-4"
                  style={{ backgroundColor: feat.color }}
                >
                  <Icon size={22} className="text-black" />
                </div>
                <span className="inline-block px-2 py-0.5 bg-[#FAF7EE] border border-black/30 rounded-md text-[10px] font-mono font-bold mb-2">
                  {feat.tag}
                </span>
                <h3 className="text-lg font-extrabold text-[#121212] font-display mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-black/70 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Sticker & Playground Bar */}
      <div className="bg-[#FAF7EE] border-[3.5px] border-[#121212] rounded-[30px] p-6 md:p-8 shadow-brutal flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FFE66D] border-2 border-black flex items-center justify-center text-2xl shadow-brutal-sm rotate-3">
            🎨
          </div>
          <div>
            <h4 className="font-display font-extrabold text-lg text-black">
              Try the Interactive Stickers
            </h4>
            <p className="text-xs text-black/70 mt-0.5">
              Click the badges to test dynamic tactile feedback
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {["Sleek & Playful", "Saas Illustration", "Neo-Brutal", "Next.js 15", "60 FPS WebGL"].map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => {
                setActiveBadge(b);
                playPop(520);
              }}
              className={`neo-pressable px-3 py-1.5 rounded-xl border-2 border-black text-xs font-bold transition-all ${
                activeBadge === b
                  ? "bg-[#FF5E5B] text-white shadow-brutal-sm"
                  : "bg-white text-black shadow-none hover:bg-white/80"
              }`}
            >
              ★ {b}
            </button>
          ))}

          {/* Interactive Heart Counter */}
          <button
            type="button"
            onClick={handleLike}
            className={`neo-pressable flex items-center gap-1.5 px-3 py-1.5 border-2 border-black rounded-xl text-xs font-bold shadow-brutal-sm transition-all ${
              hasLiked ? "bg-[#FF5E5B] text-white" : "bg-white text-black"
            }`}
          >
            <Heart size={14} className={hasLiked ? "fill-white" : "fill-none"} />
            <span>{likes}</span>
          </button>
        </div>
      </div>

    </section>
  );
}
