"use client";

import type { ReactNode } from "react";

interface NotionPageMockupProps {
  children: ReactNode;
}

export default function NotionPageMockup({ children }: NotionPageMockupProps) {
  return (
    <div className="rounded-lg border bg-white dark:bg-[#191919] shadow-sm overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="ml-2 text-xs text-gray-400 dark:text-gray-500 select-none">
          My Notion Page
        </span>
      </div>

      {/* Page content area */}
      <div className="px-4 sm:px-12 py-6 sm:py-8 space-y-4">
        {/* Page title */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 select-none">
          My Page
        </h2>

        {/* Fake text lines */}
        <div className="space-y-2">
          <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Embedded widget */}
        <div className="rounded border border-gray-200 dark:border-gray-700 overflow-hidden">
          {children}
        </div>

        {/* More fake text lines */}
        <div className="space-y-2 pt-2">
          <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
