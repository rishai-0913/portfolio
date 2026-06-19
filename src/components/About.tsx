"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { MapPin, Globe, GraduationCap } from "lucide-react";
import { techIcons } from "@/lib/techIcons";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        if (ref.current) ref.current.textContent = Math.round(value) + suffix;
      },
    });
    return controls.stop;
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Projects Delivered" },
  { value: 4, suffix: "", label: "Tech Domains" },
  { value: 100, suffix: "%", label: "Remote Ready" },
];

const experience = [
  { role: "Full Stack Developer & NLP Engineer", period: "2025 – Present", skills: ["LLMs", "React", "FastAPI", "AI Pipelines"], dot: "#4F7EFF" },
  { role: "Software Developer", period: "2024 – 2025", skills: ["Full-Stack", "Python", "REST APIs", "Docker"], dot: "#06C8DA" },
  { role: "AI Developer Intern", period: "2023 – 2024", skills: ["Chatbots", "FastAPI", "Flask", "MongoDB"], dot: "#4F7EFF" },
  { role: "ML Intern", period: "2021 – 2023", skills: ["Machine Learning", "Data Science", "Python"], dot: "#06C8DA" },
];

const stackGroups = [
  { label: "Frontend", color: "#61DAFB", icons: ["react", "nextjs", "typescript", "tailwind"] },
  { label: "Backend", color: "#009688", icons: ["python", "fastapi", "flask", "mongodb"] },
  { label: "AI / NLP", color: "#412991", icons: ["openai", "langchain", "python", "docker"] },
  { label: "DevOps & Tools", color: "#F05032", icons: ["docker", "git", "python", "fastapi"] },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-28 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#4F7EFF]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div custom={0} initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp} className="mb-16">
          <span className="text-xs font-mono text-[#4F7EFF] uppercase tracking-widest">About Me</span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-display)] font-extrabold mt-2 leading-tight">
            Passionate about building{" "}
            <span className="gradient-text">AI that works</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 mb-20">
          <motion.div custom={1} initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp} className="flex flex-col gap-5">
            <div className="w-40 h-40 rounded-2xl relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4F7EFF] to-[#06C8DA] p-[2px]">
                <div className="w-full h-full rounded-2xl bg-[#0C1525] flex items-center justify-center">
                  <span className="text-5xl font-[family-name:var(--font-display)] font-bold gradient-text">RS</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-[family-name:var(--font-display)] font-bold">Rishabh Sharma</h3>
              <p className="text-[#7A90B0] text-sm mt-1">Full Stack Developer & NLP Engineer</p>
            </div>

            <div className="flex flex-col gap-2 text-sm text-[#7A90B0]">
              <span className="flex items-center gap-2"><MapPin size={14} className="text-[#4F7EFF]" /> Bengaluru, India</span>
              <span className="flex items-center gap-2"><Globe size={14} className="text-[#06C8DA]" /> Available Worldwide</span>
              <span className="flex items-center gap-2"><GraduationCap size={14} className="text-[#A78BFA]" /> B.Tech in Artificial Intelligence</span>
            </div>

            {/* animated stats */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {stats.map((s) => (
                <div key={s.label} className="bg-[#0C1525] border border-[#1A2A42] rounded-xl p-3 text-center card-glow group">
                  <div className="text-xl font-[family-name:var(--font-display)] font-bold gradient-text group-hover:scale-110 transition-transform">
                    <AnimatedCounter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-[#7A90B0] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div custom={2} initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp} className="flex flex-col gap-8">
            <div>
              <p className="text-[#7A90B0] text-lg leading-relaxed">
                I&apos;m a <span className="text-[#EEF4FF] font-medium">Full Stack Developer & NLP Engineer</span> with 3+ years of experience building intelligent, end-to-end digital products. I hold a B.Tech in Artificial Intelligence and work across the full stack — from React frontends to FastAPI backends to LLM-powered pipelines.
              </p>
              <p className="text-[#7A90B0] text-lg leading-relaxed mt-4">
                I specialize in NLP, chatbot development, LLM integrations, and AI automation — and I deliver production-ready code.{" "}
                <span className="text-[#EEF4FF] font-medium">Fast turnaround, clean architecture, real results.</span>
              </p>
            </div>

            {/* experience timeline */}
            <div>
              <h4 className="text-sm font-mono uppercase tracking-widest text-[#4F7EFF] mb-5">Experience</h4>
              <div className="flex flex-col gap-4 relative">
                <div className="absolute left-3 top-3 bottom-3 w-px bg-gradient-to-b from-[#4F7EFF] to-transparent" />
                {experience.map((exp, i) => (
                  <motion.div key={i} custom={i + 3} initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp} className="flex gap-5">
                    <div className="relative flex-shrink-0 w-7 flex items-start justify-center pt-1">
                      <div className="w-3 h-3 rounded-full ring-2 ring-[#060C18] z-10" style={{ backgroundColor: exp.dot }} />
                    </div>
                    <div className="flex-1 bg-[#0C1525] border border-[#1A2A42] rounded-xl p-4 card-glow group">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <span className="font-semibold text-[#EEF4FF] group-hover:text-[#4F7EFF] transition-colors">{exp.role}</span>
                        <span className="text-xs font-mono text-[#4A5F7A] bg-[#111D32] px-2 py-0.5 rounded">{exp.period}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {exp.skills.map((skill) => (
                          <span key={skill} className="text-xs px-2 py-0.5 rounded-full bg-[#111D32] text-[#7A90B0] border border-[#1A2A42]">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* tech stack with icons */}
        <motion.div custom={5} initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp}>
          <h4 className="text-sm font-mono uppercase tracking-widest text-[#4F7EFF] mb-6">Tech Stack</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stackGroups.map((group) => (
              <div key={group.label} className="bg-[#0C1525] border border-[#1A2A42] rounded-2xl p-5 card-glow">
                <div className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: group.color }}>
                  {group.label}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {group.icons.map((key) => {
                    const icon = techIcons[key];
                    if (!icon) return null;
                    return (
                      <div
                        key={key}
                        className="flex items-center gap-2 p-2 rounded-lg bg-[#060C18] border border-[#1A2A42] hover:border-[#1E2A42] group/tech transition-all cursor-default"
                      >
                        <span
                          className="w-5 h-5 flex-shrink-0 group-hover/tech:scale-110 transition-transform"
                          style={{ color: icon.color }}
                          dangerouslySetInnerHTML={{ __html: icon.svg }}
                        />
                        <span className="text-xs text-[#7A90B0] group-hover/tech:text-[#EEF4FF] transition-colors truncate">{icon.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-[#0C1525] border border-[#1A2A42] rounded-2xl p-5 flex items-center gap-4 card-glow">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F7EFF] to-[#06C8DA] flex items-center justify-center flex-shrink-0">
              <GraduationCap size={18} className="text-white" />
            </div>
            <div>
              <div className="font-semibold text-[#EEF4FF]">B.Tech — Artificial Intelligence</div>
              <div className="text-sm text-[#7A90B0]">2020 – 2024</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
