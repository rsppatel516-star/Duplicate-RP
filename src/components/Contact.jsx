import React, { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  Mail, MapPin, Github, Linkedin,
  Twitter, Send, MessageSquare, Globe,
  User, DollarSign, Clock
} from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

export default function Contact() {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = async (e) => {
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
    <section id="contact" className="py-20 relative overflow-hidden">

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

      {/* Dynamic Background Element */}
      <div className="absolute bottom-[-10%] left-[10%] right-[10%] w-[500px] h-[500px]  rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="flex flex-col lg:flex-row gap-20">

          {/* Left Column: The Brief */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-12 h-12 bg-dark-surface border border-dark-border rounded-xl flex items-center justify-center text-dark-primary mb-8"
            >
              <MessageSquare size={24} />
            </motion.div>

            <h2 className="text-6xl font-black font-display leading-[0.85] mb-8 tracking-tighter animated-gradient-text">
              Ready to <br /> <span className="text-gradient">Scale?</span>
            </h2>

            <p className="text-dark-textMuted text-lg font-light leading-relaxed mb-12 border-l border-dark-primary/30 pl-8 max-w-sm">
              Currently accepting new architectural challenges. Let's sync and build something that matters.
            </p>

            <div className="space-y-8 mb-12">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 group"
              >
                <div className="p-4 border border-dark-border rounded-2xl text-dark-primary transition-all group-hover:border-dark-primary/50 ">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-dark-textMuted mb-1">Direct Transmission</p>
                  <a href="mailto:patelrudra99098@gmail.com" className="text-lg font-bold text-dark-textMain transition-colors  font-bricolage hover:text-dark-primary">
                    patelrudra99098@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 group"
              >
                <div className="p-4 border border-dark-border rounded-2xl text-dark-primary transition-all group-hover:border-dark-primary/50">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-dark-textMuted mb-1">Base Location</p>
                  <p className="text-lg font-bold text-dark-textMain font-bricolage hover:text-dark-primary">Gujarat, India</p>
                </div>
              </motion.div>
            </div>

            {/* Social Grid */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-black text-dark-textMuted mb-8">Social Infrastructure</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: <Github size={20} />, url: 'https://github.com/Rudraptl16', color: 'hover:text-white' },
                  { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/rudra-patel-265258313/', color: 'hover:text-[#0077B5]' },
                  { icon: <Globe size={20} />, url: 'https://patelrudra.in', color: 'hover:text-dark-secondary' }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -8, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-14 h-14 rounded-2xl  backdrop-blur-md border border-white/30 flex items-center justify-center text-dark-textMuted transition-all duration-500 hover:border-dark-primary/40 hover:bg-dark-surface hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] ${social.color}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: The Input Lab */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-dark-surface/20 backdrop-blur-xl border border-dark-border/50 rounded-[32px] p-8 md:p-12 relative overflow-hidden"
            >
              <form ref={formRef} onSubmit={sendEmail} className="space-y-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3 relative group/input">
                    <label htmlFor="user_name" className="text-[10px] font-black uppercase tracking-[0.2em] text-dark-textMuted group-focus-within/input:text-dark-secondary transition-colors duration-500 flex items-center gap-2">
                      <User size={12} />
                      Mission Identity
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="user_name"
                        id="user_name"
                        required
                        className="w-full bg-dark-bg/30 border border-dark-border/50 rounded-xl px-5 py-4 text-dark-textMain placeholder:text-dark-textMuted/30 focus:outline-none focus:border-dark-secondary/50 transition-all duration-500"
                        placeholder="Your Full Name"
                      />
                      <div className="absolute bottom-0 left-0 w-0 h-[px] bg-dark-secondary group-focus-within/input:w-full transition-all duration-700" />
                    </div>
                  </div>

                  <div className="space-y-3 relative group/input">
                    <label htmlFor="user_email" className="text-[10px] font-black uppercase tracking-[0.2em] text-dark-textMuted group-focus-within/input:text-dark-primary transition-colors duration-500 flex items-center gap-2">
                      <Mail size={12} />
                      Comms Frequency
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="user_email"
                        id="user_email"
                        required
                        className="w-full bg-dark-bg/30 border border-dark-border/50 rounded-xl px-5 py-4 text-dark-textMain placeholder:text-dark-textMuted/30 focus:outline-none focus:border-dark-primary/50 transition-all duration-500"
                        placeholder="email@example.com"
                      />
                      <div className="absolute bottom-0 left-0 w-0 h-[0px] bg-dark-primary group-focus-within/input:w-full transition-all duration-700" />
                    </div>
                  </div>
                </div>

                {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3 relative group/input">
                    <label htmlFor="budget" className="text-[10px] font-black uppercase tracking-[0.2em] text-dark-textMuted group-focus-within/input:text-dark-secondary transition-colors duration-500 flex items-center gap-2">
                      <DollarSign size={12} />
                      Resource Allocation
                    </label>
                    <div className="relative">
                      <select
                        name="budget"
                        id="budget"
                        className="w-full bg-dark-bg/30 border border-dark-border/50 rounded-xl px-5 py-4 text-dark-textMain focus:outline-none focus:border-dark-secondary/50 transition-all duration-500 appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-dark-surface">Select Budget Scope</option>
                        <option value="freelance" className="bg-dark-surface">$500 - $2,000</option>
                        <option value="project" className="bg-dark-surface">$2,000 - $5,000</option>
                        <option value="enterprise" className="bg-dark-surface">$5,000+</option>
                        <option value="hiring" className="bg-dark-surface">Full-time / Hiring</option>
                      </select>
                      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-dark-secondary group-focus-within/input:w-full transition-all duration-700" />
                    </div>
                  </div>

                  <div className="space-y-3 relative group/input">
                    <label htmlFor="timeline" className="text-[10px] font-black uppercase tracking-[0.2em] text-dark-textMuted group-focus-within/input:text-dark-primary transition-colors duration-500 flex items-center gap-2">
                      <Clock size={12} />
                      Delivery Window
                    </label>
                    <div className="relative">
                      <select
                        name="timeline"
                        id="timeline"
                        className="w-full bg-dark-bg/30 border border-dark-border/50 rounded-xl px-5 py-4 text-dark-textMain focus:outline-none focus:border-dark-primary/50 transition-all duration-500 appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-dark-surface">Select Duration</option>
                        <option value="urgent" className="bg-dark-surface"> 2 Weeks</option>
                        <option value="standard" className="bg-dark-surface">1 - 2 Months</option>
                        <option value="long" className="bg-dark-surface">3+ Months</option>
                        <option value="ongoing" className="bg-dark-surface">Ongoing Support</option>
                      </select>
                      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-dark-primary group-focus-within/input:w-full transition-all duration-700" />
                    </div>
                  </div>
                 </div>*/}

                <div className="space-y-3 relative group/input">
                  <label htmlFor="subject" className="text-[10px] font-black uppercase tracking-[0.2em] text-dark-textMuted group-focus-within/input:text-dark-secondary transition-colors duration-500 flex items-center gap-2">
                    <Globe size={12} />
                    Mission Objective
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      className="w-full bg-dark-bg/30 border border-dark-border/50 rounded-xl px-5 py-4 text-dark-textMain placeholder:text-dark-textMuted/30 focus:outline-none focus:border-dark-secondary/50 transition-all duration-500"
                      placeholder="Project Inquiry / Job Opportunity / Hello"
                    />
                    <div className="absolute bottom-1 left-0 w-0 h-[0px] bg-dark-secondary group-focus-within/input:w-full transition-all duration-700" />
                  </div>
                </div>

                <div className="space-y-3 relative group/input">
                  <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-dark-textMuted group-focus-within/input:text-dark-primary transition-colors duration-500 flex items-center gap-2">
                    <MessageSquare size={12} />
                    Mission Brief
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      id="message"
                      rows="5"
                      required
                      className="w-full bg-dark-bg/30 border border-dark-border/50 rounded-xl px-5 py-4 text-dark-textMain placeholder:text-dark-textMuted/30 focus:outline-none focus:border-dark-primary/50 transition-all duration-500 resize-none"
                      placeholder="Describe your vision or inquiry in detail..."
                    ></textarea>
                    <div className="absolute bottom-0 left-0 w-0 h-[0px] bg-dark-primary group-focus-within/input:w-full transition-all duration-700" />
                  </div>
                </div>

                <div className="pt-6">
                  <MagneticButton disabled={isSubmitting} className="w-full cursor-pointer">
                    <button
                      type="submit"
                      className={`w-full py-6 rounded-2xl font-display font-black text-[15px] leading-[0.85] tracking-tighter transition-all duration-500 relative overflow-hidden group ${isSubmitting
                        ? 'bg-dark-surface text-dark-textMuted cursor-not-allowed border border-dark-border'
                        : 'bg-dark-primary text-dark-bg hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]'
                        }`}
                    >
                      <div className="relative z-10 flex items-center justify-center gap-4">
                        {isSubmitting ? (
                          <span className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-dark-textMuted rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <div className="w-1.5 h-1.5 bg-dark-textMuted rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <div className="w-1.5 h-1.5 bg-dark-textMuted rounded-full animate-bounce" />
                            TRANSMITTING...
                          </span>
                        ) : (
                          <>
                            INITIALIZE CONNECTION
                            <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </div>

                      {/* Button Hover Glow Layer */}
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                    </button>
                  </MagneticButton>
                </div>
              </form>

              {/* High-Tech Decorative Elements */}
              <div className="absolute top-0 right-0 p-4 opacity-[0.05] pointer-events-none">
                <div className="text-[40px] font-black select-none">DATA_SYNC_04</div>
              </div>
              <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-dark-secondary/5 rounded-full blur-[80px] pointer-events-none" />
            </motion.div>
          </div>

        </div>

        {/* Global Footer / System Status 
        <div className="mt-32 pt-10 border-t border-dark-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-code text-dark-textMuted uppercase tracking-widest">Systems Online</span>
            </div>
            <span className="text-[10px] font-code text-dark-textMuted uppercase tracking-widest">v4.2.0 Final Build</span>
          </div>
          <p className="text-[10px] font-code text-dark-textMuted uppercase tracking-widest">
            © 2026 Rudra Patel. All rights reserved. Built with precision and passion.
          </p>
        </div>*/}
      </div>
    </section>
  );
}


