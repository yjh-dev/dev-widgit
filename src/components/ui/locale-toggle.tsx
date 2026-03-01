"use client";

import { useLocale } from "@/components/LocaleProvider";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export default function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLocale(locale === "ko" ? "en" : "ko")}
      title={locale === "ko" ? "Switch to English" : "한국어로 전환"}
      aria-label={locale === "ko" ? "Switch to English" : "한국어로 전환"}
      className="w-9 h-9"
    >
      <Languages className="w-4 h-4" />
    </Button>
  );
}
