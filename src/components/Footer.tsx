import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div className="logo" style={{ margin: 0 }}>
            <span className="logo-dot"></span> Ved
          </div>
          <span style={{ color: "var(--border)" }}>|</span>
          <div className="footer-text">
            &copy; {new Date().getFullYear()} Ved Programming Language.
          </div>
        </div>

        <div className="footer-links">
          <Link href="/docs">Spec v0.1</Link>
          <a
            href="https://github.com/vedlanghq"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
          <a
            href="#"
            className="disabled"
            style={{ opacity: 0.5, cursor: "not-allowed" }}
          >
            Community
          </a>
        </div>
      </div>
    </footer>
  );
}
