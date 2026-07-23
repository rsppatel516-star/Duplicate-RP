import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
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

  const schema = study ? {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `https://patelrudra.in/artifacts/${study.id}#artifact`,
    "mainEntityOfPage": `https://patelrudra.in/artifacts/${study.id}`,
    "name": study.title,
    "headline": study.title,
    "alternativeHeadline": study.subtitle,
    "description": study.description,
    "image": study.image.startsWith('http') ? study.image : `https://patelrudra.in${study.image}`,
    "url": `https://patelrudra.in/artifacts/${study.id}`,
    "creator": {
      "@type": "Person",
      "name": "Rudra Patel",
      "jobTitle": "Digital Architect & Full-Stack Engineer",
      "url": "https://patelrudra.in"
    },
    "genre": study.category,
    "keywords": study.tags?.join(', '),
    "abstract": study.problem,
    "hasPart": study.keyFeatures?.map(feature => ({
      "@type": "CreativeWork",
      "name": feature
    }))
  } : null;

  return (
    <div className="min-h-screen text-dark-textMain overflow-x-hidden">
      <SEO
        title={`${study.title} | Case Study`}
        description={study.description}
        keywords={study.tags?.join(', ') || study.category}
        ogTitle={`${study.title} — Technical Case Study by Rudra Patel`}
        ogDescription={study.subtitle || study.description}
        ogImage={study.image}
        canonical={`https://patelrudra.in/artifacts/${study.id}`}
        schema={schema}
      />


      {/* ── HERO BANNER ─────────────────────────── */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="absolute inset-0 z-0"
        >
          <img
            src={study.image}
            alt={`${study.title} technical case study banner - ${study.category} by Rudra Patel`}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/40 z-[5]" />
        </motion.div>

        {/* Back Nav */}
        <Link
          to="/artifacts"
          className="absolute top-12 left-6 md:top-16 md:left-12 z-30 group"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-white/70 hover:text-white transition-all text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] bg-white/5 backdrop-blur-md px-5 py-3 md:px-6 md:py-3.5 rounded-full border border-white/10 hover:border-white/20 mt-8"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1.5" />
            Artifacts
          </motion.div>
        </Link>

        <div className="relative z-20 max-w-6xl mx-auto px-6 pt-10 md:pt-20 w-full text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="space-y-6 md:space-y-8"
          >
            <motion.div variants={sv} className="flex justify-center">
              <span className="inline-flex items-center gap-3 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-dark-primary/30 bg-dark-primary/10 text-dark-primary text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-dark-primary animate-pulse" />
                Deep Dive artifact
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 100 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tighter leading-[0.9] sm:leading-tight md:leading-[0.9]"
              >
                {study.title}
              </motion.h1>
            </div>

            <motion.p
              variants={sv}
              className="text-base sm:text-lg md:text-2xl font-light text-white/60 max-w-3xl mx-auto leading-relaxed"
            >
              {study.subtitle}
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-t from-dark-primary/60 to-transparent" />
        </motion.div>
      </section>

      <div className="relative z-10">
        {/* ── METADATA ROW ─────────────────────────── */}
        <div className="max-w-5xl mx-auto px-6 relative z-10 -mt-8 md:-mt-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={container}
            className="grid grid-cols-2 md:grid-cols-4 p-2 md:p-3 bg-dark-surface/90 backdrop-blur-2xl border border-white/15 rounded-3xl md:rounded-[2rem] gap-2 md:gap-3"
          >
            {[
              {
                label: "Category",
                value: study.category,
                Icon: Tag,
                accent: "from-indigo-500/20 to-purple-500/20 text-indigo-400 border-indigo-500/30",
              },
              {
                label: "My Role",
                value: study.role || "Lead Architect",
                Icon: User,
                accent: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
              },
              {
                label: "Stack",
                value: `${study.tags.length} Technologies`,
                Icon: Layers,
                accent: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30",
              },
              {
                label: "Features",
                value: `${study.keyFeatures?.length || 0} Key Points`,
                Icon: Target,
                accent: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
              },
            ].map(({ label, value, Icon: IconComponent, accent, glow }) => (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="group relative p-5 md:p-6 rounded-2xl md:rounded-[1.5rem] bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between gap-3 overflow-hidden cursor-default hover:-translate-y-1"
              >
                {/* Top Ambient Soft Glow on Hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors pointer-events-none" />

                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accent} border flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${glow}`}>
                    <IconComponent size={18} />
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors" />
                </div>

                <div className="space-y-1 z-10">
                  <p className="text-[10px] md:text-[11px] text-white/50 group-hover:text-white/80 uppercase tracking-[0.25em] font-black transition-colors">
                    {label}
                  </p>
                  <p className="text-xs md:text-sm lg:text-base font-bold text-white tracking-tight leading-snug group-hover:translate-x-0.5 transition-transform">
                    {value}
                  </p>
                </div>
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
              <p className="text-sm md:text-lg leading-relaxed font-light text-white/90 max-w-4xl">
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
                  className="font-bricolage px-6 py-3 bg-dark-primary/[0.05] border border-dark-primary/10 rounded-2xl text-dark-primary font-bold text-xs uppercase tracking-widest hover:bg-dark-primary hover:text-white transition-transform-duration-500 hover:-translate-y-0.5 transition-all
                  cursor-default"
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