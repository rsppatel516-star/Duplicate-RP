import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff, Lock, User, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Spotlight effect positioning
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) return toast.error('Please enter all fields');
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Access granted! Initializing dashboard...');
        setTimeout(() => navigate('/admin/dashboard'), 800);
      } else {
        toast.error(data.message || 'Access denied. Invalid credentials.');
      }
    } catch {
      toast.error('Network dispatch failure. Is the server online?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-6 relative overflow-hidden select-none font-body">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(10, 10, 10, 0.9)',
            color: '#e6edf3',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '16px',
            backdropFilter: 'blur(12px)',
            fontSize: '14px',
            fontFamily: 'var(--font-poppins)',
          },
        }}
      />

      {/* Modern Background radial glow blobs matching portfolio */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dark-primary/[0.07] rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-dark-secondary/[0.05] rounded-full blur-[110px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Exquisite cyber tech grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none" />

      {/* Main card outer wrapper with Framer Motion transitions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative z-10 w-full max-w-[430px]"
      >
        {/* Glow border ring that reacts to focus */}
        <div className={`absolute -inset-[1px] bg-gradient-to-r from-dark-primary via-dark-secondary to-dark-primary rounded-3xl blur-[12px] opacity-20 transition-all duration-700 ${isFocused ? 'opacity-40 scale-[1.01]' : 'group-hover:opacity-30'}`} />

        {/* The Card container */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="relative bg-dark-surface/65 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group transition-all duration-300"
          style={{
            background: 'rgba(18, 18, 18, 0.65)',
          }}
        >
          {/* Spotlight laser pointer background */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{
              background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.09), transparent 80%)`,
            }}
          />

          {/* Laser border spotlight */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-3xl"
            style={{
              background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.35), transparent 80%)`,
              WebkitMaskImage: 'radial-gradient(black, transparent)',
              padding: '1px',
            }}
          />

          {/* Logo badge with double revolving neon border rings */}
          <div className="text-center mb-8 relative">
            <div className="relative w-16 h-16 mx-auto mb-5 group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-dark-primary to-dark-secondary rounded-2xl blur-[8px] opacity-40 animate-pulse" />
              <div className="relative w-16 h-16 rounded-2xl bg-dark-bg/85 border border-white/[0.08] flex items-center justify-center shadow-2xl">
                <ShieldCheck size={28} className="text-dark-primary group-hover:text-dark-secondary transition-colors duration-500" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-dark-bg border border-dark-primary/30 flex items-center justify-center">
                <Cpu size={10} className="text-dark-primary animate-spin" style={{ animationDuration: '6s' }} />
              </div>
            </div>

            <h1 className="text-2xl font-display font-black text-white tracking-tight mb-2 uppercase">
              Control Center
            </h1>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-primary/10 border border-dark-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-dark-primary animate-ping" />
              <span className="text-[10px] text-dark-primary font-code tracking-widest uppercase font-bold">
                Level-1 Restricted Auth
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5 relative z-20">
            {/* Username Input Field */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-dark-textMuted/70 pl-1">
                Operator Signature
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 text-white/30 group-focus-within:text-dark-primary transition-colors">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => { setIsFocused(true); }}
                  onBlur={() => { setIsFocused(false); }}
                  className="w-full bg-dark-bg/40 border border-white/[0.06] rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-dark-primary/60 focus:bg-dark-bg/75 transition-all duration-300 shadow-inner group/input"
                  placeholder="Enter credential signature"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Password Input Field */}
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-dark-textMuted/70 pl-1">
                Security Keyphrase
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 text-white/30 group-focus-within:text-dark-primary transition-colors">
                  <Lock size={16} />
                </div>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => { setIsFocused(true); }}
                  onBlur={() => { setIsFocused(false); }}
                  className="w-full bg-dark-bg/40 border border-white/[0.06] rounded-2xl pl-12 pr-12 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-dark-primary/60 focus:bg-dark-bg/75 transition-all duration-300 shadow-inner"
                  placeholder="••••••••••••••"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-2 rounded-2xl font-black text-xs tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-60 relative overflow-hidden group/btn bg-gradient-to-r from-dark-primary to-dark-secondary hover:from-dark-secondary hover:to-dark-primary text-white shadow-lg shadow-dark-primary/10 hover:shadow-dark-primary/25 cursor-pointer"
            >
              {/* Shine Sweep Effect */}
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 transition-all duration-1000 group-hover/btn:left-[100%]" />

              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Bypassing encryption gates...
                  </>
                ) : (
                  <>
                    Decrypt Control Center <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Secure system stats / telemetry indicator */}
          <div className="mt-8 pt-5 border-t border-white/[0.04] flex items-center justify-between text-[8px] text-dark-textMuted/40 font-code flex-wrap gap-2">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              AES-256 SECURED
            </span>
            <span className="text-dark-primary/60 font-black tracking-widest uppercase">
              CO-ENGINEERED BY RUDRA & ANTIGRAVITY
            </span>
            <span>NODE V18.2.0</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
