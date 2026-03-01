"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiFolder } from "react-icons/fi";

const projects = [
  { title: "Physical AI & Humanoid Robotics", description: "Hackathon-1 project exploring Physical AI concepts and humanoid robotics simulation. Interactive Streamlit interface deployed on Vercel.", tech: ["Python", "Streamlit", "Physical AI"], github: "https://github.com/subhanbaloch18/Physical-AI-and-Humanoid-Robotics", live: "https://physical-ai-and-humanoid-robotics-gamma.vercel.app", emoji: "🤖", accent: "#64ffda" },
  { title: "Password Strength Checker", description: "Real-time password security analyzer with visual strength indicators, entropy calculation, and crack-time estimates. Built with Streamlit.", tech: ["Python", "Streamlit", "Security"], github: "https://github.com/subhanbaloch18/Password-Strength-Checker", live: null, emoji: "🔐", accent: "#a855f7" },
  { title: "Unit Converter", description: "Comprehensive unit converter supporting 8 categories including length, weight, temperature, speed, and more with instant conversions.", tech: ["Python", "Streamlit"], github: "https://github.com/subhanbaloch18/Unit-Converter-", live: null, emoji: "📐", accent: "#0070f3" },
  { title: "E-Commerce Migration", description: "Day-3 hackathon challenge — full e-commerce platform migration with TypeScript type safety, optimized bundle, and Vercel deployment.", tech: ["TypeScript", "Next.js", "E-Commerce"], github: "https://github.com/subhanbaloch18/Hackathon-03", live: "https://hackathon-03-black.vercel.app", emoji: "🛒", accent: "#f59e0b" },
  { title: "My First Demo Website", description: "First full Next.js project showcasing TypeScript fundamentals, responsive design, and modern component architecture.", tech: ["TypeScript", "Next.js", "CSS"], github: "https://github.com/subhanbaloch18/First-Project", live: "https://first-project-ten-sooty.vercel.app", emoji: "🌐", accent: "#64ffda" },
  { title: "Figma-to-Code", description: "Pixel-perfect conversion of a Figma design to production-ready code using Next.js and Tailwind CSS.", tech: ["TypeScript", "Next.js", "Figma"], github: "https://github.com/subhanbaloch18/Figma-Project", live: "https://figma-project-livid.vercel.app", emoji: "🎨", accent: "#ec4899" },
  { title: "Full Stack Todo App", description: "Multi-phase full-stack todo application with CRUD, type-safe APIs, and optimistic UI updates built across hackathon phases.", tech: ["TypeScript", "Next.js", "Full Stack"], github: "https://github.com/subhanbaloch18/Full_Stack-todo-app", live: null, emoji: "✅", accent: "#a855f7" },
  { title: "BMI Calculator CLI", description: "Interactive command-line BMI calculator with Inquirer.js prompts, health category feedback, and BMI history tracking.", tech: ["JavaScript", "Node.js", "CLI"], github: "https://github.com/subhanbaloch18/BMI-Calculator", live: null, emoji: "⚖️", accent: "#0070f3" },
  { title: "Currency Converter CLI", description: "Terminal-based currency converter with multiple base currencies and clean formatted output using Node.js.", tech: ["JavaScript", "Node.js", "CLI"], github: "https://github.com/subhanbaloch18/Currency-Converter", live: null, emoji: "💱", accent: "#64ffda" },
  { title: "CLI ATM System", description: "OOP-based ATM simulation with account management, deposits, withdrawals, and PIN validation in a Node.js CLI.", tech: ["JavaScript", "Node.js", "OOP"], github: "https://github.com/subhanbaloch18/Cli-ATM.", live: null, emoji: "🏧", accent: "#f59e0b" },
];

function TiltCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * 14, y: (x - 0.5) * -14 });
    setGlow({ x: x * 100, y: y * 100 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.07 }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? "transform 0.05s ease" : "transform 0.4s ease",
        position: "relative",
        background: "rgba(17, 34, 64, 0.55)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: `1px solid ${hovered ? project.accent + "55" : "rgba(100,255,218,0.08)"}`,
        borderRadius: "14px",
        padding: "1.8rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        overflow: "hidden",
        boxShadow: hovered ? `0 20px 60px ${project.accent}22, 0 0 0 1px ${project.accent}22` : "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Moving spotlight */}
      {hovered && (
        <div style={{
          position: "absolute", inset: 0, borderRadius: "14px", pointerEvents: "none",
          background: `radial-gradient(200px circle at ${glow.x}% ${glow.y}%, ${project.accent}12, transparent)`,
        }} />
      )}

      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(to right, transparent, ${project.accent}88, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <FiFolder style={{ color: project.accent, fontSize: "1.4rem" }} />
          <span style={{ fontSize: "1.4rem" }}>{project.emoji}</span>
        </div>
        <div style={{ display: "flex", gap: "0.8rem" }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            style={{ color: "#8892b0", fontSize: "1.1rem", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = project.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8892b0")}
          >
            <FiGithub />
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              style={{ color: "#8892b0", fontSize: "1.1rem", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = project.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8892b0")}
            >
              <FiExternalLink />
            </a>
          )}
        </div>
      </div>

      <h3 style={{ fontSize: "1.05rem", fontWeight: 800, fontStyle: "italic", color: "#ccd6f6", lineHeight: 1.3 }}>
        {project.title}
      </h3>

      <p style={{ fontSize: "0.87rem", color: "#8892b0", lineHeight: 1.75, flexGrow: 1, fontStyle: "italic" }}>
        {project.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {project.tech.map((t) => (
          <span key={t} style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", fontSize: "0.7rem",
            color: project.accent, opacity: 0.85, background: project.accent + "12",
            padding: "2px 8px", borderRadius: "4px", border: `1px solid ${project.accent}22`,
          }}>{t}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="projects" className="section-padding" style={{ position: "relative", zIndex: 5 }}>
      <motion.h2 className="section-heading" data-number="05."
        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
      >
        My Work
      </motion.h2>

      <p style={{ color: "#8892b0", marginBottom: "2.5rem", maxWidth: "520px", lineHeight: 1.8, fontSize: "0.95rem", fontStyle: "italic" }}>
        From <strong style={{ color: "#ccd6f6" }}>AI-powered tools</strong> to{" "}
        <strong style={{ color: "#ccd6f6" }}>full-stack web apps</strong> and{" "}
        <strong style={{ color: "#ccd6f6" }}>CLI utilities</strong> — real projects solving real problems.
      </p>

      <motion.div layout style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
        gap: "1.4rem", marginBottom: "2.5rem",
      }}>
        <AnimatePresence>
          {displayed.map((p, i) => <TiltCard key={p.title} project={p} index={i} />)}
        </AnimatePresence>
      </motion.div>

      {projects.length > 6 && (
        <div style={{ textAlign: "center" }}>
          <motion.button
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            style={{
              background: "transparent", border: "1px solid #64ffda", color: "#64ffda",
              padding: "13px 32px", borderRadius: "6px",
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", fontSize: "0.85rem",
              cursor: "pointer", transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#64ffda";
              (e.currentTarget as HTMLButtonElement).style.color = "#0a192f";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "#64ffda";
            }}
          >
            {showAll ? "Show Less ↑" : `Show All ${projects.length} Projects ↓`}
          </motion.button>
        </div>
      )}
    </section>
  );
}
