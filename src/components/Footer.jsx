import React from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import {
  Github, Twitter, Linkedin,
  Youtube, Instagram, ArrowUp,
  Globe, Cpu, Code2, MapPin, Mail, Phone
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className=" border-t border-dark-border pt-18 pb-12 relative overflow-hidden">
      {/* Immersive Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-dark-primary to-transparent opacity-50" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-dark-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Signature - Takes 4 cols */}
          <div className="lg:col-span-4 space-y-8 lg:pr-8">
            <div className="flex items-center gap-4 mb-4 lg:-ml-6 ">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-dark-primary shrink-0">
                <img src='/images/about.png' alt='logo' className='w-full h-full object-cover rounded-2xl' />
              </div>
              <div>
                <h3 className="text-2xl md:text-2xl font-syne font-black text-gradient animated-gradient-text font-poppins">Rudra Patel</h3>
                {/*<p className="text-[10px] font-code text-gradient tracking-[0.3em] font-bold uppercase mt-1">BY RUDRA PATEL</p>*/}
              </div>
            </div>

            <p className="text-dark-textMuted max-w-sm leading-relaxed text-md">
              Designed and engineered with a focus on immersive digital experiences,
              high-performance code, and the Midnight Glass aesthetic.
            </p>

            <div className="flex items-center gap-4">
              {[
                { icon: <Github size={22} />, url: 'https://github.com/Rudraptl16/Rudraptl16' },
                { icon: <Linkedin size={22} />, url: 'https://www.linkedin.com/in/rudra-patel-265258313/' },
                { icon: <Instagram size={22} />, url: 'https://www.instagram.com/rudraa_ptll/' },
                { icon: <Youtube size={22} />, url: 'https://www.youtube.com/@rudrapatel4172' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-dark-textMain hover:bg-dark-primary hover:text-dark-bg hover:border-dark-primary hover:-translate-y-1 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* System Status Integration 
            <div className="pt-4 flex flex-col gap-4 relative group w-max">
               <div className="flex items-center gap-3 relative z-10 bg-dark-surface border border-dark-border py-2 px-4 rounded-full shadow-inner">
                 <div className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">Systems Online</span>
               </div>
            </div>*/}
          </div>

          {/* Quick Links - Takes 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-dark-primary flex items-center gap-2">
              <Code2 size={16} /> Quick Links
            </h4>
            <ul className="space-y-4 text-dark-textMuted font-medium text-sm font-bricolage">
              {['INDEX', 'ALCHEMIST', 'ARSENAL', 'CHRONICLES', 'CAPABILITIES', 'ARTIFACTS', 'CONTACT'].map((item) => (
                <li key={item}>
                  <ScrollLink
                    to={item.toLowerCase()}
                    smooth={true}
                    className="hover:text-white cursor-pointer transition-colors relative group inline-block"
                  >
                    <span className="relative z-10">{item}</span>
                    <span className="absolute left-0 bottom-[-2px] w-0 h-[1px] bg-dark-secondary transition-all duration-300 group-hover:w-full" />
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - Takes 3 cols */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-dark-secondary flex items-center gap-2 ">
              <Globe size={16} /> Services
            </h4>
            <ul className="space-y-4 text-dark-textMuted font-medium text-sm font-bricolage">
              <li><span className="hover:text-white cursor-default transition-colors block">Web Design</span></li>
              <li><span className="hover:text-white cursor-default transition-colors block">Web Development</span></li>
              <li><span className="hover:text-white cursor-default transition-colors block">Live website Working</span></li>
              <li><span className="hover:text-white cursor-default transition-colors block">Responsive Design</span></li>
            </ul>
          </div>

          {/* Get In Touch - Takes 3 cols */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF2E93] flex items-center gap-2">
              <Phone size={16} /> Get In Touch
            </h4>
            <ul className="space-y-5 text-dark-textMuted font-medium text-sm font-bricolage">
              <li>
                <a href="mailto:patelrudra99098@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Mail size={16} className="text-dark-primary group-hover:text-white transition-colors" />
                  patelrudra99098@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+916354825621" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <Phone size={16} className="text-dark-primary group-hover:text-white transition-colors" />
                  +91 6354 825 621
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-dark-primary mt-0.5 shrink-0" />
                  <span className="text-dark-textMain font-bold">Vadodara, Gujarat, India</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Big Watermark Logo (Marquee) - Syne Font */}
        <div className="relative -mb-10 opacity-[0.04] select-none pointer-events-none overflow-hidden flex border-y border-white/5 py-4">
          <motion.div
            className="flex whitespace-nowrap animated-gradient-text"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            <h2 className="text-[20vw] md:text-[12vw] font-display font-black leading-none pr-12 shrink-0 tracking-tighter-tight ">
              R u d r a P a t e l <span className="opacity-20 px-8 text-dark-primary"></span>
            </h2>
            <h2 className="text-[20vw] md:text-[12vw] font-display font-black leading-none pr-12 shrink-0 tracking-tighter-tight ">
              R u d r a P a t e l <span className="opacity-20 px-8 text-dark-primary"></span>
            </h2>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-3 mt-10 border-t border-dark-border flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-[10px] font-code text-dark-textMuted uppercase tracking-widest text-center md:text-left animated-gradient-text">
            <Globe size={18} className="text-dark-primary hidden md:block" />
            <span>&copy; {currentYear} <a href="https://www.linkedin.com/in/rudra-patel-265258313/">Rudra Patel.</a></span>
            <span className="hidden md:inline border-r border-dark-border h-3" />
            <span>Built with precision and passion.</span>
            <span className="hidden md:inline border-r border-dark-border h-3" />
            <span>All rights reserved.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-2 "
          >
            <div className="w-10 h-10 rounded-xl bg-dark-bg/50 border border-dark-border flex items-center justify-center text-dark-textMain group-hover:border-dark-primary group-hover:text-dark-primary transition-all duration-500 overflow-hidden relative ">
              <div className="absolute inset-0 bg-dark-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <ArrowUp size={16} className=" transition-transform relative z-10" />
            </div>
            <span className="text-[9px] font-bold tracking-widest uppercase opacity-50 group-hover:opacity-100 transition-opacity">Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

