import React from "react";

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[18px] tracking-widest font-sans text-ink/40 bg-ink/[0.04]">
      {children}
    </span>
  );
}
