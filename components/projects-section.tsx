"use client";

import React, { useState } from "react";
import { PixelIcon } from "@/components/pixel-icon";
import { RevealText } from "@/components/reveal-text";
import { Tag } from "@/components/tag";
import { StackingAgentCards } from "@/components/stacking-agent-cards";

interface ProjectsSectionProps {
  portfolio: any;
}

// ─── Project Skeleton Loading Card ──────────────────────────────────────────
function ProjectSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="relative bg-paper rounded-2xl border border-ink/[0.07] overflow-hidden p-8 mb-4 animate-pulse"
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: "1.6s",
      }}
    >
      <div className="md:max-w-[60%]">
        {/* Skeleton Tags */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-5 w-16 bg-ink/[0.05] rounded-full" />
          <div className="h-5 w-24 bg-ink/[0.05] rounded-full" />
        </div>

        {/* Skeleton Title */}
        <div className="h-7 w-2/3 bg-black/[0.07] rounded-lg mb-4" />

        {/* Skeleton Description */}
        <div className="space-y-2 mb-8">
          <div className="h-3.5 w-full bg-ink/[0.04] rounded" />
          <div className="h-3.5 w-11/12 bg-ink/[0.04] rounded" />
          <div className="h-3.5 w-4/5 bg-ink/[0.04] rounded" />
        </div>
      </div>

      {/* Skeleton Footer */}
      <div className="flex gap-8 pt-6 border-t border-ink/[0.05]">
        <div className="h-4 w-24 bg-ink/[0.05] rounded" />
        <div className="h-4 w-28 bg-ink/[0.05] rounded" />
      </div>
    </div>
  );
}

export function ProjectsSection({ portfolio }: ProjectsSectionProps) {
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

  return (
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
                      ? "bg-ink text-paper shadow-sm"
                      : "bg-paper/60 border border-ink/5 text-ink/50 hover:text-ink hover:bg-ink/[0.03]"
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
  );
}
