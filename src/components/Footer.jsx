import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import {
  Github, Linkedin, Instagram, Youtube, ArrowUp,
  Globe, Cpu, Code2, MapPin, Mail, Phone,
  Send, CheckCircle, Terminal, ShieldCheck
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    {
      icon: <Github size={20} />,
      url: 'https://github.com/Rudraptl16/Rudraptl16',
      hoverClass: 'hover:bg-dark-primary  hover:text-black'
    },
    {
      icon: <Linkedin size={20} />,
      url: 'https://www.linkedin.com/in/rudra-patel-265258313/',
      hoverClass: 'hover:bg-dark-primary  hover:text-black'
    },
    {
      icon: <Instagram size={20} />,
      url: 'https://www.instagram.com/rudraa_ptll/',
      hoverClass: 'hover:bg-dark-primary  hover:text-black'
    },
    {
      icon: <Youtube size={20} />,
      url: 'https://www.youtube.com/@rudrapatel4172',
      hoverClass: 'hover:bg-dark-primary  hover:text-black'
    }
  ];

  // Properly aligned targeting IDs in sync with Home.jsx section elements
  const quickLinks = [
    { name: 'INDEX', to: 'home' },
    { name: 'ALCHEMIST', to: 'about' },
    { name: 'ARSENAL', to: 'skills' },
    { name: 'CHRONICLES', to: 'experience' },
    { name: 'CAPABILITIES', to: 'services' },
    { name: 'ARTIFACTS', to: 'projects' },
    { name: 'CONTACT', to: 'contact' },
  ];

  return (
    <footer className=" pt-10 pb-12 relative overflow-hidden bg-dark-bg/80 backdrop-blur-2xl">
      {/* Dynamic Scrolling Top Glowing Shimmer Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#6366f1] via-[#6366f1] to-transparent opacity-60 animate-pulse" />
      
      {/* Immersive Glowing Backdrop Decor */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-tr from-dark-primary/10 to-dark-secondary/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Ambient Visual Tech-Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_0)] bg-[size:24px_24px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-1 relative z-10">

        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-14">

          {/* Column 1: Brand Signature & System Status */}
          <div className="lg:col-span-4 space-y-6 lg:pr-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-dark-primary shrink-0 bg-white/5 border border-white/10 p-1 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-dark-primary/20 to-dark-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src='/images/about.png' 
                  alt='Rudra Patel Logo' 
                  className='w-full h-full object-cover rounded-xl relative z-10 transition-transform duration-500 group-hover:scale-105' 
                />
              </div>
              <div>
                <h3 className="text-2xl font-syne font-black tracking-tight text-gradient animated-gradient-text">Rudra Patel</h3>
                <p className="text-[9px] font-code text-white/40 tracking-[0.25em] uppercase font-bold mt-1">Digital Architect</p>
              </div>
            </div>

            <p className="text-dark-textMuted max-w-sm leading-relaxed text-sm">
              Designed and engineered with absolute precision, utilizing an immersive midnight glass aesthetic, responsive layout hierarchies, and ultra-high performance code structures.
            </p>

            {/* Neon Glowing Brand Social Cards */}
            <div className="flex items-center gap-3.5 pt-1">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-dark-textMain transition-all duration-300 transform hover:-translate-y-1.5 ${social.hoverClass}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Live System Operational Status Widget */}
            <div className="pt-4 space-y-2 ">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-[#08080f]/80 border border-white/5 py-1.5 px-3.5 rounded-full backdrop-blur-md shadow-inner">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[9px] font-code font-bold uppercase tracking-[0.15em] text-emerald-400 ">SYSTEMS ONLINE</span>
                </div>
                <div className="flex items-center gap-2 bg-[#08080f]/80 border border-white/5 py-1.5 px-3.5 rounded-full backdrop-blur-md shadow-inner">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                  </span>
                  <span className="text-[9px] font-code font-bold uppercase tracking-[0.15em] text-violet-400">AVAILABLE FOR HIRE</span>
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 bg-[#08080f]/40 py-1.5 px-3.5 rounded-xl border border-white/5 w-max">
                <Terminal size={12} className="text-dark-primary" />
                <span className="text-[10px] font-code text-dark-textMuted tracking-wider">
                  LOCAL TIME: <span className="text-white font-bold">{time || '00:00:00 IST'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-dark-primary flex items-center gap-2 font-display">
              <Code2 size={16} /> Quick Links
            </h4>
            <ul className="space-y-3.5 text-dark-textMuted font-medium text-[13px] font-bricolage">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <ScrollLink
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={800}
                    className="text-dark-text Main font-semibold hover:text-dark-primary cursor-pointer transition-colors relative group items-center gap-1.5"
                  >
                    <span className="w-0.5 h-0.5 bg-dark-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services Grid */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-dark-secondary flex items-center gap-2 font-display">
              <Globe size={16} /> Services
            </h4>
            <ul className="space-y-4 text-dark-textMuted font-medium text-[14px] font-bricolage">
              {[
                'Web & Mobile UI/UX Design',
                'Full-Stack Web Development',
                'Custom API Architecture & Dev',
                'Responsive Interface Engineering'
              ].map((service, index) => (
                <li key={index} className="flex items-center gap-2.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-dark-secondary/50 group-hover:bg-dark-secondary transition-colors duration-300" />
                  <span className="hover:text-dark-primary cursor-default transition-colors block">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Premium Quick Connect Form */}
          <div className="lg:col-span-3 space-y-6 relative">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF2E93] flex items-center gap-2 font-display">
              <Mail size={16} /> Quick Connect
            </h4>
            <p className="text-[13px] text-dark-textMuted leading-relaxed">
              Submit your email to connect instantly, receive custom showcases, or launch a direct portfolio inquiry.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative group/form">
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@domain.com"
                  className="w-full bg-[#0a0a12]/80 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-xs text-white placeholder-white/20 focus:outline-none focus:border-dark-primary focus:ring-1 focus:ring-dark-primary/30 transition-all duration-300 backdrop-blur-md"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-dark-primary hover:text-dark-bg hover:border-dark-primary flex items-center justify-center transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isSubmitted ? (
                    <CheckCircle size={15} className="text-emerald-400 animate-bounce" />
                  ) : (
                    <Send size={13} className="group-hover/form:translate-x-0.5 group-hover/form:-translate-y-0.5 transition-transform" />
                  )}
                </button>
              </div>
              
              {/* Dynamic Subscription Confirmation Banner */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute left-0 right-0 top-[110%] flex items-center gap-2.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-2.5 px-3 rounded-lg backdrop-blur-md z-20 shadow-lg"
                  >
                    <ShieldCheck size={14} className="shrink-0" />
                    <span>Connection initialized! Checking inbox...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
            
            {/* Direct Contact Links */}
            <ul className="space-y-3 pt-4 text-dark-textMuted font-medium text-xs font-bricolage border-t border-white/5">
              <li>
                <a href="mailto:patelrudra99098@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Mail size={14} className="text-[#6366f1] group-hover:text-white transition-colors" />
                  <span>patelrudra99098@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+916354825621" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Phone size={14} className="text-[#6366f1] group-hover:text-white transition-colors" />
                  <span>+91 6354 825 621</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#6366f1] mt-0.5 shrink-0" />
                <span className="text-dark-textMain font-bold">Vadodara, Gujarat, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Editorial Dual-Direction Watermark Marquees */}
        <div className="relative -mt-14 -mb-10 select-none pointer-events-none overflow-hidden flex flex-col ">
          {/* Marquee Track 1: Moving Left */}
          <div className="overflow-hidden flex whitespace-nowrap">
            <motion.div
              className="flex whitespace-nowrap text-[#6366f1] opacity-[0.02]"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 32, repeat: Infinity }}
            >
              <h2 className="text-[18vw] md:text-[9vw] font-syne font-black leading-none pr-12 shrink-0 tracking-tighter uppercase">
                R u d r a &nbsp; P a t e l &nbsp; • &nbsp; R u d r a &nbsp; P a t e l &nbsp; • &nbsp;
              </h2>
              <h2 className="text-[18vw] md:text-[9vw] font-syne font-black leading-none pr-12 shrink-0 tracking-tighter uppercase">
                R u d r a &nbsp; P a t e l &nbsp; • &nbsp; R u d r a &nbsp; P a t e l &nbsp; • &nbsp;
              </h2>
            </motion.div>
          </div>

          {/* Marquee Track 2: Moving Right 
          <div className="overflow-hidden flex whitespace-nowrap">
            <motion.div
              className="flex whitespace-nowrap text-[#ec4899] opacity-[0.015]"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ ease: "linear", duration: 36, repeat: Infinity }}
            >
              <h2 className="text-[18vw] md:text-[9vw] font-display font-black leading-none pr-12 shrink-0 tracking-tighter uppercase">
                D i g i t a l &nbsp; A r c h i t e c t &nbsp; • &nbsp; F u l l - S t a c k &nbsp; • &nbsp;
              </h2>
              <h2 className="text-[18vw] md:text-[9vw] font-display font-black leading-none pr-12 shrink-0 tracking-tighter uppercase">
                D i g i t a l &nbsp; A r c h i t e c t &nbsp; • &nbsp; F u l l - S t a c k &nbsp; • &nbsp;
              </h2>
            </motion.div>
          </div>*/}
        </div>

        {/* Bottom Bar: Copyright & Live Environment Dashboard */}
        <div className="pt-2 flex flex-col md:flex-row justify-between items-center gap-6 -mb-8 mt-8">
          
          {/* Dynamic Technical Metadata Dashboard Grid */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3.5 gap-y-2 text-[10px] font-code text-dark-textMuted uppercase tracking-widest text-center md:text-left">
            <div className="flex items-center gap-2">
              <Globe size={13} className="text-dark-primary animate-pulse" />
              <span>&copy; {currentYear} <a href="https://www.linkedin.com/in/rudra-patel-265258313/" target="_blank" rel="noreferrer" className="hover:text-dark-primary font-bold transition-colors">Rudra Patel</a></span>
            </div>
            <span className="hidden sm:inline border-r border-white/10 h-2.5" />
            <span>FPS: <span className="text-emerald-400 font-bold">60</span></span>
            <span className="hidden sm:inline border-r border-white/10 h-2.5" />
            <span>PING: <span className="text-emerald-400 font-bold">12ms</span></span>
            <span className="hidden sm:inline border-r border-white/10 h-2.5" />
            <span>SECURE: <span className="text-dark-primary font-bold">SSL_TLS</span></span>
            <span className="hidden sm:inline border-r border-white/10 h-2.5" />
            <span>ENV: <span className="text-dark-secondary font-bold">PRODUCTION</span></span>
          </div>

          {/* Bouncing Scroll-To-Top Circular Button */}
          <button
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-1.5 focus:outline-none"
            aria-label="Scroll to top"
          >
            <div className="w-11 h-11 rounded-full bg-[#0a0a12]/60 border border-white/10 flex items-center justify-center text-dark-textMain group-hover:border-dark-primary group-hover:text-dark-primary transition-all duration-500 overflow-hidden relative shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              {/* Sonar Ripple effect in background */}
              <span className="absolute inset-0 bg-dark-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
              <ArrowUp size={16} className="transition-transform relative z-10 group-hover:-translate-y-0.5" />
            </div>
            <span className="text-[8px] font-code font-bold tracking-widest uppercase opacity-40 group-hover:opacity-100 group-hover:text-dark-primary transition-all">TOP_UP</span>
          </button>
          
        </div>
      </div>
    </footer>
  );
}