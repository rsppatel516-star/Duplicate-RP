import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';

import { Link } from 'react-router-dom';
import { blogposts as blogs } from '../data/blogposts';

const categories = ['All', 'IT Technology', 'Designer', 'Developer & Development', 'AI'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredBlogs = blogs.filter(
    blog => activeCategory === 'All' || blog.category === activeCategory
  );

  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const standardBlogs = filteredBlogs.slice(1);

  return (
    <div className="min-h-screen bg-dark-bg text-dark-textMain pt-32 pb-20 relative overflow-hidden">
      <Helmet>
        <title>Blog | Rudra Patel</title>
        <meta name="description" content="Thoughts, tutorials, and insights on web development and design." />
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
              transition: { staggerChildren: 0.15, delayChildren: 0.2 }
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
            <BookOpen size={16} />
            <span>Chronicles</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="overflow-hidden">
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 80 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter-tight animated-gradient-text"
              >
                Insights & <br /> <span className="text-gradient">Thoughts</span>.
              </motion.h1>
            </div>
          </div>
        </motion.div>

        {/* ── Category Filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-4 overflow-x-auto pb-4 mb-12 scrollbar-hide"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-dark-primary text-dark-bg shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                  : 'bg-white/[0.03] text-white/60 border border-white/5 hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Blog List ── */}
        <AnimatePresence mode="popLayout">
          {featuredBlog && (
            <motion.div
              layout
              key={featuredBlog.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <Link to={`/blog/${featuredBlog.id}`} className="group block">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-4 lg:p-6 hover:border-dark-primary/40 hover:bg-white/[0.04] transition-all">
                  
                  {/* Featured Image */}
                  <div className="w-full lg:w-[55%] relative aspect-[16/10] lg:aspect-auto lg:h-[450px] rounded-[2rem] overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                      src={featuredBlog.image}
                      alt={featuredBlog.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 left-6 px-5 py-2 bg-dark-bg/80 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-dark-primary animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-dark-primary">
                        Featured • {featuredBlog.category}
                      </span>
                    </div>
                  </div>

                  {/* Featured Content */}
                  <div className="w-full lg:w-[45%] flex flex-col justify-center py-6 px-4 lg:pr-10">
                    <div className="flex items-center gap-4 text-xs font-code text-white/40 mb-6">
                      <span>{featuredBlog.date}</span>
                      <div className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{featuredBlog.readTime}</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 group-hover:text-dark-primary transition-colors leading-[1.1]">
                      {featuredBlog.title}
                    </h2>

                    <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 line-clamp-3">
                      {featuredBlog.excerpt}
                    </p>

                    <div className="mt-auto">
                      <span className="inline-flex items-center gap-3 px-8 py-4 bg-dark-textMain text-dark-bg rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-transform group-hover:scale-105">
                        Read Article
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          )}

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {standardBlogs.map((blog, idx) => (
              <motion.div
                layout
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group cursor-pointer flex flex-col h-full rounded-[2rem] overflow-hidden bg-white/[0.02] border border-white/[0.05] hover:border-dark-primary/30 transition-all hover:bg-white/[0.04]"
              >
                <Link to={`/blog/${blog.id}`} className="flex flex-col h-full">
                  <div className="relative h-60 overflow-hidden shrink-0">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 px-4 py-1.5 bg-dark-bg/80 backdrop-blur-md rounded-full border border-white/10">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-dark-primary">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-code text-white/40 mb-4">
                      <span>{blog.date}</span>
                      <div className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{blog.readTime}</span>
                    </div>

                    <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-dark-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="mt-auto">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 group-hover:text-dark-primary transition-colors flex items-center gap-2">
                        Read Article
                        <motion.span
                          className="inline-block"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
