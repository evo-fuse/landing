import React from "react";
import { createRoot } from "react-dom/client";

// Import critical CSS first
import "./index.css";

// Import preload utility
import { preloadCriticalComponents } from "./utils/preloadComponents";

// Use dynamic import with prefetch for App to reduce initial bundle size
const App = React.lazy(() => {
  // Add a hint to the browser to prefetch this resource
  if (document.head && 'prefetch' in document.createElement('link')) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'script';
    link.href = './App.tsx';
    document.head.appendChild(link);
  }
  return import("./App");
});

// Register service worker in production with a delay to not block critical rendering
if (typeof navigator !== "undefined" && 
    "serviceWorker" in navigator && 
    import.meta.env.PROD) {
  // Use requestIdleCallback for service worker registration when browser is idle
  const registerServiceWorker = () => {
    navigator.serviceWorker.register("/service-worker.js")
      .catch(() => {
        console.log("Service worker registration failed");
      });
  };
  
  // Use requestIdleCallback if available, otherwise setTimeout with a longer delay
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(registerServiceWorker, { timeout: 5000 });
  } else {
    setTimeout(registerServiceWorker, 3000); // Longer delay to ensure main content renders first
  }
}

// Loading fallback while App is being loaded
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

// Optimize initial render
const rootElement = document.getElementById("root");

if (rootElement) {
  // Create root outside of render to avoid extra work
  const root = createRoot(rootElement);
  
  // Render with Suspense for lazy-loaded App
  root.render(
    <React.StrictMode>
      <React.Suspense fallback={<LoadingFallback />}>
        <App />
      </React.Suspense>
    </React.StrictMode>
  );
  
  // Preload critical components when browser is idle
  preloadCriticalComponents();
}