"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/lib/icons";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

type Project = {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  accentColor: string;
  link?: string;
  linkLabel?: string;
};

const projects: Project[] = [
  {
    title: "DocuMind",
    description:
      "Upload any PDF, DOCX, or TXT and chat with it in natural language. RAG-powered with source citations and conversation memory.",
    tech: ["LangChain", "Groq", "FastAPI", "ChromaDB"],
    gradient: "from-[#22D87A]/20 to-[#06C8DA]/5",
    accentColor: "#22D87A",
    link: "https://docu-mind-seven-tawny.vercel.app/",
  },
  {
    title: "Voxly",
    description:
      "Voice-to-notes mobile app that converts speech into structured summaries, key points, and action items in under 2 seconds. Powered by Groq Whisper + LLaMA 3.3.",
    tech: ["React Native", "Expo", "Groq", "FastAPI"],
    gradient: "from-[#7B5CFA]/20 to-[#A48BFF]/5",
    accentColor: "#7B5CFA",
    link: "/projects/voxly",
    linkLabel: "View Project",
  },
  {
    title: "Contract Intelligence System",
    description:
      "AI-powered contract analysis with RAG — extracts clauses, flags risks, and answers natural language questions over documents.",
    tech: ["Python", "LangChain", "FastAPI", "ChromaDB"],
    gradient: "from-[#4F7EFF]/20 to-[#06C8DA]/5",
    accentColor: "#4F7EFF",
  },
  {
    title: "Multi-turn Chatbot Engine",
    description:
      "Enterprise conversational AI with persistent memory and context management across long dialogue sessions.",
    tech: ["Python", "Rasa", "MongoDB", "Docker"],
    gradient: "from-[#06C8DA]/20 to-[#4F7EFF]/5",
    accentColor: "#06C8DA",
  },
  {
    title: "LLM Agent Orchestration",
    description:
      "Multi-agent workflow automation using AI subagents for complex, multi-step task execution with parallel coordination.",
    tech: ["Python", "Claude API", "FastAPI", "Redis"],
    gradient: "from-[#A78BFA]/20 to-[#4F7EFF]/5",
    accentColor: "#A78BFA",
  },
  {
    title: "Sentiment Analysis Service",
    description:
      "Real-time sentiment and intent analysis REST API for customer feedback, support tickets, and social data.",
    tech: ["Python", "Flask", "Transformers", "Celery"],
    gradient: "from-[#F59E0B]/20 to-[#22D87A]/5",
    accentColor: "#F59E0B",
  },
  {
    title: "NLP Data Pipeline",
    description:
      "Automated text processing pipeline for large-scale datasets — cleaning, tokenization, entity extraction, and embedding.",
    tech: ["Python", "Apache Airflow", "Docker", "spaCy"],
    gradient: "from-[#F472B6]/20 to-[#A78BFA]/5",
    accentColor: "#F472B6",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="py-28 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-[#4F7EFF]/6 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          custom={0} initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp}
          className="mb-14"
        >
          <span className="text-xs font-mono text-[#4F7EFF] uppercase tracking-widest">My Work</span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-display)] font-extrabold mt-2 leading-tight">
            Recent <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-[#7A90B0] text-lg mt-4 max-w-2xl">
            A selection of AI & NLP systems I&apos;ve built — production-grade, well-documented, and
            built to solve real business problems.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i + 1}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeUp}
              className={`group bg-gradient-to-br ${project.gradient} border border-[#1A2A42] rounded-2xl p-6 flex flex-col gap-4 hover:border-[${project.accentColor}]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,126,255,0.12)] cursor-default`}
            >
              <div
                className="h-1 w-16 rounded-full group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }}
              />

              <div className="flex-1">
                <h3 className="font-[family-name:var(--font-display)] font-bold text-[#EEF4FF] text-lg leading-snug">
                  {project.title}
                </h3>
                <p className="text-[#7A90B0] text-sm leading-relaxed mt-2">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-full bg-[#0C1525] border border-[#1A2A42] text-[#7A90B0]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-1 border-t border-[#1A2A42]">
                <button
                  className="flex items-center gap-1.5 text-xs text-[#7A90B0] hover:text-[#EEF4FF] transition-colors font-medium"
                  title="Source code not public"
                >
                  <GitHubIcon size={14} /> GitHub
                </button>
                {project.link ? (
                  project.link.startsWith("/") ? (
                    <Link
                      href={project.link}
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:opacity-80"
                      style={{ color: project.accentColor }}
                    >
                      <ExternalLink size={12} /> {project.linkLabel ?? "Live Demo"}
                    </Link>
                  ) : (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:opacity-80"
                      style={{ color: project.accentColor }}
                    >
                      <ExternalLink size={12} /> {project.linkLabel ?? "Live Demo"}
                    </a>
                  )
                ) : (
                  <button
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                    style={{ color: project.accentColor }}
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <ExternalLink size={12} /> Request Case Study
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
