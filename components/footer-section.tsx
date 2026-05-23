"use client";

import React from "react";

interface FooterSectionProps {
  portfolio: any;
}

export function FooterSection({ portfolio }: FooterSectionProps) {
  return (
    <footer className="py-10 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <span className="font-pixel text-xs tracking-[0.25em] text-black/50 uppercase">
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
  );
}
