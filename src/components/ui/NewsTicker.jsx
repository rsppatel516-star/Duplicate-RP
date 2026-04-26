import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function NewsTicker({ newsItems = [] }) {
  if (!newsItems.length) return null;

  return (
    <div className="w-full backdrop-blur-xl py-3 overflow-hidden flex items-center relative z-20">
      {/*<div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none" />
      
      <div className="flex-shrink-0 px-6 font-code text-[10px] font-black tracking-[0.2em] uppercase text-dark-primary flex items-center gap-2 border-r border-dark-border mr-6 z-20 bg-dark-bg/50 backdrop-blur-md h-full absolute left-0">
        <Zap size={14} className="animate-pulse" /> Trending
      </div>*/}

      <motion.div
        className="flex gap-16 whitespace-nowrap pl-40"
        animate={{ x: [0, -1500] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
      >
        {[...newsItems, ...newsItems, ...newsItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 text-sm font-light text-dark-textMain">
            <span className="text-dark-secondary font-code text-[10px] uppercase tracking-widest">{item.category}</span>
            <span>{item.title}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-dark-border" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
