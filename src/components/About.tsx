"use client";

import { motion } from "framer-motion";
import { FiGithub, FiCode, FiZap, FiTarget } from "react-icons/fi";

const stats = [
  { icon: FiGithub, number: "20+", label: "Public Repos" },
  { icon: FiCode,   number: "10+", label: "Projects Built" },
  { icon: FiZap,    number: "3",   label: "Hackathons" },
  { icon: FiTarget, number: "2+",  label: "Years Coding" },
];

const techList = [
  "TypeScript", "Python", "Next.js / React",
  "Node.js", "Tailwind CSS", "Streamlit",
  "Git & GitHub", "Docker",
];

export default function About() {
  return (
    <section id="about" className="section-padding" style={{ position: "relative", zIndex: 5 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading" data-number="01.">About Me</h2>
      </motion.div>

      <div
        style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "4rem", alignItems: "start" }}
        className="grid-cols-1 md:grid-cols-2"
      >
        {/* Bio text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p style={{ fontSize: "1.05rem", color: "#8892b0", lineHeight: 1.9, marginBottom: "1.3rem" }}>
            Hello! I&apos;m{" "}
            <span style={{ color: "#64ffda", fontWeight: 600 }}>Subhan Ghafoor</span>,{" "}
            a passionate Full Stack Developer based in Karachi, Pakistan. I love
            building things that live on the internet — from{" "}
            <strong style={{ color: "#ccd6f6" }}>sleek web interfaces</strong> to{" "}
            <strong style={{ color: "#ccd6f6" }}>powerful backend APIs</strong> and{" "}
            <strong style={{ color: "#ccd6f6" }}>AI-powered tools</strong>.
          </p>
          <p style={{ fontSize: "1.05rem", color: "#8892b0", lineHeight: 1.9, marginBottom: "1.3rem" }}>
            I&apos;m currently pursuing a{" "}
            <span style={{ color: "#64ffda", fontWeight: 600 }}>Bachelor&apos;s in Cyber Security</span>{" "}
            at <em>Dawood University of Engineering and Technology</em>, while also studying{" "}
            <span style={{ color: "#64ffda", fontWeight: 600 }}>AI &amp; Emerging Technologies</span>{" "}
            at <em>GIAIC</em>.
          </p>
          <p style={{ fontSize: "1.05rem", color: "#8892b0", lineHeight: 1.9, marginBottom: "2rem" }}>
            I thrive on <strong style={{ color: "#ccd6f6" }}>hackathons</strong>,{" "}
            <strong style={{ color: "#ccd6f6" }}>open source contributions</strong>, and building
            projects that solve <em>real-world problems</em>. When I&apos;m not coding,
            I&apos;m exploring the latest in{" "}
            <strong style={{ color: "#ccd6f6" }}>AI</strong> and{" "}
            <strong style={{ color: "#ccd6f6" }}>physical computing</strong>.
          </p>

          <p style={{
            color: "#ccd6f6", fontWeight: 600, marginBottom: "1rem",
            fontSize: "0.9rem", letterSpacing: "0.01em",
          }}>
            Technologies I work with:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.6rem" }}>
            {techList.map((tech) => (
              <div
                key={tech}
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: "0.8rem",
                  color: "#8892b0",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ color: "#64ffda", fontSize: "0.6rem" }}>▹</span>
                {tech}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats + Avatar */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            style={{ position: "relative", width: "260px", height: "260px", margin: "0 auto" }}
          >
            {/* Offset border accent */}
            <div style={{
              position: "absolute", top: "12px", left: "12px",
              right: "-12px", bottom: "-12px",
              border: "2px solid #64ffda44",
              borderRadius: "12px",
              zIndex: 0,
              transition: "all 0.3s ease",
            }} />
            {/* Main card */}
            <div style={{
              position: "relative", zIndex: 1,
              width: "100%", height: "100%",
              background: "linear-gradient(135deg, #112240 0%, #0d1a2f 100%)",
              borderRadius: "10px",
              border: "1px solid rgba(100,255,218,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}>
              {/* Gradient background behind initials */}
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at center, rgba(100,255,218,0.07) 0%, transparent 70%)",
              }} />
              {/* Initials avatar */}
              <div style={{
                position: "relative",
                width: "110px", height: "110px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(100,255,218,0.15), rgba(168,85,247,0.15))",
                border: "2px solid rgba(100,255,218,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.4rem",
                fontWeight: 700,
                color: "#64ffda",
                fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
                letterSpacing: "-0.02em",
              }}>
                SG
              </div>
            </div>
          </motion.div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.9rem", marginTop: "0.5rem" }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
                whileHover={{ borderColor: "#64ffda55", scale: 1.04 }}
                style={{
                  background: "rgba(17,34,64,0.6)",
                  border: "1px solid rgba(100,255,218,0.08)",
                  borderRadius: "10px",
                  padding: "1.2rem 1rem",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  cursor: "default",
                  backdropFilter: "blur(8px)",
                }}
              >
                <stat.icon style={{ color: "#64ffda", fontSize: "1.3rem", margin: "0 auto 0.5rem", display: "block" }} />
                <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#ccd6f6", lineHeight: 1, letterSpacing: "-0.02em" }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: "0.72rem", color: "#8892b0", marginTop: "0.3rem",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Currently Learning */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{
              background: "rgba(17,34,64,0.5)",
              border: "1px solid rgba(100,255,218,0.1)",
              borderRadius: "12px",
              padding: "1.2rem",
            }}
          >
            <div style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: "0.7rem",
              color: "#64ffda",
              marginBottom: "0.8rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}>
              <span className="learning-tag-active">●</span>
              Currently Learning
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {[
                { name: "Rust",              color: "#f97316" },
                { name: "LangChain",         color: "#a855f7" },
                { name: "Three.js Shaders",  color: "#64ffda" },
                { name: "Docker & K8s",      color: "#0070f3" },
              ].map((item) => (
                <span
                  key={item.name}
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: "0.72rem",
                    color: item.color,
                    background: `${item.color}12`,
                    border: `1px solid ${item.color}28`,
                    borderRadius: "4px",
                    padding: "3px 9px",
                  }}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
