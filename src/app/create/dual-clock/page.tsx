"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateDualClockPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/create/world-clock"); }, [router]);
  return null;
}
