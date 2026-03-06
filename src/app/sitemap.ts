import type { MetadataRoute } from "next";
import { articles } from "@/lib/blog";

const BASE_URL = "https://wiget-tree.vercel.app";

const widgetTypes = [
  "dday", "clock", "analog-clock", "mini-calendar", "timeline", "flip-clock",
  "time-progress", "life-calendar", "goal",
  "pomodoro", "stopwatch", "counter", "habit", "qr-code", "dice",
  "quote", "banner", "bookmark", "music", "weather", "moon-phase",
  "sticky-note", "gradient", "typewriter", "todo", "github-contribution", "profile-card", "link-tree", "breathing",
  "world-clock", "countdown", "stats-card", "color-palette", "divider", "timetable", "flashcard", "water-tracker", "image-card", "currency",
  "age-calculator", "radar-chart", "pie-chart", "stepper", "battery", "testimonial", "emoji-rain", "changelog", "matrix", "multi-progress",
  "fortune-cookie", "badge", "group",
  "season-countdown", "gpa-calculator",
  "kanban", "routine-timer", "password-gen", "social-counter", "guestbook", "poll",
  "mini-gallery", "ascii-art", "noise-bg", "daily-color", "mini-map",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-03-01");

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/templates`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guide`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/my-widgets`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/settings`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/feedback`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const editorPages: MetadataRoute.Sitemap = widgetTypes.map((type) => ({
    url: `${BASE_URL}/create/${type}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const blogPages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const landingPages: MetadataRoute.Sitemap = widgetTypes.map((type) => ({
    url: `${BASE_URL}/widgets/${type}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...editorPages, ...landingPages, ...blogPages];
}
