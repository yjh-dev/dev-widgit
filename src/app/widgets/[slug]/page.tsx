import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { widgetMetadata } from "@/lib/widget-metadata";
import { widgetLandings } from "@/lib/widget-landing";
import WidgetLandingClient from "@/components/widget/WidgetLandingClient";

export function generateStaticParams() {
  return Object.keys(widgetLandings).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = widgetMetadata[slug];
  if (!meta) return {};

  const title = `${meta.name} — 무료 노션 위젯 | Widgit`;
  const landing = widgetLandings[slug];
  const keywords = landing?.keywords ?? [];

  return {
    title,
    description: meta.desc,
    keywords: [meta.name, "노션 위젯", "Notion widget", "무료", ...keywords],
    openGraph: {
      title,
      description: meta.desc,
      siteName: "Widgit",
      type: "website",
      url: `https://widgit.vercel.app/widgets/${slug}`,
    },
    twitter: {
      card: "summary",
      title,
      description: meta.desc,
    },
    alternates: {
      canonical: `https://widgit.vercel.app/widgets/${slug}`,
    },
  };
}

export default async function WidgetLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = widgetMetadata[slug];
  const landing = widgetLandings[slug];

  if (!meta || !landing) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${meta.name} — Widgit`,
    description: meta.desc,
    url: `https://widgit.vercel.app/widgets/${slug}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WidgetLandingClient
        slug={slug}
        name={meta.name}
        desc={meta.desc}
        landing={landing}
      />
    </>
  );
}
