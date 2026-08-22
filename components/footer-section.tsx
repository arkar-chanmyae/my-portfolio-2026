"use client";

import React from "react";
import { TEXT } from "@/lib/text-sizes";

interface FooterSectionProps {
  portfolio: any;
}

export function FooterSection({ portfolio }: FooterSectionProps) {
  return (
    <footer className="py-10 px-6 md:px-12 lg:px-20 border-t border-ink/[0.06]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <span
          className={`font-pixel ${TEXT.footerBrand} text-ink/70 dark:text-white/80 uppercase`}
        >
          {portfolio?.hero?.fullName || "PORTFOLIO"}
        </span>

        {/* Social links */}
        <div className="flex items-center gap-6">
          {(portfolio?.socialLinks || []).map((link: any) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={`${TEXT.footerLink} text-ink/50 hover:text-ink dark:text-white/60 dark:hover:text-white transition-colors tracking-widest uppercase`}
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-ink/[0.04]">
        <span className={`${TEXT.footerLegal} text-ink/40 dark:text-white/50`}>
          © {new Date().getFullYear()} {portfolio?.hero?.fullName}. All rights
          reserved.
        </span>
      </div>
    </footer>
  );
}
