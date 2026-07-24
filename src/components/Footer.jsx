import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import {
  Github, Linkedin, Instagram, Youtube, Facebook, ArrowUp,
  Globe, Cpu, Code2, MapPin, Mail, Phone,
  Send, CheckCircle, Terminal, ShieldCheck
} from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ── Live FPS counter ──
  const [fps, setFps] = useState(0);
  const frameRef = useRef(0);
  const timeRef = useRef(performance.now());
  const rafRef = useRef(null);
  const tick = useCallback(() => {
    frameRef.current += 1;
    const now = performance.now();
    const elapsed = now - timeRef.current;
    if (elapsed >= 1000) {
      setFps(Math.round((frameRef.current * 1000) / elapsed));
      frameRef.current = 0;
      timeRef.current = now;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);
  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  // ── Live Ping ──
  const [ping, setPing] = useState(0);
  useEffect(() => {
    const measure = () => {
      const url = `/favicon.ico?_=${Date.now()}`;
      const t0 = performance.now();
      fetch(url, { method: 'HEAD', cache: 'no-store' })
        .catch(() => { })
        .finally(() => setPing(Math.round(performance.now() - t0)));
    };
    measure();
    const id = setInterval(measure, 3000);
    return () => clearInterval(id);
  }, []);

  const fpsColor = fps >= 55 ? '#22c55e' : fps >= 30 ? '#facc15' : '#ef4444';
  const pingColor = ping <= 50 ? '#22c55e' : ping <= 150 ? '#facc15' : '#ef4444';

  // Live ticking clock in IST (Vadodara local timezone standard context)
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const formatted = new Intl.DateTimeFormat('en-US', options).format(new Date());
      setTime(`${formatted} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitting(true);

    // Simulate premium visual submitting feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 4000);
    }, 1200);
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100082469136911', color: '#1877f2', name: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/rudraa_ptll/', color: '#B72B5F', name: 'Instagram' },
    { icon: Github, href: 'https://github.com/Rudraptl16', color: '#ffffff', name: 'GitHub' },
    { icon: Youtube, href: 'https://www.youtube.com/@rudrapatel4172', color: '#ff0000', name: 'YouTube' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/rudra-patel-265258313/', color: '#0077b5', name: 'LinkedIn' },
  ];

  // Properly aligned targeting IDs in sync with Home.jsx section elements
  const quickLinks = [
    { name: 'HOME', to: 'home' },
    { name: 'ABOUT', to: 'about' },
    { name: 'SKILLS', to: 'skills' },
    { name: 'EXPERIENCE', to: 'experience' },
    { name: 'SERVICES', to: 'services' },
    { name: 'PROJECTS', to: 'projects' },
    { name: 'CONTACT', to: 'contact' },
  ];

  return (
    <footer className="pt-12 pb-12 relative overflow-hidden bg-[#040510]/90 backdrop-blur-2xl border-t border-white/10">
      {/* Dynamic Scrolling Top Glowing Shimmer Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#6366f1] via-[#818cf8] to-transparent opacity-70 animate-pulse" />

      {/* Immersive Glowing Backdrop Decor */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-tr from-indigo-600/10 to-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Ambient Visual Tech-Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_0)] bg-[size:24px_24px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Top Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 pb-10 sm:pb-14">

          {/* Column 1: Brand Signature & System Status */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-5 sm:space-y-6 lg:pr-8">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center shrink-0 p-1 relative overflow-hidden group ">
                <img
                  src='/images/navbar-avatar.webp'
                  alt='Rudra Patel'
                  className='w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105'
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bricolage font-bold tracking-tight text-white">
                  Rudra Patel<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-extrabold ml-0.5">.</span>
                </h3>
                <p className="text-[10px] font-mono text-emerald-400 tracking-[0.2em] uppercase font-bold mt-0.5 sm:mt-1">Full-Stack & iOS Developer</p>
              </div>
            </div>

            <p className="text-white/60 max-w-sm leading-relaxed text-xs sm:text-sm font-display">
              Designed and engineered with absolute precision, utilizing an immersive midnight glass aesthetic, responsive layout hierarchies, and ultra-high performance code structures.
            </p>

            {/* Social Icons (Same style as Hero section) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
              {socialLinks.map(({ icon: Icon, href, color, name }, i) => (
                <MagneticButton key={i}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow on ${name}`}
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 overflow-hidden"
                    >
                      <Icon
                        className="w-4 h-4 sm:w-4.5 sm:h-4.5 relative z-10 transition-transform duration-500 group-hover:scale-110"
                        style={{ color }}
                        strokeWidth={2}
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle 45px at center, ${color}33, transparent)`,
                        }}
                      />
                      <div
                        className="absolute bottom-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                        style={{ backgroundColor: color }}
                      />
                    </motion.div>
                  </a>
                </MagneticButton>
              ))}
            </div>

            {/* Live System Operational Status Widget */}
            <div className="pt-2 space-y-2.5">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <div className="flex items-center gap-2 bg-[#08080f]/80 border border-white/10 py-1.5 px-3 rounded-full backdrop-blur-md shadow-inner">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.15em] text-emerald-400">SYSTEMS ONLINE</span>
                </div>
                <div className="flex items-center gap-2 bg-[#08080f]/80 border border-white/10 py-1.5 px-3 rounded-full backdrop-blur-md shadow-inner">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.15em] text-indigo-400">AVAILABLE FOR HIRE</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-[#08080f]/60 py-1.5 px-3 rounded-xl border border-white/10 w-max">
                <Terminal size={12} className="text-indigo-400" />
                <span className="text-[10px] font-mono text-white/60 tracking-wider">
                  LOCAL TIME: <span className="text-white font-bold">{time || '00:00:00 IST'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-indigo-400 flex items-center gap-2 select-none relative w-max">
              <Code2 size={15} />
              Quick Links
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-white/70 font-medium text-[13px] font-display">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <ScrollLink
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={800}
                    className="text-white/70 font-semibold hover:text-indigo-400 cursor-pointer transition-colors relative group flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services Grid */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#6366f1] flex items-center gap-2 font-display group/hdr cursor-default select-none relative w-max">
              <Globe size={16} className="transition-transform duration-300" />
              Services
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-white/70 font-medium text-xs sm:text-sm font-bricolage">
              {[
                'Web & Mobile UI/UX Design',
                'Full-Stack Web Development',
                'Custom API Architecture & Dev',
                'Responsive Interface Engineering'
              ].map((service, index) => (
                <li key={index} className="flex items-center gap-2.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/50 group-hover:bg-indigo-400 transition-colors duration-300" />
                  <span className="hover:text-white cursor-default transition-colors block">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Connect */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6 relative">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#6366f1] flex items-center gap-2 font-display group/hdr cursor-default select-none relative w-max">
              <Mail size={16} className="transition-transform duration-300" />
              Quick Connect
            </h4>
            <p className="text-xs sm:text-[13px] text-white/60 leading-relaxed">
              Submit your message above or reach out directly for project inquiries and collaborations.
            </p>

            {/* Direct Contact Links */}
            <ul className="space-y-3 pt-3 text-white/70 font-medium text-xs font-bricolage border-t border-white/10">
              <li>
                <a href="mailto:patelrudra99098@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors group min-w-0">
                  <Mail size={14} className="text-[#6366f1] group-hover:text-white transition-colors shrink-0" />
                  <span className="truncate">patelrudra99098@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={14} className="text-[#6366f1] shrink-0" />
                <span className="text-white/90 font-bold">Vadodara, Gujarat, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Editorial Dual-Direction Watermark Marquees 
        <div className="relative -mt-10 sm:-mt-14 -mb-8 sm:-mb-10 select-none pointer-events-none overflow-hidden flex flex-col">
          <div className="overflow-hidden flex whitespace-nowrap">
            <motion.div
              className="flex whitespace-nowrap text-[#6366f1] opacity-[0.025]"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 32, repeat: Infinity }}
            >
              <h2 className="text-[20vw] sm:text-[14vw] md:text-[9vw] font-syne font-black leading-none pr-8 sm:pr-12 shrink-0 tracking-tighter uppercase">
                R u d r a &nbsp; P a t e l &nbsp; • &nbsp; R u d r a &nbsp; P a t e l &nbsp; • &nbsp;
              </h2>
              <h2 className="text-[20vw] sm:text-[14vw] md:text-[9vw] font-syne font-black leading-none pr-8 sm:pr-12 shrink-0 tracking-tighter uppercase">
                R u d r a &nbsp; P a t e l &nbsp; • &nbsp; R u d r a &nbsp; P a t e l &nbsp; • &nbsp;
              </h2>
            </motion.div>
          </div>
        </div>*/}

        {/* Bottom Bar: Copyright & Dashboard */}
        <div className="pt-1 flex flex-col-reverse sm:flex-row justify-between items-center gap-4 sm:gap-6 mt-6 sm:mt-0 ">
          {/* Copyright text */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-[10px] font-mono text-white/50 uppercase tracking-widest text-center sm:text-left">
            <div className="flex items-center gap-2">
              <Globe size={12} className="text-indigo-400 animate-pulse" />
              <span>&copy; {currentYear} <a href="https://www.linkedin.com/in/rudra-patel-265258313/" target="_blank" rel="noopener noreferrer" className="hover:text-white font-bold transition-colors">Rudra Patel</a></span>
            </div>
            <span className="hidden sm:inline border-r border-white/10 h-2.5" />
            
          </div>

          {/* Scroll-To-Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-1 focus:outline-none cursor-pointer"
            aria-label="Scroll to top"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0a0a12]/80 border border-white/10 flex items-center justify-center text-white/80 group-hover:border-indigo-400 group-hover:text-indigo-400 transition-all duration-300 overflow-hidden relative shadow-lg">
              <ArrowUp size={16} className="transition-transform relative z-10 group-hover:-translate-y-0.5" />
            </div>
            <span className="text-[8px] font-mono font-bold tracking-widest uppercase opacity-50 group-hover:opacity-100 group-hover:text-indigo-400 transition-all">TOP_UP</span>
          </button>
        </div>
      </div>
    </footer>
  );
}