"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Box, Rotate3d, Layers } from "lucide-react";
import { playKeyTap, playPop } from "@/utils/audio";

export default function Interactive3DCube() {
  const [rotateX, setRotateX] = useState(15);
  const [rotateY, setRotateY] = useState(-25);
  const [isHovered, setIsHovered] = useState(false);
  const [activeFace, setActiveFace] = useState<string>("front");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setRotateY((y) => (y + 1) % 360);
      setRotateX((x) => 15 + Math.sin(Date.now() / 1000) * 8);
    }, 40);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateY(x * 0.4);
    setRotateX(-y * 0.4);
  };

  const handleFaceClick = (face: string, note: number) => {
    setActiveFace(face);
    playKeyTap(note);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="bg-[#FAF7EE] border-[3.5px] border-[#121212] rounded-[30px] p-6 md:p-8 shadow-brutal flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left: Description */}
        <div className="max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4ECCA3] border-2 border-black rounded-full text-xs font-bold shadow-brutal-sm mb-3 text-black">
            <Rotate3d size={14} />
            <span>3D Interactive Elements</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#121212] font-display tracking-tight mb-2">
            Tactile 3D Matrix & Elements Lab
          </h3>
          <p className="text-xs sm:text-sm text-black/70 mb-4 leading-relaxed">
            All HTML and 3D experiences are organized in the dedicated <code className="bg-white px-2 py-0.5 rounded border border-black font-mono font-bold">/elements</code> directory. Move your cursor over the 3D isometric cube to rotate it in real-time or click any face to trigger synthesized audio.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-white border-2 border-black rounded-xl text-xs font-bold font-mono">
              📁 elements/ox_ui.html
            </span>
            <span className="px-2.5 py-1 bg-white border-2 border-black rounded-xl text-xs font-bold font-mono">
              📁 elements/Glass_widgets.html
            </span>
            <span className="px-2.5 py-1 bg-white border-2 border-black rounded-xl text-xs font-bold font-mono">
              📁 elements/Keycap Studio.html
            </span>
            <span className="px-2.5 py-1 bg-white border-2 border-black rounded-xl text-xs font-bold font-mono">
              📁 elements/retro_desktop.html
            </span>
            <span className="px-2.5 py-1 bg-[#FFEAE5] border-2 border-black rounded-xl text-xs font-bold font-mono">
              📁 elements/interactive_spidy.html
            </span>
          </div>
        </div>

        {/* Right: The 3D Interactive Isometric Cube Stage */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => {
            setIsHovered(true);
            playPop(480);
          }}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-[280px] h-[280px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          style={{ perspective: 1000 }}
        >
          {/* 3D Cube Container */}
          <div
            className="relative w-[120px] h-[120px] transition-transform duration-75"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            }}
          >
            {/* Front Face: Coral */}
            <div
              onClick={() => handleFaceClick("front", 440)}
              className="absolute inset-0 bg-[#FF5E5B] border-[3px] border-black flex flex-col items-center justify-center text-white font-display font-extrabold text-sm shadow-inner rounded-xl"
              style={{ transform: "translateZ(60px)" }}
            >
              <Sparkles size={24} className="mb-1" />
              <span>OX-UI</span>
            </div>

            {/* Back Face: Purple */}
            <div
              onClick={() => handleFaceClick("back", 520)}
              className="absolute inset-0 bg-[#A084E8] border-[3px] border-black flex flex-col items-center justify-center text-white font-display font-extrabold text-sm rounded-xl"
              style={{ transform: "rotateY(180deg) translateZ(60px)" }}
            >
              <Box size={24} className="mb-1" />
              <span>GLASS</span>
            </div>

            {/* Right Face: Cyan */}
            <div
              onClick={() => handleFaceClick("right", 580)}
              className="absolute inset-0 bg-[#38BDF8] border-[3px] border-black flex flex-col items-center justify-center text-black font-display font-extrabold text-sm rounded-xl"
              style={{ transform: "rotateY(90deg) translateZ(60px)" }}
            >
              <Layers size={24} className="mb-1" />
              <span>RETRO</span>
            </div>

            {/* Left Face: Sunshine Yellow */}
            <div
              onClick={() => handleFaceClick("left", 660)}
              className="absolute inset-0 bg-[#FFE66D] border-[3px] border-black flex flex-col items-center justify-center text-black font-display font-extrabold text-sm rounded-xl"
              style={{ transform: "rotateY(-90deg) translateZ(60px)" }}
            >
              <span>KEYCAP</span>
            </div>

            {/* Top Face: Coral / Spidy */}
            <div
              onClick={() => handleFaceClick("top", 740)}
              className="absolute inset-0 bg-[#FF5E5B] border-[3px] border-black flex items-center justify-center text-white font-extrabold text-xs rounded-xl shadow-inner"
              style={{ transform: "rotateX(90deg) translateZ(60px)" }}
            >
              SPIDY
            </div>

            {/* Bottom Face: White */}
            <div
              onClick={() => handleFaceClick("bottom", 360)}
              className="absolute inset-0 bg-white border-[3px] border-black flex items-center justify-center text-black font-bold text-xs rounded-xl"
              style={{ transform: "rotateX(-90deg) translateZ(60px)" }}
            >
              LAB
            </div>
          </div>

          <div className="absolute bottom-2 text-[10px] font-mono text-black/50 bg-white/70 px-2 py-0.5 rounded border border-black/20">
            Hover & drag to tilt 3D cube
          </div>
        </div>

      </div>
    </div>
  );
}
