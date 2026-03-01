"use client";

import { motion } from "framer-motion";
import {
  SiTypescript, SiJavascript, SiPython, SiNextdotjs, SiReact, SiNodedotjs,
  SiTailwindcss, SiStreamlit, SiGit, SiGithub, SiDocker, SiVercel, SiHtml5, SiCss3,
} from "react-icons/si";

const skills = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6", level: 90 },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e", level: 88 },
  { name: "Python",     icon: SiPython,     color: "#3776ab", level: 85 },
  { name: "Next.js",    icon: SiNextdotjs,  color: "#ffffff", level: 85 },
  { name: "React",      icon: SiReact,      color: "#61dafb", level: 82 },
  { name: "Node.js",    icon: SiNodedotjs,  color: "#339933", level: 78 },
  { name: "Tailwind",   icon: SiTailwindcss,color: "#06b6d4", level: 90 },
  { name: "Streamlit",  icon: SiStreamlit,  color: "#ff4b4b", level: 80 },
  { name: "HTML5",      icon: SiHtml5,      color: "#e34f26", level: 95 },
  { name: "CSS3",       icon: SiCss3,       color: "#1572b6", level: 88 },
  { name: "Git",        icon: SiGit,        color: "#f05032", level: 85 },
  { name: "GitHub",     icon: SiGithub,     color: "#ffffff", level: 88 },
  { name: "Docker",     icon: SiDocker,     color: "#2496ed", level: 65 },
  { name: "Vercel",     icon: SiVercel,     color: "#ffffff", level: 90 },
];

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const circumference = 2 * Math.PI * 28;
  const dash = (skill.level / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{
        scale: 1.08,
        boxShadow: `0 0 32px ${skill.color}44, 0 8px 24px rgba(0,0,0,0.3)`,
        borderColor: `${skill.color}55`,
      }}
      style={{
        background: "rgba(17,34,64,0.55)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "14px",
        padding: "1.5rem 1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.65rem",
        cursor: "default",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top gradient bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(to right, transparent, ${skill.color}66, transparent)`,
        opacity: 0,
        transition: "opacity 0.3s",
      }} className="skill-bar" />

      {/* Circular progress ring */}
      <div style={{ position: "relative", width: "68px", height: "68px" }}>
        <svg width="68" height="68" style={{ transform: "rotate(-90deg)" }}>
          {/* Track */}
          <circle cx="34" cy="34" r="28" fill="none" stroke="#1a2e4a" strokeWidth="3" />
          {/* Progress */}
          <motion.circle
            cx="34" cy="34" r="28"
            fill="none"
            stroke={skill.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference - dash }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut", delay: index * 0.05 }}
            style={{ filter: `drop-shadow(0 0 5px ${skill.color}88)` }}
          />
        </svg>
        {/* Icon */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <skill.icon style={{
            fontSize: "1.5rem",
            color: skill.color,
            filter: `drop-shadow(0 0 8px ${skill.color}66)`,
          }} />
        </div>
      </div>

      <span style={{
        fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
        fontSize: "0.72rem",
        color: "#8892b0",
        textAlign: "center",
      }}>
        {skill.name}
      </span>

      <span style={{
        fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
        fontSize: "0.68rem",
        color: skill.color,
        fontWeight: 600,
        opacity: 0.9,
      }}>
        {skill.level}%
      </span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-padding"
      style={{
        position: "relative",
        zIndex: 5,
        background: "linear-gradient(180deg, #0d2137 0%, #0a192f 100%)",
      }}
    >
      <motion.h2
        className="section-heading"
        data-number="04."
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Technologies I Love
      </motion.h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(118px, 1fr))",
        gap: "1rem",
        maxWidth: "920px",
      }}>
        {skills.map((s, i) => <SkillCard key={s.name} skill={s} index={i} />)}
      </div>
    </section>
  );
}
