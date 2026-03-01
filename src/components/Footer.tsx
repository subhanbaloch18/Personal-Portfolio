"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiFileText } from "react-icons/fi";
import Link from "next/link";

const socials = [
  { icon: FiGithub,   href: "https://github.com/subhanbaloch18",                    label: "GitHub" },
  { icon: FiLinkedin, href: "https://www.linkedin.com/in/subhan-ghafoor-49a9802b4", label: "LinkedIn" },
  { icon: FiMail,     href: "mailto:subhanghafoor2006@gmail.com",                   label: "Email" },
];

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 5,
        backgroundColor: "#0a192f",
        borderTop: "1px solid rgba(100,255,218,0.07)",
        padding: "2.5rem 6vw",
        textAlign: "center",
      }}
    >
      {/* Shimmer line at top */}
      <div className="shimmer-line" style={{ marginBottom: "2rem" }} />

      {/* Footer nav */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "1.4rem", flexWrap: "wrap" }}>
        {[
          { label: "GitHub",   href: "https://github.com/subhanbaloch18", external: true },
          { label: "Projects", href: "/#projects",                        external: false },
          { label: "Blog",     href: "/#blog",                            external: false },
          { label: "Resume",   href: "/resume",                           external: false },
        ].map(({ label, href, external }) => (
          external ? (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", fontSize: "0.73rem", color: "#8892b0", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#64ffda")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8892b0")}
            >{label}</a>
          ) : (
            <Link key={label} href={href}
              style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", fontSize: "0.73rem", color: "#8892b0", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#64ffda")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8892b0")}
            >{label}</Link>
          )
        ))}
      </div>

      {/* Social links */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1.4rem", marginBottom: "1.6rem" }}>
        {socials.map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target={label !== "Email" ? "_blank" : undefined}
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.15 }}
            aria-label={label}
            style={{
              color: "#8892b0",
              fontSize: "1.2rem",
              transition: "color 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              border: "1px solid rgba(100,255,218,0.08)",
              background: "rgba(17,34,64,0.4)",
            }}
            onMouseEnter={(e) => {
              const a = e.currentTarget as HTMLAnchorElement;
              a.style.color = "#64ffda";
              a.style.borderColor = "rgba(100,255,218,0.3)";
              a.style.background = "rgba(100,255,218,0.06)";
            }}
            onMouseLeave={(e) => {
              const a = e.currentTarget as HTMLAnchorElement;
              a.style.color = "#8892b0";
              a.style.borderColor = "rgba(100,255,218,0.08)";
              a.style.background = "rgba(17,34,64,0.4)";
            }}
          >
            <Icon />
          </motion.a>
        ))}
      </div>

      {/* Footer text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: "0.78rem",
          color: "#8892b0",
          lineHeight: 1.9,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span>Designed &amp; Built with</span>
          <FiHeart size={12} style={{ color: "#64ffda" }} />
          <span>by</span>
          <span style={{ color: "#64ffda", fontWeight: 600 }}>Subhan Ghafoor</span>
        </div>
        <span style={{ fontSize: "0.7rem", opacity: 0.5 }}>
          © {new Date().getFullYear()} · All rights reserved
        </span>
      </motion.div>
    </footer>
  );
}
