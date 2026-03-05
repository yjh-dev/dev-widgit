/**
 * 워터마크 제거 라이선스.
 * 일회성 구매 키를 localStorage에 저장하여 위젯 워터마크를 제거한다.
 */

const LS_KEY = "wiget-tree-license";

export interface LicenseInfo {
  key: string;
  activatedAt: number;
}

/** 워터마크 제거 활성화 여부 */
export function isWatermarkRemoved(): boolean {
  return getLicenseInfo() !== null;
}

/** 저장된 라이선스 정보 반환 */
export function getLicenseInfo(): LicenseInfo | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LicenseInfo;
  } catch {
    return null;
  }
}

/**
 * 라이선스 키 포맷 검증.
 * 허용 형식: XXXXX-XXXXX-XXXXX-XXXXX (영숫자 그룹 4개, 하이픈 구분)
 * 또는 길이 16자 이상의 영숫자+하이픈 조합.
 */
function isValidKeyFormat(key: string): boolean {
  // 하이픈 포함 20자 이상, 영숫자+하이픈만 허용
  return /^[A-Z0-9]{4,}(-[A-Z0-9]{4,}){2,}$/.test(key);
}

/** 라이선스 키 저장 */
export function activateLicense(key: string): boolean {
  const trimmed = key.trim().toUpperCase().replace(/\s+/g, "");
  if (!trimmed) return false;

  if (!isValidKeyFormat(trimmed)) return false;

  const info: LicenseInfo = {
    key: trimmed,
    activatedAt: Date.now(),
  };

  try {
    localStorage.setItem(LS_KEY, JSON.stringify(info));
  } catch {
    return false;
  }

  return true;
}

/** 라이선스 제거 */
export function deactivateLicense(): void {
  try {
    localStorage.removeItem(LS_KEY);
  } catch { /* 무시 */ }
}
