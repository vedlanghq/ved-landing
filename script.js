const fs = require("fs");

const pageContent = `import ThemeToggle from "./ThemeToggle";

export default function Home() {
  return (
    <>
      {/* Solid Background Shapes */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <header>
        <nav>
          <a href="#" className="logo">
            <span className="logo-dot"></span> Ved
          </a>
          <div className="nav-links">
            <a href="#vision">Vision</a>
            <a href="#features">Features</a>
            <a href="#syntax">Syntax</a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="badge">v0.1 Experimental Spec</div>

          <h1>Deterministic Control-Plane Programming Language</h1>

          <p>
            Ved is a deterministic declarative systems programming language for
            engineering reliable, long-lived distributed systems. Stop writing
            ephemeral scripts. Start defining persistent convergence.
          </p>

          <div className="cta-group">
            <a href="docs.html" className="btn btn-primary">
              Read the Documentation
            </a>
            <a href="#" className="btn btn-secondary">
              View GitHub
            </a>
          </div>
        </section>

        <section id="features" className="features">
          <div className="section-header">
            <h2>Core Architecture</h2>

            <p>
              Designed from the ground up to merge control theory with modern
              systems programming.
            </p>
          </div>

          <div className="grid">
            <div className="card">
              <div className="card-icon">01</div>

              <h3>Deterministic Execution</h3>

              <p>
                Given the same program, state, and inputs, Ved guarantees
                identical system evolution. Transitions execute in deterministic
                slices, enabling reproducible incident debugging and safe
                operational automation.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">02</div>

              <h3>Persistent Runtime</h3>

              <p>
                Ved treats programs as long-lived evolving systems. State is
                strongly typed, versioned, and snapshotted automatically.
                Execution resumes seamlessly after a failure without manual
                recovery.
              </p>
            </div>

            <div className="card">
              <div className="card-icon">03</div>

              <h3>Authority-Safe</h3>

              <p>
                Built-in spatial authority lattice (Tenant &rarr; Environment &rarr; Workspace). The compiler enforces transition invocation legality
                and guarantees no illegal escalation across domains.
              </p>
            </div>
          </div>
        </section>

        <section id="syntax" className="showcase">
          <div>
            <div className="section-header">
              <h2>Declarative Desired Goals</h2>

              <p>
                Ved programs define what the system should become, not just what
                it should do next. The runtime plans and executes deterministic
                steps toward convergence.
              </p>
            </div>

            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <li style={{ display: "flex", gap: "1rem" }}>
                <strong style={{ color: "var(--accent)" }}>Script Mode:</strong>
                <span style={{ color: "var(--text-muted)" }}>
                  Implicit ephemeral domains for quick utilities.
                </span>
              </li>

              <li style={{ display: "flex", gap: "1rem" }}>
                <strong style={{ color: "var(--accent)" }}>System Mode:</strong>
                <span style={{ color: "var(--text-muted)" }}>
                  Explicit domain and state with persistent execution.
                </span>
              </li>

              <li style={{ display: "flex", gap: "1rem" }}>
                <strong style={{ color: "var(--accent)" }}>
                  Orchestration Mode:
                </strong>
                <span style={{ color: "var(--text-muted)" }}>
                  Goals, reconciliation, and authority scopes.
                </span>
              </li>
            </ul>
          </div>

          <div className="code-window">
            <div className="code-header">
              <div className="dots">
                <div className="dot red"></div>

                <div className="dot yellow"></div>

                <div className="dot green"></div>
              </div>

              <div className="code-title">autoscaler.ved</div>
            </div>

            <div className="code-content">
              <pre>
                <code>{`// Domain-Oriented State Isolation
domain AutoScaler {
    state {
        replicas: int
    }

    // Declarative Convergence Target
    goal MaintainCapacity {
        target replicas == 5
        priority high
    }

    // Deterministic Transition Slice
    transition ScaleUp {
        slice step {
            replicas = replicas + 1
        }
    }

    on goal MaintainCapacity when replicas < 5 {
        send self ScaleUp
    }
}`}</code>
              </pre>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <div className="logo">
            <span className="logo-dot"></span> Ved
          </div>

          <div className="footer-text">
            &copy; 2025 Ved Programming Language. Experimental Research Project.
          </div>

          <div className="footer-links">
            <a href="#">Spec v0.1</a> <a href="#">Compiler</a>
            <a href="#">Community</a>
          </div>
        </div>
      </footer>
    </>
  );
}
`;

fs.writeFileSync("src/app/page.tsx", pageContent);
