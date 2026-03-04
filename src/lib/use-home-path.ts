"use client";

import { useState, useEffect } from "react";

const SKIP_SPLASH_KEY = "widgit-skip-splash";

export function useHomePath(): string {
  const [path, setPath] = useState("/");

  useEffect(() => {
    if (localStorage.getItem(SKIP_SPLASH_KEY) === "true") {
      setPath("/widgets");
    }
  }, []);

  return path;
}
