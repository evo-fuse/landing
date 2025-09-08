import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Register service worker in production with a delay to not block critical rendering
if (typeof navigator !== "undefined" && 
    "serviceWorker" in navigator && 
    import.meta.env.PROD) {
  // Defer service worker registration to after page load
  setTimeout(() => {
    navigator.serviceWorker.register("/service-worker.js")
      .catch(function() {
        console.log("Service worker registration failed");
      });
  }, 1000); // 1 second delay to prioritize main content rendering
}

// Simple render without any extra code
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);