"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  ExternalLink, 
  RefreshCw, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Maximize2,
  Sparkles
} from "lucide-react";
import { ProjectItem } from "@/data/projects";
import { playClick, playPop } from "@/utils/audio";

interface LiveProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function LiveProjectModal({ project, onClose }: LiveProjectModalProps) {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleDeviceChange = (mode: "desktop" | "tablet" | "mobile") => {
    setDeviceMode(mode);
    playPop(520);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setRefreshKey((prev) => prev + 1);
    playClick(650);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="w-full max-w-6xl h-[92vh] bg-[#FFFDF5] border-[3.5px] border-[#121212] rounded-[30px] shadow-[12px_12px_0px_#121212] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Window Bar */}
        <div 
          className="px-5 py-3 border-b-[3.5px] border-[#121212] flex items-center justify-between"
          style={{ backgroundColor: project.themeColor }}
        >
          {/* Left: Window Dots & Title */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                playClick(400);
                onClose();
              }}
              title="Close Modal (Esc)"
              className="w-3.5 h-3.5 rounded-full bg-[#FF5E5B] border-2 border-black flex items-center justify-center text-[9px] font-bold hover:scale-110 transition"
            >
              ×
            </button>
            <div className="w-3.5 h-3.5 rounded-full bg-[#FFE66D] border-2 border-black" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#4ECCA3] border-2 border-black" />
            
            <div className="ml-2 flex items-center gap-2">
              <span className="font-display font-extrabold text-xs md:text-sm text-black truncate max-w-[180px] md:max-w-xs">
                {project.title}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 bg-white border border-black rounded-md text-[10px] font-mono font-bold">
                {project.category}
              </span>
            </div>
          </div>

          {/* Center: Device Viewport Switcher */}
          <div className="hidden md:flex items-center bg-white border-2 border-black rounded-xl p-0.5 shadow-brutal-sm">
            <button
              type="button"
              onClick={() => handleDeviceChange("desktop")}
              className={`p-1.5 rounded-lg transition ${
                deviceMode === "desktop" ? "bg-[#FFE66D] text-black" : "text-black/60 hover:text-black"
              }`}
              title="Desktop View (100%)"
            >
              <Monitor size={15} />
            </button>
            <button
              type="button"
              onClick={() => handleDeviceChange("tablet")}
              className={`p-1.5 rounded-lg transition ${
                deviceMode === "tablet" ? "bg-[#FFE66D] text-black" : "text-black/60 hover:text-black"
              }`}
              title="Tablet View (768px)"
            >
              <Tablet size={15} />
            </button>
            <button
              type="button"
              onClick={() => handleDeviceChange("mobile")}
              className={`p-1.5 rounded-lg transition ${
                deviceMode === "mobile" ? "bg-[#FFE66D] text-black" : "text-black/60 hover:text-black"
              }`}
              title="Mobile View (420px)"
            >
              <Smartphone size={15} />
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRefresh}
              className="p-1.5 bg-white border-2 border-black rounded-xl text-black shadow-brutal-sm hover:bg-[#FFE66D] transition"
              title="Reload Frame"
            >
              <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
            </button>

            <a
              href={project.path}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick(600)}
              className="p-1.5 bg-white border-2 border-black rounded-xl text-black shadow-brutal-sm hover:bg-[#4ECCA3] transition flex items-center gap-1 text-xs font-bold px-2.5"
              title="Open Fullscreen in New Tab"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Fullscreen</span>
            </a>

            <button
              type="button"
              onClick={() => {
                playClick(420);
                onClose();
              }}
              className="p-1.5 bg-white border-2 border-black rounded-xl text-black shadow-brutal-sm hover:bg-[#FF5E5B] hover:text-white transition"
              title="Close (Esc)"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Iframe Workspace Stage */}
        <div className="flex-1 bg-[#1A1A1A] relative flex items-center justify-center p-2 sm:p-4 overflow-hidden">
          
          {/* Skeleton loading indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A] z-20">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFE66D] border-2 border-black flex items-center justify-center animate-spin">
                  <Sparkles size={20} className="text-black" />
                </div>
                <span className="font-mono text-xs text-white/80 font-bold">
                  Initializing {project.shortTitle}...
                </span>
              </div>
            </div>
          )}

          {/* Responsive Device Wrapper */}
          <div
            className={`h-full transition-all duration-300 bg-white rounded-2xl overflow-hidden border-[3px] border-black shadow-[8px_8px_0px_rgba(0,0,0,0.5)] flex flex-col ${
              deviceMode === "desktop"
                ? "w-full"
                : deviceMode === "tablet"
                ? "w-[768px]"
                : "w-[420px]"
            }`}
          >
            <iframe
              key={refreshKey}
              src={project.path}
              title={project.title}
              onLoad={() => setIsLoading(false)}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>

        {/* Modal Bottom Status Bar */}
        <div className="px-5 py-2.5 bg-white border-t-2 border-black flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3 text-black/70">
            <span className="flex items-center gap-1.5 text-[#4ECCA3] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#4ECCA3] animate-pulse" />
              Live Workspace Active
            </span>
            <span className="hidden sm:inline">· {project.stats.tech}</span>
          </div>
          <div className="text-black/60 text-[11px] hidden sm:block">
            Press <kbd className="px-1.5 py-0.5 bg-gray-100 border border-black/30 rounded font-bold">Esc</kbd> to close
          </div>
        </div>

      </div>
    </div>
  );
}
