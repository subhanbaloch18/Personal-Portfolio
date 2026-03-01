"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload } from "react-icons/fi";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallButton() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setPrompt(null);
      setInstalled(true);
    });
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") {
      setPrompt(null);
      setInstalled(true);
    }
  };

  return (
    <AnimatePresence>
      {prompt && !installed && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={install}
          title="Install as app"
          aria-label="Install portfolio as PWA app"
          style={{
            position: "fixed",
            bottom: "5rem",
            right: "2rem",
            zIndex: 190,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(10,25,47,0.92)",
            border: "1px solid rgba(100,255,218,0.3)",
            color: "#64ffda",
            padding: "10px 18px",
            borderRadius: "10px",
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: "0.75rem",
            cursor: "pointer",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 4px 24px rgba(100,255,218,0.1)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "#64ffda";
            btn.style.color = "#0a192f";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "rgba(10,25,47,0.92)";
            btn.style.color = "#64ffda";
          }}
        >
          <FiDownload size={14} /> Install App
        </motion.button>
      )}
    </AnimatePresence>
  );
}
