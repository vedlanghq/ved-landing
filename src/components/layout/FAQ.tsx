"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Plus, Minus } from "lucide-react";

const FAQ_ITEMS: { question: string; answer: React.ReactNode }[] = [
  {
    question: "What is Lexum?",
    answer: (
      <p>
        Lexum is a deterministic control-plane programming language designed to
        help engineers build reliable, long-running distributed systems. It
        enables developers to describe desired system behaviour using structured
        state models, goals, and bounded execution logic.
      </p>
    ),
  },
  {
    question: "What problem does Lexum solve?",
    answer: (
      <>
        <p className="mb-2">
          Modern distributed systems are difficult to operate because
          orchestration logic is often:
        </p>
        <ul className="list-disc pl-5 mb-2 space-y-1 text-lexum-muted">
          <li>imperative</li>
          <li>non-deterministic</li>
          <li>difficult to reproduce</li>
          <li>prone to configuration drift</li>
        </ul>
        <p>
          Lexum introduces a deterministic execution model that helps systems
          converge toward stable operating conditions.
        </p>
      </>
    ),
  },
  {
    question: "How is Lexum different from existing programming languages?",
    answer: (
      <p>
        Lexum focuses on orchestration behaviour rather than application logic.
        It provides built-in concepts such as persistent system state,
        convergence goals, structured authority boundaries, and replayable
        execution, which are not primary concerns in most general-purpose
        languages.
      </p>
    ),
  },
  {
    question:
      "Is Lexum intended to replace languages like Rust, Go, or Python?",
    answer: (
      <p>
        No. Lexum is intended to complement existing languages by governing
        system behaviour at the control-plane level. Application services and
        data-plane logic can continue to be implemented using traditional
        languages.
      </p>
    ),
  },
  {
    question: "What does deterministic execution mean in Lexum?",
    answer: (
      <p>
        Deterministic execution means that given the same initial state and
        external inputs, the runtime will evolve the system in the same way
        every time. This enables reproducible debugging, predictable recovery,
        and improved operational reasoning.
      </p>
    ),
  },
  {
    question: "What are goals in Lexum?",
    answer: (
      <p>
        Goals represent stable desired conditions for the system. The runtime
        continuously evaluates current state and executes transitions that help
        the system move toward satisfying these goals.
      </p>
    ),
  },
  {
    question:
      "Can Lexum interact with real infrastructure or external systems?",
    answer: (
      <p>
        Yes. External interactions are modeled as explicit effects. These
        effects are isolated, recorded, and replayable, allowing the runtime to
        maintain deterministic behaviour while operating in unpredictable
        environments.
      </p>
    ),
  },
  {
    question: "Is Lexum suitable for building general application software?",
    answer: (
      <p>
        Lexum is primarily designed for control-plane orchestration and
        long-lived system coordination. It is not intended to replace
        traditional application frameworks.
      </p>
    ),
  },
  {
    question: "Is Lexum production ready?",
    answer: (
      <p>
        Lexum is currently in early design and prototyping stages. The project
        focuses on validating deterministic runtime semantics and convergence
        models before expanding toward broader production use.
      </p>
    ),
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 border-b border-lexum-border bg-lexum-bg">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl text-lexum-text font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lexum-muted">
              Common questions about the Lexum language and runtime.
            </p>
          </div>

          <div className="flex flex-col border-t border-lexum-border">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className="border-b border-lexum-border">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between text-left group hover:bg-lexum-panel transition-colors py-6 px-4"
                  >
                    <div className="text-lexum-text font-medium text-lg pr-8">
                      {item.question}
                    </div>
                    <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-lexum-border text-lexum-muted group-hover:text-lexum-text group-hover:border-lexum-text transition-all bg-lexum-bg">
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-lexum-bg"
                      >
                        <div className="px-4 pb-6 pt-2 text-lexum-muted leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
