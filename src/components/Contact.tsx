"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheckCircle, FiClock } from "react-icons/fi";

interface FormState { name: string; email: string; message: string; }

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "rgba(17,34,64,0.8)",
  border: "1px solid rgba(100,255,218,0.1)",
  borderRadius: "8px",
  padding: "13px 16px",
  color: "#ccd6f6",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: "0.75rem",
  color: "#64ffda",
  display: "block",
  marginBottom: "0.5rem",
  letterSpacing: "0.02em",
};

function useKarachiClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const str = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(str);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const karachiTime = useKarachiClock();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Try EmailJS if configured, fallback to mailto
      const emailjs = await import("@emailjs/browser").catch(() => null);
      if (emailjs && process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID) {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
            to_name: "Subhan",
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );
      } else {
        await new Promise((res) => setTimeout(res, 600));
        window.open(
          `mailto:subhanghafoor2006@gmail.com?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
          )}`,
          "_blank"
        );
      }
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Something went wrong. Please email me directly.");
    } finally {
      setLoading(false);
    }
  };

  const focusInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(100,255,218,0.45)";
    e.target.style.boxShadow = "0 0 0 3px rgba(100,255,218,0.06)";
  };
  const blurInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(100,255,218,0.1)";
    e.target.style.boxShadow = "none";
  };

  const socials = [
    { icon: FiGithub,   label: "GitHub",   href: "https://github.com/subhanbaloch18",                    value: "github.com/subhanbaloch18" },
    { icon: FiLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/subhan-ghafoor-49a9802b4", value: "linkedin.com/in/subhan-ghafoor" },
    { icon: FiMail,     label: "Email",    href: "mailto:subhanghafoor2006@gmail.com",                   value: "subhanghafoor2006@gmail.com" },
  ];

  return (
    <section
      id="contact"
      className="section-padding"
      style={{ position: "relative", zIndex: 5, backgroundColor: "#0d2137" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading" data-number="06.">Get In Touch</h2>
      </motion.div>

      <div className="contact-grid">
        {/* Left — intro + socials */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p style={{ fontSize: "1rem", color: "#8892b0", lineHeight: 1.9, marginBottom: "1.5rem" }}>
            I&apos;m currently open to new opportunities — whether that&apos;s a{" "}
            <strong style={{ color: "#ccd6f6" }}>freelance project</strong>,{" "}
            <strong style={{ color: "#ccd6f6" }}>internship</strong>, or{" "}
            <strong style={{ color: "#ccd6f6" }}>collaboration</strong>. If you have a
            question or just want to say hello,{" "}
            <span style={{ color: "#64ffda" }}>my inbox is always open!</span>
          </p>

          {/* Live Karachi clock */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            background: "rgba(17,34,64,0.5)",
            border: "1px solid rgba(100,255,218,0.1)",
            borderRadius: "8px",
            padding: "0.6rem 1rem",
            marginBottom: "1.8rem",
          }}>
            <FiClock size={13} style={{ color: "#64ffda" }} />
            <span style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: "0.78rem",
              color: "#8892b0",
            }}>
              Karachi, PKT —
            </span>
            <span style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              fontSize: "0.78rem",
              color: "#64ffda",
              minWidth: "90px",
            }}>
              {karachiTime}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ x: 6 }}
                style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  color: "#8892b0", textDecoration: "none", transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#64ffda")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8892b0")}
              >
                <div style={{
                  width: "40px", height: "40px",
                  background: "rgba(17,34,64,0.7)",
                  border: "1px solid rgba(100,255,218,0.1)",
                  borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1rem", flexShrink: 0,
                  transition: "border-color 0.2s",
                }}>
                  <s.icon />
                </div>
                <div>
                  <div style={{
                    fontSize: "0.7rem",
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    color: "#64ffda", marginBottom: "2px",
                  }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: "0.85rem" }}>{s.value}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: "rgba(17,34,64,0.7)",
                border: "1px solid rgba(100,255,218,0.2)",
                borderRadius: "14px",
                padding: "2.5rem",
                textAlign: "center",
              }}
            >
              <FiCheckCircle style={{ color: "#64ffda", fontSize: "3rem", margin: "0 auto 1rem" }} />
              <h3 style={{ color: "#ccd6f6", fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Message Sent!
              </h3>
              <p style={{ color: "#8892b0", fontSize: "0.9rem" }}>
                Thanks for reaching out.{" "}
                <span style={{ color: "#64ffda" }}>I&apos;ll get back to you soon!</span>
              </p>
              <button
                onClick={() => setSent(false)}
                style={{
                  marginTop: "1.5rem", background: "none",
                  border: "1px solid #64ffda", color: "#64ffda",
                  padding: "10px 24px", borderRadius: "6px", cursor: "pointer",
                  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  fontSize: "0.8rem", transition: "all 0.2s",
                }}
              >
                Send Another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange} required placeholder="John Doe"
                    style={inputStyle} onFocus={focusInput} onBlur={blurInput}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Your Email</label>
                  <input
                    type="email" name="email" value={form.email}
                    onChange={handleChange} required placeholder="john@example.com"
                    style={inputStyle} onFocus={focusInput} onBlur={blurInput}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Your Message</label>
                  <textarea
                    name="message" value={form.message}
                    onChange={handleChange} required rows={5}
                    placeholder="Hello Subhan, I'd like to talk about..."
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={focusInput} onBlur={blurInput}
                  />
                </div>

                {error && (
                  <p style={{
                    color: "#ff6b6b", fontSize: "0.82rem",
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                  }}>
                    {error}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  style={{
                    background: loading ? "rgba(100,255,218,0.06)" : "transparent",
                    border: "1px solid #64ffda",
                    color: "#64ffda",
                    padding: "14px",
                    borderRadius: "8px",
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: "0.88rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    opacity: loading ? 0.6 : 1,
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      (e.currentTarget as HTMLButtonElement).style.background = "#64ffda";
                      (e.currentTarget as HTMLButtonElement).style.color = "#0a192f";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      (e.currentTarget as HTMLButtonElement).style.color = "#64ffda";
                    }
                  }}
                >
                  {loading ? "Sending..." : <><FiSend size={14} /> Send Message</>}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
