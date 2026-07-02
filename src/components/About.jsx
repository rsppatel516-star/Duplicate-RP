import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Download, Github, MapPin, Clock, X, Terminal, Code2 } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { GitHubCalendar } from 'react-github-calendar';
import MagneticButton from './ui/MagneticButton';
import AnimatedCounter from './ui/AnimatedCounter';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 90
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
};

const BentoCard = ({ children, className = "", onClick = null }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -6,
        scale: 1.005,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`card-dark p-6 flex flex-col justify-between group/card relative ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Spotlighting Border overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.12), transparent 80%)`,
            border: '1px solid rgba(99, 102, 241, 0.35)',
            borderRadius: 'inherit'
          }}
        />
      )}
      <div className="relative z-10 h-full flex flex-col justify-between gap-4">
        {children}
      </div>
    </motion.div>
  );
};

export default function About() {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const stats = [
    { label: 'Years Exp', value: 1, suffix: '+' },
    { label: 'Projects', value: 10, suffix: '+' },
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
              className="flex items-center justify-center md:justify-start gap-3 mb-4 text-[#6366f1] font-code text-sm tracking-widest uppercase"
            >
              <User size={18} />
              <span>Identity Profile</span>
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
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display font-bold text-[#6366f1]">Bio / Process</h3>
                <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 group-hover/card:border-dark-primary/30 group-hover/card:bg-dark-primary/5 transition-colors">
                  <User size={20} className="text-indigo-400" />
                </div>
              </div>

              <div className="space-y-4 flex-grow text-white/70">
                <p className="text-dark-textMuted leading-loose font-bricolage text-sm md:text-base opacity-95">
                  I'm <span className="text-white font-bold">Rudra Patel</span>, a passionate Full Stack Developer based in India. I specialize in creating unique, modern, and responsive applications with exceptional user experiences.
                </p>
                <p className="text-dark-textMuted leading-loose font-bricolage text-sm md:text-base opacity-95">
                  My expertise spans from frontend interface design to backend microservice deployment, engineering scalable solutions that provide high business value.
                </p>
                <div className="pt-4 border-t border-white/5 mt-4">
                  <p className="text-dark-textMain font-medium font-display italic text-lg leading-relaxed text-[#8b5cf6]">
                    "Design for the future, build for performance."
                  </p>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Availability Card */}
          <BentoCard className="col-span-2 md:col-span-2 lg:col-span-2 md:row-span-1 border-emerald-500/10 bg-emerald-500/5 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-500 group h-auto md:h-full">
            <div className="flex flex-col justify-between h-full">
              <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
                <div className="relative flex h-2 w-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping absolute" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full relative" />
                </div>
                <span className="text-emerald-400 font-bold tracking-widest uppercase text-[9px] font-code">Active & Available</span>
              </div>
              <div className="mt-4">
                <h4 className="text-xl font-display font-bold text-dark-primary group-hover:text-emerald-400 transition-colors duration-300">Open for Collaboration</h4>
                <p className="text-sm text-dark-textMuted mt-1 font-bricolage leading-relaxed">Accepting freelance / full-time remote roles.</p>
              </div>
            </div>
          </BentoCard>

          {/* Download Resume Card */}
          <BentoCard
            className="col-span-1 md:col-span-2 lg:col-span-1 md:row-span-1 hover:border-dark-secondary/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] transition-all duration-500 group relative overflow-hidden h-auto md:h-full cursor-pointer"
            onClick={() => setShowResumeModal(true)}
          >
            <div className="flex flex-col h-full justify-between relative z-10">
              <div className="flex justify-between items-start">
                <a
                  href="/Rudra Patel Resume.pdf"
                  download="Rudra Patel Resume.pdf"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowResumeModal(true);
                  }}
                  className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-dark-secondary/20 hover:border-dark-secondary/30 transition-colors z-20"
                  title="Download Resume"
                >
                  <Download className="text-indigo-400 hover:scale-110 hover:translate-y-[1px] transition-all" size={20} />
                </a>
              </div>
              <div>
                <span className="block font-display font-bold text-lg mt-3 leading-tight text-white/90">Resume</span>
                <span className="text-[10px] text-dark-textMuted uppercase tracking-widest block mb-3 font-semibold font-code">Technical CV</span>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowResumeModal(true);
                  }}
                  className="flex items-center gap-2 py-2 px-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-dark-secondary/50 group-hover:bg-dark-secondary/10 transition-all cursor-pointer"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 group-hover:text-white font-code">Get Resume</span>
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                </div>
              </div>
            </div>
          </BentoCard>

          {stats.map((stat, i) => (
            <BentoCard key={stat.label} className="col-span-1 lg:col-span-1 text-center items-center justify-center p-4 h-auto min-h-[120px] md:h-full hover:border-dark-primary/30 hover:shadow-[0_0_20px_rgba(0,212,255,0.08)] transition-all duration-500">
              <div className="flex flex-col items-center justify-center">
                <span className="text-2xl md:text-3xl font-extrabold text-gradient font-bricolage">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={0.4 + (i * 0.1)} />
                </span>
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-dark-textMuted mt-1 font-code">{stat.label}</span>
              </div>
            </BentoCard>
          ))}

          {/* Location / Clock Card */}
          <BentoCard className="col-span-2 md:col-span-2 lg:col-span-2 md:row-span-1 font-bricolage h-auto md:h-full hover:border-dark-primary/30 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] transition-all duration-500">
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-dark-primary/10 rounded-xl border border-dark-primary/20 pulse-ring text-[#6366f1]">
                  <MapPin size={24} />
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 py-1 px-2.5 rounded-full">
                  <Clock size={12} className="text-indigo-400 animate-pulse" />
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
            </div>
          </BentoCard>

          {/* Tech Philosophy */}
          <BentoCard className="col-span-2 md:col-span-4 lg:col-span-4 md:row-span-1 relative overflow-hidden h-auto md:h-full group hover:border-[#8b5cf6]/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center h-full gap-6 relative z-10 w-full">
              <div className="max-w-full sm:max-w-[55%]">
                <h4 className="text-lg font-bold mb-2 text-indigo-400 group-hover:text-white transition-colors duration-500 flex items-center gap-2">
                  <Code2 size={16} /> Tech Philosophy
                </h4>
                <p className="text-xs md:text-sm text-dark-textMuted font-bricolage leading-relaxed">
                  Building with SwiftUI, React, Node.js, and a relentless pursuit of pixel perfection. Creating immersive digital systems.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full sm:w-auto shrink-0">
                <div className="flex flex-wrap gap-1.5 max-w-[320px]">
                  {['SwiftUI', 'React', 'Node.js', 'Firebase', 'MongoDB', 'Tailwind'].map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[10px] font-code font-bold uppercase tracking-wider bg-white/5 border border-white/10 rounded-lg text-dark-textMuted hover:text-[#6366f1] hover:border-[#6366f1]/30 hover:bg-[#6366f1]/5 transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>

          {/* GitHub Contributions Calendar Card */}
          <BentoCard className="col-span-2 md:col-span-4 lg:col-span-6 min-h-[220px] h-auto flex flex-col justify-between relative overflow-hidden group hover:border-[#6366f1]/30 transition-all duration-500">
            <div className="flex flex-col justify-between h-full w-full gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Github size={20} className="text-indigo-400" />
                  <span className="font-display font-bold text-lg text-white">GitHub Contribution Matrix</span>
                </div>
                <span className="text-[10px] font-code font-bold uppercase tracking-widest text-[#6366f1] bg-[#6366f1]/10 border border-[#6366f1]/20 px-3 py-1 rounded-full">
                  @Rudraptl16
                </span>
              </div>
              
              <div className="w-full flex items-center justify-center p-2 overflow-x-auto no-scrollbar">
                <GitHubCalendar
                  username="Rudraptl16"
                  blockSize={12}
                  blockMargin={4}
                  colorScheme="dark"
                  theme={{
                    dark: ['#11111b', '#312e81', '#4338ca', '#6366f1', '#a5b4fc'],
                  }}
                />
              </div>
            </div>
          </BentoCard>

        </motion.div>
      </div>

      {/* Interactive Premium Resume Showcase Lightbox Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResumeModal(false)}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl cursor-zoom-out"
            style={{ perspective: 1500 }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                rotateX: 45,
                z: -300,
                boxShadow: "0 0px 0px rgba(139, 92, 246, 0)"
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: 0,
                z: 0,
                boxShadow: "0 25px 70px rgba(0, 0, 0, 0.8), 0 0 50px rgba(139, 92, 246, 0.15)",
                transition: {
                  type: "spring",
                  damping: 22,
                  stiffness: 85,
                  mass: 1.1
                }
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                rotateX: -45,
                z: -300,
                transition: { duration: 0.35, ease: "easeInOut" }
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#07070c]/90 border border-violet-500/20 rounded-3xl p-3 md:p-6 shadow-2xl flex flex-col items-center justify-center overflow-hidden backdrop-blur-md"
            >
              {/* Dynamic Scrolling Top Glowing Shimmer Border */}
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#8b5cf6] via-[#FF2E93] to-transparent opacity-80" />

              {/* Actions Header bar */}
              <motion.div
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="absolute top-5 right-5 flex items-center gap-3 z-50"
              >
                <a
                  href="/Rudra Patel Resume.pdf"
                  download="Rudra Patel Resume.pdf"
                  className="p-2.5 bg-white/5 hover:bg-dark-secondary/20 border border-white/10 hover:border-dark-secondary/30 rounded-xl text-dark-secondary transition-all cursor-pointer flex items-center justify-center shadow-lg"
                  title="Download Resume PDF"
                >
                  <Download size={18} />
                </a>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="p-2.5 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 rounded-xl text-white hover:text-red-400 transition-all cursor-pointer flex items-center justify-center shadow-lg"
                  title="Close Showcase"
                >
                  <X size={18} />
                </button>
              </motion.div>

              {/* High Definition Resume Image with Scale Entrance */}
              <motion.div
                initial={{ scale: 1.04, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 20 }}
                className="w-full max-h-[80vh] overflow-y-auto rounded-2xl mt-12 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent border border-white/5 bg-[#030306]/60 p-1.5"
              >
                <img
                  src="/Rudra Patel Resume.png"
                  alt="Rudra Patel Resume Showcase"
                  className="w-full h-auto object-contain rounded-xl max-h-[76vh] mx-auto shadow-inner"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
