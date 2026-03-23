import type { Metadata } from "next";
import { CookieConsent } from "./CookieConsent";
import { ServiceWorkerRegister } from "./ServiceWorkerRegister";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vedlanghq.netlify.app/"),
  title: {
    template: "%s | Ved",
    default: "Ved | Deterministic Control-Plane Language",
  },
  description:
    "A radically deterministic, statically typed programming language built for zero-trust, high-assurance control-plane operations.",
  keywords: [
    "programming language",
    "ved",
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
    url: "https://vedlanghq.netlify.app/",
    title: "Ved | Deterministic Control-Plane Language",
    description:
      "A radically deterministic, statically typed programming language built for zero-trust, high-assurance control-plane operations.",
    siteName: "Ved Language",
    images: [
      {
        url: "/og-image.png" /* placeholder */,
        width: 1200,
        height: 630,
        alt: "Ved Programming Language",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ved | Deterministic Control-Plane Language",
    description:
      "A radically deterministic, statically typed programming language built for zero-trust, high-assurance control-plane operations.",
    creator: "@ved_language",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem("ved-theme");
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
