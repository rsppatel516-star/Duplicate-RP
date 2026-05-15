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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tighter-tight animated-gradient-text">
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
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-dark-surface rounded-xl border border-dark-border flex items-center justify-center text-dark-secondary">
                <Trophy size={20} />
              </div>
              <h3 className="text-2xl font-display font-bold">Badges & Achievements</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => cert.pdfUrl && window.open(cert.pdfUrl, '_blank')}
                  className={`card group p-6 flex items-center gap-6 relative overflow-hidden ${cert.pdfUrl ? 'cursor-pointer' : ''}`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-dark-bg border border-dark-border flex items-center justify-center text-3xl shrink-0 group-hover:border-dark-secondary/50 group-hover:scale-110 transition-all duration-500">
                    {iconMap[cert.icon] || <Trophy className="text-dark-secondary" />}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-dark-secondary transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-dark-textMuted font-bold uppercase tracking-widest">
                      {cert.issuer} &bull; {cert.date}
                    </p>
                  </div>

                  {cert.pdfUrl && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity z-10 relative">
                      <ArrowUpRight size={20} className="text-dark-secondary" />
                    </div>
                  )}

                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-dark-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>

            {/* Extra context tile */}
            <div className="p-8 bg-dark-surface border border-dark-border rounded-3xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col gap-4">
                <GraduationCap size={40} className="text-dark-primary/20" />
                <h4 className="text-xl font-bold italic">Continual Learning Protocol</h4>
                <p className="text-sm text-dark-textMuted italic">
                  "Actively pursuing new industry standards and advanced architectural patterns. The learning never stops in the dev lab."
                </p>
              </div>
              <div className="absolute bottom-[-20px] right-[-20px] w-40 h-40 bg-dark-primary/5 rounded-full blur-[40px]" />
            </div>
          </div>

        </div>
      </div>


    </section>
  );
}


