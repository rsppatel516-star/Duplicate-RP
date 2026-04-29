import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ArrowLeft } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'INDEX', to: 'home' },
  { name: 'ALCHEMIST', to: 'about' },
  { name: 'ARSENAL', to: 'skills' },
  { name: 'CHRONICLES', to: 'experience' },
  { name: 'CAPABILITIES', to: 'services' },
  { name: 'ARTIFACTS', to: 'projects' },
  { name: 'CONTACT', to: 'contact' },
];

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
    const fn = () => setIsScrolled(window.scrollY > 50);
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
      <header className={`fixed top-0 left-0 w-full z-[110] transition-all duration-500 ${isScrolled ? ' backdrop-blur-xl py-5 shadow-lg' : 'bg-transparent py-5'
        }`}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-4">

          {/* Logo */}
          <RouterLink to="/" onClick={() => { window.scrollTo(0, 0); close(); }}
            className="flex items-center gap-2.5 shrink-0 z-10">
            <span className="text-white dark:text-white font-display font-black text-lg tracking-tight font-syne animated-gradient-text">RUDRA<span className="text-dark-primary"> </span></span>
          </RouterLink>

          {/* Desktop centered links / Back Button */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
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
                className="group flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-dark-primary hover:border-dark-primary transition-all duration-500"
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
            <button
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
              className="lg:hidden relative z-[120] w-10 h-10 rounded-xl flex items-center justify-center text-white border border-white/10 transition-all"
              style={{ background: isMobileMenuOpen ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.05)' }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={20} /></motion.span>
                  : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu size={20} /></motion.span>
                }
              </AnimatePresence>
            </button>
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

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[78vw] max-w-[300px] z-[115] flex flex-col lg:hidden"
              style={{
                background: 'rgba(7, 7, 18, 0.98)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                borderLeft: '1px solid rgba(255,255,255,0.07)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <span className="font-display font-black text-white text-sm tracking-widest uppercase">Menu</span>
                <button onClick={close} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                  <X size={17} />
                </button>
              </div>

              {/* Links / Back Button */}
              <nav className="flex flex-col px-4 py-4 gap-1 flex-grow overflow-y-auto">
                {isArtifactsPage && (
                  <RouterLink
                    to="/#projects"
                    onClick={close}
                    className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl bg-dark-primary/10 border border-dark-primary/20 text-dark-primary mb-4"
                  >
                    <ArrowLeft size={18} />
                    <span className="font-display font-bold text-sm tracking-widest uppercase">Back to Portfolio</span>
                  </RouterLink>
                )}

                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className={isArtifactsPage ? 'opacity-50 grayscale pointer-events-none' : ''}
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
              <div className="px-4 py-5 border-t border-white/[0.06] space-y-3">
                <ContactBtn full isHome={isHome} close={close} />
                <div className="flex items-center gap-2 px-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-[10px] font-display font-bold uppercase tracking-widest text-white/30">Open for Collaboration</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
