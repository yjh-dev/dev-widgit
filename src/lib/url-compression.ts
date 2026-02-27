import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

/**
 * 위젯 URL의 쿼리 파라미터를 LZ 압축하여 ?c=... 형태로 단축한다.
 * 압축 결과가 원본보다 길면 원본 URL을 그대로 반환한다.
 */
export function compressWidgetUrl(fullUrl: string): string {
  const url = new URL(fullUrl);
  const params = url.searchParams;

  // 파라미터가 없으면 압축 불필요
  if ([...params.keys()].length === 0) return fullUrl;

  const obj: Record<string, string> = {};
  params.forEach((v, k) => {
    obj[k] = v;
  });

  const compressed = compressToEncodedURIComponent(JSON.stringify(obj));
  const shortUrl = `${url.origin}${url.pathname}?c=${compressed}`;

  return shortUrl.length < fullUrl.length ? shortUrl : fullUrl;
}

/**
 * LZ 압축된 문자열을 URLSearchParams로 복원한다.
 * 실패 시 null을 반환한다.
 */
export function decompressToParams(
  compressed: string,
): URLSearchParams | null {
  try {
    const json = decompressFromEncodedURIComponent(compressed);
    if (!json) return null;

    const obj = JSON.parse(json) as Record<string, string>;
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(obj)) {
      params.set(k, v);
    }
    return params;
  } catch {
    return null;
  }
}
