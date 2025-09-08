import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Register service worker in production
if (typeof navigator !== "undefined" && 
    "serviceWorker" in navigator && 
    import.meta.env.PROD) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/service-worker.js")
      .catch(function() {
        console.log("Service worker registration failed");
      });
  });
}

// Simple render without any extra code
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);