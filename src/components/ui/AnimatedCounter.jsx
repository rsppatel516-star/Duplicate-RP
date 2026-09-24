import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, useMotionValueEvent } from 'framer-motion';

export default function AnimatedCounter({ value, duration = 1.8, delay = 0, suffix = "" }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "0px" });

  const isInt = Number.isInteger(value);
  const count = useMotionValue(0);

  // Transform motion value for display without forcing decimals on integers
  const rounded = useTransform(count, (latest) => {
    if (isInt) {
      return Math.round(latest).toString();
    }
    return latest.toFixed(1);
  });

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
          if (textRef.current) {
            textRef.current.innerText = isInt ? value.toString() : value.toFixed(1);
          }
        }
      });
      return () => animation.stop();
    } else {
      // Fallback: If inView doesn't trigger immediately, ensure actual value is displayed
      if (textRef.current) {
        textRef.current.innerText = value.toString();
      }
    }
  }, [inView, count, value, duration, delay, isInt]);

  return (
    <span ref={containerRef} className="tabular-nums">
      <span ref={textRef}>{value}</span>
      {suffix}
    </span>
  );
}

