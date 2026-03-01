"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

const CONFETTI_COLORS = ["#64ffda", "#0070f3", "#a855f7", "#f59e0b", "#ec4899", "#ffffff"];

function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => i);
  return (
    <>
      {pieces.map((i) => {
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        const left = `${Math.random() * 100}%`;
        const delay = Math.random() * 0.8;
        const duration = 2 + Math.random() * 2;
        const size = 6 + Math.random() * 8;
        const rotate = Math.random() * 360;
        return (
          <motion.div
            key={i}
            initial={{ y: -20, x: 0, opacity: 1, rotate }}
            animate={{ y: "110vh", x: (Math.random() - 0.5) * 200, opacity: 0, rotate: rotate + 360 }}
            transition={{ duration, delay, ease: "easeIn" }}
            style={{
              position: "fixed",
              top: 0,
              left,
              width: size,
              height: size / 2,
              backgroundColor: color,
              borderRadius: "2px",
              zIndex: 100001,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
}

export default function KonamiEgg() {
  const [keys, setKeys]           = useState<string[]>([]);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.join(",") === KONAMI.join(",")) {
          setActivated(true);
          setTimeout(() => setActivated(false), 5000);
        }
        return next;
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {activated && (
        <>
          <Confetti />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivated(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.88)",
              backdropFilter: "blur(20px)",
              cursor: "pointer",
            }}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
              style={{ textAlign: "center", padding: "2rem" }}
            >
              <motion.div
                animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ fontSize: "6rem", marginBottom: "1rem" }}
              >
                🎮
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 700,
                  color: "#64ffda",
                  fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.8rem",
                }}
              >
                Konami Code Unlocked! 🎉
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{
                  color: "#8892b0",
                  fontSize: "1rem",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  marginBottom: "0.5rem",
                }}
              >
                You found the easter egg — you&apos;re officially a developer. 🔥
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  color: "#64ffda88",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  letterSpacing: "3px",
                }}
              >
                ↑ ↑ ↓ ↓ ← → ← → B A
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                style={{ color: "#8892b044", fontSize: "0.72rem", marginTop: "2rem", fontFamily: "var(--font-mono)" }}
              >
                Click anywhere to close
              </motion.p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
