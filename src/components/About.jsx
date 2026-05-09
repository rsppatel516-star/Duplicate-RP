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
    <section id="about" className="py-32 relative overflow-hidden ">

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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tighter-tight animated-gradient-text">
              Crafting Digital <span className="text-gradient">Gold</span> from Lines of Code
            </h2>
          </div>
          <ScrollLink to="projects" smooth duration={800} className="hidden md:block">
            <MagneticButton className="px-8 py-4 border border-dark-border rounded-2xl hover:bg-dark-primary/10 transition-colors cursor-pointer font-bricolage ">
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
          <BentoCard className="col-span-2 md:col-span-4 lg:col-span-3 lg:row-span-2 relative overflow-hidden group h-auto md:h-full ">
            <div className="relative z-10">
              <h3 className="text-2xl font-display font-bold mb-4 text-dark-primary">Bio / Process</h3>
              <p className="text-dark-textMuted leading-relaxed mb-6 font-bricolage text-sm md:text-base">
                I'm Rudra Patel, a passionate Full Stack Programmer based in India, currently pursuing a Bachelor's degree in Computer Science Engineering at Parul University. I specialize in creating unique, modern, and responsive websites with exceptional user experiences. My expertise spans from frontend design to backend development, and  I love building scalable solutions that make a real impact.
                My philosophy is simple: <span className="text-dark-textMain font-medium">Design for the future, build for the performance.</span>
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/Rudraptl16" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 backdrop-blur-md rounded-full hover:text-dark-primary transition-colors border border-white/5">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/rudra-patel-265258313/" className="p-3 bg-white/5 backdrop-blur-md rounded-full hover:text-dark-secondary transition-colors border border-white/5">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            {/* Subtle background interaction */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-dark-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </BentoCard>

          {/* Availability Card */}
          <BentoCard className="col-span-2 md:col-span-2 lg:col-span-2 md:row-span-1 border-emerald-500/20 bg-emerald-500/5 group h-auto md:h-full">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping absolute" />
                <div className="w-3 h-3 bg-emerald-500 rounded-full relative" />
              </div>
              <span className="text-emerald-400 font-bold tracking-wider uppercase text-[10px] md:text-xs font-bricolage">Available for Hires</span>
            </div>
            <h4 className="text-xl font-display font-bold mt-2 text-dark-primary">Open for Collaboration</h4>
            <p className="text-sm text-dark-textMuted mt-1 font-bricolage">Accepting freelance / full-time remote roles.</p>
          </BentoCard>

          {/* Download Resume Card */}
          <BentoCard className="col-span-1 md:col-span-2 lg:col-span-1 md:row-span-1 hover:border-dark-secondary/40 transition-colors group relative overflow-hidden h-auto md:h-full">
            <a href="/Rudra Patel.pdf" download className="flex flex-col h-full justify-between group cursor-pointer relative z-10">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-xl  group-hover:bg-dark-secondary/20 transition-colors">
                  <Download className="text-dark-secondary group-hover:scale-110 transition-transform" size={20} />
                </div>
              </div>
              <div>
                <span className="block font-display font-bold text-lg mt-3 leading-tight text-dark-primary">Resume</span>
                <span className="text-[10px] text-dark-textMuted uppercase tracking-widest block mb-3 font-semibold">Technical CV</span>
                <div className="flex items-center gap-2 py-2 px-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-dark-secondary/50 group-hover:bg-dark-secondary/10 transition-all">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 group-hover:text-dark-secondary font-bricolage">Get Resume</span>
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-dark-secondary animate-pulse" />
                </div>
              </div>
            </a>
            {/* Background design element */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-dark-secondary/10 to-transparent opacity-50 pointer-events-none" />
          </BentoCard>

          {stats.map((stat, i) => (
            <BentoCard key={stat.label} className="col-span-1 lg:col-span-1 text-center items-center justify-center p-4 animated-gradient-text h-auto min-h-[120px] md:h-full">
              <span className="text-2xl md:text-3xl font-extrabold text-gradient font-bricolage ">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={0.6 + (i * 0.1)} />
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-dark-textMuted mt-1 font-bricolage">{stat.label}</span>
            </BentoCard>
          ))}

          {/* Location / Clock Card */}
          <BentoCard className="col-span-2 md:col-span-2 lg:col-span-2 md:row-span-1 font-bricolage h-auto md:h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-dark-primary/10 rounded-xl border border-dark-primary/20">
                <MapPin size={24} className="text-dark-primary" />
              </div>
              <Clock size={20} className="text-dark-textMuted opacity-20" />
            </div>
            <div className="space-y-1">
              <p className="text-dark-textMuted text-[10px] md:text-xs uppercase tracking-widest mb-1 font-bold">Location</p>
              <div className="flex items-baseline gap-2">
                <p className="font-bold text-sm md:text-base text-white">Gujarat, India</p>
                <p className="text-[10px] text-dark-textMuted whitespace-nowrap">5:30+ UTC (IST)</p>
              </div>
            </div>
          </BentoCard>

          {/* Passion / Tech Tile */}
          <BentoCard className="col-span-2 md:col-span-4 lg:col-span-3 md:row-span-1 relative overflow-hidden h-auto md:h-full group">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center h-full gap-6 relative z-10">
              <div className="max-w-full sm:max-w-[70%]">
                <h4 className="text-lg font-bold mb-2 text-dark-primary group-hover:text-white transition-colors duration-500">Tech Philosophy</h4>
                <p className="text-xs md:text-sm text-dark-textMuted font-bricolage leading-relaxed">Building with React, Node.js, and a relentless pursuit of pixel perfection.</p>
              </div>

              <div className="p-4 bg-dark-surface/80 backdrop-blur-lg rounded-2xl border border-dark-border font-code text-[10px] md:text-xs text-dark-secondary shrink-0 group-hover:border-dark-secondary/50 transition-all duration-500 hover:scale-105">
                {"<developer />"}
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
