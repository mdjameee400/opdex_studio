"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { playClick, playPop, playKeyTap, playToggle, playSuccessChime } from "@/utils/audio";

interface ElementModalData {
  title: string;
  category: string;
  badge: string;
  path: string;
  description: string;
  color: string;
}

export default function OpdexLandingPage() {
  const [engineMode, setEngineMode] = useState<"space" | "earth">("space");
  const [gravity, setGravity] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pixBouncing, setPixBouncing] = useState(false);
  const [email, setEmail] = useState("");
  const [projectUid, setProjectUid] = useState("");
  const [subscribedMsg, setSubscribedMsg] = useState(false);
  const [currentYear, setCurrentYear] = useState(2026);
  const [ticketCopied, setTicketCopied] = useState(false);
  const [submissionModal, setSubmissionModal] = useState<{
    email: string;
    projectUid: string;
    ticketId: string;
    projectName?: string;
    timestamp: string;
  } | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  // Interactive Live Element Modal
  const [activeModal, setActiveModal] = useState<ElementModalData | null>(null);
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [refreshKey, setRefreshKey] = useState(0);
  const [isAddGuideOpen, setIsAddGuideOpen] = useState(false);

  // Cards dataset containing USER'S ACTUAL ELEMENTS AND REAL PHOTOS
  const artifacts = [
    {
      id: "ox-ui",
      name: "Nothing OS Bento UI",
      badge: "#01",
      category: "ui",
      categoryLabel: "Interface System",
      tagColor: "bg-pastel-mint",
      headerBg: "bg-[#E6F9F6]",
      btnColor: "bg-pastel-mint",
      desc: "Tactile glyph launcher, 11 living widgets, dot-matrix digital clock, and interactive audio synthesizer.",
      elementFile: "/elements/ox_ui.html",
      image: "/elements/thumbnails/ox_ui.png",
      iconChar: "★",
      stats: "11 Widgets · Web Audio",
    },
    {
      id: "glass-widgets",
      name: "3D Glass Bento UI Dashboard",
      badge: "#02",
      category: "3d",
      categoryLabel: "3D Spatial Dashboard",
      tagColor: "bg-pastel-coral",
      headerBg: "bg-[#FFEAE5]",
      btnColor: "bg-pastel-coral",
      desc: "High-fidelity 3D spatial dashboard powered by Three.js with real-time reflections, depth blur, and telemetry.",
      elementFile: "/elements/Glass_widgets.html",
      image: "/elements/thumbnails/glass_widgets.png",
      iconChar: "♥",
      stats: "Three.js · WebGL 60FPS",
    },
    {
      id: "keycap-studio",
      name: "Keycap Studio Mechanical Lab",
      badge: "#03",
      category: "studio",
      categoryLabel: "Hardware Design Lab",
      tagColor: "bg-pastel-yellow",
      headerBg: "bg-[#FFFBE6]",
      btnColor: "bg-pastel-yellow",
      desc: "Interactive tactile mechanical keycap workshop with physical click switches and dynamic legend typography.",
      elementFile: "/elements/Keycap Studio.html",
      image: "/elements/thumbnails/keycap_studio.png",
      iconChar: "⌘",
      stats: "Tactile Audio · Customizer",
    },
    {
      id: "retro-desktop",
      name: "Super GameBoy 3D Retro Desktop",
      badge: "#04",
      category: "3d",
      categoryLabel: "Retro 3D Game Station",
      tagColor: "bg-pastel-purple",
      headerBg: "bg-[#F3E8FF]",
      btnColor: "bg-pastel-purple",
      desc: "Playable 90s console workspace with OrbitControls, custom procedural hand cursor, and CRT scanlines.",
      elementFile: "/elements/retro_desktop.html",
      image: "/elements/thumbnails/retro_desktop.png",
      iconChar: "⚡",
      stats: "Three.js · GSAP · CRT",
    },
    {
      id: "glyph-synth",
      name: "Dot-Matrix Glyph Synthesizer",
      badge: "#05",
      category: "shaders",
      categoryLabel: "Shaders / Audio",
      tagColor: "bg-pastel-peach",
      headerBg: "bg-[#FFF0E6]",
      btnColor: "bg-pastel-peach",
      desc: "3x3 morphing glyph constellation launcher with synthesized audio tick harmonics and responsive theme pods.",
      elementFile: "/elements/ox_ui.html",
      image: "/elements/thumbnails/ox_ui.png",
      iconChar: "✦",
      stats: "Web Audio · Matrix Canvas",
    },
    {
      id: "add-new-element",
      name: "+ Add Your 5th Element",
      badge: "NEW",
      category: "studio",
      categoryLabel: "Drop-in Slot",
      tagColor: "bg-pastel-blue",
      headerBg: "bg-[#EBF5FB]",
      btnColor: "bg-pastel-blue",
      desc: "Drop any single-file HTML or WebGL project into /elements to instantly add it to your live stack.",
      elementFile: "/elements/Glass_widgets.html",
      image: "/elements/thumbnails/glass_widgets.png",
      iconChar: "◎",
      isAddCard: true,
      stats: "10s Setup · Auto-Reload",
    },
  ];

  const handleGravityChange = (val: number) => {
    setGravity(val);
  };

  const handleToggleEngine = (mode: "space" | "earth") => {
    setEngineMode(mode);
    playPop(mode === "space" ? 540 : 420);
    if (mode === "space") {
      setGravity(0);
    } else {
      setGravity(100);
    }
  };

  const handlePixBounce = () => {
    playPop(620);
    setPixBouncing(true);
    setTimeout(() => setPixBouncing(false), 260);
  };

  const handleCopy = (id: string, name: string) => {
    playPop(700);
    navigator.clipboard.writeText(`// Opdex Element: ${name}\nimport { ${name.replace(/[^a-zA-Z0-9]/g, '')} } from '@/elements';`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleInspect = (art: typeof artifacts[0]) => {
    if (art.isAddCard) {
      setIsAddGuideOpen(true);
      playPop(550);
      return;
    }
    playClick(600);
    setActiveModal({
      title: art.name,
      category: art.categoryLabel,
      badge: art.badge,
      path: art.elementFile,
      description: art.desc,
      color: art.tagColor,
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !projectUid.trim()) return;
    playSuccessChime();

    const rawInput = projectUid.trim();
    const cleanNum = rawInput.replace(/[^0-9]/g, "");
    const normalizedBadge = cleanNum ? `#${cleanNum.padStart(2, "0")}` : rawInput;

    const matched = artifacts.find(
      (a) =>
        a.badge.toLowerCase() === rawInput.toLowerCase() ||
        a.badge.toLowerCase() === normalizedBadge.toLowerCase() ||
        a.id.toLowerCase() === rawInput.toLowerCase().replace(/^#/, "") ||
        a.name.toLowerCase().includes(rawInput.toLowerCase())
    );

    const ticketId = `OPDEX-${currentYear}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    setSubmissionModal({
      email: email.trim(),
      projectUid: matched ? matched.badge : (normalizedBadge.startsWith("#") ? normalizedBadge : `#${normalizedBadge}`),
      ticketId,
      projectName: matched ? `${matched.badge} · ${matched.name}` : projectUid.trim(),
      timestamp: new Date().toLocaleTimeString(),
    });

    setSubscribedMsg(true);
  };

  const filteredArtifacts = artifacts.filter((art) => {
    const matchesFilter = activeFilter === "all" || art.category === activeFilter;
    const matchesSearch = art.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#FAF5EB]/90 backdrop-blur-md border-b-2 border-brutal-black">
        <div className="h-20 w-full px-margin-mobile md:px-margin flex items-center justify-between">
          <a
            className="group flex items-center gap-space-sm bg-cream-card px-space-md py-space-sm rounded-2xl border-2 border-brutal-black shadow-brutal transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#18181B]"
            href="#"
            onClick={() => playPop(500)}
          >
            <div className="w-10 h-10 rounded-xl bg-pastel-yellow border-2 border-brutal-black flex items-center justify-center shadow-brutal-sm overflow-hidden p-1 group-hover:rotate-6 transition-transform">
              <img src="/logo.svg" alt="Opdex Studio Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-lg md:text-xl font-bold tracking-tight text-brutal-black leading-none">
                Opdex Studio
              </span>
              <span className="font-mono text-[10px] text-zinc-600 font-bold uppercase tracking-wider mt-0.5">
                Zero-G Lab
              </span>
            </div>
          </a>

          <div className="flex items-center gap-space-sm">
            <div className="flex items-center gap-space-xs bg-pastel-mint border-2 border-brutal-black px-space-md py-1.5 rounded-full shadow-brutal select-none">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brutal-black opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brutal-black"></span>
              </span>
              <span className="font-label-md text-xs font-bold text-brutal-black uppercase tracking-wider">
                v2.4 Live Playground
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full pt-20 flex-1 bg-transparent">
        <div className="flex flex-col w-full">

          {/* HERO SECTION */}
          <section className="relative w-full overflow-hidden px-margin-mobile md:px-margin py-space-xl md:py-space-2xl bg-[#FAF5EB] text-brutal-black border-b-2 border-brutal-black">
            {/* Playful Floating Neo-Brutalist Confetti Accents from Reference */}
            <div className="hidden lg:block absolute top-10 left-12 w-4 h-4 bg-pastel-yellow border-2 border-brutal-black rotate-12 shadow-brutal-sm pointer-events-none"></div>
            <div className="hidden lg:block absolute top-28 left-48 w-3 h-3 rounded-full bg-pastel-coral border-2 border-brutal-black pointer-events-none"></div>
            <div className="hidden lg:block absolute bottom-16 left-16 w-5 h-5 bg-pastel-mint border-2 border-brutal-black -rotate-45 shadow-brutal-sm pointer-events-none"></div>
            <div className="hidden lg:block absolute top-14 right-20 w-4 h-4 rounded-full bg-pastel-purple border-2 border-brutal-black pointer-events-none"></div>
            <div className="hidden lg:block absolute bottom-24 right-32 w-4 h-4 bg-pastel-peach border-2 border-brutal-black rotate-45 shadow-brutal-sm pointer-events-none"></div>

            {/* Floating Sticker Decors with pastel colors & black borders */}
            <div className="hidden lg:flex absolute top-12 left-1/3 items-center gap-space-xs bg-pastel-yellow text-brutal-black border-2 border-brutal-black px-space-sm py-1 rounded-xl shadow-brutal -rotate-6 select-none">
              <span className="text-brutal-black text-headline-sm leading-none">★</span>
              <span className="font-label-md text-xs font-bold uppercase tracking-wider">Zero Buoyancy</span>
            </div>
            <div className="hidden lg:flex absolute bottom-12 left-1/4 items-center gap-space-xs bg-pastel-mint text-brutal-black border-2 border-brutal-black px-space-sm py-1 rounded-xl shadow-brutal rotate-3 select-none">
              <span className="material-symbols-outlined text-body-lg">blur_on</span>
              <span className="font-label-md text-xs font-bold">100% WebGL Physics</span>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center relative z-10">
              
              {/* Left Column: High-Impact Typography & Interactive Controls */}
              <div className="lg:col-span-6 flex flex-col gap-space-lg items-start">
                
                {/* Live Alert Badge with pastel yellow background */}
                <div className="inline-flex items-center gap-space-xs bg-cream-card text-brutal-black border-2 border-brutal-black px-space-md py-1 rounded-full shadow-brutal">
                  <span className="w-2.5 h-2.5 rounded-full bg-pastel-coral border border-brutal-black animate-pulse"></span>
                  <span className="font-label-md text-xs font-bold tracking-wider uppercase">Live Shader Bay v2.4</span>
                </div>

                {/* Big Punchy Display Title with reference style coral/yellow accents */}
                <h1 className="font-display-hero text-4xl md:text-6xl font-extrabold leading-none tracking-tight text-brutal-black">
                  3D Artifacts,<br />
                  <span className="inline-block mt-2 bg-pastel-yellow px-3 py-1 border-2 border-brutal-black rounded-2xl shadow-brutal rotate-[-1deg]">
                    Zero Gravity.
                  </span>
                </h1>

                <p className="font-body-lg text-base md:text-lg text-zinc-700 max-w-lg leading-relaxed font-medium">
                  Tactile spatial components and playful 3D experiments ready to drop directly into your modern stack.
                </p>

                {/* Neo-Brutalist Capsule Interactive Console */}
                <div className="w-full max-w-md bg-cream-card text-brutal-black p-space-md rounded-2xl border-2 border-brutal-black shadow-brutal-lg flex flex-col gap-space-sm">
                  {/* Switcher Bar (Tabs) */}
                  <div className="grid grid-cols-2 gap-space-xs bg-amber-100/60 p-1.5 rounded-xl border-2 border-brutal-black">
                    <button
                      className={`flex items-center justify-center gap-space-xs py-2 px-space-sm rounded-lg font-label-md text-xs font-bold border-2 border-brutal-black transition-all ${
                        engineMode === "space"
                          ? "bg-pastel-purple text-brutal-black shadow-brutal-sm"
                          : "bg-transparent text-brutal-black hover:bg-cream-card border-transparent"
                      }`}
                      onClick={() => handleToggleEngine("space")}
                    >
                      <span className="material-symbols-outlined text-sm">rocket_launch</span>
                      Space Engine
                    </button>
                    <button
                      className={`flex items-center justify-center gap-space-xs py-2 px-space-sm rounded-lg font-label-md text-xs font-bold border-2 border-brutal-black transition-all ${
                        engineMode === "earth"
                          ? "bg-pastel-purple text-brutal-black shadow-brutal-sm"
                          : "bg-transparent text-brutal-black hover:bg-cream-card border-transparent"
                      }`}
                      onClick={() => handleToggleEngine("earth")}
                    >
                      <span className="material-symbols-outlined text-sm">south</span>
                      Earth Web
                    </button>
                  </div>

                  {/* Slider Range Pill Mockup */}
                  <div className="flex items-center justify-between gap-space-sm bg-[#FAF5EB] px-space-md py-2 rounded-full border-2 border-brutal-black shadow-brutal-sm">
                    <span className="font-label-sm text-xs font-bold text-zinc-700 uppercase tracking-wide">
                      G-Force
                    </span>
                    <input
                      className="w-full accent-pastel-coral cursor-pointer"
                      id="gravity-slider"
                      max="100"
                      min="0"
                      type="range"
                      value={gravity}
                      onChange={(e) => handleGravityChange(Number(e.target.value))}
                    />
                    <span className="font-label-md text-xs text-brutal-black font-extrabold bg-pastel-yellow px-2 py-0.5 rounded-md border border-brutal-black">
                      {(gravity / 100).toFixed(2)}g
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-700 font-label-sm text-xs font-semibold px-space-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-pastel-mint border border-brutal-black"></span>
                      Ambient Vacuum
                    </span>
                    <button 
                      onClick={() => playPop(580)}
                      className="text-brutal-black bg-pastel-peach px-2 py-0.5 rounded border border-brutal-black font-bold hover:scale-105 active:scale-95 transition-transform"
                    >
                      Ready to Inject
                    </button>
                  </div>
                </div>

                {/* Punchy Tactile CTAs in Pastel Colors */}
                <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                  <a
                    className="flex items-center gap-space-sm bg-pastel-coral text-brutal-black font-label-lg font-bold px-space-xl py-space-md rounded-2xl border-2 border-brutal-black shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#18181B] transition-all"
                    href="#artifact-grid"
                    onClick={() => playPop(600)}
                  >
                    <span>Launch Studio</span>
                    <span className="text-xl leading-none">🕹️</span>
                  </a>
                  <a
                    className="flex items-center gap-space-sm bg-cream-card text-brutal-black font-label-lg font-bold px-space-lg py-space-md rounded-2xl border-2 border-brutal-black shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#18181B] transition-all"
                    href="#artifact-grid"
                    onClick={() => playClick(520)}
                  >
                    <span>Explore Drops</span>
                    <span className="material-symbols-outlined text-body-lg text-pastel-coral font-bold">bolt</span>
                  </a>
                </div>

              </div>

              {/* Right Column: Portal Scene + Cute Pix Mascot (Direct Reference to MicroFire Astronaut/Bot - CIRCULAR GRAVITY PORTAL) */}
              <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
                {/* Big Celestial Port Chamber Frame - CIRCULAR */}
                <div className="relative w-full max-w-md aspect-square rounded-full bg-[#1e2538] shadow-[8px_8px_0px_#141b2b] flex items-center justify-center p-4 overflow-hidden border-2 border-[#141b2b]">
                  {/* Outer Portal Ring Dash */}
                  <div className="absolute inset-2 rounded-full border-4 border-dashed border-white/20 animate-[spin_60s_linear_infinite] pointer-events-none"></div>

                  {/* Inner Deep Space Chamber */}
                  <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#141b2b] via-[#1c2333] to-[#050814] flex items-center justify-center overflow-hidden">
                    {/* Micro Twinkles */}
                    <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                    <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/70 rounded-full"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-[#ffdcbc] rounded-full"></div>

                    {/* Dynamic Micro-Fire / Plasma Orb (Central Artifact) with Live Gravity Morphing */}
                    <div
                      id="orb-core"
                      onClick={() => playPop(720)}
                      className="relative w-36 h-36 md:w-44 md:h-44 bg-gradient-to-tr from-[#304ffe] via-[#4fdbcc] to-[#fd9d1a] shadow-[0_0_50px_rgba(48,79,254,0.8)] flex items-center justify-center transition-all duration-500 animate-[pulse_4s_ease-in-out_infinite] cursor-pointer"
                      style={{
                        borderRadius: gravity > 60 ? "50% 50% 30% 30% / 60% 60% 40% 40%" : "9999px",
                        transform: gravity > 60 ? `scale(${1 - gravity / 300}) translateY(${gravity / 4}px)` : "scale(1) translateY(0px)",
                      }}
                    >
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white via-[#70f8e8] to-transparent opacity-70 blur-md"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display-hero text-2xl md:text-3xl text-white drop-shadow-md select-none font-bold">
                          ✦
                        </span>
                      </div>
                    </div>

                    {/* "Illustration" Pill Tag inside portal */}
                    <div className="absolute bottom-6 bg-[#fd9d1a] text-[#141b2b] font-label-sm text-xs font-bold px-3 py-0.5 rounded-full shadow-[2px_2px_0px_#141b2b]">
                      Live Physical Render
                    </div>
                  </div>
                </div>

                {/* Robot Mascot Character "PIX" (MicroFire Inspired) */}
                <div className="absolute -bottom-6 left-4 md:left-12 flex flex-col items-start z-20">
                  {/* Comic Speech Bubble with Tail */}
                  <div className="relative bg-white text-[#141b2b] px-4 py-2.5 rounded-2xl shadow-[4px_4px_0px_#141b2b] border border-[#141b2b]/10 max-w-[240px] mb-2 -rotate-2 select-none">
                    <p className="font-label-md text-xs font-semibold leading-snug">
                      Hi, I&apos;m <strong className="text-[#0030e4] font-bold">PIX</strong>! Slide gravity to watch our artifacts morph in real-time!
                    </p>
                    {/* Downward speech triangle */}
                    <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
                  </div>

                  {/* Vector Robot Body Structure */}
                  <div
                    className="relative flex items-center gap-space-xs pl-4 group cursor-pointer"
                    onClick={handlePixBounce}
                  >
                    {/* Pix Head */}
                    <div
                      id="pix-body"
                      className="w-20 h-20 bg-white border border-[#141b2b]/10 rounded-2xl shadow-[4px_4px_0px_#141b2b] flex flex-col items-center justify-center p-2 transition-transform duration-200"
                      style={{
                        transform: pixBouncing ? "scale(1.18) rotate(6deg)" : "scale(1) rotate(0deg)",
                      }}
                    >
                      {/* Visor Screen */}
                      <div className="w-14 h-8 bg-[#1e2538] rounded-xl flex items-center justify-around px-2 mb-1">
                        <span className="w-2.5 h-3 bg-[#4fdbcc] rounded-full animate-bounce" id="pix-eye-l"></span>
                        <span className="w-2.5 h-3 bg-[#4fdbcc] rounded-full animate-bounce" id="pix-eye-r"></span>
                      </div>
                      {/* Belly Light */}
                      <div className="w-3 h-3 bg-[#fd9d1a] rounded-full shadow-[1px_1px_0px_#141b2b]"></div>
                    </div>

                    {/* Pix Hand Waving */}
                    <div className="w-6 h-6 bg-white border border-[#141b2b]/10 rounded-full shadow-[2px_2px_0px_#141b2b] flex items-center justify-center -ml-2 -mt-4 animate-bounce">
                      <span className="text-xs select-none">👋</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* SEARCH & TOY-KIT FILTER BAR */}
          <section className="w-full px-margin-mobile md:px-margin py-space-lg bg-[#FAF5EB] border-b-2 border-brutal-black">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md">
              
              {/* Big Search Capsule */}
              <div className="relative flex-1 max-w-xl">
                <div className="flex items-center gap-space-sm bg-cream-card border-2 border-brutal-black px-space-md py-2.5 rounded-full shadow-brutal focus-within:shadow-brutal-lg transition-all">
                  <span className="material-symbols-outlined text-xl text-zinc-700">search</span>
                  <input
                    className="w-full bg-transparent text-brutal-black font-body-md text-sm md:text-base focus:outline-none placeholder:text-zinc-500 font-medium"
                    placeholder="Search 3D toys, shaders & dynamic UI... (⌘K)"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span className="font-label-sm text-xs font-bold bg-pastel-yellow text-brutal-black border border-brutal-black px-2 py-0.5 rounded shadow-sm">
                    ⌘K
                  </span>
                </div>
              </div>

              {/* Filter Tags Row styled like pills from image */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                <button
                  className={`filter-chip flex items-center gap-1.5 font-label-md text-xs font-bold px-3.5 py-1.5 rounded-full border-2 border-brutal-black shadow-brutal hover:-translate-y-0.5 active:translate-y-0.5 transition-all whitespace-nowrap ${
                    activeFilter === "all" ? "bg-pastel-coral text-brutal-black" : "bg-cream-card text-brutal-black hover:bg-pastel-yellow"
                  }`}
                  onClick={() => {
                    setActiveFilter("all");
                    playPop(480);
                  }}
                >
                  <span>All</span>
                  <span className="bg-cream-card px-1.5 py-0.2 rounded-full text-xs font-bold border border-brutal-black">
                    {artifacts.length}
                  </span>
                </button>

                <button
                  className={`filter-chip flex items-center gap-1.5 font-label-md text-xs font-bold px-3.5 py-1.5 rounded-full border-2 border-brutal-black shadow-brutal hover:-translate-y-0.5 active:translate-y-0.5 transition-all whitespace-nowrap ${
                    activeFilter === "ui" ? "bg-pastel-coral text-brutal-black" : "bg-cream-card text-brutal-black hover:bg-pastel-mint"
                  }`}
                  onClick={() => {
                    setActiveFilter("ui");
                    playPop(520);
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-pastel-mint border border-brutal-black"></span>
                  <span>UI Elements</span>
                </button>

                <button
                  className={`filter-chip flex items-center gap-1.5 font-label-md text-xs font-bold px-3.5 py-1.5 rounded-full border-2 border-brutal-black shadow-brutal hover:-translate-y-0.5 active:translate-y-0.5 transition-all whitespace-nowrap ${
                    activeFilter === "3d" ? "bg-pastel-coral text-brutal-black" : "bg-cream-card text-brutal-black hover:bg-pastel-yellow"
                  }`}
                  onClick={() => {
                    setActiveFilter("3d");
                    playPop(560);
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-pastel-purple border border-brutal-black"></span>
                  <span>3D Dashboards</span>
                </button>

                <button
                  className={`filter-chip flex items-center gap-1.5 font-label-md text-xs font-bold px-3.5 py-1.5 rounded-full border-2 border-brutal-black shadow-brutal hover:-translate-y-0.5 active:translate-y-0.5 transition-all whitespace-nowrap ${
                    activeFilter === "studio" ? "bg-pastel-coral text-brutal-black" : "bg-cream-card text-brutal-black hover:bg-pastel-peach"
                  }`}
                  onClick={() => {
                    setActiveFilter("studio");
                    playPop(600);
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-pastel-peach border border-brutal-black"></span>
                  <span>Design Labs</span>
                </button>

                <button
                  className={`filter-chip flex items-center gap-1.5 font-label-md text-xs font-bold px-3.5 py-1.5 rounded-full border-2 border-brutal-black shadow-brutal hover:-translate-y-0.5 active:translate-y-0.5 transition-all whitespace-nowrap ${
                    activeFilter === "shaders" ? "bg-pastel-coral text-brutal-black" : "bg-cream-card text-brutal-black hover:bg-pastel-yellow"
                  }`}
                  onClick={() => {
                    setActiveFilter("shaders");
                    playPop(640);
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-pastel-coral border border-brutal-black"></span>
                  <span>Audio & Matrix</span>
                </button>

                <div className="h-6 w-px bg-brutal-black/30 mx-1"></div>

                <button
                  onClick={() => playPop(500)}
                  className="flex items-center gap-1 font-label-md text-xs font-bold px-3 py-1.5 rounded-full border-2 border-brutal-black bg-pastel-yellow text-brutal-black shadow-brutal whitespace-nowrap"
                >
                  <span>Sort: Wildest</span>
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
              </div>

            </div>
          </section>

          {/* PHYSICAL TOY STACK (FEATURING USER'S ACTUAL ELEMENTS AND PHOTOS) */}
          <section className="w-full px-margin-mobile md:px-margin py-space-xl bg-[#FAF5EB]" id="artifact-grid">
            <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
              
              {/* Section Mini Header with Decorative Counter */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="w-4 h-4 rounded-md bg-pastel-coral border-2 border-brutal-black shadow-brutal-sm"></span>
                  <h2 className="font-headline-md text-2xl md:text-3xl font-extrabold text-brutal-black tracking-tight">
                    Physical Toy Stack
                  </h2>
                </div>
                <div className="flex items-center gap-space-xs bg-cream-card border-2 border-brutal-black px-3 py-1 rounded-xl shadow-brutal">
                  <span className="w-2 h-2 rounded-full bg-pastel-mint border border-brutal-black animate-ping"></span>
                  <span className="font-label-md text-xs text-brutal-black font-mono font-bold">
                    RENDER: 60 FPS
                  </span>
                </div>
              </div>

              {/* Grid of 6 Bento/Toy Cards Featuring User's Real Elements */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                {filteredArtifacts.map((art) => (
                  <div
                    key={art.id}
                    className="artifact-card group flex flex-col bg-cream-card rounded-2xl border-2 border-brutal-black shadow-brutal-lg overflow-hidden transition-all hover:-translate-y-1 hover:shadow-brutal-xl cursor-pointer"
                    onClick={() => handleInspect(art)}
                  >
                    {/* Visual Stage Container displaying the REAL PHOTO of the element */}
                    <div className={`relative h-60 w-full ${art.headerBg} border-b-2 border-brutal-black p-3 overflow-hidden flex items-center justify-center`}>
                      
                      {/* Top-Left Category Tag */}
                      <div className={`absolute top-4 left-4 z-20 ${art.tagColor} text-brutal-black border-2 border-brutal-black px-space-sm py-1 rounded-lg shadow-brutal-sm font-label-sm text-xs font-bold uppercase tracking-wider`}>
                        {art.categoryLabel}
                      </div>

                      {/* Top-Right Decorative Icon Badge */}
                      <div className="absolute top-4 right-4 z-20 w-7 h-7 rounded-full bg-cream-card border-2 border-brutal-black flex items-center justify-center text-brutal-black shadow-brutal-sm font-label-md text-xs font-bold">
                        {art.iconChar}
                      </div>

                      {/* Real Rendered Screenshot / Photo of the User's Element */}
                      <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-brutal-black shadow-sm bg-black/90">
                        <img
                          src={art.image}
                          alt={art.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Interactive Hover Overlay with Live Inspect badge */}
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <span className="bg-pastel-yellow border-2 border-brutal-black text-brutal-black px-3 py-1 rounded-full text-xs font-bold shadow-brutal-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">visibility</span>
                            Live Preview
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Card Content & Action Buttons */}
                    <div className="p-space-lg flex flex-col gap-space-sm flex-1 justify-between bg-cream-card">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-headline-sm text-lg font-bold text-brutal-black">
                            {art.name}
                          </h3>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setProjectUid(art.badge);
                              playKeyTap(580);
                              document.getElementById("request-code-section")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            title={`Click to pre-fill UID ${art.badge} for code request`}
                            className="font-label-sm text-xs text-brutal-black font-mono font-bold bg-pastel-yellow px-2 py-0.5 rounded border border-brutal-black hover:scale-105 active:scale-95 cursor-pointer shadow-brutal-sm transition-transform flex items-center gap-1"
                          >
                            <span>UID:</span>
                            <span>{art.badge}</span>
                          </button>
                        </div>
                        <p className="font-body-sm text-xs md:text-sm text-zinc-600 font-medium line-clamp-2">
                          {art.desc}
                        </p>
                      </div>

                      <div className="pt-space-xs" onClick={(e) => e.stopPropagation()}>
                        <button
                          className={`w-full py-2.5 px-space-sm ${art.btnColor} text-brutal-black border-2 border-brutal-black rounded-xl font-label-md text-xs md:text-sm font-bold shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#18181B] transition-all text-center flex items-center justify-center gap-2`}
                          onClick={() => handleInspect(art)}
                        >
                          <span>Inspect 3D</span>
                          <span className="text-xs md:text-sm">🕹️</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* MARKETING STUNT & INSTANT EMAIL DROP */}
          <section className="w-full px-margin-mobile md:px-margin py-space-2xl bg-[#FAF5EB]" id="request-code-section">
            <div className="max-w-5xl mx-auto relative bg-pastel-yellow text-brutal-black rounded-3xl p-space-lg md:p-space-2xl border-2 border-brutal-black shadow-brutal-xl overflow-hidden">
              {/* Floating Neo-Brutalist Badge */}
              <div className="absolute top-4 right-6 w-12 h-12 rounded-2xl bg-pastel-coral border-2 border-brutal-black text-brutal-black flex items-center justify-center font-display-hero text-2xl shadow-brutal rotate-12 select-none">
                ⚡
              </div>

              <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto gap-space-md">
                {/* Punchy Headline */}
                <h2 className="font-display-hero text-3xl md:text-5xl font-extrabold leading-tight text-brutal-black tracking-tight">
                  Secret 3D Drop Every Friday.
                </h2>

                {/* Short Note */}
                <p className="font-body-md text-sm md:text-base text-zinc-800 max-w-xl font-medium">
                  Drop your email and the card UID (like <strong>#01</strong>, <strong>#02</strong>) to get the code. As an admin, our dispatch bot matches the card number directly to the project source file.
                </p>

                {/* High-Contrast Dual Input Form */}
                <form className="w-full max-w-xl flex flex-col gap-3 pt-space-xs" onSubmit={handleSubscribe}>
                  <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                    <input
                      className="flex-1 bg-cream-card text-brutal-black font-body-md text-sm md:text-base px-space-md py-3 rounded-2xl border-2 border-brutal-black shadow-brutal focus:outline-none focus:shadow-brutal-lg placeholder:text-zinc-500 font-medium"
                      placeholder="drop_your@email.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      className="flex-1 bg-cream-card text-brutal-black font-body-md text-sm md:text-base px-space-md py-3 rounded-2xl border-2 border-brutal-black shadow-brutal focus:outline-none focus:shadow-brutal-lg placeholder:text-zinc-500 font-medium"
                      placeholder="Card UID (e.g. #01, #02, #03)"
                      required
                      type="text"
                      value={projectUid}
                      onChange={(e) => setProjectUid(e.target.value)}
                    />
                  </div>

                  {/* Quick Clickable Chips for Card Numbers (#01, #02, etc.) */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
                    <span className="text-xs font-bold text-zinc-700 mr-1 flex items-center gap-1">
                      <span className="text-sm">🏷️</span>
                      <span>Card UID:</span>
                    </span>
                    {[
                      { uid: "#01", label: "Nothing OS", color: "bg-pastel-mint" },
                      { uid: "#02", label: "3D Glass", color: "bg-pastel-coral" },
                      { uid: "#03", label: "Keycap Lab", color: "bg-pastel-yellow" },
                      { uid: "#04", label: "GameBoy 3D", color: "bg-pastel-purple" },
                      { uid: "#05", label: "Glyph Synth", color: "bg-pastel-peach" },
                    ].map((item) => (
                      <button
                        key={item.uid}
                        type="button"
                        onClick={() => {
                          setProjectUid(item.uid);
                          playKeyTap(540);
                        }}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border border-brutal-black shadow-brutal-sm hover:-translate-y-0.5 active:translate-y-0.5 transition-transform flex items-center gap-1 ${
                          projectUid === item.uid
                            ? "bg-brutal-black text-white"
                            : `${item.color} text-brutal-black`
                        }`}
                      >
                        <span className="font-mono">{item.uid}</span>
                        <span className="opacity-75 text-[10px]">({item.label})</span>
                      </button>
                    ))}
                  </div>

                  <button
                    className="self-center bg-pastel-coral text-brutal-black font-label-lg font-bold px-space-xl py-3.5 rounded-2xl border-2 border-brutal-black shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#18181B] transition-transform whitespace-nowrap flex items-center justify-center gap-2 mt-1"
                    type="submit"
                  >
                    <span>Get The Code</span>
                    <span className="text-base">🚀</span>
                  </button>
                </form>

                {/* Social Proof Counter */}
                <div className="flex items-center gap-space-xs bg-cream-card px-3 py-1 rounded-full border-2 border-brutal-black shadow-brutal-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-pastel-mint border border-brutal-black"></span>
                  <span className="font-label-sm text-xs font-bold text-zinc-700">
                    {subscribedMsg ? "✓ Request recorded! Dispatch modal opened." : "8,420 spatial builders already subscribed"}
                  </span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#FAF5EB] py-space-lg border-t-2 border-brutal-black">
        <div className="w-full px-margin-mobile md:px-margin flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-pastel-yellow border border-brutal-black flex items-center justify-center p-0.5 shadow-brutal-sm">
              <img src="/logo.svg" alt="Opdex Logo" className="w-full h-full object-contain" />
            </div>
            <p className="font-body-sm text-xs md:text-sm text-zinc-700 font-semibold text-center sm:text-left">
              © {currentYear} Opdex Studio. Built with pastel neo-brutal physics.
            </p>
          </div>
          <div className="flex items-center gap-space-xs bg-cream-card px-3 py-1 rounded-full border-2 border-brutal-black shadow-brutal-sm">
            <span className="w-2 h-2 rounded-full bg-pastel-mint border border-brutal-black"></span>
            <span className="font-label-sm text-xs font-bold text-brutal-black">All Systems Playful</span>
          </div>
        </div>
      </footer>

      {/* RESPONSIVE LIVE 3D ELEMENT INSPECT MODAL */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-5xl h-[88vh] bg-cream-card border-[3px] border-brutal-black rounded-3xl shadow-brutal-xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header Bar */}
            <div className="px-5 py-3.5 bg-pastel-yellow border-b-2 border-brutal-black flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-4 h-4 rounded-full bg-pastel-coral border-2 border-brutal-black hover:scale-110 transition-transform"
                  title="Close Modal"
                />
                <span className="w-4 h-4 rounded-full bg-pastel-yellow border-2 border-brutal-black" />
                <span className="w-4 h-4 rounded-full bg-pastel-mint border-2 border-brutal-black" />
                
                <div className="ml-2 flex items-center gap-2">
                  <span className="font-display-hero font-bold text-sm text-brutal-black">
                    {activeModal.title}
                  </span>
                  <span className="px-2 py-0.5 bg-white border border-brutal-black rounded-md font-mono text-[10px] font-bold">
                    {activeModal.badge} · {activeModal.category}
                  </span>
                </div>
              </div>

              {/* Viewport Toggles & Actions */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center bg-white border-2 border-brutal-black rounded-xl p-0.5 shadow-brutal-sm">
                  <button
                    onClick={() => setDeviceView("desktop")}
                    className={`px-2 py-1 text-xs font-bold rounded-lg transition ${
                      deviceView === "desktop" ? "bg-pastel-yellow" : "hover:bg-gray-100"
                    }`}
                  >
                    Desktop
                  </button>
                  <button
                    onClick={() => setDeviceView("tablet")}
                    className={`px-2 py-1 text-xs font-bold rounded-lg transition ${
                      deviceView === "tablet" ? "bg-pastel-yellow" : "hover:bg-gray-100"
                    }`}
                  >
                    Tablet
                  </button>
                  <button
                    onClick={() => setDeviceView("mobile")}
                    className={`px-2 py-1 text-xs font-bold rounded-lg transition ${
                      deviceView === "mobile" ? "bg-pastel-yellow" : "hover:bg-gray-100"
                    }`}
                  >
                    Mobile
                  </button>
                </div>

                <button
                  onClick={() => setRefreshKey((k) => k + 1)}
                  className="p-1.5 bg-white border-2 border-brutal-black rounded-xl shadow-brutal-sm hover:bg-pastel-mint transition"
                  title="Reload Element"
                >
                  <span className="material-symbols-outlined text-sm">refresh</span>
                </button>

                <a
                  href={activeModal.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-white border-2 border-brutal-black rounded-xl shadow-brutal-sm hover:bg-pastel-coral transition flex items-center gap-1 text-xs font-bold px-2.5"
                  title="Open Fullscreen in New Window"
                >
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                  <span className="hidden sm:inline">Fullscreen</span>
                </a>

                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 bg-white border-2 border-brutal-black rounded-xl shadow-brutal-sm hover:bg-pastel-coral hover:text-white transition"
                  title="Close (Esc)"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            </div>

            {/* Iframe Stage */}
            <div className="flex-1 bg-zinc-900 p-2 sm:p-4 flex items-center justify-center overflow-hidden relative">
              <div
                className={`h-full transition-all duration-300 bg-white rounded-2xl overflow-hidden border-2 border-brutal-black shadow-brutal-lg ${
                  deviceView === "desktop"
                    ? "w-full"
                    : deviceView === "tablet"
                    ? "w-[768px]"
                    : "w-[400px]"
                }`}
              >
                <iframe
                  key={refreshKey}
                  src={activeModal.path}
                  title={activeModal.title}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>

            {/* Modal Bottom Bar */}
            <div className="px-5 py-2.5 bg-[#FAF5EB] border-t-2 border-brutal-black flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-zinc-700">
                <span className="w-2 h-2 rounded-full bg-pastel-mint border border-brutal-black animate-pulse" />
                Live 3D & HTML Element Sandbox: <code className="font-bold text-black">{activeModal.path}</code>
              </span>
              <span className="text-zinc-500 hidden sm:inline">Press Esc or click dot to close</span>
            </div>

          </div>
        </div>
      )}

      {/* ADD 5TH ELEMENT GUIDE MODAL */}
      {isAddGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-cream-card border-[3px] border-brutal-black rounded-3xl shadow-brutal-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-5 py-3.5 bg-pastel-yellow border-b-2 border-brutal-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">📁</span>
                <span className="font-display-hero font-bold text-sm text-brutal-black">
                  Add Your Next 3D Element to Opdex
                </span>
              </div>
              <button
                onClick={() => setIsAddGuideOpen(false)}
                className="w-4 h-4 rounded-full bg-pastel-coral border-2 border-brutal-black hover:scale-110 transition"
              />
            </div>
            <div className="p-6 flex flex-col gap-4 text-xs font-body-md text-zinc-800">
              <p className="font-medium">
                To add your next HTML or WebGL 3D element:
              </p>
              <div className="p-3 bg-[#FAF5EB] border-2 border-brutal-black rounded-xl font-mono text-[11px]">
                <strong>Step 1:</strong> Save your HTML file in <code className="bg-white px-1 py-0.5 rounded border border-black/30 font-bold">/elements/my_new_element.html</code>
              </div>
              <div className="p-3 bg-[#FAF5EB] border-2 border-brutal-black rounded-xl font-mono text-[11px]">
                <strong>Step 2:</strong> Add it to the <code className="bg-white px-1 py-0.5 rounded border border-black/30 font-bold">artifacts</code> list in <code className="font-bold">src/app/page.tsx</code>
              </div>
              <p className="text-zinc-600">
                Next.js will automatically detect your element, render the card with its photo, and enable the live interactive device modal!
              </p>
            </div>
            <div className="px-5 py-3 bg-[#FAF5EB] border-t-2 border-brutal-black flex justify-end">
              <button
                onClick={() => setIsAddGuideOpen(false)}
                className="px-4 py-1.5 bg-pastel-yellow border-2 border-brutal-black rounded-xl font-bold shadow-brutal-sm text-xs"
              >
                Got It!
              </button>
            </div>
          </div>
        </div>
      )}
      {/* UNIQUE SUBMISSION CONFIRMATION MODAL */}
      {submissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-cream-card border-[3px] border-brutal-black rounded-3xl shadow-brutal-xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Window Top Bar */}
            <div className="px-5 py-3.5 bg-pastel-yellow border-b-2 border-brutal-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-pastel-coral border-2 border-brutal-black"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-pastel-yellow border-2 border-brutal-black"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-pastel-mint border-2 border-brutal-black"></span>
                <span className="font-label-sm text-xs font-extrabold uppercase tracking-wider text-brutal-black ml-2">
                  Admin Dispatch Terminal · Dispatched
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSubmissionModal(null);
                  playPop(500);
                }}
                className="w-7 h-7 rounded-xl bg-white border-2 border-brutal-black flex items-center justify-center text-sm font-bold shadow-brutal-sm hover:scale-105 active:scale-95 transition-transform"
                title="Close confirmation"
              >
                ✕
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-7 flex flex-col items-center text-center gap-4">
              {/* Celebration Icon */}
              <div className="w-16 h-16 rounded-2xl bg-pastel-mint border-2 border-brutal-black shadow-brutal flex items-center justify-center text-3xl rotate-3">
                📦
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 bg-pastel-purple/20 text-purple-900 border border-purple-800/30 px-3 py-1 rounded-full text-xs font-bold mb-2">
                  <span className="w-2 h-2 rounded-full bg-pastel-purple border border-brutal-black animate-ping"></span>
                  <span>Admin Match Engine Active</span>
                </div>
                <h3 className="font-display-hero text-2xl sm:text-3xl font-extrabold text-brutal-black">
                  Code Package Dispatched!
                </h3>
                <p className="font-body-md text-sm text-zinc-700 mt-1 max-w-sm">
                  We located your requested project in the database. The standalone WebGL & HTML bundle is queued for delivery.
                </p>
              </div>

              {/* Telemetry Ticket Box */}
              <div className="w-full bg-[#FAF5EB] rounded-2xl border-2 border-brutal-black p-4 text-left flex flex-col gap-2.5 shadow-brutal-sm">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-300">
                  <span className="font-label-sm text-xs font-bold text-zinc-500 uppercase tracking-wider">Ticket UID</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-extrabold bg-pastel-yellow px-2 py-0.5 rounded border border-brutal-black">
                      {submissionModal.ticketId}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(submissionModal.ticketId);
                        playPop(600);
                        setTicketCopied(true);
                        setTimeout(() => setTicketCopied(false), 2000);
                      }}
                      className="text-[11px] font-bold text-blue-600 hover:underline"
                    >
                      {ticketCopied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-xs font-bold text-zinc-500 uppercase tracking-wider">Requested Card UID</span>
                  <span className="font-mono text-xs font-extrabold bg-pastel-coral text-brutal-black px-2 py-0.5 rounded border border-brutal-black">
                    {submissionModal.projectUid}
                  </span>
                </div>

                {submissionModal.projectName && submissionModal.projectName !== submissionModal.projectUid && (
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-xs font-bold text-zinc-500 uppercase tracking-wider">Matched Element</span>
                    <span className="font-display text-xs font-bold text-zinc-800">
                      {submissionModal.projectName}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-xs font-bold text-zinc-500 uppercase tracking-wider">Recipient Email</span>
                  <span className="font-mono text-xs font-bold text-zinc-800 truncate max-w-[200px]">
                    {submissionModal.email}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-xs font-bold text-zinc-500 uppercase tracking-wider">Package Manifest</span>
                  <span className="font-label-sm text-[11px] font-bold text-emerald-700 bg-pastel-mint/40 px-2 py-0.5 rounded border border-emerald-800/30">
                    HTML5 + WebGL + Audio (.zip)
                  </span>
                </div>
              </div>

              {/* Admin & Security Note */}
              <div className="text-xs text-zinc-600 bg-cream-card p-3 rounded-xl border border-zinc-300 w-full text-left flex items-start gap-2">
                <span className="text-base select-none">💡</span>
                <p className="leading-tight">
                  <strong>Admin Note:</strong> Your UID <code>{submissionModal.projectUid}</code> has been indexed. If you need immediate raw file access, you can also inspect it live right now in the sandbox above.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmissionModal(null);
                    playPop(500);
                  }}
                  className="flex-1 bg-pastel-yellow text-brutal-black font-label-md font-bold py-3 px-4 rounded-xl border-2 border-brutal-black shadow-brutal hover:-translate-y-0.5 active:translate-y-0.5 transition-transform flex items-center justify-center gap-1.5"
                >
                  <span>Got it, Back to Sandbox!</span>
                  <span>⚡</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}
