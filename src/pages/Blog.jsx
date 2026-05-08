import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, ArrowRight, Calendar, Clock, User, Hash } from 'lucide-react';

import { Link } from 'react-router-dom';
import { blogposts as blogs } from '../data/blogposts';

const categories = ['All', 'IT Technology', 'Designer', 'Developer & Development', 'AI', 'Artificial Intelligence / Development'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
      const matchesSearch = 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const standardBlogs = filteredBlogs.slice(1);

  return (
    <div className="min-h-screen bg-dark-bg text-dark-textMain pt-32 pb-20 relative overflow-hidden">
      <Helmet>
        <title>Insights & Thoughts | Rudra Patel</title>
        <meta name="description" content="Deep dives into AI, full-stack development, and modern design principles." />
      </Helmet>

      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-dark-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-dark-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Header Section ── */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6 text-dark-secondary font-code text-xs tracking-[0.3em] uppercase"
          >
            <div className="w-10 h-[1px] bg-dark-secondary/40" />
            <BookOpen size={14} />
            <span>Digital Journal</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight sm:tracking-tighter leading-none"
            >
              Curated <br /> <span className="text-gradient">Knowledge</span>.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative group max-w-md w-full"
            >
              <div className="absolute inset-0 bg-dark-primary/20 blur-xl group-hover:bg-dark-primary/30 transition-all duration-500 rounded-full" />
              <div className="relative flex items-center bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-xl focus-within:border-dark-primary/50 transition-all">
                <Search size={20} className="text-white/40 group-focus-within:text-dark-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search articles, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none w-full px-4 text-white placeholder:text-white/20 text-sm font-medium"
                />
              </div>
            </motion.div>
          </div>
        </header>

        {/* ── Filter Bar ── */}
        <nav className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide no-scrollbar"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 relative group ${
                  activeCategory === cat
                    ? 'text-dark-bg'
                    : 'text-white/50 hover:text-white bg-white/[0.02] border border-white/5 hover:border-white/10'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCat"
                    className="absolute inset-0 bg-dark-primary rounded-xl -z-10 "
                  />
                )}
                {cat}
              </button>
            ))}
          </motion.div>
        </nav>

        {/* ── Content Grid ── */}
        <AnimatePresence mode="wait">
          {filteredBlogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-32 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6 text-white/20">
                <Search size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">No results found</h3>
              <p className="text-white/40">Try adjusting your search or category filter.</p>
            </motion.div>
          ) : (
            <div className="space-y-16">
              {/* Featured Card */}
              {featuredBlog && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <Link to={`/blog/${featuredBlog.id}`} className="group block">
                    <div className="relative overflow-hidden rounded-[3rem] bg-white/[0.02] border border-white/10 hover:border-dark-primary/30 transition-all duration-700 p-4 lg:p-8">
                      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                        {/* Image Container */}
                        <div className="w-full lg:w-[55%] relative aspect-[16/9] lg:aspect-square xl:aspect-[16/10] rounded-[2.5rem] overflow-hidden">
                          <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 1 }}
                            src={featuredBlog.image}
                            alt={featuredBlog.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-transparent opacity-60" />
                          <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                            <span className="px-4 py-2 bg-dark-primary/90 text-dark-bg text-[10px] font-black uppercase tracking-widest rounded-full backdrop-blur-md shadow-xl">
                              Featured Post
                            </span>
                            <span className="px-4 py-2 bg-black/40 text-white text-[10px] font-black uppercase tracking-widest rounded-full backdrop-blur-md border border-white/10">
                              {featuredBlog.category}
                            </span>
                          </div>
                        </div>

                        {/* Text Content */}
                        <div className="w-full lg:w-[45%] flex flex-col justify-center lg:pr-10">
                          <div className="flex items-center gap-6 text-[10px] font-code text-white/40 mb-8 uppercase tracking-[0.2em]">
                            <span className="flex items-center gap-2">
                              <Calendar size={12} className="text-dark-primary" />
                              {featuredBlog.date}
                            </span>
                            <span className="flex items-center gap-2">
                              <Clock size={12} className="text-dark-secondary" />
                              {featuredBlog.readTime}
                            </span>
                          </div>

                          <h2 className="text-4xl md:text-5xl xl:text-6xl font-display font-black text-white mb-6 group-hover:text-dark-primary transition-colors duration-500 leading-tight">
                            {featuredBlog.title}
                          </h2>

                          <p className="text-white/60 text-lg leading-relaxed mb-10 line-clamp-3 font-medium">
                            {featuredBlog.excerpt}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-10">
                            {featuredBlog.tags?.map(tag => (
                              <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-white/40 uppercase tracking-widest group-hover:border-dark-primary/20 transition-colors">
                                <Hash size={10} className="text-dark-primary/50" />
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-dark-primary/10 border border-dark-primary/20 flex items-center justify-center overflow-hidden">
                                <User size={18} className="text-dark-primary" />
                              </div>
                              <span className="text-[11px] font-black uppercase tracking-widest text-white/60">{featuredBlog.author}</span>
                            </div>
                            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white group-hover:text-dark-primary transition-all">
                              Read Deep Dive <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Standard Grid */}
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {standardBlogs.map((blog, idx) => (
                  <motion.article
                    layout
                    key={blog.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group"
                  >
                    <Link to={`/blog/${blog.id}`} className="flex flex-col h-full rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-dark-primary/30 transition-all duration-500 hover:bg-white/[0.04] overflow-hidden">
                      <div className="relative h-64 overflow-hidden shrink-0">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.8 }}
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 bg-dark-bg/80 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-dark-primary shadow-2xl">
                            {blog.category}
                          </span>
                        </div>
                      </div>  

                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-[9px] font-code text-white/30 mb-6 uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><Calendar size={10} /> {blog.date}</span>
                          <span className="flex items-center gap-1.5"><Clock size={10} /> {blog.readTime}</span>
                        </div>

                        <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-dark-primary transition-colors duration-300 line-clamp-2 leading-tight">
                          {blog.title}
                        </h3>

                        <p className="text-white/50 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                          {blog.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                          {blog.tags?.slice(0, 3).map(tag => (
                            <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[8px] font-bold text-white/30 uppercase tracking-widest">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                              <User size={12} className="text-white/40" />
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">{blog.author}</span>
                          </div>
                          <ArrowRight size={14} className="text-white/20 group-hover:text-dark-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
