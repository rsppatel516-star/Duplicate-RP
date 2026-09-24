import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import ProjectModal from '../components/ui/ProjectModal';
import { projects, projectFilters } from '../data/projects';
import { caseStudies } from '../data/caseStudies';
import {
  Search, X, Filter, Grid, List, ExternalLink, Github, FolderOpen,
  Layers, Globe, Smartphone, Palette, CheckCircle2, Eye, ArrowUpRight,
  Sparkles, Code, Tag, Zap, ChevronRight, Star, LayoutGrid, Activity,
  ArrowRight, ShieldCheck, Cpu
} from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';
import ClickSpark from '../components/ui/ClickSpark';

// Set of project IDs that have full case studies available
const caseStudyIds = new Set(caseStudies.map((cs) => cs.id));

const categoryIcons = {
  'All': LayoutGrid,
  'Web Apps': Globe,
  'Mobile Apps': Smartphone,
  'UI/UX Design': Palette,
};

// Popular tech stack quick filters
const popularTechStack = [
  'React',
  'SwiftUI',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'JavaScript',
  'Firebase',
  'Figma'
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [quickViewProject, setQuickViewProject] = useState(null);

  // Lock body scroll when project modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setQuickViewProject(null);
      }
    };

    if (quickViewProject) {
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
  }, [quickViewProject]);

  // Compute live statistics from project dataset
  const stats = useMemo(() => {
    const total = projects.length;
    const webApps = projects.filter((p) => (p.category || '').toLowerCase().includes('web')).length;
    const mobileApps = projects.filter((p) => (p.category || '').toLowerCase().includes('mobile')).length;
    const uiUx = projects.filter((p) => (p.category || '').toLowerCase().includes('design') || (p.category || '').toLowerCase().includes('ui')).length;
    const liveDemos = projects.filter((p) => p.liveUrl && p.liveUrl !== '#').length;

    return { total, webApps, mobileApps, uiUx, liveDemos };
  }, []);

  // Filter projects based on Search, Category, and Tech Stack filters
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Category filter
      const cat = (p.category || '').toLowerCase();
      const targetCat = activeCategory.toLowerCase();

      let matchesCategory = activeCategory === 'All';
      if (!matchesCategory) {
        if (targetCat.includes('web')) matchesCategory = cat.includes('web') || cat.includes('react') || cat.includes('javascript') || cat.includes('html');
        else if (targetCat.includes('mobile')) matchesCategory = cat.includes('mobile') || cat.includes('ios') || cat.includes('swift');
        else if (targetCat.includes('design')) matchesCategory = cat.includes('design') || cat.includes('ui') || cat.includes('figma');
        else matchesCategory = cat === targetCat;
      }

      // Tech Stack multi-select filter
      let matchesTech = true;
      if (selectedTech.length > 0) {
        const projectTechs = [
          ...(p.tags || []),
          ...(p.skillsUsed || [])
        ].map((t) => t.toLowerCase());

        matchesTech = selectedTech.every((t) =>
          projectTechs.some((pt) => pt.includes(t.toLowerCase()))
        );
      }

      // Search Query filter
      const query = searchQuery.trim().toLowerCase();
      let matchesSearch = true;
      if (query) {
        matchesSearch =
          p.title?.toLowerCase().includes(query) ||
          p.subtitle?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query) ||
          p.tags?.some((t) => t.toLowerCase().includes(query)) ||
          p.skillsUsed?.some((s) => s.toLowerCase().includes(query));
      }

      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [searchQuery, activeCategory, selectedTech]);

  const toggleTechFilter = (tech) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setSelectedTech([]);
  };

  const projectsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://patelrudra.in'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Projects Showcase',
            'item': 'https://patelrudra.in/projects'
          }
        ]
      },
      {
        '@type': 'CollectionPage',
        'name': 'Project Showcase & Software Vault | Rudra Patel',
        'url': 'https://patelrudra.in/projects',
        'description': 'Interactive exhibition of full-stack web applications, native iOS apps, and UI/UX design engineering by Rudra Patel.',
        'author': {
          '@type': 'Person',
          'name': 'Rudra Patel',
          'url': 'https://patelrudra.in'
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-textMain pt-28 md:pt-36 pb-24 relative overflow-hidden">
      <SEO
        title="Project Showcase & Technical Vault"
        description="Interactive exhibition of Frontend web applications, native SwiftUI iOS apps, and UI/UX design systems engineered by Rudra Patel."
        keywords="Rudra Patel projects, software showcase, web apps portfolio, SwiftUI iOS apps, React projects, Next.js applications, Frontend portfolio, iOS developer projects"
        canonical="https://patelrudra.in/projects"
        schema={projectsSchema}
      />

      {/* Cyber Grid Background Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient Aurora Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
          opacity: [0.25, 0.4, 0.25]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-purple-600/30 via-indigo-600/20 to-transparent rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          x: [0, -40, 0],
          y: [0, 40, 0],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-10%] left-[-10%] w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/20 via-violet-600/20 to-transparent rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── HERO SECTION ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.1 }
            }
          }}
          className="mb-14 md:mb-16"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-purple-400 bg-purple-500/10 border border-purple-500/20 backdrop-blur-md mb-6"
          >
            <FolderOpen size={16} className="text-purple-400" />
            <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-purple-300">
              ENGINEERED SOFTWARE VAULT
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight leading-[1.1]"
              >
                Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">Showcase</span>
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="mt-4 text-sm sm:text-base md:text-lg text-dark-textMuted leading-relaxed font-light max-w-2xl"
              >
                An interactive catalog of production web applications, high-performance iOS apps, and UI/UX design systems built with scalable architecture and modern engineering standards.
              </motion.p>
            </div>

            {/* View Mode Toggle Pill */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
              className="flex items-center gap-1.5 p-1.5 bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-md shrink-0 self-start lg:self-auto"
            >
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'grid'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Grid size={15} />
                <span>Grid View</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'list'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                <List size={15} />
                <span>List View</span>
              </button>
            </motion.div>
          </div>

          {/* ── STATS METRICS BAR ── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-10"
          >
            {[
              { label: 'Total Projects', value: stats.total, icon: Layers, color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
              { label: 'Web Applications', value: stats.webApps, icon: Globe, color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' },
              { label: 'Mobile & iOS Apps', value: stats.mobileApps, icon: Smartphone, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
              { label: 'UI/UX Systems', value: stats.uiUx, icon: Palette, color: 'text-pink-400 border-pink-500/30 bg-pink-500/10' },
              { label: 'Live Deployments', value: stats.liveDemos, icon: Zap, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
            ].map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md flex items-center gap-3.5 hover:border-purple-500/30 hover:bg-white/[0.04] transition-all duration-300 group"
                >
                  <div className={`p-2.5 rounded-xl border ${stat.color} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <StatIcon size={18} />
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-black font-display text-white block leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/50 font-medium tracking-wide font-mono block mt-1">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ── FILTER & SEARCH SUITE ── */}
        <div className="mb-10 space-y-4">
          {/* Main Controls Row */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-3 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">

            {/* Category Pills Dock */}
            <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 lg:pb-0 px-1">
              {projectFilters.map((cat) => {
                const isActive = activeCategory === cat;
                const Icon = categoryIcons[cat] || LayoutGrid;

                const count = cat === 'All'
                  ? projects.length
                  : projects.filter((p) => {
                    const c = (p.category || '').toLowerCase();
                    const t = cat.toLowerCase();
                    if (t.includes('web')) return c.includes('web') || c.includes('react') || c.includes('javascript') || c.includes('html');
                    if (t.includes('mobile')) return c.includes('mobile') || c.includes('ios') || c.includes('swift');
                    if (t.includes('design')) return c.includes('design') || c.includes('ui') || c.includes('figma');
                    return c === t;
                  }).length;

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${isActive
                      ? 'text-white border-purple-500/50 bg-gradient-to-r from-purple-600/40 to-indigo-600/40 shadow-[0_0_20px_rgba(124,58,237,0.3)]'
                      : 'text-white/60 border-white/5 bg-white/[0.01] hover:text-white hover:border-purple-500/30 hover:bg-white/[0.04]'
                      }`}
                  >
                    <Icon size={15} className={isActive ? 'text-purple-300' : 'text-purple-400/70'} />
                    <span>{cat}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${isActive ? 'bg-purple-500/40 text-white' : 'bg-white/10 text-white/50'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input Box */}
            <div className="relative min-w-[260px] sm:min-w-[300px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.07] transition-all font-syne"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Tech Stack Quick Filter Tag Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 px-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5 mr-2">
              <Code size={13} className="text-purple-400" /> Filter Tech:
            </span>
            {popularTechStack.map((tech) => {
              const isSelected = selectedTech.includes(tech);
              return (
                <button
                  key={tech}
                  onClick={() => toggleTechFilter(tech)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all duration-300 border ${isSelected
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_12px_rgba(167,139,250,0.25)]'
                    : 'bg-white/[0.02] text-white/60 border-white/10 hover:border-white/20 hover:text-white'
                    }`}
                >
                  {isSelected && <span className="mr-1">✓</span>}
                  {tech}
                </button>
              );
            })}

            {(selectedTech.length > 0 || searchQuery || activeCategory !== 'All') && (
              <button
                onClick={clearAllFilters}
                className="ml-auto text-xs font-mono font-bold text-purple-400 hover:text-purple-300 underline underline-offset-4 cursor-pointer"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>

        {/* ── PROJECT SHOWCASE EXHIBIT LIST / GRID ── */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 px-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-4"
          >
            <Filter size={36} className="mx-auto text-purple-400 opacity-60" />
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">No Projects Match Your Filter</h3>
            <p className="text-white/60 text-xs sm:text-sm max-w-md mx-auto">
              We couldn't find any projects matching your criteria. Try resetting your search terms or tech stack filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW LAYOUT */
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const hasCaseStudy = caseStudyIds.has(project.id);
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    onClick={() => setQuickViewProject(project)}
                    className="group relative h-[340px] sm:h-[420px] md:h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-dark-surface cursor-pointer shadow-2xl hover:border-purple-500/40 transition-all duration-500"
                  >
                    <ClickSpark sparkColor="#ec4899" sparkColor2="#6366f1">
                      <div className="w-full h-full relative">
                        {/* Immersive Full Image */}
                        <img
                          src={project.image}
                          alt={`${project.title} project preview`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />

                        {/* Dark Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-500 backdrop-blur-[0px] group-hover:backdrop-blur-sm" />

                        {/* Centered Content Overlay (Only visible on hover) */}
                        <div className="absolute inset-0 p-8 flex flex-col items-center justify-center z-20 pointer-events-none">
                          <div className="transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-center">
                            <span className="px-3 py-1 bg-purple-500/20 backdrop-blur-md rounded-full text-[10px] font-mono font-bold text-purple-300 border border-purple-500/30 uppercase tracking-widest inline-block mb-3">
                              {project.category}
                            </span>
                            <h3 className="text-2xl md:text-4xl font-display font-extrabold text-white">
                              {project.title}
                            </h3>
                            {project.subtitle && (
                              <p className="text-xs text-white/70 font-mono mt-2 max-w-xs line-clamp-2">
                                {project.subtitle}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Corner Arrow Indicator */}
                        <div className="absolute bottom-6 right-6 p-3.5 bg-purple-600 text-white rounded-full opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 delay-100 z-20 pointer-events-none shadow-xl">
                          <ArrowUpRight size={22} />
                        </div>
                      </div>
                    </ClickSpark>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* LIST VIEW LAYOUT */
          <motion.div layout className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const hasCaseStudy = caseStudyIds.has(project.id);
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    onClick={() => setQuickViewProject(project)}
                    className="p-4 sm:p-6 rounded-3xl border border-white/10 bg-[#070814]/90 backdrop-blur-xl flex flex-col md:flex-row gap-6 items-stretch hover:border-purple-500/40 transition-all duration-300 shadow-xl group cursor-pointer"
                  >
                    {/* Left Thumbnail */}
                    <div className="w-full md:w-72 aspect-[16/10] md:aspect-auto rounded-2xl overflow-hidden relative bg-black/40 shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-mono font-bold text-purple-300 border border-purple-500/30">
                        {project.category}
                      </span>
                    </div>

                    {/* Middle Info */}
                    <div className="flex flex-col justify-between flex-grow space-y-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-purple-300 transition-colors">
                            {project.title}
                          </h3>
                          {project.status && (
                            <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono rounded-full">
                              {project.status}
                            </span>
                          )}
                        </div>

                        {project.subtitle && (
                          <p className="text-xs font-mono font-bold text-purple-300/80 mb-2">
                            {project.subtitle}
                          </p>
                        )}

                        <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-syne max-w-3xl line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Pills */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-white/70 text-[11px] font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right Actions Column */}
                    <div className="flex md:flex-col justify-end md:justify-center items-center gap-3 shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                      <button
                        onClick={(e) => { e.stopPropagation(); setQuickViewProject(project); }}
                        className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                      >
                        <Eye size={14} />
                        <span>Inspect Specs</span>
                      </button>

                      {hasCaseStudy && (
                        <Link
                          to={`/artifacts/${project.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full sm:w-auto px-4 py-2.5 bg-white/5 border border-white/15 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight size={14} />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── CALL TO ACTION FOOTER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 p-8 sm:p-12 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 via-[#070814] to-indigo-950/30 backdrop-blur-xl relative overflow-hidden text-center space-y-6"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-bold uppercase tracking-widest">
            <Sparkles size={14} className="text-purple-400" /> Need a Custom Digital Product?
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white max-w-2xl mx-auto leading-tight">
            Have a project in mind? Let's build something exceptional.
          </h2>

          <p className="text-white/60 text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed">
            From high-performance React web applications to native SwiftUI iOS apps, I engineer modern digital experiences focused on performance and usability.
          </p>

          <div className="pt-2 flex justify-center">
            <Link to="/#contact">
              <MagneticButton className="px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white font-bold text-sm tracking-widest uppercase rounded-full shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:scale-105 transition-all flex items-center gap-2">
                <span>Start a Project</span>
                <ArrowRight size={16} />
              </MagneticButton>
            </Link>
          </div>
        </motion.div>

      </div>

      {/* ── RESPONSIVE PROJECT DETAIL MODAL ── */}
      <ProjectModal
        project={quickViewProject}
        onClose={() => setQuickViewProject(null)}
        caseStudyIds={caseStudyIds}
      />
    </div>
  );
}
