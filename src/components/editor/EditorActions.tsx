"use client";

import { Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface EditorActionsProps {
  widgetUrl: string;
  onCopy: () => void;
  onReset: () => void;
}

export default function EditorActions({
  widgetUrl,
  onCopy,
  onReset,
}: EditorActionsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>위젯 URL</Label>
        <textarea
          readOnly
          value={widgetUrl}
          rows={2}
          className="w-full rounded-md border bg-muted px-3 py-2 text-xs text-muted-foreground break-all resize-none focus:outline-none"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={onCopy} className="flex-1">
          <Copy className="w-4 h-4 mr-2" />
          URL 복사
        </Button>
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
