import { motion } from 'motion/react';
import { ArrowDownRight, Sparkles } from 'lucide-react';
import { ProfileData } from '../types';

interface NameTypographyProps {
  profile: ProfileData;
}

export default function NameTypography({ profile }: NameTypographyProps) {
  return (
    <div 
      id="oversized-name-section"
      className="w-full flex flex-col gap-6 select-none z-10"
    >
      {/* Full-Row Title with both First & Last Name */}
      <div className="overflow-hidden w-full text-center flex justify-center">
        <motion.h1
          id="text-firstname"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] font-display font-extrabold tracking-[-0.05em] leading-[0.85] text-peach-light select-none uppercase w-full whitespace-nowrap text-center"
        >
          {profile.firstName} {profile.lastName}
        </motion.h1>
      </div>

      {/* Subtext info row split into grid columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-cozybrown-800/60 pt-4">
        {/* Left Subtext */}
        <motion.div
          id="firstname-subtext"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-start justify-between"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] tracking-widest font-mono text-cozybrown-400 uppercase leading-none">Creative Role</span>
            <span className="text-sm font-medium text-cream">{profile.role}</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] tracking-widest font-mono text-cozybrown-400 uppercase leading-none">Fiscal Year</span>
            <span className="text-sm font-mono text-peach-accent font-semibold">{profile.year} // ACTIVE</span>
          </div>
        </motion.div>

        {/* Right Subtext */}
        <motion.div
          id="lastname-subtext"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex items-start justify-between md:flex-row-reverse"
        >
          <div className="flex flex-col md:items-end gap-1">
            <span className="text-[10px] tracking-widest font-mono text-cozybrown-400 uppercase leading-none">Proficiency In</span>
            <span className="text-sm font-medium text-cream flex items-center gap-1.5 justify-end">
              <Sparkles className="w-3.5 h-3.5 text-peach-accent animate-pulse" />
              {profile.tagline}
            </span>
          </div>
          <div className="flex flex-col md:items-start gap-1">
            <span className="text-[10px] tracking-widest font-mono text-cozybrown-400 uppercase leading-none">Availability</span>
            <span className="text-sm text-peach-accent font-semibold flex items-center gap-1">
              {profile.studio} <ArrowDownRight className="w-3.5 h-3.5 animate-bounce-slow" />
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
