import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useSpring } from 'framer-motion';
import { blogPosts } from '../data/blogPosts';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Twitter, 
  Linkedin, 
  Link as LinkIcon, 
  ChevronRight,
  Mail,
  User
} from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';
import GlobalParticles from '../components/canvas/GlobalParticles';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = useMemo(() => blogPosts.find(p => p.id === parseInt(id)), [id]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg text-dark-textMain">
        <div className="text-center">
          <h2 className="text-4xl font-display font-bold mb-4">Post Not Found</h2>
          <Link to="/blog" className="text-dark-primary hover:underline flex items-center gap-2 justify-center">
            <ArrowLeft size={20} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-dark-bg text-dark-textMain pb-20 relative">
      <Helmet>
        <title>{post.title} | Rudra Patel</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      {/* Reading Progress Bar
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-dark-primary origin-left z-50 shadow-[0_0_10px_rgba(0,229,255,0.8)]"
        style={{ scaleX }}
      /> */}

      {/* Global Particles Background */}
      <GlobalParticles />

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-6 pb-20 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link 
                to="/blog"
                className="inline-flex items-center gap-2 text-dark-secondary mb-8 hover:text-dark-primary transition-colors group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-code text-xs uppercase tracking-widest">Back to Blog</span>
              </Link>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 bg-dark-primary text-dark-bg text-[10px] font-black uppercase tracking-widest rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-xs text-dark-textMuted font-code uppercase tracking-widest">
                  <Calendar size={14} className="text-dark-secondary" />
                  <span>{post.date}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-4xl lg:text-5xl font-display font-bold leading-[1.1] mb-8">
                {post.title}
              </h1>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-dark-border">
                    <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-dark-textMain">{post.author.name}</p>
                    <p className="text-[10px] text-dark-textMuted font-code uppercase tracking-widest">{post.author.role}</p>
                  </div>
                </div>
                <div className="h-10 w-[1px] bg-dark-border hidden md:block" />
                <div className="flex items-center gap-2 text-dark-textMuted text-xs font-code hidden md:flex">
                  <Clock size={14} className="text-dark-secondary" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 -mt-10 relative z-20">
        <article className="max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {post.content.map((section, idx) => {
              if (section.type === 'paragraph') {
                return <p key={idx} className="text-dark-textMuted leading-relaxed mb-8 text-lg md:text-xl font-light">{section.text}</p>;
              }
              if (section.type === 'heading') {
                return <h2 key={idx} className="text-3xl md:text-4xl font-display font-bold mt-16 mb-8 text-dark-textMain tracking-tight">{section.text}</h2>;
              }
              if (section.type === 'quote') {
                return (
                  <blockquote key={idx} className="border-l-4 border-dark-primary pl-6 my-12 italic relative">
                    <div className="absolute -left-12 -top-4 text-dark-primary/20 text-6xl font-display font-black">"</div>
                    <p className="text-xl md:text-2xl text-dark-textMain font-light leading-relaxed relative z-10">{section.text}</p>
                    {section.author && <footer className="mt-4 text-sm font-code text-dark-secondary uppercase tracking-widest">— {section.author}</footer>}
                  </blockquote>
                );
              }
              if (section.type === 'list') {
                return (
                  <ul key={idx} className="list-none space-y-4 my-8">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex gap-4 items-start text-dark-textMuted text-lg md:text-xl font-light leading-relaxed">
                        <span className="text-dark-primary mt-2.5 flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-dark-primary shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (section.type === 'image') {
                return (
                  <figure key={idx} className="my-12">
                    <div className="rounded-2xl overflow-hidden border border-dark-border group relative">
                      <img src={section.url} alt={section.alt || ''} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    {section.caption && <figcaption className="mt-4 text-center text-sm font-code text-dark-textMuted uppercase tracking-widest">{section.caption}</figcaption>}
                  </figure>
                );
              }
              if (section.type === 'code') {
                return (
                  <div key={idx} className="my-12 rounded-2xl overflow-hidden bg-[#0d0d0d] border border-dark-border group shadow-2xl">
                    <div className="flex items-center justify-between px-6 py-4 bg-dark-surface/50 border-b border-dark-border backdrop-blur-md">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                        </div>
                        <span className="text-[10px] font-code text-dark-textMuted uppercase tracking-[0.2em] ml-2">{section.language}</span>
                      </div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(section.code);
                          // Could add a toast here
                        }}
                        className="text-[10px] font-code text-dark-textMuted hover:text-dark-primary transition-colors uppercase tracking-widest"
                      >
                        Copy Code
                      </button>
                    </div>
                    <pre className="p-8 overflow-x-auto no-scrollbar font-code text-sm md:text-base leading-relaxed text-dark-textMain/90">
                      <code className="block">{section.code}</code>
                    </pre>
                  </div>
                );
              }
              return null;
            })}
          </motion.div>

          {/* Social Share (Desktop Sidebar-like or Bottom) */}
          <div className="mt-20 pt-10 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-dark-textMain uppercase tracking-widest">Share this log</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${post.title}&url=${window.location.href}`)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-dark-surface hover:bg-dark-primary hover:text-dark-bg transition-all"
                >
                  <Twitter size={18} />
                </button>
                <button 
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-dark-surface hover:bg-dark-primary hover:text-dark-bg transition-all"
                >
                  <Linkedin size={18} />
                </button>
                <button 
                  onClick={handleCopyLink}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-dark-surface hover:bg-dark-primary hover:text-dark-bg transition-all relative"
                >
                  {copied ? <div className="absolute -top-10 bg-dark-primary text-dark-bg px-2 py-1 rounded text-[10px] font-bold">COPIED!</div> : null}
                  <LinkIcon size={18} />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-[10px] font-code text-dark-textMuted bg-dark-surface px-3 py-1.5 rounded-lg border border-dark-border">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar Widgets */}
        <aside className="lg:w-80 space-y-12">
          {/* Author Widget */}
          <div className="card p-8 bg-dark-surface/40 border-dark-border/40 backdrop-blur-3xl sticky top-32">
            <h4 className="text-sm font-bold text-dark-textMain mb-6 flex items-center gap-2 uppercase tracking-widest">
              <User size={16} className="text-dark-secondary" /> Written By
            </h4>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-dark-primary/20 mb-4 p-1">
                <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <h5 className="text-lg font-bold text-dark-textMain mb-1">{post.author.name}</h5>
              <p className="text-xs text-dark-secondary font-code uppercase tracking-widest mb-4">{post.author.role}</p>
              <p className="text-sm text-dark-textMuted leading-relaxed mb-6">
                Passionate about building premium digital experiences and exploring the frontiers of web technology.
              </p>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-3 bg-white/5 hover:bg-white/10 text-xs font-bold text-dark-textMain rounded-xl border border-dark-border transition-all"
              >
                VIEW PROFILE
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Posts */}
      <div className="max-w-7xl mx-auto px-6 mt-32">
        <div className="flex items-center gap-4 mb-12">
          <h3 className="text-3xl font-display font-bold text-dark-textMain">Related <span className="text-gradient">Logs</span></h3>
          <div className="h-[1px] flex-grow bg-dark-border" />
          <Link to="/blog" className="text-xs font-bold text-dark-secondary hover:text-dark-primary transition-colors flex items-center gap-2 uppercase tracking-widest">
            View All <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedPosts.map(p => (
            <Link key={p.id} to={`/blog/${p.id}`} className="group">
              <div className="card p-6 flex flex-col md:flex-row gap-6 bg-dark-surface/20 hover:bg-dark-surface/40 border-dark-border/40 hover:border-dark-primary/30 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(99,102,241,0.1)] transition-all duration-500 overflow-hidden">
                <div className="md:w-1/3 h-40 rounded-xl overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="md:w-2/3 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-[10px] font-code text-dark-secondary mb-3 uppercase tracking-widest">
                    <span>{p.category}</span>
                    <span className="w-1 h-1 bg-dark-border rounded-full" />
                    <span>{p.readTime}</span>
                  </div>
                  <h4 className="text-xl font-bold text-dark-textMain group-hover:text-dark-primary transition-colors mb-3 line-clamp-2">
                    {p.title}
                  </h4>
                  <p className="text-sm text-dark-textMuted line-clamp-2">
                    {p.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
