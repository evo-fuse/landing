import { motion, useReducedMotion, type Transition } from 'framer-motion';
import { memo, useMemo } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  // Respect user's reduced motion preference
  const prefersReducedMotion = useReducedMotion();
  
  // Memoize animation properties to prevent recalculations
  const initial = useMemo(() => ({ opacity: 0, y: prefersReducedMotion ? 0 : 20 }), [prefersReducedMotion]);
  const animate = useMemo(() => ({ opacity: 1, y: 0 }), []);
  const exit = useMemo(() => ({ opacity: 0, y: prefersReducedMotion ? 0 : -20 }), [prefersReducedMotion]);
  const transition = useMemo<Transition>(() => ({ 
    duration: prefersReducedMotion ? 0.2 : 0.5,
    ease: [0.4, 0, 0.2, 1] 
  }), [prefersReducedMotion]);
  
  // Memoize style to prevent object recreation
  const styleProps = useMemo(() => ({
    position: 'relative' as const, 
    width: '100%',
    willChange: 'opacity, transform'
  }), []);
  
  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      style={styleProps}
    >
      {children}
    </motion.div>
  );
};

// Memoize component to prevent unnecessary re-renders with custom comparison
export default memo(PageTransition, (prevProps, nextProps) => {
  // Only re-render if children have changed
  return prevProps.children === nextProps.children;
});