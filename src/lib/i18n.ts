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
    // Home — Hero
    "home.title": "Widgit",
    "home.heroTitle1": "노션 위젯,",
    "home.heroTitle2": "URL 하나",
    "home.heroTitle3": "로 완성",
    "home.heroDesc": "종 위젯을 자유롭게 커스터마이징하고, 노션에 바로 임베드하세요. 서버 없이, 완전 무료로 사용할 수 있습니다.",
    "home.heroCta": "위젯 둘러보기",
    "home.heroGuide": "사용 가이드",
    "home.desc": "URL 하나로 동작하는 노션 전용 위젯을 만들어보세요.",
    "home.desc2": "서버 없이, 무한히 커스터마이징 가능합니다.",
    "home.search": "위젯 검색...",
    "home.all": "전체",
    "home.noResult": "에 해당하는 위젯이 없습니다.",
    "home.resultCount": "개의 위젯을 찾았습니다",
    "home.recentWidgets": "최근 사용한 위젯",

    // Home — Stats
    "home.statWidgets": "위젯",
    "home.statFree": "무료",
    "home.statFreeLabel": "영구 무료",
    "home.statServerless": "서버리스",
    "home.statServerlessLabel": "서버·DB 불필요",

    // Home — How to use
    "home.howToUse": "사용 방법",

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
    "nav.intro": "서비스 소개",
    "nav.iconMaker": "아이콘 만들기",
    "nav.coverMaker": "커버 이미지 만들기",
    "nav.groupMaker": "위젯 그룹 만들기",
    "nav.badgeMaker": "뱃지 만들기",
    "nav.cardMaker": "카드 이미지 만들기",
    "nav.blog": "블로그",
    "nav.feedback": "피드백",
    "nav.terms": "이용약관",
    "nav.privacy": "개인정보처리방침",
    "nav.settings": "설정",
    "nav.backToTemplates": "추천 조합으로",

    // Categories
    "cat.timeDateTitle": "시간 & 날짜",
    "cat.progressTitle": "진행률 & 목표",
    "cat.productivityTitle": "생산성 & 도구",
    "cat.socialTitle": "소셜 & 링크",
    "cat.contentTitle": "콘텐츠 & 장식",

    // Editor
    "editor.preview": "미리보기",
    "editor.urlCopied": "위젯 URL이 클립보드에 복사되었습니다!",
    "editor.reset": "초기화",
    "editor.resetConfirm": "설정을 초기화할까요?",
    "editor.resetDesc": "모든 설정이 기본값으로 되돌아갑니다. 이 작업은 되돌릴 수 없습니다.",
    "editor.cancel": "취소",
    "editor.shortUrl": "짧은 URL",
    "editor.widgetUrl": "위젯 URL",
    "editor.copyUrl": "URL 복사",
    "editor.embedCode": "Embed 코드",
    "editor.shareLink": "공유 링크",
    "editor.openNew": "새 탭에서 열기",
    "editor.saveImage": "이미지로 저장",
    "editor.settingsDesc": "설정을 변경하면 프리뷰에 실시간으로 반영됩니다.",
    "editor.snsCard": "SNS 공유 카드",
    "editor.importUrl": "기존 URL 불러오기",
    "editor.embedGuide": "노션에 임베드하는 방법",
    "editor.importPlaceholder": "기존 위젯 URL 붙여넣기",
    "editor.loadBtn": "불러오기",
    "editor.shortUrlCopied": "짧은 URL이 복사되었습니다!",
    "editor.embedCopied": "Embed 코드가 복사되었습니다!",
    "editor.shareLinkCopied": "에디터 공유 링크가 복사되었습니다!",
    "editor.imageSaved": "이미지가 다운로드되었습니다!",
    "editor.imageFailed": "이미지 내보내기에 실패했습니다.",
    "editor.noPreview": "프리뷰를 찾을 수 없습니다.",
    "editor.invalidUrl": "올바른 URL을 입력하세요.",
    "editor.notWidgetUrl": "위젯 URL 형식이 아닙니다. (/widget/... 형태)",
    "editor.enterUrl": "URL을 입력하세요.",
    "editor.themeApplied": "테마가 적용되었습니다!",

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
    // Home — Hero
    "home.title": "Widgit",
    "home.heroTitle1": "Notion Widgets,",
    "home.heroTitle2": "One URL",
    "home.heroTitle3": " is All You Need",
    "home.heroDesc": " widgets to freely customize and embed in Notion. No server, completely free.",
    "home.heroCta": "Browse Widgets",
    "home.heroGuide": "User Guide",
    "home.desc": "Create Notion-only widgets that work with just a URL.",
    "home.desc2": "No server needed, infinitely customizable.",
    "home.search": "Search widgets...",
    "home.all": "All",
    "home.noResult": "No widgets found.",
    "home.resultCount": "widgets found",
    "home.recentWidgets": "Recently used widgets",

    // Home — Stats
    "home.statWidgets": "Widgets",
    "home.statFree": "Free",
    "home.statFreeLabel": "Free forever",
    "home.statServerless": "Serverless",
    "home.statServerlessLabel": "No server or DB",

    // Home — How to use
    "home.howToUse": "HOW TO USE",

    // Steps
    "step.select": "Select Widget",
    "step.selectDesc": "Pick a widget",
    "step.customize": "Customize",
    "step.customizeDesc": "Set colors & styles",
    "step.copy": "Copy URL",
    "step.copyDesc": "Copy generated URL",
    "step.embed": "Embed in Notion",
    "step.embedDesc": "Paste with /embed",

    // Navigation
    "nav.templates": "Templates",
    "nav.guide": "Embed Guide",
    "nav.myWidgets": "My Widgets",
    "nav.gallery": "Gallery",
    "nav.home": "Home",
    "nav.intro": "About",
    "nav.iconMaker": "Icon Maker",
    "nav.coverMaker": "Cover Image Maker",
    "nav.groupMaker": "Widget Group Maker",
    "nav.badgeMaker": "Badge Maker",
    "nav.cardMaker": "Card Image Maker",
    "nav.blog": "Blog",
    "nav.feedback": "Feedback",
    "nav.terms": "Terms",
    "nav.privacy": "Privacy Policy",
    "nav.settings": "Settings",
    "nav.backToTemplates": "Back to Templates",

    // Categories
    "cat.timeDateTitle": "Time & Date",
    "cat.progressTitle": "Progress & Goals",
    "cat.productivityTitle": "Productivity & Tools",
    "cat.socialTitle": "Social & Links",
    "cat.contentTitle": "Content & Decoration",

    // Editor
    "editor.preview": "Preview",
    "editor.urlCopied": "Widget URL copied to clipboard!",
    "editor.reset": "Reset",
    "editor.resetConfirm": "Reset settings?",
    "editor.resetDesc": "All settings will be restored to defaults. This cannot be undone.",
    "editor.cancel": "Cancel",
    "editor.shortUrl": "Short URL",
    "editor.widgetUrl": "Widget URL",
    "editor.copyUrl": "Copy URL",
    "editor.embedCode": "Embed code",
    "editor.shareLink": "Share link",
    "editor.openNew": "Open in new tab",
    "editor.saveImage": "Save as image",
    "editor.settingsDesc": "Changes are reflected in the preview in real-time.",
    "editor.snsCard": "SNS Share Card",
    "editor.importUrl": "Import existing URL",
    "editor.embedGuide": "How to embed in Notion",
    "editor.importPlaceholder": "Paste existing widget URL",
    "editor.loadBtn": "Load",
    "editor.shortUrlCopied": "Short URL copied!",
    "editor.embedCopied": "Embed code copied!",
    "editor.shareLinkCopied": "Editor share link copied!",
    "editor.imageSaved": "Image downloaded!",
    "editor.imageFailed": "Failed to export image.",
    "editor.noPreview": "Preview not found.",
    "editor.invalidUrl": "Please enter a valid URL.",
    "editor.notWidgetUrl": "Not a widget URL format. (must be /widget/...)",
    "editor.enterUrl": "Please enter a URL.",
    "editor.themeApplied": "Theme applied!",

    // Common
    "common.save": "Save",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.duplicate": "Duplicate",
    "common.export": "Export",
    "common.import": "Import",

    // Footer
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
