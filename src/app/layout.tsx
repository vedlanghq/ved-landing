import type { Metadata } from "next";
import { CookieConsent } from "./CookieConsent";
import { ServiceWorkerRegister } from "./ServiceWorkerRegister";
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
        url: "/og-image.png" /* placeholder */,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem("Lexum-theme");
                  var systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  var currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
                  document.documentElement.dataset.theme = currentTheme;
                } catch (e) {}
              })();
            `,
          }}
        />
        {children}
        <CookieConsent />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
