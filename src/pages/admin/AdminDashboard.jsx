import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import {
  LayoutDashboard, Mail, FileText, Briefcase, LogOut, ChevronRight, Menu, X
} from 'lucide-react';

import OverviewTab from '../../components/admin/OverviewTab';
import MessagesTab from '../../components/admin/MessagesTab';
import BlogsTab from '../../components/admin/BlogsTab';
import ProjectsTab from '../../components/admin/ProjectsTab';

const NAV = [
  { id: 'overview', label: 'Overview', Icon: LayoutDashboard, color: 'text-dark-primary', active: 'bg-dark-primary/10 text-dark-primary border-dark-primary/25' },
  { id: 'messages', label: 'Messages', Icon: Mail, color: 'text-dark-primary', active: 'bg-dark-primary/10 text-dark-primary border-dark-primary/25' },
  { id: 'blogs', label: 'Blogs', Icon: FileText, color: 'text-dark-secondary', active: 'bg-dark-secondary/10 text-dark-secondary border-dark-secondary/25' },
  { id: 'projects', label: 'Projects', Icon: Briefcase, color: 'text-dark-primary', active: 'bg-dark-primary/10 text-dark-primary border-dark-primary/25' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
      toast.success('Logged out');
    } catch { }
    navigate('/admin/login');
  };

  const activeNav = NAV.find(n => n.id === activeTab);

  return (
    <div className="min-h-screen bg-transparent text-dark-textMain flex font-body relative overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#161b22', color: '#e6edf3', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', fontSize: '14px' },
        }}
      />

      {/* Sidebar Overlay (Mobile only) */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden transition-all duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`w-60 h-screen bg-dark-surface/60 backdrop-blur-xl border-r border-dark-border flex flex-col fixed left-0 top-0 overflow-hidden z-40 transition-transform duration-300 md:translate-x-0 ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          }`}
      >
        {/* Logo */}
        <div className="px-5 py-6 border-b border-dark-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-dark-primary to-dark-secondary flex items-center justify-center text-white font-black text-sm shadow-lg">
              R
            </div>
            <div>
              <p className="font-display font-black text-white text-sm leading-none">Admin Panel</p>
              <p className="text-[10px] text-dark-textMuted font-code tracking-widest mt-0.5">CONTROL CENTER</p>
            </div>
          </div>

          {/* Close Sidebar button on mobile */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1.5 rounded-lg hover:bg-white/5 text-dark-textMuted hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ id, label, Icon, active }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all border ${isActive
                  ? `${active} border`
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04] border-transparent'
                  }`}
              >
                <Icon size={16} />
                <span className="flex-1 text-left">{label}</span>
                {isActive && <ChevronRight size={14} className="opacity-60" />}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-dark-border space-y-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-white/40 hover:text-red-400 hover:bg-red-400/[0.08] transition-all border border-transparent"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>

          <div className="text-[8px] text-center text-dark-primary/30 font-code uppercase tracking-widest select-none">
            Co-engineered by Rudra & Antigravity
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-grow pl-0 md:pl-60 min-h-screen flex flex-col overflow-y-auto w-full transition-all duration-300">
        {/* Topbar */}
        <div className="sticky top-0 z-10 px-6 md:px-8 py-4 border-b border-dark-border bg-dark-bg/40 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Hamburger menu trigger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 rounded-xl bg-dark-surface/50 border border-dark-border text-dark-textMuted hover:text-white transition-all"
            >
              <Menu size={16} />
            </button>

            <div className="flex items-center gap-2 text-sm text-dark-textMuted">
              <span className="font-code text-xs">Admin</span>
              <span>/</span>
              <span className={`font-bold ${activeNav?.color || 'text-white'}`}>{activeNav?.label}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-dark-textMuted font-code">Live</span>
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 md:px-8 py-6 md:py-8 max-w-5xl w-full">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'messages' && <MessagesTab />}
          {activeTab === 'blogs' && <BlogsTab />}
          {activeTab === 'projects' && <ProjectsTab />}
        </div>
      </main>
    </div>
  );
}
