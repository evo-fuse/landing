/**
 * Utility to preload critical components
 * This helps reduce Total Blocking Time by preloading components that will be needed soon
 */

/**
 * Preload a component by path
 * @param path Path to the component
 */
export const preloadComponent = (path: string): void => {
  if (typeof window === 'undefined') return;
  
  // Create a prefetch link
  if (document.head && 'prefetch' in document.createElement('link')) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'script';
    link.href = path;
    document.head.appendChild(link);
  }
};

/**
 * Preload critical components when browser is idle
 */
export const preloadCriticalComponents = (): void => {
  if (typeof window === 'undefined') return;
  
  const preloadPaths = [
    './pages/Home.tsx',
    './pages/Game2048.tsx',
    './components/Header.tsx',
    './components/Layout.tsx'
  ];
  
  // Use requestIdleCallback to preload when browser is idle
  const preload = () => {
    preloadPaths.forEach(path => preloadComponent(path));
  };
  
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preload, { timeout: 2000 });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(preload, 1000);
  }
};
