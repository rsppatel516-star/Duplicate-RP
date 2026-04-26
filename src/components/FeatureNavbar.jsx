import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, MessageSquare } from 'lucide-react';

const featureLinks = [
  { name: 'HOME', to: '/' },
  { name: 'ARTIFACTS', to: '/artifacts' },
  { name: 'BLOG', to: '/blog' },
];

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

const ContactBtn = ({ full, close }) => {
  const cls = `${full ? 'w-full' : ''} flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-display font-bold text-white text-xs tracking-widest uppercase transition-all backdrop-blur-md border border-white/20`;
  const style = { background: 'linear-gradient(135deg, rgba(124,58,237,0.65), rgba(99,102,241,0.65))', boxShadow: '0 0 20px rgba(124,58,237,0.35)' };

  return (
    <RouterLink to="/#contact" onClick={close}>
      <button className={cls} style={style}>Contact <ArrowRight size={14} /></button>
    </RouterLink>
  );
};

export default function FeatureNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 50);
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
      <header className={`fixed top-0 left-0 w-full z-[110] transition-all duration-500 ${isScrolled ? ' backdrop-blur-xl py-5 shadow-lg' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-4">
          <RouterLink to="/" onClick={() => { window.scrollTo(0, 0); close(); }} className="flex items-center gap-2.5 shrink-0 z-10">
            <span className="text-white font-display font-black text-lg tracking-tight font-syne animated-gradient-text">RUDRA<span className="text-dark-primary"> </span></span>
          </RouterLink>

          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {featureLinks.map(link => (
              <FeatureNavLink key={link.name} link={link} mobile={false} close={close} />
            ))}
          </nav>

          <div className="flex items-center gap-4 z-10">
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="lg:hidden relative z-[120] w-10 h-10 rounded-xl flex items-center justify-center text-white border border-white/10 transition-all"
              style={{ background: isMobileMenuOpen ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.05)' }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </AnimatePresence>
            </button>
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
              className="fixed inset-0 z-[112] lg:hidden bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[78vw] max-w-[300px] z-[115] flex flex-col lg:hidden bg-dark-bg/95 backdrop-blur-2xl border-l border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <span className="font-display font-black text-white text-sm tracking-widest uppercase">Menu</span>
                <button onClick={close} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                  <X size={17} />
                </button>
              </div>

              <nav className="flex flex-col px-4 py-4 gap-1 flex-grow overflow-y-auto">
                {featureLinks.map((link, i) => (
                  <motion.div key={link.name} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <FeatureNavLink link={link} mobile close={close} />
                  </motion.div>
                ))}
              </nav>

              <div className="px-4 py-5 border-t border-white/[0.06] space-y-3 ">
                <div className="flex items-center gap-2 px-1 ">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-[10px] font-display font-bold uppercase tracking-widest text-white/30">Available for projects</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
