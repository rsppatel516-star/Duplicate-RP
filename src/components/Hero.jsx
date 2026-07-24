import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { Github, Linkedin, Instagram, Youtube, Facebook, ArrowRight, Smartphone, Layers, MapPin, Clock, Cpu } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

// Animated styles injected once
const shimmerStyle = `
  @keyframes gradientShimmer {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes sweep {
    0% { left: -100%; }
    100% { left: 125%; }
  }
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes spinCounterSlow {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  @keyframes gridPulse {
    0%, 100% { opacity: 0.12; }
    50% { opacity: 0.28; }
  }
  .hero-gradient-text {
    background: linear-gradient(135deg, #a855f7, #7c3aed, #6366f1, #818cf8, #a855f7);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShimmer 4s ease infinite;
  }
  .animate-spin-slow {
    animation: spinSlow 28s linear infinite;
  }
  .animate-spin-counter-slow {
    animation: spinCounterSlow 38s linear infinite;
  }
  .hero-grid-bg {
    background-size: 40px 40px;
    background-image: 
      linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
    animation: gridPulse 8s ease-in-out infinite alternate;
  }
`;

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100082469136911', color: '#1877f2' },
  { icon: Instagram, href: 'https://www.instagram.com/rudraa_ptll/', color: '#B72B5F' },
  { icon: Github, href: 'https://github.com/Rudraptl16', color: '#ffffff' },
  { icon: Youtube, href: 'https://www.youtube.com/@rudrapatel4172', color: '#ff0000' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/rudrapatel816/', color: '#0077b5' },
];

export default function Hero() {
  const [showBadge, setShowBadge] = useState(true);
  const [decorativeElements, setDecorativeElements] = useState([]);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBadge(false);
    }, 5000);

    // Live clock update in India (IST) Timezone
    const updateClock = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    // Scatter decorative floaters
    setTimeout(() => {
      setDecorativeElements([...Array(8)].map(() => ({
        x: Math.random() * 100 + "%",
        y: Math.random() * 100 + "%",
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 5
      })));
    }, 0);

    return () => {
      clearTimeout(timer);
      clearInterval(clockInterval);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
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
      opacity: [0.12, 0.18, 0.12],
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
      className="min-h-screen relative flex items-center overflow-hidden   "
    >
      <style>{shimmerStyle}</style>

      {/* Cybernetic Tech Grid Background */}
      <div className="absolute inset-0 hero-grid-bg z-0 pointer-events-none" />

      {/* Glowing ambient blobs */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[180px] pointer-events-none z-0"
      />
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[160px] pointer-events-none z-0"
      />

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {decorativeElements.map((el, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: el.x,
              y: el.y,
              opacity: 0
            }}
            animate={{
              y: [null, "-20%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              ease: "linear",
              delay: el.delay
            }}
          />
        ))}
      </div>

      {/* Screen-reader optimized SEO support */}
      <p className="sr-only">
        Welcome to the digital portfolio of Rudra Patel, a specialized Full-stack Developer in Vadodara, Gujarat, and an iOS developer in India. Expert in building performant Apple SwiftUI apps, React dashboards, Node.js REST APIs, and responsive mobile interfaces for global clients from India.
      </p>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center pt-32 lg:pt-20">

        {/* ── LEFT: Text & Stats Content ─────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          {/* Social Icons Row */}
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4"
          >
            {socialLinks.map(({ icon: Icon, href, color }, i) => (
              <motion.div key={i} variants={itemVariants}>
                <MagneticButton>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow on ${href}`}
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative w-12 h-12 md:w-13 md:h-13 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 overflow-hidden"
                    >
                      <Icon
                        className="w-5 h-5 relative z-10 transition-transform duration-500 group-hover:scale-110"
                        style={{ color }}
                        strokeWidth={2}
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle 50px at center, ${color}33, transparent)`,
                        }}
                      />
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

          {/* SEO-Optimized Semantic H1 Title */}
          <motion.div variants={itemVariants} className="space-y-1">
            <TypeAnimation
              sequence={[
                "Hi, I'm Rudra\nPatel", 0,
              ]}
              wrapper="h1"
              speed={60}
              repeat={0}
              cursor={false}
              className="text-4xl md:text-5xl font-display font-bold tracking-tighter whitespace-pre-line text-[#6366f1]"
            />
          </motion.div>

          {/* Subtitle animation */}
          <motion.div variants={itemVariants} className="h-[36px] flex items-center justify-center lg:justify-start">
            <span className="text-xl font-mono text-white/30 mr-2 select-none">&gt;</span>
            <TypeAnimation
              sequence={[
                'iOS Swift Developer', 3000,
                'Frontend Developer', 3000,
                'MERN Developer', 3000,
                'Vibe Coder', 3000,
              ]}
              wrapper="p"
              speed={60}
              repeat={Infinity}
              className="text-xl md:text-2xl font-bold font-display tracking-wide text-indigo-400"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-display text-white/60 text-base md:text-lg max-w-lg leading-relaxed tracking-wide"
          >
            I'm a Full-stack Developer based in Vadodara, Gujarat. I engineer high-performance iOS mobile applications and responsive MERN stack web applications, focused on speed optimization, clean architecture, and fluid transitions.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants} className="pt-6">
            <MagneticButton>
              <ScrollLink to="contact" smooth duration={1000} className="cursor-pointer block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group font-display flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-sm tracking-[0.2em] uppercase transition-all duration-500 overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:shadow-[0_0_35px_rgba(124,58,237,0.4)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-500 group-hover:opacity-90 transition-opacity duration-500" />
                  <span className="absolute inset-[1px] bg-black/40 backdrop-blur-xl rounded-[15px] z-0 transition-all duration-500 group-hover:bg-black/60" />
                  <span className="absolute top-0 -left-[100%] h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[sweep_1.5s_ease-in-out_infinite]" />
                  <span className="relative z-10 flex items-center gap-3 text-white/80 group-hover:text-white transition-colors duration-300">
                    Connect With Me
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight size={18} className="text-indigo-300 group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                  </span>
                </motion.button>
              </ScrollLink>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Portrait Photo & HUD ────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="flex justify-center lg:justify-end order-1 lg:order-2 relative z-10"
        >
          {/* Rotating vector overlays */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 scale-75 md:scale-95 lg:scale-105">
            <div className="absolute w-[460px] h-[460px] rounded-full border border-dashed border-violet-500/10 animate-spin-slow" />
            <div className="absolute w-[400px] h-[400px] rounded-full border border-double border-indigo-500/15 animate-spin-counter-slow" />
            <div className="absolute w-[520px] h-[520px] rounded-full border border-white/5" />
          </div>

          {/* Image & Badges frame */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.01 }}
            className="relative cursor-pointer group z-10"
          >
            {/* Ambient outer backglow */}
            <motion.div
              className="absolute inset-0 rounded-[2rem] blur-3xl scale-105 bg-gradient-to-tr from-violet-600/25 to-indigo-500/25 opacity-70 group-hover:opacity-100 transition-opacity duration-700"
              animate={{
                scale: [1.02, 1.08, 1.02]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Photo frame */}
            <div className="relative w-[320px] md:w-[380px] lg:w-[440px] aspect-[3/4] rounded-[1rem] overflow-hidden">
              <img
                src="/images/DSC06139.webp"
                alt="Rudra Patel portrait photo"
                fetchPriority="high"
                className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Glassy gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-violet-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
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

      {/* Welcome Toast Badge */}
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
                <span className="text-white/90 font-display font-medium text-sm lg:text-base tracking-wide whitespace-nowrap">Welcome to portfolio 💻</span>
              </div>
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
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
