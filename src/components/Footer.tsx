"use client";
import Link from "next/link";
import LexumLogo from "./LexumLogo";

export default function Footer() {
  return (
    <footer className="Lexum-footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo" style={{ margin: 0 }}>
              <LexumLogo fontSize={15} />
            </div>
            <p className="footer-tagline">
              Deterministic execution down to the instruction.
            </p>
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
            <Link href="/whitepaper">Whitepaper</Link>
            <a
              href="https://github.com/lexumhq"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <span className="disabled-link">Community</span>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-text">
            &copy; {new Date().getFullYear()} Lexum Programming Language.
          </div>
        </div>
      </div>

      <style jsx>{`
        .Lexum-footer {
          border-top: 1px solid var(--border);
          padding: 8rem 2rem 4rem;
          background: var(--bg-surface);
          color: var(--text-main);
          overflow: hidden;
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .footer-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 4rem;
          margin-bottom: 6rem;
        }
        .footer-brand {
          flex: 1 1 300px;
          padding-right: 2rem;
        }
        .logo {
          font-size: 1.5rem;
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
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.4;
          max-width: 90%;
        }
        .footer-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          flex: 1 1 150px;
          min-width: 150px;
        }
        .footer-column h3 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          opacity: 0.8;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        .footer-column a {
          color: var(--text-main);
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          transition:
            color 0.2s ease,
            transform 0.2s ease;
          display: inline-block;
          width: fit-content;
        }
        .footer-column a:hover {
          color: var(--accent);
          transform: translateX(4px);
        }
        .disabled-link {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text-main);
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
          font-size: 1rem;
          color: var(--text-muted);
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        @media (max-width: 968px) {
          .footer-brand {
            flex: 1 1 100%;
            padding-right: 0;
          }
        }
      `}</style>
    </footer>
  );
}
