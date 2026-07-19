import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Radio, Sparkles, Monitor, Layers } from 'lucide-react';

interface CenterpieceProps {
  imagePath: string;
  ambientSound: boolean;
  setAmbientSound: (on: boolean) => void;
}

export default function Centerpiece({ imagePath, ambientSound, setAmbientSound }: CenterpieceProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imgSrc, setImgSrc] = useState(imagePath);
  const [fallbackCount, setFallbackCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setImgSrc(imagePath);
    setFallbackCount(0);
  }, [imagePath]);

  const handleImageError = () => {
    if (fallbackCount === 0) {
      // Try png extension with NdQbsRYK
      setImgSrc('https://i.ibb.co/NdQbsRYK/image.png');
      setFallbackCount(1);
    } else if (fallbackCount === 1) {
      // Try jpeg/jpg extension with NdQbsRYK
      setImgSrc('https://i.ibb.co/NdQbsRYK/image.jpeg');
      setFallbackCount(2);
    } else if (fallbackCount === 2) {
      // Try webp extension with NdQbsRYK
      setImgSrc('https://i.ibb.co/NdQbsRYK/image.webp');
      setFallbackCount(3);
    } else if (fallbackCount === 3) {
      // Try 7-character ID NdQbsRY in case of trailing character typo
      setImgSrc('https://i.ibb.co/NdQbsRY/image.jpg');
      setFallbackCount(4);
    } else if (fallbackCount === 4) {
      // Try png for 7-character ID
      setImgSrc('https://i.ibb.co/NdQbsRY/image.png');
      setFallbackCount(5);
    } else if (fallbackCount === 5) {
      // Try jpeg for 7-character ID
      setImgSrc('https://i.ibb.co/NdQbsRY/image.jpeg');
      setFallbackCount(6);
    } else if (fallbackCount === 6) {
      // Try webp for 7-character ID
      setImgSrc('https://i.ibb.co/NdQbsRY/image.webp');
      setFallbackCount(7);
    } else if (fallbackCount === 7) {
      // Final absolute fallback to original local avatar
      setImgSrc('/src/assets/images/creative_director_avatar_user_1784373635262.jpg');
      setFallbackCount(8);
    }
  };
  
  // Web Audio Synthesizer refs for cozy lo-fi drone and vinyl crackle
  const audioContextRef = useRef<AudioContext | null>(null);
  const droneOsc1Ref = useRef<OscillatorNode | null>(null);
  const droneOsc2Ref = useRef<OscillatorNode | null>(null);
  const noiseNodeRef = useRef<ScriptProcessorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  // Parallax effect on mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setActiveHotspot(null);
  };

  // Synthesize Cozy Lo-fi Ambient Synth & Vinyl Crackle
  useEffect(() => {
    if (ambientSound) {
      try {
        // Create audio context
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.5); // Fade in
        masterGainRef.current = masterGain;

        // Low Pass Filter for a very warm, cozy, muffled feel
        const lpFilter = ctx.createBiquadFilter();
        lpFilter.type = 'lowpass';
        lpFilter.frequency.setValueAtTime(280, ctx.currentTime);
        filterRef.current = lpFilter;

        // Drone Oscillator 1 (Deep base note C2 - ~65.41 Hz)
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(65.41, ctx.currentTime);
        
        const osc1Gain = ctx.createGain();
        osc1Gain.gain.setValueAtTime(0.4, ctx.currentTime);

        // Slow LFO to modulate oscillator volume for organic waving effect
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.15, ctx.currentTime); // very slow 0.15Hz
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.15, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc1Gain.gain);

        // Drone Oscillator 2 (Fifth interval G2 - ~98.00 Hz)
        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(98.00, ctx.currentTime);
        
        const osc2Gain = ctx.createGain();
        osc2Gain.gain.setValueAtTime(0.15, ctx.currentTime);

        // Connect Oscillators
        osc1.connect(osc1Gain);
        osc1Gain.connect(lpFilter);
        
        osc2.connect(osc2Gain);
        osc2Gain.connect(lpFilter);

        // Vinyl Crackle noise generator using ScriptProcessor
        // Creating a custom white noise with organic random popping spikes
        const bufferSize = 4096;
        const noiseNode = ctx.createScriptProcessor(bufferSize, 1, 1);
        noiseNode.onaudioprocess = (e) => {
          const output = e.outputBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            // White noise floor
            let noise = (Math.random() * 2 - 1) * 0.012;
            // Random crackle pops
            if (Math.random() > 0.9985) {
              // Crackle spike
              noise += (Math.random() * 2 - 1) * 0.42;
            }
            output[i] = noise;
          }
        };
        
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(1000, ctx.currentTime);
        noiseFilter.Q.setValueAtTime(1.5, ctx.currentTime);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.12, ctx.currentTime);

        noiseNode.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);

        // Connect LP filter to master
        lpFilter.connect(masterGain);
        masterGain.connect(ctx.destination);

        // Start all sound engines
        osc1.start();
        osc2.start();
        lfo.start();
        
        droneOsc1Ref.current = osc1;
        droneOsc2Ref.current = osc2;
        noiseNodeRef.current = noiseNode;

      } catch (err) {
        console.error("Web Audio API not supported or error initializing synth: ", err);
      }
    } else {
      // Fade out and stop
      if (masterGainRef.current && audioContextRef.current) {
        const ctx = audioContextRef.current;
        masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, ctx.currentTime);
        masterGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
        setTimeout(() => {
          try {
            droneOsc1Ref.current?.stop();
            droneOsc2Ref.current?.stop();
            droneOsc1Ref.current?.disconnect();
            droneOsc2Ref.current?.disconnect();
            noiseNodeRef.current?.disconnect();
            audioContextRef.current?.close();
          } catch(e) {}
          audioContextRef.current = null;
        }, 600);
      }
    }

    return () => {
      if (audioContextRef.current) {
        try {
          droneOsc1Ref.current?.stop();
          droneOsc2Ref.current?.stop();
          audioContextRef.current?.close();
        } catch(e) {}
      }
    };
  }, [ambientSound]);

  const hotspots = [
    {
      id: 'monitor',
      top: '55%',
      left: '42%',
      title: 'Vesper Spatial Screen',
      desc: 'Active Workspace: Designing 3D canvas layouts inside Figma. Project Vesper 2026.',
      icon: <Monitor className="w-3.5 h-3.5" />
    },
    {
      id: 'art',
      top: '28%',
      left: '68%',
      title: 'Framed Abstract Art',
      desc: '"Vessel of Thoughts" — a custom physical painting in acrylic on raw canvas. Inspired by Brutalism.',
      icon: <Layers className="w-3.5 h-3.5" />
    },
    {
      id: 'headphones',
      top: '46%',
      left: '28%',
      title: 'Audio Environment',
      desc: 'Listening to "Cozy Cabin Vinyl" (Synthesized at 65Hz & 98Hz with retro needle crackle).',
      icon: <Radio className="w-3.5 h-3.5" />
    }
  ];

  return (
    <div 
      id="centerpiece-root"
      className="relative flex items-center justify-center w-full max-w-lg aspect-square mx-auto z-20"
    >
      {/* Dynamic ambient backlight with subtle cursor tracking */}
      <div 
        id="ambient-backlight"
        className="absolute w-[115%] h-[115%] rounded-full blur-[90px] bg-gradient-to-tr from-peach-glow via-cozybrown-900/30 to-peach-glow/20 transition-transform duration-1000 ease-out pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 35}px, ${mousePos.y * 35}px) scale(1.05)`,
        }}
      />

      {/* Frame Container */}
      <motion.div
        id="centerpiece-card"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-[85%] h-[85%] rounded-[32px] overflow-hidden border border-cozybrown-800/60 bg-cozybrown-950 shadow-2xl shadow-black/80 group cursor-crosshair"
        style={{
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
      >
        {/* Subtle inner viewport shadow / lighting overlays */}
        <div className="absolute inset-0 z-10 pointer-events-none border border-white/5 rounded-[32px]" />
        <div className="absolute inset-0 vignette-overlay mix-blend-multiply z-10 opacity-70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-cozybrown-950/80 via-transparent to-transparent z-10 pointer-events-none" />

        {/* 3D Character Image with Parallax */}
        <motion.img
          id="centerpiece-avatar"
          src={imgSrc}
          onError={handleImageError}
          alt="Design Director 3D Character Illustration"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none scale-105 pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px) scale(1.08)`,
          }}
        />

        {/* Cinematic light sweep across the portrait */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-peach-glow to-transparent opacity-20 -translate-x-full group-hover:translate-x-full transition-transform duration-2000 ease-in-out pointer-events-none z-10" />

        {/* Interactive Hotspots */}
        {hotspots.map((h) => {
          const isActive = activeHotspot === h.id;
          return (
            <div
              key={h.id}
              id={`hotspot-${h.id}`}
              className="absolute z-20"
              style={{
                top: h.top,
                left: h.left,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Pulsing Hotspot Marker */}
              <button
                id={`btn-hotspot-${h.id}`}
                onMouseEnter={() => setActiveHotspot(h.id)}
                className="relative flex items-center justify-center w-7 h-7 rounded-full bg-warmblack/80 border border-peach-accent/75 hover:bg-peach-accent hover:text-warmblack text-peach-accent shadow-lg shadow-black/50 transition-all duration-300 scale-90 group-hover:scale-100"
              >
                {/* Ping rings */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-peach-accent/30 animate-ping opacity-75" />
                <Sparkles className="w-3 h-3 animate-pulse" />
              </button>

              {/* Tooltip Card (AnimatePresence) */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    id={`tooltip-${h.id}`}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="absolute bottom-9 left-1/2 -translate-x-1/2 w-56 p-3 rounded-xl bg-cozybrown-950/90 backdrop-blur-md border border-peach-accent/25 text-cream shadow-2xl z-30"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-peach-accent">{h.icon}</span>
                      <h4 className="text-[11px] font-bold tracking-widest font-mono uppercase">{h.title}</h4>
                    </div>
                    <p className="text-[10px] text-cozybrown-200 leading-relaxed font-sans">{h.desc}</p>
                    {/* Subtle micro tip indicator */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-cozybrown-950 border-r border-b border-peach-accent/20" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Ambient Synthesizer Equalizer & Audio Toggle Overlay */}
        <div 
          id="audio-indicator-panel"
          className="absolute bottom-4 left-4 z-20 flex items-center gap-3 bg-cozybrown-950/70 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-cozybrown-800/40 select-none"
        >
          <button
            id="btn-toggle-ambient-sound"
            onClick={() => setAmbientSound(!ambientSound)}
            className={`p-1.5 rounded-lg transition-all duration-300 ${
              ambientSound ? 'bg-peach-accent text-warmblack scale-105' : 'bg-cozybrown-900/50 text-cozybrown-400 hover:text-cream'
            }`}
            title={ambientSound ? "Mute Studio Music" : "Play Cozy Studio Ambient Sound"}
          >
            {ambientSound ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          
          <div className="flex flex-col">
            <span className="text-[8px] tracking-widest font-mono text-cozybrown-400 uppercase leading-none">Ambient Sound</span>
            <span className="text-[9px] font-bold text-cream font-mono mt-0.5 leading-none">
              {ambientSound ? "65Hz Drone Active" : "Sound Muted"}
            </span>
          </div>

          {/* Graphical Equalizer Bars */}
          {ambientSound && (
            <div className="flex items-end gap-0.5 h-4 w-6 px-1">
              <motion.div animate={{ height: [4, 14, 6, 12, 4] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} className="w-0.5 bg-peach-accent rounded-full" />
              <motion.div animate={{ height: [8, 4, 16, 8, 8] }} transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }} className="w-0.5 bg-peach-accent rounded-full" />
              <motion.div animate={{ height: [6, 12, 4, 14, 6] }} transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }} className="w-0.5 bg-peach-accent rounded-full" />
              <motion.div animate={{ height: [12, 6, 10, 4, 12] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }} className="w-0.5 bg-peach-accent rounded-full" />
            </div>
          )}
        </div>

        {/* Hover Cue */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Sparkles className="w-2.5 h-2.5 text-peach-accent" />
          <span className="text-[8px] font-bold tracking-widest font-mono text-peach-light">EXPLORE DESK</span>
        </div>
      </motion.div>
    </div>
  );
}
