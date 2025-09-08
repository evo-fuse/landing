import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Register service worker for caching and offline support
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Create a performance mark for initial load
performance.mark('app-start');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Measure and log initial render time
window.addEventListener('load', () => {
  performance.mark('app-loaded');
  performance.measure('app-render-time', 'app-start', 'app-loaded');
  const measurements = performance.getEntriesByName('app-render-time');
  if (measurements.length > 0) {
    console.log(`App render time: ${measurements[0].duration.toFixed(2)}ms`);
  }
});
