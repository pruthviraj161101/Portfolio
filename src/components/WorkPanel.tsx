import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Calendar, Layers, Youtube } from 'lucide-react';
import { portfolioWorks } from '../data';
import { WorkItem } from '../types';

interface WorkPanelProps {
  isOpen: boolean;
  onClose: () => void;
  key?: string;
}

export default function WorkPanel({ isOpen, onClose }: WorkPanelProps) {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  if (!isOpen) return null;

  return (
    <motion.div
      id="work-sliding-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-warmblack/95 backdrop-blur-xl z-50 overflow-y-auto px-6 py-24 md:px-16 lg:px-24"
    >
      <div className="max-w-6xl w-full mx-auto relative z-20">
        {/* Close and Inspect controls */}
        <div className="absolute -top-12 right-0 flex items-center gap-3">
          <button
            id="btn-close-work-panel"
            onClick={onClose}
            className="p-3 rounded-full bg-cozybrown-950 border border-cozybrown-800 text-cozybrown-300 hover:text-peach-accent hover:border-peach-accent transition-all duration-300 shadow-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Header */}
        <div id="work-panel-header" className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-peach-accent" />
            <span className="text-[10px] tracking-widest font-mono text-cozybrown-300 uppercase">PORTFOLIO INDEX</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-cream uppercase">
            SELECTED CREATIVE WORKS
          </h2>
        </div>

        {/* Selected Works list */}
        <div id="work-grid-container" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Projects List on the Left */}
          <div id="project-list" className="lg:col-span-7 flex flex-col divide-y divide-cozybrown-900 border-t border-b border-cozybrown-900">
            {portfolioWorks.map((work) => (
              <button
                key={work.id}
                id={`project-row-${work.id}`}
                onClick={() => setSelectedWork(work)}
                className={`w-full py-8 flex items-center justify-between group text-left transition-all duration-300 ${
                  selectedWork?.id === work.id ? 'pl-4 pr-2 bg-cozybrown-950/40 border-l-2 border-peach-accent' : 'hover:pl-4'
                }`}
              >
                <div className="flex items-start gap-6">
                  <span className="text-sm font-mono text-cozybrown-500 group-hover:text-peach-accent transition-colors">
                    [{work.id}]
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight text-cream uppercase group-hover:text-peach-accent transition-colors">
                      {work.title}
                    </h3>
                    <span className="text-xs font-mono text-cozybrown-400 mt-1 block">
                      {work.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline text-xs font-mono text-cozybrown-400">
                    {work.client}
                  </span>
                  <ExternalLink className="w-4 h-4 text-cozybrown-500 group-hover:text-peach-accent transition-colors" />
                </div>
              </button>
            ))}
          </div>

          {/* Project Inspector on the Right */}
          <div id="project-detail-inspector" className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {selectedWork ? (
                <motion.div
                  key={selectedWork.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 md:p-8 rounded-3xl bg-cozybrown-950 border border-cozybrown-900 shadow-2xl relative overflow-hidden"
                >
                  {/* Subtle inner lighting */}
                  <div className="absolute inset-0 bg-gradient-to-br from-peach-glow/10 to-transparent pointer-events-none" />

                  <span className="text-[10px] tracking-widest font-mono text-peach-accent uppercase mb-2 block">
                    PROJECT DATA SHEET
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-display font-extrabold text-cream uppercase tracking-tight mb-6">
                    {selectedWork.title}
                  </h3>

                  <div className="flex flex-col gap-4 border-t border-b border-cozybrown-900 py-6 mb-6">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1.5 text-cozybrown-400 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Year</span>
                      </div>
                      <span className="text-cream font-mono font-medium">{selectedWork.year}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1.5 text-cozybrown-400 font-mono">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Client partner</span>
                      </div>
                      <span className="text-cream font-semibold">{selectedWork.client}</span>
                    </div>

                    <div className="flex justify-between items-start text-xs">
                      <div className="flex items-center gap-1.5 text-cozybrown-400 font-mono">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Discipline</span>
                      </div>
                      <span className="text-cream font-medium text-right max-w-[200px]">{selectedWork.category}</span>
                    </div>
                  </div>

                  <h4 className="text-[10px] font-mono tracking-widest text-cozybrown-400 uppercase mb-2">Architectural Summary</h4>
                  <p className="text-xs text-cozybrown-200 leading-relaxed font-sans mb-6">
                    {selectedWork.description}
                  </p>

                  {selectedWork.additionalLink && (
                    <div className="mb-6">
                      <h4 className="text-[10px] font-mono tracking-widest text-cozybrown-400 uppercase mb-2">Additional Link</h4>
                      <a
                        href={selectedWork.additionalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-lg bg-cozybrown-900/60 border border-cozybrown-800/60 text-cream hover:bg-cozybrown-800/80 hover:text-peach-accent transition-all duration-300 group"
                      >
                        {selectedWork.additionalLink.includes('youtube.com') || selectedWork.additionalLink.includes('youtu.be') ? (
                          <Youtube className="w-3.5 h-3.5 text-red-500 group-hover:scale-110 transition-transform" />
                        ) : (
                          <ExternalLink className="w-3.5 h-3.5 text-peach-accent" />
                        )}
                        <span>Watch Presentation / Video</span>
                      </a>
                    </div>
                  )}


                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
