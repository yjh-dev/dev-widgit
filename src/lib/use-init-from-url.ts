"use client";

import { useEffect, useRef } from "react";
import { decompressToParams } from "./url-compression";

/**
 * 마운트 시 URL 파라미터를 읽어 콜백으로 전달한다.
 * ?c=<compressed> 형태의 압축 URL도 자동 해제한다.
 * 위젯 파라미터가 없으면(from 등 메타 파라미터 제외) 콜백을 호출하지 않는다.
 */
export function useInitFromUrl(init: (params: URLSearchParams) => void) {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const raw = new URLSearchParams(window.location.search);

    // "from" 같은 메타 파라미터만 있으면 무시
    const widgetKeys = [...raw.keys()].filter((k) => k !== "from");
    if (widgetKeys.length === 0) return;

    // 압축 URL 처리
    const compressed = raw.get("c");
    if (compressed) {
      const decompressed = decompressToParams(compressed);
      if (decompressed) {
        init(decompressed);
        return;
      }
    }

    init(raw);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
