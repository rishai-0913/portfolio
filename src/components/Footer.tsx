"use client";

import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/lib/icons";

const navLinks = ["About", "Services", "Projects", "Contact"];

export default function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="border-t border-[#1A2A42] bg-[#060C18]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-[family-name:var(--font-display)] font-bold text-2xl gradient-text"
          >
            Rishabh Sharma
          </button>

          <p className="text-sm text-[#4A5F7A]">Full Stack Developer & NLP Engineer · Freelance Available</p>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/rishabh-sharma"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#0C1525] border border-[#1A2A42] text-[#7A90B0] hover:text-[#EEF4FF] hover:border-[#4F7EFF]/40 hover:shadow-[0_0_15px_rgba(79,126,255,0.15)] transition-all duration-200"
            >
              <GitHubIcon size={17} />
            </a>
            <a
              href="https://linkedin.com/in/rishabh-sharma-040725221"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#0C1525] border border-[#1A2A42] text-[#7A90B0] hover:text-[#4F7EFF] hover:border-[#4F7EFF]/40 hover:shadow-[0_0_15px_rgba(79,126,255,0.15)] transition-all duration-200"
            >
              <LinkedInIcon size={17} />
            </a>
            <a
              href="mailto:rishai.query@gmail.com"
              className="p-2.5 rounded-lg bg-[#0C1525] border border-[#1A2A42] text-[#7A90B0] hover:text-[#06C8DA] hover:border-[#06C8DA]/40 hover:shadow-[0_0_15px_rgba(6,200,218,0.15)] transition-all duration-200"
            >
              <Mail size={17} />
            </a>
          </div>

          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-xs text-[#4A5F7A] hover:text-[#7A90B0] transition-colors"
              >
                {link}
              </button>
            ))}
          </div>

          <div className="w-full h-px bg-[#1A2A42]" />

          <p className="text-xs text-[#4A5F7A]">© 2025 Rishabh Sharma · All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
