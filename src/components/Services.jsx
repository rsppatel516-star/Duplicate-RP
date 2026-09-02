import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../data/services';
import { Zap, Terminal, Cpu, X, CheckCircle2, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  // Close modal on Escape key press & prevent background scrolling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedService(null);
      }
    };

    if (selectedService) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedService]);

  const handleInquire = () => {
    setSelectedService(null);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 sm:py-24 md:py-32 relative overflow-hidden">
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 md:mb-20 gap-6 sm:gap-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-white mb-4 sm:mb-5 backdrop-blur-md"
            >
              <Zap size={15} className="text-purple-400 animate-pulse" />
              <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-purple-300">
                SERVICES & CAPABILITIES
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.15] text-white">
              Solving <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">Complex</span> Problems with Code
            </h2>
            {/*<p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-dark-textMuted leading-relaxed max-w-2xl font-syne">
              Architecting resilient digital applications, high-performance user interfaces, and robust systems built to scale.
            </p>*/}
          </div>
        </div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              onClick={() => setSelectedService(service)}
              className="bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-xl border border-white/10 hover:border-accent-primary rounded-2xl sm:rounded-3xl group p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Radial Glow on Hover */}
              <div className="absolute top-0 right-0 w-32 sm:w-36 h-32 sm:h-36 bg-gradient-to-bl from-accent-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Icon Box */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-2xl sm:text-3xl text-[var(--accent-primary)] mb-6 sm:mb-8 group-hover:border-[var(--accent-primary)]/50 group-hover:bg-[var(--accent-primary)]/10 transition-all duration-500 group-hover:scale-110 shadow-2xl relative z-10">
                  <service.icon />
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--accent-secondary)] mb-2.5 sm:mb-3 transition-colors">
                  {service.title}
                </h3>
                <p className="text-dark-textMuted leading-relaxed text-xs sm:text-sm mb-6 sm:mb-8 font-syne line-clamp-3">
                  {service.description}
                </p>
              </div>

              {/* Card Footer Action */}
              <div className="pt-4 sm:pt-6 border-t border-white/5 flex items-center justify-between text-[11px] sm:text-xs font-bold uppercase tracking-widest text-purple-400 group-hover:text-purple-300 transition-colors">
                <span className="flex items-center gap-2">
                  <Terminal size={14} />
                  View Details
                </span>
                <ArrowRight size={15} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Improved Service Details Responsive Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#0b0c13]/95 backdrop-blur-2xl border border-white/15 p-5 sm:p-7 md:p-10 rounded-2xl sm:rounded-3xl md:rounded-[36px] max-w-3xl lg:max-w-4xl w-full relative flex flex-col max-h-[90vh] md:max-h-[85vh] shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-20 text-dark-textMuted hover:text-white transition-all bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/40 rounded-full p-2 sm:p-2.5 hover:scale-105"
                aria-label="Close modal"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* Modal Body Content (Scrollable with custom scrollbar) */}
              <div className="overflow-y-auto custom-scrollbar pr-2 sm:pr-3 space-y-6 sm:space-y-8 -webkit-overflow-scrolling-touch">

                {/* Header Info */}
                <div className="pr-12 sm:pr-14 md:pr-16">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[var(--accent-primary)]/20 via-[var(--accent-secondary)]/10 to-cyan-500/10 border border-[var(--accent-primary)]/30 flex items-center justify-center text-2xl sm:text-3xl text-[var(--accent-primary)] mb-4 sm:mb-6 shadow-[0_0_25px_rgba(99,102,241,0.2)]">
                    <selectedService.icon />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-extrabold text-[var(--accent-secondary)] mb-2 sm:mb-3 tracking-tight">
                    {selectedService.title}
                  </h3>
                  <p className="text-dark-textMuted leading-relaxed text-xs sm:text-base md:text-lg font-syne">
                    {selectedService.description}
                  </p>
                </div>

                {/* Grid Layout for Desktop & Tablet */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

                  {/* What's Included (Features) */}
                  {selectedService.features && selectedService.features.length > 0 && (
                    <div className="bg-white/[0.02] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                      <h4 className="text-[11px] sm:text-xs md:text-sm font-bold text-white uppercase tracking-[0.15em] mb-3 sm:mb-4 flex items-center gap-2 font-mono">
                        <Terminal size={15} className="text-purple-400" />
                        What's Included
                      </h4>
                      <ul className="space-y-2.5 sm:space-y-3">
                        {selectedService.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 sm:gap-3 group">
                            <CheckCircle2 size={15} className="text-purple-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                            <span className="text-dark-textMuted text-xs sm:text-sm leading-relaxed group-hover:text-white transition-colors">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key Benefits */}
                  {selectedService.keyBenefits && selectedService.keyBenefits.length > 0 && (
                    <div className="bg-white/[0.02] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                      <h4 className="text-[11px] sm:text-xs md:text-sm font-bold text-white uppercase tracking-[0.15em] mb-3 sm:mb-4 flex items-center gap-2 font-mono">
                        <Zap size={15} className="text-indigo-400" />
                        Key Benefits
                      </h4>
                      <ul className="space-y-2.5 sm:space-y-3">
                        {selectedService.keyBenefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 sm:gap-3 group">
                            <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 group-hover:scale-125 transition-transform duration-300" />
                            <span className="text-dark-textMuted text-xs sm:text-sm leading-relaxed group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Recommended Tech Stack */}
                {selectedService.techStack && selectedService.techStack.length > 0 && (
                  <div className="bg-white/[0.02] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    <h4 className="text-[11px] sm:text-xs md:text-sm font-bold text-white uppercase tracking-[0.15em] mb-3 sm:mb-4 flex items-center gap-2 font-mono">
                      <Cpu size={15} className="text-cyan-400" />
                      Recommended Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {selectedService.techStack.map(tech => (
                        <span
                          key={tech}
                          className="text-[11px] sm:text-xs font-mono text-purple-300 bg-purple-500/10 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal CTA Button */}
                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    onClick={handleInquire}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg hover:shadow-purple-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
