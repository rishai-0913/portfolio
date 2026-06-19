"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, Brain, AlignLeft, Zap, Cpu, BarChart2, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const services = [
  {
    icon: Bot,
    title: "Custom AI Chatbots",
    description:
      "Intelligent bots using LLMs or Rasa — for websites, WhatsApp, or internal tools. Context-aware and production-ready.",
    color: "#4F7EFF",
    tags: ["LLMs", "Rasa", "WhatsApp"],
  },
  {
    icon: Brain,
    title: "LLM Integration",
    description:
      "Integrate GPT-4, Claude, or open-source models into your app. RAG pipelines, custom prompting, fine-tuning guidance.",
    color: "#06C8DA",
    tags: ["RAG", "Claude API", "OpenAI"],
  },
  {
    icon: AlignLeft,
    title: "NLP Pipelines",
    description:
      "Text classification, entity extraction, sentiment analysis, document processing — built to scale in production.",
    color: "#A78BFA",
    tags: ["spaCy", "Transformers", "BERT"],
  },
  {
    icon: Zap,
    title: "API Development",
    description:
      "Fast, well-documented REST APIs with FastAPI or Flask. Containerized with Docker, clean architecture.",
    color: "#F59E0B",
    tags: ["FastAPI", "Flask", "Docker"],
  },
  {
    icon: Cpu,
    title: "AI Automation",
    description:
      "Automate repetitive business workflows with AI agents and custom scripts. Save time, reduce errors.",
    color: "#22D87A",
    tags: ["AI Agents", "Automation", "Python"],
  },
  {
    icon: BarChart2,
    title: "Data Science & ML",
    description:
      "ML models, data analysis, and predictive insights from your data. Python-based, reproducible, explainable.",
    color: "#F472B6",
    tags: ["scikit-learn", "Pandas", "Jupyter"],
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="py-28 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#06C8DA]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          custom={0} initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp}
          className="mb-14"
        >
          <span className="text-xs font-mono text-[#06C8DA] uppercase tracking-widest">What I Build</span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-display)] font-extrabold mt-2 leading-tight">
            Services tailored for{" "}
            <span className="gradient-text">your business</span>
          </h2>
          <p className="text-[#7A90B0] text-lg mt-4 max-w-2xl">
            End-to-end AI & NLP solutions. Fixed-scope or ongoing. I handle the complexity so you
            can focus on your product.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                custom={i + 1}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                variants={fadeUp}
                className="group bg-[#0C1525] border border-[#1A2A42] rounded-2xl p-6 flex flex-col gap-4 card-glow cursor-default relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, ${svc.color}, transparent)` }}
                />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${svc.color}15`, border: `1px solid ${svc.color}25` }}
                >
                  <Icon size={20} style={{ color: svc.color }} />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-[#EEF4FF] text-lg">
                    {svc.title}
                  </h3>
                  <p className="text-[#7A90B0] text-sm leading-relaxed mt-2">{svc.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${svc.color}10`, color: svc.color, border: `1px solid ${svc.color}25` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-1 text-xs font-semibold mt-1 transition-all duration-200"
                  style={{ color: svc.color }}
                >
                  Get a Quote <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
