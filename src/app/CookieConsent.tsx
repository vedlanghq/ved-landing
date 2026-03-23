"use client";

import { useEffect, useState } from "react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check local storage for consent state
    const consent = localStorage.getItem("ved-cookie-consent");
    if (!consent) {
      setShowBanner(true);
    } else if (consent === "granted") {
      // Execute analytics logic here if desired
      enableAnalytics();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ved-cookie-consent", "granted");
    setShowBanner(false);
    enableAnalytics();
  };

  const handleDecline = () => {
    localStorage.setItem("ved-cookie-consent", "denied");
    setShowBanner(false);
  };

  const enableAnalytics = () => {
    // Placeholder for analytics initialization (e.g. GA, Plausible)
    globalThis.dispatchEvent(new Event("cookie-consent-granted"));
  };

  if (!showBanner) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 40px)",
        maxWidth: "600px",
        backgroundColor: "var(--bg-glass)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid var(--border)",
        padding: "1rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        zIndex: 50,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      }}
      className="cookie-banner"
    >
      <div style={{ flex: 1 }}>
        <p
          style={{
            margin: "0 0 0.5rem",
            fontSize: "0.95rem",
            fontWeight: "600",
            color: "var(--text-main)",
          }}
        >
          We value your privacy
        </p>
        <p
          style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}
        >
          We use cookies to enhance your browsing experience and analyze our
          traffic. By clicking Accept&quot;, you consent to our use of cookies.
        </p>
      </div>
      <div
        style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}
      >
        <button
          onClick={handleDecline}
          style={{
            background: "transparent",
            color: "var(--text-main)",
            border: "1px solid var(--border)",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            fontSize: "0.85rem",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--bg-glass)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          style={{
            background: "var(--text-main)",
            color: "var(--bg-base)",
            border: "1px solid var(--text-main)",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: "600",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--text-main)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "var(--text-main)";
            e.currentTarget.style.color = "var(--bg-base)";
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
