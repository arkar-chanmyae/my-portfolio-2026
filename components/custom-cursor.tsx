"use client";

import React, { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.classList.add("has-custom-cursor");

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hovering =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer");
      setIsHovering(!!hovering);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("has-custom-cursor");
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
      className="fixed pointer-events-none z-[9999] select-none hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        // Tip of the pyramid = the mouse hot-spot
        transform: "translate(-50%, 0%)",
        willChange: "left, top",
        // Dark shadow around the whole cursor
        filter:
          "drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.35))",
      }}
    >
      {/* Outer tilt wrapper — inclined like a standard OS cursor */}
      <div
        className="relative transition-transform duration-300 ease-out"
        style={{
          width: `${containerW}px`,
          height: `${containerH}px`,
          perspective: "500px",
          transformOrigin: "top center",
          transform: isHovering
            ? "scale(1.35) rotateZ(-22.5deg) rotateX(20deg)"
            : "scale(1.0) rotateZ(-22.5deg) rotateX(20deg)",
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
                fill="rgba(255, 255, 255, 0.18)"
                stroke="rgba(255, 255, 255, 0.75)"
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
              fill="rgba(255, 255, 255, 0.12)"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="0.6"
              strokeLinejoin="round"
            />
          </svg>

          {/* --- Center dot — black --- */}
          <div
            className="absolute rounded-full"
            style={{
              width: "5px",
              height: "5px",
              background: "#000",
              top: `${faceH * 0.55}px`,
              left: `${(containerW - 5) / 2}px`,
              transform: "translateZ(0px)",
              boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.4)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
