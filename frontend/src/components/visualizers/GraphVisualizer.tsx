import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeapObject, VariableValue } from '../../types/tracer';
import { Share2 } from 'lucide-react';

interface GraphVisualizerProps {
  heapMap: Map<string, HeapObject>;
  variables: Record<string, VariableValue>;
  changedHeapObjects: string[];
}

export const GraphVisualizer: React.FC<GraphVisualizerProps> = ({
  heapMap,
  variables,
  changedHeapObjects,
}) => {
  // Collect graph node objects
  const nodeIds: string[] = [];
  const edges: Array<{ from: string; to: string; label?: string }> = [];

  for (const [id, obj] of heapMap.entries()) {
    if (obj.type === 'object') {
      nodeIds.push(id);
      const fields = obj.fields || {};

      for (const [fName, fVal] of Object.entries(fields)) {
        if (fVal && typeof fVal === 'object' && 'ref' in fVal) {
          edges.push({ from: id, to: String(fVal.ref), label: fName });
        } else if (Array.isArray(fVal)) {
          // Adjacency list
          fVal.forEach((item) => {
            if (item && typeof item === 'object' && 'ref' in item) {
              edges.push({ from: id, to: String(item.ref), label: fName });
            }
          });
        }
      }
    }
  }

  // Detect simple cycles (DFS)
  const cyclicEdges = new Set<string>();
  const visited = new Set<string>();
  const recStack = new Set<string>();

  function dfs(curr: string, path: string[]) {
    visited.add(curr);
    recStack.add(curr);

    const neighbors = edges.filter((e) => e.from === curr);
    for (const e of neighbors) {
      if (recStack.has(e.to)) {
        // Cycle found
        cyclicEdges.add(`${e.from}->${e.to}`);
      } else if (!visited.has(e.to)) {
        dfs(e.to, [...path, curr]);
      }
    }
    recStack.delete(curr);
  }

  nodeIds.forEach((id) => {
    if (!visited.has(id)) dfs(id, []);
  });

  const hasCycle = cyclicEdges.size > 0;

  // Compute circular geometric positions for nodes
  const centerX = 200;
  const centerY = 160;
  const radius = Math.min(120, Math.max(80, nodeIds.length * 28));

  const nodePositions: Record<string, { x: number; y: number; val: any }> = {};
  nodeIds.forEach((id, idx) => {
    const angle = (idx / Math.max(nodeIds.length, 1)) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    const obj = heapMap.get(id);
    const val = obj?.fields?.value ?? obj?.fields?.val ?? obj?.fields?.data ?? `Node ${id}`;
    nodePositions[id] = { x, y, val };
  });

  // Map variables pointing to nodes
  const nodePointers: Record<string, string[]> = {};
  for (const [varName, varVal] of Object.entries(variables)) {
    if (varVal && typeof varVal === 'object' && 'ref' in varVal) {
      const ref = String(varVal.ref);
      if (!nodePointers[ref]) nodePointers[ref] = [];
      nodePointers[ref].push(varName);
    }
  }

  if (nodeIds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-[var(--color-text-muted)] py-12">
        <p className="text-sm">No graph nodes found in current step.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 select-none">
      <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[var(--color-text-muted)]">
        <Share2 className="w-4 h-4 text-zinc-400" />
        <span className="font-semibold text-[var(--color-text-main)]">Graph Network & Directed Topology</span>
        <span className="opacity-40">|</span>
        <span>{nodeIds.length} Vertices</span>
        <span className="opacity-40">|</span>
        <span>{edges.length} Edges</span>
        {hasCycle && (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-400 dark:border-zinc-600">
            CYCLE DETECTED
          </span>
        )}
      </div>

      <div className="relative w-[400px] h-[320px] flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 320">
          <defs>
            <marker
              id="arrowhead-codeexec"
              markerWidth="8"
              markerHeight="6"
              refX="18"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="var(--color-text-muted)" />
            </marker>
            <marker
              id="arrowhead-cycle"
              markerWidth="8"
              markerHeight="6"
              refX="18"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="var(--color-text-main)" />
            </marker>
          </defs>

          {edges.map((e) => {
            const fromPos = nodePositions[e.from];
            const toPos = nodePositions[e.to];
            if (!fromPos || !toPos) return null;

            const isCyclic = cyclicEdges.has(`${e.from}->${e.to}`);
            const isSelfLoop = e.from === e.to;

            if (isSelfLoop) {
              return (
                <path
                  key={`${e.from}->${e.to}`}
                  d={`M ${fromPos.x} ${fromPos.y - 20} C ${fromPos.x - 30} ${fromPos.y - 50}, ${fromPos.x + 30} ${fromPos.y - 50}, ${fromPos.x + 15} ${fromPos.y - 15}`}
                  fill="none"
                  stroke={isCyclic ? 'var(--color-text-main)' : 'var(--color-text-muted)'}
                  strokeWidth="2"
                  markerEnd={isCyclic ? 'url(#arrowhead-cycle)' : 'url(#arrowhead-codeexec)'}
                />
              );
            }

            return (
              <g key={`${e.from}->${e.to}`}>
                <line
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke={isCyclic ? 'var(--color-text-main)' : 'var(--color-border)'}
                  strokeOpacity={isCyclic ? 1 : 0.8}
                  strokeWidth={isCyclic ? '2.5' : '1.5'}
                  strokeDasharray={isCyclic ? '4 4' : undefined}
                  markerEnd={isCyclic ? 'url(#arrowhead-cycle)' : 'url(#arrowhead-codeexec)'}
                />
                {e.label && (
                  <text
                    x={(fromPos.x + toPos.x) / 2}
                    y={(fromPos.y + toPos.y) / 2 - 4}
                    textAnchor="middle"
                    className="text-[9px] font-mono fill-[var(--color-text-muted)] font-bold"
                  >
                    {e.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <AnimatePresence>
          {nodeIds.map((id) => {
            const pos = nodePositions[id];
            if (!pos) return null;
            const pointers = nodePointers[id] || [];
            const isChanged = changedHeapObjects.includes(id);

            return (
              <motion.div
                key={id}
                layout
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
              >
                {/* Pointer tags */}
                {pointers.length > 0 && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 whitespace-nowrap">
                    {pointers.map((ptr) => (
                      <span
                        key={ptr}
                        className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-zinc-900 dark:bg-white text-zinc-100 dark:text-zinc-950 border border-zinc-700 dark:border-zinc-300 shadow-sm"
                      >
                        {ptr}
                      </span>
                    ))}
                  </div>
                )}

                <div
                  className={`w-12 h-12 rounded-full flex flex-col items-center justify-center font-mono border-2 shadow-md transition-colors ${
                    isChanged
                      ? 'bg-zinc-200 dark:bg-zinc-800 border-zinc-900 dark:border-white text-[var(--color-text-main)] shadow-md'
                      : 'bg-[var(--color-bg-card)] border-[var(--color-border)] text-[var(--color-text-main)]'
                  }`}
                >
                  <span className="text-xs font-bold">{String(pos.val)}</span>
                  <span className="text-[8px] text-[var(--color-text-muted)]">#{id}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
