"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
  {
    name: "Areeb Tariq",
    role: "Fellow Developer · GIAIC Hackathon I",
    avatar: "AT",
    color: "#64ffda",
    text: "Subhan's ability to architect full-stack solutions under tight hackathon deadlines is genuinely impressive. His TypeScript knowledge and calm problem-solving approach made our entire team perform better. He shipped features faster than anyone I've worked with.",
  },
  {
    name: "Omar Sheikh",
    role: "Senior Developer · Open Source",
    avatar: "OS",
    color: "#0070f3",
    text: "I reviewed Subhan's projects and was blown away by the quality of code from someone at his experience level. His Physical AI project shows real depth of thinking — not just tutorial rehashes, but original architecture decisions. A developer who thinks like an engineer.",
  },
  {
    name: "Fatima Malik",
    role: "CS Student · Dawood University",
    avatar: "FM",
    color: "#a855f7",
    text: "Subhan writes some of the cleanest, most readable code I've seen from any student. He explains complex concepts clearly, helps everyone around him, and consistently ships polished work. His portfolio is proof — every project is production-quality.",
  },
  {
    name: "Hassan Raza",
    role: "Hackathon III Teammate · GIAIC",
    avatar: "HR",
    color: "#f59e0b",
    text: "During our e-commerce hackathon, Subhan took on the hardest TypeScript migration challenges without hesitation. He debugged issues in real-time, kept the team focused, and delivered a working deployed product in under 24 hours. Absolute beast mode.",
  },
];

export default function Testimonials() {
  const [index, setIndex]     = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };
  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % testimonials.length);
  };

  const t = testimonials[index];

  return (
    <section
      id="testimonials"
      className="section-padding"
      style={{ position: "relative", zIndex: 5 }}
    >
      <motion.h2
        className="section-heading"
        data-number="✦"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        What People Say
      </motion.h2>

      <div style={{ maxWidth: "720px" }}>
        {/* Carousel */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{
                background: "rgba(17,34,64,0.6)",
                border: `1px solid ${t.color}22`,
                borderRadius: "16px",
                padding: "2.5rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: `linear-gradient(to right, transparent, ${t.color}88, transparent)`,
              }} />

              {/* Quote mark */}
              <div style={{
                fontSize: "5rem",
                lineHeight: 1,
                color: `${t.color}22`,
                fontFamily: "Georgia, serif",
                position: "absolute",
                top: "1rem",
                left: "2rem",
                userSelect: "none",
              }}>
                &ldquo;
              </div>

              <p style={{
                fontSize: "1rem",
                color: "#ccd6f6",
                lineHeight: 1.85,
                position: "relative",
                zIndex: 1,
                marginBottom: "2rem",
                paddingTop: "1rem",
              }}>
                {t.text}
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${t.color}33, ${t.color}11)`,
                  border: `2px solid ${t.color}55`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: t.color,
                  fontFamily: "var(--font-mono)",
                  flexShrink: 0,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ color: "#ccd6f6", fontWeight: 600, fontSize: "0.95rem" }}>
                    {t.name}
                  </div>
                  <div style={{
                    color: t.color,
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-mono)",
                    opacity: 0.85,
                  }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "1.8rem",
        }}>
          {/* Dots */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                style={{
                  width: i === index ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: i === index ? "#64ffda" : "#233554",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* Arrows */}
          <div style={{ display: "flex", gap: "0.6rem" }}>
            {[
              { fn: prev, icon: FiChevronLeft,  label: "Previous" },
              { fn: next, icon: FiChevronRight, label: "Next" },
            ].map(({ fn, icon: Icon, label }) => (
              <motion.button
                key={label}
                onClick={fn}
                whileHover={{ scale: 1.08, borderColor: "#64ffda" }}
                whileTap={{ scale: 0.92 }}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "rgba(17,34,64,0.7)",
                  border: "1px solid rgba(100,255,218,0.18)",
                  color: "#8892b0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#64ffda")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8892b0")}
                aria-label={label}
              >
                <Icon size={16} />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
