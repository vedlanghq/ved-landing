"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="ved-footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo" style={{ margin: 0 }}>
              <span className="logo-dot"></span> Ved
            </div>
            <p className="footer-tagline">Deterministic execution down to the instruction.</p>
          </div>
          
          <div className="footer-column">
            <h3>Diagnostics</h3>
            <Link href="/errors">Error Taxonomy</Link>
            <Link href="/warnings">Warning System</Link>
            <Link href="/linting">Linting Rules</Link>
          </div>

          <div className="footer-column">
            <h3>Tooling</h3>
            <Link href="/cli">CLI & UX</Link>
            <Link href="/docs">Specification</Link>
          </div>

          <div className="footer-column">
            <h3>Project</h3>
            <a href="https://github.com/vedlanghq" target="_blank" rel="noopener noreferrer">Github</a>
            <span className="disabled-link">Community</span>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-text">
            &copy; {new Date().getFullYear()} Ved Programming Language.
          </div>
        </div>
      </div>

      <style jsx>{`
        .ved-footer {
          border-top: 1px solid var(--border);
          padding: 8rem 2rem 4rem;
          background: var(--bg);
          color: var(--fg);
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 4rem;
          margin-bottom: 6rem;
        }
        .footer-brand {
          padding-right: 2rem;
        }
        .logo {
          font-size: 3rem;
          font-weight: 700;
          letter-spacing: -0.04em;
          margin-bottom: 1rem !important;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .logo-dot {
          width: 16px;
          height: 16px;
          background: var(--accent);
          border-radius: 50%;
          display: inline-block;
        }
        .footer-tagline {
          font-size: 1.25rem;
          color: var(--fg-muted);
          line-height: 1.4;
          max-width: 90%;
        }
        .footer-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .footer-column h3 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--fg-muted);
          opacity: 0.8;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        .footer-column a {
          color: var(--fg);
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: 500;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
          width: fit-content;
        }
        .footer-column a:hover {
          color: var(--accent);
          transform: translateX(4px);
        }
        .disabled-link {
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--fg);
          opacity: 0.3;
          cursor: not-allowed;
          display: inline-block;
        }
        .footer-bottom {
          border-top: 1px solid var(--border);
          padding-top: 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.1rem;
          color: var(--fg-muted);
        }
        @media (max-width: 968px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
          .footer-brand {
            grid-column: 1 / -1;
            padding-right: 0;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }
      `}</style>
    </footer>
  );
}
