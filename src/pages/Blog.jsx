import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { Search, Calendar, Clock, ArrowRight, Tag, BookOpen, Filter, Mail, Sparkles, TrendingUp, Cpu, Activity } from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';
import GlobalParticles from '../components/canvas/GlobalParticles';
import NewsTicker from '../components/ui/NewsTicker';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(blogPosts.map(post => post.category))];
    return cats;
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const featuredPost = blogPosts.find(post => post.featured);
  
  const itNewsPosts = useMemo(() => {
    return blogPosts.filter(post => post.category === 'IT Sector' || post.category === 'Technologies').slice(0, 4);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-dark-textMain pt-24 pb-20 relative overflow-hidden">
      <Helmet>
        <title>Insights | Rudra Patel - Developer Blog</title>
        <meta name="description" content="Technical insights, architectural deep-dives, and engineering thoughts by Rudra Patel." />
      </Helmet>

      {/* Global Particles Background */}
      <GlobalParticles />

      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-dark-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-dark-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* IT News Ticker */}
      <div className="mb-16 mt-4">
        <NewsTicker newsItems={itNewsPosts} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 text-center lg:text-left"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex-1">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6 text-dark-secondary font-code text-sm tracking-widest uppercase">
                <BookOpen size={18} />
                <span>Digital Log</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 tracking-tighter-tight animated-gradient-text">
                Technical <br /> <span className="text-gradient">Insights</span>.
              </h1>
              <p className="text-dark-textMuted max-w-2xl text-lg mb-12 mx-auto lg:mx-0 leading-relaxed font-light">
                Documenting the journey of building premium digital products, from architectural patterns to advanced artificial intelligence engineering.
              </p>
            </div>

            {/* Quick Stats / Right Side of Hero */}
            <div className="hidden lg:flex gap-6">
              <div className="card p-6 bg-dark-surface/40 backdrop-blur-md border border-dark-border rounded-3xl text-center min-w-[140px]">
                <h4 className="text-4xl font-display font-black text-dark-primary mb-2">{blogPosts.length}</h4>
                <p className="text-xs font-code uppercase tracking-widest text-dark-textMuted">Published<br/>Articles</p>
              </div>
              <div className="card p-6 bg-dark-surface/40 backdrop-blur-md border border-dark-border rounded-3xl text-center min-w-[140px]">
                <h4 className="text-4xl font-display font-black text-dark-secondary mb-2">26</h4>
                <p className="text-xs font-code uppercase tracking-widest text-dark-textMuted">Tech<br/>Topics</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Post Showcase */}
        {activeCategory === 'All' && !searchQuery && featuredPost && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-32 group"
          >
            <div className="flex items-center gap-3 mb-8">
              <Sparkles size={20} className="text-dark-primary" />
              <h3 className="text-xl font-display font-bold text-dark-textMain uppercase tracking-widest">Featured Story</h3>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-dark-border to-transparent" />
            </div>

            <Link to={`/blog/${featuredPost.id}`}>
              <div className="card p-4 md:p-10 flex flex-col lg:flex-row gap-12 items-center overflow-hidden min-h-[500px] hover:border-dark-primary/50 transition-all duration-700 bg-gradient-to-br from-dark-surface/60 to-transparent backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="lg:w-3/5 h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden relative border border-dark-border shadow-2xl">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-dark-bg/20 to-transparent group-hover:opacity-80 transition-opacity duration-700" />
                  <div className="absolute top-6 left-6 flex gap-3">
                    <span className="px-4 py-2 bg-dark-primary/90 text-dark-bg text-[10px] font-black uppercase tracking-widest rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.5)]">
                      Editor's Pick
                    </span>
                  </div>
                </div>
                <div className="lg:w-2/5 relative z-10 lg:-ml-20 lg:p-10 lg:bg-dark-bg/80 lg:backdrop-blur-xl lg:border lg:border-dark-border lg:rounded-3xl">
                  <div className="flex items-center gap-4 text-[10px] font-code text-dark-secondary mb-6 tracking-[0.2em] uppercase">
                    <Tag size={14} />
                    <span>{featuredPost.category}</span>
                    <span className="w-1 h-1 bg-dark-secondary/50 rounded-full" />
                    <Clock size={14} />
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold leading-[1.1] mb-6 text-dark-textMain group-hover:text-dark-primary transition-colors duration-500">
                    {featuredPost.title}
                  </h2>
                  <p className="text-dark-textMuted text-lg mb-8 leading-relaxed font-light line-clamp-4">
                    {featuredPost.excerpt}
                  </p>
                  <MagneticButton className="inline-block">
                    <div className="flex items-center gap-3 px-8 py-4 bg-dark-primary text-dark-bg font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                      READ FULL ARTICLE <ArrowRight size={18} />
                    </div>
                  </MagneticButton>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Dedicated IT News Section (Horizontal Scroll) */}
        {activeCategory === 'All' && !searchQuery && itNewsPosts.length > 0 && (
          <div className="mb-32">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <Activity size={24} className="text-[#ff5f56]" />
                <h3 className="text-3xl font-display font-bold text-dark-textMain">Industry <span className="text-gradient">News</span></h3>
              </div>
              <button onClick={() => setActiveCategory('IT Sector')} className="text-xs font-code text-dark-secondary hover:text-dark-primary uppercase tracking-widest transition-colors flex items-center gap-2">
                View All <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {itNewsPosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link to={`/blog/${post.id}`}>
                    <div className="card p-6 h-full bg-dark-surface/30 hover:bg-dark-surface/60 border border-dark-border hover:border-dark-primary/30 transition-all duration-300 group flex flex-col">
                      <div className="flex items-center justify-between mb-4 text-[10px] font-code uppercase tracking-widest">
                        <span className="text-[#ff5f56] font-bold">{post.category}</span>
                        <span className="text-dark-textMuted">{post.date}</span>
                      </div>
                      <h4 className="text-lg font-bold text-dark-textMain leading-snug mb-3 group-hover:text-dark-primary transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-xs text-dark-textMuted leading-relaxed flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-6 pt-4 border-t border-dark-border/50 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight size={16} className="text-dark-primary" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto lg:mx-0 space-y-6 mb-16">
          <div className="flex items-center gap-4 mb-4">
            <Cpu size={20} className="text-dark-secondary" />
            <h3 className="text-2xl font-display font-bold text-dark-textMain">Article Feed</h3>
          </div>
          
          {/* Search Input */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-dark-primary/20 via-transparent to-dark-secondary/20 rounded-2xl blur-xl group-focus-within:opacity-100 opacity-0 transition-opacity duration-700" />
            <div className="relative flex items-center p-2 bg-dark-surface/40 backdrop-blur-3xl border border-dark-border/60 hover:border-dark-primary/50 focus-within:border-dark-primary focus-within:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all duration-500 rounded-2xl">
              <div className="p-3.5 bg-dark-bg/80 backdrop-blur-md rounded-xl border border-dark-border text-dark-primary group-focus-within:scale-105 transition-transform duration-300">
                <Search size={22} />
              </div>
              <input
                type="text"
                placeholder="Search technical insights, articles, and logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none py-4 px-6 text-lg text-dark-textMain focus:ring-0 placeholder:text-dark-textMuted/40 font-light tracking-wide outline-none"
              />
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-dark-bg/60 backdrop-blur-sm rounded-lg border border-dark-border mr-2">
                <span className="text-[10px] text-dark-textMuted font-code uppercase tracking-widest">Cmd+K</span>
              </div>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6 lg:mx-0 lg:px-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-dark-surface/20 rounded-xl border border-dark-border/40 text-dark-textMuted text-xs font-code uppercase tracking-widest">
                <Filter size={14} /> Filters
              </div>
              <div className="w-[1px] h-6 bg-dark-border/50 mx-2" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-code uppercase tracking-widest transition-all duration-300 whitespace-nowrap border flex items-center gap-2 ${
                    activeCategory === cat
                      ? 'bg-dark-primary/10 border-dark-primary/50 text-dark-primary shadow-[0_0_20px_rgba(0,229,255,0.1)] translate-y-[-2px]'
                      : 'bg-dark-surface/40 border-dark-border/40 text-dark-textMuted hover:bg-dark-surface hover:text-dark-textMain hover:border-dark-border hover:translate-y-[-2px]'
                    }`}
                >
                  {activeCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-dark-primary shadow-[0_0_8px_rgba(0,229,255,0.8)]" />}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid (Main Feed) */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-12">
            <h3 className="text-xl font-display font-bold text-dark-textMain">
              {searchQuery || activeCategory !== 'All' ? 'Filtered Results' : 'Latest Logs'}
            </h3>
            <div className="h-[1px] flex-grow bg-dark-border" />
            <span className="text-xs font-code text-dark-textMuted uppercase tracking-widest">
              {filteredPosts.length} entries
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group"
                  >
                    <Link to={`/blog/${post.id}`}>
                      <div className="card h-full flex flex-col p-4 bg-dark-surface/40 hover:bg-dark-surface/60 backdrop-blur-3xl border-dark-border/40 hover:border-dark-primary/30 transition-all duration-500 overflow-hidden">
                        <div className="h-[240px] rounded-xl overflow-hidden mb-6 relative">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-4 right-4 px-3 py-1.5 bg-dark-bg/80 backdrop-blur-md rounded-lg text-[9px] font-bold text-dark-secondary border border-dark-border uppercase tracking-widest shadow-lg">
                            {post.category}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-[10px] font-code text-dark-textMuted mb-4 uppercase tracking-widest">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} className="text-dark-primary" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={12} className="text-dark-secondary" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <h4 className="text-xl font-bold mb-4 text-dark-textMain group-hover:text-dark-primary transition-colors leading-snug">
                          {post.title}
                        </h4>
                        <p className="text-sm text-dark-textMuted leading-relaxed mb-8 flex-grow line-clamp-3 font-light">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-dark-border/40">
                          <div className="flex gap-2">
                            {post.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-[10px] font-code text-dark-textMuted">#{tag}</span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-dark-primary uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                            READ <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-20 h-20 bg-dark-surface border border-dark-border rounded-full flex items-center justify-center text-dark-textMuted shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                      <Search size={32} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-2">No logs found</h4>
                      <p className="text-dark-textMuted">Try adjusting your search or filters to find what you're looking for.</p>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40"
        >
          <div className="card p-8 md:p-16 bg-gradient-to-br from-dark-surface/40 to-dark-primary/5 border-dark-border/40 backdrop-blur-3xl relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            {/* Decorative element */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-dark-primary/10 rounded-full blur-3xl group-hover:bg-dark-primary/20 transition-colors duration-700" />

            <div className="max-w-3xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-primary/10 border border-dark-primary/20 rounded-full text-dark-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-lg">
                <Sparkles size={14} /> Stay Ahead of the Curve
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                Subscribe to <span className="text-gradient">The Log</span>.
              </h2>
              <p className="text-dark-textMuted text-lg mb-12 max-w-xl mx-auto font-light">
                Get monthly deep-dives into architectural patterns, UI engineering, and the future of web technology. No spam, just pure technical value.
              </p>

              <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex-grow group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-dark-textMuted group-focus-within:text-dark-primary transition-colors" size={20} />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-dark-bg/80 border border-dark-border rounded-full py-5 pl-14 pr-6 text-dark-textMain focus:ring-1 focus:ring-dark-primary focus:border-dark-primary outline-none transition-all shadow-inner"
                  />
                </div>
                <MagneticButton>
                  <button className="px-10 py-5 bg-dark-primary text-dark-bg font-bold rounded-full hover:scale-105 active:scale-95 transition-all whitespace-nowrap shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                    JOIN THE LIST
                  </button>
                </MagneticButton>
              </form>

              <p className="mt-8 text-xs text-dark-textMuted font-code uppercase tracking-widest">
                Join 2,400+ engineers worldwide
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
