import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function CustomSelect({ 
  options, 
  placeholder, 
  name, 
  icon: Icon, 
  required,
  accentColor = "dark-secondary" 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Hidden input for form compatibility */}
      <input 
        type="hidden" 
        name={name} 
        value={selected?.value || ""} 
        required={required} 
      />
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        onFocus={() => setIsOpen(false)} // Allow focus without auto-opening dropdown
        className="w-full bg-dark-bg/30 border border-dark-border/50 rounded-xl px-5 py-4 text-dark-textMain flex items-center justify-between cursor-pointer hover:border-dark-border transition-all duration-300 group focus:outline-none"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon size={14} className={isOpen ? `text-${accentColor}` : "text-dark-textMuted"} />}
          <span className={selected ? "text-dark-textMain" : "text-dark-textMuted/40"}>
            {selected ? selected.label : placeholder}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-dark-textMuted/40 group-hover:text-dark-textMuted"
        >
          <ChevronDown size={18} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-[100] left-0 right-0 mt-3 p-2 bg-dark-surface/90 backdrop-blur-2xl border border-dark-border/50 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
              {options.map((option, index) => (
                <motion.div
                  key={option.value}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSelect(option)}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 mb-1 last:mb-0
                    ${selected?.value === option.value 
                      ? `bg-${accentColor}/10 text-${accentColor}` 
                      : 'hover:bg-white/5 text-dark-textMuted hover:text-dark-textMain'
                    }
                  `}
                >
                  <span className="text-sm font-bold uppercase tracking-widest">{option.label}</span>
                  {selected?.value === option.value && (
                    <motion.div 
                      layoutId="activeSelect"
                      className={`w-1.5 h-1.5 rounded-full bg-${accentColor}`} 
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
