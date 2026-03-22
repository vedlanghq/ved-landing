import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ved | Deterministic Control-Plane Language",
  description: "Deterministic Control-Plane Programming Language",
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
      </body>
    </html>
  );
}
