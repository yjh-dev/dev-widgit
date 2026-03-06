"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateSavingsGoalPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/create/goal"); }, [router]);
  return null;
}
