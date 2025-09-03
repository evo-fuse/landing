import { useRef, useState, useEffect } from "react";

export const Spiral: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  
  // Use refs for values that need to persist between renders but don't trigger re-renders
  const timeRef = useRef(0);
  const velocityRef = useRef(0.1);
  const velocityTargetRef = useRef(0.1);
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);

  const MAX_OFFSET = 400;
  const SPACING = 4;
  const POINTS = MAX_OFFSET / SPACING;
  const PEAK = MAX_OFFSET * 0.25;
  const POINTS_PER_LAP = 6;
  const SHADOW_STRENGTH = 6;

  useEffect(() => {
    // Initialize canvas context
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        setContext(ctx);
      }
    }
  }, []);
  
  // Set up animation and event listeners after context is set
  useEffect(() => {
    if (context) {
      setup();
      
      // Start animation loop
      const animationId = requestAnimationFrame(step);
      
      // Clean up function
      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('touchstart', onTouchStart);
      };
    }
  }, [context]);

  const setup = (): void => {
    resize();
    
    // Add event listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousedown', onMouseDown);
    document.addEventListener('touchstart', onTouchStart);
  };

  const resize = (): void => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.width = window.innerWidth;
      heightRef.current = canvasRef.current.height = window.innerHeight;
    }
  };

  const step = (): number => {
    timeRef.current += velocityRef.current;
    velocityRef.current += (velocityTargetRef.current - velocityRef.current) * 0.3;

    clear();
    render();

    // The animation frame is now managed in the useEffect
    return requestAnimationFrame(step);
  };

  const clear = (): void => {
    if (context) {
      context.clearRect(0, 0, widthRef.current, heightRef.current);
    }
  };

  const render = (): void => {
    if (!context) return;

    let x: number;
    let y: number;
    const cx = widthRef.current / 2;
    const cy = heightRef.current / 2;

    context.globalCompositeOperation = "lighter";
    context.strokeStyle = "#fff";
    context.shadowColor = "#fff";
    context.lineWidth = 2;
    context.beginPath();

    for (let i = POINTS; i > 0; i--) {
      const value = i * SPACING + (timeRef.current % SPACING);

      const ax = Math.sin(value / POINTS_PER_LAP) * Math.PI;
      const ay = Math.cos(value / POINTS_PER_LAP) * Math.PI;

      x = ax * value;
      y = ay * value * 0.35;

      const o = 1 - Math.min(value, PEAK) / PEAK;

      y -= Math.pow(o, 2) * 200;
      y += (200 * value) / MAX_OFFSET;
      y += (x / cx) * widthRef.current * 0.1;

      context.globalAlpha = 1 - value / MAX_OFFSET;
      context.shadowBlur = SHADOW_STRENGTH * o;

      context.lineTo(cx + x, cy + y);
      context.stroke();

      context.beginPath();
      context.moveTo(cx + x, cy + y);
    }

    context.lineTo(cx, cy - 200);
    context.lineTo(cx, 0);
    context.stroke();
  };

  const onMouseDown = (event: MouseEvent): void => {
    lastXRef.current = event.clientX;
    lastYRef.current = event.clientY;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (event: MouseEvent): void => {
    const vx = (event.clientX - lastXRef.current) / 100;
    const vy = (event.clientY - lastYRef.current) / 100;

    if (event.clientY < heightRef.current / 2) velocityTargetRef.current = -vx + vy;
    else if (event.clientX > widthRef.current / 2) velocityTargetRef.current = vx - vy;
    else velocityTargetRef.current = vx + vy;

    lastXRef.current = event.clientX;
    lastYRef.current = event.clientY;
  };

  const onMouseUp = (): void => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onTouchStart = (event: TouchEvent): void => {
    event.preventDefault();

    lastXRef.current = event.touches[0].clientX;
    lastYRef.current = event.touches[0].clientY;

    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  };

  const onTouchMove = (event: TouchEvent): void => {
    const vx = (event.touches[0].clientX - lastXRef.current) / 100;
    const vy = (event.touches[0].clientY - lastYRef.current) / 100;

    if (event.touches[0].clientY < heightRef.current / 2) velocityTargetRef.current = -vx + vy;
    else if (event.touches[0].clientX > widthRef.current / 2) velocityTargetRef.current = vx - vy;
    else velocityTargetRef.current = vx + vy;

    lastXRef.current = event.touches[0].clientX;
    lastYRef.current = event.touches[0].clientY;
  };

  const onTouchEnd = (): void => {
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  };
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-ful pointer-events-none"></canvas>;
};
