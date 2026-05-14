import { useRef, useEffect } from 'react';

const ClickSpark = ({
  sparkColor = '#ec4899',
  sparkColor2 = '#6366f1',
  sparkSize = 6,
  sparkRadius = 20,
  sparkCount = 8,
  duration = 400,
  extraScale = 1.0,
  children
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);

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



  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let animationId;

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

        const distance = eased * sparkRadius * spark.speedMultiplier * extraScale;
        
        // Grow then shrink logic for smoother 'pop'
        let currentSize = sparkSize * spark.sizeMultiplier;
        let lineLength;
        if (progress < 0.2) {
          lineLength = currentSize * (progress / 0.2); // Rapid grow
        } else {
          lineLength = currentSize * (1 - (progress - 0.2) / 0.8); // Gradual shrink
        }
        
        const opacity = 1 - Math.pow(progress, 2); // Slightly faster fade

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
        ctx.lineWidth = 1.5 * (1 - progress); // Thinner, tapers off
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
      angle: (2 * Math.PI * i) / sparkCount + (Math.random() - 0.5) * 0.3,
      speedMultiplier: 0.8 + Math.random() * 0.6,
      sizeMultiplier: 0.6 + Math.random() * 0.8,
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
