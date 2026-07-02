import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { experience, certifications } from '../data/experience';
import {
  Briefcase, Trophy, Award, Calendar, CheckCircle2,
  X, ShieldCheck, Cpu, ArrowUpRight
} from 'lucide-react';
import { FaAws, FaReact, FaNodeJs, FaDatabase, FaShieldAlt, FaGithub } from 'react-icons/fa';

const iconMap = {
  aws: <FaAws className="text-[#FF9900]" />,
  react: <FaReact className="text-[#61DAFB]" />,
  node: <FaNodeJs className="text-[#339933]" />,
  database: <FaDatabase className="text-[#47A248]" />,
  shield: <FaShieldAlt className="text-gray-400" />,
  github: <FaGithub className="text-white" />
};

export default function Experience() {
  const [activeTab, setActiveTab] = useState('work'); // 'work' | 'certs'
  const [selectedCert, setSelectedCert] = useState(null);
  
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 right-[-5%] w-[400px] h-[400px] bg-dark-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4 text-[#6366f1] font-code text-sm tracking-widest uppercase"
          >
            <Award size={18} />
            <span>Career Path</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tight leading-[1.2] animated-gradient-text">
            Architecting <span className="text-gradient">Success</span> One Step at a Time
          </h2>

          {/* Work Timeline vs Certifications Sliding Tab Selector */}
          <div className="mt-10 flex bg-white/5 border border-white/10 p-1.5 rounded-2xl gap-2 w-fit relative z-20">
            <button
              onClick={() => setActiveTab('work')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all relative ${
                activeTab === 'work' ? 'text-white' : 'text-dark-textMuted hover:text-white'
              }`}
            >
              {activeTab === 'work' && (
                <motion.div
                  layoutId="activeExperienceTab"
                  className="absolute inset-0 bg-indigo-600/30 border border-indigo-500/40 rounded-xl"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
              <Briefcase size={14} className="relative z-10" />
              <span className="relative z-10">Professional Path</span>
            </button>
            <button
              onClick={() => setActiveTab('certs')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all relative ${
                activeTab === 'certs' ? 'text-white' : 'text-dark-textMuted hover:text-white'
              }`}
            >
              {activeTab === 'certs' && (
                <motion.div
                  layoutId="activeExperienceTab"
                  className="absolute inset-0 bg-indigo-600/30 border border-indigo-500/40 rounded-xl"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
              <Trophy size={14} className="relative z-10" />
              <span className="relative z-10">Certifications</span>
            </button>
          </div>
        </div>

        {/* Tab content view */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* 1. Work / Professional timeline */}
            {activeTab === 'work' && (
              <motion.div
                key="work-timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl mx-auto relative"
              >
                <div ref={timelineRef} className="relative pl-6 sm:pl-10 space-y-12">
                  
                  {/* Background Timeline Path Line */}
                  <div className="absolute left-0 top-2 bottom-2 w-[1.5px] bg-white/10" />

                  {/* Glowing dynamic scroll line */}
                  <motion.div
                    style={{ scaleY, transformOrigin: 'top' }}
                    className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#6366f1] via-[#8b5cf6] to-pink-500 shadow-[0_0_12px_rgba(99,102,241,0.6)]"
                  />

                  {experience.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className="relative pl-6 group"
                    >
                      {/* Timeline point marker */}
                      <div className="absolute -left-[30px] sm:-left-[34px] top-2 w-[10px] h-[10px] rounded-full bg-black border-2 border-white/20 group-hover:border-[#6366f1] transition-colors duration-300 z-10 shadow-[0_0_8px_rgba(255,255,255,0.05)]">
                        <div className="absolute inset-0 rounded-full bg-[#6366f1]/0 group-hover:bg-[#6366f1]/20 animate-pulse" />
                      </div>

                      {/* Timeline Card */}
                      <div className="p-6 md:p-8 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-indigo-500/20 hover:bg-white/[0.03] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="relative z-10 space-y-4">
                          <div className="flex items-center gap-2 text-indigo-400 font-bold text-[10px] tracking-[0.2em] uppercase">
                            <Calendar size={13} />
                            {item.duration}
                          </div>

                          <div className="space-y-1">
                            <h3 className="text-2xl font-bold font-display text-white group-hover:text-indigo-400 transition-colors">
                              {item.role}
                            </h3>
                            <p className="text-sm font-bold text-dark-textMuted flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]/50" />
                              {item.company}
                            </p>
                          </div>

                          <ul className="space-y-3 pt-2">
                            {item.points.map((point, i) => (
                              <li key={i} className="flex gap-3 text-xs md:text-sm text-dark-textMuted leading-relaxed font-bricolage group/item">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500/30 group-hover/item:bg-indigo-500 transition-colors shrink-0" />
                                <span className="group-hover/item:text-white transition-colors">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 2. Certifications View */}
            {activeTab === 'certs' && (
              <motion.div
                key="certs-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
              >
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                    onClick={() => setSelectedCert(cert)}
                    className="group relative bg-white/[0.01] border border-white/5 hover:border-indigo-500/30 rounded-3xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.03] hover:shadow-[0_10px_30px_rgba(99,102,241,0.1)] cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-dark-surface/50 border border-dark-border flex items-center justify-center text-3xl shrink-0 group-hover:border-indigo-500/40 group-hover:bg-dark-surface transition-all duration-500 shadow-md">
                        <div className="transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                          {iconMap[cert.icon] || <Trophy className="text-indigo-400" />}
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 text-indigo-400 hover:bg-[#6366f1] hover:text-white">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="relative z-10 space-y-3">
                      <h4 className="text-lg font-bold font-display text-white group-hover:text-indigo-400 transition-colors duration-300 leading-snug line-clamp-2">
                        {cert.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-auto">
                        <CheckCircle2 size={12} className="text-indigo-400" />
                        <p className="text-[10px] text-dark-textMuted font-bold uppercase tracking-wider flex items-center gap-1.5">
                          {cert.issuer} <span className="w-1.5 h-1.5 rounded-full bg-white/10" /> {cert.date}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* ── STUNNING DIGITAL CREDENTIAL LIGHTBOX MODAL ────────────────── */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#090911] border border-indigo-500/20 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center text-center select-none overflow-hidden cursor-default"
            >
              {/* Futuristic grids / glow inside modal */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#6366f1] via-pink-500 to-transparent" />
              
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-5 right-5 p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              {/* Verified Seal Icon */}
              <div className="relative w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                {iconMap[selectedCert.icon] || <Trophy className="text-[#6366f1]" />}
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-black w-6 h-6 rounded-full border-2 border-[#090911] flex items-center justify-center shadow-lg">
                  <ShieldCheck size={14} className="text-white" strokeWidth={3} />
                </div>
              </div>

              {/* Credentials text details */}
              <div className="space-y-4 relative z-10 w-full">
                <span className="text-[10px] font-code text-[#6366f1] tracking-[0.3em] uppercase block font-black">Verified Digital Credential</span>
                <h3 className="text-2xl font-bold font-display text-white leading-tight">
                  {selectedCert.title}
                </h3>
                
                <div className="py-4 px-6 bg-white/[0.02] border border-white/5 rounded-2xl max-w-xs mx-auto text-left space-y-2">
                  <div className="flex justify-between text-xs font-code">
                    <span className="text-dark-textMuted">ISSUER:</span>
                    <span className="text-white font-bold">{selectedCert.issuer}</span>
                  </div>
                  <div className="flex justify-between text-xs font-code">
                    <span className="text-dark-textMuted">DATE:</span>
                    <span className="text-white font-bold">{selectedCert.date}</span>
                  </div>
                  <div className="flex justify-between text-xs font-code border-t border-white/5 pt-2 mt-2">
                    <span className="text-dark-textMuted">STATUS:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 size={10} /> ACTIVE_VERIFIED
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider text-white/80 transition-all"
                  >
                    Close
                  </button>
                  {selectedCert.pdfUrl && (
                    <a
                      href={selectedCert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 bg-[#6366f1] hover:bg-indigo-600 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] flex items-center gap-2"
                    >
                      Verify <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
