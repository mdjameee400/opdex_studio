"use client";

import React from "react";
import { Flame } from "lucide-react";
import { playClick, playPop } from "@/utils/audio";

export default function OpdexHeader() {
  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-3">
      <div className="flex items-center justify-between">
        
        {/* Brand Logo Button */}
        <button
          type="button"
          onClick={() => playPop(540)}
          className="neo-pressable flex items-center gap-2 px-3 py-1.5 bg-white border-[2.5px] border-black rounded-xl shadow-brutal-sm cursor-pointer select-none"
        >
          <div className="w-6 h-6 rounded-lg bg-[#FFE279] border-2 border-black flex items-center justify-center">
            <Flame size={14} className="text-black fill-black" />
          </div>
          <span className="font-display font-extrabold text-sm md:text-base tracking-tight text-black">
            Opdex Studio
          </span>
        </button>

        {/* Live Playground Teal Pill Badge */}
        <div className="neo-pressable flex items-center gap-1.5 px-3.5 py-1 bg-[#2DD4BF] border-[2.5px] border-black rounded-full shadow-brutal-sm cursor-pointer select-none">
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span className="font-mono font-extrabold text-[11px] md:text-xs text-black tracking-wide uppercase">
            V2.4 LIVE PLAYGROUND
          </span>
        </div>

      </div>
    </header>
  );
}
