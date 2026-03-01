"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          title="Back to top"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 200,
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            background: "rgba(10,25,47,0.92)",
            border: "1px solid rgba(100,255,218,0.35)",
            color: "#64ffda",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 4px 24px rgba(100,255,218,0.12), 0 0 0 0 rgba(100,255,218,0.4)",
            transition: "box-shadow 0.3s ease, border-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.boxShadow = "0 0 0 6px rgba(100,255,218,0.1), 0 4px 24px rgba(100,255,218,0.2)";
            btn.style.borderColor = "#64ffda";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.boxShadow = "0 4px 24px rgba(100,255,218,0.12)";
            btn.style.borderColor = "rgba(100,255,218,0.35)";
          }}
        >
          <FiArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
