import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-600 via-indigo-400 via-cyan-400 to-purple-500 origin-left z-50 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
      style={{ scaleX }}
    />
  );
}
