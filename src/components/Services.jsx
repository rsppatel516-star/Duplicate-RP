import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../data/services';
import { Zap, Terminal, Cpu, X } from 'lucide-react';

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="py-32  relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px]  rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6 text-dark-primary font-code text-sm tracking-widest uppercase"
            >
              <Zap size={18} />
              <span>Core Capabilities</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tighter-tight animated-gradient-text">
              Solving <span className="text-gradient">Complex</span> <br /> Problems with Code
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedService(service)}
              className="bg-white/10 backdrop-blur-md card-dark rounded-2xl group p-10 flex flex-col items-start relative overflow-hidden cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-3xl text-dark-primary mb-8 group-hover:text-dark-secondary group-hover:border-dark-secondary/50 transition-all duration-500 group-hover:scale-110 shadow-2xl relative z-10">
                <service.icon />
                <div className="absolute inset-0 bg-dark-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-dark-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-dark-textMuted leading-relaxed text-sm mb-8">
                {service.description}
              </p>

              <div className="mt-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-dark-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Terminal size={14} />
                <span>View Details</span>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-dark-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blur/80 backdrop-blur-md mt-10"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-black/80 backdrop-blur-2xl border border-white/10 p-6 md:p-10 rounded-[32px] max-w-2xl w-full relative flex flex-col max-h-[90vh] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 z-10 text-dark-textMuted hover:text-white transition-colors bg-dark-primary/10 hover:bg-dark-primary/20 rounded-full p-2"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className="overflow-y-auto no-scrollbar pr-2 pb-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl text-dark-primary mb-8 mt-5 ml-5 shadow-2xl shrink-0 hover:scale-110 transition-all duration-300 cursor-default relative bg-dark-primary/10 hover:bg-dark-primary/20">
                  <selectedService.icon />
                </div>
                <h3 className="text-3xl font-display font-bold mb-2 text-dark-primary/80">
                  {selectedService.title}
                </h3>
                <p className="text-dark-textMuted leading-relaxed text-base mb-6">
                  {selectedService.description}
                </p>

                {selectedService.features && (
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Terminal size={16} className="text-dark-primary" /> What's Included
                    </h4>
                    <ul className="space-y-3">
                      {selectedService.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 group">
                          <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-dark-primary shrink-0 transition-transform duration-300" />
                          <span className="text-dark-textMuted text-sm group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedService.keyBenefits && (
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Zap size={16} className="text-dark-secondary" /> Key Benefits
                    </h4>
                    <ul className="space-y-3">
                      {selectedService.keyBenefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3 group">
                          <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-dark-secondary shrink-0 transition-transform duration-300" />
                          <span className="text-dark-textMuted text-sm group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedService.techStack && (
                  <div className="mb-2">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Cpu size={16} className="text-dark-primary" /> Recommended Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.techStack.map(tech => (
                        <span key={tech} className="text-xs font-code text-white bg-white/5 px-3 py-1.5 rounded-md border border-white/10 hover:border-dark-primary hover:bg-dark-primary/20 hover:-translate-y-1 transition-all cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
