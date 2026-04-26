import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { featuredArtifacts } from '../data/featuredArtifacts';
import { caseStudies } from '../data/caseStudies';
import { ArrowUpRight, Briefcase } from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';

// Build a quick lookup: caseStudy id → true, so we know which projects have deep-dives
const caseStudyIds = new Set(caseStudies.map((cs) => cs.id));

export default function Artifacts() {
  return (
    <div className="min-h-screen bg-dark-bg text-dark-textMain pt-32 pb-20 relative overflow-hidden">
      <Helmet>
        <title>Featured Artifacts | Rudra Patel</title>
        <meta
          name="description"
          content="A curated collection of digital products and technical case studies by Rudra Patel."
        />
      </Helmet>

      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-dark-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-dark-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="mb-24"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-3 mb-8 text-dark-secondary font-code text-sm tracking-widest uppercase"
          >
            <div className="w-8 h-[1px] bg-dark-secondary/30" />
            <Briefcase size={16} />
            <span>The Repository</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="overflow-hidden">
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 80 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-9xl font-display font-bold leading-[0.85] tracking-tighter"
              >
                Featured <br /> <span className="text-gradient">Artifacts</span>.
              </motion.h1>
            </div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-md"
            >
              <p className="text-dark-textMuted text-xl border-l-2 border-dark-secondary/40 px-8 py-2 font-medium leading-relaxed ">
                Deep-diving into selected works that define my standards for
                performance, architecture, and design.
              </p>
            </motion.div>
          </div>

          {/* Count pill */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 }
            }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex items-center gap-2 w-fit px-6 py-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm text-base font-medium text-dark-textMuted hover:border-dark-secondary/30 transition-colors cursor-default"
          >
            <span className="text-dark-secondary font-extrabold text-2xl leading-none">
              {featuredArtifacts.length}
            </span>
            <span className="tracking-wide">artifacts in the vault</span>
          </motion.div>
        </motion.div>

        {/* ── Artifact List ── */}
        <div className="space-y-48">
          {featuredArtifacts.map((project, idx) => {
            const hasCaseStudy = caseStudyIds.has(project.id);
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.1
                    }
                  }
                }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-16 md:gap-28 items-center`}
              >
                {/* ── Image Side ── */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: isEven ? -50 : 50, scale: 0.95 },
                    visible: { opacity: 1, x: 0, scale: 1 }
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-[55%] relative group"
                >
                  <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden border border-dark-border/50 bg-dark-surface shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-dark-bg/30 group-hover:bg-dark-bg/0 transition-colors duration-700" />
                  </div>

                  {/* Category Tag */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-6 -left-6 px-7 py-3 bg-dark-surface/90 backdrop-blur-xl border border-white/5 rounded-2xl z-20 shadow-2xl"
                  >
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-dark-secondary">
                      {project.category}
                    </span>
                  </motion.div>

                  {/* Action Badge (Case Study or Status) */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="absolute -top-6 -right-6 z-20"
                  >
                    {/*{hasCaseStudy ? (
                      <Link to={`/artifacts/${project.id}`}>
                        <MagneticButton>
                          <div className="flex items-center gap-3 px-7 py-3 bg-dark-textMain text-dark-bg rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] border border-white/10 hover:shadow-dark-primary/40 transition-all cursor-pointer group">
                            <div className="relative">
                              <div className="w-2.5 h-2.5 rounded-full bg-dark-bg animate-ping absolute opacity-50" />
                              <div className="w-2.5 h-2.5 rounded-full bg-dark-bg relative" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.2em]">
                              Read Case Study
                            </span>
                            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[3px]" />
                          </div>
                        </MagneticButton>
                      </Link>
                    ) : (
                      <div className="flex items-center gap-3 px-6 py-3 bg-dark-surface/90 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl">
                        <div className="relative">
                          <div className={`w-2.5 h-2.5 rounded-full ${project.status === 'Completed' ? 'bg-emerald-400' : 'bg-dark-secondary'
                            } animate-ping absolute opacity-50`} />
                          <div className={`w-2.5 h-2.5 rounded-full ${project.status === 'Completed' ? 'bg-emerald-400' : 'bg-dark-secondary'
                            } relative`} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-dark-textMuted">
                          {project.status}
                        </span>
                      </div>
                    )}*/}
                  </motion.div>
                </motion.div>

                {/* ── Content Side ── */}
                <div className="w-full lg:w-[45%] space-y-8">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="space-y-4"
                  >
                    <span className="font-code text-dark-secondary text-sm font-bold tracking-[0.3em] uppercase opacity-70">
                      /{String(idx + 1).padStart(2, '0')}
                    </span>

                    <h2 className="text-5xl md:text-7xl font-display font-bold text-dark-textMain leading-[1.1]">
                      {project.title}
                    </h2>
                  </motion.div>

                  {/* Features/Tags placeholders if you want them back, but let's stick to the current structure */}

                  {/* Case Study CTA */}
                  {hasCaseStudy && (
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="pt-4"
                    >
                      <Link to={`/artifacts/${project.id}`} className="inline-block">
                        <MagneticButton>
                          <button className="flex items-center gap-4 px-10 py-5 bg-dark-textMain text-dark-bg font-black rounded-full hover:scale-105 active:scale-95 transition-all hover:shadow-dark-primary/40 group uppercase text-xs tracking-[0.25em]">
                            Open Case Study
                            <ArrowUpRight
                              size={20}
                              className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform stroke-[3px]"
                            />
                          </button>
                        </MagneticButton>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
