"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  alpha: number;
  size: number;
  color: string;
}

const TRAIL_COLORS = ["#64ffda", "#0070f3", "#a855f7"];

export default function Cursor() {
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let animId: number;
    const particles: Particle[] = [];
    let frameCount = 0;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas) {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const onResize = () => {
      if (canvas) {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", onResize);

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Spawn particle every 2 frames
      if (frameCount % 2 === 0) {
        particles.push({
          x: mouseX,
          y: mouseY,
          alpha: 0.65,
          size: Math.random() * 3 + 1.5,
          color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)],
        });
        if (particles.length > 60) particles.shift();
      }
    };

    const onEnterLink = () => {
      if (ringRef.current) {
        ringRef.current.style.transform  = "translate(-50%, -50%) scale(2.4)";
        ringRef.current.style.borderColor = "rgba(100,255,218,0.7)";
        ringRef.current.style.background  = "rgba(100,255,218,0.06)";
        ringRef.current.style.borderWidth = "1px";
      }
      if (dotRef.current) dotRef.current.style.opacity = "0.5";
    };

    const onLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.transform  = "translate(-50%, -50%) scale(1)";
        ringRef.current.style.borderColor = "rgba(100,255,218,0.45)";
        ringRef.current.style.background  = "transparent";
        ringRef.current.style.borderWidth = "1.5px";
      }
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    const animate = () => {
      frameCount++;

      // Update dot
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top  = `${mouseY}px`;
      }

      // Lerp ring
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top  = `${ringY}px`;
      }

      // Draw particles
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.alpha -= 0.025;
          p.size  *= 0.96;
          if (p.alpha <= 0) { particles.splice(i, 1); continue; }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, "0");
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    document.addEventListener("mousemove", onMove);

    const addListeners = () => {
      const interactive = document.querySelectorAll("a, button, [role='button'], input, textarea");
      interactive.forEach((el) => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
      return interactive;
    };

    const interactive = addListeners();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Particle trail canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9997,
        }}
      />

      {/* Precise dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          backgroundColor: "#64ffda",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 8px #64ffda, 0 0 18px #64ffda66",
          transition: "opacity 0.2s",
        }}
      />

      {/* Lagging ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          border: "1.5px solid rgba(100,255,218,0.45)",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%) scale(1)",
          transition: "transform 0.22s ease, border-color 0.22s, background 0.22s, border-width 0.22s",
        }}
      />
    </>
  );
}
