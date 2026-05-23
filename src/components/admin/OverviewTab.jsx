import React, { useEffect, useState } from 'react';
import { Mail, FileText, Briefcase, TrendingUp, Clock, CheckCircle, Plus, RefreshCw, Server, Wifi, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function OverviewTab() {
  const [stats, setStats] = useState({ messages: 0, blogs: 0, projects: 0 });
  const [loading, setLoading] = useState(true);
  const [recentMessages, setRecentMessages] = useState([]);
  const [systemTime, setSystemTime] = useState(new Date().toLocaleTimeString());

  const fetchStats = async (showToast = false) => {
    if (showToast) setLoading(true);
    try {
      const [msgRes, blogRes, projRes] = await Promise.all([
        fetch('/api/admin/messages'),
        fetch('/api/admin/blogs'),
        fetch('/api/admin/projects'),
      ]);
      const [msgData, blogData, projData] = await Promise.all([
        msgRes.json(), blogRes.json(), projRes.json()
      ]);
      setStats({
        messages: msgData.success ? msgData.data.length : 0,
        blogs: blogData.success ? blogData.data.length : 0,
        projects: projData.success ? projData.data.length : 0,
      });
      if (msgData.success) {
        setRecentMessages(msgData.data.slice(0, 4));
      }
      if (showToast) toast.success('Stats synced');
    } catch (e) {
      console.error(e);
      if (showToast) toast.error('Failed to sync stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { label: 'Inbox Messages', value: stats.messages, icon: Mail, color: 'from-dark-primary/10 to-dark-primary/5', border: 'border-dark-primary/15 hover:border-dark-primary/30', text: 'text-dark-primary', detail: 'Latest client inquiries' },
    { label: 'Articles Published', value: stats.blogs, icon: FileText, color: 'from-dark-secondary/10 to-dark-secondary/5', border: 'border-dark-secondary/15 hover:border-dark-secondary/30', text: 'text-dark-secondary', detail: 'Active blog chronicled' },
    { label: 'Showcase Projects', value: stats.projects, icon: Briefcase, color: 'from-dark-primary/10 to-dark-primary/5', border: 'border-dark-primary/15 hover:border-dark-primary/30', text: 'text-dark-primary', detail: 'Featured portfolio capabilities' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-dark-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8 relative z-10">
      {/* ── Welcome Hero Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-dark-surface/40 border border-dark-border rounded-2xl p-6 relative overflow-hidden backdrop-blur-md"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark-primary/[0.02] to-dark-secondary/[0.02] pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-display font-black text-white tracking-tight flex items-center gap-2">
                Welcome back, Rudra
              </h1>
              <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-dark-primary/10 border border-dark-primary/20 text-dark-primary rounded-lg flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-dark-primary" />
                Co-Engineered by Rudra & Antigravity
              </span>
            </div>
            <p className="text-xs text-dark-textMuted mt-2.5 max-w-xl">
              Here is your portfolio's general status overview. Use the tabs in the left sidebar to compose blogs, manage artifacts, or reply to contact requests.
            </p>
            {/* System Status Indicators */}
            <div className="flex items-center gap-4 mt-4 flex-wrap">
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/25">
                <Wifi size={10} /> Database Online
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-dark-primary font-bold uppercase tracking-wider bg-dark-primary/10 px-2 py-0.5 rounded-full border border-dark-primary/25">
                <Server size={10} /> Local Dev Server
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-dark-secondary font-bold uppercase tracking-wider bg-dark-secondary/10 px-2 py-0.5 rounded-full border border-dark-secondary/25">
                <Shield size={10} /> Secured Admin Panel
              </div>
            </div>
          </div>
 
          {/* Quick Actions Panel */}
          <div className="flex items-center gap-2 bg-dark-bg/60 p-2 border border-dark-border rounded-xl flex-shrink-0 self-start md:self-auto">
            <button
              onClick={() => fetchStats(true)}
              className="p-2.5 rounded-lg bg-dark-surface hover:bg-dark-surface/80 border border-dark-border text-dark-textMuted hover:text-white transition-all"
              title="Sync Statistics"
            >
              <RefreshCw size={14} className="hover:rotate-45 transition-transform" />
            </button>
            <div className="h-6 w-[1px] bg-dark-border" />
            <div className="px-3 flex flex-col items-end">
              <span className="text-[10px] text-dark-textMuted/50 font-code font-bold uppercase tracking-widest">Server Time</span>
              <span className="text-sm font-bold text-white font-code">{systemTime}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Stat Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map(({ label, value, icon: Icon, color, border, text, detail }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200, delay: idx * 0.08 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className={`relative bg-gradient-to-br ${color} border ${border} rounded-2xl p-6 shadow-lg overflow-hidden group transition-all duration-300`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/[0.01]" />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-dark-textMuted uppercase tracking-widest font-black mb-1.5">{label}</p>
                <p className={`text-4xl font-display font-black ${text}`}>{value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-dark-surface/80 flex items-center justify-center ${text} border border-dark-border shadow-md`}>
                <Icon size={20} />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-dark-border/40 flex items-center justify-between text-[10px] text-dark-textMuted/60">
              <span>{detail}</span>
              <div className="flex items-center gap-1">
                <TrendingUp size={10} className={text} />
                <span>Live sync</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Recent Activity Section ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Messages Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-widest text-dark-textMuted/70 flex items-center gap-2">
              <Clock size={13} className="text-dark-primary animate-pulse" /> Recent Communications
            </h3>
          </div>

          <div className="space-y-3">
            {recentMessages.length === 0 ? (
              <div className="text-dark-textMuted/40 text-sm bg-dark-surface/30 rounded-2xl p-6 border border-dark-border text-center">
                No recent contact messages in inbox.
              </div>
            ) : (
              recentMessages.map(msg => (
                <div
                  key={msg._id}
                  className="flex items-center gap-4 bg-dark-surface/30 border border-dark-border rounded-xl p-4 hover:border-dark-primary/30 transition-all hover:bg-dark-surface/40 group"
                >
                  <div className="w-10 h-10 rounded-full bg-dark-primary/10 flex items-center justify-center text-dark-primary font-black text-sm border border-dark-primary/10 flex-shrink-0">
                    {msg.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold text-sm truncate">{msg.name}</span>
                      <span className="text-dark-textMuted/50 text-[10px] font-code hidden sm:inline">{msg.email}</span>
                    </div>
                    <p className="text-dark-textMuted/70 text-xs truncate mt-0.5">
                      <span className="text-dark-secondary font-bold mr-1">Subject:</span>
                      {msg.subject || 'Inquiry without subject'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-[10px] text-dark-textMuted/40 font-code">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    <a
                      href={`mailto:${msg.email}`}
                      className="opacity-0 group-hover:opacity-100 p-2 rounded-lg bg-dark-primary/10 text-dark-primary hover:bg-dark-primary hover:text-dark-bg transition-all text-xs font-bold flex items-center gap-1"
                    >
                      Reply
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Info Column */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-dark-textMuted/70 flex items-center gap-2">
            <CheckCircle size={13} className="text-dark-secondary" /> Quick References
          </h3>

          <div className="bg-dark-surface/20 border border-dark-border rounded-2xl p-5 space-y-4 backdrop-blur-md">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-dark-textMuted/40 mb-1">Database Sync</p>
              <div className="bg-dark-bg/60 p-3 border border-dark-border rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Mongo Atlas</span>
                  <span className="text-emerald-400 font-bold">Connected</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">SSL Verification</span>
                  <span className="text-emerald-400 font-bold">Active</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-dark-textMuted/40 mb-1">Documentation</p>
              <div className="bg-dark-bg/60 p-3 border border-dark-border rounded-xl space-y-1 text-xs">
                <p className="text-white/60">For portfolio deployment, use standard Vercel environment keys matching your local `.env` variables.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    
  );
}
