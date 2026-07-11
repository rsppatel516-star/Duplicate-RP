import React, { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  Mail, MapPin, Github, Linkedin,
  Send, MessageSquare, Globe,
  User, DollarSign
} from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

// Framer Motion staggered orchestration variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 16
    }
  }
};

export default function Contact({ isPage = false }) {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const HeadingTag = isPage ? motion.h1 : motion.h2;


  const submitForm = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    const loadingToast = toast.loading('Establishing connection...');

    try {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.dismiss(loadingToast);
        toast.success(result.message || 'Transmission successful. Data secured in MongoDB.');
        formRef.current.reset();
      } else {
        toast.dismiss(loadingToast);
        toast.error(result.message || 'Transmission failed. Retrying sync...');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Network failure. Transmission aborted.');
      console.error('API call failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 relative overflow-hidden">

      <Toaster
        toastOptions={{
          style: {
            background: '#0a0a0a',
            color: '#f8fafc',
            border: '1px solid #ffffff1a',
            backdropFilter: 'blur(10px)',
          },
        }}
      />

      {/* Dynamic Ambient Background Glows 
      <div className="absolute -bottom-48 -left-48 w-[400px] h-[400px] bg-dark-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-48 -right-48 w-[400px] h-[400px] bg-dark-secondary/10 rounded-full blur-[120px] pointer-events-none" />*/}

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="flex flex-col lg:flex-row gap-20">

          {/* Left Column: The Brief */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/3 flex flex-col justify-between"
          >
            <div>
              <motion.div
                variants={itemVariants}
                className="w-12 h-12 bg-dark-surface border border-dark-border rounded-xl flex items-center justify-center text-dark-primary mb-8 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
              >
                <MessageSquare size={24} />
              </motion.div>

              <HeadingTag
                variants={itemVariants}
                className="text-6xl font-black font-display leading-[0.85] mb-8 tracking-tighter animated-gradient-text"
              >
                Ready to <br /> <span className="text-gradient">Scale?</span>
              </HeadingTag>

              {/* Info Cards */}
              <div className="space-y-6 mb-12">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center gap-6 p-5 bg-dark-surface/10 backdrop-blur-md border border-dark-border/40 rounded-2xl hover:border-dark-primary/30 hover:bg-dark-surface/20 transition-all duration-500 group"
                >
                  <div className="p-4 bg-dark-bg/40 border border-dark-border/50 rounded-xl text-dark-primary transition-all group-hover:border-dark-primary/50 group-hover:bg-dark-primary/5">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-dark-textMuted mb-1">Direct Transmission</p>
                    <a href="mailto:patelrudra99098@gmail.com" className="text-md md:text-lg font-bold text-dark-textMain transition-colors font-bricolage hover:text-dark-primary break-all">
                      patelrudra99098@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center gap-6 p-5 bg-dark-surface/10 backdrop-blur-md border border-dark-border/40 rounded-2xl hover:border-dark-secondary/30 hover:bg-dark-surface/20 transition-all duration-500 group"
                >
                  <div className="p-4 bg-dark-bg/40 border border-dark-border/50 rounded-xl text-dark-secondary transition-all group-hover:border-dark-secondary/50 group-hover:bg-dark-secondary/5">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-dark-textMuted mb-1">Base Location</p>
                    <p className="text-md md:text-lg font-bold text-dark-textMain font-bricolage group-hover:text-dark-secondary transition-colors">Gujarat, India</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social Grid */}
            <motion.div variants={itemVariants} className="mt-6">
              <p className="text-[10px] uppercase tracking-[0.3em] font-black text-dark-textMuted mb-6">Social Infrastructure</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: <Github size={20} />, url: 'https://github.com/Rudraptl16', activeClass: 'hover:text-white hover:border-white/50 hover:bg-white/5 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]' },
                  { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/rudra-patel-265258313/', activeClass: 'hover:text-[#0077B5] hover:border-[#0077B5]/50 hover:bg-[#0077B5]/5 hover:shadow-[0_0_20px_rgba(0,119,181,0.2)]' },
                  { icon: <Globe size={20} />, url: 'https://patelrudra.in', activeClass: 'hover:text-dark-primary hover:border-dark-primary/50 hover:bg-dark-primary/5 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]' }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit my profile at ${social.url}`}
                    whileHover={{ y: -8, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-14 h-14 rounded-2xl backdrop-blur-md border border-dark-border/60 bg-dark-surface/5 flex items-center justify-center text-dark-textMuted transition-all duration-500 ${social.activeClass}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: The Input Lab */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-dark-surface/10 backdrop-blur-xl border border-dark-border/40 rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
            >
              {/* High-Tech HUD Elements */}
              <div className="absolute top-4 left-6 hidden md:block text-[9px] font-code text-dark-primary/30 select-none pointer-events-none tracking-widest">
                + SYSTEM_INIT_SECURE_CHANNEL_01
              </div>
              <div className="absolute top-4 right-6 hidden md:flex items-center gap-4 text-[9px] font-code text-dark-textMuted/30 select-none pointer-events-none tracking-widest">
                <span>PORT: SECURE_SYNC</span>
                <span>//</span>
                <span className="animate-pulse text-emerald-500/50">STATUS: ONLINE</span>
              </div>

              <motion.div
                animate={{ opacity: [0.25, 0.6, 0.25] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-dark-primary/30 rounded-tl-[32px] pointer-events-none"
              />
              <motion.div
                animate={{ opacity: [0.25, 0.6, 0.25] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-dark-secondary/30 rounded-br-[32px] pointer-events-none"
              />

              <motion.form
                ref={formRef}
                onSubmit={submitForm}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-10 relative z-10 pt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                  {/* Name Input */}
                  <motion.div variants={itemVariants} className="space-y-3 relative group/input">
                    <label htmlFor="user_name" className="text-[10px] font-black uppercase tracking-[0.2em] text-dark-textMuted group-focus-within/input:text-dark-secondary group-focus-within/input:translate-x-1 transition-all duration-300 flex items-center gap-2">
                      <User size={12} className="group-focus-within/input:animate-pulse" />
                      Mission Identity
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="user_name"
                        id="user_name"
                        required
                        className="w-full bg-white/[0.01] border border-white/5 focus:border-violet-500/35 rounded-xl px-5 py-4 text-dark-textMain placeholder:text-dark-textMuted/30 focus:outline-none focus:bg-white/[0.02] focus:shadow-[0_0_20px_rgba(124,58,237,0.04)] transition-all duration-500"
                        placeholder="Your Full Name"
                      />
                      <div className="absolute bottom-[1px] left-[5%] right-[5%] h-[1.5px] bg-gradient-to-r from-transparent via-violet-500/80 to-transparent w-0 group-focus-within/input:w-[90%] transition-all duration-500 pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* Email Input */}
                  <motion.div variants={itemVariants} className="space-y-3 relative group/input">
                    <label htmlFor="user_email" className="text-[10px] font-black uppercase tracking-[0.2em] text-dark-textMuted group-focus-within/input:text-dark-primary group-focus-within/input:translate-x-1 transition-all duration-300 flex items-center gap-2">
                      <Mail size={12} className="group-focus-within/input:animate-pulse" />
                      Comms Frequency
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="user_email"
                        id="user_email"
                        required
                        className="w-full bg-white/[0.01] border border-white/5 focus:border-violet-500/35 rounded-xl px-5 py-4 text-dark-textMain placeholder:text-dark-textMuted/30 focus:outline-none focus:bg-white/[0.02] focus:shadow-[0_0_20px_rgba(124,58,237,0.04)] transition-all duration-500"
                        placeholder="email@example.com"
                      />
                      <div className="absolute bottom-[1px] left-[5%] right-[5%] h-[1.5px] bg-gradient-to-r from-transparent via-violet-500/80 to-transparent w-0 group-focus-within/input:w-[90%] transition-all duration-500 pointer-events-none" />
                    </div>
                  </motion.div>
                </div>



                {/* Subject Input */}
                <motion.div variants={itemVariants} className="space-y-3 relative group/input">
                  <label htmlFor="subject" className="text-[10px] font-black uppercase tracking-[0.2em] text-dark-textMuted group-focus-within/input:text-dark-secondary group-focus-within/input:translate-x-1 transition-all duration-300 flex items-center gap-2">
                    <Globe size={12} className="group-focus-within/input:animate-pulse" />
                    Mission Objective
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      className="w-full bg-white/[0.01] border border-white/5 focus:border-violet-500/35 rounded-xl px-5 py-4 text-dark-textMain placeholder:text-dark-textMuted/30 focus:outline-none focus:bg-white/[0.02] focus:shadow-[0_0_20px_rgba(124,58,237,0.04)] transition-all duration-500"
                      placeholder="Project Inquiry / Job Opportunity / Hello"
                    />
                    <div className="absolute bottom-[1px] left-[5%] right-[5%] h-[1.5px] bg-gradient-to-r from-transparent via-violet-500/80 to-transparent w-0 group-focus-within/input:w-[90%] transition-all duration-500 pointer-events-none" />
                  </div>
                </motion.div>

                {/* Message Textarea */}
                <motion.div variants={itemVariants} className="space-y-3 relative group/input">
                  <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-dark-textMuted group-focus-within/input:text-dark-primary group-focus-within/input:translate-x-1 transition-all duration-300 flex items-center gap-2">
                    <MessageSquare size={12} className="group-focus-within/input:animate-pulse" />
                    Mission Brief
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      id="message"
                      rows="5"
                      required
                      className="w-full bg-white/[0.01] border border-white/5 focus:border-violet-500/35 rounded-xl px-5 py-4 text-dark-textMain placeholder:text-dark-textMuted/30 focus:outline-none focus:bg-white/[0.02] focus:shadow-[0_0_20px_rgba(124,58,237,0.04)] transition-all duration-500 resize-none"
                      placeholder="Describe your vision or inquiry in detail..."
                    ></textarea>
                    <div className="absolute bottom-[1px] left-[5%] right-[5%] h-[1.5px] bg-gradient-to-r from-transparent via-violet-500/80 to-transparent w-0 group-focus-within/input:w-[90%] transition-all duration-500 pointer-events-none" />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants} className="pt-6">
                  <MagneticButton disabled={isSubmitting} className="w-full cursor-pointer">
                    <button
                      type="submit"
                      className={`w-full py-4 sm:py-5.5 rounded-2xl font-display font-black text-[11px] sm:text-xs md:text-sm lg:text-[15px] leading-none tracking-wide sm:tracking-wider transition-all duration-500 relative overflow-hidden group cursor-pointer ${isSubmitting
                        ? 'bg-dark-surface text-dark-textMuted cursor-not-allowed border border-dark-border'
                        : 'bg-dark-primary text-dark-bg hover:shadow-[0_0_40px_rgba(0,212,255,0.25)]'
                        }`}
                    >
                      {/* Sliding Shimmer Highlight */}
                      <div className="absolute inset-0 w-1/2 h-full z-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000 ease-out pointer-events-none" />

                      <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-4 whitespace-nowrap">
                        {isSubmitting ? (
                          <span className="flex items-center gap-2 md:gap-3">
                            <div className="w-1.5 h-1.5 bg-dark-textMuted rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <div className="w-1.5 h-1.5 bg-dark-textMuted rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <div className="w-1.5 h-1.5 bg-dark-textMuted rounded-full animate-bounce" />
                            TRANSMITTING...
                          </span>
                        ) : (
                          <>
                            INITIALIZE CONNECTION
                            <Send className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300" />
                          </>
                        )}
                      </div>

                      {/* Hover Glow Layer */}
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
                    </button>
                  </MagneticButton>
                </motion.div>
              </motion.form>

              {/* High-Tech Decorative Label */}
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none select-none">
                <div className="text-[40px] font-black tracking-widest">DATA_SYNC_04</div>
              </div>
              <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-dark-secondary/5 rounded-full blur-[80px] pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
