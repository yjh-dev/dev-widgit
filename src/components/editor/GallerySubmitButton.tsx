"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GallerySubmitButtonProps {
  widgetType: string;
  widgetUrl: string;
}

export default function GallerySubmitButton({
  widgetType,
  widgetUrl,
}: GallerySubmitButtonProps) {
  const handleSubmit = () => {
    const editorUrl = widgetUrl.replace("/widget/", "/create/");
    const title = encodeURIComponent(`[갤러리 제출] ${widgetType} 위젯`);
    const body = encodeURIComponent(
      [
        "## 위젯 정보",
        "",
        `- **위젯 타입**: ${widgetType}`,
        `- **위젯 URL**: ${widgetUrl}`,
        `- **에디터 URL**: ${editorUrl}`,
        "",
        "## 설명",
        "",
        "이 위젯을 갤러리에 공유합니다!",
        "",
        "---",
        "_이 이슈는 Widgit 에디터에서 자동 생성되었습니다._",
      ].join("\n")
    );

    window.open(
      `https://github.com/widgit-app/widgit/issues/new?title=${title}&body=${body}&labels=gallery`,
      "_blank"
    );
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-8 text-xs"
      onClick={handleSubmit}
    >
      <Send className="w-3.5 h-3.5 mr-1.5" />
      갤러리에 공유
    </Button>
  );
}
