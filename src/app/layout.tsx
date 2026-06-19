import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
  },
  title: "Rishabh Sharma — Full Stack Developer & NLP Engineer",
  description:
    "Freelance Full Stack Developer & NLP Engineer specializing in React, FastAPI, LLM integrations, and NLP pipelines. 3+ years experience. Available for projects worldwide.",
  keywords: ["AI Engineer", "NLP Engineer", "Freelance", "LLM", "Chatbot", "Python", "FastAPI"],
  openGraph: {
    title: "Rishabh Sharma — AI & NLP Engineer",
    description: "Freelance AI & NLP Engineer. Chatbots, LLMs, NLP pipelines.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
