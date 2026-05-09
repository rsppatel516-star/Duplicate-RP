import { useRef, useEffect, useCallback } from 'react';

const ClickSpark = ({
  sparkColor = '#ec4899',
  sparkColor2 = '#6366f1',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);

    resizeCanvas();

    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  const easeFunc = useCallback(
    t => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let animationId;
    let lastTime = 0;

    const draw = timestamp => {
      if (sparksRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationId = null;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter(spark => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        // Premium Ease Out Expo style for distance
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        const distance = eased * sparkRadius * extraScale;
        
        // Grow then shrink logic for smoother 'pop'
        let lineLength;
        if (progress < 0.25) {
          lineLength = sparkSize * (progress / 0.25); // Rapid grow
        } else {
          lineLength = sparkSize * (1 - (progress - 0.25) / 0.75); // Gradual shrink
        }
        
        const opacity = 1 - Math.pow(progress, 3); // More gradual fade out at first, then rapid

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.save();
        ctx.globalAlpha = opacity;
        
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, sparkColor);
        gradient.addColorStop(1, sparkColor2);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 * (1 - progress * 0.5); // Slightly thin out
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    const startAnimation = () => {
      if (!animationId) {
        animationId = requestAnimationFrame(draw);
      }
    };

    // Expose startAnimation to handleClick or just let it run if sparks exist
    // But we need to handle the initial click.
    canvas.startAnimation = startAnimation;

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkColor2, sparkSize, sparkRadius, duration, extraScale]);

  const handleClick = e => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount + (Math.random() * 0.2), // Add tiny random variance
      startTime: now
    }));

    sparksRef.current.push(...newSparks);
    if (canvas.startAnimation) canvas.startAnimation();
  };

  return (
    <div
      className="relative w-full h-full"
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          userSelect: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 50
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
