import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Download, MapPin, Clock, X, Code2, Sparkles, Briefcase, FolderOpen, Award, Terminal, Zap } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import MagneticButton from './ui/MagneticButton';
import AnimatedCounter from './ui/AnimatedCounter';
import { projects } from '../data/projects';

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
      className={`card-dark p-4 sm:p-5 md:p-6 flex flex-col justify-between group/card relative ${className}`}
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
            background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.14), transparent 80%)`,
            border: '1px solid rgba(99, 102, 241, 0.35)',
            borderRadius: 'inherit'
          }}
        />
      )}
      <div className="relative z-10 h-full flex flex-col justify-between gap-3">
        {children}
      </div>
    </motion.div>
  );
};

export default function About() {
  const [showResumeModal, setShowResumeModal] = useState(false);

  React.useEffect(() => {
    if (showResumeModal) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [showResumeModal]);

  const projectsCount = projects && projects.length ? projects.length : 10;
  const stats = [
    { label: 'Years Exp', value: 1, suffix: '+', icon: Briefcase, color: 'text-indigo-400', sub: 'Industry' },
    { label: 'Projects', value: projectsCount, suffix: '+', icon: FolderOpen, color: 'text-purple-400', sub: 'Shipped' },
    { label: 'Certificates', value: 6, suffix: '+', icon: Award, color: 'text-emerald-400', sub: 'Verified' },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-dark-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-dark-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 sm:mb-12 md:mb-14 gap-6 md:gap-8 text-left">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-purple-400 mb-3 sm:mb-4"
            >
              <User size={16} className="text-purple-400" />
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-purple-300">
                IDENTITY PROFILE
              </span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-display font-black tracking-tight leading-[1.15] text-white">
              Crafting Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">Gold</span> from Lines of Code
            </h2>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 md:auto-rows-min"
        >
          {/* Main Bio Card */}
          <BentoCard className="col-span-2 md:col-span-2 lg:col-span-4 relative overflow-hidden group h-full border-white/10 hover:border-indigo-500/30 transition-all duration-500">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="p-2 sm:p-2.5 rounded-md text-indigo-400">
                    <User size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white">Frontend & iOS Developer</h3>
                </div>
                {/*<div className="flex items-center gap-1.5 sm:gap-2 border border-white/10 px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg">
                  <Sparkles size={12} className="text-indigo-400 animate-pulse" />
                  <span className="text-[9px] sm:text-[10px] font-code font-bold uppercase tracking-wider text-dark-textMuted">Frontend & iOS Specialist</span>
                </div>*/}
              </div>

              <div className="space-y-3 sm:space-y-4 text-white/70 my-auto">
                <p className="text-dark-textMuted leading-relaxed font-bricolage text-xs sm:text-sm md:text-base opacity-95">
                  I'm <span className="text-white font-bold">Rudra Patel</span>, a dedicated <span className="text-white font-semibold">Frontend Web & Native iOS Developer</span> based in Vadodara, Gujarat, India. I specialize in designing and engineering high-speed, SEO-optimized web applications and native iOS mobile experiences.
                </p>
                <p className="text-dark-textMuted leading-relaxed font-bricolage text-xs sm:text-sm md:text-base opacity-95">
                  My primary focus combines <span className="text-indigo-300 font-semibold">Frontend Web Development (React, Next.js, Tailwind CSS)</span> and <span className="text-purple-300 font-semibold">iOS App Development (SwiftUI, Apple SDKs, Firebase)</span>. I build pixel-perfect user interfaces, fluid animations, and fast-loading web and mobile applications.
                </p>
                <p className="text-dark-textMuted leading-relaxed font-bricolage text-xs sm:text-sm md:text-base opacity-95">
                  Whether creating responsive web platforms or native iOS applications, I bridge intuitive UI/UX design with clean, scalable code architecture — delivering digital products that are visually engaging and built for maximum performance.
                </p>
                <div className="pt-2  flex flex-wrap items-center gap-2 text-sm font-display text-dark-textMuted">
                  <span className="px-2.5 py-1 text-400 font-bold">● Web & Mobile</span>
                  <span className="px-2.5 py-1 text-400 font-bold">● High Performance</span>
                  <span className="px-2.5 py-1 text-400 font-bold">● Pixel Perfect</span>
                </div>
              </div>

              <div className="pt-2 sm:pt-3 border-t border-white/5">
                <p className="text-dark-textMain font-medium font-display  text-xs sm:text-sm md:text-base leading-relaxed text-[#8b5cf6]">
                  Crafting responsive web applications and native iOS apps with modern design and high performance.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Developer Portrait Image Showcase Card */}
          <BentoCard className="col-span-2 md:col-span-2 lg:col-span-2 lg:row-span-2 relative overflow-hidden group p-0 min-h-[300px] h-full border-purple-500/20 transition-all duration-500">
            <div className="relative w-full h-full min-h-[300px] overflow-hidden rounded-md">
              <img
                src="/images/0R7A7684.webp"
                alt="Rudra Patel - Developer Profile"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-85 transition-opacity duration-500" />
            </div>
          </BentoCard>

          {/* Download Resume Card */}
          <BentoCard
            className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 md:row-span-1 hover:border-dark-secondary/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] transition-all duration-500 group relative overflow-hidden h-auto md:h-full cursor-pointer"
            onClick={() => setShowResumeModal(true)}
          >
            <div className="flex flex-col h-full justify-between relative z-10">
              <div className="flex justify-between items-start">
                <a
                  href="/Rudra-Patel-Resume.pdf"
                  download="Rudra-Patel-Resume.pdf"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowResumeModal(true);
                  }}
                  className="p-2.5 rounded-md hover:bg-dark-secondary/20 hover:border-dark-secondary/30 transition-colors z-20"
                  title="Download Resume"
                >
                  <Download className="text-indigo-400 hover:scale-110 hover:translate-y-[1px] transition-all" size={20} />
                </a>
              </div>
              <div>
                <span className="block font-display text-sm sm:text-base mt-2 leading-tight text-white/90">Resume</span>
                <span className="text-[9px] text-dark-textMuted uppercase tracking-widest block mb-2 font-semibold font-poppins">Technical CV</span>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowResumeModal(true);
                  }}
                  className="flex items-center gap-2 py-1.5 px-2.5 rounded-lg border border-white/10 group-hover:border-dark-secondary/50 group-hover:bg-dark-secondary/10 transition-all cursor-pointer"
                >
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white/80 group-hover:text-white font-poppins">Get Resume</span>

                </div>
              </div>
            </div>
          </BentoCard>

          {/* Stats Counters */}
          {stats.map((stat, i) => {
            const IconComp = stat.icon;
            return (
              <BentoCard key={stat.label} className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 p-3.5 sm:p-4 flex flex-col justify-between h-auto md:h-full hover:border-indigo-500/30 hover:shadow-[0_0_25px_rgba(99,102,241,0.12)] transition-all duration-500 group/stat">
                <div className="flex items-center justify-between">
                  <div className="p-1.5 sm:p-2 rounded-md">
                    <IconComp size={20} className={stat.color} />
                  </div>
                  <span className="text-[9px] font-code font-bold uppercase text-dark-textMuted/70">{stat.sub}</span>
                </div>

                <div className="my-auto py-1">
                  <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gradient font-bricolage tracking-tight leading-none mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={0.4 + (i * 0.1)} />
                  </div>
                  <span className="text-[9px] md:text-[10px] uppercase tracking-wider font-bold text-dark-textMuted block font-code">{stat.label}</span>
                </div>
              </BentoCard>
            );
          })}

          {/* Tech Philosophy Card */}
          <BentoCard className="col-span-2 md:col-span-4 lg:col-span-6 relative overflow-hidden h-auto md:h-full group hover:border-[#8b5cf6]/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center h-full gap-6 relative z-10 w-full">
              <div className="max-w-full sm:max-w-[55%]">
                <h4 className="text-lg font-bold mb-2 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-500 flex items-center gap-2">
                  <Code2 size={18} /> Tech Philosophy
                </h4>
                <p className="text-xs md:text-sm text-dark-textMuted font-bricolage leading-relaxed">
                  Engineering native iOS applications with SwiftUI & Xcode alongside high-performance web platforms with React & Next.js. Driven by pixel perfection, fluid micro-interactions, and responsive design.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full sm:w-auto shrink-0">
                <div className="flex flex-wrap gap-1.5 max-w-[380px]">
                  {['SwiftUI', 'Swift', 'React', 'Next.js', 'TypeScript', 'Tailwind', 'Xcode', 'Firebase'].map(tech => (
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
                  href="/Rudra-Patel-Resume.pdf"
                  download="Rudra-Patel-Resume.pdf"
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
