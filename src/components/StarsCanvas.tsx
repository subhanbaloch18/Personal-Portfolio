"use client";

import { useEffect, useRef } from "react";

interface StarNode {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  pulse: number;
  pulseSpeed: number;
  glowing: boolean;
  color: string;
  isHub: boolean;
}

interface PacketPoint {
  x: number; y: number;
}

interface Packet {
  fromIdx: number; toIdx: number;
  t: number; speed: number;
  trail: PacketPoint[];
}

interface WarpLine {
  x1: number; y1: number;
  x2: number; y2: number;
  alpha: number;
}

export default function StarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current.prevX = mouse.current.x;
      mouse.current.prevY = mouse.current.y;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const COLORS = ["#64ffda", "#0070f3", "#a855f7"];
    const HUB_COUNT = 7;
    const REGULAR_COUNT = 70;
    const COUNT = HUB_COUNT + REGULAR_COUNT;

    const nodes: StarNode[] = [];

    // Hub nodes — larger, brighter, colored
    for (let i = 0; i < HUB_COUNT; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 2 + 4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.025 + 0.008,
        glowing: false,
        color: COLORS[i % COLORS.length],
        isHub: true,
      });
    }

    // Regular nodes — small, cyan
    for (let i = 0; i < REGULAR_COUNT; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        glowing: false,
        color: "#64ffda",
        isHub: false,
      });
    }

    const CONNECT_DIST = 150;
    const HUB_CONNECT_DIST = 220;
    const TRAIL_MAX = 12;

    // Data packets
    const packets: Packet[] = [];
    const spawnPacket = () => {
      const from = Math.floor(Math.random() * COUNT);
      let best = -1, bestDist = 9999;
      const range = nodes[from].isHub ? HUB_CONNECT_DIST : CONNECT_DIST;
      nodes.forEach((n, i) => {
        if (i === from) return;
        const d = Math.hypot(n.x - nodes[from].x, n.y - nodes[from].y);
        if (d < range && d < bestDist) { bestDist = d; best = i; }
      });
      if (best !== -1) {
        packets.push({ fromIdx: from, toIdx: best, t: 0, speed: Math.random() * 0.012 + 0.008, trail: [] });
      }
    };
    const packetInterval = setInterval(spawnPacket, 350);

    // Warp lines on fast mouse movement
    const warpLines: WarpLine[] = [];

    // Hex → [r, g, b]
    const hexToRgb = (hex: string): [number, number, number] => [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
    ];

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Mouse warp lines (fast movement)
      const mouseSpeed = Math.hypot(
        mouse.current.x - mouse.current.prevX,
        mouse.current.y - mouse.current.prevY
      );
      if (mouseSpeed > 5 && mouse.current.x > 0) {
        const angle = Math.atan2(
          mouse.current.y - mouse.current.prevY,
          mouse.current.x - mouse.current.prevX
        );
        const len = mouseSpeed * 5;
        warpLines.push({
          x1: mouse.current.x - Math.cos(angle) * len,
          y1: mouse.current.y - Math.sin(angle) * len,
          x2: mouse.current.x,
          y2: mouse.current.y,
          alpha: 0.6,
        });
      }

      // Draw + fade warp lines
      for (let i = warpLines.length - 1; i >= 0; i--) {
        const wl = warpLines[i];
        wl.alpha -= 0.04;
        if (wl.alpha <= 0) { warpLines.splice(i, 1); continue; }
        const wg = ctx.createLinearGradient(wl.x1, wl.y1, wl.x2, wl.y2);
        wg.addColorStop(0, "rgba(100,255,218,0)");
        wg.addColorStop(1, `rgba(100,255,218,${wl.alpha.toFixed(2)})`);
        ctx.beginPath();
        ctx.moveTo(wl.x1, wl.y1);
        ctx.lineTo(wl.x2, wl.y2);
        ctx.strokeStyle = wg;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Update nodes — spring-based mouse repulsion
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.pulse += n.pulseSpeed;

        const dx = n.x - mouse.current.x;
        const dy = n.y - mouse.current.y;
        const dist = Math.hypot(dx, dy);
        const repulseRange = n.isHub ? 140 : 100;

        if (dist < repulseRange && dist > 0) {
          // Spring: accumulate target velocity, blend toward it
          const force = (repulseRange - dist) / repulseRange;
          const targetVx = (dx / dist) * force * 2.5;
          const targetVy = (dy / dist) * force * 2.5;
          n.vx += (targetVx - n.vx) * 0.15;
          n.vy += (targetVy - n.vy) * 0.15;
          n.glowing = true;
        } else {
          n.glowing = false;
        }

        // Velocity damping
        n.vx *= 0.97; n.vy *= 0.97;
      });

      // Draw connections
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const ni = nodes[i], nj = nodes[j];
          const dx = ni.x - nj.x;
          const dy = ni.y - nj.y;
          const d = Math.hypot(dx, dy);
          const isHubConn = ni.isHub || nj.isHub;
          const maxDist = isHubConn ? HUB_CONNECT_DIST : CONNECT_DIST;

          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * (isHubConn ? 0.5 : 0.35);
            if (isHubConn) {
              // Gradient connection for hub nodes
              const hubNode = ni.isHub ? ni : nj;
              const [r, g, b] = hexToRgb(hubNode.color);
              const grad = ctx.createLinearGradient(ni.x, ni.y, nj.x, nj.y);
              grad.addColorStop(0, `rgba(${r},${g},${b},${alpha.toFixed(2)})`);
              grad.addColorStop(1, `rgba(100,255,218,${(alpha * 0.5).toFixed(2)})`);
              ctx.beginPath();
              ctx.moveTo(ni.x, ni.y);
              ctx.lineTo(nj.x, nj.y);
              ctx.strokeStyle = grad;
              ctx.lineWidth = 1.2;
              ctx.stroke();
            } else {
              ctx.beginPath();
              ctx.moveTo(ni.x, ni.y);
              ctx.lineTo(nj.x, nj.y);
              ctx.strokeStyle = `rgba(100,255,218,${alpha.toFixed(2)})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      // Draw data packets with 12-point trails
      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k];
        p.t += p.speed;
        if (p.t >= 1) { packets.splice(k, 1); continue; }

        const from = nodes[p.fromIdx], to = nodes[p.toIdx];
        const px = from.x + (to.x - from.x) * p.t;
        const py = from.y + (to.y - from.y) * p.t;

        p.trail.push({ x: px, y: py });
        if (p.trail.length > TRAIL_MAX) p.trail.shift();

        // Trail
        p.trail.forEach((pt, i) => {
          const trailAlpha = (i / p.trail.length) * 0.7;
          const trailSize = 0.5 + (i / p.trail.length) * 2;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, trailSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100,255,218,${trailAlpha.toFixed(2)})`;
          ctx.fill();
        });

        // Packet head
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#64ffda";
        ctx.shadowColor = "#64ffda";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      nodes.forEach((n) => {
        const glow = (Math.sin(n.pulse) + 1) / 2;
        const alpha = 0.4 + glow * 0.5;
        const radius = n.r + glow * (n.isHub ? 2.5 : 1.2);
        const [r, g, b] = hexToRgb(n.color);

        if (n.isHub) {
          // Outer ring glow
          const ringSize = radius * 2.8;
          const ringGrad = ctx.createRadialGradient(n.x, n.y, radius, n.x, n.y, ringSize);
          ringGrad.addColorStop(0, `rgba(${r},${g},${b},${(0.2 + glow * 0.15).toFixed(2)})`);
          ringGrad.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, ringSize, 0, Math.PI * 2);
          ctx.fillStyle = ringGrad;
          ctx.fill();

          // Hub ring stroke
          ctx.beginPath();
          ctx.arc(n.x, n.y, radius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r},${g},${b},${(0.3 + glow * 0.3).toFixed(2)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        if (n.glowing) {
          ctx.shadowColor = n.color;
          ctx.shadowBlur = n.isHub ? 20 : 14;
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(2)})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(packetInterval);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.75,
      }}
    />
  );
}
