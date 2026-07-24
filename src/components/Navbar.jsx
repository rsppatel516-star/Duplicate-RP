import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ArrowLeft, Laptop, Globe } from 'lucide-react';
import { socialLinks } from '../data/socialLinks';

const navLinks = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Experience', to: 'experience' },
  { name: 'Services', to: 'services' },
  { name: 'Projects', to: 'projects' },
  { name: 'Contact', to: 'contact' },
];

/* Custom Animated Hamburger Button */
const MenuButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="lg:hidden relative z-[120] w-11 h-11 rounded-xl flex items-center justify-center text-white  border border-white/5 transition-all hover:bg-white/10 overflow-hidden group"
      aria-label="Toggle menu"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-dark-primary/20 to-dark-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative w-5 h-4 flex flex-col justify-between items-center">
        <motion.span
          animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          className="w-full h-0.5 bg-white rounded-xl origin-center"
        />
        <motion.span
          animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
          className="w-full h-0.5 bg-white rounded-xl"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          className="w-full h-0.5 bg-white rounded-xl origin-center"
        />
      </div>
    </button>
  );
};

/* shared scroll-link / button for a nav item */
const NavLink = ({ link, mobile, isHome, close, handleClick, index }) => {
  const cls = mobile
    ? 'flex items-center justify-between w-full px-4 py-3 rounded-xl font-display font-bold text-white/65 hover:text-white hover:bg-white/[0.5] transition-all text-base cursor-pointer'
    /* Navbar link hover effect*/
    : 'px-4 py-2 rounded-xl font-display text-sm font-semibold tracking-wide text-white/75 hover:text-white hover:bg-white/10 transition-all duration-300 relative cursor-pointer select-none';

  const activeCls = mobile
    ? '!text-white !bg-[#3f38b0]'
    : '!text-white !bg-gradient-to-r !from-indigo-600 !via-purple-600 !to-indigo-500 font-bold px-5 py-2 !rounded-xl';

  const content = (
    <span className="relative z-10 block whitespace-nowrap">
      {link.name}
    </span>
  );

  return (link.type === 'route' || link.to.startsWith('/')) ? (
    <RouterLink to={link.to} onClick={close} className={cls}>
      {content}
      {mobile && <ArrowRight size={15} className="opacity-30 shrink-0" />}
    </RouterLink>
  ) : isHome ? (
    <ScrollLink to={link.to} spy smooth offset={-80} duration={800}
      onClick={close}
      activeClass={activeCls}
      className={cls}
    >
      {content}
      {mobile && <ArrowRight size={15} className="opacity-30 shrink-0" />}
    </ScrollLink>
  ) : (
    <button onClick={() => handleClick(link.to)} className={`${cls} text-left`}>
      {content}
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
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed z-[110] left-0 right-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center px-4 md:px-8
        ${isScrolled ? 'top-3 md:top-4' : 'top-4 lg:top-5'}`}
      >
        <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between gap-4 w-full relative overflow-hidden
          ${isScrolled
            ? 'max-w-6xl py-2.5 px-4 md:px-6 bg-[#040510]/60 backdrop-blur-[36px] border border-white/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.2)]'
            : 'max-w-7xl py-2.5 px-5 lg:px-6 bg-transparent border-none rounded-none shadow-none'
          }`}>

          {/* Liquid Ambient Glowing Orbs (visible when scrolled) */}
          <AnimatePresence>
            {isScrolled && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none -z-10"
              >
                <motion.div
                  animate={{
                    x: ['-30%', '90%', '-30%'],
                    y: ['-40%', '40%', '-40%'],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-10 left-0 w-44 h-44 bg-gradient-to-r from-purple-600/30 via-indigo-500/20 to-pink-500/30 rounded-full blur-3xl pointer-events-none"
                />
                <motion.div
                  animate={{
                    x: ['90%', '-30%', '90%'],
                    y: ['40%', '-40%', '40%'],
                    scale: [1.2, 0.9, 1.2],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -bottom-10 right-0 w-48 h-48 bg-gradient-to-r from-cyan-500/20 via-blue-600/30 to-violet-600/25 rounded-xl blur-3xl pointer-events-none"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logo Branding */}
          <RouterLink to="/" onClick={() => { window.scrollTo(0, 0); close(); }}
            className="flex items-center gap-3 shrink-0 z-10 relative group">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center gap-3"
            >
              {/* Avatar Icon Box */}
              <div className="relative shrink-0">
                <div className="w-10 h-10 md:w-11 md:h-11 transition-all duration-500 overflow-hidden">
                  <img
                    src="/images/navbar-avatar.webp"
                    alt="Rudra Patel"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Brand Text */}
              <div className="flex flex-col">
                <span className="font-bricolage font-black text-lg md:text-xl text-white tracking-tight leading-none group-hover:text-indigo-300 transition-colors duration-300">
                  Rudra<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-extrabold ml-0.5">.</span>
                </span>
              </div>
            </motion.div>
          </RouterLink>

          {/* Desktop Links / Liquid Pill Capsule Navigation */}
          <nav className="hidden lg:flex items-center gap-1 rounded-xl relative overflow-hidden group/nav">
            {!isArtifactsPage ? (
              navLinks.map((link, i) => (
                <NavLink
                  key={link.name}
                  link={link}
                  mobile={false}
                  isHome={isHome}
                  close={close}
                  handleClick={handleClick}
                  index={i}
                />
              ))
            ) : (
              <RouterLink
                to="/#projects"
                className="group flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-dark-primary hover:border-dark-primary transition-all duration-500"
              >
                <ArrowLeft size={16} className="text-dark-primary group-hover:text-dark-bg transition-colors" />
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/80 group-hover:text-dark-bg transition-colors">
                  Back to Portfolio
                </span>
              </RouterLink>
            )}
          </nav>

          {/* Right side tools */}
          <div className="flex items-center gap-3 z-10">
            {/* Quick Contact / Hire Me CTA button on desktop */}
            {isHome && (
              <ScrollLink to="contact" smooth offset={-80} duration={800} className="hidden sm:block">
                <motion.button
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex items-center gap-2 px-4.5 py-2 rounded-xl bg-gradient-to-r from-purple-600/40 via-indigo-600/40 to-purple-600/40 border border-white/20 backdrop-blur-xl text-white text-xs font-bold font-display tracking-wider hover:from-purple-600 hover:to-indigo-600 hover:border-white/40 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.35),inset_0_1px_1px_rgba(255,255,255,0.25)]"
                >
                  <span>Hire Me</span>
                  <ArrowRight size={13} className="text-indigo-300 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </ScrollLink>
            )}

            {/* Mobile Hamburger */}
            <MenuButton isOpen={isMobileMenuOpen} onClick={() => setMenuOpen(v => !v)} />
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE DRAWER ──────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop — total blur background */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={close}
              className="fixed inset-0 z-[112] lg:hidden"
              style={{
                background: 'rgba(2, 2, 10, 0.78)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                pointerEvents: 'all',      /* blocks all taps on background */
                touchAction: 'none',       /* prevents scroll-through on mobile */
              }}
            />

            {/* Modal Liquid Panel */}
            <div className="fixed inset-0 z-[115] flex items-center justify-center p-4 lg:hidden pointer-events-none">
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="w-full max-w-md bg-[#050612]/75 backdrop-blur-[36px] border border-white/15 rounded-2xl overflow-hidden flex flex-col shadow-[0_32px_80px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.2)] relative pointer-events-auto"
                onClick={e => e.stopPropagation()}
              >
                {/* Liquid Ambient Glowing Orbs inside Mobile Drawer */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none -z-10">
                  <motion.div
                    animate={{
                      x: ['-40%', '80%', '-40%'],
                      y: ['-40%', '60%', '-40%'],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -top-10 -left-10 w-56 h-56 bg-gradient-to-r from-purple-600/35 via-indigo-500/25 to-pink-500/30 rounded-full blur-3xl pointer-events-none"
                  />
                  <motion.div
                    animate={{
                      x: ['80%', '-40%', '80%'],
                      y: ['60%', '-40%', '60%'],
                      scale: [1.3, 0.9, 1.3],
                    }}
                    transition={{
                      duration: 14,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -bottom-10 -right-10 w-60 h-60 bg-gradient-to-r from-cyan-500/25 via-blue-600/30 to-violet-600/35 rounded-xl blur-3xl pointer-events-none"
                  />
                </div>

                {/* Decorative Background Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-display font-black text-white/[0.03] pointer-events-none select-none">
                  MENU
                </div>

                {/* Header */}
                <div className="px-8 pt-8 pb-4 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl p-0.5 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                      <img
                        src="/images/navbar-avatar.webp"
                        alt="Avatar"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bricolage font-black text-white text-base tracking-wider uppercase">Menu</span>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest animate-pulse">Explore My Work</span>
                    </div>
                  </div>
                  <button
                    onClick={close}
                    className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all hover:bg-white/10"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Links */}
                <nav className="px-6 py-4 flex flex-col gap-1.5 relative z-10 max-h-[60vh] overflow-y-auto no-scrollbar">
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

                {/* Footer Liquid CTA */}
                <div className="p-5 relative z-10 bg-white/[0.03] border-t border-white/10 flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-3 opacity-30 hover:opacity-50 transition-opacity">
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

