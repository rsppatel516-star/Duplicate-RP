import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Briefcase, X, Save, RefreshCw, ExternalLink, Github, Star, FolderOpen, Search, Layers, LayoutGrid, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EMPTY_PROJECT = {
  title: '', subtitle: '', description: '', problem: '', solution: '', results: '',
  image: '', category: '', role: '', tags: '', keyFeatures: '',
  liveUrl: '', githubUrl: '', featured: false, status: 'Active',
};

const PROJECT_FILTERS = ['All', 'HTML / CSS', 'Javascript', 'React', 'UI Design', 'Featured Only'];

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
            <FolderOpen size={18} className="text-dark-primary animate-pulse" /> {title}
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

function ProjectForm({ initial, onSave, saving }) {
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputCls = "w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-dark-primary/60 transition-all focus:ring-1 focus:ring-dark-primary/20";
  const labelCls = "block text-[10px] font-black uppercase tracking-widest text-dark-textMuted mb-1.5";

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-6">
      {/* 🟢 Group 1: Identity Info */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Project Title *</label>
            <input className={inputCls} value={form.title} onChange={e => set('title', e.target.value)} placeholder="Project name" required />
          </div>
          <div>
            <label className={labelCls}>Subtitle / Tagline</label>
            <input className={inputCls} value={form.subtitle} onChange={e => set('subtitle', e.target.value)} placeholder="Short tagline" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Category</label>
            <select className={inputCls} value={form.category} onChange={e => set('category', e.target.value)}>
              {['','HTML / CSS','Javascript','React','UI Design'].map(c => <option key={c} value={c}>{c || 'Select...'}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Role</label>
            <input className={inputCls} value={form.role} onChange={e => set('role', e.target.value)} placeholder="e.g. Lead Architect" />
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select className={inputCls} value={form.status} onChange={e => set('status', e.target.value)}>
              {['Active','Completed','In Progress','Archived'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* 🔵 Group 2: Narrative & Context */}
      <div className="space-y-4">
        <div>
          <label className={labelCls}>Description Overview</label>
          <textarea rows={3} className={inputCls} value={form.description} onChange={e => set('description', e.target.value)} placeholder="High-level project overview..." />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1">
            <label className={labelCls}>The Problem</label>
            <textarea rows={3} className={inputCls} value={form.problem} onChange={e => set('problem', e.target.value)} placeholder="What was the challenge?" />
          </div>
          <div className="col-span-1">
            <label className={labelCls}>The Engineered Solution</label>
            <textarea rows={3} className={inputCls} value={form.solution} onChange={e => set('solution', e.target.value)} placeholder="How was it resolved?" />
          </div>
          <div className="col-span-1">
            <label className={labelCls}>Measurable Results</label>
            <textarea rows={3} className={inputCls} value={form.results} onChange={e => set('results', e.target.value)} placeholder="Outcomes & metrics..." />
          </div>
        </div>
      </div>

      {/* 🟡 Group 3: Deliverables & Asset URLs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Live Deployment URL</label>
          <input className={inputCls} value={form.liveUrl} onChange={e => set('liveUrl', e.target.value)} placeholder="https://..." />
        </div>
        <div>
          <label className={labelCls}>GitHub Repository URL</label>
          <input className={inputCls} value={form.githubUrl} onChange={e => set('githubUrl', e.target.value)} placeholder="https://github.com/..." />
        </div>
        <div className="col-span-2">
          <label className={labelCls}>Cover Banner Image URL</label>
          <input className={inputCls} value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://images.unsplash.com/..." />
        </div>
      </div>

      {/* 🟠 Group 4: Metadata Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Tech Stack Tags (comma-separated)</label>
          <input className={inputCls} value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="React, Node.js, MongoDB" />
        </div>
        <div>
          <label className={labelCls}>Key Features (comma-separated)</label>
          <input className={inputCls} value={form.keyFeatures} onChange={e => set('keyFeatures', e.target.value)} placeholder="Auth, Dashboard, REST API" />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <input
          id="featured-check"
          type="checkbox"
          checked={form.featured}
          onChange={e => set('featured', e.target.checked)}
          className="w-4 h-4 rounded text-dark-primary bg-dark-bg border-dark-border focus:ring-0 focus:ring-offset-0 cursor-pointer"
        />
        <label htmlFor="featured-check" className="text-xs text-white/80 font-bold cursor-pointer select-none">Showcase as Featured Project</label>
      </div>

      {/* 🔴 Footer Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-dark-border">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-dark-primary hover:bg-dark-primary/95 disabled:opacity-50 text-dark-bg font-black text-xs rounded-xl transition-all shadow-lg hover:shadow-dark-primary/10">
          <Save size={14} /> {saving ? 'Saving...' : 'Publish / Update Project'}
        </button>
      </div>
    </form>
  );
}

export default function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState(null);
  const [deleting, setDeleting] = useState(null);
  
  // NEW FEATURES: Interactive Search & Status Filters
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const fetch$ = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      if (data.success) setProjects(data.data);
    } catch { toast.error('Failed to load projects'); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetch$(); }, []);

  const saveProject = async (form) => {
    setSaving(true);
    const toArray = v => typeof v === 'string' ? v.split(',').map(s => s.trim()).filter(Boolean) : (v || []);
    const payload = { ...form, tags: toArray(form.tags), keyFeatures: toArray(form.keyFeatures) };
    try {
      const isEdit = modal && modal._id;
      const res = await fetch('/api/admin/projects', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isEdit ? { ...payload, id: modal._id } : payload),
      });
      const data = await res.json();
      if (data.success) { toast.success(isEdit ? 'Project updated!' : 'Project created!'); setModal(null); fetch$(); }
      else toast.error(data.message || 'Save failed');
    } catch { toast.error('Network error'); }
    finally { setSaving(false); }
  };

  // NEW FEATURE: Fast click-to-star featured state toggler direct from project card!
  const toggleFeaturedDirect = async (project, e) => {
    e.stopPropagation();
    const updatedFeatured = !project.featured;
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...project, id: project._id, featured: updatedFeatured }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(updatedFeatured ? 'Project set as Featured!' : 'Project removed from Featured.');
        fetch$();
      } else {
        toast.error('Failed to update showcase status');
      }
    } catch {
      toast.error('Network communication error');
    }
  };

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) { toast.success('Project deleted'); fetch$(); }
      else toast.error('Delete failed');
    } catch { toast.error('Network error'); }
    finally { setDeleting(null); }
  };

  const getEditInitial = (p) => ({
    ...p,
    tags: Array.isArray(p.tags) ? p.tags.join(', ') : p.tags || '',
    keyFeatures: Array.isArray(p.keyFeatures) ? p.keyFeatures.join(', ') : p.keyFeatures || '',
  });

  // Filters logic
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title?.toLowerCase().includes(search.toLowerCase()) ||
                          p.subtitle?.toLowerCase().includes(search.toLowerCase()) ||
                          p.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    
    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'Featured Only') return matchesSearch && p.featured;
    return matchesSearch && p.category === activeFilter;
  });

  const STATUS_INDICATOR = {
    'Active': { text: 'Active', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25', light: 'bg-emerald-400' },
    'Completed': { text: 'Completed', bg: 'bg-dark-primary/10 text-dark-primary border-dark-primary/25', light: 'bg-dark-primary' },
    'In Progress': { text: 'In Progress', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/25', light: 'bg-amber-400' },
    'Archived': { text: 'Archived', bg: 'bg-white/5 text-white/40 border-white/10', light: 'bg-white/30' },
  };

  return (
    <div className="space-y-6 relative z-10 font-body">
      {/* ── Top Bar Title & Primary Controls ── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-display font-black text-white mb-1">Projects Catalog</h2>
          <p className="text-sm text-dark-textMuted">{projects.length} project{projects.length !== 1 ? 's' : ''} in dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetch$} className="p-2 rounded-xl bg-dark-surface/50 border border-dark-border text-dark-textMuted hover:text-white transition-all"><RefreshCw size={15} /></button>
          <button
            onClick={() => setModal('create')}
            className="flex items-center gap-2 px-4 py-2.5 bg-dark-primary hover:bg-dark-primary/95 text-white font-black text-sm rounded-xl transition-colors shadow-lg shadow-dark-primary/5"
          >
            <Plus size={16} /> New Project
          </button>
        </div>
      </div>

      {/* ── NEW FUNCTION: Interactive Search & Status Tabs Filters ── */}
      <div className="bg-dark-surface/20 border border-dark-border rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-textMuted/40" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects or tags..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-dark-bg border border-dark-border rounded-xl text-white placeholder-dark-textMuted/30 focus:outline-none focus:border-dark-primary/50 transition-colors"
          />
        </div>
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 flex-wrap">
          {PROJECT_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                activeFilter === f
                  ? 'bg-dark-primary/10 text-dark-primary border-dark-primary/20'
                  : 'text-dark-textMuted/60 hover:text-white border-transparent'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-dark-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-24 bg-dark-surface/10 border border-dashed border-dark-border rounded-3xl">
          <Briefcase size={44} className="mx-auto mb-4 text-dark-textMuted/30" />
          <p className="font-bold text-white/50 text-sm">No projects matched</p>
          <p className="text-xs text-dark-textMuted mt-1">Try expanding your search query or catalog a new project showcase!</p>
        </div>
      ) : (
        /* ── NEW DESIGN: Breathtaking Multi-Column Grid of Engineering Cards ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(proj => {
            const ind = STATUS_INDICATOR[proj.status] || STATUS_INDICATOR['Archived'];
            return (
              <div
                key={proj._id}
                className="bg-dark-surface/20 border border-dark-border rounded-2xl overflow-hidden hover:border-dark-primary/25 transition-all group flex flex-col shadow-lg shadow-black/10 hover:-translate-y-1 duration-300"
              >
                {/* Visual Cover Banner with Zoom & Quick Stars */}
                <div className="relative h-44 w-full bg-dark-bg overflow-hidden flex-shrink-0 border-b border-dark-border">
                  {proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-dark-primary/5 to-dark-secondary/5 flex items-center justify-center">
                      <Briefcase size={32} className="text-dark-textMuted/30" />
                    </div>
                  )}

                  {/* Pulsating status bullet overlay */}
                  <span className={`absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border flex items-center gap-1.5 backdrop-blur-sm ${ind.bg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${ind.light} animate-pulse`} />
                    {ind.text}
                  </span>

                  {/* NEW FEATURE: Direct instant click-to-star showcased projects toggler */}
                  <button
                    onClick={(e) => toggleFeaturedDirect(proj, e)}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-dark-surface border border-white/10 text-white transition-all shadow-md backdrop-blur-sm hover:scale-110"
                    title={proj.featured ? 'Featured Project' : 'Set as Featured'}
                  >
                    <Star size={13} className={proj.featured ? 'text-amber-400 fill-amber-400 animate-spin-slow' : 'text-white/40'} />
                  </button>

                  {/* Quick Edit/Delete controls shown on card hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setModal(getEditInitial(proj))}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-dark-primary text-dark-bg hover:bg-dark-primary/95 text-xs font-black transition-all shadow-lg shadow-dark-primary/20"
                    >
                      <Pencil size={11} /> Edit Project
                    </button>
                    <button
                      onClick={() => deleteProject(proj._id)}
                      disabled={deleting === proj._id}
                      className="p-2.5 rounded-xl bg-dark-surface border border-white/10 text-white hover:text-red-400 transition-all"
                    >
                      {deleting === proj._id ? (
                        <div className="w-4 h-4 border border-red-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 size={13} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                    <h3 className="text-white font-display font-black text-sm tracking-wide leading-tight group-hover:text-dark-primary transition-colors">
                      {proj.title}
                    </h3>
                  </div>
                  {proj.subtitle && (
                    <p className="text-dark-textMuted/60 text-xs font-medium mb-3 leading-tight">{proj.subtitle}</p>
                  )}

                  {proj.description && (
                    <p className="text-dark-textMuted/70 text-xs line-clamp-3 leading-relaxed mb-4">
                      {proj.description}
                    </p>
                  )}

                  {/* Project Links Section */}
                  <div className="flex items-center gap-3.5 mb-4 mt-auto">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-dark-primary hover:underline flex items-center gap-1.5 font-bold"
                      >
                        <ExternalLink size={11} /> Live Demo
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-dark-textMuted/70 hover:text-white flex items-center gap-1.5 font-bold transition-colors"
                      >
                        <Github size={11} /> Codebase
                      </a>
                    )}
                  </div>

                  {/* Tags Footer */}
                  <div className="pt-4 border-t border-dark-border/40 flex items-center justify-between flex-wrap gap-2 text-[9px] text-dark-textMuted/60">
                    <div className="flex items-center gap-1.5 max-w-[65%] truncate">
                      {proj.tags?.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-dark-bg/60 border border-dark-border/60 text-white/50 font-bold uppercase tracking-wider font-code">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {proj.category && (
                      <span className="flex items-center gap-1 font-bold uppercase tracking-wider text-dark-secondary"><Layers size={9} /> {proj.category}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 🔮 Animated Modal via AnimatePresence */}
      <AnimatePresence>
        {modal && (
          <Modal
            title={modal === 'create' ? 'Add New Project Showcase' : 'Edit Project Showcase'}
            onClose={() => setModal(null)}
          >
            <ProjectForm
              initial={modal === 'create' ? EMPTY_PROJECT : modal}
              onSave={saveProject}
              saving={saving}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
