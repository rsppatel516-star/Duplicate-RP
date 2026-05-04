import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { blogposts } from '../data/blogposts';
import { ArrowLeft, Clock, Tag, Calendar, Twitter, Linkedin, Link as LinkIcon, User } from 'lucide-react';

const SectionLabel = ({ icon: IconComponent, label, color = "text-dark-primary" }) => (
  <div className={`flex items-center gap-1 ${color}`}>
    <IconComponent size={16} />
    <span className="text-[10px] font-black uppercase tracking-[0.35em]">{label}</span>
  </div>
);

export default function BlogPost() {
  const { id } = useParams();
  const post = blogposts.find(p => p.id === parseInt(id));

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg text-dark-textMain">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-display font-bold">Post Not Found</h2>
          <Link to="/blog" className="text-dark-primary hover:underline text-sm font-medium">← Return to Blog</Link>
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
    <div className="min-h-screen text-dark-textMain bg-dark-bg overflow-x-hidden pb-32">
      <Helmet>
        <title>{post.seo?.metaTitle || `${post.title} | Blog | Rudra Patel`}</title>
        <meta name="description" content={post.seo?.metaDescription || post.excerpt} />
        {post.seo?.keywords && <meta name="keywords" content={post.seo.keywords.join(', ')} />}
        {post.seo?.canonical && <link rel="canonical" href={post.seo.canonical} />}
      </Helmet>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 origin-left bg-gradient-to-r from-dark-primary to-dark-secondary z-[200]" 
        style={{ scaleX: scrollYProgress }} 
      />

      {/* Background Decorative Glows */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] -left-20 w-96 h-96 bg-dark-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] -right-20 w-[500px] h-[500px] bg-dark-secondary/5 rounded-full blur-[140px]" />
      </div>

      {/* ── HERO BANNER ─────────────────────────── */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden bg-dark-bg/20 backdrop-blur-md rounded-b-[3rem] border-b border-white/5 shadow-2xl">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="absolute inset-0 z-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-black/20 z-[1]" />

        {/* Back Nav */}
        <Link to="/blog" className="absolute top-24 left-4 md:top-28 md:left-8 z-30 group">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-white hover:text-black transition-all text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] bg-white/10 backdrop-blur-md px-4 py-2.5 md:px-5 md:py-3 rounded-full border border-white/10 shadow-lg"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1.5" />
            Back to Blog
          </motion.div>
        </Link>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="space-y-6"
          >
            <motion.div variants={sv} className="flex items-center gap-4 text-xs font-code text-dark-primary font-bold uppercase tracking-widest">
              <span className="px-3 py-1 rounded-full border border-dark-primary/30 bg-dark-primary/10">{post.category}</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 120 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl md:text-5xl lg:text-6xl font-display font-black leading-[1.1] tracking-[-0.02em] text-white"
              >
                {post.title}
              </motion.h1>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 pt-16">
        {/* ── METADATA ROW ─────────────────────────── */}
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={container}
            className="flex flex-wrap items-center gap-8 py-6 border-y border-white/10"
          >
            <motion.div variants={sv} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-dark-primary/10 flex items-center justify-center">
                <Calendar size={18} className="text-dark-primary" />
              </div>
              <div>
                <p className="text-[10px] text-dark-textMuted uppercase tracking-widest font-bold">Published On</p>
                <p className="text-sm font-medium text-white">{post.date}</p>
              </div>
            </motion.div>

            <motion.div variants={sv} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-dark-secondary/10 flex items-center justify-center">
                <Clock size={18} className="text-dark-secondary" />
              </div>
              <div>
                <p className="text-[10px] text-dark-textMuted uppercase tracking-widest font-bold">Reading Time</p>
                <p className="text-sm font-medium text-white">{post.readTime}</p>
              </div>
            </motion.div>

            {post.tags && (
              <motion.div variants={sv} className="flex flex-wrap gap-2 pt-2 md:pt-0">
                {post.tags.map(tag => (
                  <div key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] text-white/40">
                    #{tag}
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* ── MAIN CONTENT ─────────────────────────── */}
        <motion.article 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={sv} 
          className="max-w-3xl mx-auto px-6 text-white/80 leading-relaxed space-y-6 pb-20 
          [&>h2]:text-3xl [&>h2]:font-display [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-12 [&>h2]:mb-6
          [&>p]:text-lg [&>p]:md:text-xl [&>p]:mb-6
          [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:mb-6
          [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:mb-6
          [&>a]:text-dark-primary hover:[&>a]:text-dark-secondary [&>a]:underline
          [&>strong]:text-white [&>strong]:font-bold
          [&>blockquote]:border-l-4 [&>blockquote]:border-dark-primary [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-white/90"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {/* ── AUTHOR & SHARE BLOCK ─────────────────────────── */}
        <div className="max-w-3xl mx-auto px-6 mt-20 pt-16 border-t border-white/10">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={container}
            className="flex flex-col md:flex-row gap-10 items-start justify-between bg-white/[0.02] p-8 rounded-[2rem] border border-white/5"
          >
            {/* Author */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-dark-primary/30">
                <img 
                  src="/images/pic.jpeg" 
                  alt="Rudra Patel" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-dark-primary">Written By</p>
                <h3 className="text-xl font-display font-bold text-white">{post.author || "Rudra Patel"}</h3>
                <p className="text-sm text-dark-textMuted max-w-[200px]">
                  {post.author === "Rudra Patel" || !post.author 
                    ? "Alchemist of digital experiences and full-stack architecture." 
                    : `Expert contributor in ${post.category}.`}
                </p>
              </div>
            </div>

            {/* Share */}
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-dark-textMuted md:text-right">Share Article</p>
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-all border border-white/5 hover:border-[#1DA1F2]/30">
                  <Twitter size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all border border-white/5 hover:border-[#0A66C2]/30">
                  <Linkedin size={18} />
                </button>
                <button 
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-dark-primary hover:bg-dark-primary/10 transition-all border border-white/5 hover:border-dark-primary/30"
                >
                  <LinkIcon size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
