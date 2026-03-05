export type NoiseType = "gradient-flow" | "particles" | "waves";

export function createGradientFlow(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color1: string,
  color2: string,
  time: number,
) {
  const grad = ctx.createLinearGradient(
    w * 0.5 + Math.sin(time * 0.5) * w * 0.5,
    0,
    w * 0.5 + Math.cos(time * 0.3) * w * 0.5,
    h,
  );
  grad.addColorStop(0, color1);
  grad.addColorStop(1, color2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

export interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
}

export function createParticles(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color1: string,
  particles: Particle[],
) {
  ctx.clearRect(0, 0, w, h);
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = color1;
    ctx.globalAlpha = 0.6;
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
  }
  ctx.globalAlpha = 1;
}

export function createWaves(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color1: string,
  color2: string,
  time: number,
) {
  ctx.clearRect(0, 0, w, h);
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 5) {
      const y = h * 0.5 + Math.sin(x * 0.02 + time + i * 2) * 30 + i * 20;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = i === 0 ? color1 : i === 1 ? color2 : `${color1}80`;
    ctx.globalAlpha = 0.4;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

export function initParticles(w: number, h: number, count: number = 30): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 3 + 1,
    vx: (Math.random() - 0.5) * 1,
    vy: (Math.random() - 0.5) * 1,
  }));
}

export const NOISE_TYPE_OPTIONS: { value: NoiseType; label: string }[] = [
  { value: "gradient-flow", label: "그라데이션 흐름" },
  { value: "particles", label: "파티클" },
  { value: "waves", label: "파도" },
];
