"use client";

import React from "react";
import { PixelIcon } from "@/components/pixel-icon";
import { RevealText } from "@/components/reveal-text";
import { Tag } from "@/components/tag";
import { BentoCard } from "@/components/bento-card";

interface SkillsSectionProps {
  portfolio: any;
}

export function SkillsSection({ portfolio }: SkillsSectionProps) {
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
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
  );
}
