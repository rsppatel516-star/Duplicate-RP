import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  X, ExternalLink, Github, Zap, CheckCircle2, ArrowUpRight, Sparkles,
  Layers, Code2, ZoomIn, User, Calendar, Cpu, Activity, ShieldCheck
} from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function ProjectModal({
  project,
  onClose,
  caseStudyIds = new Set()
}) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Keyboard navigation listener (Esc to close modal / zoom)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isZoomed) setIsZoomed(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isZoomed]);

  if (!project) return null;

  const hasCaseStudy = caseStudyIds.has
    ? caseStudyIds.has(project.id)
    : Array.isArray(caseStudyIds)
      ? caseStudyIds.includes(project.id)
      : false;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl"
        onClick={onClose}
      >
        {/* Ambient Pulsing Radial Aura Behind Modal */}
        <div className="absolute w-[650px] h-[650px] bg-gradient-to-r from-violet-600/20 via-indigo-600/15 to-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />

        <motion.div
          key={project.id}
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="bg-[#070814]/95 backdrop-blur-3xl border border-violet-500/25 p-5 sm:p-7 md:p-9 rounded-2xl sm:rounded-3xl md:rounded-[32px] max-w-5xl w-full relative flex flex-col max-h-[92vh] md:max-h-[88vh] shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden group/modal"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient Glowing Top Shimmer Beam */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-violet-500 via-cyan-400 to-transparent opacity-80" />

          {/* Floating Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-30 p-2.5 bg-black/70 hover:bg-violet-600/30 backdrop-blur-xl border border-white/15 hover:border-violet-500/50 rounded-full text-white/80 hover:text-white transition-all shadow-xl hover:scale-105 cursor-pointer flex items-center justify-center group/close"
            aria-label="Close modal"
            title="Close Modal (Esc)"
          >
            <X size={18} className="sm:w-5 sm:h-5 group-hover/close:rotate-90 transition-transform duration-300" />
          </button>

          {/* Modal Body Content (Scrollable with custom scrollbar) */}
          <div className="overflow-y-auto custom-scrollbar pr-1 sm:pr-2 space-y-6 sm:space-y-8 -webkit-overflow-scrolling-touch pt-2 sm:pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">

              {/* ── LEFT COLUMN: Interactive Cover Image & Action Suite (5 Cols) ── */}
              <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5">
                {/* Poster Image Container */}
                <div
                  onClick={() => setIsZoomed(true)}
                  className="relative w-full aspect-[4/3] lg:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/15 group/img bg-black/40 cursor-pointer"
                  title="Click to view high-resolution image"
                >
                  {/* Ambient Glow Orb Behind Image */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 via-indigo-600/20 to-transparent opacity-60 blur-xl group-hover/img:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <img
                    src={project.image}
                    alt={`${project.title} project preview - ${project.category} by Rudra Patel`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105 relative z-10"
                  />

                  {/* Gradient Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070814] via-[#070814]/50 to-transparent opacity-95 z-20 pointer-events-none" />

                  {/* Top Zoom Hover Indicator */}
                  <div className="absolute top-3 left-3 z-30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-mono text-white/90 border border-white/20 flex items-center gap-1.5">
                    <ZoomIn size={12} className="text-violet-400" />
                    <span>Expand Image</span>
                  </div>

                  {/* Overlay Info Header */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 space-y-2 z-30 pointer-events-none">
                    <span className="px-3.5 py-1 bg-violet-500/20 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-mono font-bold text-violet-300 border border-violet-500/40 tracking-[0.18em] uppercase inline-flex items-center gap-1.5">
                      <Sparkles size={11} className="text-violet-400" />
                      {project.category}
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight leading-tight drop-shadow-md">
                      {project.title}
                    </h3>

                    {/* Subtitle tag if present */}
                    {project.subtitle && (
                      <p className="text-xs text-white/70 font-mono line-clamp-1">
                        {project.subtitle}
                      </p>
                    )}

                    {/* Tags preview */}
                    {(project.tags || project.skillsUsed) && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(project.tags || project.skillsUsed || []).slice(0, 3).map((skill) => (
                          <span key={skill} className="px-2.5 py-0.5 bg-black/80 backdrop-blur-md rounded-md text-[10px] font-mono text-purple-200 border border-purple-500/30">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Link Buttons Suite */}
                <div className="flex flex-col gap-2.5">
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <MagneticButton>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group/btn w-full font-display flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl sm:rounded-2xl font-bold text-white text-xs sm:text-sm tracking-[0.1em] uppercase transition-all duration-500 overflow-hidden shadow-[0_0_25px_rgba(124,58,237,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] block text-center"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 group-hover/btn:opacity-95 transition-opacity duration-500" />
                        <span className="absolute inset-[1px] bg-black/30 backdrop-blur-md rounded-[11px] sm:rounded-[15px] z-0 transition-all duration-500 group-hover/btn:bg-black/40" />
                        <span className="relative z-10 flex items-center justify-center gap-2 text-white font-black">
                          <ExternalLink size={16} className="text-violet-300 group-hover/btn:scale-110 transition-transform" />
                          <span>Launch Live Project</span>
                        </span>
                      </a>
                    </MagneticButton>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/15 hover:border-violet-500/40 transition-all group/gh"
                      >
                        <Github size={16} className="text-white/80 group-hover/gh:text-white transition-colors" />
                        <span>Source Code</span>
                      </a>
                    )}

                    {hasCaseStudy && (
                      <Link
                        to={`/artifacts/${project.id}`}
                        onClick={onClose}
                        className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 text-purple-300 hover:text-white font-bold text-xs sm:text-sm rounded-xl border border-purple-500/30 hover:border-purple-400 transition-all group/cs"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight size={16} className="group-hover/cs:translate-x-0.5 group-hover/cs:-translate-y-0.5 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN: Technical Details & Core Features (7 Cols) ── */}
              <div className="lg:col-span-7 flex flex-col pt-1 sm:pt-2">

                {/* Status & Metadata Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider border backdrop-blur-sm ${project.status === 'Completed'
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                    : 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                    }`}>
                    <span className={`w-2 h-2 rounded-lg ${project.status === 'Completed' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-pulse'
                      }`} />
                    {project.status || 'Completed'}
                  </div>

                  {/*<div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-semibold text-violet-300/80 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10">
                      Rudra Patel • Dev
                    </span>
                    <span className="text-xs font-mono text-white/40">
                      #{project.id < 10 ? `0${project.id}` : project.id}
                    </span>
                  </div>*/}
                </div>

                {/* ── HIGH-VALUE PROJECT SPECS BAR ── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-white/[0.02] border border-white/10 mb-6">
                  {/* Role */}
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 flex items-center gap-1 mb-1">
                      <User size={11} className="text-violet-400" /> Role
                    </span>
                    <span className="text-xs font-bold text-white font-syne block truncate">
                      {project.role || 'Frontend Arch'}
                    </span>
                  </div>

                  {/* Year */}
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 flex items-center gap-1 mb-1">
                      <Calendar size={11} className="text-indigo-400" /> Timeline
                    </span>
                    <span className="text-xs font-bold text-white font-syne block">
                      {project.year || '2025'}
                    </span>
                  </div>

                  {/* Platform */}
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 flex items-center gap-1 mb-1">
                      <Cpu size={11} className="text-cyan-400" /> Platform
                    </span>
                    <span className="text-xs font-bold text-white font-syne block truncate">
                      {project.platform || 'Web Application'}
                    </span>
                  </div>

                  {/* Performance */}
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 flex items-center gap-1 mb-1">
                      <Activity size={11} className="text-emerald-400" /> Benchmark
                    </span>
                    <span className="text-xs font-bold text-emerald-300 font-mono block truncate">
                      {project.performance || 'Production Standard'}
                    </span>
                  </div>
                </div>

                {/* About Section */}
                <h4 className="text-lg sm:text-xl font-display font-extrabold mb-2.5 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                  About the Project
                </h4>
                <p className="text-white/80 leading-relaxed text-xs sm:text-sm md:text-base mb-6 font-syne font-normal">
                  {project.description}
                </p>

                {/* Core Features Section */}
                {project.keyFeatures && project.keyFeatures.length > 0 && (
                  <div className="mb-6">
                    <h4 className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-3.5 border-b border-white/10 pb-2.5">
                      <Zap size={15} className="text-violet-400" /> Core Features
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.keyFeatures.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 bg-[#0e0f26]/60 p-3.5 rounded-xl border border-white/10 hover:border-violet-500/40 hover:bg-white/[0.05] transition-all group/feat shadow-md"
                        >
                          <CheckCircle2 size={16} className="text-violet-400 shrink-0 mt-0.5 group-hover/feat:scale-110 group-hover/feat:text-cyan-300 transition-all" />
                          <span className="text-white/85 text-xs sm:text-sm font-medium leading-normal group-hover/feat:text-white transition-colors">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack & Skills Utilized Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-auto pt-4 border-t border-white/10">
                  {/* Tech Stack */}
                  {project.tags && project.tags.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Code2 size={14} className="text-purple-400" /> Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] sm:text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/25 hover:border-purple-500/50 hover:bg-purple-500/20 hover:scale-105 transition-all cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills Utilized */}
                  {project.skillsUsed && project.skillsUsed.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Layers size={14} className="text-cyan-400" /> Skills Utilized
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.skillsUsed.map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] sm:text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/25 hover:border-cyan-500/50 hover:bg-cyan-500/20 hover:scale-105 transition-all cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Technical Architecture Footer Note */}
                <div className="mt-5 p-3 rounded-xl bg-purple-500/5 border border-purple-500/15 flex items-center gap-2.5 text-[11px] font-mono text-purple-200/80">
                  <ShieldCheck size={15} className="text-purple-400 shrink-0" />
                  <span>Engineered with modern component architecture, accessible UI tokens, and fast performance optimization.</span>
                </div>

              </div>

            </div>
          </div>
        </motion.div>

        {/* ── EXPANDED FULLSCREEN IMAGE LIGHTBOX ── */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4"
              onClick={() => setIsZoomed(false)}
            >
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-6 right-6 z-30 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all cursor-pointer"
              >
                <X size={24} />
              </button>

              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={project.image}
                alt={`${project.title} High Res Preview`}
                className="max-w-full max-h-[90vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
