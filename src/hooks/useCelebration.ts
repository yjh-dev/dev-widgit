"use client";

import { useState, useEffect, useRef } from "react";

/**
 * 미달성 → 달성 전환 시 1회 트리거하는 축하 효과 훅.
 * 2초 후 자동으로 false가 된다.
 */
export function useCelebration(isGoalMet: boolean, enabled = true): boolean {
  const [show, setShow] = useState(false);
  const prevRef = useRef(isGoalMet);

  useEffect(() => {
    // 미달성 → 달성 전환 시에만 트리거
    if (enabled && !prevRef.current && isGoalMet) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
    prevRef.current = isGoalMet;
  }, [isGoalMet, enabled]);

  // prevRef 동기화 (enabled가 변경될 때)
  useEffect(() => {
    prevRef.current = isGoalMet;
  }, [enabled, isGoalMet]);

  return show;
}
