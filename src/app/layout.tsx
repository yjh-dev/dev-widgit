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
  description: "URL 하나로 동작하는 노션 전용 위젯 생성 서비스",
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
