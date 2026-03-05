"use client";

import { useRef, useEffect } from "react";
import {
  createGradientFlow,
  createParticles,
  createWaves,
  initParticles,
  type NoiseType,
  type Particle,
} from "@/lib/noise-bg";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface NoiseBgPreviewProps {
  type?: NoiseType;
  color1?: string;
  color2?: string;
  speed?: number;
  opacity?: number;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function NoiseBgPreview({
  type = "gradient-flow",
  color1 = "6366F1",
  color2 = "EC4899",
  speed = 1,
  opacity = 100,
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
}: NoiseBgPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Reset particles when type changes
    if (type === "particles" && canvasRef.current) {
      particlesRef.current = initParticles(
        canvasRef.current.width || 300,
        canvasRef.current.height || 200,
        30,
      );
    }
  }, [type]);

  useEffect(() => {
    const loop = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        if (type === "particles") {
          particlesRef.current = initParticles(w, h, 30);
        }
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const time = performance.now() / 1000 * speed;

      ctx.globalAlpha = opacity / 100;

      if (!transparentBg) {
        ctx.fillStyle = `#${bg}`;
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.clearRect(0, 0, w, h);
      }

      switch (type) {
        case "gradient-flow":
          createGradientFlow(ctx, w, h, `#${color1}`, `#${color2}`, time);
          break;
        case "particles":
          if (particlesRef.current.length === 0) {
            particlesRef.current = initParticles(w, h, 30);
          }
          createParticles(ctx, w, h, `#${color1}`, particlesRef.current);
          break;
        case "waves":
          createWaves(ctx, w, h, `#${color1}`, `#${color2}`, time);
          break;
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [type, color1, color2, speed, opacity, bg, transparentBg]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
      style={{
        borderRadius,
        padding,
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ borderRadius }}
      />
    </div>
  );
}
