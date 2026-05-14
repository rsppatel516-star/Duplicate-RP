import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ArrowLeft, Laptop, Globe } from 'lucide-react';
import { socialLinks } from '../data/socialLinks';

const featureLinks = [
  { name: 'HOME', to: '/' },
  { name: 'ARTIFACTS', to: '/artifacts' },
  { name: 'BLOG', to: '/blog' },
  { name: 'CONTACT', to: '/contact' }
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

const FeatureNavLink = ({ link, mobile, close }) => {
  const cls = mobile
    ? 'flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-display font-bold text-white/65 hover:text-white hover:bg-white/[0.06] transition-all text-base cursor-pointer'
    : 'text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300 relative group cursor-pointer';

  return (
    <RouterLink to={link.to} onClick={close} className={cls}>
      {link.name}
      {mobile && <ArrowRight size={15} className="opacity-30 shrink-0" />}
      {!mobile && <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300" />}
    </RouterLink>
  );
};

export default function FeatureNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className={`fixed z-[110] transition-all duration-500 
        ${isScrolled
          ? 'top-4 left-4 right-4 md:left-8 md:right-8 lg:top-0 lg:left-0 lg:w-full py-3 lg:py-5 bg-dark-bg/40 lg:bg-dark-bg/60 backdrop-blur-xl border border-white/10 lg:border-none lg:border-b lg:border-white/5 rounded-2xl lg:rounded-none shadow-2xl lg:shadow-none'
          : 'top-4 left-4 right-4 md:left-8 md:right-8 lg:top-0 lg:left-0 lg:w-full py-4 lg:py-8 bg-white/[0.03] lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border border-white/5 lg:border-none rounded-2xl lg:rounded-none'
        }`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-6 flex items-center justify-between gap-4">
          <RouterLink to="/" onClick={() => { window.scrollTo(0, 0); close(); }} className="flex items-center gap-2.5 shrink-0 z-10 group">
            <span className="text-white font-black text-lg md:text-xl font-bricolage tracking-tight animated-gradient-text">RUDRA</span>
          </RouterLink>

          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {featureLinks.map(link => (
              <FeatureNavLink key={link.name} link={link} mobile={false} close={close} />
            ))}
          </nav>

          <div className="flex items-center gap-4 z-10">
            <MenuButton isOpen={isMobileMenuOpen} onClick={() => setMenuOpen(v => !v)} />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-[112] lg:hidden bg-dark-bg/80 backdrop-blur-md"
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
                  EXPLORE
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
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all border border-white/10 hover:bg-white/10"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Links */}
                <nav className="px-6 py-4 flex flex-col gap-1 relative z-10 max-h-[60vh] overflow-y-auto no-scrollbar">
                  {featureLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <FeatureNavLink
                        link={link}
                        mobile
                        close={close}
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

