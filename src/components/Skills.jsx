import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../data/skills';
import { projects } from '../data/projects';
import {
  Code, Code2, Layout, Server, Smartphone, Cloud,
  Database, Cpu, Layers, ChevronRight, Zap, Target, Bot, Sparkles, BrainCircuit,
  Search, X, ExternalLink, Globe
} from 'lucide-react';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPhp, FaJava,
  FaFigma, FaAws, FaGithub,
  FaSwift
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTailwindcss, SiExpress, SiFlutter, SiMongodb,
  SiMysql, SiFirebase, SiVercel, SiPostman, SiDart, SiDocker, SiOpenai
} from 'react-icons/si';
import { BiServer } from 'react-icons/bi';
import { DiGit } from 'react-icons/di';
import { TbBrandReactNative, TbBrandVscode } from 'react-icons/tb';
import GridBackground from './ui/GridBackground';
import MagneticButton from './ui/MagneticButton';

const iconMap = {
  html5: <FaHtml5 />,
  css3: <FaCss3Alt />,
  javascript: <FaJs />,
  react: <FaReact />,
  nextjs: <SiNextdotjs />,
  tailwindcss: <SiTailwindcss />,
  nodejs: <FaNodeJs />,
  express: <SiExpress />,
  api: <BiServer />,
  php: <FaPhp />,
  java: <FaJava />,
  flutter: <SiFlutter />,
  swift: <FaSwift />,
  reactnative: <TbBrandReactNative />,
  dart: <SiDart />,
  mongodb: <SiMongodb />,
  mysql: <SiMysql />,
  firebase: <SiFirebase />,
  git: <DiGit />,
  github: <FaGithub />,
  vscode: <TbBrandVscode />,
  figma: <FaFigma />,
  vercel: <SiVercel />,
  postman: <SiPostman />,
  aws: <FaAws />,
  docker: <SiDocker />,
  storyboard: <Layers />,
  mobiledesign: <Smartphone />,
  uikit: <Layout />,
  openai: <SiOpenai />,
  antigravity: <img src="/antigravity-skill.svg" alt="Antigravity" className="w-[1em] h-[1em] inline-block object-contain" />,
  gemini: <img src="/gemini-skill.svg" alt="Gemini" className="w-[1em] h-[1em] inline-block object-contain" />,
  copilot: <FaGithub />,
  claude: <img src="/claude-skill.svg" alt="Claude AI" className="w-[1em] h-[1em] inline-block object-contain" />
};

const techColors = {
  html5: 'text-[#E34F26]', css3: 'text-[#1572B6]', javascript: 'text-[#F7DF1E]',
  react: 'text-[#61DAFB]', nextjs: 'text-white', tailwindcss: 'text-[#06B6D4]',
  nodejs: 'text-[#339933]', express: 'text-white', api: 'text-[#00E5FF]',
  php: 'text-[#777BB4]', java: 'text-[#007396]', flutter: 'text-[#02569B]',
  reactnative: 'text-[#61DAFB]', dart: 'text-[#0175C2]', mongodb: 'text-[#47A248]',
  mysql: 'text-[#4479A1]', firebase: 'text-[#FFCA28]', git: 'text-[#F05032]',
  github: 'text-white', vscode: 'text-[#007ACC]', figma: 'text-[#F24E1E]',
  vercel: 'text-white', postman: 'text-[#FF6C37]', aws: 'text-[#FF9900]',
  docker: 'text-[#2496ED]', swift: 'text-[#FA7343]',
  storyboard: 'text-[#818CF8]', mobiledesign: 'text-[#F43F5E]',
  uikit: 'text-[#2AC3FF]',
  openai: 'text-[#10A37F]', antigravity: 'text-[#3186FF]', gemini: 'text-[#8E75FF]', copilot: 'text-white', claude: 'text-[#D97757]'
};

const techHexColors = {
  html5: '#E34F26', css3: '#1572B6', javascript: '#F7DF1E',
  react: '#61DAFB', nextjs: '#ffffff', tailwindcss: '#06B6D4',
  nodejs: '#339933', express: '#ffffff', api: '#00E5FF',
  php: '#777BB4', java: '#007396', flutter: '#02569B',
  reactnative: '#61DAFB', dart: '#0175C2', mongodb: '#47A248',
  mysql: '#4479A1', firebase: '#FFCA28', git: '#F05032',
  github: '#ffffff', vscode: '#007ACC', figma: '#F24E1E',
  vercel: '#ffffff', postman: '#FF6C37', aws: '#FF9900',
  docker: '#2496ED', swift: '#FA7343',
  storyboard: '#818CF8', mobiledesign: '#F43F5E',
  uikit: '#2AC3FF',
  openai: '#10A37F', antigravity: '#3186FF', gemini: '#8E75FF', copilot: '#ffffff', claude: '#D97757'
};

const categoryIcons = {
  'Frontend': <Layout size={14} />,
  'Backend': <Server size={14} />,
  'Mobile': <Smartphone size={14} />,
  'Database': <Database size={14} />,
  'Tools & Platforms': <Layers size={14} />,
  'Cloud & DevOps': <Cloud size={14} />,
  'AI Tools': <Bot size={14} />,
};

const FilterButton = ({ cat, activeTab, onSelect, icon }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { left, top } = buttonRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <MagneticButton onClick={onSelect}>
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        className={`relative flex items-center gap-3 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 border overflow-hidden group/btn cursor-pointer ${activeTab === cat
          ? 'text-white border-violet-500/50 shadow-[0_0_25px_rgba(124,58,237,0.25)]'
          : ' bg-white/[0.01] border-white/5 hover:border-violet-500/30 text-dark-textMuted hover:text-white'
          }`}
      >
        {activeTab === cat && (
          <motion.div
            layoutId="activeSkillTab"
            className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/35 backdrop-blur-md"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}

        <div
          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.25), transparent)`,
          }}
        />

        <span className="relative z-10 flex items-center gap-3">
          {icon}
          {cat}
        </span>
      </button>
    </MagneticButton>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.99, 1],
    },
  },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skills[0].category);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = skills.map(s => s.category);

  // Flattened system technologies for global querying
  const allSkills = skills.flatMap(cat =>
    cat.technologies.map(t => ({ ...t, category: cat.category }))
  );

  const filteredSkills = searchQuery.trim() === ''
    ? skills.find(s => s.category === activeTab)?.technologies || []
    : allSkills.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Dynamic system project matcher for the project count stamp
  const getRelatedProjectsCount = (techName) => {
    if (!techName) return 0;

    const isMatch = (projSkill, selectedName) => {
      const p = projSkill.toLowerCase().trim();
      const t = selectedName.toLowerCase().trim();
      if (p === t) return true;

      // Standardize naming variants (React/React.js, Express/Express.js, HTML5/HTML, CSS3/CSS)
      const normalize = (name) => {
        return name.toLowerCase()
          .replace(/\.js$/, '')
          .replace(/5$/, '')
          .replace(/3$/, '')
          .replace(/[^a-z0-9]/g, '');
      };

      return normalize(projSkill) === normalize(selectedName);
    };

    return projects.filter(proj =>
      proj.skillsUsed?.some(s => isMatch(s, techName)) ||
      proj.tags?.some(t => isMatch(t, techName))
    ).length;
  };

  const handleCategorySelect = (cat) => {
    setSearchQuery('');
    setActiveTab(cat);
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden text-white">
      <GridBackground
        opacity="05"
        mask="radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-12 text-center lg:text-left">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.15)]"
            >
              <Code2 size={16} className="text-purple-400" />
              <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-purple-300">
                TECHNICAL ARSENAL
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-display font-black tracking-tight leading-[1.15] text-white">
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">Engine & Stack</span>
            </h2>
          </div>
        </div>

        {/* System Category Controller */}
        {searchQuery.trim() === '' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center lg:justify-start gap-4 mb-16"
          >
            {categories.map((cat) => (
              <motion.div key={cat} variants={itemVariants}>
                <FilterButton
                  cat={cat}
                  activeTab={activeTab}
                  onSelect={() => handleCategorySelect(cat)}
                  icon={categoryIcons[cat]}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Query Status Readout */}
        {searchQuery.trim() !== '' && (
          <div className="mb-8 font-mono text-[10px] text-indigo-400 tracking-wider text-center lg:text-left flex items-center gap-2 justify-center lg:justify-start">
            <span className="w-1 h-1 rounded-full bg-indigo-400 animate-ping" />
            <span>FOUND {filteredSkills.length} MATCHING COMPONENT(S) IN CYBER ENGINE</span>
          </div>
        )}

        {/* Skill Matrix */}
        <div className="min-h-[380px]">
          <AnimatePresence mode="wait">
            {filteredSkills.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <Cpu className="text-white/20 w-12 h-12 mb-4 animate-bounce" />
                <p className="font-mono text-xs text-white/40 uppercase tracking-widest">No matching nodes in database</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeTab + searchQuery}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(15px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
              >
                {filteredSkills.map((tech, index) => {
                  const matchProjCount = getRelatedProjectsCount(tech.name);
                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      onMouseEnter={() => setHoveredTech(tech.name)}
                      onMouseLeave={() => setHoveredTech(null)}
                      style={{
                        borderColor: hoveredTech === tech.name ? `${techHexColors[tech.icon]}45` : undefined,
                        boxShadow: hoveredTech === tech.name ? `0 0 25px -5px ${techHexColors[tech.icon]}25` : undefined
                      }}
                      className="group relative h-48 bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-500 hover:bg-white/[0.04] cursor-default"
                    >


                      {/* Project Count Tech Stamp 
                      <div className="absolute top-4 left-4 text-[7px] font-mono font-bold text-white/30 group-hover:text-white/60 transition-colors uppercase tracking-widest">
                        [{matchProjCount || tech.projectsCount || 0} PROJ]
                      </div>
                      */}

                      {/* Floating Large Brand Glow */}
                      <div className={`absolute -bottom-10 -right-10 text-9xl opacity-[0.01] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none ${techColors[tech.icon]}`}>
                        {iconMap[tech.icon]}
                      </div>

                      {/* Main Skill Icon */}
                      <div className={`text-5xl mb-5 transform group-hover:scale-105 transition-transform duration-500 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.03)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.08)] ${techColors[tech.icon]}`}>
                        {iconMap[tech.icon]}
                      </div>

                      {/* Skill Name */}
                      <span className="text-[12px] uppercase font-black tracking-[0.25em] text-white/50 group-hover:text-white transition-colors duration-300 relative z-10 font-mono">
                        {tech.name}
                      </span>

                      {/* High-Tech Scanline Scan Effect */}
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Technical Footer Telemetry */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-8">
            <div className="flex -space-x-3">
              {['swift', 'nodejs', 'nextjs'].map((icon, i) => (
                <div key={i} className={`w-9 h-9 rounded-full border-2 border-black bg-white/5 flex items-center justify-center text-base transition-transform hover:z-10 hover:scale-110 cursor-default ${techColors[icon]}`}>
                  {iconMap[icon]}
                </div>
              ))}
              <div className="w-9 h-9 rounded-full border-2 border-black bg-white/5 flex items-center justify-center text-base text-white/40 relative group/soon">
                <div className="absolute inset-0 rounded-full bg-indigo-500/10 animate-pulse" />
                <SiDocker className="opacity-40 group-hover/soon:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 backdrop-blur-md border border-indigo-500/20 rounded-lg text-[7px] font-black uppercase tracking-[0.2em] opacity-0 group-hover/soon:opacity-100 group-hover/soon:-top-12 transition-all duration-500 whitespace-nowrap pointer-events-none shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-indigo-500 animate-ping" />
                  Coming Soon: Docker
                </div>
              </div>
            </div>
            <p className="text-[9px] font-mono uppercase tracking-widest text-white/40">Console: Nominal // System Diagnostics Online</p>
          </div>

          <div className="flex items-center gap-4 text-white/30">
            <Zap size={12} className="text-violet-400" />
            <span className="text-[9px] font-mono uppercase tracking-widest">Always Learning . Always Building</span>
            <Zap size={12} className="text-violet-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
