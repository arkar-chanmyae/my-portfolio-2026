"use client";

import React from "react";
import { PixelIcon } from "@/components/pixel-icon";
import { RevealText } from "@/components/reveal-text";
import { Tag } from "@/components/tag";
import { BentoCard } from "@/components/bento-card";

interface WorkExperienceSectionProps {
  portfolio: any;
}

export function WorkExperienceSection({ portfolio }: WorkExperienceSectionProps) {
  const workExperience = portfolio?.workExperience || portfolio?.experience || [];

  return (
    <section
      id="work-experience"
      className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <PixelIcon type="workflow" size={32} />
            <Tag>WORK EXPERIENCE</Tag>
          </div>
          <RevealText className="text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
            {"Where I have worked."}
          </RevealText>
        </div>

        {workExperience.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workExperience.map((item: any, index: number) => (
              <BentoCard key={item.id || index} className="p-8" delay={index * 80}>
                <h3 className="text-xl font-light mb-1">
                  {item.title || item.role || "Experience"}
                </h3>
                <div className="text-sm font-medium mb-3">
                  {item.company || item.organization || ""}
                </div>
                <p className="text-sm text-black/45 leading-relaxed">
                  {item.description || ""}
                </p>
                <div className="mt-4 text-xs text-black/35 font-mono">
                  {item.startDate || item.start || ""}{" "}
                  {item.startDate || item.start ? "-" : ""}
                  {item.endDate || item.end || "Present"}
                </div>
              </BentoCard>
            ))}
          </div>
        ) : (
          <BentoCard className="p-8" delay={0}>
            <h3 className="text-xl font-light mb-2">Experience details coming soon.</h3>
            <p className="text-sm text-black/45 leading-relaxed">
              I&apos;m preparing this section with role-by-role highlights.
            </p>
          </BentoCard>
        )}
      </div>
    </section>
  );
}
