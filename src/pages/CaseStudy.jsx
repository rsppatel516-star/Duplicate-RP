import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { caseStudies } from '../data/caseStudies';
import {
  ArrowLeft, CheckCircle2, Cpu, Zap, ExternalLink, ChevronRight,
  Tag, User, Layers, Target, Lightbulb, TrendingUp, MessageSquare
} from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';

const SectionLabel = ({ icon: IconComponent, label, color = "text-dark-primary" }) => (
  <div className={`flex items-center gap-1 ${color}`}>
    <IconComponent size={16} />
    <span className="text-[10px] font-black uppercase tracking-[0.35em]">{label}</span>
  </div>
);

export default function CaseStudy() {
  const { id } = useParams();
  const study = caseStudies.find(s => s.id === parseInt(id));

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg text-dark-textMain">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-display font-bold">Project Not Found</h2>
          <Link to="/" className="text-dark-primary hover:underline text-sm font-medium">← Return Home</Link>
        </div>
      </div>
    );
  }

  const sv = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen text-dark-textMain overflow-x-hidden">
      <Helmet>
        <title>{study.title} | Case Study | Rudra Patel</title>
        <meta name="description" content={study.description} />
      </Helmet>

      {/* Background Decorative Glows */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] -left-20 w-96 h-96 bg-dark-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] -right-20 w-[500px] h-[500px] bg-dark-secondary/5 rounded-full blur-[140px]" />
      </div>

      {/* Progress Bar
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left"
        style={{ scaleX, background: 'linear-gradient(to right, var(--color-dark-primary), var(--color-dark-secondary))' }}
      /> */}

      {/* ── HERO BANNER ─────────────────────────── */}
      <section className="relative h-[100vh] min-h-[500px] flex items-end overflow-hidden bg-dark-bg/20 backdrop-blur-md">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="absolute inset-0 z-0">
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/20 z-[1]" />

        {/* Back Nav */}
        <Link to="/artifacts" className="absolute top-20 left-4 md:top-24 md:left-8 z-30 group">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-dark-textMuted hover:text-black transition-all text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] bg-dark-bg/20 backdrop-blur-md px-4 py-2.5 md:px-5 md:py-3 rounded-full border border-white/5"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1.5" />
            Artifacts
          </motion.div>
        </Link>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-12 md:pb-20 w-full top-5">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="space-y-6"
          >
            {/*<motion.div variants={sv}>
              <span className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-dark-primary/30 bg-dark-primary/10 text-dark-primary text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-dark-primary animate-ping" />
                Deep Dive artifact
              </span>
            </motion.div>*/}

            <div className="overflow-hidden ">
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 120 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-[0.9] md:leading-[0.8] tracking-[-0.04em] text-white mb-6 md:mb-10"
              >
                {study.title}
              </motion.h1>
            </div>

            <motion.p
              variants={sv}
              className="text-lg md:text-2xl font-light text-dark-primary/70 max-w-2xl leading-relaxed"
            >
              {study.subtitle}
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-3"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-t from-dark-primary/60 to-transparent" />
        </motion.div>*/}
      </section>

      <div className="relative z-10">
        {/* ── METADATA ROW ─────────────────────────── */}
        <div className="max-w-5xl mx-auto px-6 relative z-10 mt-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={container}
            className="grid grid-cols-2 md:grid-cols-4 bg-dark-surface/80 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl "
          >
            {[
              { label: "Category", value: study.category, Icon: Tag },
              { label: "My Role", value: study.role || "Lead Architect", Icon: User },
              { label: "Stack", value: `${study.tags.length} Technologies`, Icon: Layers },
              { label: "Features", value: `${study.keyFeatures?.length || 0} Key Points`, Icon: Target },
            ].map(({ label, value, Icon: IconComponent }) => (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="px-4 py-6 md:px-8 md:py-8 flex flex-col gap-2 hover:bg-white/[0.03] transition-colors border-r border-white/5 last:border-0"
              >
                <IconComponent size={18} className="text-dark-primary/60 mb-1" />
                <p className="text-[9px] md:text-[10px] text-dark-textMuted uppercase tracking-[0.2em] font-black">{label}</p>
                <p className="text-xs md:text-sm lg:text-base font-bold text-white leading-tight">{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── MAIN CONTENT ─────────────────────────── */}
        <div className="max-w-5xl mx-auto px-6 py-24 space-y-24">

          {/* About */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sv} className="space-y-8 mb-10">
            <SectionLabel icon={Lightbulb} label="The Narrative" />
            <div className="border-l-2 border-dark-primary/40 pl-8">
              <p className="text-5lg md:text-2xl leading-relaxed font-light text-white/90 max-w-4xl">
                {study.description}
              </p>
            </div>
          </motion.section>



          {/* Challenge + Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 -mb-10">
            <motion.section
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <SectionLabel icon={Zap} label="The Challenge" color="text-amber-400" />
              <div className="p-8 bg-amber-500/[0.03] border border-amber-500/10 rounded-[2rem] hover:bg-amber-500/[0.05] transition-colors group">
                <p className="text-base md:text-lg leading-relaxed text-white/70 group-hover:text-white/90 transition-colors">{study.problem}</p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <SectionLabel icon={Cpu} label="The Solution" color="text-emerald-400" />
              <div className="p-8 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-[2rem] hover:bg-emerald-500/[0.05] transition-colors group">
                <p className="text-base md:text-lg leading-relaxed text-white/70 group-hover:text-white/90 transition-colors">{study.solution}</p>
              </div>
            </motion.section>
          </div>


          {/* Key Features */}
          {study.keyFeatures && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sv} className="space-y-8 mt-24">
              <SectionLabel icon={Target} label="Core Architecture" color="text-dark-secondary" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {study.keyFeatures.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-5 p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-dark-secondary/40 hover:bg-dark-secondary/[0.03] transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-dark-secondary/10 flex items-center justify-center group-hover:bg-dark-secondary/20 transition-colors">
                      <CheckCircle2 size={20} className="text-dark-secondary group-hover:scale-110 transition-transform-all duration-300 hover:-translate-y-1 cursor-default" />
                    </div>
                    <span className="text-base font-medium text-dark-textMuted group-hover:text-white transition-colors">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Tools */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sv} className="space-y-8">
            <SectionLabel icon={Layers} label="Tech Stack" />
            <div className="flex flex-wrap gap-4">
              {study.tags.map((tag, i) => (
                <motion.span key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 200, damping: 20 }}
                  className="font-bricolage px-6 py-3 bg-dark-primary/[0.05] border border-dark-primary/10 rounded-2xl text-dark-primary font-bold text-xs uppercase tracking-widest hover:bg-dark-primary hover:text-white transition-transform-duration-500 hover:-translate-y-1 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.section>

          {/* Outcome + Final Resolution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-8">
            {/* Results Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sv}
              className="relative overflow-hidden p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-dark-primary/10 via-transparent to-dark-secondary/5" />
              <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-dark-primary/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative z-10 h-full flex flex-col justify-between space-y-8">
                <SectionLabel icon={TrendingUp} label="The Outcome" color="text-dark-primary" />
                <p className="text-xl md:text-2xl font-display font-medium text-white italic leading-relaxed">
                  &quot;{study.results}&quot;
                </p>
                <div className="pt-2 text-[10px] font-black uppercase tracking-[0.3em] text-dark-textMuted">Impact resolution</div>
              </div>
            </motion.section>

            {/* CTA Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sv}
              className="flex flex-col justify-between p-10 rounded-[2.5rem] bg-gradient-to-br from-dark-surface to-dark-bg border border-white/10 shadow-2xl space-y-10"
            >
              <div className="space-y-4">
                <SectionLabel icon={MessageSquare} label="Next Phase" />
                <h3 className="text-4xl font-display font-bold text-white tracking-tighter leading-tight">Ready for the <br />Next Big Thing?</h3>
                <p className="text-dark-textMuted text-sm leading-relaxed max-w-xs">Available for selected high-performance partnerships.</p>
              </div>

              <div className="flex flex-col gap-4">
                <a href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                  <MagneticButton>
                    <button className="w-full px-8 py-4 bg-dark-primary text-white font-black text-[10px] tracking-[0.35em] uppercase rounded-2xl flex items-center justify-center gap-3  transition-all group scale-100 hover:scale-[1.02] active:scale-95">
                      <ExternalLink size={16} className="stroke-[3px]" />
                      Explore Live
                    </button>
                  </MagneticButton>
                </a>
                <Link to="/#contact" className="w-full">
                  <MagneticButton>
                    <button className="w-full px-8 py-4 bg-transparent border border-white/10 text-white font-black text-[10px] tracking-[0.35em] uppercase rounded-2xl flex items-center justify-center gap-3 transition-all scale-100 hover:scale-[1.02] active:scale-95">
                      <a href="/#contact">Contact</a>
                    </button>
                  </MagneticButton>
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}