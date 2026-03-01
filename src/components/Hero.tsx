"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiCode } from "react-icons/fi";
import StarsCanvas from "./StarsCanvas";
import SphereCanvas from "./SphereCanvas";
import MagneticButton from "./MagneticButton";


const titles = [
  "Full Stack Developer",
  "TypeScript Engineer",
  "Python & AI Builder",
  "Open Source Creator",
];

const floatingTags = [
  { text: "<TypeScript />", color: "#3178c6", delay: 0.2 },
  { text: "{ Python }",     color: "#64ffda", delay: 0.45 },
  { text: "Next.js",        color: "#ffffff", delay: 0.7 },
  { text: "AI Tools",       color: "#a855f7", delay: 0.95 },
];

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [display, setDisplay]   = useState("");
  const [deleting, setDeleting] = useState(false);

  // Scroll-linked parallax (scroll-experience skill: Arcs principle)
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const cur = titles[titleIdx];
    let t: NodeJS.Timeout;
    if (!deleting && display.length < cur.length) {
      t = setTimeout(() => setDisplay(cur.slice(0, display.length + 1)), 70);
    } else if (!deleting && display.length === cur.length) {
      t = setTimeout(() => setDeleting(true), 2400);
    } else if (deleting && display.length > 0) {
      t = setTimeout(() => setDisplay(display.slice(0, -1)), 32);
    } else {
      setDeleting(false);
      setTitleIdx((p) => (p + 1) % titles.length);
    }
    return () => clearTimeout(t);
  }, [display, deleting, titleIdx]);

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "clamp(4rem, 8vw, 5rem) 6vw 0",
        overflow: "hidden",
      }}
    >
      <StarsCanvas />

      {/* SVG blob backgrounds */}
      <div className="blob" style={{ width: "clamp(200px,40vw,500px)", height: "clamp(200px,40vw,500px)", background: "#64ffda", top: "-100px", right: "10%" }} />
      <div className="blob" style={{ width: "clamp(160px,32vw,400px)", height: "clamp(160px,32vw,400px)", background: "#0070f3", bottom: "0px", left: "5%", animationDelay: "4s" }} />
      <div className="blob" style={{ width: "clamp(120px,24vw,300px)", height: "clamp(120px,24vw,300px)", background: "#a855f7", top: "30%", right: "25%", animationDelay: "8s" }} />

      {/* Left social sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4 }}
        className="hidden lg:flex"
        style={{
          position: "fixed", bottom: 0, left: "2rem",
          flexDirection: "column", alignItems: "center", gap: "1.2rem", zIndex: 10,
        }}
      >
        {[
          { icon: FiGithub,   href: "https://github.com/subhanbaloch18",                           label: "GitHub" },
          { icon: FiLinkedin, href: "https://www.linkedin.com/in/subhan-ghafoor-49a9802b4",        label: "LinkedIn" },
          { icon: FiMail,     href: "mailto:subhanghafoor2006@gmail.com",                          label: "Email" },
        ].map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target={label !== "Email" ? "_blank" : undefined}
            rel="noopener noreferrer"
            whileHover={{ y: -4, scale: 1.2 }}
            style={{ color: "#8892b0", fontSize: "1.15rem", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#64ffda")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8892b0")}
          >
            <Icon />
          </motion.a>
        ))}
        <div style={{ width: 1, height: 90, background: "linear-gradient(to bottom, #8892b0aa, transparent)" }} />
      </motion.div>

      {/* Right email sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4 }}
        className="hidden lg:flex"
        style={{
          position: "fixed", bottom: 0, right: "2rem",
          flexDirection: "column", alignItems: "center", gap: "1.2rem", zIndex: 10,
        }}
      >
        <motion.a
          href="mailto:subhanghafoor2006@gmail.com"
          whileHover={{ color: "#64ffda" }}
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: "0.7rem",
            color: "#8892b0",
            writingMode: "vertical-rl",
            textDecoration: "none",
            letterSpacing: "2px",
            transition: "color 0.2s",
          }}
        >
          subhanghafoor2006@gmail.com
        </motion.a>
        <div style={{ width: 1, height: 90, background: "linear-gradient(to bottom, #8892b0aa, transparent)" }} />
      </motion.div>

      {/* Main layout grid */}
      <div className="hero-grid">
        {/* ── Text column (scroll parallax) ── */}
        <motion.div style={{ y: textY, opacity }}>
          {/* Greeting line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: "0.95rem",
              color: "#64ffda",
              marginBottom: "1.2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <FiCode size={14} /> Hi, my name is
          </motion.p>

          {/* Animated gradient name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5.6rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: "0.6rem",
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #ccd6f6 0%, #64ffda 40%, #0070f3 75%, #a855f7 100%)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientShift 7s ease infinite",
            }}
          >
            Subhan Ghafoor
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: "clamp(1.3rem, 3.2vw, 2.2rem)",
              fontWeight: 500,
              color: "#8892b0",
              marginBottom: "2rem",
              minHeight: "3rem",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              color: "#64ffda",
              fontSize: "0.7em",
              marginRight: "2px",
            }}>
              &gt;&nbsp;
            </span>
            {display}
            <span className="cursor-blink" style={{ color: "#64ffda", fontWeight: 100 }}>|</span>
          </motion.h2>

          {/* Bio paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: "1.05rem",
              color: "#8892b0",
              lineHeight: 1.85,
              maxWidth: "520px",
              marginBottom: "2.5rem",
            }}
          >
            I build{" "}
            <span style={{ color: "#64ffda", fontWeight: 600 }}>modern web applications</span> and{" "}
            <span style={{ color: "#a855f7", fontWeight: 600 }}>AI-powered tools</span>.
            Turning ideas into deployed products —{" "}
            <em style={{ color: "#ccd6f6", opacity: 0.85 }}>one commit at a time.</em>
          </motion.p>

          {/* Tech tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem", marginBottom: "2.5rem" }}
          >
            {floatingTags.map((tag) => (
              <motion.span
                key={tag.text}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: tag.delay }}
                whileHover={{ scale: 1.07, boxShadow: `0 0 16px ${tag.color}44` }}
                style={{
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: "0.75rem",
                  color: tag.color,
                  border: `1px solid ${tag.color}44`,
                  borderRadius: "6px",
                  padding: "5px 13px",
                  background: `${tag.color}0d`,
                  cursor: "default",
                  transition: "all 0.2s",
                }}
              >
                {tag.text}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            <MagneticButton strength={0.3}>
              <motion.button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  background: "transparent",
                  border: "1px solid #64ffda",
                  color: "#64ffda",
                  padding: "14px 32px",
                  borderRadius: "8px",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  letterSpacing: "0.3px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = "#64ffda";
                  btn.style.color = "#0a192f";
                  btn.style.boxShadow = "0 0 28px #64ffda44";
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = "transparent";
                  btn.style.color = "#64ffda";
                  btn.style.boxShadow = "none";
                }}
              >
                View My Work ↗
              </motion.button>
            </MagneticButton>

            <MagneticButton strength={0.3}>
              <motion.a
                href="mailto:subhanghafoor2006@gmail.com"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "rgba(100,255,218,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#ccd6f6",
                  padding: "14px 32px",
                  borderRadius: "8px",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.borderColor = "#64ffda44";
                  a.style.boxShadow = "0 0 22px #64ffda18";
                }}
                onMouseLeave={(e) => {
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.borderColor = "rgba(255,255,255,0.12)";
                  a.style.boxShadow = "none";
                }}
              >
                <FiMail size={14} /> Contact Me
              </motion.a>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* 3D sphere + code terminal column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
          className="hidden md:flex"
          style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1.2rem" }}
        >
          <SphereCanvas />

          {/* Floating code terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            style={{
              background: "rgba(8,20,40,0.96)",
              border: "1px solid rgba(100,255,218,0.25)",
              borderRadius: "10px",
              padding: "1.1rem 1.5rem",
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: "0.75rem",
              color: "#a8b2c8",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              maxWidth: "290px",
              lineHeight: 1.85,
              boxShadow: "0 4px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(100,255,218,0.06)",
            }}
          >
            <div style={{ display: "flex", gap: "5px", marginBottom: "0.6rem" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div><span style={{ color: "#64ffda" }}>const</span> <span style={{ color: "#ccd6f6" }}>dev</span> = {"{"}</div>
            <div>&nbsp;&nbsp;name: <span style={{ color: "#f59e0b" }}>&quot;Subhan Ghafoor&quot;</span>,</div>
            <div>&nbsp;&nbsp;stack: <span style={{ color: "#a855f7" }}>[&quot;TS&quot;, &quot;Next&quot;, &quot;AI&quot;]</span>,</div>
            <div>&nbsp;&nbsp;available: <span style={{ color: "#22c55e" }}>true</span>,</div>
            <div>{"}"};</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{
          position: "absolute", bottom: "2rem", left: "50%",
          transform: "translateX(-50%)",
          background: "none", border: "none", cursor: "pointer",
          color: "#64ffda", zIndex: 5,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem",
        }}
      >
        <span style={{
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: "0.68rem",
          opacity: 0.5,
          letterSpacing: "2px",
        }}>
          scroll
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <FiArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
