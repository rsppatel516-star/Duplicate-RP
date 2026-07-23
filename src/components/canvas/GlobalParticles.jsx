import React, { useEffect, useRef } from 'react';

/**
 * ModernBackground (Global Background)
 * Replaces legacy particle dots/lines with a high-end ambient aurora light mesh,
 * interactive cursor spotlight, dynamic tech grid, and subtle light shimmers.
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

    // Ambient Aurora Light Orbs
    const orbs = [
      {
        x: width * 0.25,
        y: height * 0.3,
        radius: Math.max(width, height) * 0.35,
        vx: 0.25,
        vy: 0.18,
        colorStart: 'rgba(99, 102, 241, 0.16)', // Indigo
        colorEnd: 'rgba(99, 102, 241, 0)',
        phase: 0
      },
      {
        x: width * 0.75,
        y: height * 0.2,
        radius: Math.max(width, height) * 0.4,
        vx: -0.2,
        vy: 0.22,
        colorStart: 'rgba(168, 85, 247, 0.14)', // Purple
        colorEnd: 'rgba(168, 85, 247, 0)',
        phase: Math.PI / 2
      },
      {
        x: width * 0.5,
        y: height * 0.75,
        radius: Math.max(width, height) * 0.38,
        vx: 0.18,
        vy: -0.15,
        colorStart: 'rgba(6, 182, 212, 0.12)', // Cyan
        colorEnd: 'rgba(6, 182, 212, 0)',
        phase: Math.PI
      },
      {
        x: width * 0.85,
        y: height * 0.8,
        radius: Math.max(width, height) * 0.32,
        vx: -0.22,
        vy: -0.2,
        colorStart: 'rgba(236, 72, 153, 0.10)', // Pink / Magenta
        colorEnd: 'rgba(236, 72, 153, 0)',
        phase: (Math.PI * 3) / 2
      }
    ];

    // Subtle Light Shimmer Waves
    const shimmerWaves = [
      { x: width * 0.2, speed: 0.35, width: 220, alpha: 0.035 },
      { x: width * 0.65, speed: -0.25, width: 280, alpha: 0.025 }
    ];

    let time = 0;

    const render = () => {
      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.globalCompositeOperation = 'screen';

      // 1. Draw Moving Ambient Aurora Light Orbs
      orbs.forEach((orb) => {
        if (!prefersReducedMotion) {
          orb.x += orb.vx + Math.sin(time * 0.5 + orb.phase) * 0.3;
          orb.y += orb.vy + Math.cos(time * 0.6 + orb.phase) * 0.3;

          // Bounce off boundary padding
          if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1;
          if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1;
        }

        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        gradient.addColorStop(0, orb.colorStart);
        gradient.addColorStop(0.5, orb.colorStart.replace(/[\d\.]+\)$/, '0.04)'));
        gradient.addColorStop(1, orb.colorEnd);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Interactive Cursor Spotlight Glow
      if (mouse.active || mouse.x !== width / 2) {
        const spotRadius = Math.min(width, height) * 0.28;
        const spotGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          spotRadius
        );
        spotGrad.addColorStop(0, 'rgba(129, 140, 248, 0.18)'); // Soft Violet Spotlight core
        spotGrad.addColorStop(0.4, 'rgba(99, 102, 241, 0.08)');
        spotGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');

        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, spotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw Vertical Light Shimmer Beams
      ctx.globalCompositeOperation = 'source-over';
      shimmerWaves.forEach((wave) => {
        if (!prefersReducedMotion) {
          wave.x += wave.speed;
          if (wave.x > width + wave.width) wave.x = -wave.width;
          if (wave.x < -wave.width) wave.x = width + wave.width;
        }

        const beamGrad = ctx.createLinearGradient(wave.x, 0, wave.x + wave.width, 0);
        beamGrad.addColorStop(0, 'rgba(99, 102, 241, 0)');
        beamGrad.addColorStop(0.5, `rgba(168, 85, 247, ${wave.alpha})`);
        beamGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');

        ctx.fillStyle = beamGrad;
        ctx.fillRect(wave.x, 0, wave.width, height);
      });

      // 4. Draw Subtle Tech Grid Matrix with Distance Illumination
      const gridSize = 56;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';

      for (let x = gridSize / 2; x < width; x += gridSize) {
        for (let y = gridSize / 2; y < height; y += gridSize) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = 250 * 250;

          let dotAlpha = 0.035; // baseline subtlety

          // Highlight grid dots near cursor spotlight
          if (distSq < maxDistSq) {
            const factor = 1 - Math.sqrt(distSq) / 250;
            dotAlpha += factor * 0.14;
          }

          ctx.fillStyle = `rgba(148, 163, 184, ${dotAlpha})`;
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

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
      style={{ opacity: 0.85 }}
    />
  );
}

