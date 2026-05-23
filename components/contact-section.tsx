"use client";

import React from "react";

interface ContactSectionProps {
  portfolio: any;
}

export function ContactSection({ portfolio }: ContactSectionProps) {
  return (
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
          WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 55%)",
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
  );
}
