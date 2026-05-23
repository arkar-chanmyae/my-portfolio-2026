"use client";

import React from "react";
import { RevealText } from "@/components/reveal-text";

interface HeroSectionProps {
  portfolio: any;
  heroReady: boolean;
  videoReady: boolean;
}

export function HeroSection({
  portfolio,
  heroReady,
  videoReady,
}: HeroSectionProps) {
  const isLoaded = !!portfolio?.hero;

  return (
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

      {/* Title + CTA — anchored to bottom left */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col px-6 md:px-12 pb-12 max-w-3xl">
        {/* Title area */}
        <div className="mb-10">
          {isLoaded ? (
            /* Loaded state: same RevealText word-by-word animation as other sections */
            <>
              <RevealText
                key="hero-name"
                as="h1"
                className="text-6xl sm:text-7xl md:text-8xl font-light text-[#111] leading-[1.0] tracking-tight"
                style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
                stagger={60}
                duration={800}
                threshold={0}
              >
                {portfolio.hero.fullName}
              </RevealText>
              <RevealText
                key="hero-tagline"
                as="p"
                className="text-3xl sm:text-4xl text-black/60 mt-4"
                style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
                stagger={60}
                duration={800}
                delay={200}
                threshold={0}
              >
                {portfolio.hero.tagline}
              </RevealText>
            </>
          ) : (
            /* Loading state: same word-reveal animation on "Loading..." text */
            <RevealText
              key="hero-loading"
              as="h1"
              className="text-6xl sm:text-7xl md:text-8xl font-light text-[#111]/30 leading-[1.0] tracking-tight"
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
              stagger={60}
              duration={800}
              threshold={0}
            >
              {"Loading..."}
            </RevealText>
          )}
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-wrap gap-4"
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
  );
}
