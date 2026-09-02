import React, { useEffect, useRef } from 'react';

/**
 * Modern Global Interactive Background
 * Features:
 * - Ambient fluid aurora orbs with smooth motion
 * - Interactive dual-layer cursor spotlight & magnetic particle dust
 * - Tech grid matrix with distance-based illumination and glowing intersection crosses
 * - Animated digital energy pulses traveling on grid axes
 * - Subtle ambient starfield dust with gentle twinkling
 */
export default function GlobalParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive canvas resizing
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };
    window.addEventListener('resize', handleResize);

    // Mouse position tracking with smooth lerp
    const mouse = {
      targetX: width / 2,
      targetY: height / 2,
      x: width / 2,
      y: height / 2,
      active: false
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // 1. Ambient Floating Aurora Orbs
    const orbs = [
      {
        x: width * 0.2,
        y: height * 0.25,
        radius: Math.max(width, height) * 0.38,
        vx: 0.3,
        vy: 0.2,
        colorStart: 'rgba(99, 102, 241, 0.18)', // Indigo
        colorMid: 'rgba(124, 58, 237, 0.08)',
        phase: 0
      },
      {
        x: width * 0.8,
        y: height * 0.2,
        radius: Math.max(width, height) * 0.42,
        vx: -0.25,
        vy: 0.25,
        colorStart: 'rgba(168, 85, 247, 0.15)', // Purple
        colorMid: 'rgba(192, 132, 252, 0.06)',
        phase: Math.PI / 2
      },
      {
        x: width * 0.45,
        y: height * 0.75,
        radius: Math.max(width, height) * 0.4,
        vx: 0.2,
        vy: -0.2,
        colorStart: 'rgba(6, 182, 212, 0.13)', // Cyan
        colorMid: 'rgba(56, 189, 248, 0.05)',
        phase: Math.PI
      },
      {
        x: width * 0.85,
        y: height * 0.82,
        radius: Math.max(width, height) * 0.35,
        vx: -0.22,
        vy: -0.18,
        colorStart: 'rgba(236, 72, 153, 0.12)', // Magenta
        colorMid: 'rgba(244, 114, 182, 0.04)',
        phase: (Math.PI * 3) / 2
      }
    ];

    // 2. Star dust particles
    let stars = [];
    const initStars = () => {
      stars = [];
      const count = Math.min(Math.floor((width * height) / 16000), 75);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.2,
          baseAlpha: Math.random() * 0.4 + 0.15,
          vy: -(Math.random() * 0.15 + 0.05)
        });
      }
    };
    initStars();

    // 3. Grid Data Energy Pulses
    const gridSpacing = 60;
    const dataPulses = [
      { axis: 'x', pos: 0, coord: gridSpacing * 3, speed: 3.5, length: 140, color: 'rgba(168, 85, 247, 0.7)' },
      { axis: 'y', pos: 0, coord: gridSpacing * 6, speed: 2.8, length: 120, color: 'rgba(99, 102, 241, 0.7)' },
      { axis: 'x', pos: width, coord: gridSpacing * 9, speed: -3.2, length: 160, color: 'rgba(6, 182, 212, 0.7)' },
      { axis: 'y', pos: height, coord: gridSpacing * 12, speed: -2.5, length: 130, color: 'rgba(236, 72, 153, 0.6)' }
    ];

    let time = 0;

    const render = () => {
      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // ── Step 1: Draw Moving Aurora Gradient Orbs ──
      ctx.globalCompositeOperation = 'screen';

      orbs.forEach((orb) => {
        if (!prefersReducedMotion) {
          orb.x += orb.vx + Math.sin(time * 0.4 + orb.phase) * 0.4;
          orb.y += orb.vy + Math.cos(time * 0.5 + orb.phase) * 0.4;

          if (orb.x < -150 || orb.x > width + 150) orb.vx *= -1;
          if (orb.y < -150 || orb.y > height + 150) orb.vy *= -1;
        }

        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.radius
        );
        gradient.addColorStop(0, orb.colorStart);
        gradient.addColorStop(0.5, orb.colorMid);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── Step 2: Draw Cursor Spotlight Aura ──
      if (mouse.active || mouse.x !== width / 2) {
        const spotRadius = Math.min(width, height) * 0.32;
        const spotGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, spotRadius
        );
        spotGrad.addColorStop(0, 'rgba(129, 140, 248, 0.22)');
        spotGrad.addColorStop(0.35, 'rgba(99, 102, 241, 0.09)');
        spotGrad.addColorStop(0.7, 'rgba(168, 85, 247, 0.03)');
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, spotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Step 3: Draw Tech Grid & Glowing Intersections ──
      ctx.globalCompositeOperation = 'source-over';
      const maxSpotDist = 280;
      const maxSpotDistSq = maxSpotDist * maxSpotDist;

      // Draw faint grid lines
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += gridSpacing) {
        const dx = Math.abs(x - mouse.x);
        let alpha = 0.025;
        if (dx < maxSpotDist) {
          alpha += (1 - dx / maxSpotDist) * 0.06;
        }
        ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSpacing) {
        const dy = Math.abs(y - mouse.y);
        let alpha = 0.025;
        if (dy < maxSpotDist) {
          alpha += (1 - dy / maxSpotDist) * 0.06;
        }
        ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw glowing intersection points & micro-crosses
      const crossSize = 3;
      for (let x = gridSpacing; x < width; x += gridSpacing) {
        for (let y = gridSpacing; y < height; y += gridSpacing) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxSpotDistSq) {
            const factor = 1 - Math.sqrt(distSq) / maxSpotDist;
            const alpha = 0.05 + factor * 0.35;
            const size = 1 + factor * 1.5;

            ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();

            // Draw micro cross for close intersections
            if (factor > 0.4) {
              ctx.strokeStyle = `rgba(167, 139, 250, ${alpha * 0.8})`;
              ctx.beginPath();
              ctx.moveTo(x - crossSize, y);
              ctx.lineTo(x + crossSize, y);
              ctx.moveTo(x, y - crossSize);
              ctx.lineTo(x, y + crossSize);
              ctx.stroke();
            }
          } else if ((x + y) % (gridSpacing * 3) === 0) {
            // Subtle ambient grid dots
            ctx.fillStyle = 'rgba(148, 163, 184, 0.04)';
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // ── Step 4: Animated Grid Data Energy Pulses ──
      ctx.globalCompositeOperation = 'screen';
      dataPulses.forEach((pulse) => {
        if (!prefersReducedMotion) {
          pulse.pos += pulse.speed;
          const limit = pulse.axis === 'x' ? width : height;
          if (pulse.speed > 0 && pulse.pos > limit + pulse.length) pulse.pos = -pulse.length;
          if (pulse.speed < 0 && pulse.pos < -pulse.length) pulse.pos = limit + pulse.length;
        }

        let pGrad;
        if (pulse.axis === 'x') {
          pGrad = ctx.createLinearGradient(pulse.pos, 0, pulse.pos + pulse.length, 0);
          pGrad.addColorStop(0, 'rgba(0,0,0,0)');
          pGrad.addColorStop(0.5, pulse.color);
          pGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = pGrad;
          ctx.fillRect(pulse.pos, pulse.coord - 1, pulse.length, 2);
        } else {
          pGrad = ctx.createLinearGradient(0, pulse.pos, 0, pulse.pos + pulse.length);
          pGrad.addColorStop(0, 'rgba(0,0,0,0)');
          pGrad.addColorStop(0.5, pulse.color);
          pGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = pGrad;
          ctx.fillRect(pulse.coord - 1, pulse.pos, 2, pulse.length);
        }
      });

      // ── Step 5: Twinkling Ambient Star Field Dust ──
      ctx.globalCompositeOperation = 'source-over';
      stars.forEach((star) => {
        if (!prefersReducedMotion) {
          star.y += star.vy;
          if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
          }
          star.alpha = star.baseAlpha + Math.sin(time * 3 + star.x) * 0.15;
        }

        ctx.fillStyle = `rgba(224, 231, 255, ${Math.max(0, star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
}


