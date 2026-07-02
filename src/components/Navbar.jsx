import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ArrowRight, ArrowLeft, Globe } from 'lucide-react';

const navLinks = [
  { name: 'HOME', to: 'home' },
  { name: 'ABOUT', to: 'about' },
  { name: 'SKILLS', to: 'skills' },
  { name: 'EXPERIENCE', to: 'experience' },
  { name: 'SERVICES', to: 'services' },
  { name: 'PROJECTS', to: 'projects' },
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
const NavLink = ({ link, mobile, isHome, close, handleClick, index, activeSection, setActiveSection }) => {
  const cls = mobile
    ? 'flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-display font-bold text-white/65 hover:text-white hover:bg-white/[0.06] transition-transform-all duration-300 hover:-translate-y-1 cursor-pointer text-base'
    : 'text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative py-2 px-4 flex items-center justify-center cursor-pointer';

  const content = (
    <span className="relative z-10 block text-white/60 group-hover:text-white transition-colors duration-300">
      {link.name}
    </span>
  );

  const activeCapsule = !mobile && activeSection === link.to && (
    <motion.span
      layoutId="activeTabCapsule"
      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full z-0"
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
    />
  );

  return (link.type === 'route' || link.to.startsWith('/')) ? (
    <RouterLink to={link.to} onClick={close} className={`${cls} group`}>
      {activeCapsule}
      {content}
      {mobile && <ArrowRight size={15} className="opacity-30 shrink-0" />}
    </RouterLink>
  ) : isHome ? (
    <ScrollLink
      to={link.to}
      spy
      smooth
      offset={-70}
      duration={800}
      onClick={close}
      onSetActive={() => setActiveSection(link.to)}
      activeClass={mobile ? '!text-white !bg-white/[0.06]' : ''}
      className={`${cls} group`}
    >
      {activeCapsule}
      {content}
      {mobile && <ArrowRight size={15} className="opacity-30 shrink-0" />}
    </ScrollLink>
  ) : (
    <button onClick={() => handleClick(link.to)} className={`${cls} text-left group`}>
      {activeCapsule}
      {content}
      {mobile && <ArrowRight size={15} className="opacity-30 shrink-0" />}
    </button>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [ping, setPing] = useState(24);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isArtifactsPage = location.pathname.startsWith('/artifacts');

  // Scroll Progress logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

  /* random realistic ping simulation */
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 8) + 20);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const close = () => setMenuOpen(false);

  const handleClick = (to) => {
    close();
    if (!isHome) navigate(`/#${to}`);
  };

  return (
    <>
      {/* ── SCROLL PROGRESS BAR ────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 via-indigo-500 to-pink-500 origin-left z-[130] shadow-[0_0_8px_rgba(99,102,241,0.6)]"
        style={{ scaleX }}
      />

      {/* ── HEADER ─────────────────────────── */}
      <header className={`fixed z-[110] transition-all duration-500 
        ${isScrolled
          ? 'top-4 left-4 right-4 md:left-8 md:right-8 lg:top-0 lg:left-0 lg:w-full py-3 lg:py-5 bg-dark-bg/40 lg:bg-dark-bg/60 backdrop-blur-xl border border-white/10 lg:border-none lg:border-b lg:border-white/5 rounded-2xl lg:rounded-none shadow-2xl lg:shadow-none'
          : 'top-4 left-4 right-4 md:left-8 md:right-8 lg:top-0 lg:left-0 lg:w-full py-4 lg:py-8 bg-white/[0.03] lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border border-white/5 lg:border-none rounded-2xl lg:rounded-none'
        }`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-6 flex items-center justify-between gap-4">

          {/* Logo */}
          <RouterLink to="/" onClick={() => { window.scrollTo(0, 0); close(); }}
            className="flex items-center gap-2.5 shrink-0 z-10 relative group">
            <motion.div
              animate={{
                y: [0, -5, 0],
                filter: [
                  'drop-shadow(0 0 0px rgba(124,58,237,0))',
                  'drop-shadow(0 0 15px rgba(124,58,237,0.3))',
                  'drop-shadow(0 0 0px rgba(124,58,237,0))'
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden"
            >
              <img
                src="/images/nav logo.png"
                alt="Logo"
                className="h-10 md:h-8 w-auto object-contain transition-all"
              />
            </motion.div>
          </RouterLink>

          {/* Desktop centered links / Back Button */}
          <nav className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
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
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
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
            {/* Latency Widget */}
            <div className="hidden xl:flex items-center gap-3 text-[9px] font-code text-dark-textMuted/50 border border-white/5 bg-white/[0.01] px-3.5 py-2 rounded-xl backdrop-blur-md">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                SYS: ONLINE
              </span>
              <span className="text-white/20">|</span>
              <span>PORT: 5173</span>
              <span className="text-white/20">|</span>
              <span>PING: {ping}ms</span>
            </div>

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
                pointerEvents: 'all',
                touchAction: 'none',
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
                    <img
                      src="/images/nav logo.png"
                      alt="Logo"
                      className="h-8 w-auto object-contain"
                    />
                    <div className="flex flex-col">
                      <span className="font-bricolage font-black text-white text-base tracking-wider uppercase">Menu</span>
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
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
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
