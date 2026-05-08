import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { Github, Linkedin, Instagram, Youtube, Facebook, ArrowRight } from 'lucide-react';
import Hero3D from './canvas/Hero3D';
import MagneticButton from './ui/MagneticButton';


// Animated shimmer gradient CSS injected once
const shimmerStyle = `
  @keyframes gradientShimmer {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .hero-gradient-text {
    background: linear-gradient(135deg, #a855f7, #7c3aed, #6366f1, #818cf8, #a855f7);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShimmer 4s ease infinite;
  }
`;

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100082469136911', color: '#1877f2' },
  { icon: Instagram, href: 'https://www.instagram.com/rudraa_ptll/', color: '#C13584' },
  { icon: Github, href: 'https://github.com/Rudraptl16', color: '#ffffff' },
  {
    icon: Youtube, href: 'https://www.youtube.com/@rudrapatel4172', color: '#ff0000'

  },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/rudra-patel-265258313/', color: '#0077b5' },
];

export default function Hero() {
  const [showBadge, setShowBadge] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBadge(false);
    }, 6500);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  const blobVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.1, 0.15, 0.1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };


  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center overflow-hidden "
      style={{ background: '#050510' }}
    >
      {/* Starfield / 3D Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0"
      >
        <Hero3D />
      </motion.div>

      {/* Subtle glow blobs */}
      <motion.div 
        variants={blobVariants}
        animate="animate"
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[180px] pointer-events-none" 
      />
      <motion.div 
        variants={blobVariants}
        animate="animate"
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" 
      />

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              y: [null, "-20%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>


      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-center pt-32 lg:pt-20">

        {/* ── LEFT: Text Content ─────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-5 order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          {/* Social Icons Row */}
          <motion.div 
            variants={containerVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 mb-4"
          >
            {socialLinks.map(({ icon: Icon, href, color }, i) => (
              <motion.div key={i} variants={itemVariants}>
                <MagneticButton>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 overflow-hidden"
                    >
                      <Icon
                        className="w-5 h-5 md:w-6 md:h-6 relative z-10 transition-transform duration-500 group-hover:scale-110"
                        style={{ color }}
                        strokeWidth={2}
                      />

                      {/* Spotlight Effect */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle 50px at center, ${color}33, transparent)`,
                        }}
                      />

                      {/* Subtle bottom line indicator on hover */}
                      <div
                        className="absolute bottom-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                        style={{ backgroundColor: color }}
                      />
                    </motion.div>
                  </a>
                </MagneticButton>
              </motion.div>
            ))}

          </motion.div>


          {/* Main Heading — types once then animates gradient forever */}
          <style>{shimmerStyle}</style>
          <motion.div variants={itemVariants} className="space-y-1">
            <TypeAnimation
              sequence={[
                "Hi, I'm Rudra\nPatel", 0,
              ]}
              wrapper="h1"
              speed={60}
              repeat={0}
              cursor={false}
              className="hero-gradient-text text-4xl md:text-5xl font-display font-black tracking-tight whitespace-pre-line animated-gradient-text"
            />
          </motion.div>

          {/* Animated Subtitle — Syne font, cycles */}
          <motion.div variants={itemVariants}>
            <TypeAnimation
              sequence={[
                'iOS Developer', 2200,
                'Full Stack Developer', 2200,
                'Creative Engineer', 2200,
                'UI Designer', 2200,
              ]}
              wrapper="p"
              speed={60}
              repeat={Infinity}
              className="text-2xl md:text-3xl font-bold font-display tracking-wide text-muted"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-display text-white/50 text-lg md:text-xl max-w-md leading-relaxed tracking-wide"
          >
            Building high-performance web & mobile experiences 🚀 that drive engagement 📈 and conversions 💡
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <ScrollLink to="contact" smooth duration={1000}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative group font-display flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-md tracking-widest uppercase transition-all backdrop-blur-md font-syne overflow-hidden"
              >
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-600 opacity-20 blur-sm transition-opacity group-hover:opacity-40 duration-500" />
                <span className="absolute inset-[1px] bg-[#0a0a12]/90 backdrop-blur-md rounded-2xl z-0 transition-colors group-hover:bg-[#0a0a12]/80" />
                <span className="relative z-10 flex items-center gap-3">
                  Contact Me <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
            </ScrollLink>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Portrait Photo ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="flex justify-center lg:justify-end order-1 lg:order-2"
        >
          {/* Floating up-down wrapper */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.02 }}
            className="relative cursor-pointer group"
          >
            {/* Outer glow — intensifies on hover */}
            <motion.div
              className="absolute inset-0 rounded-3xl blur-3xl scale-110 bg-gradient-to-r from-violet-600/20 to-indigo-500/20"
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                scale: [1.1, 1.15, 1.1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Photo frame */}
            <div className="relative w-[320px] md:w-[380px] lg:w-[440px] aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
              <img
                src="/images/pic.jpeg"
                alt="Rudra Patel"
                fetchPriority="high"
                className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Animated Inner Border */}
              <div className="absolute inset-0 border border-white/10 rounded-[2.5rem] pointer-events-none z-10" />
              
              {/* Glassy overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            {/* Floating Info Badge
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="absolute -right-6 bottom-12 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Available for Projects</span>
              </div>
            </motion.div> */}
          </motion.div>
        </motion.div>



      </div>

      {/* Welcome Badge */}
      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="absolute top-24 md:top-auto md:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 z-50 w-max"
          >
            <div id="homeWelcomeBadge" className="bg-white/5 backdrop-blur-2xl border border-white/10 px-6 py-3 lg:px-8 lg:py-4 rounded-2xl flex flex-col relative overflow-hidden group hover:border-white/20 transition-all" aria-live="polite" role="status">
              <div className="flex items-center gap-3 z-10 mb-[2px]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                </span>
                <span className="text-white/90 font-display font-medium text-sm lg:text-base tracking-wide whitespace-nowrap">Welcome to Case Study 💻</span>
              </div>
              {/* Progress Bar  Welcome to Case Study 💻 */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 6.5, ease: "linear" }}
                className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-violet-600 to-indigo-400"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Indicator 
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-dark-primary to-transparent"
        />
      </motion.div>*/}
    </section>

  );
}
