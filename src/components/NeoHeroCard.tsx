"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Search, 
  Check, 
  User, 
  Mail, 
  Settings, 
  Heart, 
  Send, 
  Sliders, 
  ExternalLink, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  RefreshCw,
  Code2,
  Play
} from "lucide-react";
import { PROJECTS, ProjectItem } from "@/data/projects";
import { playClick, playPop, playToggle, playKeyTap, toggleMute } from "@/utils/audio";

interface NeoHeroCardProps {
  onOpenProject: (project: ProjectItem) => void;
}

export default function NeoHeroCard({ onOpenProject }: NeoHeroCardProps) {
  // State for all the interactive widgets from the image
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2" | "tab3">("tab1");
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string>("Profile");
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [accentColor, setAccentColor] = useState<string>("#FF5E5B");
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(PROJECTS[0]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);

  // Animated progress bar states
  const [progress, setProgress] = useState({ coral: 78, purple: 58, teal: 92 });

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress({
        coral: 70 + Math.floor(Math.sin(Date.now() / 1500) * 12),
        purple: 55 + Math.floor(Math.cos(Date.now() / 1800) * 15),
        teal: 88 + Math.floor(Math.sin(Date.now() / 1200) * 8),
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleKeyClick = (key: string, note: number) => {
    setActiveKey(key);
    playKeyTap(note);
    setTimeout(() => setActiveKey(null), 250);
  };

  const handleTabChange = (tab: "tab1" | "tab2" | "tab3") => {
    setActiveTab(tab);
    playPop(520);
  };

  const handleToggleSound = () => {
    const muted = toggleMute();
    setSoundEnabled(!muted);
    if (!muted) playPop(600);
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 py-8 select-none">
      {/* Floating Confetti and Geometric Particles around the Card */}
      <div className="absolute -top-3 left-12 text-[#FF9F43] animate-bounce duration-1000">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.5-6.2-4.6-6.2 4.6 2.4-7.5-6.2-4.5h7.6z"/>
        </svg>
      </div>
      <div className="absolute top-1/4 -left-5 w-6 h-6 bg-[#38BDF8] border-2 border-black rotate-12 shadow-brutal-sm animate-float-slow hidden md:block" />
      <div className="absolute top-12 right-20 text-[#FFE66D] animate-spin duration-3000">
        <Sparkles size={28} className="fill-[#FFE66D] stroke-black stroke-2" />
      </div>
      <div className="absolute bottom-16 -left-2 w-5 h-5 bg-[#FF5E5B] rounded-full border-2 border-black shadow-brutal-sm" />
      <div className="absolute -bottom-4 right-1/4 w-7 h-7 bg-[#A084E8] border-2 border-black rotate-45 shadow-brutal-sm animate-float-reverse hidden sm:block" />
      <div className="absolute bottom-20 -right-4 w-6 h-6 bg-[#4ECCA3] border-2 border-black -rotate-12 shadow-brutal-sm hidden md:block" />

      {/* Quick Sound Control Neo Floating Button */}
      <div className="flex justify-end mb-3 items-center gap-3">
        <span className="text-xs font-mono font-medium text-black/60 bg-white/70 px-2.5 py-1 rounded-full border border-black/10">
          🎮 Interactive Playground · Click anything!
        </span>
        <button
          onClick={handleToggleSound}
          type="button"
          aria-label={soundEnabled ? "Mute interactive audio" : "Enable interactive audio"}
          className="neo-pressable flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-black rounded-full shadow-brutal-sm text-xs font-semibold"
        >
          {soundEnabled ? (
            <>
              <Volume2 size={14} className="text-[#4ECCA3]" />
              <span>SFX: ON</span>
            </>
          ) : (
            <>
              <VolumeX size={14} className="text-red-500" />
              <span>SFX: MUTED</span>
            </>
          )}
        </button>
      </div>

      {/* =========================================================================
          THE MAIN NEO-BRUTALISM CARD (Exact visual representation of the image)
          ========================================================================= */}
      <div className="relative bg-[#FFFDF5] border-[3.5px] border-[#121212] rounded-[34px] shadow-[10px_10px_0px_#121212] overflow-hidden transition-all duration-300">
        
        {/* =======================================================================
            TOP-RIGHT YELLOW ACCENT QUADRANT (Toggles, Checkbox, Search)
            ======================================================================= */}
        <div className="absolute top-0 right-0 w-[42%] md:w-[32%] lg:w-[28%] bg-[#FFE66D] border-l-[3.5px] border-b-[3.5px] border-[#121212] rounded-bl-[36px] p-4 md:p-5 z-10">
          {/* Toggles Row */}
          <div className="flex flex-col gap-2.5 mb-3.5">
            {/* Active Toggle Switch */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setToggle1(!toggle1);
                  playToggle(!toggle1);
                }}
                className={`w-[48px] h-[26px] rounded-full border-2 border-black transition-colors relative flex items-center p-0.5 ${
                  toggle1 ? "bg-[#38BDF8]" : "bg-white"
                }`}
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full bg-white border-2 border-black transition-transform shadow-sm ${
                    toggle1 ? "translate-x-[22px]" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-[12px] font-semibold text-black tracking-tight">Active</span>
            </div>

            {/* Inactive Toggle Switch */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setToggle2(!toggle2);
                  playToggle(!toggle2);
                }}
                className={`w-[48px] h-[26px] rounded-full border-2 border-black transition-colors relative flex items-center p-0.5 ${
                  toggle2 ? "bg-[#4ECCA3]" : "bg-white/80"
                }`}
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full bg-white border-2 border-black transition-transform shadow-sm ${
                    toggle2 ? "translate-x-[22px]" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-[12px] font-medium text-black/70 tracking-tight">Inactive</span>
            </div>

            {/* Checkbox */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setIsChecked(!isChecked);
                  playPop(isChecked ? 400 : 620);
                }}
                className={`w-[22px] h-[22px] rounded-md border-2 border-black flex items-center justify-center transition-all ${
                  isChecked ? "bg-[#FF5E5B] text-white" : "bg-white"
                }`}
              >
                {isChecked && <Check size={14} strokeWidth={3.5} />}
              </button>
              <span className="text-[12px] font-semibold text-black tracking-tight">Checked</span>
            </div>
          </div>

          {/* Search Bar matching image */}
          <div className="relative">
            <div className="flex items-center bg-white border-2 border-black rounded-xl px-2.5 py-1.5 shadow-brutal-sm">
              <Search size={14} className="text-black/60 mr-1.5 shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-transparent border-none outline-none font-medium text-black placeholder-black/50"
              />
            </div>
          </div>
        </div>

        {/* =======================================================================
            BOTTOM-LEFT PINK/SALMON ACCENT BLOB (With Avatar Group)
            ======================================================================= */}
        <div className="absolute bottom-0 left-0 w-[240px] h-[160px] bg-[#FFAAA6] border-t-[3.5px] border-r-[3.5px] border-[#121212] rounded-tr-[42px] -z-0 opacity-90 hidden sm:block">
          <div className="absolute bottom-5 left-6 flex items-center">
            {/* 4 Overlapping Avatar Circles matching the image */}
            <div className="relative flex -space-x-2.5">
              <div 
                onClick={() => playPop(440)}
                title="Creator 1"
                className="w-9 h-9 rounded-full bg-[#FF5E5B] border-2 border-black flex items-center justify-center text-white text-xs font-bold shadow-brutal-sm cursor-pointer hover:scale-110 transition-transform"
              >
                <User size={16} />
              </div>
              <div 
                onClick={() => playPop(500)}
                title="Creator 2"
                className="w-9 h-9 rounded-full bg-[#A084E8] border-2 border-black flex items-center justify-center text-white text-xs font-bold shadow-brutal-sm cursor-pointer hover:scale-110 transition-transform"
              >
                ✦
              </div>
              <div 
                onClick={() => playPop(560)}
                title="Creator 3"
                className="w-9 h-9 rounded-full bg-[#4ECCA3] border-2 border-black flex items-center justify-center text-black text-xs font-bold shadow-brutal-sm cursor-pointer hover:scale-110 transition-transform"
              >
                ★
              </div>
              <div 
                onClick={() => playPop(640)}
                title="4 Ready-to-use HTML Labs"
                className="w-9 h-9 rounded-full bg-[#FFE66D] border-2 border-black flex items-center justify-center text-black text-xs font-extrabold shadow-brutal-sm cursor-pointer hover:scale-110 transition-transform"
              >
                +3
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================================
            TOP-LEFT SECTION: STACKED ANGLED BUTTONS, CARD TITLE, SUCCESS PILL
            ======================================================================= */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 flex flex-col gap-3">
          {/* 3 Angled Stacked Pill Buttons (Primary, Secondary, Accent) */}
          <div className="flex flex-col -space-y-1 w-[124px]">
            {/* Primary (Red/Coral) */}
            <button
              type="button"
              onClick={() => {
                setAccentColor("#FF5E5B");
                playClick(580);
              }}
              className="neo-pressable flex items-center gap-1.5 px-3 py-1.5 bg-[#FF5E5B] text-white border-2 border-black rounded-lg text-xs font-bold shadow-brutal-sm -rotate-2"
            >
              <Heart size={12} className="fill-white" />
              <span>Primary</span>
            </button>

            {/* Secondary (Purple) */}
            <button
              type="button"
              onClick={() => {
                setAccentColor("#A084E8");
                playClick(680);
              }}
              className="neo-pressable flex items-center gap-1.5 px-3 py-1.5 bg-[#A084E8] text-white border-2 border-black rounded-lg text-xs font-bold shadow-brutal-sm rotate-1"
            >
              <Send size={12} />
              <span>Secondary</span>
            </button>

            {/* Accent (Teal) */}
            <button
              type="button"
              onClick={() => {
                setAccentColor("#4ECCA3");
                playClick(780);
              }}
              className="neo-pressable flex items-center gap-1.5 px-3 py-1.5 bg-[#4ECCA3] text-black border-2 border-black rounded-lg text-xs font-bold shadow-brutal-sm -rotate-1"
            >
              <Sliders size={12} />
              <span>Accent</span>
            </button>
          </div>

          {/* Slanted Card Title snippet matching the image */}
          <div className="bg-white border-2 border-black rounded-xl p-2.5 w-[140px] shadow-brutal-sm -rotate-2 hidden sm:block">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-5 h-5 rounded bg-[#FFE66D] border border-black flex items-center justify-center text-[10px] font-bold">
                ✦
              </span>
              <span className="text-[11px] font-bold text-black">Card Title</span>
            </div>
            {/* Simulated mini text lines */}
            <div className="w-full h-2 bg-[#E2E8F0] rounded-sm mb-1" />
            <div className="w-3/4 h-2 bg-[#CBD5E1] rounded-sm" />
          </div>

          {/* Success Badge */}
          <div className="self-start">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#4ECCA3] text-black border-2 border-black rounded-full text-[11px] font-bold shadow-brutal-sm">
              <Check size={12} strokeWidth={3} />
              <span>Success</span>
            </span>
          </div>
        </div>

        {/* =======================================================================
            BOTTOM-RIGHT SECTION: NEO-BRUTAL MENU & STACKED PROGRESS BARS
            ======================================================================= */}
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10 flex flex-col items-end gap-3.5">
          {/* Neo Menu Card */}
          <div className="bg-white border-2 border-black rounded-xl overflow-hidden w-[140px] shadow-brutal">
            {/* Yellow Header */}
            <div className="bg-[#FFE66D] border-b-2 border-black px-2.5 py-1 flex items-center justify-between">
              <span className="text-[11px] font-bold text-black">Menu</span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-black" />
                <span className="text-[10px] font-bold">×</span>
              </div>
            </div>
            {/* Menu Items */}
            <div className="p-1 flex flex-col text-[11px] font-medium">
              <button
                type="button"
                onClick={() => {
                  setActiveMenu("Profile");
                  playPop(500);
                }}
                className={`flex items-center gap-1.5 px-2 py-1 rounded text-left transition ${
                  activeMenu === "Profile" ? "bg-[#FFFDF5] font-bold text-black border border-black/30" : "hover:bg-gray-100 text-black/80"
                }`}
              >
                <User size={12} />
                <span>Profile</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveMenu("Messages");
                  playPop(560);
                }}
                className={`flex items-center gap-1.5 px-2 py-1 rounded text-left transition ${
                  activeMenu === "Messages" ? "bg-[#FFFDF5] font-bold text-black border border-black/30" : "hover:bg-gray-100 text-black/80"
                }`}
              >
                <Mail size={12} />
                <span>Messages</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveMenu("Settings");
                  playPop(620);
                }}
                className={`flex items-center gap-1.5 px-2 py-1 rounded text-left transition ${
                  activeMenu === "Settings" ? "bg-[#FFFDF5] font-bold text-black border border-black/30" : "hover:bg-gray-100 text-black/80"
                }`}
              >
                <Settings size={12} />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* 3 Horizontal Pill Progress Bars matching the image */}
          <div className="flex flex-col gap-2 w-[140px]">
            {/* Coral Progress Bar */}
            <div className="w-full h-4 bg-white border-2 border-black rounded-full p-0.5 shadow-brutal-sm overflow-hidden">
              <div
                className="h-full bg-[#FF5E5B] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress.coral}%` }}
              />
            </div>
            {/* Purple Progress Bar */}
            <div className="w-full h-4 bg-white border-2 border-black rounded-full p-0.5 shadow-brutal-sm overflow-hidden">
              <div
                className="h-full bg-[#A084E8] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress.purple}%` }}
              />
            </div>
            {/* Teal Progress Bar */}
            <div className="w-full h-4 bg-white border-2 border-black rounded-full p-0.5 shadow-brutal-sm overflow-hidden">
              <div
                className="h-full bg-[#4ECCA3] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress.teal}%` }}
              />
            </div>
          </div>
        </div>

        {/* =======================================================================
            TOP CONTROLS ROW: 6 COLOR DOTS & 3-TAB SEGMENTED SWITCH
            ======================================================================= */}
        <div className="pt-6 md:pt-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-4 relative z-20">
          {/* 6 Playful Clickable Color Dots from image */}
          <div className="flex items-center gap-2 bg-white/80 border-2 border-black rounded-full px-3 py-1.5 shadow-brutal-sm">
            {[
              { color: "#FF5E5B", name: "Coral" },
              { color: "#A084E8", name: "Purple" },
              { color: "#4ECCA3", name: "Teal" },
              { color: "#FFE66D", name: "Yellow" },
              { color: "#38BDF8", name: "Cyan" },
              { color: "#FF9F43", name: "Orange" },
            ].map((dot, idx) => (
              <button
                key={dot.name}
                type="button"
                title={`Accent: ${dot.name}`}
                onClick={() => {
                  setAccentColor(dot.color);
                  playPop(420 + idx * 70);
                }}
                className="w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-black transition-transform hover:scale-125 focus:outline-none"
                style={{ backgroundColor: dot.color }}
              />
            ))}
          </div>

          {/* 3-Tab Segmented Switch matching the image: [ Tab 1 | Tab 2 | Tab 3 ] */}
          <div className="inline-flex items-center bg-white border-2 border-black rounded-xl p-1 shadow-brutal-sm">
            <button
              type="button"
              onClick={() => handleTabChange("tab1")}
              className={`px-3.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                activeTab === "tab1"
                  ? "bg-[#FFE66D] border-black text-black shadow-sm"
                  : "bg-transparent border-transparent text-black/70 hover:text-black"
              }`}
            >
              Tab 1
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("tab2")}
              className={`px-3.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                activeTab === "tab2"
                  ? "bg-[#FFE66D] border-black text-black shadow-sm"
                  : "bg-transparent border-transparent text-black/70 hover:text-black"
              }`}
            >
              Tab 2 (Labs)
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("tab3")}
              className={`px-3.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                activeTab === "tab3"
                  ? "bg-[#FFE66D] border-black text-black shadow-sm"
                  : "bg-transparent border-transparent text-black/70 hover:text-black"
              }`}
            >
              Tab 3 (Code)
            </button>
          </div>
        </div>

        {/* =======================================================================
            CENTER HERO CONTENT (Drives the living UI)
            ======================================================================= */}
        <div className="pt-8 pb-12 md:py-14 px-6 max-w-2xl mx-auto flex flex-col items-center text-center relative z-20">
          
          {/* Center Glowing Sparkle Squircle Icon */}
          <div 
            onClick={() => {
              playPop(750);
              setAccentColor(accentColor === "#FF5E5B" ? "#FFE66D" : "#FF5E5B");
            }}
            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border-[3px] border-black flex items-center justify-center shadow-brutal mb-4 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            style={{ backgroundColor: accentColor }}
          >
            <Sparkles size={28} className="text-white fill-white animate-pulse" />
          </div>

          {/* Main Title: Neo Brutalism */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#121212] mb-1 font-display">
            Neo Brutalism
          </h1>

          {/* Subtitle: UI Component Library */}
          <h2 className="text-xl md:text-2xl font-semibold text-black/80 mb-5">
            UI Component Library
          </h2>

          {/* The Tag Pills Row from the image: [React] [Tailwind CSS] [20+ Components] [All States] [4 Labs] */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <span className="neo-pressable px-3 py-1 bg-white border-2 border-black rounded-full text-xs font-bold shadow-brutal-sm cursor-pointer">
              React
            </span>
            <span className="neo-pressable px-3 py-1 bg-[#A084E8] text-white border-2 border-black rounded-full text-xs font-bold shadow-brutal-sm cursor-pointer">
              Tailwind CSS
            </span>
            <span className="neo-pressable px-3 py-1 bg-[#4ECCA3] text-black border-2 border-black rounded-full text-xs font-bold shadow-brutal-sm cursor-pointer">
              20+ Components
            </span>
            <span className="neo-pressable px-3 py-1 bg-[#FFE66D] text-black border-2 border-black rounded-full text-xs font-bold shadow-brutal-sm cursor-pointer">
              All States
            </span>
            <span 
              onClick={() => handleTabChange("tab2")}
              className="neo-pressable px-3 py-1 bg-[#38BDF8] text-black border-2 border-black rounded-full text-xs font-bold shadow-brutal-sm cursor-pointer flex items-center gap-1"
            >
              ★ 6 HTML Labs
            </span>
          </div>

          {/* Microtext Tagline from the image */}
          <p className="text-xs md:text-sm font-medium text-black/70 tracking-wide mb-6">
            Bold borders · Hard shadows · Vibrant colors
          </p>

          {/* 4 Interactive Keycaps from image: [ D ] [ ▲ ] [ ◼ ] [ ♥ ] */}
          <div className="flex items-center gap-2.5 mb-6">
            {/* Key D (Yellow) */}
            <button
              type="button"
              onClick={() => handleKeyClick("D", 392)}
              className={`w-9 h-9 md:w-10 md:h-10 bg-[#FFE66D] border-2 border-black rounded-lg flex items-center justify-center text-sm font-extrabold shadow-brutal-sm cursor-pointer transition-all ${
                activeKey === "D" ? "translate-x-[2px] translate-y-[2px] shadow-none" : "hover:-translate-y-0.5"
              }`}
            >
              D
            </button>

            {/* Key Triangle (Cyan) */}
            <button
              type="button"
              onClick={() => handleKeyClick("T", 440)}
              className={`w-9 h-9 md:w-10 md:h-10 bg-[#38BDF8] border-2 border-black rounded-lg flex items-center justify-center text-xs font-bold shadow-brutal-sm cursor-pointer transition-all ${
                activeKey === "T" ? "translate-x-[2px] translate-y-[2px] shadow-none" : "hover:-translate-y-0.5"
              }`}
            >
              ▲
            </button>

            {/* Key Square (Orange) */}
            <button
              type="button"
              onClick={() => handleKeyClick("S", 523)}
              className={`w-9 h-9 md:w-10 md:h-10 bg-[#FF9F43] border-2 border-black rounded-lg flex items-center justify-center text-xs font-bold shadow-brutal-sm cursor-pointer transition-all ${
                activeKey === "S" ? "translate-x-[2px] translate-y-[2px] shadow-none" : "hover:-translate-y-0.5"
              }`}
            >
              ◼
            </button>

            {/* Key Heart (Coral) */}
            <button
              type="button"
              onClick={() => handleKeyClick("H", 587)}
              className={`w-9 h-9 md:w-10 md:h-10 bg-[#FF5E5B] text-white border-2 border-black rounded-lg flex items-center justify-center text-sm font-bold shadow-brutal-sm cursor-pointer transition-all ${
                activeKey === "H" ? "translate-x-[2px] translate-y-[2px] shadow-none" : "hover:-translate-y-0.5"
              }`}
            >
              ♥
            </button>
          </div>

          {/* =====================================================================
              TAB 2: INTEGRATED 4 HTML PROJECT LAB SELECTOR & LIVE LAUNCHER
              ===================================================================== */}
          {activeTab === "tab2" && (
            <div className="w-full bg-white border-2 border-black rounded-2xl p-4 shadow-brutal text-left animate-in fade-in zoom-in-95 duration-200 mt-2">
              <div className="flex items-center justify-between border-b-2 border-black pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5E5B] border border-black" />
                  <span className="w-3 h-3 rounded-full bg-[#FFE66D] border border-black" />
                  <span className="w-3 h-3 rounded-full bg-[#4ECCA3] border border-black" />
                  <span className="text-xs font-bold font-mono ml-1">Live HTML Labs Showcase</span>
                </div>
                <span className="text-[11px] font-semibold bg-[#FFE66D] border border-black px-2 py-0.5 rounded-full">
                  {PROJECTS.length} Interactive Projects
                </span>
              </div>

              {/* 6 Project Selector Buttons inside the card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {PROJECTS.map((proj) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => {
                      setSelectedProject(proj);
                      playPop(480);
                    }}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border-2 text-left transition ${
                      selectedProject.id === proj.id
                        ? "bg-[#FFFDF5] border-black shadow-brutal-sm"
                        : "bg-gray-50 border-gray-200 hover:border-black/50"
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-sm"
                      style={{ backgroundColor: proj.themeColor }}
                    >
                      ★
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-black truncate">{proj.shortTitle}</div>
                      <div className="text-[10px] text-black/60 truncate">{proj.category}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Project Quick Preview & Launch Action */}
              <div className="bg-[#FAF7EE] border-2 border-black rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-black flex items-center gap-1.5">
                    <span>{selectedProject.title}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-white border border-black rounded-md font-mono">
                      {selectedProject.stats.tech}
                    </span>
                  </div>
                  <p className="text-[11px] text-black/70 mt-0.5 line-clamp-1">{selectedProject.tagline}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      playClick(620);
                      onOpenProject(selectedProject);
                    }}
                    className="neo-pressable flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-[#4ECCA3] border-2 border-black rounded-xl text-xs font-bold shadow-brutal-sm"
                  >
                    <Play size={12} className="fill-black" />
                    <span>Launch In Modal</span>
                  </button>
                  <a
                    href={selectedProject.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick(700)}
                    className="neo-pressable p-1.5 bg-white border-2 border-black rounded-xl text-black shadow-brutal-sm hover:bg-[#FFE66D]"
                    title="Open Fullscreen in New Tab"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              TAB 3: COMPONENT CODE & QUICK COPY
              ===================================================================== */}
          {activeTab === "tab3" && (
            <div className="w-full bg-[#18181B] border-2 border-black rounded-2xl p-4 shadow-brutal text-left text-white font-mono text-xs animate-in fade-in zoom-in-95 duration-200 mt-2">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/20">
                <span className="text-gray-400">NeoButton.tsx</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `<button className="px-4 py-2 bg-[#FFE66D] border-2 border-black rounded-xl shadow-[4px_4px_0px_#121212] font-bold hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">Click Me</button>`
                    );
                    setCopiedCode(true);
                    playPop(700);
                    setTimeout(() => setCopiedCode(false), 2000);
                  }}
                  className="px-2.5 py-1 bg-white text-black font-sans font-bold text-[11px] rounded border border-black hover:bg-[#FFE66D]"
                >
                  {copiedCode ? "Copied!" : "Copy Snippet"}
                </button>
              </div>
              <pre className="text-green-400 overflow-x-auto p-1 leading-relaxed">
{`<button className="
  px-5 py-2.5 
  bg-[#FFE66D] 
  border-[3px] border-black 
  rounded-2xl 
  shadow-[5px_5px_0px_#121212] 
  font-display font-bold 
  hover:-translate-x-0.5 hover:-translate-y-0.5 
  active:translate-x-1 active:translate-y-1 
  transition-all
">
  Neo Brutal Button
</button>`}
              </pre>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
