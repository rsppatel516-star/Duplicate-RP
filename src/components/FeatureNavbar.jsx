import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Globe, MessageSquare, Sparkles, X, ChevronRight } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

const featureLinks = [
  { name: 'Home', to: '/' },
  { name: 'Artifacts', to: '/artifacts' },
  { name: 'Credentials', to: '/achievements' },
  { name: 'Blog', to: '/blog' },
  { name: 'Contact', to: '/contact' }
];

/* Custom Animated Hamburger Button with Micro Morph */
const MenuButton = ({ isOpen, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className="lg:hidden relative z-[120] w-11 h-11 rounded-full flex items-center justify-center text-white bg-white/10 border border-white/15 backdrop-blur-xl transition-all hover:bg-white/20 hover:border-dark-primary/50 overflow-hidden group shadow-lg"
      aria-label="Toggle menu"
    >
      <div className="relative w-4 h-3.5 flex flex-col justify-between items-center">
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="w-full h-0.5 bg-white rounded-full origin-center"
        />
        <motion.span
          animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full h-0.5 bg-white rounded-full"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="w-full h-0.5 bg-white rounded-full origin-center"
        />
      </div>
    </motion.button>
  );
};

export default function FeatureNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Lock body scroll when mobile drawer open */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── FLOATING ISLAND GLASS NAVBAR HEADER WITH ENHANCED ANIMATIONS ─────────────────────────── */}
      <header className="fixed top-4 inset-x-0 z-[110] px-4 md:px-6 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Main Floating Glass Pill Container */}
          <motion.div
            initial={{ y: -40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-auto w-full flex items-center justify-between px-4 py-2.5 md:px-6 md:py-3 rounded-full border transition-all duration-700 relative overflow-hidden ${
              isScrolled
                ? 'bg-dark-surface/90 backdrop-blur-2xl border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_35px_rgba(99,102,241,0.18)]'
                : 'bg-white/[0.04] backdrop-blur-xl border-white/10 shadow-xl'
            }`}
          >
            {/* Animated Edge Shimmer Wave */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-dark-primary/60 to-transparent pointer-events-none"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear'
              }}
            />

            {/* Logo with Pulsing Glow & Hover Float */}
            <RouterLink
              to="/"
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); }}
              className="flex items-center gap-3 shrink-0 group relative z-10"
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  filter: [
                    'drop-shadow(0 0 0px rgba(99,102,241,0))',
                    'drop-shadow(0 0 12px rgba(99,102,241,0.4))',
                    'drop-shadow(0 0 0px rgba(99,102,241,0))'
                  ]
                }}
                transition={{
                  filter: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                  scale: { duration: 0.2 }
                }}
                className="relative overflow-hidden"
              >
                <img
                  src="/images/nav%20logo.webp"
                  alt="Rudra Patel Logo"
                  className="h-8 md:h-9 w-auto object-contain transition-all"
                />
              </motion.div>
            </RouterLink>

            {/* Desktop Center Nav Links with Stagger Entrance & Sliding Active Pill */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/10 p-1.5 rounded-full backdrop-blur-md relative">
              {featureLinks.map((link, idx) => {
                const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.05 }}
                    className="relative"
                    onMouseEnter={() => setHoveredNav(link.to)}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    <RouterLink
                      to={link.to}
                      onClick={closeMenu}
                      className={`relative z-10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-300 block ${
                        isActive ? 'text-white' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <motion.span whileHover={{ y: -1 }} className="block">
                        {link.name}
                      </motion.span>
                    </RouterLink>

                    {/* Sliding Active Pill Highlight with Spring Physics */}
                    {isActive && (
                      <motion.div
                        layoutId="featureActiveNavHighlight"
                        className="absolute inset-0 bg-gradient-to-r from-dark-primary to-indigo-600 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.6)] z-0"
                        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                      />
                    )}

                    {/* Hover Sub-Glow for Inactive Links */}
                    {!isActive && hoveredNav === link.to && (
                      <motion.div
                        layoutId="featureHoverNavHighlight"
                        className="absolute inset-0 bg-white/10 rounded-full z-0"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Action: Live Pulsing Status & Animated Contact CTA */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Status Badge with Multi-Ring Ripple */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-bold uppercase tracking-widest text-emerald-400 backdrop-blur-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>Available for Work</span>
              </motion.div>

              {/* Contact CTA with Shimmer & Magnetic Hover */}
              <div className="hidden sm:block">
                <MagneticButton>
                  <RouterLink to="/#contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative overflow-hidden px-5 py-2 rounded-full bg-gradient-to-r from-dark-primary via-purple-600 to-indigo-600 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all"
                    >
                      <span className="relative z-10">Let's Talk</span>
                      <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                      <motion.div
                        className="absolute inset-0 bg-white/20 skew-x-[30deg]"
                        animate={{ left: ['-150%', '150%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'linear' }}
                      />
                    </motion.button>
                  </RouterLink>
                </MagneticButton>
              </div>

              {/* Hamburger Button (Mobile) */}
              <MenuButton isOpen={isMobileMenuOpen} onClick={() => setMenuOpen(v => !v)} />
            </div>

          </motion.div>

        </div>
      </header>

      {/* ── MOBILE DRAWER MODAL WITH SMOOTH STAGGER ANIMATIONS ─────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
              className="fixed inset-0 z-[112] lg:hidden bg-black/80 backdrop-blur-xl"
            />

            {/* Modal Drawer */}
            <div className="fixed inset-0 z-[115] flex items-center justify-center p-4 lg:hidden pointer-events-none">
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 30 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                className="w-full max-w-md bg-dark-surface/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl pointer-events-auto relative overflow-hidden space-y-6"
                onClick={e => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <img src="/images/nav%20logo.webp" alt="Logo" className="h-7 w-auto" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/60">Navigation</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeMenu}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white"
                  >
                    <X size={18} />
                  </motion.button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-2">
                  {featureLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 + 0.1 }}
                    >
                      <RouterLink
                        to={link.to}
                        onClick={closeMenu}
                        className="flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-all group"
                      >
                        <span>{link.name}</span>
                        <ChevronRight size={16} className="text-white/30 group-hover:translate-x-1 group-hover:text-dark-primary transition-all" />
                      </RouterLink>
                    </motion.div>
                  ))}
                </nav>

                {/* Footer CTA */}
                <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                  <RouterLink to="/#contact" onClick={closeMenu}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-dark-primary to-indigo-600 text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span>Let's Talk</span>
                      <ArrowRight size={16} />
                    </motion.button>
                  </RouterLink>
                </div>

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
