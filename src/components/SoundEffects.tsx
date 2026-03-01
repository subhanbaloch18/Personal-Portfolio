"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

function playTone(freq: number, duration: number, vol = 0.04, type: OscillatorType = "sine") {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = type;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
    osc.onended = () => ctx.close();
  } catch {
    // Audio not supported — silent fail
  }
}

// Sound is OFF by default (opt-in). User must click the toggle to enable.
export default function SoundEffects() {
  const [enabled, setEnabled] = useState(false);

  // On mount, read saved preference (default: off)
  useEffect(() => {
    const saved = localStorage.getItem("sound");
    setEnabled(saved === "on");
  }, []);

  // Attach / detach listeners whenever enabled changes
  useEffect(() => {
    if (!enabled) return;

    const onClick  = () => playTone(800, 0.09, 0.025, "sine");
    const onHover  = () => playTone(600, 0.04, 0.01,  "sine");

    const elements = document.querySelectorAll("button, a");
    elements.forEach((el) => {
      el.addEventListener("click",      onClick);
      el.addEventListener("mouseenter", onHover);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("click",      onClick);
        el.removeEventListener("mouseenter", onHover);
      });
    };
  }, [enabled]);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem("sound", next ? "on" : "off");
    // Play a confirmation tone when enabling
    if (next) playTone(880, 0.12, 0.03, "sine");
  };

  return (
    <AnimatePresence>
      <motion.button
        key="sound-toggle"
        onClick={toggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={enabled ? "Mute sound effects" : "Enable sound effects"}
        aria-label={enabled ? "Mute sound effects" : "Enable sound effects"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: "fixed",
          bottom: "2rem",
          left: "2rem",
          zIndex: 190,
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          background: "rgba(10,25,47,0.88)",
          border: `1px solid ${enabled ? "rgba(100,255,218,0.4)" : "rgba(100,255,218,0.15)"}`,
          color: enabled ? "#64ffda" : "#4a5568",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(100,255,218,0.5)";
          (e.currentTarget as HTMLButtonElement).style.color = "#64ffda";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = enabled
            ? "rgba(100,255,218,0.4)"
            : "rgba(100,255,218,0.15)";
          (e.currentTarget as HTMLButtonElement).style.color = enabled ? "#64ffda" : "#4a5568";
        }}
      >
        {enabled ? <FiVolume2 size={15} /> : <FiVolumeX size={15} />}
      </motion.button>
    </AnimatePresence>
  );
}
