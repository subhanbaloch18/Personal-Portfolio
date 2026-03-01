"use client";

import { motion } from "framer-motion";
import {
  FiDownload, FiGithub, FiLinkedin, FiMail, FiPhone,
  FiMapPin, FiCalendar, FiExternalLink,
} from "react-icons/fi";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.5 },
};

const skills = {
  "Languages":      ["TypeScript", "JavaScript", "Python", "HTML5", "CSS3"],
  "Frameworks":     ["Next.js", "React", "Node.js", "Streamlit", "Tailwind CSS"],
  "Tools & DevOps": ["Git", "GitHub", "Docker", "Vercel", "npm / pnpm"],
  "AI / Data":      ["OpenAI API", "LangChain", "Pandas", "NumPy"],
  "Databases":      ["PostgreSQL", "MongoDB", "Supabase", "Prisma"],
};

const experience = [
  {
    role: "Full Stack Developer (Freelance)",
    company: "Self-Employed",
    period: "2024 — Present",
    location: "Karachi, Pakistan (Remote)",
    color: "#64ffda",
    points: [
      "Design and ship production-ready Next.js web apps with TypeScript for local and international clients.",
      "Build RESTful and type-safe APIs, integrating third-party services (payment gateways, AI APIs, GitHub OAuth).",
      "Manage full deployment pipeline: domain, CI/CD via GitHub Actions, hosting on Vercel.",
    ],
  },
  {
    role: "AI & Web Hackathon Participant",
    company: "GIAIC — Hackathons I, II & III",
    period: "2024 — 2026",
    location: "Karachi, Pakistan",
    color: "#a855f7",
    points: [
      "Placed in top teams across 3 national hackathons, building and shipping functional projects within 24–72 hours.",
      "Hackathon I: Physical AI & Humanoid Robotics Simulator (Python + Streamlit).",
      "Hackathon III: Full e-commerce platform migration using Next.js 15, TypeScript, Sanity CMS, deployed on Vercel.",
    ],
  },
];

const education = [
  {
    degree: "Bachelor of Science — Cyber Security",
    institution: "Dawood University of Engineering & Technology",
    period: "2024 — Present",
    location: "Karachi, Pakistan",
    color: "#0070f3",
    details: "Studying core CS fundamentals, networks, cryptography, and secure software development.",
  },
  {
    degree: "AI & Emerging Technologies",
    institution: "Governor's Initiative for AI & Computing (GIAIC)",
    period: "2024 — Present",
    location: "Karachi, Pakistan",
    color: "#64ffda",
    details: "Focused on TypeScript, Next.js, Python, AI applications, cloud computing, and Agentic AI.",
  },
];

const projects = [
  {
    name: "Physical AI & Humanoid Robotics Simulator",
    tech: ["Python", "Streamlit", "NumPy"],
    href: "https://github.com/subhanbaloch18/Physical-AI-and-Humanoid-Robotics",
    desc: "Interactive simulator exploring Physical AI concepts, built for GIAIC Hackathon I.",
  },
  {
    name: "Full E-Commerce Platform (Hackathon III)",
    tech: ["Next.js 15", "TypeScript", "Sanity CMS", "Stripe"],
    href: "https://github.com/subhanbaloch18/Hackathon-03",
    desc: "Complete e-commerce migration with type-safe APIs, real-time cart, and Vercel deployment.",
  },
  {
    name: "Full Stack Todo App (Phase IV)",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    href: "https://github.com/subhanbaloch18/Todo-app-Phase-IV",
    desc: "Multi-phase full-stack CRUD application with optimistic UI updates and auth.",
  },
  {
    name: "Developer Portfolio",
    tech: ["Next.js 16", "TypeScript", "Three.js", "Framer Motion"],
    href: "https://github.com/subhanbaloch18",
    desc: "This very portfolio — featuring a custom Three.js sphere, live GitHub stats, and 25+ interactive features.",
  },
];

export default function ResumePage() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a192f",
        color: "#ccd6f6",
        fontFamily: "var(--font-body, Inter, sans-serif)",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(10,25,47,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(100,255,218,0.08)",
          padding: "0.75rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: "0.82rem",
            color: "#64ffda",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            opacity: 0.8,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.8")}
        >
          ← Back to Portfolio
        </Link>

        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "transparent",
            border: "1px solid #64ffda",
            color: "#64ffda",
            padding: "8px 20px",
            borderRadius: "6px",
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: "0.78rem",
            cursor: "pointer",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "#64ffda";
            btn.style.color = "#0a192f";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "transparent";
            btn.style.color = "#64ffda";
          }}
        >
          <FiDownload size={13} /> Print / Save PDF
        </motion.button>
      </div>

      {/* Resume content */}
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "3rem 2rem 6rem",
        }}
        id="resume-content"
      >
        {/* ─── Header ─── */}
        <motion.div {...fadeUp} style={{ marginBottom: "2.5rem", borderBottom: "1px solid rgba(100,255,218,0.12)", paddingBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
              background: "linear-gradient(135deg, #ccd6f6 0%, #64ffda 50%, #0070f3 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "0.5rem",
            }}
          >
            Subhan Ghafoor
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#64ffda",
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              marginBottom: "1.2rem",
            }}
          >
            Full Stack Developer · TypeScript · Python · AI
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.2rem",
              color: "#8892b0",
              fontSize: "0.82rem",
            }}
          >
            {[
              { icon: FiMapPin,   text: "Karachi, Pakistan" },
              { icon: FiMail,    text: "subhanghafoor2006@gmail.com",           href: "mailto:subhanghafoor2006@gmail.com" },
              { icon: FiGithub,  text: "github.com/subhanbaloch18",             href: "https://github.com/subhanbaloch18" },
              { icon: FiLinkedin,text: "linkedin.com/in/subhan-ghafoor",        href: "https://www.linkedin.com/in/subhan-ghafoor-49a9802b4" },
            ].map(({ icon: Icon, text, href }) =>
              href ? (
                <a
                  key={text}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: "0.35rem",
                    color: "#8892b0", textDecoration: "none", transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#64ffda")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8892b0")}
                >
                  <Icon size={13} /> {text}
                </a>
              ) : (
                <span key={text} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Icon size={13} /> {text}
                </span>
              )
            )}
          </div>
        </motion.div>

        {/* ─── Summary ─── */}
        <Section title="Profile">
          <motion.p
            {...fadeUp}
            style={{ color: "#8892b0", lineHeight: 1.9, fontSize: "0.95rem" }}
          >
            Ambitious Full Stack Developer with 2+ years of hands-on experience building and shipping production-grade
            web applications. Specialized in{" "}
            <strong style={{ color: "#ccd6f6" }}>TypeScript</strong>,{" "}
            <strong style={{ color: "#ccd6f6" }}>Next.js</strong>, and{" "}
            <strong style={{ color: "#ccd6f6" }}>Python</strong>. Proven track record of delivering results
            under pressure through 3 national hackathons. Currently pursuing a degree in Cyber Security at
            Dawood University while studying AI &amp; Emerging Technologies at GIAIC.
          </motion.p>
        </Section>

        {/* ─── Experience ─── */}
        <Section title="Experience">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.role}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                marginBottom: "1.8rem",
                paddingLeft: "1.2rem",
                borderLeft: `2px solid ${exp.color}55`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.3rem" }}>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#ccd6f6" }}>{exp.role}</h3>
                  <div style={{ color: exp.color, fontSize: "0.82rem", fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}>
                    {exp.company}
                  </div>
                </div>
                <div style={{ textAlign: "right", color: "#8892b0", fontSize: "0.78rem", fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", justifyContent: "flex-end" }}>
                    <FiCalendar size={11} /> {exp.period}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", justifyContent: "flex-end", marginTop: "2px" }}>
                    <FiMapPin size={11} /> {exp.location}
                  </div>
                </div>
              </div>
              <ul style={{ margin: "0.8rem 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {exp.points.map((p) => (
                  <li key={p} style={{ color: "#8892b0", fontSize: "0.88rem", lineHeight: 1.7, display: "flex", gap: "0.6rem" }}>
                    <span style={{ color: exp.color, flexShrink: 0, marginTop: "0.35em" }}>▹</span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </Section>

        {/* ─── Education ─── */}
        <Section title="Education">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                marginBottom: "1.5rem",
                paddingLeft: "1.2rem",
                borderLeft: `2px solid ${edu.color}55`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.3rem" }}>
                <div>
                  <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#ccd6f6" }}>{edu.degree}</h3>
                  <div style={{ color: edu.color, fontSize: "0.82rem", fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", marginTop: "2px" }}>
                    {edu.institution}
                  </div>
                </div>
                <div style={{ color: "#8892b0", fontSize: "0.78rem", fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", justifyContent: "flex-end" }}>
                    <FiCalendar size={11} /> {edu.period}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", justifyContent: "flex-end", marginTop: "2px" }}>
                    <FiMapPin size={11} /> {edu.location}
                  </div>
                </div>
              </div>
              <p style={{ marginTop: "0.6rem", color: "#8892b0", fontSize: "0.86rem", lineHeight: 1.7 }}>
                {edu.details}
              </p>
            </motion.div>
          ))}
        </Section>

        {/* ─── Skills ─── */}
        <Section title="Technical Skills">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
            {Object.entries(skills).map(([category, items], i) => (
              <motion.div
                key={category}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{
                  background: "rgba(17,34,64,0.6)",
                  border: "1px solid rgba(100,255,218,0.08)",
                  borderRadius: "10px",
                  padding: "1rem 1.2rem",
                }}
              >
                <div style={{
                  fontSize: "0.72rem",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  color: "#64ffda",
                  marginBottom: "0.7rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}>
                  {category}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {items.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                        fontSize: "0.72rem",
                        color: "#8892b0",
                        background: "rgba(100,255,218,0.05)",
                        border: "1px solid rgba(100,255,218,0.12)",
                        borderRadius: "4px",
                        padding: "2px 8px",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ─── Projects ─── */}
        <Section title="Projects">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "1rem" }}>
            {projects.map((proj, i) => (
              <motion.a
                key={proj.name}
                href={proj.href}
                target="_blank"
                rel="noopener noreferrer"
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ borderColor: "rgba(100,255,218,0.3)", translateY: -4 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  background: "rgba(17,34,64,0.55)",
                  border: "1px solid rgba(100,255,218,0.08)",
                  borderRadius: "10px",
                  padding: "1.2rem 1.4rem",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#64ffda", fontWeight: 700, fontSize: "0.9rem", fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}>
                    {proj.name}
                  </span>
                  <FiExternalLink style={{ color: "#8892b055", fontSize: "0.85rem", flexShrink: 0 }} />
                </div>
                <p style={{ color: "#8892b0", fontSize: "0.82rem", lineHeight: 1.65, margin: 0 }}>
                  {proj.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "auto" }}>
                  {proj.tech.map((t) => (
                    <span key={t} style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: "0.67rem",
                      color: "#64ffda",
                      background: "rgba(100,255,218,0.08)",
                      border: "1px solid rgba(100,255,218,0.2)",
                      borderRadius: "4px",
                      padding: "2px 7px",
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </Section>

        {/* ─── Hackathons ─── */}
        <Section title="Hackathons">
          {[
            { name: "GIAIC Hackathon I — Physical AI Simulator", result: "Top Team · Feb 2025", color: "#64ffda" },
            { name: "GIAIC Hackathon II — Figma UI to Next.js", result: "Completed · 2025",     color: "#0070f3" },
            { name: "GIAIC Hackathon III — E-Commerce Migration", result: "Top Team · Jan 2025", color: "#a855f7" },
          ].map((h, i) => (
            <motion.div
              key={h.name}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.9rem 1.2rem",
                background: "rgba(17,34,64,0.5)",
                border: "1px solid rgba(100,255,218,0.07)",
                borderRadius: "8px",
                marginBottom: "0.7rem",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: h.color, flexShrink: 0 }} />
                <span style={{ color: "#ccd6f6", fontSize: "0.88rem" }}>{h.name}</span>
              </div>
              <span style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: "0.75rem",
                color: h.color,
                background: `${h.color}12`,
                border: `1px solid ${h.color}28`,
                borderRadius: "4px",
                padding: "2px 10px",
              }}>
                {h.result}
              </span>
            </motion.div>
          ))}
        </Section>

        {/* Footer note */}
        <motion.p
          {...fadeUp}
          style={{
            textAlign: "center",
            color: "#4a5568",
            fontSize: "0.78rem",
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            marginTop: "3rem",
          }}
        >
          References available upon request · Last updated March 2026
        </motion.p>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white !important; color: #111 !important; }
          nav, [data-no-print] { display: none !important; }
          #resume-content { max-width: 100% !important; padding: 1rem !important; }
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: "2.8rem" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.4rem" }}>
        <h2
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "#ccd6f6",
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h2>
        <div style={{ flex: 1, height: "1px", background: "rgba(100,255,218,0.12)" }} />
      </div>
      {children}
    </motion.div>
  );
}
