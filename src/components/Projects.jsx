import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, projectFilters } from '../data/projects';
import { ExternalLink, Github, Briefcase, ArrowUpRight, X, Zap, ArrowRight, Monitor, Image } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import ClickSpark from './ui/ClickSpark';

const ProjectFilterButton = ({ filter, activeFilter, setActiveFilter, setVisibleCount, setSelectedTech }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { left, top } = buttonRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - left, y: e.clientY - top });
  };

  const isActive = activeFilter === filter;

  return (
    <MagneticButton onClick={() => { setActiveFilter(filter); setSelectedTech('All'); setVisibleCount(6); }}>
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        className={`relative px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none overflow-hidden group/btn border cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${isActive
          ? 'text-white border-indigo-500/50 shadow-[0_0_25px_rgba(99,102,241,0.25)]'
          : 'text-dark-textMuted bg-white/[0.01] border-white/5 hover:border-indigo-500/30 hover:text-white'
          }`}
      >
        {isActive && (
          <motion.div
            layoutId="activeProjectTab"
            className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-violet-600/35 backdrop-blur-md"
            transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
          />
        )}

        <div
          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle 80px at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.18), transparent)`,
          }}
        />

        <span className="relative z-10 flex items-center gap-2 justify-center">
          {isActive && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_8px_#818cf8]"
            />
          )}
          {filter}
        </span>
      </button>
    </MagneticButton>
  );
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTech, setSelectedTech] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Interactive Iframe Preview Mode
  const [previewMode, setPreviewMode] = useState(false);

  const filters = projectFilters;

  // Step 1: Filter by category
  const categoryProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  // Step 2: Extract all unique technologies/skills used in the selected category
  const availableTechs = ['All', ...Array.from(new Set(categoryProjects.flatMap(p => p.skillsUsed || [])))];

  // Step 3: Filter by technology/skill if selected
  const filteredProjects = selectedTech === 'All'
    ? categoryProjects
    : categoryProjects.filter(p => p.skillsUsed && p.skillsUsed.includes(selectedTech));

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  // Math calculation for circular progress ring
  const totalCount = projects.length;
  const filteredCount = filteredProjects.length;
  const percentage = totalCount > 0 ? (filteredCount / totalCount) * 100 : 0;
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-dark-secondary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-dark-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6 text-[#6366f1] font-code text-sm tracking-widest uppercase"
          >
            <Briefcase size={18} />
            <span>The Exhibit</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.2] md:leading-[1.15] animated-gradient-text">
              Featured <br /> <span className="text-gradient">Artifacts</span>
            </h2>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col gap-6 mb-16">
          <div className="flex flex-wrap items-center justify-between gap-6">
            
            {/* Main Category Tabs */}
            <div className="flex flex-wrap items-center gap-3 font-syne">
              {filters.map((filter) => (
                <ProjectFilterButton
                  key={filter}
                  filter={filter}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  setVisibleCount={setVisibleCount}
                  setSelectedTech={setSelectedTech}
                />
              ))}
            </div>

            {/* Refined circular progress indicator */}
            <div className="flex items-center gap-3.5 px-5 py-3 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md text-xs font-semibold text-dark-textMuted font-syne hover:border-indigo-500/30 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] transition-all duration-500">
              <svg className="w-6 h-6 -rotate-90 shrink-0" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r={radius}
                  className="stroke-white/5 fill-none"
                  strokeWidth="2.5"
                />
                <motion.circle
                  cx="12"
                  cy="12"
                  r={radius}
                  className="stroke-indigo-400 fill-none"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(99,102,241,0.6))' }}
                />
              </svg>
              <div className="flex items-baseline gap-1">
                <span className="text-white font-black text-base leading-none">{filteredCount}</span>
                <span className="text-[10px] text-dark-textMuted">/ {totalCount} Projects</span>
              </div>
            </div>

          </div>

          {/* Specific Tech Sub-Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 border-t border-white/5 pt-4">
            <span className="text-[9px] font-code font-bold uppercase tracking-widest text-indigo-400 mr-2">Sub-Filter:</span>
            {availableTechs.map(tech => (
              <button
                key={tech}
                onClick={() => { setSelectedTech(tech); setVisibleCount(6); }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-code font-bold uppercase tracking-wider transition-all border ${
                  selectedTech === tech
                    ? 'bg-indigo-500/10 border-indigo-500/40 text-white shadow-[0_0_12px_rgba(99,102,241,0.2)]'
                    : 'bg-white/[0.01] border-white/5 text-dark-textMuted hover:border-white/10 hover:text-white'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => { setSelectedProject(project); setPreviewMode(false); }}
                className="group relative h-[380px] md:h-[440px] rounded-3xl overflow-hidden border border-white/5 bg-dark-surface cursor-pointer shadow-lg hover:border-indigo-500/25 transition-all duration-500"
              >
                <ClickSpark sparkColor="rgba(99,102,241,1)" sparkColor2="rgba(139,92,246,1)">
                  <div className="w-full h-full relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Dark Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Card Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                      <span className="text-[9px] font-code font-bold uppercase tracking-widest text-indigo-400 bg-[#6366f1]/10 border border-[#6366f1]/20 px-2.5 py-1 rounded-full w-fit mb-3">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-display font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-[11px] text-dark-textMuted line-clamp-2 mt-1 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Corner Arrow Indicator */}
                    <div className="absolute top-6 right-6 p-3 bg-white/5 border border-white/10 text-white rounded-full opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 z-20 pointer-events-none">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </ClickSpark>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Actions Row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {visibleCount < filteredProjects.length && (
            <MagneticButton
              onClick={() => setVisibleCount(filteredProjects.length)}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:border-indigo-500/40 transition-all group overflow-hidden relative font-syne text-xs uppercase tracking-wider text-white"
            >
              <span className="relative z-10 flex items-center gap-2">
                More Artifacts <span className="group-hover:translate-y-1 transition-transform">↓</span>
              </span>
            </MagneticButton>
          )}

          <Link to="/artifacts" className="inline-block">
            <MagneticButton className="px-8 py-4 bg-[#6366f1] text-white rounded-full font-bold hover:bg-indigo-600 transition-all group overflow-hidden relative text-xs uppercase tracking-wider">
              <span className="relative z-10 flex items-center gap-2">
                Explore Case Studies
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </MagneticButton>
          </Link>
        </div>

      </div>

      {/* ── PROJECT DETAIL & LIVE IFRAME MODAL ─────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#07070c] border border-white/10 p-6 md:p-8 rounded-[2.5rem] max-w-5xl w-full relative overflow-hidden flex flex-col max-h-[90vh] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/70 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="overflow-y-auto no-scrollbar pb-4 pr-1">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                  {/* Left Column: Image / Interactive Sandbox Frame */}
                  <div className="lg:col-span-6 flex flex-col gap-6">
                    
                    <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden relative shadow-2xl border border-white/5 bg-black/40 flex flex-col">
                      <AnimatePresence mode="wait">
                        {previewMode ? (
                          <motion.div
                            key="iframe-sandbox"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full h-full flex flex-col relative bg-black"
                          >
                            {/* Browser Bar */}
                            <div className="flex items-center gap-3 px-4 py-2 border-b border-white/5 bg-white/[0.02] shrink-0">
                              <div className="flex gap-1 shrink-0">
                                <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                                <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                                <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                              </div>
                              <div className="flex-grow bg-white/5 border border-white/5 rounded-lg px-3 py-1 flex items-center gap-2 text-[9px] text-dark-textMuted select-all font-code overflow-hidden">
                                <span className="text-emerald-500 shrink-0 font-bold">SECURE_LINK:</span>
                                <span className="truncate text-white/70">{selectedProject.liveUrl}</span>
                              </div>
                            </div>
                            
                            {/* Sandbox Frame */}
                            <div className="flex-grow relative">
                              <iframe
                                src={selectedProject.liveUrl}
                                title={selectedProject.title}
                                className="w-full h-full border-none bg-white opacity-95"
                                sandbox="allow-scripts allow-same-origin"
                              />
                              <div className="absolute bottom-3 left-3 bg-black/85 border border-white/5 px-3 py-1.5 rounded-lg pointer-events-none text-[8px] font-code text-indigo-400 uppercase tracking-wider">
                                Secure Preview Sandbox Active
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="project-image"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full relative"
                          >
                            <img
                              src={selectedProject.image}
                              alt={selectedProject.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-80" />
                            <div className="absolute bottom-6 left-6 right-6">
                              <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-[#6366f1] rounded-full text-[9px] font-code font-bold uppercase tracking-wider inline-block mb-2">
                                {selectedProject.category}
                              </span>
                              <h3 className="text-2xl font-display font-bold text-white leading-tight">
                                {selectedProject.title}
                              </h3>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Preview Mode / Links Control row */}
                    <div className="flex gap-3">
                      {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                        <button
                          onClick={() => setPreviewMode(!previewMode)}
                          className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all bg-white/5 text-indigo-400 hover:border-indigo-500/30 hover:bg-[#6366f1]/10"
                        >
                          {previewMode ? (
                            <>
                              <Image size={14} /> Static Frame
                            </>
                          ) : (
                            <>
                              <Monitor size={14} /> Live Sandbox
                            </>
                          )}
                        </button>
                      )}
                      
                      <div className="flex-1 flex gap-2">
                        {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                          <a
                            href={selectedProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#6366f1] hover:bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-all shadow-[0_0_12px_rgba(99,102,241,0.3)]"
                          >
                            <ExternalLink size={14} /> Launch
                          </a>
                        )}
                        {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                          <a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/5 hover:border-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-2xl transition-colors bg-white/[0.02]"
                          >
                            <Github size={14} /> Source
                          </a>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Details */}
                  <div className="lg:col-span-6 flex flex-col pt-2">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        selectedProject.status === 'Completed'
                          ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                          : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          selectedProject.status === 'Completed' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-pulse'
                        }`} />
                        {selectedProject.status}
                      </div>
                    </div>

                    <h4 className="text-sm font-code font-bold uppercase tracking-widest text-indigo-400 mb-2">Specifications</h4>
                    <p className="text-dark-textMuted leading-relaxed text-xs md:text-sm mb-6 font-bricolage">
                      {selectedProject.description}
                    </p>

                    {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                      <div className="mb-6">
                        <h4 className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
                          <Zap size={14} className="text-indigo-400" /> Core Capabilities
                        </h4>
                        <ul className="grid grid-cols-1 gap-2.5">
                          {selectedProject.keyFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 bg-white/[0.01] p-3 rounded-xl border border-white/5">
                              <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                              <span className="text-dark-textMuted text-xs font-bricolage">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-6 mt-auto">
                      <div>
                        <h4 className="text-[10px] font-code font-bold text-white uppercase tracking-widest mb-3 border-b border-white/5 pb-2">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.tags.map(tag => (
                            <span key={tag} className="text-[9px] font-code text-[#6366f1] bg-[#6366f1]/5 px-2.5 py-1 rounded-md border border-[#6366f1]/15">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {selectedProject.skillsUsed && selectedProject.skillsUsed.length > 0 && (
                        <div>
                          <h4 className="text-[10px] font-code font-bold text-white uppercase tracking-widest mb-3 border-b border-white/5 pb-2">Skills Used</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedProject.skillsUsed.map(skill => (
                              <span key={skill} className="text-[9px] font-code text-indigo-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
