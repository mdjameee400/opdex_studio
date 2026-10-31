"use client";

import React, { useState } from "react";
import { 
  Play, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Plus, 
  Zap, 
  Maximize2,
  SlidersHorizontal,
  Code
} from "lucide-react";
import { PROJECTS, ProjectItem } from "@/data/projects";
import { playClick, playPop } from "@/utils/audio";

interface ProjectShowcaseProps {
  onOpenProject: (project: ProjectItem) => void;
  onAddNewProject: () => void;
}

export default function ProjectShowcase({ onOpenProject, onAddNewProject }: ProjectShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "3D WebGL", "Interactive 3D Portrait", "Interactive 3D Silhouette", "Interactive Creature Lab", "Interface System", "Hardware Design Lab", "Retro 3D Game Station"];

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => {
        if (activeCategory === "3D WebGL") return p.tags.includes("Three.js") || p.tags.includes("WebGL");
        return p.category === activeCategory;
      });

  return (
    <section id="projects-showcase" className="w-full max-w-6xl mx-auto px-4 py-16">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFE66D] border-2 border-black rounded-full text-xs font-bold shadow-brutal-sm mb-3">
            <Sparkles size={14} />
            <span>Interactive HTML Projects</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#121212] font-display tracking-tight">
            Integrated Project Labs
          </h2>
          <p className="text-sm md:text-base text-black/70 max-w-xl mt-1">
            {PROJECTS.length} standalone, high-performance web applications embedded directly into your workspace. Launch them live, test them in responsive device frames, or open in full resolution.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                playPop(480);
              }}
              className={`neo-pressable px-3 py-1.5 rounded-xl border-2 border-black text-xs font-bold transition-all ${
                activeCategory === cat
                  ? "bg-[#FF5E5B] text-white shadow-brutal-sm"
                  : "bg-white text-black shadow-none hover:bg-[#FAF7EE]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="group bg-white border-[3.5px] border-[#121212] rounded-[28px] shadow-brutal-lg hover:shadow-brutal-xl transition-all duration-300 flex flex-col overflow-hidden"
          >
            {/* Top Bar with Accent Color and Window Controls */}
            <div 
              className="px-5 py-3 border-b-[3px] border-black flex items-center justify-between"
              style={{ backgroundColor: project.themeColor }}
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white border-2 border-black shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-black/30 border-2 border-black" />
                <span className="w-3 h-3 rounded-full bg-black/30 border-2 border-black" />
                <span className="text-xs font-mono font-bold text-black ml-2 uppercase tracking-wide">
                  Lab #0{idx + 1} · {project.category}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/90 border border-black">
                {project.stats.fps}
              </span>
            </div>

            {/* Interactive Preview Viewport with Live Iframe on Hover / Click */}
            <div className="relative h-[220px] sm:h-[260px] bg-[#FAF7EE] border-b-[3px] border-black overflow-hidden flex items-center justify-center">
              {/* Scaled Live Iframe Preview */}
              <iframe
                src={project.path}
                title={project.title}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                className="w-[200%] h-[200%] scale-50 origin-top-left pointer-events-none select-none border-0"
              />

              {/* Overlay with Quick Launch Badge */}
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    playClick(600);
                    onOpenProject(project);
                  }}
                  className="neo-pressable px-4 py-2 bg-[#FFE66D] border-2 border-black rounded-xl text-xs font-bold text-black shadow-brutal flex items-center gap-1.5"
                >
                  <Play size={14} className="fill-black" />
                  <span>Launch Live Workspace</span>
                </button>
                <a
                  href={project.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick(700)}
                  className="neo-pressable p-2 bg-white border-2 border-black rounded-xl text-black shadow-brutal hover:bg-[#4ECCA3]"
                  title="Fullscreen in new tab"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Card Info Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="text-xl font-extrabold text-[#121212] font-display">
                    {project.title}
                  </h3>
                  <span className="px-2 py-0.5 bg-[#FFFDF5] border-2 border-black rounded-lg text-[10px] font-mono font-bold shrink-0">
                    {project.stats.tech.split("/")[0]}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-black/75 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags Row */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 bg-[#FAF7EE] border border-black/30 rounded-md text-[11px] font-semibold text-black"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center gap-3 pt-3 border-t-2 border-black/10">
                <button
                  type="button"
                  onClick={() => {
                    playClick(580);
                    onOpenProject(project);
                  }}
                  className="neo-pressable flex-1 py-2.5 px-4 bg-[#4ECCA3] border-2 border-black rounded-xl text-xs font-bold text-black shadow-brutal-sm flex items-center justify-center gap-2"
                >
                  <Play size={14} className="fill-black" />
                  <span>Interactive Live Modal</span>
                </button>
                <a
                  href={project.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick(640)}
                  className="neo-pressable py-2.5 px-4 bg-white border-2 border-black rounded-xl text-xs font-bold text-black shadow-brutal-sm flex items-center gap-1.5 hover:bg-[#FFE66D]"
                >
                  <ExternalLink size={14} />
                  <span>Open Full</span>
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Add 5th Project Callout Card */}
        <div
          onClick={() => {
            playPop(600);
            onAddNewProject();
          }}
          className="group cursor-pointer bg-[#FFFDF5] border-[3.5px] border-dashed border-[#121212] rounded-[28px] p-8 shadow-brutal hover:shadow-brutal-lg transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[380px]"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#FFE66D] border-2 border-black flex items-center justify-center shadow-brutal-sm mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform">
            <Plus size={32} strokeWidth={3} className="text-black" />
          </div>
          <h3 className="text-xl font-extrabold text-[#121212] font-display mb-1">
            + Add Project #7 & Beyond
          </h3>
          <p className="text-xs sm:text-sm text-black/70 max-w-sm mb-5">
            Want to add your next single-file HTML or WebGL experiment? Simply drop it in the folder and register it in 1 config line!
          </p>
          <span className="neo-pressable inline-flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-black rounded-xl text-xs font-bold shadow-brutal-sm">
            <Code size={14} />
            <span>View 10-Second Setup Guide</span>
          </span>
        </div>
      </div>
    </section>
  );
}
