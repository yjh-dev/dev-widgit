"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  parseEmojis,
  createParticle,
  SPEED_MULTIPLIER,
  DENSITY_COUNT,
  type Particle,
  type SpeedKey,
  type DensityKey,
} from "@/lib/emoji-rain";

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

export default function EmojiRainPreview({
  emojis = "🎉🎊✨💖🌟",
  speed = "normal",
  density = "normal",
  minSize = 16,
  maxSize = 32,
  bg = "FFFFFF",
  transparentBg = true,
  borderRadius = 16,
  padding = 24,
}: EmojiRainPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const [renderParticles, setRenderParticles] = useState<Particle[]>([]);

  const emojiList = parseEmojis(emojis);
  const count = DENSITY_COUNT[density];
  const speedMul = SPEED_MULTIPLIER[speed];

  const initParticles = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const p = createParticle(emojiList, w, h, minSize, maxSize);
      // Spread initial y across the full height for a natural start
      p.y = Math.random() * h - h;
      particles.push(p);
    }
    particlesRef.current = particles;
  }, [count, emojiList, minSize, maxSize]);

  useEffect(() => {
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    let lastTime = 0;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = (time - lastTime) / 16; // normalize to ~60fps
      lastTime = time;

      const el = containerRef.current;
      if (!el) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const h = el.clientHeight;
      const w = el.clientWidth;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speed * speedMul * delta;
        if (p.y > h + p.size) {
          // Reset to top
          p.y = -(p.size + Math.random() * 40);
          p.x = Math.random() * w;
          p.emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
          p.speed = 0.5 + Math.random() * 1.5;
          p.opacity = 0.5 + Math.random() * 0.5;
        }
      }

      setRenderParticles([...particles]);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speedMul, emojiList]);

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
      {renderParticles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            fontSize: p.size,
            opacity: p.opacity,
            lineHeight: 1,
            willChange: "transform",
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
