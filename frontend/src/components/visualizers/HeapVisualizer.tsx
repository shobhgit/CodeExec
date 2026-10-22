import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeapObject, VariableValue } from '../../types/tracer';
import { Network } from 'lucide-react';

import { resolveStackValue } from './StackVisualizer';

interface HeapVisualizerProps {
  heapMap: Map<string, HeapObject>;
  variables: Record<string, VariableValue>;
  changedHeapObjects: string[];
}

export const HeapVisualizer: React.FC<HeapVisualizerProps> = ({
  heapMap,
  variables,
  changedHeapObjects,
}) => {
  let items: any[] = [];
  let heapId: string | undefined;

  for (const [id, obj] of heapMap.entries()) {
    if (obj.class?.toLowerCase().includes('priorityqueue')) {
      heapId = id;
      // In Java PriorityQueue, elements can be in 'queue' array field
      const queueRef = obj.fields?.queue;
      if (queueRef && typeof queueRef === 'object' && 'ref' in queueRef) {
        const arr = heapMap.get(String(queueRef.ref));
        if (arr?.items) {
          const size = Number(obj.fields?.size ?? arr.items.length);
          items = arr.items.slice(0, size).filter((x) => x !== null && x !== undefined);
        }
      }
      break;
    }
  }

  if (items.length === 0) {
    for (const [id, obj] of heapMap.entries()) {
      if ((obj.type === 'list' || obj.type === 'array') && obj.items && obj.items.length > 0) {
        items = obj.items;
        heapId = id;
        break;
      }
    }
  }

  const isChanged = heapId ? changedHeapObjects.includes(heapId) : false;

  // Build tree positions for binary heap array
  const treeNodes: Array<{ idx: number; val: any; x: number; y: number; level: number }> = [];
  const connections: Array<{ fromIdx: number; toIdx: number }> = [];

  const levelHeights = [40, 110, 180, 250];

  for (let i = 0; i < Math.min(items.length, 15); i++) {
    const level = Math.floor(Math.log2(i + 1));
    const posInLevel = i - (Math.pow(2, level) - 1);
    const totalInLevel = Math.pow(2, level);
    const spacing = 340 / (totalInLevel + 1);
    const x = spacing * (posInLevel + 1);
    const y = levelHeights[level] || 250;

    treeNodes.push({ idx: i, val: items[i], x, y, level });

    if (i > 0) {
      const parentIdx = Math.floor((i - 1) / 2);
      connections.push({ fromIdx: parentIdx, toIdx: i });
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 select-none overflow-y-auto">
      <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[var(--color-text-muted)]">
        <Network className="w-4 h-4 text-zinc-400" />
        <span className="font-semibold text-[var(--color-text-main)]">Binary Heap & Priority Queue</span>
        <span className="opacity-40">|</span>
        <span>Size: {items.length}</span>
        <span className="opacity-40">|</span>
        <span className="text-zinc-900 dark:text-white font-bold">Root: {items[0] ?? '—'}</span>
      </div>

      {/* Heap Tree SVG Canvas */}
      <div className="relative w-[360px] h-[210px] mb-4">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 210">
          {connections.map(({ fromIdx, toIdx }) => {
            const parent = treeNodes.find((n) => n.idx === fromIdx);
            const child = treeNodes.find((n) => n.idx === toIdx);
            if (!parent || !child) return null;

            return (
              <line
                key={`${fromIdx}->${toIdx}`}
                x1={parent.x}
                y1={parent.y}
                x2={child.x}
                y2={child.y}
                stroke="var(--color-border)"
                strokeWidth="2"
              />
            );
          })}
        </svg>

        <AnimatePresence>
          {treeNodes.map((node) => {
            const isRoot = node.idx === 0;
            return (
              <motion.div
                key={node.idx}
                layout
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}px`, top: `${node.y}px` }}
              >
                <div
                  className={`w-9 h-9 rounded-full flex flex-col items-center justify-center font-mono border-2 shadow-sm ${
                    isRoot
                      ? 'bg-zinc-900 dark:bg-white text-zinc-100 dark:text-zinc-950 border-zinc-900 dark:border-white font-bold'
                      : 'bg-[var(--color-bg-card)] border-[var(--color-border)] text-[var(--color-text-main)]'
                  }`}
                >
                  <span className="text-xs font-bold leading-none">{resolveStackValue(node.val, heapMap)}</span>
                  <span className="text-[7px] text-[var(--color-text-muted)] leading-none">[{node.idx}]</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Backing Array View */}
      <div className="flex flex-col items-center w-full max-w-lg">
        <span className="text-[10px] font-mono text-[var(--color-text-muted)] mb-1 font-bold">HEAP BACKING ARRAY</span>
        <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] overflow-x-auto max-w-full shadow-md">
          {items.map((val, idx) => (
            <motion.div
              key={idx}
              layout
              className={`flex flex-col items-center justify-center w-11 h-12 rounded-lg border font-mono transition-colors ${
                idx === 0
                  ? 'border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-zinc-100 dark:text-zinc-950 font-bold shadow-sm'
                  : 'border-[var(--color-border)] bg-[var(--color-bg-panel)] text-[var(--color-text-main)]'
              }`}
            >
              <span className="text-xs font-bold">{resolveStackValue(val, heapMap)}</span>
              <span className="text-[8px] text-[var(--color-text-muted)]">[{idx}]</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
