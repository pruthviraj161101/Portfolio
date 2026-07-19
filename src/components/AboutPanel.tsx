import { motion } from 'motion/react';
import { X, Sparkles, Compass, ShieldCheck, Heart } from 'lucide-react';
import { ProfileData } from '../types';

interface AboutPanelProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  key?: string;
}

export default function AboutPanel({ isOpen, onClose, profile }: AboutPanelProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      id="about-sliding-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-warmblack/95 backdrop-blur-xl z-50 overflow-y-auto px-6 py-24 md:px-16 lg:px-24 flex items-center"
    >
      {/* Absolute Close Area */}
      <div className="max-w-6xl w-full mx-auto relative">
        {/* Floating Close Button */}
        <button
          id="btn-close-about-panel"
          onClick={onClose}
          className="absolute -top-12 right-0 md:right-4 p-3 rounded-full bg-cozybrown-950 border border-cozybrown-800 text-cozybrown-300 hover:text-peach-accent hover:border-peach-accent transition-all duration-300 shadow-xl"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Column 1: Small Intro and Core Stats */}
          <div id="about-panel-left" className="lg:col-span-4 flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-peach-accent" />
              <span className="text-[10px] tracking-widest font-mono text-cozybrown-300 uppercase">THE DIRECTOR</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-cream uppercase leading-tight">
              {profile.firstName.toLowerCase()} <br/>
              {profile.lastName.toLowerCase()}
            </h2>

            <p className="text-sm font-light text-cozybrown-300 leading-relaxed font-sans">
              Currently operating at the intersection of 3D Modeling , Animation and Building interactive.
            </p>

            <div className="border-t border-cozybrown-800/60 pt-6 flex flex-col gap-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-cozybrown-400 font-mono">Location</span>
                <span className="text-cream font-medium">Satara · Mumbai · Remote</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-cozybrown-400 font-mono">Status</span>
                <span className="text-peach-accent font-semibold">Available on Monday to Friday</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-cozybrown-400 font-mono">Years Exp</span>
                <span className="text-cream font-medium">2+ Years Lead</span>
              </div>
            </div>
          </div>

          {/* Column 2: Detailed Bio and Philosophy */}
          <div id="about-panel-right" className="lg:col-span-8 flex flex-col gap-12">
            <div>
              <span className="text-[10px] tracking-widest font-mono text-peach-accent uppercase mb-3 block">BIO STATEMENT</span>
              <p className="text-lg md:text-2xl text-peach-light font-light leading-relaxed font-sans">
                "Breathe life into static digital models through the art of 3D animation. As a 3D Animator, I view myself as a digital puppeteer, blending technical software mastery with the nuance of human behaviour and physics. I specialize in character and creature performance, ensuring every frame has appropriate weight, momentum, and narrative depth."
              </p>
              <p className="text-sm text-cozybrown-300 font-light mt-4 leading-relaxed font-sans">
                With over a 2 Years  of agency and freelance directorship, I build bespoke digital environments for world-renowned brands. I specialize in 3D Modeling, Lighting ,Texturing,Rigging ,Rendering and Video Editing  that convey structural elegance and uncompromised aesthetic discipline.
              </p>
            </div>

            {/* Design Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-cozybrown-950/60 border border-cozybrown-900 flex flex-col gap-3 hover:border-peach-accent/30 transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-peach-glow flex items-center justify-center text-peach-accent">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold tracking-widest font-mono text-cream uppercase">3D modeling</h3>
                <p className="text-[11px] text-cozybrown-300 leading-relaxed font-sans">
                  The precise process of manipulating vertices, edges, and polygons to construct digital assets.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-cozybrown-950/60 border border-cozybrown-900 flex flex-col gap-3 hover:border-peach-accent/30 transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-peach-glow flex items-center justify-center text-peach-accent">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold tracking-widest font-mono text-cream uppercase">Keyframe Animation</h3>
                <p className="text-[11px] text-cozybrown-300 leading-relaxed font-sans">
                  Dictating the precise timing, weight, and spacing that transform static rigs into lifelike performances.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-cozybrown-950/60 border border-cozybrown-900 flex flex-col gap-3 hover:border-peach-accent/30 transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-peach-glow flex items-center justify-center text-peach-accent">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold tracking-widest font-mono text-cream uppercase">Aesthetic Focus</h3>
                <p className="text-[11px] text-cozybrown-300 leading-relaxed font-sans">
                  Avoiding unnecessary choas. Pure disciplinary actions, Smart work and Maximum efforts.
                </p>
              </div>
            </div>

            {/* Selected Clients / Accolades */}
            <div className="border-t border-cozybrown-800/60 pt-8 flex flex-col gap-4">
              <span className="text-[10px] tracking-widest font-mono text-cozybrown-400 uppercase">RECOGNITIONS & RECENT PARTNERS</span>
              <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs font-mono text-cozybrown-300">
                <span>[01] MECHANIM</span>
                <span>[02] FLUENCE MEDIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
