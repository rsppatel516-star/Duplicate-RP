import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../data/skills';
import {
  Code, Layout, Server, Smartphone,
  Database, Cpu, Layers, ChevronRight, Zap, Target
} from 'lucide-react';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPhp, FaJava,
  FaFigma, FaAws, FaGithub,
  FaSwift
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTailwindcss, SiExpress, SiFlutter, SiMongodb,
  SiMysql, SiFirebase, SiVercel, SiPostman, SiDart, SiDocker
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
  uikit: <Layout />
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
  docker: 'text-[#2496ED]',swift: 'text-[#FA7343]',
  storyboard: 'text-[#818CF8]', mobiledesign: 'text-[#F43F5E]',
  uikit: 'text-[#2AC3FF]'
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
  uikit: '#2AC3FF'
};

const categoryIcons = {
  'Frontend': <Layout size={14} />,
  'Backend': <Server size={14} />,
  'Mobile': <Smartphone size={14} />,
  'Database': <Database size={14} />,
  'Tools & Platforms': <Layers size={14} />,
};

const FilterButton = ({ cat, activeTab, setActiveTab, icon }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { left, top } = buttonRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <MagneticButton onClick={() => setActiveTab(cat)}>
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        className={`relative flex items-center gap-3 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 border overflow-hidden group/btn cursor-pointer ${
          activeTab === cat
            ? 'text-dark-bg border-dark-primary'
            : 'bg-dark-surface border-dark-border hover:border-dark-primary/50 text-dark-textMuted'
        }`}
      >
        {activeTab === cat && (
          <motion.div
            layoutId="activeSkillTab"
            className="absolute inset-0 bg-dark-primary shadow-[0_0_30px_rgba(99,102,241,0.3)]"
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
      staggerChildren: 0.1,
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
      ease: [0.16, 1, 0.3, 1],
    },
  },
};


export default function Skills() {
  const [activeTab, setActiveTab] = useState(skills[0].category);
  const [hoveredTech, setHoveredTech] = useState(null);

  const categories = skills.map(s => s.category);
  const activeSkills = skills.find(s => s.category === activeTab)?.technologies || [];

  return (
    <section id="skills" className="py-4 relative overflow-hidden">
      {/* Decorative Grid / Lines */}
      <GridBackground 
        opacity="05" 
        mask="radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12 text-center lg:text-left">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center lg:justify-start gap-5 mb-8 text-dark-primary/60 font-code text-xs font-black tracking-[0.5em] uppercase"
            >
              <Target size={16} />
              <span>THE ARSENAL</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tighter-tight animated-gradient-text">
              Technical <br /> <span className="text-gradient">Engine</span>
            </h2>
          </div>
        </div>

        {/* System Tabs Controller */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center lg:justify-start gap-6 mb-20"
        >
          {categories.map((cat) => (
            <motion.div key={cat} variants={itemVariants}>
              <FilterButton
                cat={cat}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                icon={categoryIcons[cat]}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Matrix */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
              {activeSkills.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  style={{
                    borderColor: hoveredTech === tech.name ? `${techHexColors[tech.icon]}60` : undefined,
                    boxShadow: hoveredTech === tech.name ? `0 0 25px -5px ${techHexColors[tech.icon]}30` : undefined
                  }}
                  className="group relative h-48 bg-dark-surface/30 backdrop-blur-md border border-dark-border rounded-3xl p-8 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-500 hover:bg-dark-surface/50"
                >
                  {/* Floating Brand Glow */}
                  <div className={`absolute -bottom-10 -right-10 text-9xl opacity-[0.02] group-hover:opacity-[0.1] transition-opacity duration-700 pointer-events-none ${techColors[tech.icon]}`}>
                    {iconMap[tech.icon]}
                  </div>

                  <div className={`text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-700 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] ${techColors[tech.icon]}`}>
                    {iconMap[tech.icon]}
                  </div>

                  <span className="text-[14px] uppercase font-black tracking-[0.2em] text-dark-textMuted group-hover:text-dark-textMain transition-colors duration-500 relative z-10 font-poppins">
                    {tech.name}
                  </span>

                  {/* High-Tech Scanline Effect on Hover */}
                  <div className="absolute top-46.5 left-0 w-full h-1 bg-gradient-to-r from-transparent via-dark-primary to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Technical Footer Detail */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 pt-6 border-t border-dark-border/30 flex flex-col sm:flex-row items-center justify-between gap-12"
        >
          <div className="flex items-center gap-8">
            <div className="flex -space-x-3">
              {['swift', 'nodejs', 'nextjs'].map((icon, i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-dark-bg bg-dark-surface flex items-center justify-center text-lg transition-transform hover:z-10 hover:scale-110 cursor-default ${techColors[icon]}`}>
                  {iconMap[icon]}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-dark-bg bg-dark-surface flex items-center justify-center text-lg text-dark-textMuted/40 relative group/soon">
                <div className="absolute inset-0 rounded-full bg-dark-primary/10 animate-pulse" />
                <SiDocker className="opacity-40 group-hover/soon:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-dark-surface/90 backdrop-blur-md border border-dark-primary/20 rounded-lg text-[7px] font-black uppercase tracking-[0.2em] opacity-0 group-hover/soon:opacity-100 group-hover/soon:-top-12 transition-all duration-500 whitespace-nowrap pointer-events-none shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-dark-primary animate-ping" />
                  Coming Soon: Docker
                </div>
              </div>
            </div>
            <p className="text-[10px] font-code uppercase tracking-widest text-dark-textMuted">System Integrity: Nominal // Neural Expansion Active</p>
          </div>

          <div className="flex items-center gap-4 text-dark-textMuted/40">
            <Zap size={14} />
            <span className="text-[10px] font-code uppercase tracking-widest">Always Learning . Always Building</span>
            <Zap size={14} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}


