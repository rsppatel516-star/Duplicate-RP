import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experience, certifications } from '../data/experience';
import {
  Briefcase, GraduationCap, Trophy,
  Award, Calendar, CheckCircle2, ArrowUpRight
} from 'lucide-react';
import { FaAws, FaReact, FaNodeJs, FaDatabase, FaShieldAlt, FaGithub } from 'react-icons/fa';

const iconMap = {
  aws: <FaAws className="text-[#FF9900]" />,
  react: <FaReact className="text-[#61DAFB]" />,
  node: <FaNodeJs className="text-[#339933]" />,
  database: <FaDatabase className="text-[#47A248]" />,
  shield: <FaShieldAlt className="text-gray-500" />,
  github: <FaGithub className="text-white" />
};

export default function Experience() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-32  relative overflow-hidden">

      {/* Background Orbs */}
      <div className="absolute top-1/2 right-[-5%] w-[400px] h-[400px]  rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6 text-dark-secondary font-code text-sm tracking-widest uppercase"
            >
              <Award size={18} />
              <span>Career & Growth</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tight leading-[1.2] md:leading-[1.15] animated-gradient-text">
              Architecting <span className="text-gradient">Success</span> One Milestone at a Time
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Timeline Section */}
          <div className="space-y-12 relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-dark-surface rounded-2xl border border-dark-border flex items-center justify-center text-dark-primary shadow-[0_0_20px_rgba(124,58,237,0.15)]">
                <Briefcase size={22} />
              </div>
              <h3 className="text-2xl font-display font-bold tracking-tight">Professional Path</h3>
            </div>

            <div ref={timelineRef} className="relative ml-6 space-y-12">
              {/* Background Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-dark-border/30" />

              {/* Laser Glowing Line */}
              <motion.div
                style={{ scaleY, transformOrigin: 'top' }}
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-dark-primary via-dark-secondary to-dark-primary shadow-[0_0_15px_rgba(124,58,237,0.5)]"
              />

              {experience.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="relative pl-12 group"
                >
                  {/* Timeline Point */}
                  <div className="absolute -left-[6.5px] top-2 w-[14px] h-[14px] rounded-full bg-dark-bg border-2 border-dark-border group-hover:border-dark-primary transition-all duration-500 z-10">
                    <div className="absolute inset-0 rounded-full bg-dark-primary/0 group-hover:bg-dark-primary/20 animate-pulse" />
                  </div>

                  <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-dark-primary/30 hover:bg-white/[0.04] transition-all duration-500 group-hover:-translate-y-1 relative overflow-hidden">
                    {/* Subtle Gradient Background on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-dark-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-3 text-dark-primary font-bold text-[10px] tracking-[0.3em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                        <Calendar size={14} className="text-dark-secondary" />
                        {item.duration}
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-2xl font-bold font-display text-white group-hover:text-dark-primary transition-colors duration-300">
                          {item.role}
                        </h4>
                        <p className="text-md font-bold text-dark-textMuted group-hover:text-dark-textMain transition-colors flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-dark-primary/40 group-hover:bg-dark-primary" />
                          {item.company}
                        </p>
                      </div>

                      <ul className="space-y-4 mt-6">
                        {item.points.map((point, i) => (
                          <li key={i} className="flex gap-4 text-[13px] text-dark-textMuted leading-relaxed font-bricolage group/item">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-dark-secondary/30 group-hover/item:bg-dark-secondary transition-colors shrink-0" />
                            <span className="group-hover/item:text-dark-textMain transition-colors">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="space-y-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-dark-surface rounded-2xl border border-dark-border flex items-center justify-center text-dark-primary shadow-[0_0_20px_rgba(124,58,237,0.15)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-dark-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Trophy size={22} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-display font-bold tracking-tight">Badges & Achievements</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  onClick={() => cert.pdfUrl && window.open(cert.pdfUrl, '_blank')}
                  className={`group relative h-full bg-white/[0.01] border border-white/5 hover:border-dark-primary/30 rounded-3xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.03] hover:shadow-[0_10px_40px_-10px_rgba(124,58,237,0.15)] ${cert.pdfUrl ? 'cursor-pointer' : ''}`}
                >
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-primary/0 via-transparent to-dark-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* High-Tech Scanline Effect on Hover */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-dark-primary/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-dark-surface/50 border border-dark-border flex items-center justify-center text-3xl shrink-0 group-hover:border-dark-primary/40 group-hover:bg-dark-surface transition-all duration-500 shadow-lg">
                      <div className="transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                        {iconMap[cert.icon] || <Trophy className="text-dark-primary" />}
                      </div>
                    </div>
                    {cert.pdfUrl && (
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 text-dark-primary hover:bg-dark-primary hover:text-white">
                        <ArrowUpRight size={16} />
                      </div>
                    )}
                  </div>

                  <div className="relative z-10">
                    <h4 className="text-lg font-bold font-display text-white mb-2 leading-tight group-hover:text-dark-primary transition-colors duration-300 line-clamp-2">
                      {cert.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-auto">
                      <CheckCircle2 size={12} className="text-dark-secondary" />
                      <p className="text-[10px] text-dark-textMuted font-bold uppercase tracking-[0.15em] flex items-center gap-1.5">
                        {cert.issuer} <span className="w-1 h-1 rounded-full bg-dark-border" /> {cert.date}
                      </p>
                    </div>
                  </div>

                  {/* Corner Accent Glow */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-dark-primary/10 rounded-full blur-[30px] group-hover:bg-dark-primary/20 transition-colors duration-700 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


