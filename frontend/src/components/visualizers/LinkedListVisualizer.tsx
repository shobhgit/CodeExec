import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeapObject, VariableValue } from '../../types/tracer';
import { ArrowRight, ArrowLeft, PlusCircle } from 'lucide-react';

interface LinkedListVisualizerProps {
  heapMap: Map<string, HeapObject>;
  variables: Record<string, VariableValue>;
  changedHeapObjects: string[];
  isDoubly?: boolean;
}

interface ListNodeItem {
  id: string;
  val: any;
  nextId?: string;
  prevId?: string;
}

// Helper to dereference node values (e.g. if val is a boxed object or ref)
function resolveNodeValue(val: any, heapMap: Map<string, HeapObject>, depth = 0): string {
  if (depth > 5) return '...';
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);
  if (typeof val === 'string') return val;

  if (typeof val === 'object' && 'ref' in val) {
    const refKey = String(val.ref);
    const obj = heapMap.get(refKey);
    if (obj) {
      if (obj.value !== undefined && typeof obj.value !== 'object') {
        return String(obj.value);
      }
      if (obj.type === 'str' && obj.value !== undefined) {
        return String(obj.value);
      }

      if (obj.fields) {
        const candidateKeys = [
          'val', 'value', 'data', 'item', 'element', 'elem',
          'ch', 'char', 'character', 'num', 'n', 'v', 'key', 'k'
        ];
        for (const k of candidateKeys) {
          if (obj.fields[k] !== undefined && obj.fields[k] !== null) {
            if (typeof obj.fields[k] === 'object' && 'ref' in obj.fields[k] && String(obj.fields[k].ref) === refKey) {
              continue;
            }
            return resolveNodeValue(obj.fields[k], heapMap, depth + 1);
          }
        }
      }

      if (obj.class) {
        const shortClass = obj.class.split('.').pop() || obj.class;
        return shortClass;
      }
      return `#${val.ref}`;
    }
    return `#${val.ref}`;
  }
  return String(val);
}

export const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({
  heapMap,
  variables,
  changedHeapObjects,
  isDoubly = false,
}) => {
  // Collect all list-like node objects (objects with 'next' field)
  const nodeIds = new Set<string>();
  for (const [id, obj] of heapMap.entries()) {
    if (obj.type === 'object' && obj.fields && 'next' in obj.fields) {
      nodeIds.add(id);
    }
  }

  // Identify variables pointing to new/temporary unlinked nodes
  const unlinkedVarNodeIds = new Set<string>();
  for (const [varName, varVal] of Object.entries(variables)) {
    const lower = varName.toLowerCase();
    if (
      lower.includes('newnode') ||
      lower.includes('new_node') ||
      lower.includes('created') ||
      lower.includes('to_add') ||
      lower.includes('insert') ||
      lower === 'node' ||
      lower === 'n'
    ) {
      if (varVal && typeof varVal === 'object' && 'ref' in varVal) {
        unlinkedVarNodeIds.add(String(varVal.ref));
      }
    }
  }

  // 1. Authoritative Head Discovery:
  let headId: string | undefined;

  // Step A: Check heap objects (e.g. 'this', 'list', 'Main') with 'head', 'first', or 'root' field
  for (const [, obj] of heapMap.entries()) {
    if (obj.fields) {
      const candidateHead = obj.fields.head || obj.fields.first || obj.fields.root;
      if (candidateHead && typeof candidateHead === 'object' && 'ref' in candidateHead) {
        const ref = String(candidateHead.ref);
        if (nodeIds.has(ref)) {
          headId = ref;
          break;
        }
      }
    }
  }

  // Step B: Check variables strictly named 'head', 'first', or 'root'
  if (!headId) {
    for (const [varName, varVal] of Object.entries(variables)) {
      if (varVal && typeof varVal === 'object' && 'ref' in varVal) {
        const ref = String(varVal.ref);
        if (nodeIds.has(ref)) {
          const lower = varName.toLowerCase();
          if (lower === 'head' || lower === 'first' || lower === 'root') {
            headId = ref;
            break;
          }
        }
      }
    }
  }

  // Step C: Topological analysis (find nodes not pointed to by any node's next)
  const pointedToByNext = new Set<string>();
  for (const id of nodeIds) {
    const obj = heapMap.get(id);
    if (obj?.fields?.next && typeof obj.fields.next === 'object' && 'ref' in obj.fields.next) {
      pointedToByNext.add(String(obj.fields.next.ref));
    }
  }

  const inDegreeZeroNodes: string[] = [];
  for (const id of nodeIds) {
    if (!pointedToByNext.has(id)) {
      inDegreeZeroNodes.push(id);
    }
  }

  if (!headId) {
    if (inDegreeZeroNodes.length === 1) {
      headId = inDegreeZeroNodes[0];
    } else if (inDegreeZeroNodes.length > 1) {
      // 1. Prioritize node that has a non-null next pointing to another node (an existing multi-node chain)
      const chainNode = inDegreeZeroNodes.find((id) => {
        const obj = heapMap.get(id);
        const nextRef = obj?.fields?.next && typeof obj.fields.next === 'object' && 'ref' in obj.fields.next ? String(obj.fields.next.ref) : undefined;
        return nextRef && nodeIds.has(nextRef);
      });

      if (chainNode) {
        headId = chainNode;
      } else {
        // 2. Filter out nodes referenced by newNode / unlinked variables
        const nonUnlinkedCandidates = inDegreeZeroNodes.filter((id) => !unlinkedVarNodeIds.has(id));
        if (nonUnlinkedCandidates.length > 0) {
          // Sort by numeric ID ascending (the existing head was created before newNode)
          nonUnlinkedCandidates.sort((a, b) => {
            const numA = Number(a);
            const numB = Number(b);
            if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
            return a.localeCompare(b);
          });
          headId = nonUnlinkedCandidates[0];
        } else {
          // Sort all candidates by ID ascending
          const sorted = [...inDegreeZeroNodes].sort((a, b) => {
            const numA = Number(a);
            const numB = Number(b);
            if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
            return a.localeCompare(b);
          });
          headId = sorted[0];
        }
      }
    } else if (nodeIds.size > 0) {
      const sorted = Array.from(nodeIds).sort((a, b) => {
        const numA = Number(a);
        const numB = Number(b);
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        return a.localeCompare(b);
      });
      headId = sorted[0];
    }
  }

  // Traverse the connected list chain starting from headId
  const chainSequence: ListNodeItem[] = [];
  const visited = new Set<string>();
  let curr = headId;

  while (curr && !visited.has(curr)) {
    visited.add(curr);
    const obj = heapMap.get(curr);
    if (!obj) break;

    const fields = obj.fields || {};
    const rawVal = fields.value ?? fields.val ?? fields.data ?? fields.item ?? curr;
    const val = resolveNodeValue(rawVal, heapMap);
    const nextRef = fields.next && typeof fields.next === 'object' && 'ref' in fields.next ? String(fields.next.ref) : undefined;
    const prevRef = fields.prev && typeof fields.prev === 'object' && 'ref' in fields.prev ? String(fields.prev.ref) : undefined;

    chainSequence.push({
      id: curr,
      val,
      nextId: nextRef,
      prevId: prevRef,
    });

    curr = nextRef;
  }

  // Identify any standalone / unlinked nodes (e.g. newNode before being inserted into tail/head)
  const unlinkedNodes: ListNodeItem[] = [];
  for (const id of nodeIds) {
    if (!visited.has(id)) {
      const obj = heapMap.get(id);
      const fields = obj?.fields || {};
      const rawVal = fields.value ?? fields.val ?? fields.data ?? fields.item ?? id;
      const val = resolveNodeValue(rawVal, heapMap);
      const nextRef = fields.next && typeof fields.next === 'object' && 'ref' in fields.next ? String(fields.next.ref) : undefined;
      const prevRef = fields.prev && typeof fields.prev === 'object' && 'ref' in fields.prev ? String(fields.prev.ref) : undefined;

      unlinkedNodes.push({
        id,
        val,
        nextId: nextRef,
        prevId: prevRef,
      });
    }
  }

  // Map variables pointing to nodes
  const nodePointers: Record<string, string[]> = {};
  for (const [varName, varVal] of Object.entries(variables)) {
    if (varVal && typeof varVal === 'object' && 'ref' in varVal) {
      const ref = String(varVal.ref);
      if (nodeIds.has(ref)) {
        if (!nodePointers[ref]) nodePointers[ref] = [];
        nodePointers[ref].push(varName);
      }
    }
  }

  if (chainSequence.length === 0 && unlinkedNodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-[var(--color-text-muted)] py-12">
        <p className="text-sm">No linked list nodes found in current step.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none overflow-x-auto">
      <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[var(--color-text-muted)]">
        <span className="w-2 h-2 rounded-full bg-zinc-500 inline-block"></span>
        <span className="font-semibold text-[var(--color-text-main)]">
          {isDoubly ? 'Doubly' : 'Singly'} Linked List Chain
        </span>
        <span className="opacity-40">|</span>
        <span>{chainSequence.length} Connected Nodes</span>
        {unlinkedNodes.length > 0 && (
          <>
            <span className="opacity-40">|</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">
              {unlinkedNodes.length} New / Unlinked Node{unlinkedNodes.length > 1 ? 's' : ''}
            </span>
          </>
        )}
      </div>

      {/* Main Linked List Chain with ample top padding to prevent badge clipping */}
      <div className="flex items-start gap-3 pt-8 pb-6 px-6 overflow-x-auto max-w-full">
        {chainSequence.length === 0 ? (
          <div className="px-4 py-2 rounded-xl border border-dashed border-[var(--color-border)] text-xs font-mono text-[var(--color-text-muted)]">
            [ Chain is currently empty (head is null) ]
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {chainSequence.map((node, index) => {
              const isChanged = changedHeapObjects.includes(node.id);
              const pointers = nodePointers[node.id] || [];
              const isHeadNode = index === 0;
              const isTailNode = index === chainSequence.length - 1;

              return (
                <motion.div
                  key={`chain-item-${node.id}`}
                  layout
                  initial={{ scale: 0.8, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="flex items-center shrink-0"
                >
                  <div className="flex flex-col items-center">
                    {/* Badge container in natural flow with dedicated height so it never clips */}
                    <div className="h-6 flex items-center justify-center gap-1 whitespace-nowrap mb-1.5">
                      {isHeadNode && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm">
                          HEAD
                        </span>
                      )}
                      {isTailNode && chainSequence.length > 1 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-700 text-white dark:bg-zinc-300 dark:text-zinc-950 shadow-sm">
                          TAIL
                        </span>
                      )}
                      {pointers.map((ptr) => (
                        <span
                          key={ptr}
                          className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-sm"
                        >
                          {ptr}
                        </span>
                      ))}
                    </div>

                    {/* Node Box with shared layoutId for smooth gliding from pending link container */}
                    <motion.div
                      layoutId={`ll-node-card-${node.id}`}
                      animate={{
                        borderColor: isChanged ? 'var(--color-text-main)' : isHeadNode ? 'var(--color-text-main)' : 'var(--color-border)',
                      }}
                      className={`flex rounded-xl overflow-hidden border-2 transition-colors ${
                        isChanged
                          ? 'bg-[var(--color-bg-card)] border-zinc-900 dark:border-white shadow-sm'
                          : 'bg-[var(--color-bg-card)] border-[var(--color-border)]'
                      }`}
                    >
                      {/* Value cell */}
                      <div className="min-w-14 h-14 flex flex-col items-center justify-center px-3 border-r border-[var(--color-border)] bg-[var(--color-bg-panel)]">
                        <span className="text-[10px] font-mono text-[var(--color-text-muted)]">val</span>
                        <span className="text-base font-mono font-bold text-[var(--color-text-main)]">
                          {String(node.val)}
                        </span>
                      </div>

                      {/* Next reference cell */}
                      <div className="w-12 h-14 flex flex-col items-center justify-center px-2 bg-[var(--color-bg-card)]">
                        <span className="text-[9px] font-mono text-[var(--color-text-muted)]">next</span>
                        <span className="text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-400">
                          {node.nextId ? `#${node.nextId}` : 'null'}
                        </span>
                      </div>

                      {/* Prev cell if doubly */}
                      {isDoubly && (
                        <div className="w-12 h-14 flex flex-col items-center justify-center px-2 border-l border-[var(--color-border)] bg-[var(--color-bg-card)]">
                          <span className="text-[9px] font-mono text-[var(--color-text-muted)]">prev</span>
                          <span className="text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                            {node.prevId ? `#${node.prevId}` : 'null'}
                          </span>
                        </div>
                      )}
                    </motion.div>

                    <span className="text-[9px] font-mono text-[var(--color-text-muted)] mt-1.5">
                      Node #{node.id}
                    </span>
                  </div>

                  {/* Arrow connector aligned with node box */}
                  {index < chainSequence.length - 1 ? (
                    <motion.div
                      key={`arrow-${node.id}-${node.nextId}`}
                      layout
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                      className="flex flex-col items-center justify-center gap-0.5 px-2 pt-7 shrink-0 origin-left"
                    >
                      <ArrowRight
                        className="w-5 h-5 text-zinc-600 dark:text-zinc-300"
                      />
                      {isDoubly && <ArrowLeft className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />}
                    </motion.div>
                  ) : (
                    /* Null terminator aligned with node box */
                    <motion.div
                      key={`null-${node.id}`}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 pl-2 pt-7 shrink-0"
                    >
                      <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] opacity-50" />
                      <div className="px-3 py-1.5 rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-bg-card)] text-xs font-mono text-[var(--color-text-muted)]">
                        null
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Unlinked / New Node Creation Stage */}
      <AnimatePresence>
        {unlinkedNodes.length > 0 && (
          <motion.div
            key="unlinked-nodes-container"
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="mt-6 flex flex-col items-center pt-3 pb-4 px-6 rounded-2xl border border-dashed border-zinc-400 dark:border-zinc-600 bg-zinc-100/50 dark:bg-zinc-900/50 max-w-lg"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              <PlusCircle className="w-3.5 h-3.5" />
              <span>ALLOCATED / PENDING LINK (newNode)</span>
            </div>
            <div className="flex items-start gap-4 flex-wrap justify-center">
              {unlinkedNodes.map((node) => {
                const pointers = nodePointers[node.id] || [];

                return (
                  <div key={node.id} className="flex flex-col items-center shrink-0">
                    <div className="h-6 flex items-center justify-center gap-1 mb-1">
                      {pointers.map((ptr) => (
                        <span
                          key={ptr}
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-950 shadow-sm"
                        >
                          {ptr}
                        </span>
                      ))}
                    </div>
                    <motion.div
                      layoutId={`ll-node-card-${node.id}`}
                      animate={{
                        scale: 1,
                      }}
                      className="flex rounded-xl overflow-hidden border-2 border-zinc-500 dark:border-zinc-400 bg-[var(--color-bg-card)] shadow-sm"
                    >
                      <div className="min-w-14 h-12 flex flex-col items-center justify-center px-3 border-r border-[var(--color-border)] bg-[var(--color-bg-panel)]">
                        <span className="text-[9px] font-mono text-[var(--color-text-muted)]">val</span>
                        <span className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100">{String(node.val)}</span>
                      </div>
                      <div className="w-12 h-12 flex flex-col items-center justify-center px-2 bg-[var(--color-bg-card)]">
                        <span className="text-[8px] font-mono text-[var(--color-text-muted)]">next</span>
                        <span className="text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-400">
                          {node.nextId ? `#${node.nextId}` : 'null'}
                        </span>
                      </div>
                    </motion.div>
                    <span className="text-[8px] font-mono text-[var(--color-text-muted)] mt-1">Node #{node.id}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
