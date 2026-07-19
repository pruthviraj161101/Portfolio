import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Terminal, ArrowUpRight } from 'lucide-react';

import { ProfileData } from '../types';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  key?: string;
}

export default function ContactForm({ isOpen, onClose, profile }: ContactFormProps) {
  const [formState, setFormState] = useState({ name: '', email: '', budget: '20k-50k', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    // Simulate high-fidelity secure secure transmit connection
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
    }, 1800);
  };

  const budgetOptions = ['<15k', '15k-30k', '30k-60k', '60k+'];

  return (
    <motion.div
      id="contact-form-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-warmblack/98 backdrop-blur-xl z-50 flex items-center justify-center p-4 md:p-8"
    >
      <div 
        id="contact-form-card"
        className="w-full max-w-2xl bg-cozybrown-950 border border-cozybrown-900 rounded-[32px] overflow-hidden shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          id="btn-close-contact"
          onClick={() => {
            onClose();
            // Reset after closed
            setTimeout(() => setIsSubmitted(false), 300);
          }}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-cozybrown-900 text-cozybrown-300 hover:text-peach-accent transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient Warm Corner Glow */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-peach-glow/10 rounded-full blur-3xl pointer-events-none" />

        <div className="p-6 md:p-10">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="contact-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {/* Form Header */}
                <div id="contact-header" className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-peach-accent animate-pulse" />
                    <span className="text-[10px] tracking-widest font-mono text-cozybrown-300 uppercase">DIRECT DISPATCH</span>
                  </div>
                  <h3 className="text-3xl font-display font-extrabold tracking-tight text-cream uppercase">
                    INITIATE CORRESPONDENCE
                  </h3>
                  <p className="text-xs text-cozybrown-400 mt-1 leading-relaxed">
                    Connecting directly with {profile.firstName.toLowerCase()} {profile.lastName.toLowerCase()} ({profile.studio}). All messages are parsed securely.
                  </p>
                </div>

                <form id="contact-inner-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-cozybrown-400 uppercase">Your Name / Corporation</label>
                      <input
                        id="form-input-name"
                        type="text"
                        required
                        placeholder="e.g. Tristan Moreau"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="bg-cozybrown-900 border border-cozybrown-800 text-cream placeholder-cozybrown-600 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-peach-accent"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-cozybrown-400 uppercase">Email Address</label>
                      <input
                        id="form-input-email"
                        type="email"
                        required
                        placeholder="e.g. tristan@vesper.design"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="bg-cozybrown-900 border border-cozybrown-800 text-cream placeholder-cozybrown-600 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-peach-accent"
                      />
                    </div>
                  </div>

                  {/* Budget Selectors */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono text-cozybrown-400 uppercase">Approximate Project Budget (USD)</label>
                    <div className="grid grid-cols-4 gap-2">
                      {budgetOptions.map((opt) => {
                        const isSelected = formState.budget === opt;
                        return (
                          <button
                            key={opt}
                            id={`btn-budget-opt-${opt.replace('<', 'less-').replace('+', '-plus')}`}
                            type="button"
                            onClick={() => setFormState({ ...formState, budget: opt })}
                            className={`py-2 rounded-xl text-center text-xs font-mono transition-all duration-300 border ${
                              isSelected
                                ? 'bg-peach-accent border-peach-accent text-warmblack font-bold'
                                : 'bg-cozybrown-900/60 border-cozybrown-800 text-cozybrown-300 hover:border-cozybrown-600'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-cozybrown-400 uppercase">Brief Project Directive</label>
                    <textarea
                      id="form-input-message"
                      required
                      rows={4}
                      placeholder="Outline your aesthetic targets, timeline, and spatial computing scopes..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="bg-cozybrown-900 border border-cozybrown-800 text-cream placeholder-cozybrown-600 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-peach-accent resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="btn-submit-contact-form"
                    type="submit"
                    disabled={isSending}
                    className="w-full mt-2 py-3 rounded-xl bg-peach-accent hover:bg-cream hover:scale-[1.01] transition-all duration-300 text-warmblack font-bold text-xs font-mono tracking-widest flex items-center justify-center gap-2 uppercase disabled:opacity-50"
                  >
                    {isSending ? (
                      <>
                        <Terminal className="w-4 h-4 animate-spin-slow" />
                        <span>Transmitting Coordinates...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Transmit Dispatch</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12 flex flex-col items-center justify-center gap-5"
              >
                <div className="w-16 h-16 rounded-full bg-peach-glow border border-peach-accent flex items-center justify-center text-peach-accent animate-bounce-slow">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="flex flex-col gap-2 max-w-md">
                  <h4 className="text-xl font-display font-bold text-cream uppercase tracking-tight">
                    DISPATCH TRANSMITTED SECURELY
                  </h4>
                  <p className="text-xs text-cozybrown-300 leading-relaxed font-sans">
                    Thank you, <span className="text-peach-accent font-semibold">{formState.name}</span>. Your project parameters with a budget bracket of <span className="text-peach-accent font-semibold font-mono">{formState.budget}</span> have been registered.
                  </p>
                  <p className="text-[11px] text-cozybrown-400 font-mono italic mt-4 bg-cozybrown-900/60 p-3 rounded-xl border border-cozybrown-800/60">
                    "Channel locked. Response guaranteed within 24 standard solar hours."
                  </p>
                </div>

                <button
                  id="btn-dismiss-confirmation"
                  onClick={() => {
                    onClose();
                    setTimeout(() => setIsSubmitted(false), 300);
                  }}
                  className="mt-6 px-6 py-2 rounded-full border border-cozybrown-800 text-cozybrown-300 hover:text-peach-accent hover:border-peach-accent text-xs font-mono transition-colors flex items-center gap-1.5"
                >
                  Return to Studio <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
