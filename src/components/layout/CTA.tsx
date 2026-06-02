import React from "react";
import { Container } from "@/components/ui/Container";
import { CliSnippet } from "@/components/ui/CliSnippet";

export function CTA() {
  return (
    <section className="py-32 bg-lexum-panel border-b border-lexum-border">
      <Container>
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
          <div className="text-tag text-lexum-accent mb-6">
            [ SYSTEM READY ]
          </div>
          <h2 className="text-3xl md:text-5xl text-lexum-text font-bold tracking-tight mb-12">
            Initiate.
          </h2>
          <div className="w-full text-left mb-6">
            <CliSnippet command="curl -sSf https://lexum.org/install.sh | sh" />
          </div>
          <p className="text-mono-body text-lexum-muted">
            Includes the `lxm` compiler, runtime engine, and local trace
            visualizer.
          </p>
        </div>
      </Container>
    </section>
  );
}
