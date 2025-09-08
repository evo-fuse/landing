import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Register service worker for caching and offline support
if (
  typeof navigator !== "undefined" &&
  "serviceWorker" in navigator &&
  import.meta.env.PROD
) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function(registration) {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch(function() {
        console.log("Service Worker registration failed");
      });
  });
}

// Create a performance mark for initial load
if (typeof performance !== "undefined") {
  performance.mark("app-start");
}

// Render the app
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// Measure and log initial render time
if (typeof window !== "undefined") {
  window.addEventListener("load", function() {
    if (typeof performance !== "undefined") {
      performance.mark("app-loaded");
      try {
        performance.measure("app-render-time", "app-start", "app-loaded");
        const measurements = performance.getEntriesByName("app-render-time");
        if (measurements.length > 0) {
          console.log(
            "App render time: " + measurements[0].duration.toFixed(2) + "ms"
          );
        }
      } catch (error) {
        // Silently handle any performance API errors
      }
    }
  });
}