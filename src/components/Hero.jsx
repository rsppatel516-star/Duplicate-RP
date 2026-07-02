import React, { useState, useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { Github, Linkedin, Instagram, Youtube, Facebook, ArrowRight, Code, Terminal, Camera, ShieldAlert } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import InteractiveOrbs from './canvas/InteractiveOrbs';

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100082469136911', color: '#1877f2' },
  { icon: Instagram, href: 'https://www.instagram.com/rudraa_ptll/', color: '#B72B5F' },
  { icon: Github, href: 'https://github.com/Rudraptl16', color: '#ffffff' },
  { icon: Youtube, href: 'https://www.youtube.com/@rudrapatel4172', color: '#ff0000' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/rudrapatel816/', color: '#0077b5' },
];

export default function Hero() {
  const [showBadge, setShowBadge] = useState(true);
  const [activeTab, setActiveTab] = useState('json'); // 'json' | 'terminal' | 'visual'
  const [commandInput, setCommandInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'output', text: 'Initializing neural link...' },
    { type: 'output', text: 'System diagnostics: Nominal.' },
    { type: 'output', text: 'Type "help" to list available commands.' },
  ]);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBadge(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll terminal history to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cleanCmd = commandInput.trim().toLowerCase();
    if (!cleanCmd) return;

    let response = [];
    switch (cleanCmd) {
      case 'help':
        response = [
          { type: 'input', text: commandInput },
          { type: 'output', text: 'Available commands:' },
          { type: 'info', text: '  bio      - Read biography summary.' },
          { type: 'info', text: '  skills   - Output core technology arsenal.' },
          { type: 'info', text: '  contact  - Secure transmission coordinates.' },
          { type: 'info', text: '  clear    - Flush terminal console buffer.' }
        ];
        break;
      case 'bio':
        response = [
          { type: 'input', text: commandInput },
          { type: 'output', text: 'Rudra Patel — Digital Architect & Creative Full-Stack Engineer based in India.' },
          { type: 'output', text: 'Specializes in SwiftUI/iOS ecosystems, advanced React applications, and node APIs.' }
        ];
        break;
      case 'skills':
        response = [
          { type: 'input', text: commandInput },
          { type: 'output', text: 'Core Arsenal:' },
          { type: 'info', text: '  Languages: Swift, JavaScript, HTML/CSS, Java' },
          { type: 'info', text: '  Frameworks: SwiftUI, React, Next.js, Express' },
          { type: 'info', text: '  Platforms: AWS, Vercel, Firebase, MongoDB' }
        ];
        break;
      case 'contact':
        response = [
          { type: 'input', text: commandInput },
          { type: 'output', text: 'Email: patelrudra99098@gmail.com' },
          { type: 'output', text: 'Ping established. Secure form active in footer section.' }
        ];
        break;
      case 'clear':
        setTerminalHistory([]);
        setCommandInput('');
        return;
      default:
        response = [
          { type: 'input', text: commandInput },
          { type: 'error', text: `Command not found: "${cleanCmd}". Type "help" for support.` }
        ];
    }

    setTerminalHistory(prev => [...prev, ...response]);
    setCommandInput('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Pre-compiled JSON Bio
  const jsonBio = `{
  "identity": "Rudra Patel",
  "discipline": "Digital Architect",
  "education": {
    "degree": "B.Tech CSE",
    "university": "Parul University"
  },
  "focus": [
    "High-fidelity UI/UX",
    "MVVM iOS Architectures",
    "Reactive Web Interfaces"
  ],
  "status": "open_for_projects"
}`;

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center overflow-hidden pt-36 pb-20"
      style={{ background: '#050510' }}
    >
      {/* 3D Floating Orbs Layer */}
      <InteractiveOrbs />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        
        {/* ── LEFT: Text Content ─────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          {/* Social Icons Row */}
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 mb-4"
          >
            {socialLinks.map(({ icon: Icon, href, color }, i) => (
              <motion.div key={i} variants={itemVariants}>
                <MagneticButton>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow on social media`}
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 overflow-hidden"
                    >
                      <Icon
                        className="w-5 h-5 md:w-6 md:h-6 relative z-10 transition-transform duration-500 group-hover:scale-110"
                        style={{ color }}
                        strokeWidth={2}
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle 50px at center, ${color}33, transparent)`,
                        }}
                      />
                      <div
                        className="absolute bottom-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                        style={{ backgroundColor: color }}
                      />
                    </motion.div>
                  </a>
                </MagneticButton>
              </motion.div>
            ))}
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="space-y-1">
            <TypeAnimation
              sequence={["Hi, I'm Rudra\nPatel", 0]}
              wrapper="h1"
              speed={60}
              repeat={0}
              cursor={false}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter whitespace-pre-line text-[#6366f1] leading-none"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <TypeAnimation
              sequence={[
                'iOS Developer', 2200,
                'Full Stack Developer', 2200,
                'Creative Engineer', 2200,
                'UI Designer', 2200,
              ]}
              wrapper="p"
              speed={60}
              repeat={Infinity}
              className="text-2xl md:text-3xl font-bold font-display tracking-wide text-indigo-400"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-display text-white/50 text-lg md:text-xl max-w-md leading-relaxed tracking-wide"
          >
            Building high-performance web & mobile experiences 🚀 that drive engagement 📈 and conversions 💡
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants} className="pt-6">
            <MagneticButton>
              <ScrollLink to="contact" smooth duration={1000} className="cursor-pointer block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group font-display flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-sm tracking-[0.2em] uppercase transition-all duration-500 overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]"
                >
                  <span className="absolute inset-0 bg-white/10 group-hover:bg-white/25 transition-colors duration-500" />
                  <span className="absolute inset-[1px] bg-black/40 backdrop-blur-xl rounded-[15px] z-0 transition-all duration-500 group-hover:bg-black/40" />
                  <span className="absolute top-0 -left-[100%] h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[sweep_1.5s_ease-in-out_infinite]" />
                  <span className="relative z-10 flex items-center gap-3 text-white/70 group-hover:text-white transition-colors duration-300">
                    Connect With Me
                    <ArrowRight size={18} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </span>
                </motion.button>
              </ScrollLink>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Multi-Tab Developer Console ─────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="order-1 lg:order-2 w-full max-w-[500px] justify-self-center lg:justify-self-end"
        >
          {/* Main Console Frame */}
          <div className="relative w-full aspect-[4/3] md:aspect-[5/4] rounded-3xl overflow-hidden border border-white/10 bg-black/45 backdrop-blur-xl shadow-2xl flex flex-col">
            
            {/* Console Header Bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/[0.02]">
              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              
              {/* Console Tabs */}
              <div className="flex items-center bg-white/5 border border-white/5 p-1 rounded-xl gap-1">
                <button
                  onClick={() => setActiveTab('json')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-code font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'json' ? 'bg-indigo-500/25 text-indigo-300 border border-indigo-500/30' : 'text-dark-textMuted hover:text-white'
                  }`}
                >
                  <Code size={11} /> bio.json
                </button>
                <button
                  onClick={() => setActiveTab('terminal')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-code font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'terminal' ? 'bg-indigo-500/25 text-indigo-300 border border-indigo-500/30' : 'text-dark-textMuted hover:text-white'
                  }`}
                >
                  <Terminal size={11} /> console.sh
                </button>
                <button
                  onClick={() => setActiveTab('visual')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-code font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'visual' ? 'bg-indigo-500/25 text-indigo-300 border border-indigo-500/30' : 'text-dark-textMuted hover:text-white'
                  }`}
                >
                  <Camera size={11} /> camera.raw
                </button>
              </div>
            </div>

            {/* Console Screen Body */}
            <div className="flex-grow p-6 overflow-y-auto font-code text-xs md:text-sm leading-relaxed relative select-none">
              
              <AnimatePresence mode="wait">
                {/* 1. JSON bio */}
                {activeTab === 'json' && (
                  <motion.div
                    key="json"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="h-full text-indigo-200"
                  >
                    <pre className="overflow-x-auto whitespace-pre-wrap">
                      <span className="text-pink-400">{"{"}</span>
                      <br />
                      {"  "}
                      <span className="text-blue-400">"identity"</span>:{" "}
                      <span className="text-green-400">"Rudra Patel"</span>,
                      <br />
                      {"  "}
                      <span className="text-blue-400">"discipline"</span>:{" "}
                      <span className="text-green-400">"Digital Architect"</span>,
                      <br />
                      {"  "}
                      <span className="text-blue-400">"education"</span>:{" "}
                      <span className="text-pink-400">{"{"}</span>
                      <br />
                      {"    "}
                      <span className="text-blue-400">"degree"</span>:{" "}
                      <span className="text-green-400">"B.Tech CSE"</span>,
                      <br />
                      {"    "}
                      <span className="text-blue-400">"university"</span>:{" "}
                      <span className="text-green-400">"Parul University"</span>
                      <br />
                      {"  "}
                      <span className="text-pink-400">{"}"}</span>,
                      <br />
                      {"  "}
                      <span className="text-blue-400">"focus"</span>:{" "}
                      <span className="text-pink-400">{"["}</span>
                      <br />
                      {"    "}
                      <span className="text-green-400">"High-fidelity UI/UX"</span>,
                      <br />
                      {"    "}
                      <span className="text-green-400">"MVVM iOS Architectures"</span>,
                      <br />
                      {"    "}
                      <span className="text-green-400">"Reactive Web Interfaces"</span>
                      <br />
                      {"  "}
                      <span className="text-pink-400">{"]"}</span>,
                      <br />
                      {"  "}
                      <span className="text-blue-400">"status"</span>:{" "}
                      <span className="text-green-400">"open_for_projects"</span>
                      <br />
                      <span className="text-pink-400">{"}"}</span>
                    </pre>
                  </motion.div>
                )}

                {/* 2. Interactive Terminal */}
                {activeTab === 'terminal' && (
                  <motion.div
                    key="terminal"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col justify-between"
                  >
                    <div className="flex-grow space-y-2 overflow-y-auto max-h-[220px] pr-2 scrollbar-thin">
                      {terminalHistory.map((item, idx) => (
                        <div key={idx} className="font-code">
                          {item.type === 'input' && (
                            <span className="text-indigo-400">
                              rudra@portfolio:~$ <span className="text-white">{item.text}</span>
                            </span>
                          )}
                          {item.type === 'output' && (
                            <span className="text-emerald-400">{item.text}</span>
                          )}
                          {item.type === 'info' && (
                            <span className="text-dark-textMuted">{item.text}</span>
                          )}
                          {item.type === 'error' && (
                            <span className="text-red-400 flex items-center gap-1.5">
                              <ShieldAlert size={14} /> {item.text}
                            </span>
                          )}
                        </div>
                      ))}
                      <div ref={terminalEndRef} />
                    </div>

                    <form onSubmit={handleCommandSubmit} className="mt-4 border-t border-white/5 pt-3 flex items-center gap-2">
                      <span className="text-indigo-400 shrink-0">rudra@portfolio:~$</span>
                      <input
                        type="text"
                        value={commandInput}
                        onChange={(e) => setCommandInput(e.target.value)}
                        className="flex-grow bg-transparent border-none outline-none focus:ring-0 text-white font-code"
                        placeholder="Type 'help'..."
                        autoFocus
                      />
                    </form>
                  </motion.div>
                )}

                {/* 3. Live Camera Scanner */}
                {activeTab === 'visual' && (
                  <motion.div
                    key="visual"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 p-4"
                  >
                    <div className="w-full h-full rounded-2xl overflow-hidden relative border border-emerald-500/20 bg-emerald-950/5 group">
                      <img
                        src="/images/DSC06139.JPG"
                        alt="Rudra Patel"
                        className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-95 opacity-80"
                      />
                      
                      {/* Scanline Effect */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none" />
                      
                      {/* Sweeping green scanner line */}
                      <motion.div
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        className="absolute left-0 w-full h-[1.5px] bg-emerald-400 shadow-[0_0_12px_#34d399] z-10 pointer-events-none"
                      />

                      {/* HUD Overlays */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">LIVE_FEED_CAM_01</span>
                      </div>
                      
                      <div className="absolute bottom-4 right-4 text-[7px] font-code text-emerald-400/60 text-right">
                        <span>RES: 1920X1080</span>
                        <br />
                        <span>ZOOM: 1.2X</span>
                      </div>

                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-emerald-400/20 w-16 h-16 rounded-full flex items-center justify-center pointer-events-none">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </motion.div>

      </div>

      {/* Welcome Badge */}
      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="absolute top-24 md:top-auto md:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 z-50 w-max"
          >
            <div id="homeWelcomeBadge" className="bg-white/5 backdrop-blur-2xl border border-white/10 px-6 py-3 lg:px-8 lg:py-4 rounded-2xl flex flex-col relative overflow-hidden group hover:border-white/20 transition-all" aria-live="polite" role="status">
              <div className="flex items-center gap-3 z-10 mb-[2px]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                </span>
                <span className="text-white/90 font-display font-medium text-sm lg:text-base tracking-wide whitespace-nowrap">Welcome to Case Study 💻</span>
              </div>
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-violet-600 to-indigo-400"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
