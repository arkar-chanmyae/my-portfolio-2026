"use client";

import React from "react";
import { PixelIcon } from "@/components/pixel-icon";
import { RevealText } from "@/components/reveal-text";
import { Tag } from "@/components/tag";
import { BentoCard } from "@/components/bento-card";

interface EducationSectionProps {
  portfolio: any;
}

export function EducationSection({ portfolio }: EducationSectionProps) {
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
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
  );
}
