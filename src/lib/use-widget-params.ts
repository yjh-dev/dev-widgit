"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { decompressToParams } from "./url-compression";

/**
 * useSearchParams() 드롭인 대체 훅.
 * `?c=<compressed>` 파라미터가 있으면 LZ 압축 해제 후 URLSearchParams를 반환하고,
 * 없으면 원본 searchParams를 그대로 반환한다 (하위 호환).
 */
export function useWidgetParams(): URLSearchParams {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const compressed = searchParams.get("c");
    if (!compressed) return searchParams;

    const decompressed = decompressToParams(compressed);
    return decompressed ?? searchParams;
  }, [searchParams]);
}
