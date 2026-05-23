import React, { useEffect, useRef } from 'react';

export default function DotField({
  dotColor = 'rgba(255, 255, 255, 0.15)',
  glowColor = 'rgba(0, 212, 255, 0.18)',
  dotSize = 1.2,
  spacing = 26,
  speed = 0.8,
  interactionRadius = 120,
  bulgeStrength = 18,
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Resize handler
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener('resize', resize);
    resize();

    // Mouse handlers
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    // Animation Loop
    const draw = () => {
      time += speed * 0.02;
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, w, h);

      // Render radial glow under mouse
      const mouse = mouseRef.current;
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, interactionRadius * 1.5
        );
        gradient.addColorStop(0, glowColor);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, interactionRadius * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Dot Grid
      const cols = Math.floor(w / spacing) + 2;
      const rows = Math.floor(h / spacing) + 2;
      const startX = (w - (cols - 1) * spacing) / 2;
      const startY = (h - (rows - 1) * spacing) / 2;

      ctx.fillStyle = dotColor;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = startX + c * spacing;
          const originY = startY + r * spacing;

          // Continuous wave displacement
          const waveX = Math.sin(originY * 0.015 + time) * 3;
          const waveY = Math.cos(originX * 0.015 + time) * 3;

          let cx = originX + waveX;
          let cy = originY + waveY;

          // Mouse bulge interaction
          if (mouse.active) {
            const dx = cx - mouse.x;
            const dy = cy - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < interactionRadius) {
              const force = (interactionRadius - dist) / interactionRadius;
              const angle = Math.atan2(dy, dx);
              const displacement = force * bulgeStrength;
              cx += Math.cos(angle) * displacement;
              cy += Math.sin(angle) * displacement;
            }
          }

          // Render dot
          ctx.beginPath();
          ctx.arc(cx, cy, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotColor, glowColor, dotSize, spacing, speed, interactionRadius, bulgeStrength]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
