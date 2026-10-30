export interface ProjectItem {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: string;
  description: string;
  path: string;
  tags: string[];
  themeColor: string; // for card accent
  badgeColor: string;
  icon: string;
  featured: boolean;
  stats: {
    widgets?: number;
    fps?: string;
    tech: string;
  };
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "ox-ui",
    title: "Nothing OS Dot-Matrix Bento UI",
    shortTitle: "Nothing OS UI",
    tagline: "Tactile glyph launcher, 11 living widgets & interactive synthesizer",
    category: "Interface System",
    description: "A dot-matrix aesthetic board inspired by Nothing OS with responsive digital clocks, compass, tactile music player, sleep monitor, and a 3x3 morphing glyph hamburger launcher.",
    path: "/elements/ox_ui.html",
    tags: ["Dot-Matrix", "Bento UI", "Web Audio", "Tactile"],
    themeColor: "#FF5E5B",
    badgeColor: "#FFE66D",
    icon: "sparkles",
    featured: true,
    stats: {
      widgets: 11,
      fps: "60 FPS",
      tech: "HTML5 / Tailwind / Canvas",
    },
  },
  {
    id: "glass-widgets",
    title: "3D Glass Bento UI Dashboard",
    shortTitle: "3D Glass Bento",
    tagline: "WebGL 3D depth, specular glass cards & spatial physics",
    category: "3D Spatial Dashboard",
    description: "High-fidelity 3D interactive bento dashboard powered by Three.js with real-time dynamic light, reflections, tilt perspective, and glassmorphic card telemetry.",
    path: "/elements/Glass_widgets.html",
    tags: ["Three.js", "Glassmorphism", "WebGL", "Spatial"],
    themeColor: "#38BDF8",
    badgeColor: "#A084E8",
    icon: "layers",
    featured: true,
    stats: {
      widgets: 8,
      fps: "60 FPS",
      tech: "Three.js / WebGL / CSS3D",
    },
  },
  {
    id: "keycap-studio",
    title: "Keycap Studio Mechanical Lab",
    shortTitle: "Keycap Studio",
    tagline: "Artisan keycap workshop, tactile sound & custom legend generator",
    category: "Hardware Design Lab",
    description: "An interactive tactile mechanical keycap design studio featuring profile sculpting, auditory click switches, dynamic legend styling, and reactive theme palettes.",
    path: "/elements/Keycap Studio.html",
    tags: ["Keycaps", "Tactile Audio", "Bricolage Grotesque", "Tool"],
    themeColor: "#A084E8",
    badgeColor: "#FFBE98",
    icon: "keyboard",
    featured: true,
    stats: {
      widgets: 6,
      fps: "Smooth",
      tech: "Bricolage / Web Audio / CSS",
    },
  },
  {
    id: "retro-desktop",
    title: "Super GameBoy 3D Retro Desktop",
    shortTitle: "Super GameBoy 3D",
    tagline: "Playable 90s console workspace, CRT glow & animated custom hand cursor",
    category: "Retro 3D Game Station",
    description: "Full Three.js 3D vintage desktop simulation with OrbitControls, custom procedural hand pointer, retro scanlines, and authentic cartridge gaming nostalgia.",
    path: "/elements/retro_desktop.html",
    tags: ["Three.js", "OrbitControls", "Retro Gaming", "GSAP"],
    themeColor: "#FFE66D",
    badgeColor: "#4ECCA3",
    icon: "gamepad",
    featured: true,
    stats: {
      widgets: 5,
      fps: "60 FPS",
      tech: "Three.js / GSAP / Canvas",
    },
  },
  {
    id: "interactive-spidy",
    title: "Interactive 3D Spider-Luffy Live Portrait",
    shortTitle: "Spider-Luffy 3D",
    tagline: "Haki lightning, Three.js aura particles, tactile web cells & Spider-Sense",
    category: "Interactive 3D Portrait",
    description: "A dynamic hybrid 3D anime portrait powered by Three.js WebGL particles, interactive Haki lightning canvas, 24 tactile spider-suit cells, and reactive eye tracking.",
    path: "/elements/interactive_spidy.html",
    tags: ["Three.js", "WebGL", "Canvas FX", "Spider-Sense", "Haki"],
    themeColor: "#FF5E5B",
    badgeColor: "#FFE66D",
    icon: "zap",
    featured: true,
    stats: {
      widgets: 24,
      fps: "60 FPS",
      tech: "Three.js / Canvas 2D / Audio",
    },
  },
  {
    id: "hello-cat",
    title: "Interactive Grin Cat Live Canvas",
    shortTitle: "Grin Cat 2D/3D",
    tagline: "Jaw bite physics, 7 tactile tooth keys, claw slashes & sonic rings",
    category: "Interactive Creature Lab",
    description: "A playful tactile creature canvas with Three.js ambient particles, interactive 2D claw slashes, responsive 7-tooth synth keyboard, and laughing jaw chatter physics.",
    path: "/elements/hello_cat.html",
    tags: ["Three.js", "Canvas FX", "Creature", "Synthesizer", "Bite Physics"],
    themeColor: "#FFE66D",
    badgeColor: "#FF9F43",
    icon: "smile",
    featured: true,
    stats: {
      widgets: 7,
      fps: "60 FPS",
      tech: "Three.js / Canvas 2D / Audio",
    },
  },
];
