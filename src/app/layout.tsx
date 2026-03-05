import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { allFontVariables } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/components/ThemeProvider";
import { LocaleProvider } from "@/components/LocaleProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AdSenseScript from "@/components/AdSenseScript";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import PwaInstallPrompt from "@/components/PwaInstallPrompt";
import DevTools from "@/components/DevTools";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wiget-tree.vercel.app"),
  title: "Wiget-Tree — 노션 위젯 생성기",
  description:
    "URL 하나로 동작하는 노션 전용 위젯 생성 서비스. D-Day, 시계, 명언, 진행률 바 등 53종의 위젯을 무료로 만들어보세요.",
  keywords: [
    "노션 위젯",
    "Notion widget",
    "D-Day",
    "시계 위젯",
    "명언 위젯",
    "진행률 바",
    "뽀모도로",
    "위젯 생성기",
    "노션 꾸미기",
    "Notion embed",
  ],
  manifest: "/manifest.json",
  icons: [
    { url: "/icons/icon.svg", type: "image/svg+xml" },
  ],
  openGraph: {
    title: "Wiget-Tree — 노션 위젯 생성기",
    description:
      "URL 하나로 동작하는 노션 전용 위젯. 서버 없이, 무한히 커스터마이징 가능합니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "Wiget-Tree",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wiget-Tree — 노션 위젯 생성기",
    description:
      "URL 하나로 동작하는 노션 전용 위젯. 53종의 위젯을 무료로 만들어보세요.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#171717" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${allFontVariables} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:text-sm focus:font-medium"
        >
          본문으로 건너뛰기
        </a>
        <ThemeProvider>
          <LocaleProvider>
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
          </LocaleProvider>
          <Toaster position="bottom-center" duration={2000} offset={72} />
        </ThemeProvider>
        <GoogleAnalytics />
        <AdSenseScript />
        <ServiceWorkerRegistration />
        <PwaInstallPrompt />
        <DevTools />
      </body>
    </html>
  );
}
