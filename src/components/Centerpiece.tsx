import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface CenterpieceProps {
  imagePath: string;
  ambientSound: boolean;
  setAmbientSound: (on: boolean) => void;
}

export default function Centerpiece({ imagePath, ambientSound, setAmbientSound }: CenterpieceProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [imgSrc, setImgSrc] = useState('https://i.ibb.co/j9Ghmhny/image.png');
  const [fallbackCount, setFallbackCount] = useState(0);

  useEffect(() => {
    if (imagePath.includes('j9Ghmhny')) {
      setImgSrc('https://i.ibb.co/j9Ghmhny/image.png');
    } else if (imagePath.includes('NdQbsRYK')) {
      setImgSrc('https://i.ibb.co/NdQbsRYK/image.jpg');
    } else {
      setImgSrc(imagePath);
    }
    setFallbackCount(0);
  }, [imagePath]);

  const handleImageError = () => {
    const isJ9Ghmhny = imagePath.includes('j9Ghmhny');
    if (fallbackCount === 0) {
      setImgSrc(isJ9Ghmhny ? 'https://i.ibb.co/j9Ghmhny/image.jpg' : 'https://i.ibb.co/NdQbsRYK/image.png');
      setFallbackCount(1);
    } else if (fallbackCount === 1) {
      setImgSrc(isJ9Ghmhny ? 'https://i.ibb.co/j9Ghmhny/image.jpeg' : 'https://i.ibb.co/NdQbsRYK/image.jpeg');
      setFallbackCount(2);
    } else if (fallbackCount === 2) {
      setImgSrc(isJ9Ghmhny ? 'https://i.ibb.co/j9Ghmhny/image.webp' : 'https://i.ibb.co/NdQbsRYK/image.webp');
      setFallbackCount(3);
    } else if (fallbackCount === 3) {
      setImgSrc(isJ9Ghmhny ? 'https://i.ibb.co/j9Ghmhn/image.png' : 'https://i.ibb.co/NdQbsRY/image.jpg');
      setFallbackCount(4);
    } else if (fallbackCount === 4) {
      setImgSrc(isJ9Ghmhny ? 'https://i.ibb.co/j9Ghmhn/image.jpg' : 'https://i.ibb.co/NdQbsRY/image.png');
      setFallbackCount(5);
    } else if (fallbackCount === 5) {
      setImgSrc(isJ9Ghmhny ? 'https://i.ibb.co/j9Ghmhn/image.webp' : 'https://i.ibb.co/NdQbsRY/image.webp');
      setFallbackCount(6);
    } else if (fallbackCount === 6) {
      setImgSrc('/src/assets/images/creative_director_avatar_user_1784373635262.jpg');
      setFallbackCount(7);
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
        <div className="absolute inset-0 z-0 pointer-events-none border border-white/5 rounded-[32px]" />
        <div className="absolute inset-0 vignette-overlay mix-blend-multiply z-0 opacity-70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-cozybrown-950/80 via-transparent to-transparent z-0 pointer-events-none" />

        {/* 3D Character Image with Parallax */}
        <motion.img
          id="centerpiece-avatar"
          src={imgSrc}
          onError={handleImageError}
          alt="Design Director 3D Character Illustration"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none scale-105 pointer-events-none transition-transform duration-700 ease-out z-10 blur-0 filter-none"
          style={{
            transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px) scale(1.08)`,
          }}
        />

        {/* Cinematic light sweep across the card */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-peach-glow to-transparent opacity-20 -translate-x-full group-hover:translate-x-full transition-transform duration-2000 ease-in-out pointer-events-none z-10" />
      </motion.div>
    </div>
  );
}
