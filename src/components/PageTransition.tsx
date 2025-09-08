import { motion, useReducedMotion } from 'framer-motion';
import { memo } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  // Respect user's reduced motion preference
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
      transition={{ 
        duration: prefersReducedMotion ? 0.2 : 0.5,
        ease: [0.4, 0, 0.2, 1]
      }}
      style={{ 
        position: 'relative', 
        width: '100%',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </motion.div>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(PageTransition);