"use client";

import React, { useState } from "react";
import { X, Check, Copy, Sparkles, FolderPlus, FileCode, CheckCircle2 } from "lucide-react";
import { playClick, playPop } from "@/utils/audio";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  if (!isOpen) return null;

  const exampleSnippet = `{
  id: "my-new-project",
  title: "My Creative Web App",
  shortTitle: "Creative App",
  tagline: "High speed interactive canvas experience",
  category: "Creative Lab",
  description: "Detailed description of what this project does.",
  path: "/projects/my_cool_app.html",
  tags: ["WebGL", "Canvas", "Interactive"],
  themeColor: "#FF5E5B",
  badgeColor: "#FFE66D",
  icon: "sparkles",
  featured: true,
  stats: {
    widgets: 4,
    fps: "60 FPS",
    tech: "HTML5 / Canvas / Tailwind",
  },
},`;

  const handleCopy = () => {
    navigator.clipboard.writeText(exampleSnippet);
    setCopiedSnippet(true);
    playPop(620);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#FFFDF5] border-[3.5px] border-[#121212] rounded-[30px] shadow-[10px_10px_0px_#121212] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#FFE66D] border-b-[3.5px] border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-white border-2 border-black flex items-center justify-center font-bold shadow-brutal-sm">
              <FolderPlus size={18} />
            </span>
            <h3 className="font-display font-extrabold text-base md:text-lg text-black">
              How to Add Project #7 & Beyond
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              playClick(400);
              onClose();
            }}
            className="p-1.5 bg-white border-2 border-black rounded-xl text-black shadow-brutal-sm hover:bg-[#FF5E5B] hover:text-white transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[75vh] flex flex-col gap-6 text-sm text-black">
          
          {/* Step 1 */}
          <div className="flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-[#4ECCA3] border-2 border-black flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-brutal-sm">
              1
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-black mb-1">
                Save your HTML file in the elements directory
              </h4>
              <p className="text-black/75 text-xs">
                Place your new HTML file (e.g. <code className="bg-white px-1.5 py-0.5 rounded border border-black/30 font-mono text-black font-bold">my_cool_app.html</code>) into:
              </p>
              <div className="mt-2 p-2.5 bg-white border-2 border-black rounded-xl font-mono text-xs font-semibold text-[#121212] shadow-sm">
                📁 public/elements/my_cool_app.html
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-[#38BDF8] border-2 border-black flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-brutal-sm">
              2
            </div>
            <div className="w-full">
              <h4 className="font-display font-bold text-sm text-black mb-1">
                Add 1 entry into <code className="font-mono text-xs font-bold">src/data/projects.ts</code>
              </h4>
              <p className="text-black/75 text-xs mb-2">
                Append your project configuration object to the <code className="font-mono font-semibold">PROJECTS</code> array:
              </p>

              <div className="relative bg-[#18181B] border-2 border-black rounded-2xl p-3 text-xs font-mono text-green-400 shadow-brutal-sm">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="absolute top-2.5 right-2.5 neo-pressable px-2.5 py-1 bg-white text-black font-sans font-bold text-[11px] rounded-lg border border-black flex items-center gap-1"
                >
                  {copiedSnippet ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedSnippet ? "Copied!" : "Copy Snippet"}</span>
                </button>
                <pre className="overflow-x-auto pr-24 leading-relaxed">
                  {exampleSnippet}
                </pre>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-[#A084E8] text-white border-2 border-black flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-brutal-sm">
              3
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-black mb-1">
                Instant Automatic Live Reload!
              </h4>
              <p className="text-black/75 text-xs">
                That&apos;s all! Next.js will automatically detect your project, render the live preview card in the vault, list it in the hero showcase, and enable the live device modal.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#FAF7EE] border-t-2 border-black flex justify-end">
          <button
            type="button"
            onClick={() => {
              playClick(500);
              onClose();
            }}
            className="neo-pressable px-5 py-2 bg-[#FFE66D] border-2 border-black rounded-xl text-xs font-bold shadow-brutal-sm"
          >
            Got it, Let&apos;s Build!
          </button>
        </div>

      </div>
    </div>
  );
}
