import React, { useEffect, useState, useMemo } from 'react';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { featuredArtifacts as fallbackArtifacts } from '../data/featuredArtifacts';
import { caseStudies } from '../data/caseStudies';
import {
  ArrowUpRight, Briefcase, Search, X, Sparkles, ExternalLink,
  Github, Layers, CheckCircle2, Eye, Filter, Zap
} from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';

// Build a quick lookup: caseStudy id → true, so we know which projects have deep-dives
const caseStudyIds = new Set(caseStudies.map((cs) => cs.id));

export default function Artifacts() {
  const [projects, setProjects] = useState(() => fallbackArtifacts);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProject, setQuickViewProject] = useState(null);

  // Lock body scroll & hide navbar when project quick view modal is open
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setProjects(data.data);
        } else {
          setProjects(fallbackArtifacts);
        }
      } catch (_error) {
        setProjects(fallbackArtifacts);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Fixed filter categories: All, Web Apps, Mobile Apps, UI/UX Design
  const categories = ['All', 'Web Apps', 'Mobile Apps', 'UI/UX Design'];

  // Filtered projects list based on search and category
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const cat = (p.category || '').toLowerCase();
      const target = activeCategory.toLowerCase();

      let matchesCategory = activeCategory === 'All';
      if (!matchesCategory) {
        if (target.includes('web')) matchesCategory = cat.includes('web') || cat.includes('react') || cat.includes('javascript') || cat.includes('html') || cat.includes('full-stack');
        else if (target.includes('mobile')) matchesCategory = cat.includes('mobile') || cat.includes('ios') || cat.includes('swift');
        else if (target.includes('design')) matchesCategory = cat.includes('design') || cat.includes('ui') || cat.includes('figma');
        else matchesCategory = cat === target;
      }

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        p.title?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query) ||
        p.tags?.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg text-dark-textMain">
        <div className="w-8 h-8 border-4 border-dark-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const artifactsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://patelrudra.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Artifacts",
            "item": "https://patelrudra.in/artifacts"
          }
        ]
      },
      {
        "@type": "CollectionPage",
        "name": "Featured Artifacts & Case Studies by Rudra Patel",
        "url": "https://patelrudra.in/artifacts",
        "description": "A curated digital vault of high-performance web products, full-stack applications, and technical case studies by Rudra Patel.",
        "author": {
          "@type": "Person",
          "name": "Rudra Patel",
          "url": "https://patelrudra.in"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-textMain pt-28 md:pt-36 pb-24 relative overflow-hidden">
      <SEO
        title="Featured Artifacts & Case Studies"
        description="A curated digital vault of high-performance web products, native SwiftUI iOS applications, and technical case studies by Rudra Patel."
        keywords="Rudra Patel projects, portfolio case studies, Frontend web apps, SwiftUI iOS apps, React projects, Web development portfolio"
        canonical="https://patelrudra.in/artifacts"
        schema={artifactsSchema}
      />

      {/* Main Background Cyber Grid Animation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Animated Floating Ambient Aurora Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1.1, 1],
          x: [0, 60, -30, 0],
          y: [0, -40, 50, 0],
          opacity: [0.25, 0.45, 0.25]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-10%] w-[500px] md:w-[750px] h-[500px] md:h-[750px] bg-gradient-to-br from-purple-600/30 via-indigo-600/20 to-transparent rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.3, 1.1],
          x: [0, -50, 40, 0],
          y: [0, 60, -40, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-10%] w-[450px] md:w-[700px] h-[450px] md:h-[700px] bg-gradient-to-tr from-cyan-500/20 via-violet-600/20 to-transparent rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500 via-indigo-400 to-transparent opacity-80 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── HEADER SECTION ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.1 }
            }
          }}
          className="mb-14 md:mb-20"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-3 mb-6 text-dark-secondary font-code text-xs md:text-sm tracking-widest uppercase"
          >
            <div className="w-8 h-[1px] bg-dark-secondary/40" />
            <Briefcase size={16} />
            <span>Digital Vault & Case Studies</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12">
            <div className="overflow-hidden">
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight leading-[1.15]"
              >
                Featured <br />
                <span className="animated-gradient-text">Artifacts</span>.
              </motion.h1>
            </div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base text-dark-textMuted max-w-md leading-relaxed font-light"
            >
              Explore engineered digital solutions, scalable web platforms, and deep-dive technical case studies built with modern web standards.
            </motion.p>
          </div>

          {/* ── FILTER TABS & SEARCH BAR ── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 md:mt-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-2 sm:p-3 rounded-xl md:rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-xl"
          >
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto custom-scrollbar pb-2 md:pb-0 px-1">
              {categories.map((cat) => {
                const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
                const catCount =
                  cat === 'All'
                    ? projects.length
                    : projects.filter((p) => p.category?.toLowerCase() === cat.toLowerCase()).length;

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-md sm:rounded-md text-xs font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${isActive
                      ? 'bg-dark-primary text-white shadow-lg shadow-dark-primary/30 scale-[1.02]'
                      : 'bg-white/[0.03] text-dark-textMuted hover:text-white hover:bg-white/[0.08]'
                      }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] ${isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-white/10 text-dark-textMuted'
                        }`}
                    >
                      {catCount}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-textMuted pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search artifacts, tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-white/[0.04] border border-white/10 rounded-md sm:rounded-md text-xs text-white placeholder-dark-textMuted/60 focus:outline-none focus:border-dark-primary/60 focus:bg-white/[0.07] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-textMuted hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* ── ARTIFACT LIST GRID ── */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 px-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-4"
          >
            <Filter size={32} className="mx-auto text-dark-secondary opacity-60" />
            <h3 className="text-xl font-bold font-display text-white">No Artifacts Found</h3>
            <p className="text-dark-textMuted text-sm max-w-sm mx-auto">
              No results matching your active category or search query. Try clearing your search or picking another category.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-2 px-6 py-2.5 bg-dark-primary text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <div className="space-y-24 md:space-y-36">
            {filteredProjects.map((project, idx) => {
              const hasCaseStudy = caseStudyIds.has(project.id);
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={project.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.15, delayChildren: 0.05 }
                    }
                  }}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } gap-10 md:gap-16 lg:gap-24 items-center`}
                >
                  {/* Image Card Side */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: isEven ? -40 : 40, scale: 0.96 },
                      visible: { opacity: 1, x: 0, scale: 1 }
                    }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full lg:w-[54%] relative group"
                  >
                    <div className="relative aspect-[16/10] rounded-xl md:rounded-xl overflow-hidden border border-white/10 bg-dark-surface shadow-2xl group-hover:border-dark-primary/40 transition-colors duration-500">
                      <motion.img
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        src={project.image}
                        alt={`${project.title} - ${project.category} artifact by Rudra Patel`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                    </div>

                    {/* Category Tag Badge */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-4 py-2 sm:px-5 sm:py-2.5 bg-dark-bg/80 backdrop-blur-md border border-white/15 rounded-md z-20 shadow-xl">
                      <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white font-bricolage flex items-center gap-2">
                        <span className="w-2 h-2 rounded-md bg-dark-primary animate-pulse" />
                        {project.category}
                      </span>
                    </div>

                    {/* Quick View Trigger on Image Hover */}
                    <button
                      onClick={() => setQuickViewProject(project)}
                      className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white text-xs font-bold tracking-wider uppercase flex items-center gap-2 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-20"
                    >
                      <Eye size={16} />
                      <span>Quick View</span>
                    </button>
                  </motion.div>

                  {/* Content Side */}
                  <div className="w-full lg:w-[46%] space-y-6">
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="space-y-3"
                    >
                      <span className="font-code text-dark-secondary text-xs sm:text-sm font-bold tracking-[0.3em] uppercase opacity-80 flex items-center gap-2">
                        <Sparkles size={14} className="text-dark-primary" />
                        /{String(idx + 1).padStart(2, '0')} ARTIFACT
                      </span>

                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                        {project.title}
                      </h2>
                    </motion.div>

                    {/* Description */}
                    {project.description && (
                      <motion.p
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        className="text-dark-textMuted text-sm sm:text-base leading-relaxed line-clamp-3 font-light"
                      >
                        {project.description}
                      </motion.p>
                    )}

                    {/* Tech Tags Pills */}
                    {project.tags && project.tags.length > 0 && (
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        className="flex flex-wrap gap-2 pt-1"
                      >
                        {project.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.03] text-dark-textMuted text-[11px] font-code font-medium hover:border-dark-primary/40 hover:text-white transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 5 && (
                          <span className="px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/[0.02] text-dark-textMuted text-[10px] font-code">
                            +{project.tags.length - 5} more
                          </span>
                        )}
                      </motion.div>
                    )}

                    {/* Actions Row */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="pt-4 flex flex-wrap items-center gap-4"
                    >
                      {hasCaseStudy ? (
                        <Link to={`/artifacts/${project.id}`} className="inline-block">
                          <MagneticButton>
                            <button className="flex items-center gap-3 px-8 py-4 bg-white text-black font-black rounded-full hover:bg-dark-primary hover:text-white transition-all duration-300 group uppercase text-xs tracking-[0.2em] shadow-lg shadow-white/5">
                              <span>Open Case Study</span>
                              <ArrowUpRight
                                size={18}
                                className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform stroke-[2.5px]"
                              />
                            </button>
                          </MagneticButton>
                        </Link>
                      ) : null}

                      <button
                        onClick={() => setQuickViewProject(project)}
                        className="flex items-center gap-2 px-6 py-4 border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-white font-bold rounded-full transition-all uppercase text-xs tracking-[0.15em]"
                      >
                        <Eye size={16} />
                        <span>Specs & View</span>
                      </button>

                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 border border-white/15 bg-white/[0.03] hover:bg-white/[0.1] text-white rounded-full transition-all hover:scale-105"
                          title="Open Live Preview"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* ── QUICK VIEW INTERACTIVE MODAL ── */}
      <AnimatePresence>
        {quickViewProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl"
            onClick={() => setQuickViewProject(null)}
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
                onClick={() => setQuickViewProject(null)}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 bg-black/60 hover:bg-purple-600/30 backdrop-blur-xl border border-white/15 hover:border-purple-500/50 rounded-full text-white/80 hover:text-white transition-all shadow-xl hover:scale-105 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* Modal Body Content */}
              <div className="overflow-y-auto custom-scrollbar pr-1 sm:pr-2 space-y-6 sm:space-y-8 -webkit-overflow-scrolling-touch">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">

                  {/* Left Column: Image Card and Action Buttons */}
                  <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
                    <div className="w-full aspect-[16/9] sm:aspect-[4/3] lg:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-2xl border border-white/10 group">
                      <img
                        src={quickViewProject.image}
                        alt={`${quickViewProject.title} project preview - ${quickViewProject.category} by Rudra Patel`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070814] via-[#070814]/40 to-transparent opacity-90" />
                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 space-y-2">
                        <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 bg-purple-500/20 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-bold text-purple-300 border border-purple-500/30 tracking-[0.2em] uppercase inline-block">
                          {quickViewProject.category}
                        </span>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight leading-tight">
                          {quickViewProject.title}
                        </h3>
                        {/* Short Skills / Tech Stack Image Overlay */}
                        {(quickViewProject.tags || quickViewProject.skillsUsed) && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {(quickViewProject.tags || quickViewProject.skillsUsed || []).slice(0, 3).map((skill) => (
                              <span key={skill} className="px-2.5 py-0.5 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-mono font-medium text-purple-200 border border-purple-500/30">
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Link Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3">
                      {quickViewProject.liveUrl && quickViewProject.liveUrl !== '#' && (
                        <a
                          href={quickViewProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2.5 py-3 sm:py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl transition-all shadow-lg hover:shadow-purple-500/25"
                        >
                          <ExternalLink size={16} /> <span>Launch Project</span>
                        </a>
                      )}
                      {quickViewProject.githubUrl && quickViewProject.githubUrl !== '#' && (
                        <a
                          href={quickViewProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2.5 py-3 sm:py-3.5 px-4 bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all"
                        >
                          <Github size={16} /> <span>Source Code</span>
                        </a>
                      )}
                      {caseStudyIds.has(quickViewProject.id) && (
                        <Link
                          to={`/artifacts/${quickViewProject.id}`}
                          onClick={() => setQuickViewProject(null)}
                          className="flex items-center justify-center gap-2.5 py-3 sm:py-3.5 px-4 bg-white hover:bg-purple-300 text-black font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl transition-all"
                        >
                          <span>Full Case Study</span> <ArrowUpRight size={16} />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Project Specifications */}
                  <div className="lg:col-span-7 flex flex-col pt-1 sm:pt-2">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-sm ${quickViewProject.status === 'Completed'
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25'
                        : 'text-amber-400 bg-amber-500/10 border-amber-500/25'
                        }`}>
                        <span className={`w-2 h-2 rounded-full ${quickViewProject.status === 'Completed' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-pulse'
                          }`} />
                        {quickViewProject.status}
                      </div>
                    </div>

                    <h4 className="text-lg sm:text-xl font-display font-bold mb-3 sm:mb-4 text-purple-300">About the Project</h4>
                    <p className="text-white/70 leading-relaxed text-xs sm:text-sm md:text-base mb-6 sm:mb-8 font-syne">
                      {quickViewProject.description}
                    </p>

                    {quickViewProject.keyFeatures && quickViewProject.keyFeatures.length > 0 && (
                      <div className="mb-6 sm:mb-8">
                        <h4 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2.5 font-mono">
                          <Zap size={16} className="text-purple-400" /> Core Features
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                          {quickViewProject.keyFeatures.map((feature, idx) => (
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
                          {quickViewProject.tags.map(tag => (
                            <span key={tag} className="text-[11px] sm:text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all cursor-default">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Skills Utilized */}
                      {quickViewProject.skillsUsed && quickViewProject.skillsUsed.length > 0 && (
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-3 sm:mb-4 border-b border-white/10 pb-2.5 font-mono">Skills Utilized</h4>
                          <div className="flex flex-wrap gap-2">
                            {quickViewProject.skillsUsed.map(skill => (
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
    </div>
  );
}
