"use client";

import React, { useEffect, useState } from "react";
import { HERO_REVEAL_MS } from "@/components/intro-animation";
import { MobileNav } from "@/components/mobile-nav";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { EducationSection } from "@/components/education-section";
import { SkillsSection } from "@/components/skills-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { ContactSection } from "@/components/contact-section";
import { FooterSection } from "@/components/footer-section";

export default function AgenticPage() {
  const [heroReady, setHeroReady] = useState(true);
  const [videoReady, setVideoReady] = useState(true);
  const [portfolio, setPortfolio] = useState<any>(null);

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

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased">
      <MobileNav portfolio={portfolio} />

      <HeroSection
        portfolio={portfolio}
        heroReady={heroReady}
        videoReady={videoReady}
      />

      <ProjectsSection portfolio={portfolio} />

      <EducationSection portfolio={portfolio} />

      {/* <SkillsSection portfolio={portfolio} /> */}

      <TechStackSection portfolio={portfolio} />

      <ContactSection portfolio={portfolio} />

      <FooterSection portfolio={portfolio} />
    </div>
  );
}
