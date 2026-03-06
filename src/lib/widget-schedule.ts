"use client";

import { useState, useEffect } from "react";

/** 로컬 자정 기준 Date 생성 */
function toLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** 오늘 로컬 자정 Date */
function todayLocal(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export type ScheduleStatus = "visible" | "before" | "after";

/** 현재 날짜가 showFrom ~ showUntil 범위 내인지 확인한다. */
export function checkSchedule(
  showFrom?: string,
  showUntil?: string,
): ScheduleStatus {
  const today = todayLocal();

  if (showFrom) {
    const from = toLocalDate(showFrom);
    if (today < from) return "before";
  }

  if (showUntil) {
    const until = toLocalDate(showUntil);
    if (today > until) return "after";
  }

  return "visible";
}

/** 자정에 자동으로 재체크하는 스케줄 가시성 훅 */
export function useScheduleVisibility(
  showFrom?: string,
  showUntil?: string,
): ScheduleStatus {
  const [status, setStatus] = useState<ScheduleStatus>(() =>
    checkSchedule(showFrom, showUntil),
  );

  useEffect(() => {
    setStatus(checkSchedule(showFrom, showUntil));

    // 다음 자정까지 남은 ms 계산
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );
    const msToMidnight = nextMidnight.getTime() - now.getTime();

    const timeout = setTimeout(() => {
      setStatus(checkSchedule(showFrom, showUntil));
    }, msToMidnight);

    return () => clearTimeout(timeout);
  }, [showFrom, showUntil]);

  return status;
}
