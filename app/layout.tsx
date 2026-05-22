import type { Metadata } from "next";
import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";
import { GoogleTagManagerRoot } from "@/components/analytics/google-tag-manager-root";
import { GtmTracker } from "@/components/analytics/gtm-tracker";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HERO, SITE } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.name} — Estudio de productos digitales`,
    template: `%s | ${SITE.name}`,
  },
  description: HERO.tagline,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE.name,
    description: HERO.tagline,
    type: "website",
    locale: "es_ES",
    siteName: SITE.name,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: HERO.tagline,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/hummingbird.svg", type: "image/svg+xml" }],
    shortcut: "/hummingbird.svg",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="es" className={`${dmSans.variable} ${lora.variable}`}>
      <GoogleTagManagerRoot />
      <body className="noise-overlay font-sans antialiased">
        <GtmTracker />
        <LenisProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
};

export default RootLayout;
