import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://lexumhq.netlify.app/"),
  title: {
    template: "%s | Lexum",
    default: "Lexum | Deterministic Control-Plane Language",
  },
  description:
    "A radically deterministic, statically typed programming language built for zero-trust, high-assurance control-plane operations.",
  keywords: [
    "programming language",
    "Lexum",
    "deterministic",
    "control-plane",
    "statically typed",
    "zero-trust",
    "system design",
    "cloud computing",
  ],
  authors: [{ name: "Aniket Raj" }],
  creator: "Aniket Raj",
  publisher: "Aniket Raj",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lexumhq.netlify.app/",
    title: "Lexum | Deterministic Control-Plane Language",
    description:
      "A radically deterministic, statically typed programming language built for zero-trust, high-assurance control-plane operations.",
    siteName: "Lexum Language",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lexum Programming Language",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lexum | Deterministic Control-Plane Language",
    description:
      "A radically deterministic, statically typed programming language built for zero-trust, high-assurance control-plane operations.",
    creator: "@lexum_language",
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "googlec38aaf57e2bde5ad",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexumLogoFont = localFont({
  src: "./fonts/playwritegbs-light-lexum-logo.ttf",
  variable: "--font-lexum-logo",
});

import { SettingsProvider } from "@/providers/SettingsProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { PageTransitionProvider } from "@/providers/PageTransitionProvider";
import { CookieConsentManager } from "@/components/ui/CookieConsentManager";
import { ServiceWorkerRegister } from "@/app/ServiceWorkerRegister";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Script to run before React hydrates to prevent theme flash
  const themeScript = `
    (function() {
      try {
        var isIndex = window.location.pathname === '/';
        var theme = localStorage.getItem('theme') || 'dark';
        var motionRaw = localStorage.getItem('motion');
        var motion = motionRaw !== null ? motionRaw === 'true' : true;
        
        if (isIndex && motion) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.setAttribute('data-theme', theme);
        }
      } catch (e) {}
    })();
  `;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${lexumLogoFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-lexum-bg text-lexum-text font-sans selection:bg-lexum-accent selection:text-lexum-text">
        <SettingsProvider>
          <SmoothScrollProvider>
            <PageTransitionProvider>{children}</PageTransitionProvider>
          </SmoothScrollProvider>
        </SettingsProvider>

        {/* Service Worker Registration */}
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />

        {/* JSON-LD WebSite Schema */}
        <Script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Lexum Language",
              url: "https://lexumhq.netlify.app",
              description:
                "A radically deterministic, statically typed programming language built for zero-trust, high-assurance control-plane operations.",
            }),
          }}
        />

        <CookieConsentManager />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
