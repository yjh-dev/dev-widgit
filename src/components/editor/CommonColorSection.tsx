"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ColorPicker from "@/components/ui/color-picker";
import type { ReactNode } from "react";

interface CommonColorSectionProps {
  textColor: string;
  textColorLabel?: string;
  onTextColorChange: (v: string) => void;
  bg: string;
  transparentBg: boolean;
  onBgChange: (v: string) => void;
  onTransparentBgChange: (v: boolean) => void;
  /** 기본 색상 피커 위에 추가할 색상 옵션들 */
  before?: ReactNode;
  /** 투명 배경 토글 아래에 추가할 색상 옵션들 */
  after?: ReactNode;
}

/**
 * 에디터 색상 섹션의 공통 패턴.
 * 글자 색상 + 투명 배경 토글 + 배경색을 기본 제공하며,
 * before/after로 위젯 고유 색상 옵션을 삽입할 수 있다.
 */
export default function CommonColorSection({
  textColor,
  textColorLabel = "글자 색상",
  onTextColorChange,
  bg,
  transparentBg,
  onBgChange,
  onTransparentBgChange,
  before,
  after,
}: CommonColorSectionProps) {
  return (
    <>
      {before}
      <ColorPicker
        id="textColor"
        label={textColorLabel}
        value={textColor}
        onChange={onTextColorChange}
        placeholder="1E1E1E"
      />
      {after}
      <div className="flex items-center justify-between">
        <Label htmlFor="transparent">투명 배경</Label>
        <Switch
          id="transparent"
          checked={transparentBg}
          onCheckedChange={onTransparentBgChange}
        />
      </div>
      {!transparentBg && (
        <ColorPicker
          id="bg"
          label="배경색"
          value={bg}
          onChange={onBgChange}
          placeholder="FFFFFF"
        />
      )}
    </>
  );
}
