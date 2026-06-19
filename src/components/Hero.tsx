"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/lib/icons";

const roles = ["Full Stack Developer", "NLP Engineer", "AI Specialist", "LLM Engineer"];
const skills = ["Python", "React", "FastAPI", "LLMs", "Docker", "NLP", "LangChain", "Rasa"];
const availableFor = ["Chatbot Dev", "LLM Integration", "NLP Pipelines", "Full Stack Apps"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = words[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, words]);

  return (
    <span className="gradient-text">
      {displayed}
      <span className="animate-pulse text-[#4F7EFF]">|</span>
    </span>
  );
}

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-[#4F7EFF]/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-[#06C8DA]/6 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(79,126,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(79,126,255,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* left */}
        <div className="flex flex-col gap-6">
          <motion.div custom={0} initial="hidden" animate="show" variants={fadeUp} className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#22D87A] bg-[#22D87A]/10 border border-[#22D87A]/20 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#22D87A] rounded-full animate-pulse" />
              Open for Work
            </span>
            <span className="text-xs text-[#7A90B0] font-mono bg-[#0C1525] border border-[#1A2A42] px-3 py-1.5 rounded-full">
              3+ Years Experience · Open to Remote
            </span>
          </motion.div>

          <motion.h1
            custom={1} initial="hidden" animate="show" variants={fadeUp}
            className="text-5xl lg:text-6xl xl:text-7xl font-[family-name:var(--font-display)] font-extrabold leading-[1.05] tracking-tight"
          >
            I&apos;m a{" "}
            <br />
            <Typewriter words={roles} />
          </motion.h1>

          <motion.p custom={2} initial="hidden" animate="show" variants={fadeUp} className="text-[#7A90B0] text-lg leading-relaxed max-w-lg">
            Building intelligent AI solutions and full-stack applications — from NLP pipelines and LLM integrations to scalable web apps. Fast delivery, production-ready code.
          </motion.p>

          <motion.div custom={3} initial="hidden" animate="show" variants={fadeUp} className="flex flex-wrap gap-3">
            <button onClick={() => scrollTo("contact")} className="btn-primary group">
              Hire Me <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => scrollTo("projects")} className="btn-ghost">
              View My Work
            </button>
          </motion.div>

          <motion.div custom={4} initial="hidden" animate="show" variants={fadeUp} className="flex flex-wrap gap-6 pt-2 text-sm text-[#7A90B0]">
            {[
              { icon: "⚡", label: "3+ Years Experience" },
              { icon: "🎓", label: "B.Tech in AI" },
              { icon: "🌍", label: "Available Remotely" },
              { icon: "✅", label: "10+ Projects Delivered" },
            ].map((item) => (
              <span key={item.label} className="flex items-center gap-1.5 font-medium hover:text-[#EEF4FF] transition-colors cursor-default">
                <span>{item.icon}</span> {item.label}
              </span>
            ))}
          </motion.div>

          <motion.div custom={5} initial="hidden" animate="show" variants={fadeUp} className="flex gap-3 pt-1">
            <a href="https://github.com/rishai-0913" target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#0C1525] border border-[#1A2A42] text-[#7A90B0] hover:text-[#EEF4FF] hover:border-[#4F7EFF]/50 hover:bg-[#4F7EFF]/10 transition-all duration-200">
              <GitHubIcon size={18} />
            </a>
            <a href="https://linkedin.com/in/rishabh-sharma-040725221" target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#0C1525] border border-[#1A2A42] text-[#7A90B0] hover:text-[#4F7EFF] hover:border-[#4F7EFF]/50 hover:bg-[#4F7EFF]/10 transition-all duration-200">
              <LinkedInIcon size={18} />
            </a>
          </motion.div>
        </div>

        {/* right — terminal */}
        <motion.div custom={2} initial="hidden" animate="show" variants={fadeUp} className="hidden lg:block">
          <div className="rounded-2xl border border-[#1A2A42] bg-[#0C1525] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)] hover:border-[#4F7EFF]/40 hover:shadow-[0_20px_80px_rgba(79,126,255,0.1)] transition-all duration-500">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1A2A42] bg-[#080F1E]">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-xs text-[#4A5F7A] font-mono">rishabh@dev ~ profile.py</span>
            </div>

            <div className="p-6 font-mono text-sm leading-relaxed">
              <div className="text-[#4A5F7A] mb-1"># Rishabh Sharma — Full Stack Dev & NLP Engineer</div>
              <div className="text-[#4A5F7A] mb-4">──────────────────────────────────────────────</div>

              <div className="mb-4">
                <span className="text-[#06C8DA]">skills</span>
                <span className="text-[#7A90B0]"> = [</span>
                <div className="ml-4 flex flex-wrap gap-1 mt-1">
                  {skills.map((s, i) => (
                    <span key={s}>
                      <span className="text-[#4F7EFF]">&quot;{s}&quot;</span>
                      {i < skills.length - 1 && <span className="text-[#7A90B0]">, </span>}
                    </span>
                  ))}
                </div>
                <span className="text-[#7A90B0]">]</span>
              </div>

              <div className="mb-4">
                <span className="text-[#06C8DA]">available_for</span>
                <span className="text-[#7A90B0]"> = [</span>
                <div className="ml-4 mt-1">
                  {availableFor.map((a, i) => (
                    <div key={a}>
                      <span className="text-[#22D87A]">&quot;{a}&quot;</span>
                      {i < availableFor.length - 1 && <span className="text-[#7A90B0]">,</span>}
                    </div>
                  ))}
                </div>
                <span className="text-[#7A90B0]">]</span>
              </div>

              <div className="mb-2">
                <span className="text-[#06C8DA]">status</span>
                <span className="text-[#7A90B0]"> = </span>
                <span className="text-[#22D87A]">&quot;open_to_freelance ✓&quot;</span>
              </div>

              <div className="flex items-center gap-1 mt-6 text-[#7A90B0]">
                <span className="text-[#4F7EFF]">▸</span>
                <span className="animate-pulse text-[#4F7EFF]">_</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#4A5F7A]">
            <Zap size={12} className="text-[#4F7EFF]" />
            Open to freelance projects & remote collaborations
          </div>
        </motion.div>
      </div>
    </section>
  );
}
