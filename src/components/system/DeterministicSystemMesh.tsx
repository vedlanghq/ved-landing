"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSettings } from "@/providers/SettingsProvider";

/**
 * ============================================================
 * LEXUM — QUIESCENCE GRID
 * ============================================================
 *
 * Philosophy:
 * Infrastructure converging toward equilibrium.
 *
 * Interaction:
 * - Hover/click any node
 * - Propagation begins
 * - Nearest-neighbor round-robin expansion
 * - Multiple activation fronts merge gracefully
 * - Entire topology seeks quiescence
 * - Final stabilization pulse emitted
 *
 * ============================================================
 */

type NodeState = "dormant" | "active" | "converged";

interface Node {
  id: string;
  row: number;
  col: number;
  x: number;
  y: number;

  state: NodeState;

  activeFronts: Set<number>;

  activationTime: number;

  pulse: number;
}

interface Edge {
  a: string;
  b: string;

  lit: number;
}

interface Front {
  id: number;

  queue: string[];

  visited: Set<string>;

  active: boolean;
}

const GRID = 13;
const NODE_SPACING = 120;

const ORANGE = "#ff6a2b";
const WHITE = "#fff5ee";
const GRAY = "rgba(255,255,255,0.24)";

export default function LexumQuiescenceGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const animationRef = useRef<number>(0);

  const mouseRef = useRef({
    x: -9999,
    y: -9999,
  });

  const { isMotionEnabled, theme } = useSettings();
  const motionRef = useRef(isMotionEnabled);
  const themeRef = useRef(theme);

  useEffect(() => {
    motionRef.current = isMotionEnabled;
  }, [isMotionEnabled]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // =====================================================
    // CANVAS
    // =====================================================

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    window.addEventListener("resize", resize);

    // =====================================================
    // GRID CREATION
    // =====================================================

    const offsetX = width / 2 - ((GRID - 1) * NODE_SPACING) / 2;

    const offsetY = height / 2 - ((GRID - 1) * NODE_SPACING) / 2;

    const nodes = new Map<string, Node>();

    for (let row = 0; row < GRID; row++) {
      for (let col = 0; col < GRID; col++) {
        const id = `${row}-${col}`;

        nodes.set(id, {
          id,
          row,
          col,

          x: offsetX + col * NODE_SPACING,

          y: offsetY + row * NODE_SPACING,

          state: "dormant",

          activeFronts: new Set(),

          activationTime: 0,

          pulse: Math.random() * 1000,
        });
      }
    }

    // =====================================================
    // EDGES
    // =====================================================

    const edges = new Map<string, Edge>();

    const addEdge = (a: string, b: string) => {
      const key = [a, b].sort((a, b) => a.localeCompare(b)).join("|");

      edges.set(key, {
        a,
        b,
        lit: 0,
      });
    };

    nodes.forEach((node) => {
      const right = nodes.get(`${node.row}-${node.col + 1}`);

      const bottom = nodes.get(`${node.row + 1}-${node.col}`);

      if (right) {
        addEdge(node.id, right.id);
      }

      if (bottom) {
        addEdge(node.id, bottom.id);
      }
    });

    // =====================================================
    // FRONTS
    // =====================================================

    let frontCounter = 0;

    const fronts: Front[] = [];

    // =====================================================
    // HELPERS
    // =====================================================

    const getNeighbors = (nodeId: string) => {
      const node = nodes.get(nodeId);

      if (!node) return [];

      const result: string[] = [];

      const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      dirs.forEach(([dr, dc]) => {
        const n = nodes.get(`${node.row + dr}-${node.col + dc}`);

        if (n) {
          result.push(n.id);
        }
      });

      return result;
    };

    const lightEdge = (a: string, b: string) => {
      const key = [a, b].sort((a, b) => a.localeCompare(b)).join("|");

      const edge = edges.get(key);

      if (edge) {
        edge.lit = 1;
      }
    };

    const activateNode = (nodeId: string, frontId: number) => {
      const node = nodes.get(nodeId);

      if (!node) return;

      node.activeFronts.add(frontId);

      if (node.state === "dormant") {
        node.state = "active";
        node.activationTime = performance.now();
      }
    };

    // =====================================================
    // INTERACTION
    // =====================================================

    const triggerFront = (nodeId: string) => {
      const frontId = frontCounter++;

      activateNode(nodeId, frontId);

      fronts.push({
        id: frontId,

        queue: [nodeId],

        visited: new Set([nodeId]),

        active: true,
      });
    };

    // =====================================================
    // MOUSE
    // =====================================================

    const getMousePos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const onMouseMove = (e: MouseEvent) => {
      const pos = getMousePos(e);
      mouseRef.current.x = pos.x;
      mouseRef.current.y = pos.y;
      
      // Auto-trigger front on hover if close enough, giving hover interaction
      nodes.forEach((node) => {
        const dx = pos.x - node.x;
        const dy = pos.y - node.y;
        if (Math.hypot(dx, dy) < 16 && node.state === "dormant" && motionRef.current) {
          triggerFront(node.id);
        }
      });
    };

    const onClick = (e: MouseEvent) => {
      const pos = getMousePos(e);

      nodes.forEach((node) => {
        const dx = pos.x - node.x;
        const dy = pos.y - node.y;

        const dist = Math.hypot(dx, dy);

        if (dist < 16 && motionRef.current) {
          triggerFront(node.id);
        }
      });
    };

    // Touch support for mobile
    const getTouchPos = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0] || e.changedTouches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    };

    const onTouchStart = (e: TouchEvent) => {
      const pos = getTouchPos(e);
      mouseRef.current.x = pos.x;
      mouseRef.current.y = pos.y;
      nodes.forEach((node) => {
        const dx = pos.x - node.x;
        const dy = pos.y - node.y;
        if (Math.hypot(dx, dy) < 24 && motionRef.current) {
          triggerFront(node.id);
        }
      });
    };

    const onTouchMove = (e: TouchEvent) => {
      const pos = getTouchPos(e);
      mouseRef.current.x = pos.x;
      mouseRef.current.y = pos.y;
      nodes.forEach((node) => {
        const dx = pos.x - node.x;
        const dy = pos.y - node.y;
        if (Math.hypot(dx, dy) < 24 && node.state === "dormant" && motionRef.current) {
          triggerFront(node.id);
        }
      });
    };

    globalThis.addEventListener("mousemove", onMouseMove);
    globalThis.addEventListener("click", onClick);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });

    // =====================================================
    // PROPAGATION
    // =====================================================

    let lastPropagation = 0;

    const propagate = (time: number) => {
      if (time - lastPropagation < 55) return;

      lastPropagation = time;

      fronts.forEach((front) => {
        if (!front.active) return;

        const current = front.queue.shift();

        if (!current) {
          front.active = false;
          return;
        }

        const neighbors = getNeighbors(current);

        // nearest-neighbor ordering
        neighbors.sort((a, b) => {
          const na = nodes.get(a)!;
          const nb = nodes.get(b)!;

          const da = Math.abs(na.row - 3.5) + Math.abs(na.col - 3.5);

          const db = Math.abs(nb.row - 3.5) + Math.abs(nb.col - 3.5);

          return da - db;
        });

        neighbors.forEach((neighbor) => {
          if (!front.visited.has(neighbor)) {
            front.visited.add(neighbor);

            front.queue.push(neighbor);

            activateNode(neighbor, front.id);

            lightEdge(current, neighbor);
          }
        });

        // convergence
        const node = nodes.get(current);

        if (node) {
          node.state = "converged";
        }
      });
    };

    // =====================================================
    // DRAW
    // =====================================================

    const drawGrid = () => {
      ctx.lineWidth = 1;

      edges.forEach((edge) => {
        const a = nodes.get(edge.a)!;
        const b = nodes.get(edge.b)!;

        ctx.beginPath();

        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);

        const alpha = 0.06 + edge.lit * 0.6;

        ctx.strokeStyle =
          edge.lit > 0.2
            ? `rgba(255,255,255,${alpha})`
            : "rgba(255,255,255,0.06)";

        ctx.stroke();

        edge.lit *= 0.995;
      });
    };

    const drawNodes = (time: number) => {
      let convergedCount = 0;

      nodes.forEach((node) => {
        if (node.state === "converged") {
          convergedCount++;
        }

        const pulse = Math.sin(time * 0.004 + node.pulse);

        let radius = 5;
        let color = GRAY;

        if (node.state === "active") {
          radius = 7 + pulse * 1.2;
          color = ORANGE;

          // active ring
          ctx.beginPath();

          ctx.arc(node.x, node.y, 14 + pulse * 2, 0, Math.PI * 2);

          ctx.strokeStyle = "rgba(255,106,30,0.12)";

          ctx.lineWidth = 1.2;

          ctx.stroke();
        }

        if (node.state === "converged") {
          radius = 6;
          color = WHITE;
        }

        // glow
        ctx.beginPath();

        ctx.arc(node.x, node.y, radius * 4, 0, Math.PI * 2);

        ctx.fillStyle =
          node.state === "active"
            ? "rgba(255,106,37,0.04)"
            : node.state === "converged"
              ? "rgba(255,255,255,0.02)"
              : "rgba(255,255,255,0.01)";

        ctx.fill();

        // node
        ctx.beginPath();

        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);

        ctx.fillStyle = color;

        ctx.fill();
      });

      // =================================================
      // GLOBAL QUIESCENCE WAVE
      // =================================================

      if (convergedCount === GRID * GRID) {
        const wave = ((time * 0.08) % (width + height)) - 200;

        nodes.forEach((node) => {
          const d = node.x + node.y;

          if (Math.abs(d - wave) < 140) {
            ctx.beginPath();

            ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);

            ctx.strokeStyle = "rgba(255,255,255,0.12)";

            ctx.lineWidth = 1;

            ctx.stroke();
          }
        });
      }
    };

    // =====================================================
    // HUD
    // =====================================================

    const drawHUD = (time: number) => {
      ctx.font = "12px 'SF Mono', monospace";

      // If motion is on, the background is always black.
      // If motion is off, background depends on the theme.
      const isDark = motionRef.current || themeRef.current === "dark";
      ctx.fillStyle = isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)";

      const converged = [...nodes.values()].filter(
        (n) => n.state === "converged",
      ).length;

      const active = [...nodes.values()].filter(
        (n) => n.state === "active",
      ).length;

      const lines = [
        `[runtime] round robin propagation`,
        `[topology] ${converged}/64 converged`,
        `[fronts] ${fronts.filter((f) => f.active).length} active`,
        `[state] ${converged === 64 ? "quiescent" : "converging"}`,
      ];

      const containerHeight = canvas.parentElement?.clientHeight || height;

      // Base offset from bottom: 90px (ensures visibility on ultrawide/short screens)
      const bottomOffset = 90;

      lines.forEach((line, i) => {
        // 4 lines, 18px apart. The last line is at bottomOffset.
        // So first line is at bottomOffset + (3 * 18) = bottomOffset + 54
        ctx.fillText(line, 40, containerHeight - bottomOffset - 54 + i * 18);
      });

      // Tick color (vibrant orange for dark mode, darker orange for light mode)
      ctx.fillStyle = isDark ? "rgba(255,106,43,0.8)" : "rgba(220,70,10,0.8)";

      const tickText = `[tick:${Math.floor(time * 0.01)}]`;
      const tickX = Math.min(width - 140, Math.max(width - 140, 200));
      // On narrow screens, pin the tick to the right with a safe margin
      const safeTickX = width > 400 ? width - 140 : width - 100;
      ctx.fillText(
        tickText,
        safeTickX,
        containerHeight - bottomOffset,
      );
    };

    // =====================================================
    // MAIN LOOP
    // =====================================================

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      if (motionRef.current) {
        // AMOLED BLACK
        ctx.fillStyle = "#020202";
        ctx.fillRect(0, 0, width, height);

        // subtle glow
        const gradient = ctx.createRadialGradient(
          width * 0.72,
          height * 0.4,
          0,
          width * 0.72,
          height * 0.4,
          width * 0.6,
        );

        gradient.addColorStop(0, "rgba(255,90,50,0.05)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        propagate(time);

        drawGrid();
        drawNodes(time);
      }

      drawHUD(time);

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      globalThis.removeEventListener("mousemove", onMouseMove);
      globalThis.removeEventListener("click", onClick);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1.4,
      }}
      className="absolute inset-0 pointer-events-auto overflow-hidden"
      style={{
        zIndex: 0,
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* subtle vignette */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isMotionEnabled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </motion.div>
  );
}
