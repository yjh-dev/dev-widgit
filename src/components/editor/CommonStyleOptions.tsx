"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BORDER_RADIUS_OPTIONS,
  PADDING_OPTIONS,
  FONT_SIZE_OPTIONS,
  type FontSizeKey,
} from "@/lib/common-widget-options";

interface CommonStyleOptionsProps {
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  onBorderRadiusChange: (v: number) => void;
  onPaddingChange: (v: number) => void;
  onFontSizeChange: (v: FontSizeKey) => void;
}

export default function CommonStyleOptions({
  borderRadius,
  padding,
  fontSize,
  onBorderRadiusChange,
  onPaddingChange,
  onFontSizeChange,
}: CommonStyleOptionsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label>모서리 둥글기</Label>
        <Select
          value={String(borderRadius)}
          onValueChange={(v) => onBorderRadiusChange(Number(v))}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {BORDER_RADIUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={String(opt.value)}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>안쪽 여백</Label>
        <Select
          value={String(padding)}
          onValueChange={(v) => onPaddingChange(Number(v))}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PADDING_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={String(opt.value)}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>글자 크기</Label>
        <Select
          value={fontSize}
          onValueChange={(v) => onFontSizeChange(v as FontSizeKey)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_SIZE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
