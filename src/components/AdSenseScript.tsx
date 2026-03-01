import Script from "next/script";

const AD_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-XXXXXXXXXXXXXXXX";

export default function AdSenseScript() {
  if (!AD_CLIENT || AD_CLIENT.includes("XXXX")) {
    return null;
  }

  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
