"use client";

const PARTICLE_COUNT = 25;
const COLORS = ["#FF6B6B", "#FFE66D", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98FB98"];

interface CelebrationProps {
  active: boolean;
  color?: string;
}

export default function Celebration({ active, color }: CelebrationProps) {
  if (!active) return null;

  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const baseColor = color ? `#${color}` : COLORS[i % COLORS.length];
    const left = Math.random() * 100;
    const delay = Math.random() * 0.5;
    const duration = 1.2 + Math.random() * 0.8;
    const size = 4 + Math.random() * 4;
    const xDrift = (Math.random() - 0.5) * 80;

    return (
      <span
        key={i}
        className="absolute rounded-sm"
        style={{
          left: `${left}%`,
          bottom: "40%",
          width: size,
          height: size,
          backgroundColor: baseColor,
          animation: `wg-confetti ${duration}s ease-out ${delay}s both`,
          transform: `translateX(${xDrift}px)`,
          opacity: 0,
        }}
      />
    );
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {particles}
    </div>
  );
}
