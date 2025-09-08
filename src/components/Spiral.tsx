import { useRef, useState, useEffect } from "react";

export const Spiral: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Use refs for values that need to persist between renders but don't trigger re-renders
  const timeRef = useRef(0);
  const velocityRef = useRef(0.1);
  const velocityTargetRef = useRef(0.1);
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Reduce complexity for mobile devices
  const MAX_OFFSET = isMobile ? 200 : 400;
  const SPACING = isMobile ? 8 : 4;
  const POINTS = MAX_OFFSET / SPACING;
  const PEAK = MAX_OFFSET * 0.25;
  const POINTS_PER_LAP = 6;
  const SHADOW_STRENGTH = isMobile ? 2 : 6;

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Initialize canvas context
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d', { alpha: true });
      if (ctx) {
        setContext(ctx);
      }
    }
  }, []);
  
  // Set up intersection observer to only animate when visible
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    }, { threshold: 0.1 });
    
    observer.observe(canvasRef.current);
    
    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
      }
    };
  }, []);
  
  // Set up animation and event listeners after context is set
  useEffect(() => {
    if (context) {
      setup();
      
      // Only animate when component is visible
      if (isVisible) {
        animationFrameRef.current = requestAnimationFrame(step);
      }
      
      // Clean up function
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('touchstart', onTouchStart);
      };
    }
  }, [context, isVisible]);

  const setup = (): void => {
    resize();
    
    // Add event listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousedown', onMouseDown);
    document.addEventListener('touchstart', onTouchStart);
  };

  // Throttled resize function for better performance
  const resizeTimeoutRef = useRef<number | null>(null);
  
  const resize = (): void => {
    // Clear previous timeout to implement throttling
    if (resizeTimeoutRef.current) {
      window.clearTimeout(resizeTimeoutRef.current);
    }
    
    // Throttle resize to once per 100ms
    resizeTimeoutRef.current = window.setTimeout(() => {
      if (canvasRef.current) {
        // Use device pixel ratio for better rendering on high DPI screens
        const dpr = window.devicePixelRatio || 1;
        const displayWidth = window.innerWidth;
        const displayHeight = window.innerHeight;
        
        canvasRef.current.width = displayWidth * dpr;
        canvasRef.current.height = displayHeight * dpr;
        
        canvasRef.current.style.width = `${displayWidth}px`;
        canvasRef.current.style.height = `${displayHeight}px`;
        
        widthRef.current = displayWidth;
        heightRef.current = displayHeight;
        
        // Scale the context according to device pixel ratio
        if (context) {
          context.scale(dpr, dpr);
        }
      }
    }, 100);
  };

  const step = (): void => {
    if (!isVisible) return;
    
    timeRef.current += velocityRef.current;
    velocityRef.current += (velocityTargetRef.current - velocityRef.current) * 0.3;

    clear();
    render();

    // The animation frame is now managed in the useEffect
    animationFrameRef.current = requestAnimationFrame(step);
  };

  const clear = (): void => {
    if (context) {
      context.clearRect(0, 0, widthRef.current, heightRef.current);
    }
  };

  const render = (): void => {
    if (!context || !isVisible) return;

    let x: number;
    let y: number;
    const cx = widthRef.current / 2;
    const cy = heightRef.current / 2;

    // Performance optimization - skip shadow effects on mobile
    context.globalCompositeOperation = "lighter";
    context.strokeStyle = "#fff";
    context.lineWidth = isMobile ? 1 : 2;
    context.beginPath();
    
    // Only use shadow effects on desktop for better performance
    if (!isMobile) {
      context.shadowColor = "#fff";
    }

    // Reduce the number of points rendered on mobile
    const pointsToRender = isMobile ? Math.floor(POINTS / 2) : POINTS;
    
    for (let i = pointsToRender; i > 0; i--) {
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
      
      // Only use shadow blur on desktop
      if (!isMobile) {
        context.shadowBlur = SHADOW_STRENGTH * o;
      }

      context.lineTo(cx + x, cy + y);
      context.stroke();

      context.beginPath();
      context.moveTo(cx + x, cy + y);
    }

    // Simplified ending for mobile
    if (isMobile) {
      context.lineTo(cx, cy - 100);
    } else {
      context.lineTo(cx, cy - 200);
      context.lineTo(cx, 0);
    }
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
