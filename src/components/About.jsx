// MagicBento Integration Test
import React from 'react';
import { motion } from 'framer-motion';
import { User, Download, Github, Twitter, Linkedin, MapPin, Clock } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import MagneticButton from './ui/MagneticButton';
import AnimatedCounter from './ui/AnimatedCounter';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const BentoCard = ({ children, className = "" }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{
      y: -10,
      scale: 1.01,
      transition: { duration: 0.3, ease: "easeOut" }
    }}
    className={`card-dark p-6 flex flex-col justify-between group/card ${className}`}
  >
    {children}
  </motion.div>
);


export default function About() {
  const stats = [
    { label: 'Years Exp', value: 1, suffix: '+' },
    { label: 'Projects', value: 5, suffix: '+' },
    { label: 'Certificates', value: 6, suffix: '+' },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">

      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-dark-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-dark-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center md:justify-start gap-3 mb-4 text-dark-primary font-code text-sm tracking-widest uppercase"
            >
              <User size={18} />
              <span>The Alchemist</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tight leading-[1.2] md:leading-[1.15] animated-gradient-text">
              Crafting Digital <span className="text-gradient">Gold</span> from Lines of Code
            </h2>
          </div>
          <ScrollLink to="projects" smooth duration={800} className="hidden md:block">
            <MagneticButton className="px-8 py-4 border border-dark-border rounded-2xl hover:bg-dark-primary/10 transition-all duration-300 cursor-pointer font-bricolage">
              Explore My Artifacts
            </MagneticButton>
          </ScrollLink>
        </div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:auto-rows-[180px]"
        >

          {/* Main Bio Card */}
          <BentoCard className="col-span-2 md:col-span-4 lg:col-span-3 lg:row-span-2 relative overflow-hidden group h-auto md:h-full">
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display font-bold text-dark-primary">Bio / Process</h3>
                <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 group-hover/card:border-dark-primary/30 group-hover/card:bg-dark-primary/5 transition-colors">
                  <User size={20} className="text-dark-primary/80" />
                </div>
              </div>

              <div className="space-y-6 flex-grow">
                <p className="text-dark-textMuted leading-loose font-bricolage text-sm md:text-base opacity-95">
                  I'm <span className="text-white font-bold">Rudra Patel</span>, a passionate Full Stack Programmer based in India. I specialize in creating unique, modern, and responsive websites with exceptional user experiences.
                </p>
                <p className="text-dark-textMuted leading-loose font-bricolage text-sm md:text-base opacity-95">
                  My expertise spans from frontend design to backend development, building scalable solutions that make a real impact.
                </p>
                <div className="pt-5 border-t border-white/10">
                  <p className="text-dark-textMain font-medium font-display italic text-lg leading-relaxed">
                    "Design for the future, build for performance."
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Background Logo */}
            <div className="absolute -bottom-16 -right-10 w-64 h-64 opacity-[0.04] pointer-events-none select-none group-hover/card:opacity-[0.08] group-hover/card:scale-110 group-hover/card:rotate-[3deg] transition-all duration-[1200ms]">
              <img 
                src="/images/RP%20-%20LOGO.png" 
                alt="RP Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </BentoCard>

          {/* Availability Card */}
          <BentoCard className="col-span-2 md:col-span-2 lg:col-span-2 md:row-span-1 border-emerald-500/10 bg-emerald-500/5 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-500 group h-auto md:h-full">
            <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
              <div className="relative flex h-2 w-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping absolute" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full relative" />
              </div>
              <span className="text-emerald-400 font-bold tracking-widest uppercase text-[9px] font-code">Active & Available</span>
            </div>
            <h4 className="text-xl font-display font-bold mt-4 text-dark-primary group-hover:text-emerald-400 transition-colors duration-300">Open for Collaboration</h4>
            <p className="text-sm text-dark-textMuted mt-1 font-bricolage leading-relaxed">Accepting freelance / full-time remote roles.</p>
          </BentoCard>

          {/* Download Resume Card */}
          <BentoCard className="col-span-1 md:col-span-2 lg:col-span-1 md:row-span-1 hover:border-dark-secondary/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] transition-all duration-500 group relative overflow-hidden h-auto md:h-full">
            <a href="/Rudra Patel.pdf" download className="flex flex-col h-full justify-between group cursor-pointer relative z-10">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:bg-dark-secondary/20 group-hover:border-dark-secondary/30 transition-colors">
                  <Download className="text-dark-secondary group-hover:scale-110 group-hover:translate-y-[1px] transition-all" size={20} />
                </div>
              </div>
              <div>
                <span className="block font-display font-bold text-lg mt-3 leading-tight text-white/90">Resume</span>
                <span className="text-[10px] text-dark-textMuted uppercase tracking-widest block mb-3 font-semibold font-code">Technical CV</span>
                <div className="flex items-center gap-2 py-2 px-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-dark-secondary/50 group-hover:bg-dark-secondary/10 transition-all">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 group-hover:text-white font-code">Get Resume</span>
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-dark-secondary animate-pulse" />
                </div>
              </div>
            </a>
          </BentoCard>

          {stats.map((stat, i) => (
            <BentoCard key={stat.label} className="col-span-1 lg:col-span-1 text-center items-center justify-center p-4 h-auto min-h-[120px] md:h-full hover:border-dark-primary/30 hover:shadow-[0_0_20px_rgba(0,212,255,0.08)] transition-all duration-500">
              <span className="text-2xl md:text-3xl font-extrabold text-gradient font-bricolage">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={0.6 + (i * 0.1)} />
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-dark-textMuted mt-1 font-code">{stat.label}</span>
            </BentoCard>
          ))}

          {/* Location / Clock Card */}
          <BentoCard className="col-span-2 md:col-span-2 lg:col-span-2 md:row-span-1 font-bricolage h-auto md:h-full hover:border-dark-primary/30 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] transition-all duration-500">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-dark-primary/10 rounded-xl border border-dark-primary/20 pulse-ring text-dark-primary">
                <MapPin size={24} />
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 py-1 px-2.5 rounded-full">
                <Clock size={12} className="text-dark-primary animate-pulse" />
                <span className="text-[9px] font-code font-bold uppercase tracking-wider text-dark-textMuted">Live Clock</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-dark-textMuted text-[10px] md:text-xs uppercase tracking-widest mb-1 font-bold font-code">Location</p>
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-bold text-sm md:text-base text-white">Gujarat, India</p>
                <p className="text-[10px] text-dark-textMuted whitespace-nowrap font-code">UTC+5:30 (IST)</p>
              </div>
            </div>
          </BentoCard>

          {/* Passion / Tech Tile */}
          <BentoCard className="col-span-2 md:col-span-4 lg:col-span-4 md:row-span-1 relative overflow-hidden h-auto md:h-full group hover:border-dark-secondary/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] transition-all duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center h-full gap-6 relative z-10 w-full">
              <div className="max-w-full sm:max-w-[55%]">
                <h4 className="text-lg font-bold mb-2 text-dark-primary group-hover:text-white transition-colors duration-500">Tech Philosophy</h4>
                <p className="text-xs md:text-sm text-dark-textMuted font-bricolage leading-relaxed">
                  Building with React, Node.js, and a relentless pursuit of pixel perfection. Creating immersive digital alchemy.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full sm:w-auto shrink-0">
                <div className="flex flex-wrap gap-1.5 max-w-[320px]">
                  {['React', 'Node.js', 'Vite', 'GSAP', 'Framer Motion', 'Tailwind'].map(tech => (
                    <span 
                      key={tech} 
                      className="px-2.5 py-1 text-[10px] font-code font-bold uppercase tracking-wider bg-white/5 border border-white/10 rounded-lg text-dark-textMuted hover:text-dark-primary hover:border-dark-primary/30 hover:bg-dark-primary/5 transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Animated Background Decor */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-tr from-dark-primary/20 to-dark-secondary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="w-16 h-16 bg-gradient-to-tr from-dark-primary to-dark-secondary rounded-xl rotate-12 blur-sm opacity-10 absolute -right-4 -bottom-4 group-hover:rotate-45 transition-transform duration-1000" />
          </BentoCard>

        </motion.div>
      </div>
    </section>
  );
}
