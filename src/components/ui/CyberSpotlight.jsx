import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CyberSpotlight() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const mouseX = useSpring(-100, springConfig);
  const mouseY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only activate cursor tracking on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isClickable = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      );
      setIsPointer(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Ambient Radial Spotlight Mesh */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(99, 102, 241, 0.08), transparent 80%)`,
        }}
      />

      {/* Cybernetic Floating Follower Ring */}
      <motion.div
        className={`pointer-events-none fixed z-50 rounded-full border border-indigo-400/40 backdrop-blur-[1px] transition-all duration-300 ${
          isPointer ? 'w-12 h-12 border-purple-400/80 bg-purple-500/10 scale-125' : 'w-8 h-8'
        }`}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}
