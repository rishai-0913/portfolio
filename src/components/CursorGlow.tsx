"use client";

import { useEffect, useRef } from "react";

const DOT_SPACING = 36;
const DOT_RADIUS = 1.2;
const INFLUENCE_RADIUS = 120;
const DOT_COLOR_BASE = [74, 95, 122]; // #4A5F7A
const DOT_COLOR_ACTIVE = [79, 126, 255]; // #4F7EFF

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = cursorRef.current;
      const cols = Math.ceil(canvas.width / DOT_SPACING) + 1;
      const rows = Math.ceil(canvas.height / DOT_SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const dx = c * DOT_SPACING;
          const dy = r * DOT_SPACING;
          const dist = Math.hypot(dx - mx, dy - my);
          const t = Math.max(0, 1 - dist / INFLUENCE_RADIUS);
          const ease = t * t;

          const cr = Math.round(DOT_COLOR_BASE[0] + (DOT_COLOR_ACTIVE[0] - DOT_COLOR_BASE[0]) * ease);
          const cg = Math.round(DOT_COLOR_BASE[1] + (DOT_COLOR_ACTIVE[1] - DOT_COLOR_BASE[1]) * ease);
          const cb = Math.round(DOT_COLOR_BASE[2] + (DOT_COLOR_ACTIVE[2] - DOT_COLOR_BASE[2]) * ease);
          const alpha = 0.18 + ease * 0.65;
          const radius = DOT_RADIUS + ease * 1.4;

          ctx.beginPath();
          ctx.arc(dx, dy, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
