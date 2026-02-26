import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { allFontVariables } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Widgit - 노션 위젯 생성기",
  description:
    "URL 하나로 동작하는 노션 전용 위젯 생성 서비스. D-Day, 시계, 명언, 진행률 바 등 14종의 위젯을 무료로 만들어보세요.",
  keywords: [
    "노션 위젯",
    "Notion widget",
    "D-Day",
    "시계 위젯",
    "명언 위젯",
    "진행률 바",
    "뽀모도로",
    "위젯 생성기",
  ],
  openGraph: {
    title: "Widgit - 노션 위젯 생성기",
    description:
      "URL 하나로 동작하는 노션 전용 위젯. 서버 없이, 무한히 커스터마이징 가능합니다.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Widgit - 노션 위젯 생성기",
    description:
      "URL 하나로 동작하는 노션 전용 위젯. 14종의 위젯을 무료로 만들어보세요.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${allFontVariables} antialiased`}
      >
        <ThemeProvider>
          {children}
          <Toaster position="bottom-center" duration={2000} />
        </ThemeProvider>
      </body>
    </html>
  );
}
