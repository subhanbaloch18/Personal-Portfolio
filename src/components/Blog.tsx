"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiClock, FiCalendar } from "react-icons/fi";

const articles = [
  {
    title: "Building a Physical AI & Humanoid Robotics Simulator with Python",
    excerpt:
      "How I architected an interactive Streamlit app exploring Physical AI concepts at the GIAIC Hackathon — design decisions, challenges faced, and what I learned about real-time simulation.",
    date: "Feb 2026",
    readTime: "6 min read",
    tags: ["Python", "AI", "Streamlit", "Hackathon"],
    color: "#64ffda",
    href: "https://github.com/subhanbaloch18/Physical-AI-and-Humanoid-Robotics",
    emoji: "🤖",
  },
  {
    title: "Migrating an E-Commerce Platform in 24 Hours with TypeScript",
    excerpt:
      "A deep dive into the GIAIC Day-3 hackathon challenge — how I planned, executed and shipped a full e-commerce migration with type-safe APIs and zero downtime on Vercel.",
    date: "Jan 2025",
    readTime: "8 min read",
    tags: ["TypeScript", "Next.js", "E-Commerce", "Vercel"],
    color: "#f59e0b",
    href: "https://github.com/subhanbaloch18/Hackathon-03",
    emoji: "🛒",
  },
  {
    title: "Full Stack Todo App: From Hackathon Concept to Production",
    excerpt:
      "Breaking down the architecture of a multi-phase full-stack todo application — state management patterns, TypeScript strictness, optimistic UI updates, and lessons from shipping fast.",
    date: "Feb 2026",
    readTime: "5 min read",
    tags: ["TypeScript", "Next.js", "Full Stack", "CRUD"],
    color: "#0070f3",
    href: "https://github.com/subhanbaloch18/Todo-app-Phase-IV",
    emoji: "✅",
  },
];

export default function Blog() {
  return (
    <section
      id="blog"
      className="section-padding"
      style={{ position: "relative", zIndex: 5, backgroundColor: "#0d2137" }}
    >
      <motion.h2
        className="section-heading"
        data-number="✍"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Writing
      </motion.h2>

      <p style={{
        color: "#8892b0", fontSize: "0.95rem", lineHeight: 1.8,
        maxWidth: "500px", marginBottom: "2.5rem",
      }}>
        Thoughts on building, shipping, and everything I learn along the way.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
        gap: "1.4rem",
        maxWidth: "1000px",
      }}>
        {articles.map((article, i) => (
          <motion.a
            key={article.title}
            href={article.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            whileHover={{ translateY: -6 }}
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              background: "rgba(17,34,64,0.55)",
              border: "1px solid rgba(100,255,218,0.08)",
              borderRadius: "16px",
              overflow: "hidden",
              transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = `${article.color}44`;
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 20px 50px ${article.color}14`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(100,255,218,0.08)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            {/* Top color bar */}
            <div style={{
              height: "3px",
              background: `linear-gradient(to right, ${article.color}, ${article.color}44)`,
            }} />

            <div style={{ padding: "1.8rem", display: "flex", flexDirection: "column", gap: "1rem", flexGrow: 1 }}>
              {/* Emoji + meta */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1.8rem" }}>{article.emoji}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{
                    display: "flex", alignItems: "center", gap: "0.3rem",
                    color: "#8892b0", fontSize: "0.7rem",
                    fontFamily: "var(--font-mono)",
                  }}>
                    <FiCalendar size={10} /> {article.date}
                  </span>
                  <span style={{
                    display: "flex", alignItems: "center", gap: "0.3rem",
                    color: "#8892b0", fontSize: "0.7rem",
                    fontFamily: "var(--font-mono)",
                  }}>
                    <FiClock size={10} /> {article.readTime}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: "1rem", fontWeight: 700,
                color: "#ccd6f6", lineHeight: 1.4,
                letterSpacing: "-0.01em",
              }}>
                {article.title}
              </h3>

              {/* Excerpt */}
              <p style={{
                fontSize: "0.85rem", color: "#8892b0",
                lineHeight: 1.75, flexGrow: 1,
              }}>
                {article.excerpt}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {article.tags.map((tag) => (
                  <span key={tag} style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.68rem",
                    color: article.color, background: `${article.color}12`,
                    border: `1px solid ${article.color}28`,
                    borderRadius: "4px", padding: "2px 8px",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read more */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                color: article.color, fontSize: "0.8rem",
                fontFamily: "var(--font-mono)", fontWeight: 600,
                marginTop: "0.4rem",
              }}>
                Read on GitHub <FiArrowRight size={12} />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
