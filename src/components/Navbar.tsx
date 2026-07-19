import { motion } from 'motion/react';
import { Mail, Linkedin, Twitter, Settings } from 'lucide-react';
import { ProfileData, TabType } from '../types';

interface NavbarProps {
  profile: ProfileData;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onContactClick: () => void;
  onSettingsClick: () => void;
}

export default function Navbar({
  profile,
  activeTab,
  setActiveTab,
  onContactClick,
  onSettingsClick,
}: NavbarProps) {
  return (
    <header 
      id="portfolio-navbar"
      className="absolute top-0 left-0 w-full z-40 px-6 py-6 md:px-12 md:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 select-none"
    >
      {/* Name / Logo on the Left */}
      <motion.div 
        id="navbar-logo"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => setActiveTab('hero')}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-peach-accent group-hover:scale-125 transition-transform duration-300" />
        <span className="text-sm font-medium tracking-widest text-cream uppercase transition-colors group-hover:text-peach-accent">
          {profile.firstName.toLowerCase()} · {profile.lastName.toLowerCase()}
        </span>
      </motion.div>

      {/* Pill-shaped Nav Menu (Center) */}
      <motion.nav 
        id="navbar-menu"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="bg-cozybrown-950/80 backdrop-blur-md border border-cozybrown-900 px-1.5 py-1.5 rounded-full flex items-center gap-1 shadow-2xl shadow-black/40"
      >
        <button
          id="nav-tab-hero"
          onClick={() => setActiveTab('hero')}
          className={`relative px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
            activeTab === 'hero' ? 'text-warmblack font-bold' : 'text-cozybrown-300 hover:text-cream'
          }`}
        >
          {activeTab === 'hero' && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-peach-accent rounded-full z-0"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">Hero</span>
        </button>

        <button
          id="nav-tab-about"
          onClick={() => setActiveTab(activeTab === 'about' ? 'hero' : 'about')}
          className={`relative px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
            activeTab === 'about' ? 'text-warmblack font-bold' : 'text-cozybrown-300 hover:text-cream'
          }`}
        >
          {activeTab === 'about' && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-peach-accent rounded-full z-0"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">About</span>
        </button>

        <button
          id="nav-tab-work"
          onClick={() => setActiveTab(activeTab === 'work' ? 'hero' : 'work')}
          className={`relative px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
            activeTab === 'work' ? 'text-warmblack font-bold' : 'text-cozybrown-300 hover:text-cream'
          }`}
        >
          {activeTab === 'work' && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-peach-accent rounded-full z-0"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">Work</span>
        </button>
      </motion.nav>

      {/* Social / Action Icons on the Right */}
      <motion.div 
        id="navbar-socials"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-4 text-cozybrown-300 text-xs font-medium tracking-wider uppercase"
      >
        <div className="hidden md:flex items-center gap-4 mr-2 border-r border-cozybrown-900 pr-6">
          <a
            id="social-linkedin"
            href="https://www.linkedin.com/in/pruthviraj-bhosale-7498232a1?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-peach-accent transition-colors flex items-center gap-1.5 hover:scale-105"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[10px] tracking-widest font-mono">LINKEDIN</span>
          </a>
          <a
            id="social-twitter"
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-peach-accent transition-colors flex items-center gap-1.5 hover:scale-105"
          >
            <Twitter className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[10px] tracking-widest font-mono">X / TWITTER</span>
          </a>
        </div>

        {/* Contact/Email Action Button */}
        <a
          id="btn-navbar-contact"
          href="mailto:pruthvi0077bhosale@gmail.com"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cozybrown-800 bg-cozybrown-950/40 hover:bg-peach-accent hover:text-warmblack hover:border-peach-accent text-cream transition-all duration-300 cursor-pointer"
        >
          <Mail className="w-3.5 h-3.5" />
          <span className="text-[10px] tracking-widest font-mono font-medium">EMAIL ME</span>
        </a>

        {/* Config / Customizer Toggle Button */}
        <button
          id="btn-navbar-config"
          onClick={onSettingsClick}
          className="p-1.5 rounded-full border border-cozybrown-800 bg-cozybrown-950/40 hover:bg-cozybrown-900 text-peach-accent hover:text-cream transition-all duration-300"
          title="Studio Setup"
        >
          <Settings className="w-4 h-4 animate-spin-slow hover:rotate-90 transition-transform duration-500" />
        </button>
      </motion.div>
    </header>
  );
}
