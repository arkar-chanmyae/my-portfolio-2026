"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  IntroAnimation,
  INTRO_DURATION_MS,
  HERO_REVEAL_MS,
} from "@/components/intro-animation";
import { AgentInterface } from "@/components/agent-interface";
import { PixelIcon } from "@/components/pixel-icon";
import { LiveAgentFeed, LiveAgentCounter } from "@/components/live-agent-feed";
import { RevealText } from "@/components/reveal-text";
import { StackingAgentCards } from "@/components/stacking-agent-cards";
import { MobileNav } from "@/components/mobile-nav";
import { DevExSection } from "@/components/devex-section";

// ─── Intersection Observer hook ──────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Animated counter ────────────────────────────────────────────────────────
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = end / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, end]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Bento card ──────────────────────────────────────────────────────────────
function BentoCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border border-black/[0.07] bg-white overflow-hidden transition-all duration-700 hover:border-black/[0.15] hover:bg-[#fafaf8] ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, border-color 0.3s ease, background-color 0.3s ease`,
      }}
    >
      {/* Hover glow spot */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.03), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}

// ─── Pill tag ─────────────────────────────────────────────────────────────────
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/40 bg-black/[0.04]">
      {children}
    </span>
  );
}

// ─── Project Skeleton Loading Card ──────────────────────────────────────────
function ProjectSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="relative bg-[#faf9f7] rounded-2xl border border-black/[0.07] overflow-hidden p-8 mb-4 animate-pulse"
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: "1.6s",
      }}
    >
      <div className="md:max-w-[60%]">
        {/* Skeleton Tags */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-5 w-16 bg-black/[0.05] rounded-full" />
          <div className="h-5 w-24 bg-black/[0.05] rounded-full" />
        </div>

        {/* Skeleton Title */}
        <div className="h-7 w-2/3 bg-black/[0.07] rounded-lg mb-4" />

        {/* Skeleton Description */}
        <div className="space-y-2 mb-8">
          <div className="h-3.5 w-full bg-black/[0.04] rounded" />
          <div className="h-3.5 w-11/12 bg-black/[0.04] rounded" />
          <div className="h-3.5 w-4/5 bg-black/[0.04] rounded" />
        </div>
      </div>

      {/* Skeleton Footer */}
      <div className="flex gap-8 pt-6 border-t border-black/[0.05]">
        <div className="h-4 w-24 bg-black/[0.05] rounded" />
        <div className="h-4 w-28 bg-black/[0.05] rounded" />
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AgenticPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [heroReady, setHeroReady] = useState(true);
  const [videoReady, setVideoReady] = useState(true);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [activeProjectTab, setActiveProjectTab] = useState("all");

  // Smart mapping helper to classify projects based on technology tags
  const getProjectFallbackCategory = (project: any) => {
    const categories = (project.categories || []).map((cat: string) =>
      cat.toLowerCase(),
    );

    // Explicit matches in direct categories
    if (categories.includes("frontend")) return "frontend";
    if (categories.includes("backend")) return "backend";
    if (categories.includes("mobile")) return "mobile";
    if (
      categories.includes("ui/ux design") ||
      categories.includes("ui/ux") ||
      categories.includes("design")
    )
      return "ui/ux design";

    // Tech stack mappings
    const hasTech = (...techs: string[]) =>
      techs.some((t) => categories.includes(t.toLowerCase()));

    if (hasTech("figma")) return "ui/ux design";
    if (hasTech("react native", "expo router", "ios", "android"))
      return "mobile";
    if (
      hasTech(
        "express.js",
        "postgresql",
        "jwt",
        "websocket",
        "php",
        "laravel",
        "node.js",
        "mongodb",
        "prisma",
        "sql",
      )
    )
      return "backend";
    if (
      hasTech(
        "next.js",
        "react",
        "typescript",
        "tailwind",
        "tailwindcss",
        "radixui",
        "shadcn/ui",
        "materialui",
        "javascript",
        "html",
        "css",
      )
    )
      return "frontend";

    return "frontend"; // general default
  };

  // Filter projects dynamically
  const filteredProjects = (portfolio?.projects || []).filter(
    (project: any) => {
      if (activeProjectTab === "all") return true;

      const categories = (project.categories || []).map((cat: string) =>
        cat.toLowerCase(),
      );
      if (categories.includes(activeProjectTab.toLowerCase())) return true;

      return (
        getProjectFallbackCategory(project) === activeProjectTab.toLowerCase()
      );
    },
  );

  // Fetch portfolio data from API on mount
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch("/api/portfolio");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPortfolio(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPortfolio();
  }, []);

  // Start video zoom slightly before hero content reveals, for seamless overlap
  useEffect(() => {
    const t = setTimeout(() => setVideoReady(true), HERO_REVEAL_MS);
    return () => clearTimeout(t);
  }, []);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased">
      {/* ── INTRO ANIMATION (commented out — does not wait for video load) ── */}
      {/* <IntroAnimation onDone={() => setHeroReady(true)} /> */}

      {/* ── STICKY NAV ────────────────────────────────────────────────────── */}
      <MobileNav />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-screen overflow-hidden">
        {/* Video background — zooms in once intro is done */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/agentic-hero-9yW3wnTNMfn2U6lsVhTTZSJFEvAoSj.mp4"
          style={{
            transform: videoReady ? "scale(1.05)" : "scale(0.85)",
            transition: "transform 2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Progressive blur + light gradient rising from bottom */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{
            height: "65%",
            background:
              "linear-gradient(to top, #F5F4F0 0%, #F5F4F0 18%, rgba(245,244,240,0.85) 35%, rgba(245,244,240,0.5) 55%, rgba(245,244,240,0.15) 75%, transparent 100%)",
          }}
        />
        {/* Backdrop blur layers — progressively lighter toward top */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{
            height: "20%",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{
            height: "38%",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
          style={{
            height: "55%",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, transparent 100%)",
          }}
        />

        {/* Spacer so hero content doesn't sit under the fixed nav */}
        <div className="h-20" />

        {/* Title + metrics — anchored to bottom left */}
        <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col px-6 md:px-12 pb-12 max-w-3xl">
          {/* Title */}
          <h1
            className="text-6xl sm:text-7xl md:text-8xl font-light text-[#111] leading-[1.0] tracking-tight mb-10"
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              opacity: heroReady ? 1 : 0,
              filter: heroReady ? "blur(0px)" : "blur(24px)",
              transform: heroReady ? "translateY(0px)" : "translateY(32px)",
              transition:
                "opacity 1s cubic-bezier(0.16,1,0.3,1) 0ms, filter 1s cubic-bezier(0.16,1,0.3,1) 0ms, transform 1s cubic-bezier(0.16,1,0.3,1) 0ms",
            }}
          >
            {portfolio?.hero ? (
              <>
                {portfolio.hero.fullName}
                <br />
                <span className="text-3xl sm:text-4xl text-black/60 block mt-4">
                  {portfolio.hero.tagline}
                </span>
              </>
            ) : (
              "Loading..."
            )}
          </h1>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-4 mt-6"
            style={{
              opacity: heroReady ? 1 : 0,
              filter: heroReady ? "blur(0px)" : "blur(16px)",
              transform: heroReady ? "translateY(0px)" : "translateY(20px)",
              transition:
                "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 120ms, filter 0.8s cubic-bezier(0.16,1,0.3,1) 120ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 120ms",
            }}
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector("#contact");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3.5 bg-[#111] text-white text-xs rounded-xl hover:bg-[#333] transition-colors tracking-widest font-semibold font-sans flex items-center justify-center min-w-[140px]"
            >
              HIRE ME!
            </a>
            {portfolio?.hero?.resumeFile ? (
              <a
                href={portfolio.hero.resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="px-8 py-3.5 bg-white/60 border border-black/10 text-[#111] text-xs rounded-xl hover:bg-black/5 hover:border-black/20 transition-all tracking-widest font-semibold font-sans flex items-center justify-center min-w-[140px]"
                style={{ backdropFilter: "blur(8px)" }}
              >
                DOWNLOAD CV
              </a>
            ) : (
              <button
                onClick={() =>
                  alert(
                    "CV file is not configured in the database yet. Convert your Google Drive link to direct download and set it in hero.resumeFile!",
                  )
                }
                className="px-8 py-3.5 bg-white/60 border border-black/10 text-[#111] text-xs rounded-xl hover:bg-black/5 hover:border-black/20 transition-all tracking-widest font-semibold font-sans flex items-center justify-center min-w-[140px]"
                style={{ backdropFilter: "blur(8px)" }}
              >
                DOWNLOAD CV
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── BUILD YOUR AGENTS (4 cards) ───────────────────────────────────── */}
      <section id="projects" className="py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <PixelIcon type="agents" size={32} />
                <Tag>PROJECTS</Tag>
              </div>
              <RevealText className="text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
                {"Some of my featured projects."}
              </RevealText>
            </div>
          </div>

          {/* Categories Tab Filter */}
          <div
            className="flex flex-wrap gap-2 mb-10 pb-2"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            {["all", "frontend", "backend", "mobile", "ui/ux design"].map(
              (tab) => {
                const isActive = activeProjectTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveProjectTab(tab)}
                    className={`px-5 py-2 text-xs rounded-xl transition-all duration-300 tracking-wider font-semibold uppercase ${
                      isActive
                        ? "bg-[#111] text-white shadow-sm"
                        : "bg-white/60 border border-black/5 text-black/50 hover:text-black hover:bg-black/[0.03]"
                    }`}
                    style={{ backdropFilter: "blur(8px)" }}
                  >
                    {tab}
                  </button>
                );
              },
            )}
          </div>

          {!portfolio ? (
            <div className="flex flex-col gap-4">
              <ProjectSkeleton delay={0} />
              <ProjectSkeleton delay={120} />
              <ProjectSkeleton delay={240} />
            </div>
          ) : (
            <StackingAgentCards projects={filteredProjects} />
          )}
        </div>
      </section>

      {/* ── EDUCATION & EXPERIENCE (bento) ─────────────────────────────────── */}
      <section
        id="education"
        className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-3">
              <PixelIcon type="platform" size={32} />
              <Tag>EDUCATION & EXPERIENCE</Tag>
            </div>
            <RevealText className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
              {"My journey so far."}
            </RevealText>
          </div>

          <div
            className="grid grid-cols-12 grid-rows-auto gap-3"
            onMouseMove={handleMouse}
          >
            {/* Big left card — full width */}
            <BentoCard
              className="col-span-12 p-8 min-h-[200px] flex flex-col justify-between relative overflow-hidden"
              delay={0}
            >
              {/* Arc background image */}
              <img
                src="/images/arc.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "center 70%" }}
              />
              {/* Progressive blur layer */}
              <div
                className="absolute inset-0"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, transparent 45%, black 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 45%, black 100%)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              />
              {/* Fade-to-background gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 35%, rgba(245,244,240,0.3) 50%, rgba(245,244,240,0.75) 65%, rgba(245,244,240,0.95) 80%, rgb(245,244,240) 100%)",
                }}
              />
              {/* Cream overlay with 50% opacity and reduced backdrop-blur for text legibility */}
              <div className="absolute inset-0 bg-[#F5F4F0]/50 backdrop-blur-[6px] z-0 pointer-events-none" />
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-light mb-1">
                  {portfolio?.education?.[0]?.degree || "Loading..."}
                </h3>
                <div className="text-sm font-medium mb-3">
                  {portfolio?.education?.[0]?.institution}
                </div>
                <p className="text-sm text-black/45 leading-relaxed max-w-sm">
                  {portfolio?.education?.[0]?.description || ""}
                </p>
                <div className="mt-4 text-xs text-black/35 font-mono">
                  {portfolio?.education?.[0]?.startDate} -{" "}
                  {portfolio?.education?.[0]?.endDate}
                </div>
              </div>
            </BentoCard>

            {/* Bottom row */}
            <BentoCard
              className="col-span-12 md:col-span-4 p-8 min-h-[200px] flex flex-col justify-between"
              delay={120}
            >
              <div>
                <h3 className="text-lg font-light mb-1">
                  {portfolio?.education?.[1]?.degree || "Loading..."}
                </h3>
                <div className="text-xs font-medium mb-2">
                  {portfolio?.education?.[1]?.institution}
                </div>
                <p className="text-sm text-black/45 leading-relaxed">
                  {portfolio?.education?.[1]?.description || ""}
                </p>
              </div>
              <div className="mt-4 text-xs text-black/35 font-mono">
                {portfolio?.education?.[1]?.startDate} -{" "}
                {portfolio?.education?.[1]?.endDate}
              </div>
            </BentoCard>

            <BentoCard
              className="col-span-12 md:col-span-4 p-8 min-h-[200px] flex flex-col justify-between"
              delay={160}
            >
              <div>
                <h3 className="text-lg font-light mb-1">
                  {portfolio?.education?.[2]?.degree || "Loading..."}
                </h3>
                <div className="text-xs font-medium mb-2">
                  {portfolio?.education?.[2]?.institution}
                </div>
                <p className="text-sm text-black/45 leading-relaxed">
                  {portfolio?.education?.[2]?.description || ""}
                </p>
              </div>
              <div className="mt-4 text-xs text-black/35 font-mono">
                {portfolio?.education?.[2]?.startDate} -{" "}
                {portfolio?.education?.[2]?.endDate}
              </div>
            </BentoCard>

            <BentoCard
              className="col-span-12 md:col-span-4 p-8 min-h-[200px] flex flex-col justify-between"
              delay={200}
            >
              <div>
                <h3 className="text-lg font-light mb-1">
                  {portfolio?.education?.[3]?.degree || "Loading..."}
                </h3>
                <div className="text-xs font-medium mb-2">
                  {portfolio?.education?.[3]?.institution}
                </div>
                <p className="text-sm text-black/45 leading-relaxed">
                  {portfolio?.education?.[3]?.description || ""}
                </p>
              </div>
              <div className="mt-4 text-xs text-black/35 font-mono">
                {portfolio?.education?.[3]?.startDate} -{" "}
                {portfolio?.education?.[3]?.endDate}
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── PROFESSIONAL SKILLS ──────────────────────────────────────────── */}
      <section
        id="skills"
        className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-3">
              <PixelIcon type="workflow" size={32} />
              <Tag>PROFESSIONAL SKILLS</Tag>
            </div>
            <RevealText className="text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Everything you need\nto build great products."}
            </RevealText>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-3"
            onMouseMove={handleMouse}
          >
            {portfolio?.skills ? (
              portfolio.skills.slice(0, 4).map((skill: any, index: number) => (
                <BentoCard
                  key={skill.id || index}
                  className="relative overflow-hidden flex flex-col min-h-[320px]"
                  delay={index * 60}
                >
                  {/* Number top-left */}
                  <div className="relative z-10 p-7">
                    <span className="font-pixel text-[11px] text-black/20 tracking-widest block">{`0${index + 1}`}</span>
                  </div>
                  {/* Text pushed further down */}
                  <div className="relative z-10 px-7 pb-7 mt-auto pt-4">
                    <h3 className="text-2xl font-light mb-3">{skill.title}</h3>
                    <p className="text-sm text-black/45 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </BentoCard>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </section>

      {/* ── INTEGRATIONS ──────────────────────────────────────────────────── */}
      {/* ── TECH STACK ────────────────────────────────────────────────────── */}
      <section
        id="techstack"
        className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <PixelIcon type="integrations" size={32} />
                <Tag>TECH STACK</Tag>
              </div>
              <RevealText className="text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
                {"Tools I use to\nbuild and ship."}
              </RevealText>
            </div>
            <p className="text-sm text-black/45 leading-relaxed max-w-xs md:self-end">
              A comprehensive list of technologies, frameworks, and tools I have
              experience working with.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio?.techStack ? (
              portfolio.techStack.map((stack: any, index: number) => (
                <BentoCard
                  key={stack.id || index}
                  className="p-8 flex flex-col min-h-[240px]"
                  delay={index * 80}
                >
                  <Tag>{stack.category}</Tag>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {(stack.items || []).map((item: string, i: number) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg border border-black/10 bg-white text-sm text-black/70 shadow-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </BentoCard>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <section
        id="pricing"
        className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]"
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <PixelIcon type="pricing" size={32} />
              <Tag>PRICING</Tag>
            </div>
            <RevealText className="text-center text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Pay as your agents grow."}
            </RevealText>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
            onMouseMove={handleMouse}
          >
            {[
              {
                name: "Sandbox",
                price: "Free",
                sub: "Start experimenting",
                features: [
                  "5 agents",
                  "1,000 tasks/mo",
                  "Community support",
                  "Basic traces",
                ],
                delay: 0,
              },
              {
                name: "Builder",
                price: "$49",
                period: "/mo",
                sub: "For teams shipping fast",
                features: [
                  "50 agents",
                  "100K tasks/mo",
                  "Priority support",
                  "Full traces + replay",
                  "Custom tools",
                  "REST API",
                ],
                highlight: true,
                delay: 80,
              },
              {
                name: "Enterprise",
                price: "Custom",
                sub: "For orgs at scale",
                features: [
                  "Unlimited agents",
                  "Unlimited tasks",
                  "Dedicated infra",
                  "SOC 2 / HIPAA",
                  "SLA guarantees",
                  "Custom contracts",
                ],
                delay: 140,
              },
            ].map((plan) => (
              <BentoCard
                key={plan.name}
                className={`p-8 flex flex-col ${plan.highlight ? "border-black/20 bg-[#F0EEE8]" : ""}`}
                delay={plan.delay}
              >
                <div className="mb-8">
                  <div className="font-pixel text-[11px] tracking-widest text-black/40 mb-4">
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-light">{plan.price}</span>
                    {plan.period && (
                      <span className="text-black/40 text-sm">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-black/35 tracking-wide">
                    {plan.sub}
                  </p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-sm text-black/55"
                    >
                      <div className="w-1 h-1 rounded-full bg-black/25 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl text-sm tracking-widest transition-all duration-200 ${
                    plan.highlight
                      ? "bg-[#111] text-white hover:bg-[#333]"
                      : "border border-black/10 text-black/60 hover:border-black/25 hover:text-black hover:bg-black/[0.04]"
                  }`}
                >
                  {plan.name === "Enterprise" ? "CONTACT SALES" : "GET STARTED"}
                </button>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] overflow-hidden"
      >
        {/* Glass panels image — anchored to bottom center */}
        <img
          src="/images/footer.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full object-cover object-bottom pointer-events-none select-none"
          style={{ opacity: 0.85 }}
        />
        {/* Progressive blur from bottom — blends into site bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage: "linear-gradient(to top, transparent 0%, black 55%)",
            WebkitMaskImage:
              "linear-gradient(to top, transparent 0%, black 55%)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
        />
        {/* Colour fade from bottom to site bg #f5f4f0 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgb(245,244,240) 0%, rgba(245,244,240,0.92) 18%, rgba(245,244,240,0.55) 35%, transparent 55%)",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] mb-6">
            Let's work together.
          </h2>
          <p className="text-sm text-black/45 leading-relaxed mb-10">
            {portfolio?.contact?.tagline ||
              "Get in touch to discuss opportunities."}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {portfolio?.contact?.email && (
              <a
                href={`mailto:${portfolio.contact.email}`}
                className="px-8 py-3 bg-[#111] text-white text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest font-medium"
              >
                EMAIL ME
              </a>
            )}
            {portfolio?.contact?.phone && (
              <a
                href={`tel:${portfolio.contact.phone}`}
                className="px-8 py-3 bg-white border border-black/10 text-[#111] text-sm rounded-xl hover:bg-black/5 transition-colors tracking-widest font-medium"
              >
                CALL ME
              </a>
            )}
          </div>
          {portfolio?.contact?.location && (
            <p className="mt-8 text-xs text-black/40 tracking-widest uppercase">
              Based in {portfolio.contact.location}
            </p>
          )}
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <span className="font-pixel text-xs tracking-[0.25em] text-black/50 uppercase">
            {portfolio?.hero?.fullName || "PORTFOLIO"}
          </span>

          {/* Nav sections */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {[
              { label: "Projects", href: "#projects" },
              { label: "Education", href: "#education" },
              { label: "Skills", href: "#skills" },
              { label: "Tech Stack", href: "#techstack" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-xs text-black/35 hover:text-black/70 transition-colors tracking-widest uppercase"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6">
            {(portfolio?.socialLinks || []).map((link: any) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-black/25 hover:text-black/55 transition-colors tracking-widest uppercase"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-black/[0.04]">
          <span className="text-xs text-black/20">
            © {new Date().getFullYear()} {portfolio?.hero?.fullName}. All rights
            reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
