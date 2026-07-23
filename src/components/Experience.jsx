import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experience, certifications } from '../data/experience';
import {
  Briefcase, GraduationCap, Trophy,
  Award, Calendar, CheckCircle2, ArrowUpRight, ShieldCheck, Sparkles, Building2
} from 'lucide-react';
import { FaAws, FaReact, FaNodeJs, FaDatabase, FaShieldAlt, FaGithub } from 'react-icons/fa';

const iconMap = {
  aws: <FaAws className="text-[#FF9900]" />,
  react: <FaReact className="text-[#61DAFB]" />,
  node: <FaNodeJs className="text-[#339933]" />,
  database: <FaDatabase className="text-[#47A248]" />,
  shield: <FaShieldAlt className="text-[#818CF8]" />,
  github: <FaGithub className="text-white" />
};

const certColors = {
  aws: '#FF9900',
  react: '#61DAFB',
  node: '#339933',
  database: '#47A248',
  shield: '#818CF8',
  github: '#ffffff'
};

export default function Experience() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-32 relative overflow-hidden text-white">

      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 right-[-5%] w-[450px] h-[450px] bg-dark-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-5%] w-[400px] h-[400px] bg-dark-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4 text-[#6366f1] font-code text-xs font-bold tracking-[0.3em] uppercase"
            >
              <Award size={18} className="animate-pulse text-indigo-400" />
              <span>Career & Growth</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.15] animated-gradient-text">
              Architecting <span className="text-gradient">Success</span> One Milestone at a Time
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column: Timeline Section (Professional Path) */}
          <div className="lg:col-span-6 space-y-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-dark-surface rounded-2xl border border-white/10 flex items-center justify-center text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                <Briefcase size={22} />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">Professional Path</h3>
                <p className="text-xs font-code text-dark-textMuted uppercase tracking-wider">Experience & Education Timeline</p>
              </div>
            </div>

            <div ref={timelineRef} className="relative ml-4 sm:ml-6 space-y-8 pt-4">
              {/* Background Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10" />

              {/* Laser Animated Line */}
              <motion.div
                style={{ scaleY, transformOrigin: 'top' }}
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)]"
              />

              {experience.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="relative pl-8 sm:pl-10 group"
                >
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[6.5px] top-3 w-[14px] h-[14px] rounded-full bg-dark-bg border-2 border-white/20 group-hover:border-indigo-400 transition-all duration-500 z-10 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                    <div className="absolute inset-0 rounded-full bg-indigo-500/0 group-hover:bg-indigo-500/40 animate-ping" />
                  </div>

                  <div className="p-6 sm:p-8 rounded-3xl bg-dark-surface/30 backdrop-blur-md border border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.03] hover:shadow-[0_12px_40px_-10px_rgba(99,102,241,0.2)] transition-all duration-500 group-hover:-translate-y-1 relative overflow-hidden">
                    {/* Hover Glow Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-code text-[10px] font-bold uppercase tracking-wider">
                          <Calendar size={12} className="text-indigo-400" />
                          {item.duration}
                        </div>
                        {item.type === 'education' ? (
                          <GraduationCap size={18} className="text-purple-400" />
                        ) : (
                          <Building2 size={18} className="text-indigo-400" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-gradient transition-colors duration-300">
                          {item.role}
                        </h4>
                        <p className="text-sm font-semibold text-dark-textMuted group-hover:text-white transition-colors flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          {item.company}
                        </p>
                      </div>

                      <ul className="space-y-3 pt-2">
                        {item.points.map((point, i) => (
                          <li key={i} className="flex gap-3 text-xs sm:text-sm text-dark-textMuted leading-relaxed font-bricolage group/item">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400/40 group-hover/item:bg-indigo-400 transition-colors shrink-0" />
                            <span className="group-hover/item:text-white transition-colors">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Achievements & Badges Grid */}
          <div className="lg:col-span-6 space-y-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-dark-surface rounded-2xl border border-white/10 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)] relative overflow-hidden group">
                <Trophy size={22} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">Badges & Achievements</h3>
                <p className="text-xs font-code text-dark-textMuted uppercase tracking-wider">Verified Certifications & Credentials</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              {certifications.map((cert, idx) => {
                const hexColor = certColors[cert.icon] || '#6366f1';
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="group relative bg-dark-surface/40 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-3xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 cursor-default shadow-lg"
                  >
                    {/* Top Row: Icon + Verified Badge */}
                    <div className="flex items-center justify-between mb-4 z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500 shadow-md">
                        {iconMap[cert.icon] || <Trophy className="text-indigo-400" size={22} />}
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-code font-bold uppercase tracking-wider text-emerald-400">
                        <ShieldCheck size={12} />
                        Verified
                      </div>
                    </div>

                    {/* Middle: Title */}
                    <div className="z-10 my-2">
                      <h4 className="text-base sm:text-lg font-bold font-display text-white mb-1.5 group-hover:text-gradient transition-colors leading-snug">
                        {cert.title}
                      </h4>
                      <p className="text-xs font-code text-dark-textMuted flex items-center gap-2">
                        <span>{cert.issuer}</span>
                      </p>
                    </div>

                    {/* Bottom: Date tag */}
                    <div className="z-10 mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-code font-bold text-dark-textMuted">
                      <span className="uppercase tracking-widest text-indigo-400 font-semibold">{cert.date}</span>
                      <span className="text-white/40 group-hover:text-white transition-colors">Credential Approved</span>
                    </div>

                    {/* Hover Ambient Glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle 120px at 50% 50%, ${hexColor}15, transparent)`
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
