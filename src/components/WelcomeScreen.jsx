import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal, Cpu, Zap, Code, Globe, LockOpen } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import GridBackground from './ui/GridBackground';

export default function WelcomeScreen({ onEnter }) {
  /* Listen to Keyboard Shortcuts (Space or Enter) */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        onEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEnter]);

  return (
    <motion.div
      key="welcome-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[999] bg-[#03030c] text-white flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none"
    >
      {/* Background Grid & Aurora Light Glows */}
      <GridBackground
        opacity="08"
        mask="radial-gradient(circle at 50% 50%, #000 60%, transparent 100%)"
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header Telemetry */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex items-center justify-between z-10 w-full max-w-6xl mx-auto"
      >
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 font-bold">
            SYSTEM ONLINE // V2.0
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest">
          <Globe size={12} className="animate-spin" style={{ animationDuration: '10s' }} />
          <span>LOCATION: AHMEDABAD, INDIA</span>
        </div>
      </motion.div>

      {/* Center Welcome Card Hero */}
      <div className="relative z-10 my-auto w-full max-w-4xl mx-auto text-center flex flex-col items-center justify-center">

        {/* Animated Brand Emblem Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full blur-xl opacity-40 animate-pulse" />
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-dark-surface/90 border border-white/20 backdrop-blur-2xl flex items-center justify-center p-4 shadow-2xl">
            <img
              src="/images/nav%20logo.webp"
              alt="Rudra Patel Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Subtitle Greetings */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center gap-2 mb-4 text-indigo-400 font-mono text-xs font-black tracking-[0.4em] uppercase"
        >
          <Sparkles size={14} className="animate-bounce text-indigo-400" />
          <span>WELCOME TO THE PORTFOLIO OF</span>
          <Sparkles size={14} className="animate-bounce text-indigo-400" />
        </motion.div>

        {/* Main Name Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight leading-none mb-6 text-white"
        >
          Rudra <span className="hero-gradient-text">Patel</span>
        </motion.h1>

        {/* Role Badges Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10 text-white/70 font-mono text-[11px] md:text-xs uppercase tracking-widest"
        >
          <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 flex items-center gap-2">
            <Code size={13} className="text-indigo-400" /> Full-Stack Developer
          </span>
          <span className="text-white/20">•</span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 flex items-center gap-2">
            <Zap size={13} className="text-emerald-400" /> Mobile Engineer
          </span>
          <span className="text-white/20">•</span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 flex items-center gap-2">
            <Cpu size={13} className="text-purple-400" /> AI Integrator
          </span>
        </motion.div>

        {/* Enter Portfolio Magnetic CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <MagneticButton>
            <button
              onClick={onEnter}
              className="group relative overflow-hidden px-10 py-5 rounded-2xl bg-gradient-to-r from-dark-primary via-indigo-600 to-purple-600 text-white font-display font-black text-sm md:text-base tracking-[0.2em] uppercase flex items-center gap-4 shadow-[0_0_50px_rgba(99,102,241,0.5)] hover:shadow-[0_0_70px_rgba(99,102,241,0.75)] transition-all hover:scale-105"
            >
              <LockOpen size={18} className="text-white/80 group-hover:rotate-12 transition-transform" />
              <span>EXPLORE PORTFOLIO</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />

              {/* Shimmer Sweep Animation */}
              <motion.div
                className="absolute inset-0 bg-white/25 skew-x-[30deg]"
                animate={{ left: ['-150%', '150%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: 'linear' }}
              />
            </button>
          </MagneticButton>
        </motion.div>

        {/* Keyboard Shortcut Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 flex items-center gap-2"
        >
          <span>PRESS</span>
          <kbd className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white font-bold">ENTER ↵</kbd>
          <span>OR</span>
          <kbd className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white font-bold">SPACE</kbd>
          <span>TO CONTINUE</span>
        </motion.div>

      </div>

      {/* Bottom Footer Diagnostics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="flex items-center justify-between z-10 w-full max-w-6xl mx-auto pt-6 border-t border-white/10"
      >
        <div className="flex items-center gap-2 text-white/30 font-mono text-[9px] uppercase tracking-widest">
          <Terminal size={12} className="text-indigo-400" />
          <span>REACT 18 • TAILWIND • FRAMER MOTION</span>
        </div>

        <button
          onClick={onEnter}
          className="text-[9px] font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors underline underline-offset-4"
        >
          SKIP INTRO →
        </button>
      </motion.div>

    </motion.div>
  );
}
