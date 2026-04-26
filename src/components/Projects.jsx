import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, projectFilters } from '../data/projects';
import { ExternalLink, Github, Briefcase, ArrowUpRight, X, Zap, ArrowRight, FolderOpen, Tag, Calendar, Layout } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = projectFilters;

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  return (
    <section id="projects" className="py-32  relative overflow-hidden">

      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px]  rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px]  rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6 text-dark-secondary font-code text-sm tracking-widest uppercase"
          >
            <Briefcase size={18} />
            <span>The Exhibit</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter-tight animated-gradient-text">
              Featured <br /> <span className="text-gradient">Artifacts</span>
            </h2>

            {/* Text Section */}
            <p className="text-dark-textMuted max-w-md text-lg border-l-2 border-dark-secondary px-8 py-2 font-bricolage">
              A curated collection of digital products, experimental labs, and full-stack systems built with precision.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-16">
          {/* Individual Filter Buttons */}
          <div className="flex flex-wrap items-center gap-3 font-syne">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <motion.button
                  key={filter}
                  onClick={() => { setActiveFilter(filter); setVisibleCount(6); }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative px-8 py-3.5 rounded-xl text-lg font-semibold transition-colors duration-300 focus:outline-none overflow-hidden"
                  style={
                    isActive
                      ? {
                        background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 60%, #5b21b6 100%)',
                        color: '#ffffff',
                        boxShadow: '0 0 22px rgba(124,58,237,0.55), 0 0 6px rgba(124,58,237,0.3)',
                        border: '1px solid rgba(139,92,246,0.6)',
                      }
                      : {
                        background: 'rgba(255,255,255,0.03)',
                        color: '#9ca3af',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }
                  }
                >
                  {/* Hover tint for inactive */}
                  {!isActive && (
                    <span className="absolute inset-0 bg-white/0 hover:bg-white/[0.04] transition-colors duration-300 rounded-xl pointer-events-none" />
                  )}
                  <span className="relative z-10">{filter}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Project Count — right side */}
          <div className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-lg font-medium text-dark-textMuted whitespace-nowrap font-syne hover:bg-dark-primary/10 hover:text-white transition-colors duration-300">
            <span className="text-dark-secondary font-extrabold text-xl leading-none">
              {filteredProjects.length}
            </span>
            <span>of {projects.length} projects</span>
          </div>
        </div>

        {/* Projects Grid: Exhibit Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
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
                className="group relative h-[500px] rounded-3xl overflow-hidden border border-dark-border bg-dark-surface cursor-pointer"
              >
                {/* Immersive Full Image */}
                <img
                  src={project.image}
                  alt={project.title}
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Actions Row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">

          {/* Load More — shows more cards inline */}
          {visibleCount < filteredProjects.length && (
            <MagneticButton
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="px-12 py-5 bg-dark-surface border border-dark-border rounded-full font-bold hover:border-dark-primary transition-all group overflow-hidden relative font-syne tracking-tighter-tight"
            >
              <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest">
                More Artifacts
                <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  ↓
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-dark-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
            </MagneticButton>
          )}

          {/* Explore Case Studies → /artifacts page */}
          <Link to="/artifacts">
            <MagneticButton className="px-12 py-5 bg-dark-primary text-dark-bg rounded-full font-bold hover:scale-105 transition-all group overflow-hidden relative">
              <span className="font-display relative z-10 flex items-center gap-3 uppercase tracking-widest">
                Explore Case Studies
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </span>
            </MagneticButton>
          </Link>

        </div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pt-10 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-dark-surface border border-dark-border p-6 md:p-10 rounded-3xl max-w-5xl w-full relative overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 p-3 backdrop-blur-md rounded-full text-dark-primary hover:bg-blur/50 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className="overflow-y-auto no-scrollbar pb-6 ">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                  {/* Left Column: Image and Actions */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl border border-dark-border/50 group">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 pb-8 items-end flex to-transparent opacity-90" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="px-4 py-1.5 bg-dark-primary/20 backdrop-blur-md rounded-full text-xs font-bold text-dark-primary border border-dark-primary/30 tracking-[0.2em] uppercase inline-block mb-3">
                          {selectedProject.category}
                        </span>
                        <h3 className="text-3xl font-display font-bold text-white">
                          {selectedProject.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 bg-dark-primary text-dark-bg font-bold rounded-2xl hover:bg-white hover:text-black transition-colors"
                      >
                        <ExternalLink size={20} /> Launch Project
                      </a>
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 bg-dark-surface text-white font-bold rounded-2xl border border-dark-border hover:border-dark-textMuted transition-colors"
                      >
                        <Github size={20} /> Source Code
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Details */}
                  <div className="lg:col-span-7 flex flex-col pt-2 md:pt-4 lg:pr-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center gap-2 px-2 py-2 bg-dark-primary/30 border border-dark-border rounded-full text-xs font-bold text-dark-textMuted uppercase tracking-wider">
                        <span className={`w-2 h-2 rounded-full ${selectedProject.status === 'Completed' ? 'bg-dark-accent' : 'bg-dark-secondary'}`} />
                        {selectedProject.status}
                      </div>
                    </div>

                    <h4 className="text-xl font-display font-bold mb-4 text-dark-primary">About the Project</h4>
                    <p className="text-dark-textMuted leading-relaxed text-base md:text-lg mb-10">
                      {selectedProject.description}
                    </p>

                    {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                      <div className="mb-10">
                        <h4 className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-wider mb-6 border-b border-dark-border pb-3">
                          <Zap size={18} className="text-dark-secondary" /> Core Features
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedProject.keyFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 bg-dark-bg/50 p-4 rounded-xl border border-dark-border/50 shadow-sm group hover:border-dark-secondary/50 transition-colors">
                              <span className="mt-[4px] w-2 h-2 rounded-full bg-dark-secondary shrink-0 transition-all duration-300" />
                              <span className="text-white text-sm group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-auto">
                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5 border-b border-dark-border pb-3">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map(tag => (
                            <span key={tag} className="text-xs font-code text-dark-secondary bg-dark-secondary/10 px-3 py-2 rounded-lg border border-dark-secondary/20 hover:border-dark-secondary hover:bg-dark-secondary/30 hover:-translate-y-1 transition-all cursor-default">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Skills Used */}
                      {selectedProject.skillsUsed && selectedProject.skillsUsed.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5 border-b border-dark-border pb-3">Skills Utilized</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.skillsUsed.map(skill => (
                              <span key={skill} className="text-xs font-code text-dark-primary bg-dark-primary/10 px-3 py-2 rounded-lg border border-dark-primary/20 hover:border-dark-primary hover:bg-dark-primary/30 hover:-translate-y-1 transition-all cursor-default">
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


