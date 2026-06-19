"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/lib/icons";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const projectTypes = [
  "Custom Chatbot",
  "LLM Integration",
  "NLP Pipeline",
  "API Development",
  "AI Automation",
  "Data Science",
  "Other",
];

const budgets = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
  "Let's Discuss",
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", projectType: "", budget: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("https://formspree.io/f/mvznerwb", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        projectType: form.projectType,
        budget: form.budget,
        message: form.message,
      }),
    });
    if (res.ok) setSubmitted(true);
  };

  return (
    <section id="contact" ref={ref} className="py-28 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#06C8DA]/6 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          custom={0} initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp}
          className="mb-14"
        >
          <span className="text-xs font-mono text-[#06C8DA] uppercase tracking-widest">Get In Touch</span>
          <h2 className="text-4xl lg:text-5xl font-[family-name:var(--font-display)] font-extrabold mt-2 leading-tight">
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-[#7A90B0] text-lg mt-4 max-w-2xl">
            Have an AI or NLP project in mind? Describe it below and I&apos;ll get back to you within
            24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 items-start">
          {/* form */}
          <motion.div
            custom={1} initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp}
          >
            {submitted ? (
              <div className="bg-[#0C1525] border border-[#22D87A]/30 rounded-2xl p-10 flex flex-col items-center gap-4 text-center">
                <CheckCircle size={48} className="text-[#22D87A]" />
                <h3 className="text-2xl font-[family-name:var(--font-display)] font-bold">Message Sent!</h3>
                <p className="text-[#7A90B0]">Thanks for reaching out. I&apos;ll reply within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn-ghost mt-2">
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#0C1525] border border-[#1A2A42] rounded-2xl p-8 flex flex-col gap-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-[#7A90B0] uppercase tracking-wider">Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="bg-[#060C18] border border-[#1A2A42] rounded-lg px-4 py-3 text-[#EEF4FF] placeholder-[#4A5F7A] text-sm outline-none focus:border-[#4F7EFF]/60 focus:ring-1 focus:ring-[#4F7EFF]/30 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-[#7A90B0] uppercase tracking-wider">Email</label>
                    <input
                      required
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="bg-[#060C18] border border-[#1A2A42] rounded-lg px-4 py-3 text-[#EEF4FF] placeholder-[#4A5F7A] text-sm outline-none focus:border-[#4F7EFF]/60 focus:ring-1 focus:ring-[#4F7EFF]/30 transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-[#7A90B0] uppercase tracking-wider">Project Type</label>
                    <select
                      required
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className="bg-[#060C18] border border-[#1A2A42] rounded-lg px-4 py-3 text-[#EEF4FF] text-sm outline-none focus:border-[#4F7EFF]/60 focus:ring-1 focus:ring-[#4F7EFF]/30 transition-all appearance-none"
                    >
                      <option value="" disabled>Select a type...</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-[#7A90B0] uppercase tracking-wider">Budget</label>
                    <select
                      required
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="bg-[#060C18] border border-[#1A2A42] rounded-lg px-4 py-3 text-[#EEF4FF] text-sm outline-none focus:border-[#4F7EFF]/60 focus:ring-1 focus:ring-[#4F7EFF]/30 transition-all appearance-none"
                    >
                      <option value="" disabled>Select budget...</option>
                      {budgets.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-[#7A90B0] uppercase tracking-wider">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project — what you're building, the problem you're solving, timeline if any..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="bg-[#060C18] border border-[#1A2A42] rounded-lg px-4 py-3 text-[#EEF4FF] placeholder-[#4A5F7A] text-sm outline-none focus:border-[#4F7EFF]/60 focus:ring-1 focus:ring-[#4F7EFF]/30 transition-all resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center py-3.5 mt-1">
                  <Send size={16} /> Send Message
                </button>

                <div className="flex items-center gap-3 pt-2 border-t border-[#1A2A42]">
                  <span className="text-xs text-[#4A5F7A]">Or reach out on</span>
                  <a
                    href="https://linkedin.com/in/rishabh-sharma-040725221"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#060C18] border border-[#1A2A42] text-[#7A90B0] hover:text-[#4F7EFF] hover:border-[#4F7EFF]/40 transition-all"
                  >
                    <LinkedInIcon size={15} />
                  </a>
                  <a
                    href="https://github.com/rishabh-sharma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#060C18] border border-[#1A2A42] text-[#7A90B0] hover:text-[#EEF4FF] hover:border-[#1A2A42] transition-all"
                  >
                    <GitHubIcon size={15} />
                  </a>
                </div>
              </form>
            )}
          </motion.div>

          {/* info cards */}
          <motion.div
            custom={2} initial="hidden" animate={inView ? "show" : "hidden"} variants={fadeUp}
            className="flex flex-col gap-4"
          >
            {[
              {
                icon: Mail,
                color: "#4F7EFF",
                title: "Email",
                value: "rishai.query@gmail.com",
              },
              {
                icon: MapPin,
                color: "#06C8DA",
                title: "Location",
                value: "Bengaluru, India · Works Remotely Worldwide",
              },
              {
                icon: CheckCircle,
                color: "#22D87A",
                title: "Availability",
                value: "Open to Freelance Projects",
                badge: true,
              },
              {
                icon: Clock,
                color: "#A78BFA",
                title: "Response Time",
                value: "Replies within 24 hours",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-[#0C1525] border border-[#1A2A42] rounded-xl p-4 flex items-start gap-4 card-glow"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}25` }}
                  >
                    <Icon size={16} style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="text-xs text-[#4A5F7A] font-mono uppercase tracking-wider">{item.title}</div>
                    <div className="text-sm font-medium text-[#EEF4FF] mt-0.5 flex items-center gap-2">
                      {item.badge && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22D87A] animate-pulse" />
                      )}
                      {item.value}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* LinkedIn CTA */}
            <a
              href="https://linkedin.com/in/rishabh-sharma-040725221"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#0C1525] border border-[#1A2A42] rounded-xl p-4 text-center hover:border-[#4F7EFF]/40 transition-all group"
            >
              <div className="text-xs text-[#4A5F7A] mb-1">View full profile</div>
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-[#4F7EFF] group-hover:gap-3 transition-all">
                <LinkedInIcon size={14} />
                linkedin.com/in/rishabh-sharma-040725221
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
