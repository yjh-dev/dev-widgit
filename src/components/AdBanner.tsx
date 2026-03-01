"use client";

import { useEffect, useRef } from "react";

/**
 * Google AdSense 디스플레이 광고 슬롯.
 * 에디터/홈 페이지에서 사용. 위젯 렌더링 페이지에는 사용하지 않는다.
 *
 * 사용법:
 * 1. Google AdSense 승인 후 data-ad-client, data-ad-slot 값을 설정
 * 2. layout.tsx <head>에 AdSense 스크립트 태그 추가 (아래 ADSENSE_SCRIPT 참고)
 *
 * ADSENSE_SCRIPT (layout.tsx <head>에 추가):
 * <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
 */

// 환경 변수 또는 하드코딩. AdSense 승인 후 .env.local에 설정하면 자동 활성화.
const AD_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXXXXXXXXXXXXXX";
const AD_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT ?? "XXXXXXXXXX";

interface AdBannerProps {
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  className?: string;
}

export default function AdBanner({ format = "auto", className }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    // AdSense가 로드되지 않은 경우 (개발 환경 등) 스킵
    if (pushed.current) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const adsbygoogle = (window as any).adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
        pushed.current = true;
      }
    } catch {
      // AdSense 미설정 시 무시
    }
  }, []);

  // AD_CLIENT가 placeholder이면 아무것도 표시하지 않음
  if (AD_CLIENT.includes("XXXX")) {
    return null;
  }

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
