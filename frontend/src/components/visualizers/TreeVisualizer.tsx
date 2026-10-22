import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeapObject, VariableValue } from '../../types/tracer';
import { resolveStackValue } from './StackVisualizer';

interface TreeVisualizerProps {
  heapMap: Map<string, HeapObject>;
  variables: Record<string, VariableValue>;
  changedHeapObjects: string[];
}

interface TreeNodeItem {
  id: string;
  val: any;
  leftId?: string;
  rightId?: string;
  x: number;
  y: number;
  level: number;
}

export const TreeVisualizer: React.FC<TreeVisualizerProps> = ({
  heapMap,
  variables,
  changedHeapObjects,
}) => {
  let rootId: string | undefined;

  for (const [varName, varVal] of Object.entries(variables)) {
    if (varVal && typeof varVal === 'object' && 'ref' in varVal) {
      const obj = heapMap.get(String(varVal.ref));
      if (obj && obj.type === 'object' && obj.fields && ('left' in obj.fields || 'right' in obj.fields)) {
        rootId = String(varVal.ref);
        break;
      }
    }
  }

  if (!rootId) {
    for (const [id, obj] of heapMap.entries()) {
      if (obj.type === 'object' && obj.fields && ('left' in obj.fields || 'right' in obj.fields)) {
        rootId = id;
        break;
      }
    }
  }

  if (!rootId || !heapMap.has(rootId)) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-[var(--color-text-muted)] py-12 font-mono text-xs">
        [ No binary tree nodes allocated in current step ]
      </div>
    );
  }

  const treeNodes: TreeNodeItem[] = [];
  const connections: Array<{ from: TreeNodeItem; to: TreeNodeItem; side: 'left' | 'right' }> = [];
  const visited = new Set<string>();

  function traverse(id: string, x: number, y: number, offset: number, level: number) {
    if (visited.has(id)) return;
    visited.add(id);

    const obj = heapMap.get(id);
    if (!obj) return;

    const fields = obj.fields || {};
    const rawVal = fields.value ?? fields.val ?? fields.data ?? fields.key ?? id;
    const val = resolveStackValue(rawVal, heapMap);

    const leftRef = fields.left && typeof fields.left === 'object' && 'ref' in fields.left ? String(fields.left.ref) : undefined;
    const rightRef = fields.right && typeof fields.right === 'object' && 'ref' in fields.right ? String(fields.right.ref) : undefined;

    const currentNode: TreeNodeItem = {
      id,
      val,
      leftId: leftRef,
      rightId: rightRef,
      x,
      y,
      level,
    };
    treeNodes.push(currentNode);

    if (leftRef && heapMap.has(leftRef)) {
      const leftChildX = x - offset;
      const leftChildY = y + 75;
      traverse(leftRef, leftChildX, leftChildY, Math.max(offset / 1.8, 38), level + 1);
      const child = treeNodes.find((n) => n.id === leftRef);
      if (child) connections.push({ from: currentNode, to: child, side: 'left' });
    }

    if (rightRef && heapMap.has(rightRef)) {
      const rightChildX = x + offset;
      const rightChildY = y + 75;
      traverse(rightRef, rightChildX, rightChildY, Math.max(offset / 1.8, 38), level + 1);
      const child = treeNodes.find((n) => n.id === rightRef);
      if (child) connections.push({ from: currentNode, to: child, side: 'right' });
    }
  }

  traverse(rootId, 280, 50, 110, 0);

  const nodePointers: Record<string, string[]> = {};
  for (const [varName, varVal] of Object.entries(variables)) {
    if (varVal && typeof varVal === 'object' && 'ref' in varVal) {
      const targetId = String(varVal.ref);
      if (!nodePointers[targetId]) nodePointers[targetId] = [];
      nodePointers[targetId].push(varName);
    }
  }

  const minX = Math.min(...treeNodes.map((n) => n.x), 200) - 60;
  const maxX = Math.max(...treeNodes.map((n) => n.x), 360) + 60;
  const maxY = Math.max(...treeNodes.map((n) => n.y), 200) + 80;
  const width = Math.max(maxX - minX, 560);
  const height = Math.max(maxY, 280);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center overflow-auto p-4 select-none">
      <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[var(--color-text-muted)]">
        <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-500 inline-block"></span>
        <span className="font-bold text-[var(--color-text-main)]">Binary Search Tree</span>
        <span>|</span>
        <span className="text-[var(--color-text-muted)] font-semibold">{treeNodes.length} Nodes</span>
      </div>

      <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`${minX} 0 ${width} ${height}`}>
          {connections.map(({ from, to, side }) => {
            const startX = from.x;
            const startY = from.y + 18;
            const endX = to.x;
            const endY = to.y - 18;
            const midY = (startY + endY) / 2;
            const d = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;

            return (
              <g key={`${from.id}->${to.id}`}>
                <path d={d} fill="none" stroke="var(--color-border)" strokeWidth="3" />
                <motion.path
                  d={d}
                  fill="none"
                  stroke="var(--color-text-muted)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
                <circle cx={(startX + endX) / 2} cy={midY} r="8" className="fill-[var(--color-bg-base)] stroke-[var(--color-border)]" />
                <text
                  x={(startX + endX) / 2}
                  y={midY + 3.5}
                  textAnchor="middle"
                  className="text-[9px] font-mono fill-[var(--color-text-main)] font-bold"
                >
                  {side === 'left' ? 'L' : 'R'}
                </text>
              </g>
            );
          })}
        </svg>

        <AnimatePresence>
          {treeNodes.map((node) => {
            const isChanged = changedHeapObjects.includes(node.id);
            const pointers = nodePointers[node.id] || [];
            const isRoot = node.id === rootId;

            return (
              <motion.div
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  x: node.x - minX - 28,
                  y: node.y - 28,
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="absolute"
                style={{ width: '56px', height: '56px' }}
              >
                {/* Pointer tags */}
                {pointers.length > 0 && (
                  <motion.div
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: -24, opacity: 1 }}
                    className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 whitespace-nowrap z-20"
                  >
                    {pointers.map((ptr) => (
                      <span
                        key={ptr}
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-900 dark:bg-white text-zinc-100 dark:text-zinc-950 border border-zinc-700 dark:border-zinc-300 shadow-sm"
                      >
                        {ptr}
                      </span>
                    ))}
                  </motion.div>
                )}

                {/* Node circle */}
                <motion.div
                  animate={{
                    boxShadow: isChanged
                      ? '0 0 12px 1px rgba(255, 255, 255, 0.2)'
                      : isRoot
                      ? '0 0 8px 1px rgba(161, 161, 170, 0.25)'
                      : '0 2px 6px rgba(0,0,0,0.1)',
                    borderColor: isChanged ? 'var(--color-text-main)' : isRoot ? 'var(--color-text-main)' : 'var(--color-border)',
                  }}
                  className={`w-14 h-14 rounded-full flex flex-col items-center justify-center font-mono font-bold text-base transition-colors ${
                    isChanged
                      ? 'bg-zinc-200 dark:bg-zinc-800 text-[var(--color-text-main)] border-2'
                      : isRoot
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 border-2'
                      : 'bg-[var(--color-bg-card)] text-[var(--color-text-main)] border-2'
                  }`}
                >
                  <span className="leading-tight">{String(node.val)}</span>
                  <span className="text-[9px] font-normal text-[var(--color-text-muted)]">#{node.id}</span>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
