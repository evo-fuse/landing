import { useRef, useEffect, useCallback } from "react";
import { debounce } from "../utils/performance";

export const Spiral: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  // Use refs for values that need to persist between renders but don't trigger re-renders
  const timeRef = useRef(0);
  const velocityRef = useRef(0.1);
  const velocityTargetRef = useRef(0.1);
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Spiral configuration constants
  const MAX_OFFSET = 400;
  const SPACING = 4;
  const POINTS = MAX_OFFSET / SPACING;
  const PEAK = MAX_OFFSET * 0.25;
  const POINTS_PER_LAP = 6;
  const SHADOW_STRENGTH = 6;

  // Resize canvas handler
  const resizeCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;
    
    // Set canvas dimensions
    canvasRef.current.width = displayWidth * dpr;
    canvasRef.current.height = displayHeight * dpr;
    canvasRef.current.style.width = `${displayWidth}px`;
    canvasRef.current.style.height = `${displayHeight}px`;
    
    widthRef.current = displayWidth;
    heightRef.current = displayHeight;
    
    // Reset context with proper scale
    if (contextRef.current) {
      contextRef.current.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      contextRef.current.scale(dpr, dpr);
    }
  }, []);
  
  // Debounced resize handler
  const resize = debounce(resizeCanvas, 100);

  // Animation step function
  const step = useCallback(() => {
    if (!isVisibleRef.current || !contextRef.current) {
      animationFrameRef.current = null;
      return;
    }
    
    timeRef.current += velocityRef.current;
    velocityRef.current += (velocityTargetRef.current - velocityRef.current) * 0.3;

    // Clear canvas
    contextRef.current.clearRect(0, 0, widthRef.current, heightRef.current);
    
    // Render spiral
    renderSpiral();
    
    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(step);
  }, []);

  // Render spiral function
  const renderSpiral = useCallback(() => {
    if (!contextRef.current) return;
    
    const ctx = contextRef.current;
    const cx = widthRef.current / 2;
    const cy = heightRef.current / 2;
    
    // Setup drawing context
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#fff";
    
    // Draw spiral
    ctx.beginPath();
    
    for (let i = POINTS; i > 0; i--) {
      const value = i * SPACING + (timeRef.current % SPACING);
      
      const ax = Math.sin(value / POINTS_PER_LAP) * Math.PI;
      const ay = Math.cos(value / POINTS_PER_LAP) * Math.PI;
      
      const x = ax * value;
      const y = ay * value * 0.35;
      
      const o = 1 - Math.min(value, PEAK) / PEAK;
      
      const adjustedY = y - Math.pow(o, 2) * 200 + 
                       (200 * value) / MAX_OFFSET + 
                       (x / cx) * widthRef.current * 0.1;
      
      ctx.globalAlpha = 1 - value / MAX_OFFSET;
      ctx.shadowBlur = SHADOW_STRENGTH * o;
      
      ctx.lineTo(cx + x, cy + adjustedY);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(cx + x, cy + adjustedY);
    }
    
    // Draw final line
    ctx.lineTo(cx, cy - 200);
    ctx.lineTo(cx, 0);
    ctx.stroke();
  }, []);

  // Mouse interaction handlers
  const onMouseDown = useCallback((event: MouseEvent) => {
    lastXRef.current = event.clientX;
    lastYRef.current = event.clientY;
    
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);
  
  const onMouseMove = useCallback((event: MouseEvent) => {
    const vx = (event.clientX - lastXRef.current) / 100;
    const vy = (event.clientY - lastYRef.current) / 100;
    
    if (event.clientY < heightRef.current / 2) {
      velocityTargetRef.current = -vx + vy;
    } else if (event.clientX > widthRef.current / 2) {
      velocityTargetRef.current = vx - vy;
    } else {
      velocityTargetRef.current = vx + vy;
    }
    
    lastXRef.current = event.clientX;
    lastYRef.current = event.clientY;
  }, []);
  
  const onMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }, []);

  // Touch interaction handlers
  const onTouchStart = useCallback((event: TouchEvent) => {
    event.preventDefault();
    
    lastXRef.current = event.touches[0].clientX;
    lastYRef.current = event.touches[0].clientY;
    
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  }, []);
  
  const onTouchMove = useCallback((event: TouchEvent) => {
    const touch = event.touches[0];
    const vx = (touch.clientX - lastXRef.current) / 100;
    const vy = (touch.clientY - lastYRef.current) / 100;
    
    if (touch.clientY < heightRef.current / 2) {
      velocityTargetRef.current = -vx + vy;
    } else if (touch.clientX > widthRef.current / 2) {
      velocityTargetRef.current = vx - vy;
    } else {
      velocityTargetRef.current = vx + vy;
    }
    
    lastXRef.current = touch.clientX;
    lastYRef.current = touch.clientY;
  }, []);
  
  const onTouchEnd = useCallback(() => {
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  }, []);

  // Initialize canvas and start animation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Set initial dimensions
    resizeCanvas();
    
    // Get context
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      contextRef.current = ctx;
      
      // Add event listeners
      window.addEventListener('resize', resize);
      canvasRef.current.addEventListener('mousedown', onMouseDown);
      canvasRef.current.addEventListener('touchstart', onTouchStart);
      
      // Start animation loop
      animationFrameRef.current = requestAnimationFrame(step);
    }
    
    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousedown', onMouseDown);
        canvasRef.current.removeEventListener('touchstart', onTouchStart);
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0"
      style={{
        zIndex: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        backgroundColor: 'transparent',
      }}
    />
  );
};