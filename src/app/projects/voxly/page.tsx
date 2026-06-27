"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const APK =
  "https://expo.dev/accounts/rishai_0913/projects/voxly/builds/58850188-b80d-49d2-bf3f-8b0d28cbac02";

const STEPS = [
  {
    n: "01",
    title: "Record",
    desc: "Hit record and speak freely for up to 5 minutes. Don't worry about structure or filler words — Voxly handles the mess.",
    icon: (
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
    ),
  },
  {
    n: "02",
    title: "Transcribe",
    desc: "Groq Whisper converts speech to text in under 2 seconds with near-perfect accuracy that understands context and accents.",
    icon: (
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    ),
  },
  {
    n: "03",
    title: "Summarise",
    desc: "LLaMA 3.3 structures your transcript into a clean summary, key points, and extracted action items — ready to share.",
    icon: (
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
    ),
  },
];

const FEATURES = [
  {
    title: "One-Tap Capture",
    desc: "Start recording instantly from the widget or shortcut. Never lose a fleeting thought again.",
    icon: <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />,
  },
  {
    title: "Live Waveform",
    desc: "Visualise your audio as you record — silence and emphasis at a glance.",
    icon: <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />,
  },
  {
    title: "AI Formatting",
    desc: "Detects lists, priorities, and structure automatically from natural speech patterns.",
    icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  },
  {
    title: "Action Extraction",
    desc: "Tasks are pulled out automatically and ready to export to any to-do app.",
    icon: <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />,
  },
  {
    title: "Smart Tagging",
    desc: "Notes auto-categorise into Meeting, Idea, or Journal based on content context.",
    icon: <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z" />,
  },
  {
    title: "Offline Cache",
    desc: "Record without a connection. Notes sync and process the moment you're back online.",
    icon: <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />,
  },
];

export default function VoxlyPage() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const heroWfRef = useRef<HTMLCanvasElement>(null);
  const showWfRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const [secs, setSecs] = useState(42);

  const hiwRef = useRef(null);
  const featRef = useRef(null);
  const showRef = useRef(null);
  const footRef = useRef(null);
  const hiwIn = useInView(hiwRef, { once: true, margin: "-80px 0px" });
  const featIn = useInView(featRef, { once: true, margin: "-80px 0px" });
  const showIn = useInView(showRef, { once: true, margin: "-80px 0px" });
  const footIn = useInView(footRef, { once: true, margin: "-80px 0px" });

  // Waveform
  useEffect(() => {
    function startWf(canvas: HTMLCanvasElement | null, bars: number) {
      if (!canvas) return () => {};
      const ctx = canvas.getContext("2d")!;
      const phases = Array.from({ length: bars }, (_, i) => i * ((Math.PI * 2) / bars) + Math.random() * 0.8);
      const speeds = Array.from({ length: bars }, () => 0.7 + Math.random() * 0.7);
      let id: number;
      let lw = 0, lh = 0;
      function draw(ts: number) {
        const w = canvas!.clientWidth || canvas!.width;
        const h = canvas!.clientHeight || canvas!.height;
        if (w !== lw || h !== lh) { canvas!.width = w; canvas!.height = h; lw = w; lh = h; }
        ctx.clearRect(0, 0, w, h);
        const bw = Math.max(4, Math.floor(w / (bars * 1.9)));
        const gap = Math.ceil(bw * 0.7);
        const tot = bars * (bw + gap) - gap;
        const sx = (w - tot) / 2;
        const t = ts * 0.001;
        for (let i = 0; i < bars; i++) {
          const frac = 0.1 + Math.abs(Math.sin(t * speeds[i] + phases[i])) * 0.85;
          const bh = h * frac;
          const x = sx + i * (bw + gap);
          const y = (h - bh) / 2;
          const g = ctx.createLinearGradient(x, y, x, y + bh);
          g.addColorStop(0, "#A48BFF");
          g.addColorStop(1, "#7B5CFA");
          ctx.fillStyle = g;
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(x, y, bw, bh, bw / 2);
          else { ctx.rect(x, y, bw, bh); }
          ctx.fill();
        }
        id = requestAnimationFrame(draw);
      }
      id = requestAnimationFrame(draw);
      return () => cancelAnimationFrame(id);
    }
    const c1 = startWf(heroWfRef.current, 7);
    const c2 = startWf(showWfRef.current, 7);
    return () => { c1(); c2(); };
  }, []);

  // Particles
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    type Pt = { x: number; y: number; r: number; vx: number; vy: number; a: number };
    let pts: Pt[] = [];
    let id: number;
    function init() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      pts = Array.from({ length: 24 }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        r: 0.8 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        a: 0.15 + Math.random() * 0.35,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(123,92,250,${p.a})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas!.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas!.height) p.vy *= -1;
      });
      id = requestAnimationFrame(draw);
    }
    init(); draw();
    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", onResize); };
  }, []);

  // Mouse parallax
  useEffect(() => {
    const phone = phoneRef.current;
    if (!phone) return;
    let tx = -17, ty = 4, cx = -17, cy = 4;
    let id: number;
    const onMove = (e: MouseEvent) => {
      tx = -17 + (e.clientX / window.innerWidth - 0.5) * 14;
      ty = 4 - (e.clientY / window.innerHeight - 0.5) * 9;
    };
    function tick() {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      if (phone) phone.style.transform = `rotateY(${cx}deg) rotateX(${cy}deg)`;
      id = requestAnimationFrame(tick);
    }
    window.addEventListener("mousemove", onMove);
    tick();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(id); };
  }, []);

  // Timer
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const },
  });

  return (
    <div
      style={{
        background: "#07090F",
        color: "#D4E4FA",
        minHeight: "100vh",
        fontFamily: "system-ui,-apple-system,'Segoe UI',sans-serif",
        overflowX: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{`
        @keyframes phoneFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        @keyframes recBlink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes rpulse{0%{transform:scale(.7);opacity:.8}100%{transform:scale(1.15);opacity:0}}
        @keyframes orbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-28px)}}
        @keyframes bdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
        @keyframes spPulse{0%,100%{box-shadow:0 0 24px rgba(123,92,250,.5)}50%{box-shadow:0 0 44px rgba(123,92,250,.85)}}
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
      `}</style>

      {/* BG orbs + dot grid */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 500, height: 500, top: -160, left: -160, borderRadius: "50%", background: "#7B5CFA", filter: "blur(120px)", opacity: 0.07, animation: "orbFloat 9s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 600, height: 600, bottom: -200, right: -180, borderRadius: "50%", background: "#7B5CFA", filter: "blur(120px)", opacity: 0.07, animation: "orbFloat 9s ease-in-out infinite", animationDelay: "-4.5s" }} />
        <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(rgba(164,185,220,0.055) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
      </div>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 68, background: "rgba(7,9,15,.9)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/#projects" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "rgba(164,185,220,.45)", textDecoration: "none", padding: "6px 10px 6px 6px", borderRadius: 8, border: "1px solid rgba(255,255,255,.06)", background: "rgba(255,255,255,.03)", transition: "color .2s,border-color .2s" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            Portfolio
          </Link>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#A48BFF", letterSpacing: "-0.02em" }}>Voxly</span>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {[["Features", "#features"], ["How It Works", "#how-it-works"], ["Preview", "#showcase"]].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: 13, fontWeight: 500, color: "rgba(164,185,220,.5)", textDecoration: "none" }}>{label}</a>
          ))}
        </div>
        <a href={APK} target="_blank" rel="noopener noreferrer" style={{ background: "#7B5CFA", color: "#fff", fontSize: 13, fontWeight: 600, padding: "9px 22px", borderRadius: 999, textDecoration: "none", boxShadow: "0 0 20px rgba(123,92,250,.35)" }}>
          Download APK
        </a>
      </nav>

      <main style={{ position: "relative", zIndex: 1, paddingTop: 68 }}>

        {/* HERO */}
        <section style={{ minHeight: "calc(100vh - 68px)", maxWidth: 1200, margin: "0 auto", padding: "64px 48px", display: "flex", alignItems: "center", gap: 40 }}>
          {/* Left */}
          <div style={{ flex: "0 0 54%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <motion.div {...fadeUp(0)}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", border: "1px solid rgba(123,92,250,.38)", background: "rgba(123,92,250,.08)", borderRadius: 999, fontSize: 11, fontWeight: 700, color: "#A48BFF", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 28, backdropFilter: "blur(8px)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7B5CFA", animation: "bdot 1.6s ease-in-out infinite", display: "inline-block" }} />
                Powered by Groq AI
              </div>
            </motion.div>

            <motion.h1 {...fadeUp(0.07)} style={{ fontSize: "clamp(52px,6.5vw,82px)", fontWeight: 900, lineHeight: 1.01, letterSpacing: "-0.035em", color: "#fff", marginBottom: 22, display: "flex", flexDirection: "column", gap: "0.08em" }}>
              <span style={{ color: "rgba(255,255,255,.4)" }}>Speak.</span>
              <span style={{ color: "rgba(255,255,255,.7)" }}>Think.</span>
              <span style={{ color: "#fff", textShadow: "0 0 40px rgba(123,92,250,.65),0 0 80px rgba(123,92,250,.25)" }}>Done.</span>
            </motion.h1>

            <motion.p {...fadeUp(0.14)} style={{ fontSize: 17, color: "rgba(164,185,220,.55)", maxWidth: 440, marginBottom: 36, lineHeight: 1.7 }}>
              Transform voice recordings into structured summaries, key points, and action items — instantly. Zero typing required.
            </motion.p>

            <motion.div {...fadeUp(0.2)} style={{ display: "flex", gap: 12, marginBottom: 44, flexWrap: "wrap" }}>
              <a href={APK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#7B5CFA", color: "#fff", padding: "13px 26px", borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 0 28px rgba(123,92,250,.38)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16l-4-4h3V4h2v8h3l-4 4zm-6 4v-2h12v2H6z" /></svg>
                Download APK
              </a>
              <a href="#how-it-works" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#D4E4FA", padding: "13px 26px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,.07)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                How It Works
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.26)} style={{ display: "flex", alignItems: "center", gap: 28, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.07)", maxWidth: 400 }}>
              {[["10k+", "Notes Created"], ["<2s", "Processing"], ["Free", "No Subscription"]].map(([n, l], i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>{n}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(164,185,220,.5)", textTransform: "uppercase", letterSpacing: ".06em", marginTop: 2 }}>{l}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D phone */}
          <div style={{ flex: "0 0 46%", height: 600, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <canvas ref={particlesRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} />
            <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(123,92,250,.22) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
            <motion.div style={{ perspective: 1400, zIndex: 2, animation: "phoneFloat 7s ease-in-out infinite" }}>
              <div
                ref={phoneRef}
                style={{
                  width: 248, height: 516,
                  borderRadius: 46,
                  background: "linear-gradient(155deg,#242836 0%,#131620 100%)",
                  border: "1.5px solid rgba(255,255,255,.12)",
                  transformStyle: "preserve-3d",
                  position: "relative",
                  boxShadow: "38px 48px 96px rgba(0,0,0,.78),0 0 70px rgba(123,92,250,.16),inset 0 1px 0 rgba(255,255,255,.07)",
                }}
              >
                {/* side buttons */}
                <div style={{ position: "absolute", right: -3, top: 112, width: 3, height: 56, background: "#1c1f2c", borderRadius: "0 2px 2px 0" }} />
                <div style={{ position: "absolute", left: -3, top: 92, width: 3, height: 38, background: "#1c1f2c", borderRadius: "2px 0 0 2px", boxShadow: "0 52px 0 #1c1f2c" }} />
                {/* screen */}
                <div style={{ position: "absolute", inset: 10, borderRadius: 36, background: "#06070d", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 84, height: 22, background: "#000", borderRadius: "0 0 14px 14px", flexShrink: 0, marginBottom: 10 }} />
                  <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "6px 16px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: "rgba(212,228,250,.6)", marginBottom: 4 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f04444", animation: "recBlink 1s step-end infinite", display: "inline-block" }} />
                      Recording…
                    </div>
                    <div style={{ fontSize: 30, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums", marginBottom: 10 }}>{fmt(secs)}</div>
                    <canvas ref={heroWfRef} style={{ width: "100%", height: 60, marginBottom: 14 }} />
                    <div style={{ position: "relative", width: 68, height: 68, marginBottom: 14 }}>
                      <div style={{ position: "absolute", inset: -12, border: "1.5px solid rgba(123,92,250,.32)", borderRadius: "50%", animation: "rpulse 2.4s ease-out infinite" }} />
                      <div style={{ position: "absolute", inset: -22, border: "1.5px solid rgba(123,92,250,.32)", borderRadius: "50%", animation: "rpulse 2.4s ease-out infinite", animationDelay: ".8s" }} />
                      <div style={{ width: 68, height: 68, borderRadius: "50%", background: "radial-gradient(circle at 38% 36%,#9b7dff,#7B5CFA)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 28px rgba(123,92,250,.55)", position: "relative", zIndex: 1 }}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" /></svg>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 5, width: "100%", justifyContent: "center" }}>
                      {[["Record ✓", "done"], ["Transcribing…", "active"], ["Summarise", ""]].map(([label, state]) => (
                        <span key={label} style={{ fontSize: 8.5, fontWeight: 700, padding: "3px 7px", borderRadius: 999, whiteSpace: "nowrap", background: state === "done" ? "rgba(34,216,122,.1)" : state === "active" ? "rgba(123,92,250,.18)" : "rgba(255,255,255,.04)", color: state === "done" ? "#22D87A" : state === "active" ? "#A48BFF" : "rgba(212,228,250,.4)", border: `1px solid ${state === "done" ? "rgba(34,216,122,.3)" : state === "active" ? "rgba(123,92,250,.38)" : "rgba(255,255,255,.07)"}` }}>
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" ref={hiwRef} style={{ background: "rgba(15,19,32,.92)", padding: "96px 48px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 22 }} animate={hiwIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#A48BFF", marginBottom: 14 }}>The Process</div>
              <h2 style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.12 }}>Three steps. Zero effort.</h2>
              <p style={{ fontSize: 16, color: "rgba(164,185,220,.5)", maxWidth: 440, margin: "14px auto 0", lineHeight: 1.7 }}>The fastest path from scattered thoughts to actionable intelligence.</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28, position: "relative" }}>
              <svg style={{ position: "absolute", top: 52, left: "calc(33.3% - 10px)", right: "calc(33.3% - 10px)", width: "calc(33.3% + 20px)", height: 2, overflow: "visible", pointerEvents: "none" }} viewBox="0 0 600 2" preserveAspectRatio="none">
                <path d="M0 1 Q150 -8 300 1 T600 1" fill="none" stroke="rgba(123,92,250,.28)" strokeWidth="1.5" strokeDasharray="6 5">
                  <animate attributeName="stroke-dashoffset" from="0" to="-22" dur="1.4s" repeatCount="indefinite" />
                </path>
              </svg>
              {STEPS.map((s, i) => (
                <motion.div key={s.n} initial={{ opacity: 0, y: 22 }} animate={hiwIn ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.55 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(0,0,0,.4),0 0 30px rgba(123,92,250,.12)" }}
                  style={{ background: "rgba(23,27,46,.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.07)", borderTop: "2px solid rgba(123,92,250,.3)", borderRadius: 20, padding: "32px 24px", position: "relative", overflow: "hidden", marginTop: i === 1 ? 48 : i === 2 ? 96 : 0, transition: "border-top-color .28s", cursor: "default" }}>
                  <div style={{ position: "absolute", top: -8, right: 10, fontSize: 96, fontWeight: 900, color: "rgba(255,255,255,.04)", lineHeight: 1, letterSpacing: "-0.05em", pointerEvents: "none", userSelect: "none" }}>{s.n}</div>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(123,92,250,.14)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="#A48BFF">{s.icon}</svg>
                  </div>
                  <div style={{ fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.01em" }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "rgba(164,185,220,.5)", lineHeight: 1.7 }}>{s.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" ref={featRef} style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 48px" }}>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={featIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#A48BFF", marginBottom: 14 }}>Capabilities</div>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
              Everything you need.<br />
              <span style={{ color: "rgba(164,185,220,.5)" }}>Nothing you don&apos;t.</span>
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 22 }} animate={featIn ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07, duration: 0.55 }}
                whileHover={{ y: -3, background: "rgba(255,255,255,.03)" }}
                style={{ background: "rgba(23,27,46,.55)", border: "1px solid rgba(255,255,255,.07)", borderLeft: "3px solid rgba(123,92,250,.35)", borderRadius: 20, padding: "22px 20px", transition: "background .2s,border-left-color .2s", cursor: "default" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#7B5CFA">{f.icon}</svg>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "14px 0 6px" }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "rgba(164,185,220,.5)", lineHeight: 1.65 }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SHOWCASE */}
        <section id="showcase" ref={showRef} style={{ padding: "96px 48px", background: "linear-gradient(to bottom,transparent,rgba(12,16,32,.35))", overflow: "hidden" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
            <motion.h2 initial={{ opacity: 0, y: 22 }} animate={showIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.025em", marginBottom: 60 }}>
              Experience the flow
            </motion.h2>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={showIn ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 0.65 }}
              style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, perspective: 1600, minHeight: 440 }}
              className="phones-showcase-row">
              {/* Phone 1 — Notes */}
              <motion.div whileHover={{ rotateY: 5 }} style={{ transform: "rotateY(22deg) scale(.83)", transformStyle: "preserve-3d", transition: "transform .4s cubic-bezier(.34,1.56,.64,1)", zIndex: 2 }}>
                <div style={{ width: 190, height: 400, borderRadius: 34, border: "1.5px solid rgba(255,255,255,.1)", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.6)", position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, background: "#060810", display: "flex", flexDirection: "column" }}>
                    <div style={{ padding: "10px 12px 5px", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: ".08em", textTransform: "uppercase" }}>My Notes</div>
                    <div style={{ padding: "0 10px", flex: 1 }}>
                      {[["Q3 Planning Meeting","Today · 3 tasks"],["Product Ideas","Yesterday · 7 points"],["Weekly Review","Mon · Summary ready"],["Client Call","Sun · 5 tasks"]].map(([t,m]) => (
                        <div key={t} style={{ background: "rgba(255,255,255,.04)", borderRadius: 9, borderLeft: "2px solid #7B5CFA", padding: "8px 10px", marginBottom: 7 }}>
                          <div style={{ fontSize: 8.5, fontWeight: 700, color: "rgba(255,255,255,.82)", marginBottom: 2 }}>{t}</div>
                          <div style={{ fontSize: 7.5, color: "rgba(255,255,255,.3)" }}>{m}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Phone 2 — Recording (center) */}
              <motion.div style={{ transform: "scale(1.12)", transformStyle: "preserve-3d", zIndex: 3 }}>
                <div style={{ width: 190, height: 400, borderRadius: 34, border: "1.5px solid rgba(255,255,255,.1)", overflow: "hidden", boxShadow: "0 0 50px rgba(123,92,250,.28),0 24px 60px rgba(0,0,0,.7)", position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, background: "#060810", display: "flex", flexDirection: "column" }}>
                    <div style={{ padding: "10px 12px 5px", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: ".08em", textTransform: "uppercase" }}>● Recording</div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 10 }}>
                      <div style={{ fontSize: 30, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums", marginBottom: 10 }}>1:24</div>
                      <canvas ref={showWfRef} style={{ width: "100%", height: 44, marginBottom: 14 }} />
                      <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#7B5CFA", display: "flex", alignItems: "center", justifyContent: "center", animation: "spPulse 2s ease-in-out infinite" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Phone 3 — Summary */}
              <motion.div whileHover={{ rotateY: -5 }} style={{ transform: "rotateY(-22deg) scale(.83)", transformStyle: "preserve-3d", transition: "transform .4s cubic-bezier(.34,1.56,.64,1)", zIndex: 2 }}>
                <div style={{ width: 190, height: 400, borderRadius: 34, border: "1.5px solid rgba(255,255,255,.1)", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.6)", position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, background: "#060810", display: "flex", flexDirection: "column" }}>
                    <div style={{ padding: "10px 12px 5px", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: ".08em", textTransform: "uppercase" }}>AI Summary</div>
                    <div style={{ padding: "0 10px", flex: 1, overflow: "hidden" }}>
                      <div style={{ fontSize: 8, color: "rgba(255,255,255,.65)", lineHeight: 1.6, marginBottom: 8 }}>Discussed Q3 roadmap and prioritised the API refactor. New hire starting Monday.</div>
                      <div style={{ fontSize: 7.5, fontWeight: 700, color: "#A48BFF", marginBottom: 5, textTransform: "uppercase", letterSpacing: ".06em" }}>Action Items</div>
                      {["Finish auth module by Friday","Schedule design review","Send onboarding docs"].map(t => (
                        <div key={t} style={{ display: "flex", gap: 4, fontSize: 7.5, color: "rgba(255,255,255,.55)", marginBottom: 4, lineHeight: 1.4 }}>
                          <span style={{ color: "#7B5CFA", fontWeight: 700, flexShrink: 0 }}>→</span>{t}
                        </div>
                      ))}
                      <div style={{ fontSize: 7.5, fontWeight: 700, color: "#A48BFF", margin: "9px 0 5px", textTransform: "uppercase", letterSpacing: ".06em" }}>Key Points</div>
                      {["API refactor: July 15","Budget approved for Q3"].map(t => (
                        <div key={t} style={{ display: "flex", gap: 4, fontSize: 7.5, color: "rgba(255,255,255,.55)", marginBottom: 4, lineHeight: 1.4 }}>
                          <span style={{ color: "#7B5CFA", fontWeight: 700, flexShrink: 0 }}>→</span>{t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* FOOTER / CTA */}
      <footer ref={footRef} style={{ background: "#030509", borderTop: "1px solid rgba(255,255,255,.05)", padding: "96px 48px 48px", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 22 }} animate={footIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontSize: "clamp(36px,5.5vw,58px)", fontWeight: 900, color: "#fff", lineHeight: 1.06, letterSpacing: "-0.035em", marginBottom: 14 }}>
            Stop typing.<br />
            <span style={{ color: "#A48BFF", textShadow: "0 0 30px rgba(123,92,250,.45)" }}>Start speaking.</span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(164,185,220,.5)", marginBottom: 32 }}>
            Free download. No account. No subscription.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <motion.a href={APK} target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -3, boxShadow: "0 0 56px rgba(123,92,250,.6)" }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#7B5CFA", color: "#fff", padding: "16px 34px", borderRadius: 999, fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: "0 0 36px rgba(123,92,250,.42)", marginBottom: 4 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16l-4-4h3V4h2v8h3l-4 4zm-6 4v-2h12v2H6z" /></svg>
              Download APK
            </motion.a>
            <div style={{ fontSize: 12, color: "rgba(164,185,220,.5)", display: "flex", alignItems: "center", gap: 8, opacity: 0.7 }}>
              Free
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
              No subscription
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
              Android 10+
            </div>
          </div>
        </motion.div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", paddingTop: 28, maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: "#A48BFF" }}>Voxly</span>
          <div style={{ display: "flex", gap: 22 }}>
            {["Privacy", "Terms", "Support"].map(l => (
              <a key={l} href="#" style={{ fontSize: 12, color: "rgba(164,185,220,.5)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <span style={{ fontSize: 11, color: "rgba(164,185,220,.5)", opacity: 0.45 }}>© 2025 Voxly AI</span>
        </div>
      </footer>
    </div>
  );
}
