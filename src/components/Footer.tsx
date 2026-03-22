import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="logo">
          <span className="logo-dot"></span> Ved
        </div>

        <div className="footer-text">
          &copy; 2026 Ved Programming Language.
        </div>

        <div className="footer-links">
          <Link href="/docs">Spec v0.1</Link>
          {/* <a href="#">Compiler</a>
          <a href="#">Community</a> */}
        </div>
      </div>
    </footer>
  );
}