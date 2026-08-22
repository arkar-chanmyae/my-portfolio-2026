"use client";

import { useEffect, useRef } from "react";

export function AnimatedSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // const chars = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";
    const chars = "➕";
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const radius = Math.min(rect.width, rect.height) * 0.48;

      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const points: { x: number; y: number; z: number; char: string }[] = [];

      // Generate sphere points with true rigid spherical geometry
      for (let phi = 0; phi < Math.PI * 2; phi += 0.15) {
        for (let theta = 0; theta < Math.PI; theta += 0.15) {
          const x0 = Math.sin(theta) * Math.cos(phi);
          const y0 = Math.sin(theta) * Math.sin(phi);
          const z0 = Math.cos(theta);

          // Rotate around Y axis
          const rotY = time * 0.3;
          const cosY = Math.cos(rotY);
          const sinY = Math.sin(rotY);
          const x1 = x0 * cosY + z0 * sinY;
          const z1 = -x0 * sinY + z0 * cosY;

          // Rotate around X axis
          const rotX = time * 0.2;
          const cosX = Math.cos(rotX);
          const sinX = Math.sin(rotX);
          const y1 = y0 * cosX - z1 * sinX;
          const z2 = y0 * sinX + z1 * cosX;

          const depth = (z2 + 1) / 2;
          const charIndex = Math.min(
            chars.length - 1,
            Math.max(0, Math.floor(depth * chars.length)),
          );

          points.push({
            x: centerX + x1 * radius,
            y: centerY + y1 * radius,
            z: z2,
            char: chars[charIndex],
          });
        }
      }

      // Sort by z for depth
      points.sort((a, b) => a.z - b.z);

      // Draw points
      points.forEach((point) => {
        const alpha = 0.12 + (point.z + 1) * 0.35;
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.fillText(point.char, point.x, point.y);
      });

      time += 0.02;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full aspect-square"
      style={{ display: "block" }}
    />
  );
}
