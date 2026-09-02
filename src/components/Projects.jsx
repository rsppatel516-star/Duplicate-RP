import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, projectFilters } from '../data/projects';
import { ExternalLink, Github, Briefcase, ArrowUpRight, X, Zap, ArrowRight, FolderOpen, Tag, Calendar, Layout, LayoutGrid, Globe, Smartphone, Palette, Sparkles, Layers } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import ClickSpark from './ui/ClickSpark';

const categoryIcons = {
  'All': LayoutGrid,
  'Web Apps': Globe,
  'Mobile Apps': Smartphone,
  'UI/UX Design': Palette,
};

const AnimatedCountBadge = ({ value }) => {
  return (
    <span className="inline-flex items-center justify-center overflow-hidden h-[1.25em] leading-none relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ y: 12, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -12, opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const ProjectFilterButton = ({ filter, count, activeFilter, setActiveFilter, setVisibleCount }) => {
  const isActive = activeFilter === filter;
  const Icon = categoryIcons[filter] || Layers;

  return (
    <MagneticButton onClick={() => { setActiveFilter(filter); setVisibleCount(6); }}>
      <button
        className={`relative px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm md:text-base font-bold transition-all duration-300 focus:outline-none flex items-center gap-2.5 cursor-pointer select-none group border ${
          isActive
            ? 'text-white border-violet-500/50 shadow-[0_0_25px_rgba(99,102,241,0.35)]'
            : 'text-white/60 border-white/5 bg-white/[0.01] hover:text-white hover:border-violet-500/30 hover:bg-white/[0.04]'
        }`}
      >
        {isActive && (
          <motion.div
            layoutId="activeProjectFilterPill"
            className="absolute inset-0 bg-gradient-to-r from-violet-600/30 via-indigo-600/40 to-violet-600/30 backdrop-blur-md rounded-xl"
            transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
          />
        )}

        <span className="relative z-10 flex items-center gap-2">
          <Icon size={16} className={`transition-transform duration-300 ${isActive ? 'scale-110 text-violet-300' : 'text-purple-400 group-hover:text-purple-300'}`} />
          <span className="font-display tracking-wide">{filter}</span>
        </span>

        {/* Animated Count Badge */}
        <span
          className={`relative z-10 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold transition-all flex items-center justify-center min-w-[22px] ${
            isActive
              ? 'bg-violet-500/30 text-white border border-violet-400/40 shadow-[0_0_10px_rgba(167,139,250,0.3)]'
              : 'bg-white/5 text-white/50 border border-white/10 group-hover:border-white/20 group-hover:text-white/80'
          }`}
        >
          <AnimatedCountBadge value={count} />
        </span>
      </button>
    </MagneticButton>
  );
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedProject, setSelectedProject] = useState(null);

  // Lock body scroll & hide navbar when project modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const filters = projectFilters;

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => {
      const cat = (p.category || '').toLowerCase();
      const target = activeFilter.toLowerCase();
      if (target.includes('web')) return cat.includes('web') || cat.includes('react') || cat.includes('javascript') || cat.includes('html');
      if (target.includes('mobile')) return cat.includes('mobile') || cat.includes('ios') || cat.includes('swift');
      if (target.includes('design')) return cat.includes('design') || cat.includes('ui') || cat.includes('figma');
      return cat === target;
    });

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  // Math calculation for circular progress ring
  const totalCount = projects.length;
  const filteredCount = filteredProjects.length;
  const percentage = totalCount > 0 ? (filteredCount / totalCount) * 100 : 0;
  const radius = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <section id="projects" className="py-16  relative overflow-hidden">

      

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 -mb-24 -mt-12 ">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-purple-400 mb-4"
              >
                <FolderOpen size={16} className="text-purple-400" />
                <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-purple-300">
                  FEATURED ARTIFACTS
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.15] text-white">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">Artifacts</span>
              </h2>
            </div>

            {/* Project Animation SVG */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-44 h-44 sm:w-92 sm:h-92 md:w-92 md:h-92 shrink-0 self-center lg:self-auto flex items-center justify-center rounded-2xl  transition-all duration-500"
            >
              <div className="absolute inset-0 transition-all duration-500 pointer-events-none" />
              <img
                src="/project animation.svg"
                alt="Project Showcase Animation"
                loading="lazy"
                decoding="async"
                width="360"
                height="360"
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-transform duration-500 group-hover/anim:scale-105 select-none pointer-events-none"
              />
            </motion.div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-16">
          {/* Category Filter Pills Dock */}
          <div className="flex flex-wrap items-center gap-2  rounded-xl">
            {filters.map((filter) => {
              const count = filter === 'All'
                ? projects.length
                : projects.filter(p => {
                    const cat = (p.category || '').toLowerCase();
                    const target = filter.toLowerCase();
                    if (target.includes('web')) return cat.includes('web') || cat.includes('react') || cat.includes('javascript') || cat.includes('html');
                    if (target.includes('mobile')) return cat.includes('mobile') || cat.includes('ios') || cat.includes('swift');
                    if (target.includes('design')) return cat.includes('design') || cat.includes('ui') || cat.includes('figma');
                    return cat === target;
                  }).length;

              return (
                <ProjectFilterButton
                  key={filter}
                  filter={filter}
                  count={count}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  setVisibleCount={setVisibleCount}
                />
              );
            })}
          </div>

          {/* Animated Project Count Indicator */}
          <div className="flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md text-xs sm:text-sm font-medium text-white/60 whitespace-nowrap font-syne hover:border-violet-500/30 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-all duration-500">
            <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse shadow-[0_0_8px_#a78bfa]" />
            </div>
            <span className="text-white font-black text-sm sm:text-base font-mono flex items-center gap-1">
              <AnimatedCountBadge value={filteredCount} />
            </span>
            <span className="text-white/40">
              of <span className="font-bold text-white"><AnimatedCountBadge value={totalCount} /></span> projects
            </span>
          </div>
        </div>

        {/* Projects Grid: Exhibit Layout */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedProject(project)}
                className="group relative h-[340px] sm:h-[420px] md:h-[500px] rounded-3xl overflow-hidden border border-dark-border bg-dark-surface cursor-pointer"
              >
                <ClickSpark sparkColor="rgba(var(--dark-primary-rgb), 1)" sparkColor2="rgba(var(--dark-secondary-rgb), 1)">
                  <div className="w-full h-full relative">
                    {/* Immersive Full Image */}
                    <img
                      src={project.image}
                      alt={`${project.title} project preview - ${project.category} by Rudra Patel`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Dark Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-500 backdrop-blur-[0px] group-hover:backdrop-blur-sm" />

                    {/* Centered Content Overlay (Only visible on hover) */}
                    <div className="absolute inset-0 p-10 flex flex-col items-center justify-center z-20 pointer-events-none">
                      <div className="transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <h3 className="text-3xl md:text-5xl font-display font-bold text-white text-center">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Corner Arrow Indicator */}
                    <div className="absolute bottom-6 right-6 p-4 bg-dark-primary text-dark-bg rounded-full opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 delay-100 z-20 pointer-events-none">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>
                </ClickSpark>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Actions Row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">

          {/* Load More — shows more cards inline */}
          {visibleCount < filteredProjects.length && (
            <MagneticButton
              onClick={() => setVisibleCount(filteredProjects.length)}
              className="px-6 py-3.5 sm:px-10 sm:py-4.5 border border-dark-border rounded-full font-bold hover:border-dark-primary transition-all group overflow-hidden relative font-syne tracking-tighter-tight"
            >
              <span className="relative z-10 flex items-center gap-2 sm:gap-3 uppercase tracking-wider sm:tracking-widest whitespace-nowrap text-xs sm:text-sm">
                More Artifacts
                <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  ↓
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-dark-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
            </MagneticButton>
          )}

          {/* Explore Case Studies → /artifacts page */}
          <Link to="/artifacts" className="inline-block">
            <MagneticButton className="px-6 py-3.5 sm:px-10 sm:py-4.5 bg-dark-primary text-dark-bg rounded-full font-bold hover:scale-105 transition-all group overflow-hidden relative">
              <span className="font-display relative z-10 flex items-center gap-2 sm:gap-3 uppercase tracking-wider sm:tracking-widest whitespace-nowrap text-xs sm:text-sm">
                Explore Case Studies
                <ArrowRight className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 group-hover:translate-x-2 transition-transform" />
              </span>
            </MagneticButton>
          </Link>

        </div>

      </div>

      {/* Responsive Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#070814]/95 backdrop-blur-2xl border border-white/15 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl md:rounded-[16px] max-w-5xl w-full relative flex flex-col max-h-[90vh] md:max-h-[85vh] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 bg-black/60 hover:bg-purple-600/30 backdrop-blur-xl border border-white/15 hover:border-purple-500/50 rounded-full text-white/80 hover:text-white transition-all shadow-xl hover:scale-105 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* Modal Body Content (Scrollable with custom scrollbar) */}
              <div className="overflow-y-auto custom-scrollbar pr-1 sm:pr-2 space-y-6 sm:space-y-8 -webkit-overflow-scrolling-touch">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">

                  {/* Left Column: Image and Actions */}
                  <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
                    <div className="w-full aspect-[16/9] sm:aspect-[4/3] lg:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-2xl border border-white/10 group">
                      <img
                        src={selectedProject.image}
                        alt={`${selectedProject.title} project preview - ${selectedProject.category} by Rudra Patel`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070814] via-[#070814]/40 to-transparent opacity-90" />
                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                        <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 bg-purple-500/20 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-bold text-purple-300 border border-purple-500/30 tracking-[0.2em] uppercase inline-block mb-2 sm:mb-3">
                          {selectedProject.category}
                        </span>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight leading-tight">
                          {selectedProject.title}
                        </h3>
                      </div>
                    </div>

                    {/* Action Link Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3">
                      {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2.5 py-3 sm:py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl transition-all shadow-lg hover:shadow-purple-500/25"
                        >
                          <ExternalLink size={16} /> <span>Launch Project</span>
                        </a>
                      )}
                      {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2.5 py-3 sm:py-3.5 px-4 bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all"
                        >
                          <Github size={16} /> <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Project Details */}
                  <div className="lg:col-span-7 flex flex-col pt-1 sm:pt-2">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-sm ${
                        selectedProject.status === 'Completed'
                          ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25'
                          : 'text-amber-400 bg-amber-500/10 border-amber-500/25'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          selectedProject.status === 'Completed' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-pulse'
                        }`} />
                        {selectedProject.status}
                      </div>
                    </div>

                    <h4 className="text-lg sm:text-xl font-display font-bold mb-3 sm:mb-4 text-purple-300">About the Project</h4>
                    <p className="text-white/70 leading-relaxed text-xs sm:text-sm md:text-base mb-6 sm:mb-8 font-syne">
                      {selectedProject.description}
                    </p>

                    {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                      <div className="mb-6 sm:mb-8">
                        <h4 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2.5 font-mono">
                          <Zap size={16} className="text-purple-400" /> Core Features
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                          {selectedProject.keyFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 bg-white/[0.02] p-3 sm:p-3.5 rounded-xl border border-white/10 shadow-sm group hover:border-purple-500/30 transition-colors">
                              <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 group-hover:scale-125 transition-transform" />
                              <span className="text-white/80 text-xs sm:text-sm group-hover:text-white transition-colors">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-auto">
                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-3 sm:mb-4 border-b border-white/10 pb-2.5 font-mono">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map(tag => (
                            <span key={tag} className="text-[11px] sm:text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all cursor-default">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Skills Used */}
                      {selectedProject.skillsUsed && selectedProject.skillsUsed.length > 0 && (
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-3 sm:mb-4 border-b border-white/10 pb-2.5 font-mono">Skills Utilized</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.skillsUsed.map(skill => (
                              <span key={skill} className="text-[11px] sm:text-xs font-mono text-cyan-300 bg-cyan-500/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-500/20 transition-all cursor-default">
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


