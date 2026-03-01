import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import KonamiEgg from "@/components/KonamiEgg";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import PWAInstallButton from "@/components/PWAInstallButton";
import SoundEffects from "@/components/SoundEffects";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  style: ["normal"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://subhanghafoor.vercel.app"  // matches Vercel domain
  ),
  title: "Subhan Ghafoor | Full Stack Developer",
  description:
    "Personal portfolio of Subhan Ghafoor — Full Stack Developer specializing in TypeScript, Python, Next.js, and AI-powered web applications.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Subhan Ghafoor | Full Stack Developer",
    description:
      "Full Stack Developer specializing in TypeScript, Python, Next.js, and AI.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhan Ghafoor | Full Stack Developer",
    description: "Full Stack Developer — TypeScript · Python · Next.js · AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <head>
        <meta name="theme-color" content="#64ffda" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ServiceWorkerRegistration />
        <SoundEffects />
        <Cursor />
        <ScrollProgress />
        <KonamiEgg />
        <ScrollToTop />
        <PWAInstallButton />
        {children}
      </body>
    </html>
  );
}
