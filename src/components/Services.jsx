import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../data/services';
import { Zap, Terminal, Cpu, X, Calculator, ShieldCheck, DollarSign, Calendar, Settings } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

const serviceConfig = {
  web: { label: 'Web Architecture', basePrice: 1500, baseWeeks: 4 },
  app: { label: 'Mobile Application', basePrice: 2500, baseWeeks: 6 },
  backend: { label: 'Backend & API Design', basePrice: 1800, baseWeeks: 4 },
  design: { label: 'Design-to-Code System', basePrice: 1200, baseWeeks: 3 }
};

const addonConfig = [
  { id: 'auth', label: 'Auth & RBAC Identity', price: 300, weeks: 1 },
  { id: 'db', label: 'Database & Sync Storage', price: 500, weeks: 1 },
  { id: 'cms', label: 'Headless CMS Dashboard', price: 400, weeks: 1 },
  { id: 'motion', label: 'High-End Framer Animations', price: 350, weeks: 1 }
];

const urgencyConfig = {
  normal: { label: 'Standard Schedule', multiplier: 1.0, weeksOffset: 0 },
  express: { label: 'Express Delivery (-30% Time)', multiplier: 1.25, weeksOffset: -1 },
  rush: { label: 'Rush Delivery (-50% Time)', multiplier: 1.5, weeksOffset: -2 }
};

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  
  // Budget Estimator State
  const [calcService, setCalcService] = useState('web');
  const [calcAddons, setCalcAddons] = useState({
    auth: false,
    db: false,
    cms: false,
    motion: false
  });
  const [calcUrgency, setCalcUrgency] = useState('normal');

  const toggleAddon = (addonId) => {
    setCalcAddons(prev => ({ ...prev, [addonId]: !prev[addonId] }));
  };

  // Calculate final estimate
  const currentService = serviceConfig[calcService];
  let totalPrice = currentService.basePrice;
  let totalWeeks = currentService.baseWeeks;

  addonConfig.forEach(addon => {
    if (calcAddons[addon.id]) {
      totalPrice += addon.price;
      totalWeeks += addon.weeks;
    }
  });

  const urgency = urgencyConfig[calcUrgency];
  totalPrice = Math.round(totalPrice * urgency.multiplier);
  totalWeeks = Math.max(1, totalWeeks + urgency.weeksOffset);

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-[-10%] w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6 text-[#6366f1] font-code text-sm tracking-widest uppercase"
            >
              <Zap size={18} />
              <span>Core Capabilities</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tight leading-[1.2] animated-gradient-text">
              Solving <span className="text-gradient">Complex</span> <br /> Problems with Code
            </h2>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedService(service)}
              className="bg-white/[0.01] border border-white/5 backdrop-blur-md rounded-3xl group p-8 flex flex-col items-start relative overflow-hidden cursor-pointer hover:border-indigo-500/20 hover:bg-white/[0.03] transition-all duration-500 hover:-translate-y-1"
            >
              {/* Service Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl text-indigo-400 mb-6 group-hover:text-[#6366f1] group-hover:border-indigo-500/40 transition-all duration-500 group-hover:scale-110 relative z-10 shadow-lg">
                <service.icon />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-dark-textMuted leading-relaxed text-xs md:text-sm mb-6 flex-grow">
                {service.description}
              </p>

              {/* Recommended Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {service.techStack.slice(0, 3).map(tech => (
                  <span key={tech} className="text-[9px] font-code font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-dark-textMuted px-2.5 py-1 rounded-md">
                    {tech}
                  </span>
                ))}
                {service.techStack.length > 3 && (
                  <span className="text-[9px] font-code font-bold bg-indigo-500/10 border border-indigo-500/20 text-[#6366f1] px-2.5 py-1 rounded-md">
                    +{service.techStack.length - 3} More
                  </span>
                )}
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-auto">
                <Terminal size={12} />
                <span>View Details</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── PROJECT BUDGET ESTIMATOR CALCULATOR ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 md:p-10 shadow-2xl backdrop-blur-xl overflow-hidden"
        >
          {/* Top glow border */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#6366f1] to-transparent" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-10">
            
            {/* Left side: Controls */}
            <div className="flex-grow space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <Calculator className="text-indigo-400" size={24} />
                <div>
                  <h3 className="text-xl font-display font-bold text-white">Project Budget Planner</h3>
                  <p className="text-[10px] text-dark-textMuted uppercase tracking-wider font-code">Configure coordinates for immediate estimate</p>
                </div>
              </div>

              {/* Service Type Selection */}
              <div className="space-y-3">
                <label className="text-[10px] font-code font-bold uppercase tracking-widest text-indigo-400">Select Architecture</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(serviceConfig).map(([key, service]) => (
                    <button
                      key={key}
                      onClick={() => setCalcService(key)}
                      className={`px-4 py-3 rounded-xl border text-xs font-bold text-left transition-all duration-300 ${
                        calcService === key
                          ? 'bg-indigo-500/10 border-indigo-500/50 text-white shadow-inner'
                          : 'bg-white/[0.01] border-white/5 text-dark-textMuted hover:border-white/10 hover:text-white'
                      }`}
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Addons Selection */}
              <div className="space-y-3">
                <label className="text-[10px] font-code font-bold uppercase tracking-widest text-indigo-400">Add-on Enhancements</label>
                <div className="grid grid-cols-2 gap-3">
                  {addonConfig.map(addon => (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`px-4 py-3 rounded-xl border text-xs font-bold text-left transition-all duration-300 flex items-center justify-between ${
                        calcAddons[addon.id]
                          ? 'bg-indigo-500/10 border-indigo-500/50 text-white'
                          : 'bg-white/[0.01] border-white/5 text-dark-textMuted hover:border-white/10 hover:text-white'
                      }`}
                    >
                      <span>{addon.label}</span>
                      <span className="text-[10px] font-code text-indigo-400 font-bold">+${addon.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency selection */}
              <div className="space-y-3">
                <label className="text-[10px] font-code font-bold uppercase tracking-widest text-indigo-400">Project Delivery Speed</label>
                <div className="flex bg-white/5 border border-white/5 rounded-xl p-1 gap-1.5">
                  {Object.entries(urgencyConfig).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setCalcUrgency(key)}
                      className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                        calcUrgency === key
                          ? 'bg-indigo-500/25 border border-indigo-500/30 text-white'
                          : 'text-dark-textMuted hover:text-white'
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right side: Summary Dashboard Card */}
            <div className="w-full lg:w-[320px] shrink-0 bg-[#090913] border border-white/5 p-6 rounded-3xl flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl" />
              
              <div className="space-y-6 relative z-10">
                <span className="text-[10px] font-code text-[#6366f1] tracking-widest uppercase block">Estimate Dashboard</span>
                
                {/* Cost display */}
                <div className="space-y-1">
                  <span className="text-[10px] text-dark-textMuted uppercase font-code">Est. Investment</span>
                  <div className="flex items-baseline text-white">
                    <span className="text-4xl md:text-5xl font-black font-display tracking-tight">${totalPrice}</span>
                    <span className="text-xs text-dark-textMuted ml-1.5 uppercase font-code">USD</span>
                  </div>
                </div>

                {/* Timeline display */}
                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-dark-textMuted uppercase font-code flex items-center gap-1"><Calendar size={10} /> Duration</span>
                    <p className="text-sm font-bold text-white">{totalWeeks} {totalWeeks === 1 ? 'Week' : 'Weeks'}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-dark-textMuted uppercase font-code flex items-center gap-1"><Settings size={10} /> Urgency</span>
                    <p className="text-sm font-bold text-emerald-400 capitalize">{calcUrgency}</p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-2">
                  <span className="text-[9px] text-dark-textMuted uppercase font-code">Configuration Spec</span>
                  <p className="text-xs text-white/70 leading-relaxed font-bricolage">
                    Includes {currentService.label} with {Object.entries(calcAddons).filter(([_, v]) => v).length} advanced addons delivered under {urgency.label}.
                  </p>
                </div>
              </div>

              {/* Proceed Action Button */}
              <div className="pt-6 relative z-10">
                <a
                  href={`#contact?service=${calcService}&budget=${totalPrice}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    // Custom custom event to prefill fields!
                    window.dispatchEvent(new CustomEvent('prefillContact', {
                      detail: {
                        service: calcService,
                        message: `Hi Rudra, I configured a project budget plan: ${currentService.label} with custom addons. Estimated price: $${totalPrice} under ${urgency.label}. Let's build it!`
                      }
                    }));
                  }}
                  className="w-full"
                >
                  <button className="w-full py-3 bg-[#6366f1] hover:bg-indigo-600 rounded-xl text-xs font-bold uppercase tracking-[0.15em] text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                    Lock Estimations
                  </button>
                </a>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Recommended Stack Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#08080f] border border-white/10 p-6 md:p-10 rounded-[32px] max-w-2xl w-full relative flex flex-col max-h-[90vh] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 z-10 text-dark-textMuted hover:text-white transition-colors bg-white/5 border border-white/10 rounded-full p-2.5"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto no-scrollbar pr-2 pb-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl text-indigo-400 mb-8 mt-5 shadow-2xl shrink-0 bg-indigo-500/10 border border-indigo-500/20 relative">
                  <selectedService.icon />
                </div>
                
                <h3 className="text-3xl font-display font-bold mb-2 text-white">
                  {selectedService.title}
                </h3>
                
                <p className="text-dark-textMuted leading-relaxed text-sm md:text-base mb-6">
                  {selectedService.description}
                </p>

                {selectedService.keyBenefits && (
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Zap size={16} className="text-indigo-400" /> Key Benefits
                    </h4>
                    <ul className="space-y-3">
                      {selectedService.keyBenefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3 group">
                          <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                          <span className="text-dark-textMuted text-xs md:text-sm group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedService.techStack && (
                  <div className="mb-2">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Cpu size={16} className="text-indigo-400" /> Recommended Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.techStack.map(tech => (
                        <span key={tech} className="text-xs font-code text-white bg-white/5 px-3 py-1.5 rounded-md border border-white/10 hover:border-indigo-400 hover:bg-indigo-500/10 transition-all cursor-default">
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
