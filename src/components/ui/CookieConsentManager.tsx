"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";

// Type for cookie consent persistence
type ConsentData = {
  status: "accepted" | "declined";
  timestamp: number;
};

const CONSENT_KEY = "lexum_cookie_consent";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export function CookieConsentManager() {
  const [showBanner, setShowBanner] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // No consent decision exists
      setShowBanner(true);
      return;
    }

    try {
      const data: ConsentData = JSON.parse(stored);
      if (data.status === "accepted") {
        setHasConsent(true);
      } else if (data.status === "declined") {
        // Check if 7 days have passed
        const now = Date.now();
        if (now - data.timestamp >= SEVEN_DAYS_MS) {
          setShowBanner(true); // Re-prompt
        }
      }
    } catch (e) {
      // If parsing fails, log it and just show the banner
      console.error("Failed to parse cookie consent data:", e);
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    const data: ConsentData = { status: "accepted", timestamp: Date.now() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
    setHasConsent(true);
    setShowBanner(false);
  };

  const handleDecline = () => {
    const data: ConsentData = { status: "declined", timestamp: Date.now() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
    setHasConsent(false);
    setShowBanner(false);
  };

  return (
    <>
      {/* Google Analytics - ONLY injected if hasConsent is true */}
      {hasConsent && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-B7THR7SFJT"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-B7THR7SFJT');
            `}
          </Script>
        </>
      )}

      {/* Floating Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none"
          >
            <div className="max-w-4xl mx-auto pointer-events-auto bg-lexum-panel/80 backdrop-blur-md border border-lexum-border rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-lexum-text mb-2 tracking-tight">
                    We value your privacy
                  </h3>
                  <p className="text-sm text-lexum-muted leading-relaxed">
                    We use cookies to analyze site traffic and improve your
                    development experience. We do not sell your data. You can
                    accept or decline this tracking.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={handleDecline}
                    className="px-5 py-2.5 rounded text-sm font-medium border border-lexum-border text-lexum-text hover:bg-lexum-bg transition-colors cursor-pointer"
                  >
                    Decline All
                  </button>
                  <button
                    onClick={handleAccept}
                    className="px-5 py-2.5 rounded text-sm font-medium bg-lexum-accent text-lexum-text hover:bg-lexum-text hover:text-lexum-bg transition-colors shadow-[0_0_15px_rgba(255,69,0,0.3)] cursor-pointer"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
