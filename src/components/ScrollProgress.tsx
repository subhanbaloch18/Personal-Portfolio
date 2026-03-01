"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "2.5px",
        width: `${progress}%`,
        background: "linear-gradient(to right, #64ffda, #0070f3, #a855f7)",
        zIndex: 9999,
        transition: "width 0.05s linear",
        boxShadow: "0 0 8px #64ffda88",
        pointerEvents: "none",
      }}
    />
  );
}
