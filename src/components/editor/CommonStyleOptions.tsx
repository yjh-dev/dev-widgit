"use client";

import { Label } from "@/components/ui/label";
import ColorPicker from "@/components/ui/color-picker";
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
  TEXT_SHADOW_OPTIONS,
  BORDER_WIDTH_OPTIONS,
  OPACITY_OPTIONS,
  LETTER_SPACING_OPTIONS,
  type FontSizeKey,
  type TextShadowKey,
  type BorderWidthKey,
  type OpacityKey,
  type LetterSpacingKey,
} from "@/lib/common-widget-options";

interface CommonStyleOptionsProps {
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  onBorderRadiusChange: (v: number) => void;
  onPaddingChange: (v: number) => void;
  onFontSizeChange: (v: FontSizeKey) => void;
  tshadow: TextShadowKey;
  bw: BorderWidthKey;
  bc: string;
  opacity: OpacityKey;
  ls: LetterSpacingKey;
  onTshadowChange: (v: TextShadowKey) => void;
  onBwChange: (v: BorderWidthKey) => void;
  onBcChange: (v: string) => void;
  onOpacityChange: (v: OpacityKey) => void;
  onLsChange: (v: LetterSpacingKey) => void;
}

export default function CommonStyleOptions({
  borderRadius,
  padding,
  fontSize,
  onBorderRadiusChange,
  onPaddingChange,
  onFontSizeChange,
  tshadow,
  bw,
  bc,
  opacity,
  ls,
  onTshadowChange,
  onBwChange,
  onBcChange,
  onOpacityChange,
  onLsChange,
}: CommonStyleOptionsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="style-border-radius">모서리 둥글기</Label>
        <Select
          value={String(borderRadius)}
          onValueChange={(v) => onBorderRadiusChange(Number(v))}
        >
          <SelectTrigger id="style-border-radius" className="w-full">
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
        <Label htmlFor="style-padding">안쪽 여백</Label>
        <Select
          value={String(padding)}
          onValueChange={(v) => onPaddingChange(Number(v))}
        >
          <SelectTrigger id="style-padding" className="w-full">
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
        <Label htmlFor="style-font-size">글자 크기</Label>
        <Select
          value={fontSize}
          onValueChange={(v) => onFontSizeChange(v as FontSizeKey)}
        >
          <SelectTrigger id="style-font-size" className="w-full">
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
      <div className="space-y-2">
        <Label htmlFor="style-tshadow">텍스트 그림자</Label>
        <Select
          value={tshadow}
          onValueChange={(v) => onTshadowChange(v as TextShadowKey)}
        >
          <SelectTrigger id="style-tshadow" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TEXT_SHADOW_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="style-bw">테두리 두께</Label>
        <Select
          value={bw}
          onValueChange={(v) => onBwChange(v as BorderWidthKey)}
        >
          <SelectTrigger id="style-bw" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {BORDER_WIDTH_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {bw !== "none" && (
        <ColorPicker
          id="style-bc"
          label="테두리 색상"
          value={bc}
          onChange={onBcChange}
          placeholder="D1D5DB"
        />
      )}
      <div className="space-y-2">
        <Label htmlFor="style-opacity">투명도</Label>
        <Select
          value={opacity}
          onValueChange={(v) => onOpacityChange(v as OpacityKey)}
        >
          <SelectTrigger id="style-opacity" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {OPACITY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="style-ls">자간</Label>
        <Select
          value={ls}
          onValueChange={(v) => onLsChange(v as LetterSpacingKey)}
        >
          <SelectTrigger id="style-ls" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LETTER_SPACING_OPTIONS.map((opt) => (
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
