import type { MetadataRoute } from "next";

const BASE_URL = "https://widgit.vercel.app";

const widgetTypes = [
  "dday", "clock", "analog-clock", "mini-calendar", "timeline", "flip-clock",
  "time-progress", "life-calendar", "reading", "goal",
  "pomodoro", "stopwatch", "counter", "habit", "qr-code", "dice",
  "quote", "banner", "bookmark", "music", "weather", "moon-phase",
  "sticky-note", "gradient", "typewriter", "todo", "github-contribution", "profile-card", "link-tree", "breathing",
  "world-clock", "countdown", "stats-card", "color-palette", "divider", "timetable", "flashcard", "water-tracker", "image-card", "currency",
  "age-calculator", "radar-chart", "pie-chart", "stepper", "battery", "testimonial", "emoji-rain", "changelog", "matrix", "multi-progress",
  "fortune-cookie", "badge", "group",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/templates`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guide`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/my-widgets`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];

  const editorPages: MetadataRoute.Sitemap = widgetTypes.map((type) => ({
    url: `${BASE_URL}/create/${type}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...editorPages];
}
