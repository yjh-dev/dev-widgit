"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { COLOR_PALETTES } from "@/lib/color-palettes";

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
        <div className="space-y-2">
          {COLOR_PALETTES.map((category) => (
            <div key={category.name}>
              <p className="text-[10px] text-muted-foreground mb-1">{category.name}</p>
              <div className="flex flex-wrap gap-1.5">
                {category.colors.map((c) => (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
