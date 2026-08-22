"use client";

import React from "react";
import { PixelIcon } from "@/components/pixel-icon";
import { RevealText } from "@/components/reveal-text";
import { Tag } from "@/components/tag";
import { BentoCard } from "@/components/bento-card";

interface TechStackSectionProps {
  portfolio: any;
}

export function TechStackSection({ portfolio }: TechStackSectionProps) {
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="techstack"
      className="py-32 px-6 md:px-12 lg:px-20 border-t border-ink/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <PixelIcon type="integrations" size={32} />
              <Tag>TECH STACK</Tag>
            </div>
            <RevealText className="text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Tools I use to\nbuild and ship."}
            </RevealText>
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          onMouseMove={handleMouse}
        >
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
                      className="inline-flex items-center px-3 py-1.5 rounded-lg border border-ink/10 bg-paper text-base md:text-md font-medium text-ink shadow-sm dark:text-white"
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
  );
}
