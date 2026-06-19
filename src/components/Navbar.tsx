"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
// lucide-react ships no Linkedin icon — social icons are in @/lib/icons

const links = ["About", "Services", "Projects", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#060C18]/90 backdrop-blur-md border-b border-[#1A2A42]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 font-[family-name:var(--font-display)] font-bold text-xl tracking-tight"
        >
          <img src="/logo.svg" alt="RS" width={28} height={28} className="flex-shrink-0" />
          <span className="gradient-text">Rishabh Sharma</span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-sm text-[#7A90B0] hover:text-[#EEF4FF] transition-colors duration-200 font-medium"
            >
              {link}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-medium text-[#22D87A] bg-[#22D87A]/10 border border-[#22D87A]/20 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-[#22D87A] rounded-full animate-pulse" />
            Open for Work
          </span>
          <button onClick={() => scrollTo("Contact")} className="btn-primary text-sm py-2 px-4">
            Let&apos;s Talk →
          </button>
        </div>

        <button
          className="md:hidden text-[#7A90B0] hover:text-[#EEF4FF] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#1A2A42] bg-[#060C18]/95 backdrop-blur-md"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-left text-sm text-[#7A90B0] hover:text-[#EEF4FF] transition-colors font-medium py-1"
                >
                  {link}
                </button>
              ))}
              <button onClick={() => scrollTo("Contact")} className="btn-primary text-sm mt-2">
                Let&apos;s Talk →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
