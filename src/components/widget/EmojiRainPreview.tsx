"use client";

import { useEffect, useRef, useMemo } from "react";
import {
  parseEmojis,
  SPEED_MULTIPLIER,
  DENSITY_COUNT,
  type SpeedKey,
  type DensityKey,
} from "@/lib/emoji-rain";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface EmojiRainPreviewProps {
  emojis?: string;
  speed?: SpeedKey;
  density?: DensityKey;
  minSize?: number;
  maxSize?: number;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
}

interface RainDrop {
  emoji: string;
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
}

export default function EmojiRainPreview({
  emojis = "🎉🎊✨💖🌟",
  speed = "normal",
  density = "normal",
  minSize = 16,
  maxSize = 32,
  bg = "FFFFFF",
  transparentBg = true,
  borderRadius = 16,
  padding = 0,
}: EmojiRainPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropsRef = useRef<RainDrop[]>([]);
  const rafRef = useRef<number>(0);
  const initializedRef = useRef(false);
  const reducedMotion = useReducedMotion();

  const emojiList = useMemo(() => parseEmojis(emojis), [emojis]);
  const count = DENSITY_COUNT[density];
  const speedMul = SPEED_MULTIPLIER[speed];

  // Initialize / re-init drops when config changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w <= 0 || h <= 0) return;

    canvas.width = w;
    canvas.height = h;

    const drops: RainDrop[] = [];
    for (let i = 0; i < count; i++) {
      drops.push({
        emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
        x: Math.random() * w,
        y: Math.random() * h * 2 - h, // spread across the height for natural start
        speed: 0.5 + Math.random() * 1.5,
        size: minSize + Math.random() * (maxSize - minSize),
        opacity: 0.5 + Math.random() * 0.5,
      });
    }
    dropsRef.current = drops;
    initializedRef.current = true;
  }, [emojiList, count, minSize, maxSize]);

  // Animation loop (or static frame for reduced motion)
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Reduced motion: draw one static frame and stop
    if (reducedMotion) {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w <= 0 || h <= 0) return;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        // Clamp y to visible area for static display
        if (d.y < 0) d.y = Math.random() * h;
        if (d.y > h) d.y = Math.random() * h;
        ctx.globalAlpha = d.opacity;
        ctx.font = `${d.size}px serif`;
        ctx.textBaseline = "top";
        ctx.fillText(d.emoji, d.x, d.y);
      }
      ctx.globalAlpha = 1;
      return;
    }

    let lastTime = 0;
    let paused = false;

    const onVisChange = () => {
      if (document.hidden) {
        paused = true;
        cancelAnimationFrame(rafRef.current);
      } else {
        paused = false;
        lastTime = 0;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const animate = (time: number) => {
      if (paused) return;

      if (!canvas || !container) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Handle resize
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w <= 0 || h <= 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      if (!lastTime) lastTime = time;
      const delta = (time - lastTime) / 16; // ~60fps normalization
      lastTime = time;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      const drops = dropsRef.current;
      const emList = emojiList;

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        // Move down
        d.y += d.speed * speedMul * delta;

        // Reset when past bottom
        if (d.y > h + d.size) {
          d.y = -(d.size + Math.random() * 40);
          d.x = Math.random() * w;
          d.emoji = emList[Math.floor(Math.random() * emList.length)];
          d.speed = 0.5 + Math.random() * 1.5;
          d.opacity = 0.5 + Math.random() * 0.5;
        }

        // Draw
        ctx.globalAlpha = d.opacity;
        ctx.font = `${d.size}px serif`;
        ctx.textBaseline = "top";
        ctx.fillText(d.emoji, d.x, d.y);
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("visibilitychange", onVisChange);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("visibilitychange", onVisChange);
      cancelAnimationFrame(rafRef.current);
    };
  }, [speedMul, emojiList, reducedMotion]);

  // ResizeObserver to keep canvas in sync
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          canvas.width = width;
          canvas.height = height;
          // Clamp existing drop x-coordinates to new width
          const drops = dropsRef.current;
          for (let i = 0; i < drops.length; i++) {
            if (drops[i].x > width) {
              drops[i].x = Math.random() * width;
            }
          }
        }
      }
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ display: "block" }}
      />
    </div>
  );
}
