import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, FileText, X, Save, RefreshCw, Tag, Calendar, User, Clock, BookOpen, Search, Eye, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EMPTY_BLOG = { title: '', excerpt: '', content: '', image: '', category: 'IT Technology', author: 'Rudra Patel', readTime: '', date: '', tags: '' };
const CATEGORIES = ['All', 'IT Technology', 'Designer', 'Developer & Development', 'AI', 'Artificial Intelligence / Development'];

function Modal({ title, onClose, children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
    >
      <div className="absolute inset-0" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 360 }}
        className="bg-dark-surface border border-dark-border rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border bg-dark-bg/40 backdrop-blur-md">
          <h3 className="font-display font-black text-white text-base tracking-wide flex items-center gap-2">
            <BookOpen size={18} className="text-dark-secondary animate-pulse" /> {title}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-dark-textMuted hover:text-white hover:bg-white/5 transition-all">
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-6 space-y-4 bg-dark-surface/60">{children}</div>
      </motion.div>
    </motion.div>
  );
}

function BlogForm({ initial, onSave, saving }) {
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputCls = "w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-dark-primary/60 transition-all focus:ring-1 focus:ring-dark-primary/20";
  const labelCls = "block text-[10px] font-black uppercase tracking-widest text-dark-textMuted mb-1.5";

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-6">
      {/* 🟢 Group 1: Meta Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelCls}>Category</label>
          <select className={inputCls} value={form.category} onChange={e => set('category', e.target.value)}>
            {['IT Technology','Designer','Developer & Development','AI','Artificial Intelligence / Development'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Read Time</label>
          <input className={inputCls} value={form.readTime} onChange={e => set('readTime', e.target.value)} placeholder="e.g. 5 min read" />
        </div>
        <div>
          <label className={labelCls}>Publish Date</label>
          <input className={inputCls} value={form.date} onChange={e => set('date', e.target.value)} placeholder="e.g. May 23, 2026" />
        </div>
      </div>

      {/* 🔵 Group 2: Core Details */}
      <div className="space-y-4">
        <div>
          <label className={labelCls}>Blog Title *</label>
          <input className={inputCls} value={form.title} onChange={e => set('title', e.target.value)} placeholder="Enter a professional blog title..." required />
        </div>

        <div>
          <label className={labelCls}>Short Excerpt *</label>
          <textarea rows={2} className={inputCls} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} placeholder="Write a summary description of the blog post..." required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Author Name</label>
            <input className={inputCls} value={form.author} onChange={e => set('author', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Tags (comma-separated)</label>
            <input className={inputCls} value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="react, tailwind, webdev" />
          </div>
        </div>

        <div>
          <label className={labelCls}>Cover Image URL</label>
          <input className={inputCls} value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://images.unsplash.com/..." />
        </div>
      </div>

      {/* 🟠 NEW CMS FEATURE: Interactive Google SEO Listing Snippet Optimizer */}
      <div className="bg-dark-bg/60 p-4 border border-dark-border rounded-2xl space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-dark-primary flex items-center gap-1.5">
            <Globe size={11} className="animate-spin" style={{ animationDuration: '6s' }} /> Google Search Snippet Optimizer
          </span>
          <span className="text-[9px] text-dark-textMuted/40 font-code font-bold">SEO PREVIEW</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md font-sans select-none pointer-events-none">
          <div className="text-[11px] text-[#202124] flex items-center gap-1">
            <span>https://rudrapatel.dev</span>
            <span className="text-[9px] text-[#70757a]">› blog › {form.title ? form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'untitled-post'}</span>
          </div>
          <h4 className="text-[15px] text-[#1a0dab] hover:underline font-medium truncate leading-tight mt-1">
            {form.title || 'Please enter a title for your blog post...'}
          </h4>
          <p className="text-[12px] text-[#4d5156] leading-normal line-clamp-2 mt-1">
            <span className="text-[#70757a] mr-1">{form.date || 'Today'} —</span>
            {form.excerpt || 'Enter a short excerpt above to optimize the search result description preview...'}
          </p>
        </div>
      </div>

      {/* 🟣 Group 3: Content Body */}
      <div>
        <label className={labelCls}>Content (HTML/Markdown)</label>
        <textarea rows={6} className={`${inputCls} font-code text-xs leading-relaxed`} value={form.content} onChange={e => set('content', e.target.value)} placeholder="Type or paste post markdown contents here..." />
      </div>

      {/* 🔴 Footer Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-dark-border">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-dark-primary hover:bg-dark-primary/95 disabled:opacity-50 text-dark-bg font-black text-xs rounded-xl transition-all shadow-lg hover:shadow-dark-primary/10">
          <Save size={14} /> {saving ? 'Saving...' : 'Publish / Update Blog'}
        </button>
      </div>
    </form>
  );
}

export default function BlogsTab() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState(null);
  const [deleting, setDeleting] = useState(null);
  
  // NEW FEATURES: Search & Category Filter States
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const fetch$ = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blogs');
      const data = await res.json();
      if (data.success) setBlogs(data.data);
    } catch { toast.error('Failed to load blogs'); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetch$(); }, []);

  const saveBlog = async (form) => {
    setSaving(true);
    const payload = {
      ...form,
      tags: typeof form.tags === 'string' ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : form.tags,
    };
    try {
      const isEdit = modal && modal._id;
      const res = await fetch('/api/admin/blogs', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isEdit ? { ...payload, id: modal._id } : payload),
      });
      const data = await res.json();
      if (data.success) { toast.success(isEdit ? 'Blog updated!' : 'Blog created!'); setModal(null); fetch$(); }
      else toast.error(data.message || 'Save failed');
    } catch { toast.error('Network error'); }
    finally { setSaving(false); }
  };

  const deleteBlog = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) { toast.success('Blog deleted'); fetch$(); }
      else toast.error('Delete failed');
    } catch { toast.error('Network error'); }
    finally { setDeleting(null); }
  };

  const getEditInitial = (blog) => ({
    ...blog,
    tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '',
  });

  // NEW FEATURE: Dual-Filtering logic (Search + Category Filter Tab)
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title?.toLowerCase().includes(search.toLowerCase()) ||
                          blog.excerpt?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 relative z-10 font-body">
      {/* ── Top Bar Title & Primary Controls ── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-display font-black text-white mb-1">Blog Articles</h2>
          <p className="text-sm text-dark-textMuted">{blogs.length} post{blogs.length !== 1 ? 's' : ''} recorded</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetch$} className="p-2 rounded-xl bg-dark-surface/50 border border-dark-border text-dark-textMuted hover:text-white transition-all">
            <RefreshCw size={15} />
          </button>
          <button
            onClick={() => setModal('create')}
            className="flex items-center gap-2 px-4 py-2.5 bg-dark-primary hover:bg-dark-primary/95 text-dark-bg font-black text-sm rounded-xl transition-colors shadow-lg shadow-dark-primary/5"
          >
            <Plus size={16} /> New Article
          </button>
        </div>
      </div>

      {/* ── NEW FUNCTION: Interactive Search bar & Category filters tab bar ── */}
      <div className="bg-dark-surface/20 border border-dark-border rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-textMuted/40" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white placeholder-dark-textMuted/30 focus:outline-none focus:border-dark-primary/50 transition-colors"
          />
        </div>
        {/* Category Tabs */}
        <div className="flex items-center gap-1 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                activeCategory === cat
                  ? 'bg-dark-secondary/15 text-dark-secondary border-dark-secondary/25'
                  : 'text-dark-textMuted/60 hover:text-white border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-dark-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-24 bg-dark-surface/10 border border-dashed border-dark-border rounded-3xl">
          <FileText size={44} className="mx-auto mb-4 text-dark-textMuted/30" />
          <p className="font-bold text-white/50 text-sm">No articles cataloged</p>
          <p className="text-xs text-dark-textMuted mt-1">Try relaxing your search query or start typing your first post!</p>
        </div>
      ) : (
        /* ── NEW DESIGN: Gorgeous Responsive Multi-Column Grid ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map(blog => (
            <div
              key={blog._id}
              className="bg-dark-surface/20 border border-dark-border rounded-2xl overflow-hidden hover:border-dark-primary/25 transition-all group flex flex-col shadow-lg shadow-black/10 hover:-translate-y-1 duration-300"
            >
              {/* Thumbnail Container with Zoom on hover */}
              <div className="relative h-44 w-full bg-dark-bg overflow-hidden flex-shrink-0 border-b border-dark-border">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-dark-primary/5 to-dark-secondary/5 flex items-center justify-center">
                    <FileText size={32} className="text-dark-textMuted/30" />
                  </div>
                )}
                {/* Float Category Badge */}
                <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-dark-secondary/85 text-white shadow-md border border-white/5 backdrop-blur-sm">
                  {blog.category}
                </span>
                
                {/* Floating Edit/Delete buttons visible on card hover */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setModal(getEditInitial(blog))}
                    className="p-2 rounded-lg bg-dark-surface border border-white/10 text-white hover:text-dark-primary transition-all shadow-md backdrop-blur-sm"
                  >
                    <Pencil size={12} />
                  </button>
                  <button
                    onClick={() => deleteBlog(blog._id)}
                    disabled={deleting === blog._id}
                    className="p-2 rounded-lg bg-dark-surface border border-white/10 text-white hover:text-red-400 transition-all shadow-md backdrop-blur-sm"
                  >
                    {deleting === blog._id ? (
                      <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 size={12} />
                    )}
                  </button>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-[10px] text-dark-textMuted/50 mb-2 font-code">
                  <span className="flex items-center gap-1"><Calendar size={10} /> {blog.date || 'May 23, 2026'}</span>
                  {blog.readTime && <span className="flex items-center gap-1"><Clock size={10} /> {blog.readTime}</span>}
                </div>

                <h3 className="text-white font-display font-black text-sm tracking-wide line-clamp-2 leading-tight group-hover:text-dark-primary transition-colors mb-2.5">
                  {blog.title}
                </h3>
                
                <p className="text-dark-textMuted/70 text-xs line-clamp-3 leading-relaxed mb-4">
                  {blog.excerpt}
                </p>

                {/* Tags Footer */}
                <div className="mt-auto pt-4 border-t border-dark-border/40 flex items-center justify-between flex-wrap gap-2 text-[9px] text-dark-textMuted/60">
                  <div className="flex items-center gap-1.5 max-w-[70%] truncate">
                    {blog.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className="flex items-center gap-0.5 font-bold uppercase tracking-wider text-dark-primary">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  {blog.author && (
                    <span className="flex items-center gap-1 font-code font-bold"><User size={9} /> {blog.author.split(' ')[0]}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔮 Animated Modal via AnimatePresence */}
      <AnimatePresence>
        {modal && (
          <Modal
            title={modal === 'create' ? 'Compose New Blog Post' : 'Edit Blog Post'}
            onClose={() => setModal(null)}
          >
            <BlogForm
              initial={modal === 'create' ? EMPTY_BLOG : modal}
              onSave={saveBlog}
              saving={saving}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
