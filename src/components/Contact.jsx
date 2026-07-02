import React, { useRef, useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  Mail, MapPin, Github, Linkedin,
  Send, MessageSquare, Globe,
  User, ShieldAlert, CheckCircle2
} from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18
    }
  }
};

const presets = [
  {
    label: '💡 Consultation',
    subject: 'General Technical Consultation',
    message: 'Hi Rudra, I would like to schedule a session to consult on digital systems architecture and web performance optimizations.'
  },
  {
    label: '🚀 Collaboration',
    subject: 'Project Collaboration Inquiry',
    message: 'Hi Rudra, I have an upcoming application project and would love to collaborate on the development. Let me know your availability for a sync.'
  },
  {
    label: '🤝 Partnership',
    subject: 'Technical Partnership Proposal',
    message: 'Hi Rudra, let\'s explore potential partnership opportunities to build innovative products together.'
  }
];

export default function Contact() {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  // Listen for prefill events from the Budget Calculator
  useEffect(() => {
    const handlePrefill = (e) => {
      if (e.detail) {
        const { service, message } = e.detail;
        setFormData(prev => ({
          ...prev,
          subject: `Budget Config: ${service.toUpperCase()}`,
          message: message
        }));
        
        // Clear errors for those fields
        setErrors(prev => ({
          ...prev,
          subject: null,
          message: null
        }));
      }
    };

    window.addEventListener('prefillContact', handlePrefill);
    return () => window.removeEventListener('prefillContact', handlePrefill);
  }, []);

  const validateField = (name, value) => {
    let err = null;
    if (name === 'user_name') {
      if (value.trim().length < 3) {
        err = 'Identity must be at least 3 characters.';
      }
    } else if (name === 'user_email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        err = 'Please enter a valid communications frequency.';
      }
    } else if (name === 'message') {
      if (value.trim().length < 10) {
        err = 'Brief must be at least 10 characters.';
      }
    }
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const applyPreset = (preset) => {
    setFormData(prev => ({
      ...prev,
      subject: preset.subject,
      message: preset.message
    }));
    setErrors(prev => ({
      ...prev,
      subject: null,
      message: null
    }));
    toast.success(`Preset "${preset.label}" loaded.`);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Check all fields
    const newErrors = {};
    validateField('user_name', formData.user_name);
    validateField('user_email', formData.user_email);
    validateField('message', formData.message);

    if (formData.user_name.trim().length < 3) newErrors.user_name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) newErrors.user_email = true;
    if (formData.message.trim().length < 10) newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      toast.error('Validation errors present. Please review parameters.');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Establishing connection...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.dismiss(loadingToast);
        toast.success(result.message || 'Transmission successful. Data secured in MongoDB.');
        setFormData({
          user_name: '',
          user_email: '',
          subject: '',
          message: ''
        });
        setErrors({});
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
    <div id="contact" className="py-32 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">

          {/* Left Column: Info/Comms coordinates */}
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
                className="w-12 h-12 bg-dark-surface border border-dark-border rounded-xl flex items-center justify-center text-indigo-400 mb-8 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
              >
                <MessageSquare size={24} />
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-6xl font-black font-display leading-[0.85] mb-8 tracking-tighter animated-gradient-text"
              >
                Ready to <br /> <span className="text-gradient">Scale?</span>
              </motion.h2>

              <div className="space-y-6 mb-12">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="flex items-center gap-6 p-5 bg-dark-surface/10 border border-white/5 rounded-2xl transition-all duration-500 group cursor-default"
                >
                  <div className="p-4 bg-dark-bg/40 border border-white/10 rounded-xl text-indigo-400">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-dark-textMuted mb-1 font-code">Direct Transmission</p>
                    <a href="mailto:patelrudra99098@gmail.com" className="text-sm md:text-base font-bold text-white transition-colors font-bricolage hover:text-indigo-400 break-all">
                      patelrudra99098@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="flex items-center gap-6 p-5 bg-dark-surface/10 border border-white/5 rounded-2xl transition-all duration-500 group cursor-default"
                >
                  <div className="p-4 bg-dark-bg/40 border border-white/10 rounded-xl text-indigo-400">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-dark-textMuted mb-1 font-code">Base Coordinates</p>
                    <p className="text-sm md:text-base font-bold text-white font-bricolage">Gujarat, India (IST)</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social channels */}
            <motion.div variants={itemVariants} className="mt-6">
              <p className="text-[10px] uppercase tracking-[0.3em] font-black text-dark-textMuted mb-6 font-code">Social Infrastructure</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: <Github size={20} />, url: 'https://github.com/Rudraptl16', activeClass: 'hover:text-white hover:border-white/50 hover:bg-white/5 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]' },
                  { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/rudrapatel816/', activeClass: 'hover:text-[#0077B5] hover:border-[#0077B5]/50 hover:bg-[#0077B5]/5 hover:shadow-[0_0_20px_rgba(0,119,181,0.2)]' }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -6, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-14 h-14 rounded-2xl border border-white/5 bg-white/[0.01] flex items-center justify-center text-dark-textMuted transition-all duration-500 ${social.activeClass}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl backdrop-blur-xl"
            >
              {/* High-Tech HUD Indicators */}
              <div className="absolute top-4 left-6 hidden md:block text-[9px] font-code text-indigo-400/40 select-none pointer-events-none tracking-widest">
                + SYSTEM_INIT_SECURE_CHANNEL_01
              </div>
              <div className="absolute top-4 right-6 hidden md:flex items-center gap-4 text-[9px] font-code text-dark-textMuted/40 select-none pointer-events-none tracking-widest">
                <span>PORT: SECURE_SYNC</span>
                <span>//</span>
                <span className="animate-pulse text-emerald-400/80">STATUS: COMMS_ONLINE</span>
              </div>

              {/* Form container */}
              <motion.form
                ref={formRef}
                onSubmit={submitForm}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8 relative z-10 pt-4"
              >
                {/* Preset messages bar */}
                <div className="space-y-3">
                  <label className="text-[9px] font-code font-bold uppercase tracking-widest text-[#6366f1] block">Quick Presets</label>
                  <div className="flex flex-wrap gap-2">
                    {presets.map(p => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => applyPreset(p)}
                        className="px-3.5 py-2 bg-white/5 border border-white/5 hover:border-[#6366f1]/30 hover:bg-[#6366f1]/5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-dark-textMuted hover:text-white transition-all duration-300"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name Input */}
                  <div className="space-y-2 relative group/input">
                    <label htmlFor="user_name" className="text-[10px] font-code font-bold uppercase tracking-wider text-dark-textMuted group-focus-within/input:text-[#6366f1] transition-colors flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><User size={12} /> Mission Identity</span>
                      {errors.user_name && <span className="text-red-400 text-[8px] flex items-center gap-1"><ShieldAlert size={10} /> {errors.user_name}</span>}
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      id="user_name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/[0.01] border border-white/5 focus:border-[#6366f1]/40 rounded-xl px-5 py-4 text-white placeholder:text-dark-textMuted/30 focus:outline-none transition-all duration-300"
                      placeholder="Your Full Name"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2 relative group/input">
                    <label htmlFor="user_email" className="text-[10px] font-code font-bold uppercase tracking-wider text-dark-textMuted group-focus-within/input:text-[#6366f1] transition-colors flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><Mail size={12} /> Comms Frequency</span>
                      {errors.user_email && <span className="text-red-400 text-[8px] flex items-center gap-1"><ShieldAlert size={10} /> {errors.user_email}</span>}
                    </label>
                    <input
                      type="email"
                      name="user_email"
                      id="user_email"
                      value={formData.user_email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/[0.01] border border-white/5 focus:border-[#6366f1]/40 rounded-xl px-5 py-4 text-white placeholder:text-dark-textMuted/30 focus:outline-none transition-all duration-300"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2 relative group/input">
                  <label htmlFor="subject" className="text-[10px] font-code font-bold uppercase tracking-wider text-dark-textMuted group-focus-within/input:text-[#6366f1] transition-colors flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Globe size={12} /> Mission Objective</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/[0.01] border border-white/5 focus:border-[#6366f1]/40 rounded-xl px-5 py-4 text-white placeholder:text-dark-textMuted/30 focus:outline-none transition-all duration-300"
                    placeholder="Project Inquiry / Opportunity / Hello"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-2 relative group/input">
                  <label htmlFor="message" className="text-[10px] font-code font-bold uppercase tracking-wider text-dark-textMuted group-focus-within/input:text-[#6366f1] transition-colors flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><MessageSquare size={12} /> Mission Brief</span>
                    {errors.message && <span className="text-red-400 text-[8px] flex items-center gap-1"><ShieldAlert size={10} /> {errors.message}</span>}
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/[0.01] border border-white/5 focus:border-[#6366f1]/40 rounded-xl px-5 py-4 text-white placeholder:text-dark-textMuted/30 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Describe your vision or inquiry in detail..."
                  />
                </div>

                {/* Response SLA Indicator & Submit button */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4">
                  
                  {/* Response SLA Badge */}
                  <div className="flex items-center gap-2 text-[9px] font-code text-[#6366f1] bg-[#6366f1]/5 border border-[#6366f1]/10 px-3.5 py-2 rounded-xl">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#6366f1]"></span>
                    </span>
                    <span>COMMS_SLA: RESPONSE &lt; 4 HOURS</span>
                  </div>

                  {/* Submit Button */}
                  <div className="w-full md:w-auto">
                    <MagneticButton disabled={isSubmitting}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full md:w-auto px-10 py-4.5 rounded-2xl font-display font-black text-xs tracking-wider transition-all duration-500 relative overflow-hidden group cursor-pointer ${
                          isSubmitting
                            ? 'bg-white/5 text-dark-textMuted border border-white/5 cursor-not-allowed'
                            : 'bg-[#6366f1] text-white hover:bg-indigo-600 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                        }`}
                      >
                        <div className="relative z-10 flex items-center justify-center gap-3">
                          {isSubmitting ? (
                            <span>TRANSMITTING...</span>
                          ) : (
                            <>
                              INITIALIZE CONNECTION
                              <Send size={14} className="group-hover:translate-x-1.5 group-hover:-translate-y-0.5 transition-transform" />
                            </>
                          )}
                        </div>
                      </button>
                    </MagneticButton>
                  </div>

                </div>
              </motion.form>

              {/* High-Tech Decorative Label */}
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none select-none">
                <div className="text-[40px] font-black tracking-widest font-code">DATA_SYNC_04</div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
