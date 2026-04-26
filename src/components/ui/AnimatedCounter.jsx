import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, useMotionValueEvent } from 'framer-motion';

export default function AnimatedCounter({ value, duration = 2, delay = 0, suffix = "" }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const count = useMotionValue(0);
  
  // Create a transformed value for display - starts with decimal
  const rounded = useTransform(count, (latest) => {
    // If we've reached the target and the target is an integer, show it as an integer
    if (latest >= value && Number.isInteger(value)) {
      return value.toString();
    }
    return latest.toFixed(1);
  });

  // Use useMotionValueEvent to update the DOM directly to prevent "Objects are not valid as a React child" 
  useMotionValueEvent(rounded, "change", (latest) => {
    if (textRef.current) {
      textRef.current.innerText = latest;
    }
  });

  useEffect(() => {
    if (inView) {
      const animation = animate(count, value, {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
        onComplete: () => {
          // Final safety check to ensure we end on the exact integer if target is integer
          if (textRef.current && Number.isInteger(value)) {
            textRef.current.innerText = value.toString();
          }
        }
      });
      return animation.stop;
    }
  }, [inView, count, value, duration, delay]);

  return (
    <span ref={containerRef} className="tabular-nums">
      <span ref={textRef}>0.0</span>
      {suffix}
    </span>
  );
}
