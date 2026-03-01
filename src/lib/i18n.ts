const LS_KEY = "widgit-lang";

export type Locale = "ko" | "en";

export function getLocale(): Locale {
  if (typeof window === "undefined") return "ko";
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved === "en" || saved === "ko") return saved;
  } catch { /* 무시 */ }
  return "ko";
}

export function setLocale(locale: Locale): void {
  try {
    localStorage.setItem(LS_KEY, locale);
  } catch { /* 무시 */ }
}

// 공통 UI 텍스트 사전
const translations = {
  ko: {
    // Home
    "home.title": "Widgit",
    "home.desc": "URL 하나로 동작하는 노션 전용 위젯을 만들어보세요.",
    "home.desc2": "서버 없이, 무한히 커스터마이징 가능합니다.",
    "home.search": "위젯 검색...",
    "home.all": "전체",
    "home.noResult": "에 해당하는 위젯이 없습니다.",
    "home.resultCount": "개의 위젯을 찾았습니다",
    "home.recentWidgets": "최근 사용한 위젯",

    // Steps
    "step.select": "위젯 선택",
    "step.selectDesc": "원하는 위젯 고르기",
    "step.customize": "커스터마이징",
    "step.customizeDesc": "색상·스타일 설정",
    "step.copy": "URL 복사",
    "step.copyDesc": "생성된 URL 복사",
    "step.embed": "노션 임베드",
    "step.embedDesc": "/embed로 붙여넣기",

    // Navigation
    "nav.templates": "추천 조합 보기",
    "nav.guide": "임베드 가이드",
    "nav.myWidgets": "내 위젯",
    "nav.gallery": "갤러리",
    "nav.home": "홈으로",

    // Editor
    "editor.preview": "미리보기",
    "editor.urlCopied": "위젯 URL이 클립보드에 복사되었습니다!",
    "editor.reset": "초기화",
    "editor.resetConfirm": "설정을 초기화할까요?",
    "editor.resetDesc": "모든 설정이 기본값으로 되돌아갑니다.",
    "editor.cancel": "취소",
    "editor.shortUrl": "짧은 URL",
    "editor.widgetUrl": "위젯 URL",
    "editor.copyUrl": "URL 복사",
    "editor.embedCode": "Embed 코드",
    "editor.shareLink": "공유 링크",
    "editor.openNew": "새 탭에서 열기",
    "editor.saveImage": "이미지로 저장",

    // Common
    "common.save": "저장",
    "common.delete": "삭제",
    "common.edit": "수정",
    "common.duplicate": "복제",
    "common.export": "내보내기",
    "common.import": "가져오기",

    // Footer
    "footer.widgets": "종 위젯",
    "footer.serverless": "서버리스",
    "footer.free": "무료",
    "footer.desc": "URL 파라미터만으로 동작하는 무상태 노션 위젯. 서버·DB 없이, 무한히 커스터마이징 가능합니다.",
  },
  en: {
    "home.title": "Widgit",
    "home.desc": "Create Notion-only widgets that work with just a URL.",
    "home.desc2": "No server needed, infinitely customizable.",
    "home.search": "Search widgets...",
    "home.all": "All",
    "home.noResult": "No widgets found.",
    "home.resultCount": "widgets found",
    "home.recentWidgets": "Recently used widgets",

    "step.select": "Select Widget",
    "step.selectDesc": "Pick a widget",
    "step.customize": "Customize",
    "step.customizeDesc": "Set colors & styles",
    "step.copy": "Copy URL",
    "step.copyDesc": "Copy generated URL",
    "step.embed": "Embed in Notion",
    "step.embedDesc": "Paste with /embed",

    "nav.templates": "Templates",
    "nav.guide": "Embed Guide",
    "nav.myWidgets": "My Widgets",
    "nav.gallery": "Gallery",
    "nav.home": "Home",

    "editor.preview": "Preview",
    "editor.urlCopied": "Widget URL copied to clipboard!",
    "editor.reset": "Reset",
    "editor.resetConfirm": "Reset settings?",
    "editor.resetDesc": "All settings will be restored to defaults.",
    "editor.cancel": "Cancel",
    "editor.shortUrl": "Short URL",
    "editor.widgetUrl": "Widget URL",
    "editor.copyUrl": "Copy URL",
    "editor.embedCode": "Embed code",
    "editor.shareLink": "Share link",
    "editor.openNew": "Open in new tab",
    "editor.saveImage": "Save as image",

    "common.save": "Save",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.duplicate": "Duplicate",
    "common.export": "Export",
    "common.import": "Import",

    "footer.widgets": "widgets",
    "footer.serverless": "Serverless",
    "footer.free": "Free",
    "footer.desc": "Stateless Notion widgets powered by URL parameters. No server, no database, infinitely customizable.",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["ko"];

export function t(key: TranslationKey, locale: Locale = "ko"): string {
  return translations[locale][key] ?? translations.ko[key] ?? key;
}
