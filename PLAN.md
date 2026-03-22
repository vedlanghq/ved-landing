# 1. The Core Theses

Before writing a line of code, we define the boundaries:

* **Visual Thesis**: *Monolithic precision meets brutalist clarity.* The aesthetic must reflect a deterministic compiler and runtime—unforgiving, highly structured, and sparse. Dark mode dominant with high-contrast structural lines, deep blacks, and one striking accent color (e.g., pure electric white or a harsh neon).
* **Interaction Thesis**: 3 intentional motions.
    1. A staggered, sharp typographic entrance for the Hero.
    2. A scroll-linked reveal for the architecture section, where code/concepts "compile" into view as the user scrolls.
    3. Razor-sharp, instantaneous hover states (no lazy, soft fades—representing performance).

## 2. Design System Restrictions

* **Typography**: Limit to two typefaces. A neo-grotesque sans-serif for UI/Headings (e.g., *Geist*, *Inter*, or *Helvetica Now*) and a strictly monospaced font for code/data (e.g., *JetBrains Mono* or *Geist Mono*).
* **Color Palette**: Absolute minimal. Primary background (`#000000` or `#0A0A0A`), secondary surface (`#111111`), primary text (`#FFFFFF`), muted text (`#888888`), and exactly **one** accent color used only for primary actions or active states.
* **Layout Rules**: **Zero cards.** We will use stark horizontal/vertical dividers, CSS grid lines, asymmetrical text columns, and massive whitespace instead of bounding boxes.

### 3. The Content & Sequence Plan (The Layout)

We will treat the landing page as a poster, unrolling a narrative in four distinct, card-less sections:

#### Section 1: The Hero (The Anchor)

* **Composition**: Full-bleed `100svh`. No nested UI frames fighting for attention.
* **Visual Anchoring**: A single dominant visual plane. Since this is a compiler/runtime, it could be a subtle, high-contrast WebGL background of a glowing Abstract Syntax Tree, or simply massive, poster-sized typography.
* **Hierarchy**:
  * *Top*: Minimal unified header (Logo left, Docs/GitHub right).
  * *Center Focus*: Impactful, 2-line headline taking up significant screen real-estate (`Deterministic Execution. // Ironclad Authority.`).
  * *Support copy*: One sentence. ("A soft-realtime, strictly-typed distributed runtime.")
  * *Action*: Single primary CTA ("Read the Architecture").

#### Section 2: Support / Proof (The Concrete Value)

* **Job**: Prove the claim made in the hero immediately.
* **Layout**: Split screen. Left side: one bold statement ("Zero undefined behavior. Total state control."). Right side: A hyper-clean, syntax-highlighted code block or a stark architecture diagram showing the Effect & Authority model in action.
* **Copy**: Utility-driven. No marketing fluff. Use terms from your architecture (Shared Mutable State, Declarative Desired State).

#### Section 3: Detail (The Depth)

* **Job**: Explain the workflow and depth of the runtime fabric without overwhelming.
* **Layout**: A unified masonry grid or a purely vertical, border-separated list defining the pillars (e.g., *Hot Runtime*, *Preemptive Scheduling*, *Isolated State Domains*).
* **Rule Enforcement**: No generic SaaS icon-grids. Instead, use numbered lists (01, 02, 03) paired with one-sentence utility copy.

#### Section 4: Final CTA (The Commitment)

* **Job**: Conversion to documentation or codebase.
* **Visuals**: Bleak, heavy, and focused. Center aligned.
* **Copy**: "Compile the future." -> [ Read the Documentation ] [ View on GitHub ].

### 4. Implementation Roadmap (Next Steps)

If you agree with this direction, we will execute it in the following phases:

1. **Refactor CSS & Layouts (Foundation)**
    * Strip out any existing cards, rounded borders, or generic shadows in globals.css.
    * Implement the strict `--bg`, `--text`, and `--accent` color variables mapping to the brutalist thesis.
    * Set up CSS Grid structures with 1px solid borders for section separation.
2. **Hero Redesign**
    * Rebuild `src/app/page.tsx` to ensure the Hero component acts as a canonical full-bleed anchor (`min-h-screen`, absorbing the header height).
3. **Typography & Copy Audit**
    * Inject the primary/mono font pairings.
    * Rewrite placeholders with hard, technical product terminology sourced from your `.md` files.
4. **Motion Injection (`framer-motion`)**
    * Install `framer-motion`.
    * Add a subtle entrance reveal to the hero headers.
    * Add conditional rendering blocks for the scroll-linked code snippet architecture section.

Would you like to begin with **Phase 1 (Refactoring CSS & stripping existing layout constraints)**, or do you want to iterate on the copy/thesis first before we write code?
