import { motion } from 'motion/react';

interface TechStackProps {
  tools: string[];
}

export default function TechStack({ tools }: TechStackProps) {
  return (
    <motion.div
      id="tech-stack-vertical-sidebar"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="hidden xl:flex flex-col items-center justify-center gap-6 fixed right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-auto"
    >
      {/* Rotated header label */}
      <div id="vertical-stack-header" className="rotate-90 origin-center whitespace-nowrap mb-12 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-peach-accent" />
        <span className="text-[9px] font-mono tracking-[0.25em] text-cozybrown-400 uppercase">
          Website made using
        </span>
      </div>

      {/* Vertical Tool list */}
      <ul id="vertical-stack-list" className="flex flex-col items-center gap-3">
        {tools.map((tool, idx) => (
          <li
            key={tool}
            id={`tech-tool-${tool.toLowerCase().replace('/', '-')}`}
            className="group flex flex-col items-center relative"
          >
            {/* Tool indicator line */}
            <div className="w-[1px] h-3 bg-cozybrown-800 group-hover:bg-peach-accent transition-colors duration-300" />
            
            {/* Tool label text */}
            <span className="text-[10px] font-mono tracking-wider text-cozybrown-300 hover:text-peach-accent transition-colors duration-300 py-1.5 select-none cursor-help">
              {tool}
            </span>

            {/* Subtle index number on hover */}
            <div className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[8px] font-mono text-cozybrown-500">
              [0{idx + 1}]
            </div>
          </li>
        ))}
        {/* End anchor */}
        <div className="w-1.5 h-1.5 rounded-full border border-cozybrown-700 bg-transparent mt-2" />
      </ul>
    </motion.div>
  );
}
