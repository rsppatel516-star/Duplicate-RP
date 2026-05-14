import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ArrowLeft, Laptop, Globe } from 'lucide-react';
import { socialLinks } from '../data/socialLinks';

const navLinks = [
  { name: 'INDEX', to: 'home' },
  { name: 'ALCHEMIST', to: 'about' },
  { name: 'ARSENAL', to: 'skills' },
  { name: 'CHRONICLES', to: 'experience' },
  { name: 'CAPABILITIES', to: 'services' },
  { name: 'ARTIFACTS', to: 'projects' },
  { name: 'CONTACT', to: 'contact' },
];

/* Custom Animated Hamburger Button */
const MenuButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="lg:hidden relative z-[120] w-11 h-11 rounded-xl flex items-center justify-center text-white bg-white/5 border border-white/10 transition-all hover:bg-white/10 overflow-hidden group"
      aria-label="Toggle menu"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-dark-primary/20 to-dark-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative w-5 h-4 flex flex-col justify-between items-center">
        <motion.span
          animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          className="w-full h-0.5 bg-white rounded-full origin-center"
        />
        <motion.span
          animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
          className="w-full h-0.5 bg-white rounded-full"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          className="w-full h-0.5 bg-white rounded-full origin-center"
        />
      </div>
    </button>
  );
};

/* shared scroll-link / button for a nav item */
const NavLink = ({ link, mobile, isHome, close, handleClick }) => {
  const cls = mobile
    ? 'flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-display font-bold text-white/65 hover:text-white hover:bg-white/[0.06] transition-transform-all duration-300 hover:-translate-y-1 cursor-default text-base cursor-pointer'
    : 'text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300 relative group cursor-pointer';

  return isHome ? (
    <ScrollLink to={link.to} spy smooth offset={-70} duration={800}
      onClick={close}
      activeClass={mobile ? '!text-white !bg-white/[0.06]' : '!text-white'}
      className={cls}
    >
      {link.name}
      {mobile && <ArrowRight size={15} className="opacity-30 shrink-0" />}
      {!mobile && <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300" />}
    </ScrollLink>
  ) : (
    <button onClick={() => handleClick(link.to)} className={`${cls} text-left`}>
      {link.name}
      {mobile && <ArrowRight size={15} className="opacity-30 shrink-0" />}
    </button>
  );
};

const ContactBtn = ({ full, isHome, close }) => {
  const cls = `${full ? 'w-full' : ''} flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-display font-bold text-white text-xs tracking-widest uppercase transition-all backdrop-blur-md border border-white/20`;
  const style = { background: 'linear-gradient(135deg, rgba(124,58,237,0.65), rgba(99,102,241,0.65))', boxShadow: '0 0 20px rgba(124,58,237,0.35)' };

  return isHome ? (
    <ScrollLink to="contact" smooth offset={-70} duration={800} onClick={close} className="block">
      <button className={cls} style={style}>Contact <ArrowRight size={14} /></button>
    </ScrollLink>
  ) : (
    <RouterLink to="/#contact" onClick={close}>
      <button className={cls} style={style}>Contact <ArrowRight size={14} /></button>
    </RouterLink>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isArtifactsPage = location.pathname.startsWith('/artifacts');

  /* scroll detection */
  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const close = () => setMenuOpen(false);

  const handleClick = (to) => {
    close();
    if (!isHome) navigate(`/#${to}`);
  };

  return (
    <>
      {/* ── HEADER ─────────────────────────── */}
      <header className={`fixed z-[110] transition-all duration-500 
        ${isScrolled 
          ? 'top-4 left-4 right-4 md:left-8 md:right-8 lg:top-0 lg:left-0 lg:w-full py-3 lg:py-5 bg-dark-bg/40 lg:bg-dark-bg/60 backdrop-blur-xl border border-white/10 lg:border-none lg:border-b lg:border-white/5 rounded-2xl lg:rounded-none shadow-2xl lg:shadow-none' 
          : 'top-4 left-4 right-4 md:left-8 md:right-8 lg:top-0 lg:left-0 lg:w-full py-4 lg:py-8 bg-white/[0.03] lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border border-white/5 lg:border-none rounded-2xl lg:rounded-none'
        }`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-6 flex items-center justify-between gap-4">

          {/* Logo */}
          <RouterLink to="/" onClick={() => { window.scrollTo(0, 0); close(); }}
            className="flex items-center gap-2.5 shrink-0 z-10 group">
            {/*<div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-dark-primary to-dark-secondary flex items-center justify-center text-dark-bg font-black text-sm shadow-lg group-hover:scale-110 transition-transform">
              R
            </div>*/}
            <span className="text-white font-black text-lg md:text-xl font-bricolage tracking-tight animated-gradient-text">RUDRA</span>
          </RouterLink>

          {/* Desktop centered links / Back Button */}
          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {!isArtifactsPage ? (
              navLinks.map(link => (
                <NavLink
                  key={link.name}
                  link={link}
                  mobile={false}
                  isHome={isHome}
                  close={close}
                  handleClick={handleClick}
                />
              ))
            ) : (
              <RouterLink
                to="/#projects"
                className="group flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-dark-primary hover:border-dark-primary transition-all duration-500"
              >
                <ArrowLeft size={16} className="text-dark-primary group-hover:text-dark-bg transition-colors" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 group-hover:text-dark-bg transition-colors">
                  Back to Portfolio
                </span>
              </RouterLink>
            )}
          </nav>

          {/* Right side tools */}
          <div className="flex items-center gap-4 z-10">
            {/* Hamburger — mobile only */}
            <MenuButton isOpen={isMobileMenuOpen} onClick={() => setMenuOpen(v => !v)} />
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ──────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop — blurs BG and blocks all touches */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={close}
              className="fixed inset-0 z-[112] lg:hidden"
              style={{
                background: 'rgba(2, 2, 10, 0.72)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                pointerEvents: 'all',      /* blocks all taps on background */
                touchAction: 'none',       /* prevents scroll-through on mobile */
              }}
            />

            {/* Modal panel */}
            <div className="fixed inset-0 z-[115] flex items-center justify-center p-4 lg:hidden pointer-events-none">
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="w-full max-w-md bg-[#0a0a15]/90 backdrop-blur-xl border border-white/10 rounded-[1.5rem] overflow-hidden flex flex-col shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] pointer-events-auto"
                onClick={e => e.stopPropagation()}
              >
                {/* Decorative Background Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-display font-black text-white/[0.03] pointer-events-none select-none">
                  MENU
                </div>

                {/* Header */}
                <div className="px-8 pt-8 pb-4 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm flex items-center justify-center text-dark-primary">
                      <Laptop size={25} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bricolage font-black text-white text-lg tracking-wider">MENU</span>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest animate-pulse">Explore My Work</span>
                    </div>
                  </div>
                  <button
                    onClick={close}
                    className="w-10 h-10 rounded-xl bg-white/3 flex items-center justify-center text-white/50 hover:text-white transition-all hover:bg-white/10"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Links */}
                <nav className="px-6 py-4 flex flex-col gap-1 relative z-10 max-h-[60vh] overflow-y-auto no-scrollbar">
                  {isArtifactsPage && (
                    <RouterLink
                      to="/#projects"
                      onClick={close}
                      className="flex items-center gap-4 w-full px-6 py-4 rounded-3xl bg-dark-primary/10 border border-dark-primary/20 text-dark-primary mb-2 group/back"
                    >
                      <ArrowLeft size={18} className="group-hover/back:-translate-x-1 transition-transform" />
                      <span className="font-display font-bold text-xs tracking-[0.1em] uppercase">Return to Hub</span>
                    </RouterLink>
                  )}

                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className={isArtifactsPage ? 'opacity-40 pointer-events-none' : ''}
                    >
                      <NavLink
                        link={link}
                        mobile
                        isHome={isHome}
                        close={close}
                        handleClick={handleClick}
                      />
                    </motion.div>
                  ))}
                </nav>

                {/* Footer */}
                <div className="p-2 mt-2 relative z-10 bg-white/[0.02] border-t border-white/5 rounded-t-[1rem]">
                  <div className="mt-4 mb-4 flex items-center justify-center gap-3 opacity-20 hover:opacity-40 transition-opacity">
                    <Globe size={12} className="text-white" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white">Case Study 💻</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

