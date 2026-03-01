"use client";

import { motion } from "framer-motion";
import { FiStar, FiCode, FiZap } from "react-icons/fi";

const proofItems = [
  { icon: FiZap,   value: "3",    label: "Hackathons Won" },
  { icon: FiCode,  value: "20+",  label: "Public Repos" },
  { icon: FiStar,  value: "100%", label: "Deployment Success" },
];

const techLogos = [
  { name: "TypeScript", color: "#3178c6" },
  { name: "Next.js",    color: "#ffffff" },
  { name: "Python",     color: "#3776ab" },
  { name: "Tailwind",   color: "#38bdf8" },
  { name: "Three.js",   color: "#64ffda" },
];

export default function SocialProofBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      style={{
        position: "absolute",
        bottom: "6rem",
        left: "6vw",
        right: "6vw",
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1.5rem",
      }}
    >
      {/* Proof numbers */}
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {proofItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 + i * 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <item.icon style={{ color: "#64ffda", fontSize: "0.9rem" }} />
            <span style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: "0.82rem",
              color: "#ccd6f6",
              fontWeight: 700,
            }}>
              {item.value}
            </span>
            <span style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: "0.72rem",
              color: "#8892b0",
            }}>
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Tech stack pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}
      >
        <span style={{
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: "0.68rem",
          color: "#4a5568",
          marginRight: "0.3rem",
        }}>
          stack:
        </span>
        {techLogos.map((t) => (
          <motion.span
            key={t.name}
            whileHover={{ scale: 1.08, opacity: 1 }}
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: "0.7rem",
              color: t.color,
              background: `${t.color}0f`,
              border: `1px solid ${t.color}28`,
              borderRadius: "4px",
              padding: "2px 8px",
              opacity: 0.8,
              cursor: "default",
              transition: "all 0.2s",
            }}
          >
            {t.name}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
