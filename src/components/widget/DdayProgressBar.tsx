"use client";

interface DdayProgressBarProps {
  percentage: number;
  textColor: string;
  barColor?: string;
}

export default function DdayProgressBar({
  percentage,
  textColor,
  barColor = "",
}: DdayProgressBarProps) {
  const resolvedBarColor = barColor || textColor;

  return (
    <div className="w-full px-6 mt-3">
      <div
        className="w-full h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: `#${resolvedBarColor}33` }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: `#${resolvedBarColor}`,
          }}
        />
      </div>
      <p
        className="text-xs mt-1 text-right opacity-60"
        style={{ color: `#${textColor}` }}
      >
        {percentage}%
      </p>
    </div>
  );
}
