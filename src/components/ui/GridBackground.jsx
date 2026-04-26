import React from 'react';

/**
 * GridBackground component renders a subtle decorative grid pattern.
 * @param {string} className - Additional CSS classes.
 * @param {string} opacity - Hex opacity value (e.g., '05' for 5%).
 * @param {string} size - Size of the grid cells.
 * @param {string} mask - CSS mask-image value for fading edges.
 */
const GridBackground = ({ 
  className = "", 
  opacity = "05", 
  size = "64px",
  mask = "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)"
}) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, #ffffff${opacity} 1px, transparent 1px),
          linear-gradient(to bottom, #ffffff${opacity} 1px, transparent 1px)
        `,
        backgroundSize: `${size} ${size}`,
        maskImage: mask,
        WebkitMaskImage: mask
      }}
    />
  );
};

export default GridBackground;
