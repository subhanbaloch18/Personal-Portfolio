"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "About",      href: "#about",      number: "01." },
  { name: "Education",  href: "#education",  number: "02." },
  { name: "Hackathons", href: "#hackathons", number: "03." },
  { name: "Skills",     href: "#skills",     number: "04." },
  { name: "Projects",   href: "#projects",   number: "05." },
  { name: "Blog",       href: "#blog",       number: "06." },
  { name: "Contact",    href: "#contact",    number: "07." },
];

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: "0 clamp(1rem, 4vw, 2.5rem)",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: scrolled ? "rgba(10,25,47,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(100,255,218,0.08)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.05 }}
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: "1.4rem",
            fontWeight: 600,
            color: "#64ffda",
            textDecoration: "none",
            border: "1.5px solid #64ffda55",
            borderRadius: "8px",
            padding: "5px 13px",
            letterSpacing: "1px",
            background: "rgba(100,255,218,0.04)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "#64ffda";
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(100,255,218,0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "#64ffda55";
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(100,255,218,0.04)";
          }}
        >
          SG
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ gap: "0.3rem", alignItems: "center" }}>
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <motion.button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.3 }}
                style={{
                  background: isActive ? "rgba(100,255,218,0.08)" : "none",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: "0.8rem",
                  color: isActive ? "#64ffda" : "#8892b0",
                  padding: "6px 14px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color = "#ccd6f6";
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color = "#8892b0";
                    (e.currentTarget as HTMLButtonElement).style.background = "none";
                  }
                }}
              >
                <span style={{ color: "#64ffda", fontSize: "0.72rem", marginRight: "4px" }}>
                  {link.number}
                </span>
                {link.name}
              </motion.button>
            );
          })}

          {/* Hire me status */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            style={{
              marginLeft: "0.4rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: "0.7rem",
              color: "#22c55e",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: "20px",
              padding: "4px 10px",
            }}
          >
            <span className="hire-dot" />
            Available
          </motion.div>

          {/* Resume button */}
          <motion.a
            href="/resume"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              marginLeft: "0.6rem",
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: "0.8rem",
              color: "#64ffda",
              textDecoration: "none",
              border: "1px solid #64ffda",
              borderRadius: "6px",
              padding: "7px 18px",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#64ffda";
              (e.currentTarget as HTMLAnchorElement).style.color = "#0a192f";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "#64ffda";
            }}
          >
            Resume
          </motion.a>

          {/* Theme toggle */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#64ffda", fontSize: "1.5rem", zIndex: 110,
          }}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0,
              width: "min(75vw, 300px)",
              background: "rgba(10,25,47,0.97)",
              backdropFilter: "blur(24px)",
              zIndex: 99,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.6)",
              borderLeft: "1px solid rgba(100,255,218,0.1)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: "1rem", color: "#ccd6f6", textAlign: "center",
                }}
              >
                <div style={{ color: "#64ffda", fontSize: "0.72rem", marginBottom: "2px" }}>
                  {link.number}
                </div>
                {link.name}
              </motion.button>
            ))}

            {/* Resume + theme in drawer */}
            <motion.a
              href="/resume"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.07 }}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                fontSize: "0.9rem", color: "#64ffda",
                textDecoration: "none",
                border: "1px solid #64ffda",
                borderRadius: "6px", padding: "8px 24px",
              }}
            >
              Resume
            </motion.a>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: navLinks.length * 0.07 + 0.07 }}
            >
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 98,
              backdropFilter: "blur(4px)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
