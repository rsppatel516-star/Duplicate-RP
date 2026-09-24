import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import {
  Github, Linkedin, Instagram, Youtube, Facebook, ArrowUp,
  Globe, Cpu, Code2, MapPin, Mail, Phone,
  Send, CheckCircle, ShieldCheck, Sparkles, Heart
} from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmailInput('');
      }, 4000);
    }
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100082469136911', color: '#1877f2', name: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/rudraa_ptll/', color: '#B72B5F', name: 'Instagram' },
    { icon: Github, href: 'https://github.com/Rudraptl16', color: '#ffffff', name: 'GitHub' },
    { icon: Youtube, href: 'https://www.youtube.com/@rudrapatel4172', color: '#ff0000', name: 'YouTube' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/rudra-patel-265258313/', color: '#0077b5', name: 'LinkedIn' },
  ];

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
    <footer className="pt-16 pb-10 relative overflow-hidden bg-[#03040c] backdrop-blur-3xl border-t border-white/[0.08] text-white">
      {/* Animated Multi-Color Gradient Top Border Shimmer */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-purple-500 via-indigo-400 via-cyan-400 to-transparent opacity-80 animate-pulse" />

      {/* Layered Cybernetic Ambient Mesh Backglow */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[700px] h-[350px] bg-indigo-600/12 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-gradient-to-r from-violet-600/5 via-cyan-500/5 to-purple-600/5 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* Cybernetic Tech-Grid Pattern Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-30" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 100%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Top System Status & Telemetry Header
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-10 mb-12 border-b border-white/[0.08]">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Status: Available for Full-Time & Freelance Roles</span>
          </div>
          <div className="flex items-center gap-6 text-xs font-mono text-white/50 tracking-wider">
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-purple-400" />
              <span>High Security Architecture</span>
            </span>
            <span className="hidden md:flex items-center gap-2">
              <Cpu size={14} className="text-cyan-400" />
              <span>Vite + React SSG Engine</span>
            </span>
          </div>
        </div>*/}

        {/* Top Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 pb-12">

          {/* Column 1: Brand Signature & System Status */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-5 sm:space-y-6 lg:pr-8">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 p-1 relative overflow-hidden group bg-gradient-to-br from-purple-600/30 to-indigo-600/30 border border-purple-500/30">
                <img
                  src='/images/navbar-avatar.webp'
                  alt='Rudra Patel'
                  className='w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105'
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white">
                  Rudra Patel<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 font-extrabold ml-0.5">.</span>
                </h3>
                <p className="text-[12px] font-poppins text-purple-400 tracking-[0.2em] font-semibold mt-0.5 sm:mt-1">Frontend & iOS Developer</p>
              </div>
            </div>

            <p className="text-white/60 max-w-sm leading-relaxed text-xs sm:text-sm font-display">
              Designed and engineered with absolute precision, utilizing an immersive midnight glass aesthetic, responsive layout hierarchies, and ultra-high performance code structures.
            </p>

            {/* Social Icons */}
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
                      className="group relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 overflow-hidden hover:border-purple-500/50"
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
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#6366f1] flex items-center gap-2 font-display group/hdr cursor-default select-none relative w-max">
              <Code2 size={15} />
              Navigation
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
              Specialization
            </h4>
            <ul className="space-y-3 sm:space-y-3.5 text-white/70 font-medium text-xs sm:text-sm font-display">
              {[
                'Frontend Web Development',
                'Native iOS App Development',
                'UI/UX & Design-to-Code',
                'API & Cloud Integration',
              ].map((service, index) => (
                <li key={index} className="flex items-center gap-2.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400/50 group-hover:bg-purple-400 transition-colors duration-300" />
                  <span className="hover:text-white cursor-default transition-colors block">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Connect & Newsletter */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-5 relative">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#6366f1] flex items-center gap-2 font-display group/hdr cursor-default select-none relative w-max">
              <Mail size={16} className="transition-transform duration-300" />
              Quick Dispatch
            </h4>

            {/* Newsletter Input Box */}
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email to connect..."
                className="w-full bg-white/[0.03] border border-white/10 hover:border-purple-500/40 focus:border-purple-500/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 outline-none font-mono transition-all duration-300"
              />
              <button
                type="submit"
                aria-label="Send email"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white p-1.5 rounded-lg transition-all duration-300 shadow-md cursor-pointer"
              >
                {isSubscribed ? <CheckCircle size={13} className="text-emerald-300" /> : <Send size={13} />}
              </button>
            </form>

            {isSubscribed && (
              <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
                <CheckCircle size={12} /> Email registered! I'll reach out shortly.
              </p>
            )}

            {/* Direct Contact Info */}
            <ul className="space-y-2.5 pt-2 text-white/70 font-medium text-xs font-mono border-t border-white/10">
              <li>
                <a href="mailto:patelrudra99098@gmail.com" className="flex items-center gap-2.5 hover:text-white transition-colors group min-w-0">
                  <Mail size={13} className="text-purple-400 group-hover:text-white transition-colors shrink-0" />
                  <span className="truncate">patelrudra99098@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+916354825621" className="flex items-center gap-2.5 hover:text-white transition-colors group min-w-0">
                  <Phone size={13} className="text-purple-400 group-hover:text-white transition-colors shrink-0" />
                  <span className="truncate">+91 63548 25621</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={13} className="text-purple-400 shrink-0" />
                <span className="text-white/90 font-bold">Vadodara, Gujarat, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Scrolling Background Marquee Text 
        <div className="relative my-4 select-none pointer-events-none overflow-hidden opacity-[0.03]">
          <div className="overflow-hidden flex whitespace-nowrap">
            <motion.div
              className="flex whitespace-nowrap text-white"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 35, repeat: Infinity }}
            >
              <h2 className="text-[10vw] font-display font-black leading-none pr-8 shrink-0 tracking-tighter uppercase">
                RUDRA PATEL &bull; FULL-STACK &amp; IOS DEVELOPER &bull; VADODARA INDIA &bull;&nbsp;
              </h2>
              <h2 className="text-[10vw] font-display font-black leading-none pr-8 shrink-0 tracking-tighter uppercase">
                RUDRA PATEL &bull; FULL-STACK &amp; IOS DEVELOPER &bull; VADODARA INDIA &bull;&nbsp;
              </h2>
            </motion.div>
          </div>
        </div>*/}

        {/* Bottom Bar: Copyright & Back To Top */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Copyright Text */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-[11px] font-mono text-white/50 uppercase tracking-widest text-center sm:text-left">
            <div className="flex items-center gap-2">
              <Globe size={12} className="text-indigo-400 animate-pulse" />
              <span>&copy; {currentYear} <a href="https://www.linkedin.com/in/rudra-patel-265258313/" target="_blank" rel="noopener noreferrer" className="hover:text-white font-bold transition-colors">Rudra Patel</a></span>
            </div>
            <span className="hidden sm:inline border-r border-white/10 h-3" />
            <span className="text-white/40 flex items-center gap-1">Crafted with <Heart size={10} className="text-rose-500 fill-rose-500 inline" /> &amp; Precision</span>
          </div>

          {/* Back To Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-purple-400/50 text-white/70 hover:text-white transition-all duration-300 shadow-lg cursor-pointer"
            aria-label="Scroll to top"
          >
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-purple-300">Top</span>
            <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 group-hover:-translate-y-0.5 transition-transform duration-300">
              <ArrowUp size={12} />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}