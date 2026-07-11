import React, { useEffect, useRef } from 'react';

export default function GlobalParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const maxParticles = 90; // Density sweet spot for visual appeal and performance
    const connectionDistance = 110;
    
    // Mouse coordinates tracking
    const mouse = {
      x: null,
      y: null,
      radius: 130
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle properties generator
    const createParticle = (initRandomY = false) => {
      const colors = [
        'rgba(139, 92, 246, ',  // Violet
        'rgba(99, 102, 241, ',   // Indigo
        'rgba(236, 72, 153, ',   // Pink
        'rgba(16, 185, 129, ',   // Emerald
        'rgba(6, 182, 212, '     // Cyan
      ];
      return {
        x: Math.random() * canvas.width,
        y: initRandomY ? Math.random() * canvas.height : -10 - Math.random() * 20,
        vx: (Math.random() - 0.5) * 0.45,
        vy: 0.15 + Math.random() * 0.4, // gentle drifting downwards
        radius: Math.random() * 2.2 + 0.8,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.45 + 0.15
      };
    };

    // Populate particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw web connection lines (constellation network effect)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.12;
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw and update particle positions
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Interactive mouse repellent force field
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const forceX = (dx / dist) * force * 0.8;
            const forceY = (dy / dist) * force * 0.8;
            
            p.x += forceX;
            p.y += forceY;
          }
        }

        // horizontal border boundary bounds check
        if (p.x < 0 || p.x > canvas.width) {
          p.vx = -p.vx;
        }

        // Render individual particle circles
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorBase}${p.opacity})`;
        ctx.shadowBlur = p.radius > 2 ? 6 : 0;
        ctx.shadowColor = 'rgba(124, 58, 237, 0.4)';
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow parameter

        // Respawn particle at top if it floats below screen bottom
        if (p.y > canvas.height + 10) {
          Object.assign(p, createParticle(false));
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
