import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Register service worker for PWA offline support
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(reg => {
      console.log("Service Worker registered successfully");
      
      // Check for updates periodically
      setInterval(() => {
        reg.update();
      }, 60000); // Check every minute
      
      // Listen for updates
      reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;
        newWorker?.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            // New service worker is ready
            console.log("New Service Worker update available");
            // Optionally show a notification to the user
          }
        });
      });
    }).catch(err => {
      console.log("Service Worker registration failed:", err);
    });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
