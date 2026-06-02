"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function EffectsPage() {
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  };

  const itemFade = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  const unsafeCode = `# Standard Execution (Unsafe)

import { calculate_metrics } from "third-party-lib"

function processData(payload) {
  // A seemingly pure function call...
  const metrics = calculate_metrics(payload);

  // The library just silently exfiltrated data
  // over HTTP because standard VMs have
  // no concept of scope containment.
  save(metrics);
}`;

  const sandboxedCode = `// Lexum Effect Paradigm (Sandboxed)

domain MetricsAggregator {
  // Statically required upfront
  capability { network.egress }

  transition ProcessTick() {
    let report = calculate_metrics();

    // Lexum physically cannot fetch() here.
    // It must yield an effect object.
    yield effect {
      type: HttpRequest,
      target: "https://log.svc",
      payload: report
    };
  }
}`;

  return (
    <>
      <Header />

      <main className="bg-lexum-bg min-h-screen">
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

          <Container className="relative z-10 w-full">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="max-w-4xl flex flex-col items-start"
            >
              <motion.div
                variants={itemFade}
                className="text-lexum-accent uppercase tracking-widest mb-8 font-semibold text-sm font-mono"
              >
                Zero-Trust Boundaries
              </motion.div>
              <motion.h1
                variants={itemFade}
                className="text-display-1 text-lexum-text mb-10"
              >
                I/O is an <span className="text-lexum-accent">intent.</span>
              </motion.h1>

              <motion.p
                variants={itemFade}
                className="text-xl md:text-2xl max-w-3xl text-lexum-muted leading-relaxed"
              >
                Effects are never executed imperatively. They are declared,
                tracked, and dispatched exclusively by the runtime under strict
                cryptographic capabilities.
              </motion.p>
            </motion.div>
          </Container>
        </section>

        {/* SPLIT SECTION: THE VULNERABILITY */}
        <section className="py-24 border-t border-lexum-border bg-lexum-panel/30 relative">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeUp} className="flex flex-col">
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-lexum-text mb-6 leading-tight">
                  The Privilege Escalation Vulnerability
                </h2>
                <p className="text-lg text-lexum-muted mb-8 leading-relaxed">
                  In standard languages, any function deep within the call stack
                  can arbitrarily open sockets, read the filesystem, or mutate
                  global memory. The compiler has no authority to stop an
                  imported library from making an unauthorized HTTP request.
                </p>
                <ul className="flex flex-col gap-6">
                  <li className="border-b border-lexum-border pb-6">
                    <strong className="text-lexum-accent font-mono block mb-2">
                      01. Hidden Side-Effects
                    </strong>
                    <span className="text-lexum-muted">
                      Data leaks out of boundaries without explicit
                      architectural visibility.
                    </span>
                  </li>
                  <li className="border-b border-lexum-border pb-6">
                    <strong className="text-lexum-accent font-mono block mb-2">
                      02. Supply Chain Risks
                    </strong>
                    <span className="text-lexum-muted">
                      Compromised dependencies inherit the privileges of the
                      main process natively.
                    </span>
                  </li>
                </ul>
              </motion.div>
              <motion.div {...fadeUp} className="w-full">
                <CodeBlock language="typescript">{unsafeCode}</CodeBlock>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* SPLIT SECTION: THE EFFECT VAULT */}
        <section className="py-24 border-t border-lexum-border relative">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeUp} className="w-full order-2 lg:order-1">
                <CodeBlock language="lexum">{sandboxedCode}</CodeBlock>
              </motion.div>

              <motion.div
                {...fadeUp}
                className="flex flex-col order-1 lg:order-2"
              >
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-lexum-text mb-6 leading-tight">
                  The Lexum Effect Vault
                </h2>
                <p className="text-lg text-lexum-muted mb-8 leading-relaxed">
                  Lexum sandboxes the Virtual Machine. An execution slice cannot
                  execute an effect; it can only{" "}
                  <strong className="text-lexum-text font-semibold">
                    yield an effect intent
                  </strong>{" "}
                  to the runtime. The runtime statically cross-references the
                  intent against the domain's declared{" "}
                  <code className="font-mono bg-lexum-panel border border-lexum-border px-1.5 py-0.5 rounded text-sm text-lexum-text">
                    capabilities
                  </code>{" "}
                  manifest before execution.
                </p>

                <div className="bg-lexum-panel/50 p-6 border border-lexum-border rounded-xl">
                  <p className="text-lexum-text font-semibold uppercase text-sm tracking-wider mb-4">
                    Capability Requirements
                  </p>
                  <div className="flex flex-col gap-4 text-sm text-lexum-muted">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                      <span className="text-lexum-accent font-mono shrink-0">
                        network.ingress
                      </span>
                      <span>Required to receive external messages.</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                      <span className="text-lexum-accent font-mono shrink-0">
                        network.egress
                      </span>
                      <span>Required to emit webhooks or HTTP requests.</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                      <span className="text-lexum-accent font-mono shrink-0">
                        domain.spawn
                      </span>
                      <span>
                        Required to dynamically allocate child domains.
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* CONTENT SECTION: THE EFFECT LIFECYCLE */}
        <section className="py-24 border-t border-lexum-border bg-lexum-panel/30">
          <Container>
            <div className="flex flex-col items-center">
              <motion.div className="text-center max-w-3xl mb-16" {...fadeUp}>
                <h2 className="text-3xl md:text-5xl font-bold text-lexum-text mb-4">
                  The Effect Lifecycle
                </h2>
                <p className="text-lexum-accent font-mono text-sm uppercase tracking-wider mb-8">
                  Outside the Matrix
                </p>
                <p className="text-lg text-lexum-muted leading-relaxed">
                  Because Lexum enforces strict deterministic execution,
                  unpredictable I/O operations are offloaded entirely to the
                  host runtime. The architecture operates across a strict
                  boundary:
                </p>
              </motion.div>

              <motion.div
                className="w-full max-w-4xl ml-auto"
                {...fadeUp}
                transition={{
                  delay: 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="border-l-2 border-lexum-accent pl-6">
                    <h3 className="text-xl font-semibold text-lexum-text mb-3">
                      1. Intent Emission
                    </h3>
                    <p className="text-lexum-muted text-sm leading-relaxed">
                      Inside the deterministic slice, the Domain calculates the
                      necessity of an action and emits an{" "}
                      <strong className="text-lexum-text">Intent</strong> (e.g.,{" "}
                      <code className="font-mono">CreateVM</code>). This does
                      not mutate the external world. It only safely mutates the
                      outbound queue.
                    </p>
                  </div>

                  <div className="border-l-2 border-lexum-border pl-6">
                    <h3 className="text-xl font-semibold text-lexum-text mb-3">
                      2. Runtime Execution
                    </h3>
                    <p className="text-lexum-muted text-sm leading-relaxed">
                      The Lexum Runtime operating outside the deterministic
                      boundary reads the intent and performs the chaotic network
                      HTTP request. This happens asynchronously and does not
                      block the VM.
                    </p>
                  </div>

                  <div className="border-l-2 border-lexum-border pl-6">
                    <h3 className="text-xl font-semibold text-lexum-text mb-3">
                      3. Event Logging
                    </h3>
                    <p className="text-lexum-muted text-sm leading-relaxed">
                      Once the external system responds, the Lexum Runtime
                      writes the exact result into an Append-Only Event Log,
                      securely indexing it with a correlation ID.
                    </p>
                  </div>

                  <div className="border-l-2 border-lexum-accent pl-6">
                    <h3 className="text-xl font-semibold text-lexum-text mb-3">
                      4. Deterministic Injection
                    </h3>
                    <p className="text-lexum-muted text-sm leading-relaxed">
                      The recorded HTTP response is passed back into the
                      Domain's mailbox. The next deterministic slice reads the
                      static result and updates its internal state.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* CONTENT SECTION: SCOPE CONTAINMENT */}
        <section className="py-24 border-t border-lexum-border">
          <Container>
            <div className="flex flex-col items-center">
              <motion.div className="text-center max-w-3xl mb-16" {...fadeUp}>
                <h2 className="text-3xl md:text-5xl font-bold text-lexum-text mb-4">
                  Scope Containment
                </h2>
                <p className="text-lexum-accent font-mono text-sm uppercase tracking-wider mb-8">
                  Physical memory blocks
                </p>
                <p className="text-lg text-lexum-muted leading-relaxed">
                  Lexum limits capability usage to specific structural{" "}
                  <code className="font-mono text-sm bg-lexum-panel border border-lexum-border px-1.5 py-0.5 rounded">
                    scopes
                  </code>
                  . A function running inside a{" "}
                  <code className="font-mono text-sm bg-lexum-panel border border-lexum-border px-1.5 py-0.5 rounded">
                    goal
                  </code>{" "}
                  evaluation scope is fundamentally banned from mutating state.
                  It is not just a linting suggestion; the VM lacks the opcodes
                  to execute mutations in that scope.
                </p>
              </motion.div>

              <motion.div
                className="w-full max-w-4xl"
                {...fadeUp}
                transition={{
                  delay: 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row bg-lexum-panel/30 border border-lexum-border rounded-xl overflow-hidden group hover:border-lexum-accent/50 transition-colors">
                    <div className="p-6 border-b sm:border-b-0 sm:border-r border-lexum-border shrink-0 sm:w-48 flex items-center justify-center bg-lexum-bg/50">
                      <code className="text-lexum-text font-bold text-lg group-hover:text-lexum-accent transition-colors">
                        scope {"{ goal }"}
                      </code>
                    </div>
                    <div className="p-6 text-lexum-muted text-sm font-mono flex-1 flex items-center">
                      Pure predicate reads. Memory allocations & effects are
                      physically blocked by the VM.
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row bg-lexum-panel/30 border border-lexum-border rounded-xl overflow-hidden group hover:border-lexum-accent/50 transition-colors">
                    <div className="p-6 border-b sm:border-b-0 sm:border-r border-lexum-border shrink-0 sm:w-48 flex items-center justify-center bg-lexum-bg/50">
                      <code className="text-lexum-text font-bold text-lg group-hover:text-lexum-accent transition-colors">
                        scope {"{ invariant }"}
                      </code>
                    </div>
                    <div className="p-6 text-lexum-muted text-sm font-mono flex-1 flex items-center">
                      Mathematical assertion layer. Side-effects immediately
                      trap compiler A008 error.
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row bg-lexum-panel/30 border border-lexum-border rounded-xl overflow-hidden group hover:border-lexum-accent/50 transition-colors">
                    <div className="p-6 border-b sm:border-b-0 sm:border-r border-lexum-border shrink-0 sm:w-48 flex items-center justify-center bg-lexum-bg/50">
                      <code className="text-lexum-accent font-bold text-lg group-hover:text-orange-500 transition-colors">
                        scope {"{ transition }"}
                      </code>
                    </div>
                    <div className="p-6 text-lexum-text text-sm font-mono flex-1 flex items-center">
                      Allows state mutation and effect yielding, but forbids
                      direct block execution.
                    </div>
                  </div>
                </div>

                <div className="mt-12 border-l-2 border-lexum-accent pl-6 py-2 bg-linear-to-r from-lexum-accent/5 to-transparent">
                  <p className="text-sm text-lexum-muted leading-relaxed">
                    Security in Lexum is not layered on top; it is structurally
                    embedded into the AST hierarchy. You cannot compromise what
                    the architecture forbids from existing.
                  </p>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-32 border-t border-lexum-border bg-lexum-panel/50 text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-lexum-accent/10 via-lexum-bg/0 to-transparent pointer-events-none"></div>
          <Container className="relative z-10">
            <motion.div {...fadeUp} className="max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-lexum-text mb-6 tracking-tight">
                Dig into Capabilities
              </h2>
              <p className="text-xl text-lexum-muted mb-10 leading-relaxed">
                Learn how zero-trust boundaries are enforced across the network.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="primary" href="/docs">
                  Capabilities Manifest
                </Button>
                <Button variant="outline" href="/determinism">
                  View Determinism
                </Button>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
