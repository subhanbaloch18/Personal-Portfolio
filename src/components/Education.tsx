"use client";

import { motion } from "framer-motion";
import { FiBook, FiCalendar, FiMapPin } from "react-icons/fi";

const education = [
  {
    degree: "Bachelor of Science in Cyber Security (BSCY)",
    institution: "Dawood University of Engineering and Technology",
    location: "Karachi, Pakistan",
    period: "2024 — Present",
    description:
      "Pursuing a specialized degree in Cyber Security, covering network security, ethical hacking, cryptography, digital forensics, and secure software development practices.",
    highlights: [
      "Network Security & Protocols",
      "Ethical Hacking & Penetration Testing",
      "Cryptography & Secure Systems",
      "Digital Forensics",
    ],
    icon: "🎓",
    color: "#64ffda",
  },
  {
    degree: "AI, Web Development & Emerging Technologies",
    institution: "GIAIC — Governor's Initiative for AI, Computing & Emerging Technologies",
    location: "Karachi, Pakistan",
    period: "2024 — Present",
    description:
      "Intensive program covering modern AI development, full-stack web development with TypeScript and Next.js, cloud computing, and emerging technologies like physical AI and robotics.",
    highlights: [
      "TypeScript & Next.js",
      "Agentic AI Development",
      "Cloud & Serverless",
      "Physical AI & Robotics",
    ],
    icon: "🤖",
    color: "#0070f3",
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="section-padding"
      style={{
        position: "relative",
        zIndex: 5,
        backgroundColor: "#0d2137",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading" data-number="02.">
          Education
        </h2>
      </motion.div>

      {/* Timeline */}
      <div style={{ position: "relative", maxWidth: "900px" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: "18px",
            top: "0",
            bottom: "0",
            width: "2px",
            backgroundColor: "#233554",
          }}
        />

        {education.map((edu, i) => (
          <motion.div
            key={edu.institution}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            style={{
              position: "relative",
              paddingLeft: "3.5rem",
              marginBottom: i < education.length - 1 ? "3rem" : 0,
            }}
          >
            {/* Timeline dot */}
            <div
              style={{
                position: "absolute",
                left: "6px",
                top: "20px",
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                backgroundColor: "#0a192f",
                border: `2px solid ${edu.color}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                zIndex: 1,
              }}
            >
              <FiBook style={{ color: edu.color, fontSize: "0.75rem" }} />
            </div>

            {/* Card */}
            <motion.div
              whileHover={{
                borderColor: edu.color,
                boxShadow: `0 8px 30px ${edu.color}22`,
                translateY: -4,
              }}
              style={{
                backgroundColor: "#112240",
                border: "1px solid #233554",
                borderRadius: "10px",
                padding: "1.8rem",
                transition: "all 0.3s ease",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {edu.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      fontStyle: "italic",
                      color: "#ccd6f6",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {edu.degree}
                  </h3>
                  <p
                    style={{
                      color: edu.color,
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      fontStyle: "italic",
                    }}
                  >
                    {edu.institution}
                  </p>
                </div>

                {/* Period + Location */}
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      color: "#8892b0",
                      fontSize: "0.82rem",
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      marginBottom: "0.3rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    <FiCalendar />
                    {edu.period}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      color: "#8892b0",
                      fontSize: "0.82rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    <FiMapPin />
                    {edu.location}
                  </div>
                </div>
              </div>

              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#8892b0",
                  lineHeight: 1.8,
                  margin: "1rem 0",
                  fontStyle: "italic",
                }}
              >
                {edu.description}
              </p>

              {/* Highlights */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {edu.highlights.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      fontSize: "0.75rem",
                      color: edu.color,
                      backgroundColor: `${edu.color}15`,
                      border: `1px solid ${edu.color}40`,
                      borderRadius: "4px",
                      padding: "4px 10px",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
