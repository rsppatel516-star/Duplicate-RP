import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2, Mail, Search, RefreshCw, MessageSquare, ChevronLeft, Calendar, Copy, ExternalLink, ArrowRight, Send, CornerUpLeft, ShieldCheck, MailWarning, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // 📝 EMAIL COMPOSER STATES
  const [isReplying, setIsReplying] = useState(false);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  const fetch$ = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/messages');
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
        if (data.data.length > 0 && !selectedId) {
          setSelectedId(data.data[0]._id);
        }
      }
    } catch (e) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch$();
  }, []);

  const deleteMessage = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this message?')) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Message deleted successfully');
        if (selectedId === id) {
          const remaining = messages.filter(m => m._id !== id);
          setSelectedId(remaining.length > 0 ? remaining[0]._id : null);
          setIsReplying(false);
        }
        fetch$();
      } else {
        toast.error('Delete failed');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setDeleting(null);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const startReply = (msg) => {
    setReplySubject(`Re: ${msg.subject || 'Client Inquiry'}`);
    setReplyMessage(`Hi ${msg.name?.split(' ')[0] || 'there'},\n\nThank you for reaching out! I received your inquiry regarding "${msg.subject || 'your project'}" and would love to discuss how we can work together.\n\n[Write details here]\n\nBest regards,\nRudra Patel\nDigital Architect & Full-Stack Engineer`);
    setIsReplying(true);
  };

  const sendReplyEmail = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) return toast.error('Please write an email message body before sending');
    setSendingReply(true);
    const selectedMsg = messages.find(m => m._id === selectedId);
    
    try {
      const res = await fetch('/api/admin/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selectedMsg.email,
          subject: replySubject,
          message: replyMessage
        })
      });
      const data = await res.json();
      if (data.success) {
        if (data.realSent) {
          toast.success(`Mail sent! ${data.message}`, { duration: 5000 });
        } else {
          toast.success(`Sandbox dispatch logged! ${data.message}`, { duration: 6000 });
        }
        setIsReplying(false);
        setReplyMessage('');
      } else {
        toast.error(data.message || 'Failed to dispatch email reply');
      }
    } catch {
      toast.error('Network dispatch failure');
    } finally {
      setSendingReply(false);
    }
  };

  const filtered = messages.filter(m =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.email?.toLowerCase().includes(search.toLowerCase()) ||
    m.subject?.toLowerCase().includes(search.toLowerCase())
  );

  const selectedMsg = messages.find(m => m._id === selectedId);

  // Status Badge Colors for project types
  const getBadgeStyle = (type) => {
    if (!type) return 'hidden';
    const clean = type.toLowerCase();
    if (clean.includes('web') || clean.includes('full')) return 'text-dark-primary bg-dark-primary/10 border-dark-primary/20';
    if (clean.includes('app') || clean.includes('mobil')) return 'text-dark-secondary bg-dark-secondary/10 border-dark-secondary/20';
    return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
  };

  return (
    <div className="space-y-6 relative z-10 font-body">
      {/* ── Header Toolbar ── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-display font-black text-white mb-1">Inquiry Inbox</h2>
          <p className="text-sm text-dark-textMuted">{messages.length} transmission{messages.length !== 1 ? 's' : ''} captured</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-textMuted/40" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="pl-9 pr-4 py-2 text-sm bg-dark-surface/40 border border-dark-border rounded-xl text-white placeholder-dark-textMuted/30 focus:outline-none focus:border-dark-primary/50 transition-colors w-56"
            />
          </div>
          <button onClick={fetch$} className="p-2 rounded-xl bg-dark-surface/50 border border-dark-border text-dark-textMuted hover:text-white hover:border-dark-primary/30 transition-all">
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-dark-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-24 bg-dark-surface/20 border border-dashed border-dark-border rounded-3xl">
          <MessageSquare size={44} className="mx-auto mb-4 text-dark-textMuted/30" />
          <p className="font-bold text-white/50 text-sm">Inbox is completely clear</p>
          <p className="text-xs text-dark-textMuted mt-1">No contact inquiries have been recorded yet.</p>
        </div>
      ) : (
        /* ── Modern Split-Pane Interface ── */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[550px]">
          {/* 📬 LEFT COLUMN: Message List Feed */}
          <div className={`md:col-span-5 space-y-2.5 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin ${selectedId && 'hidden md:block'}`}>
            {filtered.length === 0 ? (
              <div className="text-center py-10 text-dark-textMuted/40 text-sm">
                No matching inquiries found
              </div>
            ) : (
              filtered.map(msg => {
                const isActive = msg._id === selectedId;
                return (
                  <div
                    key={msg._id}
                    onClick={() => { setSelectedId(msg._id); setIsReplying(false); }}
                    className={`relative p-4 border rounded-2xl cursor-pointer transition-all duration-200 group flex items-start gap-3.5 ${
                      isActive
                        ? 'bg-dark-primary/5 border-dark-primary/30 shadow-md shadow-dark-primary/5'
                        : 'bg-dark-surface/20 border-dark-border hover:border-white/10 hover:bg-dark-surface/30'
                    }`}
                  >
                    {/* Left Active Glow bar */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-dark-primary" />
                    )}

                    {/* Sender Initial Bubble */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs border flex-shrink-0 transition-colors ${
                      isActive
                        ? 'bg-dark-primary/20 text-dark-primary border-dark-primary/20'
                        : 'bg-dark-surface/80 text-white/70 border-dark-border group-hover:border-white/20'
                    }`}>
                      {msg.name?.charAt(0)?.toUpperCase()}
                    </div>

                    {/* Content Brief */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-white font-bold text-xs truncate">{msg.name}</span>
                        <span className="text-[9px] text-dark-textMuted/40 font-code flex-shrink-0">
                          {new Date(msg.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-white/80 font-medium text-[11px] truncate mt-0.5">{msg.subject || 'Inquiry Summary'}</p>
                      <p className="text-dark-textMuted/60 text-[10px] truncate mt-1 leading-normal">{msg.message}</p>
                      {msg.project_type && (
                        <span className={`inline-block text-[8px] font-bold px-1.5 py-0.5 rounded border mt-2 uppercase tracking-wide ${getBadgeStyle(msg.project_type)}`}>
                          {msg.project_type}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* 💬 RIGHT COLUMN: Professional Detail Viewer or Composer */}
          <div className={`md:col-span-7 flex flex-col ${!selectedId && 'hidden md:flex'} ${selectedId ? 'block' : 'hidden'}`}>
            <AnimatePresence mode="wait">
              {selectedMsg ? (
                isReplying ? (
                  /* ✉️ DIRECT EMAIL COMPOSER INTERFACE */
                  <motion.form
                    key="composer"
                    onSubmit={sendReplyEmail}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="bg-dark-surface/30 border border-dark-border rounded-2xl flex flex-col flex-grow overflow-hidden backdrop-blur-md"
                  >
                    {/* Header toolbar */}
                    <div className="px-6 py-4 border-b border-dark-border bg-dark-bg/20 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setIsReplying(false)}
                        className="flex items-center gap-1.5 text-xs text-dark-primary font-bold hover:underline"
                      >
                        <CornerUpLeft size={14} /> Back to Message
                      </button>
                      <span className="text-[10px] font-black uppercase tracking-widest text-dark-secondary flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-dark-secondary animate-pulse" /> Direct Outbound Mailer
                      </span>
                    </div>

                    <div className="p-6 space-y-4 overflow-y-auto flex-grow max-h-[500px]">
                      {/* Recipient Field */}
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-widest text-dark-textMuted/60 mb-1.5">To (Recipient Address)</label>
                        <input
                          type="email"
                          readOnly
                          value={selectedMsg.email}
                          className="w-full bg-dark-bg/50 border border-dark-border rounded-xl px-4 py-2.5 text-xs text-white/50 cursor-not-allowed select-all"
                        />
                      </div>

                      {/* Subject Field */}
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-widest text-dark-textMuted/60 mb-1.5">Outbound Subject</label>
                        <input
                          type="text"
                          required
                          value={replySubject}
                          onChange={e => setReplySubject(e.target.value)}
                          className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-dark-primary/60 transition-all focus:ring-1 focus:ring-dark-primary/20"
                        />
                      </div>

                      {/* Message Content Textarea */}
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-widest text-dark-textMuted/60 mb-1.5">Message Body</label>
                        <textarea
                          required
                          rows={10}
                          value={replyMessage}
                          onChange={e => setReplyMessage(e.target.value)}
                          className="w-full bg-dark-bg border border-dark-border rounded-xl p-4 text-xs text-white placeholder-white/20 leading-relaxed focus:outline-none focus:border-dark-primary/60 transition-all focus:ring-1 focus:ring-dark-primary/20 font-sans"
                        />
                      </div>

                      {/* SMTP Gateway Warning/Indicator */}
                      <div className="bg-dark-bg/60 border border-dark-border/60 p-3.5 rounded-xl flex items-start gap-3">
                        <AlertCircle size={16} className="text-amber-400 mt-0.5 flex-shrink-0 animate-pulse" />
                        <div className="text-[10px] text-amber-400/80 leading-normal">
                          <span className="font-bold text-white block mb-0.5">Dual-Gateway Outbound Mailer Active</span>
                          Drafts dispatch seamlessly. If a custom <span className="font-code text-white">SMTP_HOST</span> is configured in <span className="font-code text-white">.env</span>, replies are routed live; otherwise, they are logged locally inside <span className="font-code text-white">/outbox_mocks/</span>.
                        </div>
                      </div>
                    </div>

                    {/* Discard & Send controls */}
                    <div className="p-4 border-t border-dark-border bg-dark-bg/20 flex items-center justify-end gap-3 flex-wrap">
                      <button
                        type="button"
                        onClick={() => { setIsReplying(false); setReplyMessage(''); }}
                        className="px-4 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-xs font-bold text-dark-textMuted hover:text-white transition-all"
                      >
                        Discard Draft
                      </button>
                      <button
                        type="submit"
                        disabled={sendingReply}
                        className="flex items-center gap-2 px-5 py-2.5 bg-dark-primary hover:bg-dark-primary/95 disabled:opacity-50 text-dark-bg font-black text-xs rounded-xl transition-all shadow-lg hover:shadow-dark-primary/10"
                      >
                        {sendingReply ? (
                          <>
                            <div className="w-3 h-3 border border-dark-bg border-t-transparent rounded-full animate-spin" />
                            Sending Reply...
                          </>
                        ) : (
                          <>
                            <Send size={13} /> Dispatch Mail Response
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  /* 💬 STANDARD MESSAGE DETAIL VIEW */
                  <motion.div
                    key={selectedMsg._id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    className="bg-dark-surface/30 border border-dark-border rounded-2xl flex flex-col flex-grow overflow-hidden backdrop-blur-md"
                  >
                    {/* Detail Pane Header Toolbar */}
                    <div className="px-6 py-4 border-b border-dark-border bg-dark-bg/20 flex items-center justify-between gap-3 flex-wrap">
                      {/* Back Button for Mobile views */}
                      <button
                        onClick={() => setSelectedId(null)}
                        className="md:hidden flex items-center gap-1 text-xs text-dark-primary font-bold hover:underline"
                      >
                        <ChevronLeft size={16} /> Inbox
                      </button>

                      <div className="flex items-center gap-2 text-[10px] text-dark-textMuted/50 font-code">
                        <Calendar size={11} />
                        <span>{new Date(selectedMsg.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(selectedMsg.email, 'Email address')}
                          className="p-2 rounded-lg bg-dark-surface border border-dark-border text-dark-textMuted hover:text-white transition-all"
                          title="Copy Email"
                        >
                          <Copy size={13} />
                        </button>
                        <button
                          onClick={() => deleteMessage(selectedMsg._id)}
                          disabled={deleting === selectedMsg._id}
                          className="p-2 rounded-lg bg-dark-surface border border-dark-border text-dark-textMuted hover:text-red-400 hover:border-red-500/25 transition-all disabled:opacity-50"
                          title="Delete Transmission"
                        >
                          {deleting === selectedMsg._id ? (
                            <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Trash2 size={13} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Message Detail Canvas */}
                    <div className="p-6 space-y-6 overflow-y-auto flex-1 max-h-[500px]">
                      {/* Unique Envelope / Sender presentation */}
                      <div className="flex items-center gap-4">
                        {/* Premium Circular ring around Letter initial */}
                        <div className="relative flex-shrink-0">
                          <div className="absolute inset-0 bg-dark-primary/10 rounded-full blur-[6px] animate-pulse" />
                          <div className="relative w-14 h-14 rounded-full bg-dark-surface border border-dark-primary/30 flex items-center justify-center text-dark-primary text-lg font-black shadow-inner shadow-dark-primary/5">
                            {selectedMsg.name?.charAt(0)?.toUpperCase()}
                          </div>
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-white font-black text-sm tracking-wide">{selectedMsg.name}</h4>
                          <a
                            href={`mailto:${selectedMsg.email}`}
                            className="text-xs text-dark-textMuted hover:text-dark-primary transition-colors flex items-center gap-1.5 mt-0.5"
                          >
                            {selectedMsg.email} <ExternalLink size={10} className="opacity-50" />
                          </a>
                        </div>
                      </div>

                      <div className="h-[1px] bg-dark-border/40" />

                      {/* Subject Line & Scope Box */}
                      <div className="space-y-3">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-dark-textMuted/40 block mb-1">Subject Matter</span>
                          <h3 className="text-white font-display font-black text-base md:text-lg leading-snug tracking-tight">
                            {selectedMsg.subject || 'Client Inquiry Statement'}
                          </h3>
                        </div>

                        {selectedMsg.project_type && (
                          <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-dark-textMuted/40 block mb-1.5">Project Scope Parameters</span>
                            <div className="inline-flex items-center gap-2 bg-dark-bg/60 border border-dark-border px-3.5 py-2 rounded-xl text-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-dark-primary" />
                              <span className="text-white/60 font-semibold">Scope:</span>
                              <span className="text-dark-primary font-bold">{selectedMsg.project_type}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Letter Body Payload */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-black uppercase tracking-widest text-dark-textMuted/40 block">Communication Payload</span>
                        <div className="bg-dark-bg/40 border border-dark-border/60 rounded-2xl p-5 text-white/90 text-sm leading-relaxed whitespace-pre-wrap font-sans shadow-inner selection:bg-dark-primary selection:text-dark-bg">
                          {selectedMsg.message}
                        </div>
                      </div>
                    </div>

                    {/* Quick Reply Bar */}
                    <div className="p-4 border-t border-dark-border bg-dark-bg/20 flex items-center justify-end gap-3">
                      <button
                        onClick={() => startReply(selectedMsg)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-dark-primary hover:bg-dark-primary/95 text-dark-bg font-black text-xs rounded-xl transition-all shadow-lg hover:shadow-dark-primary/10"
                      >
                        <Mail size={13} /> Respond to {selectedMsg.name?.split(' ')[0]} <ArrowRight size={12} />
                      </button>
                    </div>
                  </motion.div>
                )
              ) : (
                /* Elegant Inbox Placeholder */
                <div className="bg-dark-surface/10 border border-dark-border border-dashed rounded-2xl flex flex-col items-center justify-center p-12 text-center flex-grow backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-full bg-dark-surface border border-dark-border flex items-center justify-center text-dark-textMuted/30 mb-4 animate-bounce">
                    <Mail size={24} />
                  </div>
                  <h4 className="text-white/70 font-bold text-sm mb-1">Select a Conversation</h4>
                  <p className="text-xs text-dark-textMuted max-w-xs leading-normal">
                    Click any inquiry from the transmission list on the left to read full details and draft instant replies.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
