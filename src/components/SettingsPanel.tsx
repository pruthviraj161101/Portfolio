import { motion } from 'motion/react';
import { X, Sparkles, Check, Sliders, Volume2, VolumeX } from 'lucide-react';
import { ProfileData, LightingTheme } from '../types';
import { themeStyles } from '../data';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  setProfile: (p: ProfileData) => void;
  lightingTheme: LightingTheme;
  setLightingTheme: (t: LightingTheme) => void;
  ambientSound: boolean;
  setAmbientSound: (on: boolean) => void;
  key?: string;
}

export default function SettingsPanel({
  isOpen,
  onClose,
  profile,
  setProfile,
  lightingTheme,
  setLightingTheme,
  ambientSound,
  setAmbientSound,
}: SettingsPanelProps) {
  if (!isOpen) return null;

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <motion.div
      id="settings-panel-drawer"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 26, stiffness: 220 }}
      className="fixed top-0 right-0 h-full w-full max-w-md bg-cozybrown-950/98 backdrop-blur-xl border-l border-cozybrown-800/80 z-50 shadow-2xl p-6 md:p-8 flex flex-col justify-between"
    >
      <div id="settings-drawer-scrollable" className="overflow-y-auto pr-1 flex-grow">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-cozybrown-900">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-peach-accent" />
            <h3 className="text-sm font-mono tracking-widest text-cream uppercase font-bold">Studio Configurator</h3>
          </div>
          <button
            id="btn-close-settings"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-cozybrown-900 text-cozybrown-300 hover:text-peach-accent transition-colors"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Ambient lighting theme selector */}
        <div id="ambient-lighting-presets" className="mb-8">
          <div className="flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-peach-accent" />
            <span className="text-[10px] tracking-widest font-mono text-cozybrown-400 uppercase">Ambient Lighting Theme</span>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {(['sepia', 'amber', 'espresso'] as LightingTheme[]).map((t) => {
              const info = themeStyles[t];
              const isSelected = lightingTheme === t;
              return (
                <button
                  key={t}
                  id={`btn-theme-preset-${t}`}
                  onClick={() => setLightingTheme(t)}
                  className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all duration-300 ${
                    isSelected
                      ? 'border-peach-accent bg-cozybrown-900 text-cream shadow-md shadow-black/20'
                      : 'border-cozybrown-900 bg-cozybrown-950/40 text-cozybrown-300 hover:border-cozybrown-700'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider">{info.name}</span>
                    <span className="text-[9px] font-mono text-cozybrown-400 mt-1 uppercase">
                      {t === 'sepia' && "Warm brown, vintage sepia tones"}
                      {t === 'amber' && "Intense twilight amber backlight"}
                      {t === 'espresso' && "Muted deep espresso black & brown shadow"}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-peach-accent text-warmblack flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Profile customization controls */}
        <div id="profile-editor-fields" className="flex flex-col gap-5">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] tracking-widest font-mono text-cozybrown-400 uppercase">Edit Template Text</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-cozybrown-400 uppercase">First Name</label>
            <input
              id="input-firstName"
              type="text"
              value={profile.firstName}
              onChange={(e) => handleChange('firstName', e.target.value.toUpperCase())}
              className="bg-cozybrown-900 border border-cozybrown-800 text-cream rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-peach-accent font-mono uppercase"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-cozybrown-400 uppercase">Last Name</label>
            <input
              id="input-lastName"
              type="text"
              value={profile.lastName}
              onChange={(e) => handleChange('lastName', e.target.value.toUpperCase())}
              className="bg-cozybrown-900 border border-cozybrown-800 text-cream rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-peach-accent font-mono uppercase"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-cozybrown-400 uppercase">Professional Role</label>
            <input
              id="input-role"
              type="text"
              value={profile.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="bg-cozybrown-900 border border-cozybrown-800 text-cream rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-peach-accent font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-cozybrown-400 uppercase">Secondary Tagline / Subtext</label>
            <input
              id="input-tagline"
              type="text"
              value={profile.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="bg-cozybrown-900 border border-cozybrown-800 text-cream rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-peach-accent font-sans"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-cozybrown-400 uppercase">Studio Name / Availability</label>
            <input
              id="input-studio"
              type="text"
              value={profile.studio}
              onChange={(e) => handleChange('studio', e.target.value)}
              className="bg-cozybrown-900 border border-cozybrown-800 text-cream rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-peach-accent font-sans"
            />
          </div>
        </div>
      </div>

      {/* Footer / Reset Action */}
      <div id="settings-drawer-footer" className="pt-6 mt-6 border-t border-cozybrown-900">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-cozybrown-400 uppercase leading-none">Studio Sounds</span>
            <span className="text-xs text-cream mt-0.5 font-bold">Ambient Synthesis</span>
          </div>
          <button
            id="btn-settings-audio-toggle"
            onClick={() => setAmbientSound(!ambientSound)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono transition-colors ${
              ambientSound ? 'bg-peach-accent text-warmblack font-bold' : 'bg-cozybrown-900 text-cozybrown-400 hover:text-cream'
            }`}
          >
            {ambientSound ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{ambientSound ? "ON" : "OFF"}</span>
          </button>
        </div>

        <button
          id="btn-reset-to-defaults"
          onClick={() => {
            setProfile({
              firstName: "PRUTHVIRAJ",
              lastName: "BHOSALE",
              role: "Freelance Design Director",
              year: "2026",
              tagline: "Crafting cinematic digital experiences.",
              studio: "Sterling Studio",
              websiteTools: ["Figma", "Webflow", "GSAP", "AE/Lottie", "Lenis Scroll", "React", "Tailwind"]
            });
            setLightingTheme('sepia');
          }}
          className="w-full py-2.5 rounded-xl border border-cozybrown-800 bg-transparent text-[10px] font-mono text-cozybrown-300 hover:text-peach-accent hover:border-peach-accent transition-all duration-300 uppercase tracking-widest"
        >
          Reset To Master Template
        </button>
      </div>
    </motion.div>
  );
}
