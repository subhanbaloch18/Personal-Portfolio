"use client";

import { motion } from "framer-motion";
import { FiAward, FiCalendar, FiExternalLink, FiGithub } from "react-icons/fi";

const hackathons = [
  {
    name: "Hackathon I — Physical AI & Humanoid Robotics",
    event: "GIAIC Hackathon",
    period: "Feb 2026",
    description:
      "Built a Python-based project exploring Physical AI concepts and humanoid robotics simulation. Presented at the Governor's Initiative hackathon as part of the emerging technologies track.",
    tech: ["Python", "Physical AI", "Robotics", "Streamlit"],
    github: "https://github.com/subhanbaloch18/Physical-AI-and-Humanoid-Robotics",
    live: "https://physical-ai-and-humanoid-robotics-gamma.vercel.app",
    badge: "🥇",
    color: "#64ffda",
  },
  {
    name: "Hackathon II — Full Stack Todo Application",
    event: "GIAIC Hackathon",
    period: "Feb 2026",
    description:
      "Developed a full-stack todo application across multiple phases (Phase III & IV), implementing advanced state management, TypeScript type safety, and full CRUD operations with a polished UI.",
    tech: ["TypeScript", "Next.js", "Full Stack", "CRUD"],
    github: "https://github.com/subhanbaloch18/Todo-app-Phase-IV",
    live: null,
    badge: "🥈",
    color: "#0070f3",
  },
  {
    name: "Hackathon III — E-Commerce Migration",
    event: "GIAIC Hackathon",
    period: "Jan 2025",
    description:
      "Led a Day-3 migration challenge, migrating and refactoring an e-commerce platform with full TypeScript integration, optimized performance, and deployment on Vercel.",
    tech: ["TypeScript", "Next.js", "E-Commerce", "Vercel"],
    github: "https://github.com/subhanbaloch18/Hackathon-03",
    live: "https://hackathon-03-black.vercel.app",
    badge: "🏆",
    color: "#f59e0b",
  },
];

export default function Hackathons() {
  return (
    <section
      id="hackathons"
      className="section-padding"
      style={{ position: "relative", zIndex: 5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading" data-number="03.">
          Hackathons &amp; Achievements
        </h2>
      </motion.div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          maxWidth: "900px",
        }}
      >
        {hackathons.map((h, i) => (
          <motion.div
            key={h.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            whileHover={{
              borderColor: h.color,
              boxShadow: `0 10px 40px ${h.color}22`,
              translateY: -4,
            }}
            style={{
              backgroundColor: "#112240",
              border: "1px solid #233554",
              borderRadius: "12px",
              padding: "1.8rem",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Accent line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "4px",
                backgroundColor: h.color,
                borderRadius: "4px 0 0 4px",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    marginBottom: "0.4rem",
                  }}
                >
                  <FiAward style={{ color: h.color }} />
                  <span
                    style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: "0.8rem",
                      color: h.color,
                      fontStyle: "italic",
                    }}
                  >
                    {h.event}
                  </span>
                  <span style={{ fontSize: "1.1rem" }}>{h.badge}</span>
                </div>
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 800,
                    fontStyle: "italic",
                    color: "#ccd6f6",
                  }}
                >
                  {h.name}
                </h3>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: "#8892b0",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: "0.8rem",
                }}
              >
                <FiCalendar />
                {h.period}
              </div>
            </div>

            <p
              style={{
                fontSize: "0.9rem",
                color: "#8892b0",
                lineHeight: 1.8,
                marginBottom: "1.2rem",
                fontStyle: "italic",
              }}
            >
              {h.description}
            </p>

            {/* Tech tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.6rem",
                marginBottom: "1.2rem",
              }}
            >
              {h.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: "0.75rem",
                    color: h.color,
                    backgroundColor: `${h.color}15`,
                    border: `1px solid ${h.color}33`,
                    borderRadius: "4px",
                    padding: "3px 9px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <a
                href={h.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: "#8892b0",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#64ffda")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#8892b0")
                }
              >
                <FiGithub /> GitHub
              </a>
              {h.live && (
                <a
                  href={h.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "#8892b0",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#64ffda")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#8892b0")
                  }
                >
                  <FiExternalLink /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
