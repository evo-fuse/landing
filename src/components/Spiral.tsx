import { useRef, useState, useEffect, useCallback } from "react";
import { debounce, domBatch, passiveEventOptions } from "../utils/performance";

export const Spiral: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const isMobileRef = useRef<boolean>(false);
  
  // Use refs for values that need to persist between renders but don't trigger re-renders
  const timeRef = useRef(0);
  const velocityRef = useRef(0.1);
  const velocityTargetRef = useRef(0.1);
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Reduce complexity for mobile devices - use refs to avoid re-renders
  const getMaxOffset = () => isMobileRef.current ? 200 : 400;
  const getSpacing = () => isMobileRef.current ? 8 : 4;
  const getPoints = () => getMaxOffset() / getSpacing();
  const getPeak = () => getMaxOffset() * 0.25;
  const POINTS_PER_LAP = 6;
  const getShadowStrength = () => isMobileRef.current ? 2 : 6;

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    
    checkMobile();
    const debouncedCheckMobile = debounce(checkMobile, 250);
    window.addEventListener('resize', debouncedCheckMobile, passiveEventOptions());
    
    return () => {
      window.removeEventListener('resize', debouncedCheckMobile, passiveEventOptions());
    };
  }, []);

  // Initialize canvas context
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d', { alpha: true, willReadFrequently: false });
      if (ctx) {
        contextRef.current = ctx;
        setup();
      }
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resize, passiveEventOptions());
      window.removeEventListener('mousedown', onMouseDown, passiveEventOptions());
      document.removeEventListener('touchstart', onTouchStart);
    };
  }, []);
  
  // Set up intersection observer to only animate when visible
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisibleRef.current = entry.isIntersecting;
        
        if (entry.isIntersecting && !animationFrameRef.current) {
          animationFrameRef.current = requestAnimationFrame(step);
        } else if (!entry.isIntersecting && animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(canvasRef.current);
    
    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
      }
    };
  }, []);
  

  const setup = (): void => {
    resize();
    
    // Add event listeners with passive options where possible
    window.addEventListener('resize', resize, passiveEventOptions());
    window.addEventListener('mousedown', onMouseDown, passiveEventOptions());
    document.addEventListener('touchstart', onTouchStart); // Can't be passive due to preventDefault
    
    // Start animation if visible
    if (isVisibleRef.current && !animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(step);
    }
  };

  // Create a debounced resize handler to prevent forced reflows
  const resizeCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    
    // Use DOM batching to separate read and write operations
    // First read all DOM values
    const readDimensions = domBatch.read(() => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      return { dpr, displayWidth, displayHeight };
    });
    
    // Then perform all DOM writes
    domBatch.write(() => {
      const { dpr, displayWidth, displayHeight } = readDimensions();
      
      if (canvasRef.current) {
        canvasRef.current.width = displayWidth * dpr;
        canvasRef.current.height = displayHeight * dpr;
        
        canvasRef.current.style.width = `${displayWidth}px`;
        canvasRef.current.style.height = `${displayHeight}px`;
        
        widthRef.current = displayWidth;
        heightRef.current = displayHeight;
        
        // Scale the context according to device pixel ratio
        if (contextRef.current) {
          contextRef.current.scale(dpr, dpr);
        }
      }
    });
  }, []);
  
  // Create a debounced version of the resize handler
  const resize = debounce(resizeCanvas, 100);

  const step = (): void => {
    if (!isVisibleRef.current) {
      animationFrameRef.current = null;
      return;
    }
    
    timeRef.current += velocityRef.current;
    velocityRef.current += (velocityTargetRef.current - velocityRef.current) * 0.3;

    clear();
    render();

    animationFrameRef.current = requestAnimationFrame(step);
  };

  const clear = (): void => {
    if (contextRef.current) {
      contextRef.current.clearRect(0, 0, widthRef.current, heightRef.current);
    }
  };

  const render = (): void => {
    if (!contextRef.current || !isVisibleRef.current) return;

    let x: number;
    let y: number;
    const cx = widthRef.current / 2;
    const cy = heightRef.current / 2;
    const ctx = contextRef.current;
    const MAX_OFFSET = getMaxOffset();
    const SPACING = getSpacing();
    const POINTS = getPoints();
    const PEAK = getPeak();
    const SHADOW_STRENGTH = getShadowStrength();

    // Performance optimization - skip shadow effects on mobile
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = isMobileRef.current ? 1 : 2;
    ctx.beginPath();
    
    // Only use shadow effects on desktop for better performance
    if (!isMobileRef.current) {
      ctx.shadowColor = "#fff";
    }

    // Reduce the number of points rendered on mobile
    const pointsToRender = isMobileRef.current ? Math.floor(POINTS / 2) : POINTS;
    
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

      ctx.globalAlpha = 1 - value / MAX_OFFSET;
      
      // Only use shadow blur on desktop
      if (!isMobileRef.current) {
        ctx.shadowBlur = SHADOW_STRENGTH * o;
      }

      ctx.lineTo(cx + x, cy + y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx + x, cy + y);
    }

    // Simplified ending for mobile
    if (isMobileRef.current) {
      ctx.lineTo(cx, cy - 100);
    } else {
      ctx.lineTo(cx, cy - 200);
      ctx.lineTo(cx, 0);
    }
    ctx.stroke();
  };

  // Optimized mouse handlers with DOM batching
  const onMouseDown = useCallback((event: MouseEvent): void => {
    // Use DOM batch for reads
    domBatch.read(() => {
      lastXRef.current = event.clientX;
      lastYRef.current = event.clientY;
    })();

    document.addEventListener("mousemove", onMouseMove, passiveEventOptions());
    document.addEventListener("mouseup", onMouseUp, passiveEventOptions());
  }, []);

  const onMouseMove = useCallback((event: MouseEvent): void => {
    // Use DOM batch for reads
    domBatch.read(() => {
      const vx = (event.clientX - lastXRef.current) / 100;
      const vy = (event.clientY - lastYRef.current) / 100;
      const clientY = event.clientY;
      const clientX = event.clientX;
      
      if (clientY < heightRef.current / 2) velocityTargetRef.current = -vx + vy;
      else if (clientX > widthRef.current / 2) velocityTargetRef.current = vx - vy;
      else velocityTargetRef.current = vx + vy;
  
      lastXRef.current = clientX;
      lastYRef.current = clientY;
    })();
  }, []);

  const onMouseUp = useCallback((): void => {
    document.removeEventListener("mousemove", onMouseMove, passiveEventOptions());
    document.removeEventListener("mouseup", onMouseUp, passiveEventOptions());
  }, [onMouseMove]);

  // Optimized touch handlers with DOM batching
  const onTouchStart = useCallback((event: TouchEvent): void => {
    event.preventDefault();

    // Use DOM batch for reads
    domBatch.read(() => {
      lastXRef.current = event.touches[0].clientX;
      lastYRef.current = event.touches[0].clientY;
    })();

    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  }, []);

  const onTouchMove = useCallback((event: TouchEvent): void => {
    // Use DOM batch for reads
    domBatch.read(() => {
      const touch = event.touches[0];
      const vx = (touch.clientX - lastXRef.current) / 100;
      const vy = (touch.clientY - lastYRef.current) / 100;
      const clientY = touch.clientY;
      const clientX = touch.clientX;

      if (clientY < heightRef.current / 2) velocityTargetRef.current = -vx + vy;
      else if (clientX > widthRef.current / 2) velocityTargetRef.current = vx - vy;
      else velocityTargetRef.current = vx + vy;

      lastXRef.current = clientX;
      lastYRef.current = clientY;
    })();
  }, []);

  const onTouchEnd = useCallback((): void => {
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  }, [onTouchMove]);
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-ful pointer-events-none"></canvas>;
};

