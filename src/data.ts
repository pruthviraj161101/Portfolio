import { ProfileData, WorkItem, LightingTheme } from './types';

export const initialProfile: ProfileData = {
  firstName: "PRUTHVIRAJ",
  lastName: "BHOSALE",
  role: "3D Animator",
  year: "2023",
  tagline: "Blender, Adobe Premiere Pro And Adobe Photoshop",
  studio: "Freelancer",
  websiteTools: ["Figma", "Webflow", "GSAP", "AE/Lottie", "Lenis Scroll", "React", "Tailwind"]
};

export const portfolioWorks: WorkItem[] = [
  {
    id: "01",
    title: "OIL JACK PUMP",
    category: "3D Modeling & Animation",
    year: "DEC 2025",
    client: "Mechanim",
    description: "Designing fluid immersive 3D environments, custom layouts, and spatial interaction principles for next-generation spatial computing headsets.",
    additionalLink: "https://www.youtube.com/watch?v=N__I9wzzFuc&t=22s"
  },
  {
    id: "02",
    title: "Aura- A261",
    category: "3D Modeling & Animation",
    year: "2025",
    client: "Mechanim",
    description: "A smart lock is an electromechanical device that automatically locks and unlocks doors upon receiving wireless commands or biometric verification from authorized users.",
    additionalLink: "https://www.youtube.com/watch?v=lzru65HQgRc&t=21s"
  },
  {
    id: "03",
    title: "Plate Type Heat Exchanger",
    category: "3D Modeling & Animation",
    year: "2025",
    client: "Mechanim",
    description: "A plate heat exchanger (PHE) is a specialized device that transfers heat between two fluids using a series of thin, corrugated metal plates. It is highly valued across industries for its extreme thermal efficiency and compact footprint.",
    additionalLink: "https://www.youtube.com/watch?v=ospmUzS6WGQ"
  },
  {
    id: "04",
    title: "Hydraulic Jack",
    category: "3D Modeling & Animation",
    year: "2025",
    client: "Mechanim",
    description: "A hydraulic jack is a mechanical device used to lift heavy loads by applying a force through a liquid-filled cylinder.",
    additionalLink: "https://www.youtube.com/watch?v=qTBoCqq-KB4&t=12s"
  },
  {
    id: "05",
    title: "Split Butterfly Valve",
    category: "3D Modeling & Animation",
    year: "2025",
    client: "Mechanim",
    description: "A split butterfly valve (SBV), often referred to as an Alpha-Beta valve or containment valve, is a specialized industrial flow control device designed for the leak-free, high-containment transfer of hazardous, toxic, or sterile powders.",
    additionalLink: "https://www.youtube.com/watch?v=9azKjmIzV2o&t=3s"
  }
];

export const themeStyles: Record<LightingTheme, {
  background: string;
  glowColor: string;
  vignette: string;
  ambientLight: string;
  name: string;
  accent: string;
  border: string;
}> = {
  sepia: {
    background: 'bg-[#12100e]',
    glowColor: 'rgba(242, 203, 171, 0.1)',
    vignette: 'vignette-overlay opacity-90',
    ambientLight: 'from-[#2c2018]/50 to-transparent',
    name: 'Cinematic Sepia',
    accent: 'text-peach-accent bg-cozybrown-900',
    border: 'border-cozybrown-800',
  },
  amber: {
    background: 'bg-[#16120e]',
    glowColor: 'rgba(245, 158, 11, 0.08)',
    vignette: 'vignette-overlay opacity-80',
    ambientLight: 'from-[#3a200d]/60 to-transparent',
    name: 'Twilight Amber',
    accent: 'text-amber-300 bg-[#281c10]',
    border: 'border-amber-950/40',
  },
  espresso: {
    background: 'bg-[#0f0d0c]',
    glowColor: 'rgba(168, 85, 24, 0.08)',
    vignette: 'vignette-overlay opacity-95',
    ambientLight: 'from-[#1e1411]/50 to-transparent',
    name: 'Midnight Espresso',
    accent: 'text-orange-400 bg-[#1f1614]',
    border: 'border-[#2d1f1c]',
  }
};
