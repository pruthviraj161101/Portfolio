/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Centerpiece from './components/Centerpiece';
import NameTypography from './components/NameTypography';
import AboutPanel from './components/AboutPanel';
import WorkPanel from './components/WorkPanel';
import SettingsPanel from './components/SettingsPanel';
import ContactForm from './components/ContactForm';
import { initialProfile, themeStyles } from './data';
import { ProfileData, LightingTheme, TabType } from './types';

// Let's resolve the exact generated image path
const AVATAR_IMAGE_PATH = 'https://ibb.co/j9Ghmhny';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [lightingTheme, setLightingTheme] = useState<LightingTheme>('sepia');
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [ambientSound, setAmbientSound] = useState(false);

  const themeInfo = themeStyles[lightingTheme];

  return (
    <div 
      id="app-root-canvas"
      className={`min-h-screen relative w-full flex flex-col justify-between overflow-hidden transition-colors duration-1000 ${themeInfo.background}`}
    >
      {/* Cinematic Side Lighting & Vignette Shadows */}
      <div id="vignette-shadow" className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${themeInfo.vignette}`} />
      
      {/* Ambient glowing radial spotlight */}
      <div 
        id="radial-spotlight"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] rounded-full opacity-60 mix-blend-color-dodge pointer-events-none transition-all duration-1000 blur-[130px]"
        style={{
          background: `radial-gradient(circle, ${themeInfo.glowColor} 0%, transparent 60%)`
        }}
      />

      {/* Subtle bottom gradient sweep */}
      <div 
        id="bottom-glow-sweep"
        className={`absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t ${themeInfo.ambientLight} opacity-30 pointer-events-none z-10 transition-all duration-1000`} 
      />

      {/* Elegant Architectural Frame borders for luxury look */}
      <div className="absolute inset-4 border border-cozybrown-900/45 pointer-events-none z-30 rounded-[36px]" />
      <div className="absolute inset-x-8 top-8 bottom-8 border border-dashed border-cozybrown-900/15 pointer-events-none z-30 rounded-[28px] hidden md:block" />

      {/* Top Navigation Bar */}
      <Navbar
        profile={profile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onContactClick={() => setIsContactOpen(true)}
        onSettingsClick={() => setIsSettingsOpen(true)}
      />

      {/* Main Screen Layout Container */}
      <main 
        id="primary-hero-content"
        className="relative flex-grow flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 lg:px-20 z-20 max-w-7xl mx-auto w-full select-none"
      >
        {/* Upper Half: Centerpiece Display */}
        <div id="hero-centerpiece-container" className="flex-grow flex items-center justify-center my-6 md:my-8">
          <Centerpiece
            imagePath={AVATAR_IMAGE_PATH}
            ambientSound={ambientSound}
            setAmbientSound={setAmbientSound}
          />
        </div>

        {/* Lower Half: Massive Bold Name & Subtext Details */}
        <div id="hero-lower-typography" className="w-full mt-auto">
          <NameTypography profile={profile} />
        </div>
      </main>

      {/* Vertical Muted Tech Stack Sidebar (Right Side) Removed */}



      {/* Sliding and Overlay Interactive Panels */}
      <AnimatePresence mode="wait">
        {activeTab === 'about' && (
          <AboutPanel
            key="about-sheet"
            isOpen={true}
            profile={profile}
            onClose={() => setActiveTab('hero')}
          />
        )}
        
        {activeTab === 'work' && (
          <WorkPanel
            key="work-sheet"
            isOpen={true}
            onClose={() => setActiveTab('hero')}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsPanel
            key="settings-drawer"
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            profile={profile}
            setProfile={setProfile}
            lightingTheme={lightingTheme}
            setLightingTheme={setLightingTheme}
            ambientSound={ambientSound}
            setAmbientSound={setAmbientSound}
          />
        )}

        {isContactOpen && (
          <ContactForm
            key="contact-modal"
            isOpen={isContactOpen}
            profile={profile}
            onClose={() => setIsContactOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

