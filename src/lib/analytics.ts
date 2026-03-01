/**
 * GA4 커스텀 이벤트 트래킹 유틸리티.
 * GA4가 로드되지 않은 환경(개발/placeholder)에서는 자동으로 무시됩니다.
 */

type GtagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (typeof w.gtag === "function") {
    w.gtag(...args);
  }
}

export function trackEvent({ action, category, label, value }: GtagEvent) {
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

// --- 사전 정의된 이벤트 ---

/** 위젯 URL 복사 */
export function trackCopyUrl(widgetType: string) {
  trackEvent({ action: "copy_url", category: "widget", label: widgetType });
}

/** Embed 코드 복사 */
export function trackCopyEmbed(widgetType: string) {
  trackEvent({ action: "copy_embed", category: "widget", label: widgetType });
}

/** 공유 링크 복사 */
export function trackCopyShareLink(widgetType: string) {
  trackEvent({ action: "copy_share_link", category: "widget", label: widgetType });
}

/** 위젯 에디터 방문 */
export function trackEditorVisit(widgetType: string) {
  trackEvent({ action: "editor_visit", category: "widget", label: widgetType });
}

/** 위젯 저장 (내 위젯) */
export function trackSaveWidget(widgetType: string) {
  trackEvent({ action: "save_widget", category: "widget", label: widgetType });
}

/** 템플릿 URL 복사 */
export function trackTemplateCopy(templateId: string, widgetName: string) {
  trackEvent({ action: "template_copy", category: "template", label: `${templateId}:${widgetName}` });
}

/** 피드백 제출 */
export function trackFeedbackSubmit(feedbackCategory: string) {
  trackEvent({ action: "feedback_submit", category: "feedback", label: feedbackCategory });
}

/** 랜딩 페이지 CTA 클릭 */
export function trackLandingCta(widgetType: string) {
  trackEvent({ action: "landing_cta", category: "landing", label: widgetType });
}

/** 이미지 내보내기 */
export function trackExportImage(widgetType: string) {
  trackEvent({ action: "export_image", category: "widget", label: widgetType });
}

/** SNS 공유 카드 생성 */
export function trackShareCard(widgetType: string) {
  trackEvent({ action: "share_card", category: "widget", label: widgetType });
}

/** 갤러리 제출 */
export function trackGallerySubmit(widgetType: string) {
  trackEvent({ action: "gallery_submit", category: "widget", label: widgetType });
}

/** PWA 설치 */
export function trackPwaInstall() {
  trackEvent({ action: "pwa_install", category: "engagement" });
}

/** 프리셋 적용 */
export function trackPresetApply(widgetType: string, presetName: string) {
  trackEvent({ action: "preset_apply", category: "widget", label: `${widgetType}:${presetName}` });
}

/** 온보딩 완료 */
export function trackOnboardingComplete(step: number) {
  trackEvent({ action: "onboarding_complete", category: "engagement", value: step });
}

/** 블로그 글 조회 */
export function trackBlogView(slug: string) {
  trackEvent({ action: "blog_view", category: "content", label: slug });
}
