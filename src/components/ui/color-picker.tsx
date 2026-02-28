"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const PRESET_COLORS = [
  "000000", "1E1E1E", "6B7280", "FFFFFF",
  "2563EB", "3B82F6", "E11D48", "EF4444",
  "22C55E", "10B981", "F59E0B", "8B5CF6",
];

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export default function ColorPicker({
  value,
  onChange,
  label,
  id,
  disabled,
  placeholder = "000000",
  className,
}: ColorPickerProps) {
  const nativeRef = useRef<HTMLInputElement>(null);

  const handleHexInput = (raw: string) => {
    onChange(raw.replace(/[^0-9a-fA-F]/g, "").slice(0, 6));
  };

  const handleNativeChange = (hex: string) => {
    onChange(hex.replace("#", "").toUpperCase());
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">#</span>
        <Input
          id={id}
          value={value}
          onChange={(e) => handleHexInput(e.target.value)}
          maxLength={6}
          placeholder={placeholder}
          disabled={disabled}
        />
        <button
          type="button"
          disabled={disabled}
          className="relative w-8 h-8 rounded border shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: `#${value || placeholder}` }}
          onClick={() => nativeRef.current?.click()}
          aria-label="색상 선택기 열기"
        >
          <input
            ref={nativeRef}
            type="color"
            value={`#${value || placeholder}`}
            onChange={(e) => handleNativeChange(e.target.value)}
            className="sr-only"
            tabIndex={-1}
          />
        </button>
      </div>

      {!disabled && (
        <div className="flex flex-wrap gap-1.5">
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onChange(c)}
              className={cn(
                "w-5 h-5 rounded-full border transition-transform hover:scale-110",
                value === c && "ring-2 ring-ring ring-offset-1",
              )}
              style={{ backgroundColor: `#${c}` }}
              aria-label={`색상 #${c}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
