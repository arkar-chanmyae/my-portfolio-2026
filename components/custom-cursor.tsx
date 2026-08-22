"use client";

import React, { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorScale, setCursorScale] = useState(2.0);
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Skip the custom cursor entirely on touch-only devices (no mouse cursor to replace)
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches
    ) {
      return;
    }
    document.body.classList.add("has-custom-cursor");

    // Track theme so the prism colors flip with light/dark mode
    const updateTheme = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    updateTheme();
    const themeObserver = new MutationObserver(updateTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // 1. Explicit data-cursor-scale override (e.g. 1.5x)
      const scaleEl = target.closest("[data-cursor-scale]") as HTMLElement;
      if (scaleEl) {
        const val = parseFloat(
          scaleEl.getAttribute("data-cursor-scale") || "1.5",
        );
        setCursorScale(val);
        setIsHovering(true);
        return;
      }

      // 2. Global interactive elements (buttons, links, clickable items/cards)
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".exp-option-item") ||
        target.closest(".exp-inactive-option") ||
        target.closest("[data-interactive]");

      if (isInteractive) {
        setIsHovering(true);
        setCursorScale(2.35); // slightly larger when hovering
      } else {
        setIsHovering(false);
        setCursorScale(2.0); // increased base scale to 2.0
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      themeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (!mounted || !isVisible) return null;

  // Pyramid geometry
  const faceW = 14;
  const faceH = 22;
  const containerW = 24;
  const containerH = 28;
  const faceLeft = (containerW - faceW) / 2; // center faces horizontally

  // The side face SVG triangle: apex at top-center, base at bottom
  const sideFacePoints = `${faceW / 2},0 0,${faceH} ${faceW},${faceH}`;

  // The bottom face: equilateral triangle lying flat, roughly matching the base spread
  const bottomSize = 16;
  const bottomH = (bottomSize * Math.sqrt(3)) / 2;
  const bottomPoints = `${bottomSize / 2},0 0,${bottomH} ${bottomSize},${bottomH}`;

  return (
    <div
      className="fixed pointer-events-none z-[99999] select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        // Tip of the pyramid = the mouse hot-spot
        transform: "translate(-50%, 0%)",
        willChange: "left, top",
      }}
    >
      {/* (Radial tip shadow removed) */}

      {/* Outer tilt wrapper — inclined like a standard OS cursor */}
      <div
        className="relative transition-transform duration-300 ease-out"
        style={{
          width: `${containerW}px`,
          height: `${containerH}px`,
          perspective: "500px",
          transformOrigin: "top center",
          transform: `scale(${cursorScale}) rotateZ(-22.5deg) rotateX(20deg)`,
        }}
      >
        {/* Rotating prism core */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: `${containerW / 2}px 0px`, // rotate around the apex
            animation: isHovering
              ? "rotatePrismY 1.2s linear infinite"
              : "rotatePrismY 2.5s linear infinite",
          }}
        >
          {/* --- Three side faces sharing the same apex --- */}
          {[0, 120, 240].map((angle) => (
            <svg
              key={angle}
              className="absolute"
              width={faceW}
              height={faceH}
              viewBox={`0 0 ${faceW} ${faceH}`}
              style={{
                top: 0,
                left: `${faceLeft}px`,
                transformOrigin: "50% 0%", // hinge from the shared apex
                transform: `rotateY(${angle}deg)`,
                backfaceVisibility: "visible",
              }}
            >
              <polygon
                points={sideFacePoints}
                fill={
                  isDark ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.10)"
                }
                stroke={
                  isDark ? "rgba(255, 255, 255, 0.75)" : "rgba(0, 0, 0, 0.55)"
                }
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
            </svg>
          ))}

          {/* --- Bottom face — equilateral triangle lying flat --- */}
          <svg
            className="absolute"
            width={bottomSize}
            height={bottomSize}
            viewBox={`0 0 ${bottomSize} ${bottomH}`}
            style={{
              top: `${faceH}px`,
              left: `${(containerW - bottomSize) / 2}px`,
              transformOrigin: "50% 0%",
              transform: "rotateX(90deg)",
              backfaceVisibility: "visible",
            }}
          >
            <polygon
              points={bottomPoints}
              fill={
                isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.07)"
              }
              stroke={
                isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.35)"
              }
              strokeWidth="0.6"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
