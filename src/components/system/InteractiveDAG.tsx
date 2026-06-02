"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Node = {
  id: string;
  x: number;
  y: number;
  label: string;
};

type Edge = {
  source: string;
  target: string;
};

// Define a static Directed Acyclic Graph (DAG)
const nodes: Node[] = [
  { id: "A", x: 50, y: 150, label: "Msg" },
  { id: "B", x: 150, y: 75, label: "Auth" },
  { id: "C", x: 150, y: 225, label: "State" },
  { id: "D", x: 250, y: 40, label: "Val" },
  { id: "E", x: 250, y: 150, label: "Mut" },
  { id: "F", x: 250, y: 260, label: "Log" },
  { id: "G", x: 350, y: 100, label: "Tx" },
  { id: "H", x: 350, y: 200, label: "Rx" },
  { id: "I", x: 450, y: 150, label: "Sync" },
];

const edges: Edge[] = [
  { source: "A", target: "B" },
  { source: "A", target: "C" },
  { source: "B", target: "D" },
  { source: "B", target: "E" },
  { source: "C", target: "E" },
  { source: "C", target: "F" },
  { source: "D", target: "G" },
  { source: "E", target: "G" },
  { source: "E", target: "H" },
  { source: "F", target: "H" },
  { source: "G", target: "I" },
  { source: "H", target: "I" },
];

export function InteractiveDAG() {
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());
  const [activeEdges, setActiveEdges] = useState<Set<string>>(new Set());
  const [isPulsing, setIsPulsing] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const triggerPulse = useCallback(
    (startNodeId: string) => {
      if (isPulsing) return;
      setIsPulsing(true);

      // Clear existing
      setActiveNodes(new Set());
      setActiveEdges(new Set());
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];

      // Build adjacency list
      const adj = new Map<string, string[]>();
      edges.forEach((e) => {
        if (!adj.has(e.source)) adj.set(e.source, []);
        adj.get(e.source)!.push(e.target);
      });

      // BFS to find layers of propagation
      const layers: { nodes: string[]; edges: string[] }[] = [];
      let currentNodes = [startNodeId];
      const visited = new Set<string>([startNodeId]);

      while (currentNodes.length > 0) {
        const nextNodes: string[] = [];
        const layerEdges: string[] = [];

        currentNodes.forEach((nodeId) => {
          const children = adj.get(nodeId) || [];
          children.forEach((childId) => {
            layerEdges.push(`${nodeId}-${childId}`);
            if (!visited.has(childId)) {
              visited.add(childId);
              nextNodes.push(childId);
            }
          });
        });

        layers.push({ nodes: currentNodes, edges: layerEdges });
        currentNodes = nextNodes;
      }

      // Execute animations layer by layer
      let cumulativeDelay = 0;
      const LAYER_DELAY = 300; // ms per layer

      layers.forEach((layer, i) => {
        // Activate Nodes
        const nodeTimeout = setTimeout(() => {
          setActiveNodes((prev) => {
            const next = new Set(prev);
            layer.nodes.forEach((n) => next.add(n));
            return next;
          });
        }, cumulativeDelay);
        timeoutsRef.current.push(nodeTimeout);

        // Activate Edges (slightly offset from nodes)
        if (layer.edges.length > 0) {
          const edgeTimeout = setTimeout(() => {
            setActiveEdges((prev) => {
              const next = new Set(prev);
              layer.edges.forEach((e) => next.add(e));
              return next;
            });
          }, cumulativeDelay + 100);
          timeoutsRef.current.push(edgeTimeout);
        }

        cumulativeDelay += LAYER_DELAY;
      });

      // Reset everything after it finishes
      const resetTimeout = setTimeout(() => {
        setActiveNodes(new Set());
        setActiveEdges(new Set());
        setIsPulsing(false);
      }, cumulativeDelay + 1500);
      timeoutsRef.current.push(resetTimeout);
    },
    [isPulsing],
  );

  return (
    <div className="w-full h-full min-h-75 bg-lexum-panel border border-lexum-border rounded-lg relative overflow-hidden group">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[16px_16px]"></div>

      {/* Instruction Overlay */}
      <AnimatePresence>
        {!isPulsing && activeNodes.size === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 right-4 z-20 text-xs font-mono text-lexum-accent animate-pulse"
          >
            [ CLICK NODE TO SIMULATE DAG ]
          </motion.div>
        )}
      </AnimatePresence>

      <svg
        className="absolute inset-0 w-full h-full z-10"
        viewBox="0 0 500 300"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Draw Edges */}
        {edges.map((edge) => {
          const sourceNode = nodes.find((n) => n.id === edge.source)!;
          const targetNode = nodes.find((n) => n.id === edge.target)!;
          const edgeId = `${edge.source}-${edge.target}`;
          const isActive = activeEdges.has(edgeId);

          return (
            <g key={edgeId}>
              {/* Base faint edge */}
              <line
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke="var(--lexum-border)"
                strokeWidth="2"
                className="transition-colors duration-500"
              />
              {/* Animated active edge */}
              {isActive && (
                <motion.line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke="var(--lexum-accent)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, ease: "linear" }}
                />
              )}
            </g>
          );
        })}

        {/* Draw Nodes */}
        {nodes.map((node) => {
          const isActive = activeNodes.has(node.id);

          return (
            <g
              key={node.id}
              onClick={() => triggerPulse(node.id)}
              className={`cursor-pointer transition-transform duration-200 origin-center`}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              onMouseEnter={(e) => {
                if (!isPulsing) e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {/* Glow for active nodes */}
              {isActive && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={16}
                  fill="var(--lexum-accent)"
                  className="blur-md opacity-50"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              <motion.circle
                cx={node.x}
                cy={node.y}
                r={12}
                fill={isActive ? "var(--lexum-accent)" : "var(--lexum-bg)"}
                stroke={isActive ? "var(--lexum-accent)" : "var(--lexum-muted)"}
                strokeWidth="2"
                className="transition-colors duration-300"
              />

              <text
                x={node.x}
                y={node.y - 20}
                fill={isActive ? "var(--lexum-text)" : "var(--lexum-muted)"}
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
                className="transition-colors duration-300 select-none"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
