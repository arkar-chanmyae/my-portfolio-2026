"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Tech Stack", href: "#techstack" },
  // { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const NAV_STYLE = {
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  background: "rgba(245,244,240,0.30)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)",
} as const;

export interface MobileNavProps {
  portfolio?: any;
}

export function MobileNav({ portfolio }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isTop?: boolean,
  ) => {
    e.preventDefault();
    if (isTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
    close();
  };

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-3xl">
        {/* Main bar */}
        <nav
          className="flex items-center justify-between px-5 py-3 rounded-2xl border border-black/[0.06]"
          style={NAV_STYLE}
        >
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, "#", true)}
            className="font-pixel text-xs tracking-[0.25em] text-black/70 hover:text-black transition-colors"
          >
            YUUTA
          </a>

          {/* Desktop links */}
          <div
            className="hidden md:flex items-center gap-7"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => handleLinkClick(e, l.href, l.isTop)}
                className="text-[11px] text-black/60 hover:text-black transition-colors duration-200 tracking-wide font-medium"
              >
                {l.label.toUpperCase()}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {portfolio?.hero?.resumeFile ? (
              <a
                href={portfolio.hero.resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="text-[11px] px-4 py-2 rounded-xl border border-black/10 text-black/60 hover:text-black hover:border-black/20 hover:bg-black/[0.03] transition-all duration-200 tracking-wide font-medium hidden md:block"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
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
                className="text-[11px] px-4 py-2 rounded-xl border border-black/10 text-black/60 hover:text-black hover:border-black/20 hover:bg-black/[0.03] transition-all duration-200 tracking-wide font-medium hidden md:block"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                DOWNLOAD CV
              </button>
            )}

            {/* Burger — mobile only */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] rounded-lg hover:bg-black/[0.04] transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span
                className="block h-px bg-black/60 transition-all duration-300 origin-center"
                style={{
                  width: "18px",
                  transform: open ? "translateY(6px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block h-px bg-black/60 transition-all duration-300"
                style={{
                  width: "18px",
                  opacity: open ? 0 : 1,
                  transform: open ? "scaleX(0)" : "none",
                }}
              />
              <span
                className="block h-px bg-black/60 transition-all duration-300 origin-center"
                style={{
                  width: "18px",
                  transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div
          className="md:hidden mt-2 overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: open ? "380px" : "0px", opacity: open ? 1 : 0 }}
        >
          <div
            className="rounded-2xl border border-black/[0.06] px-2 py-2 flex flex-col"
            style={NAV_STYLE}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => handleLinkClick(e, l.href, l.isTop)}
                className="px-4 py-3 text-sm text-black/60 hover:text-black hover:bg-black/[0.03] rounded-xl transition-colors tracking-wide"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {l.label}
              </a>
            ))}
            <div className="mt-1 px-2 pb-1">
              {portfolio?.hero?.resumeFile ? (
                <a
                  href={portfolio.hero.resumeFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="block text-center text-[11px] px-4 py-2.5 rounded-xl border border-black/10 text-black/60 hover:text-black hover:border-black/20 hover:bg-black/[0.03] transition-all duration-200 tracking-wide font-medium"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
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
                  className="w-full text-center text-[11px] px-4 py-2.5 rounded-xl border border-black/10 text-black/60 hover:text-black hover:border-black/20 hover:bg-black/[0.03] transition-all duration-200 tracking-wide font-medium"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  DOWNLOAD CV
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
