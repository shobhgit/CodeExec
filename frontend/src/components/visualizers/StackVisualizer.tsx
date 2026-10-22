import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeapObject, VariableValue } from '../../types/tracer';
import { Layers, ArrowLeft } from 'lucide-react';

interface StackVisualizerProps {
  heapMap: Map<string, HeapObject>;
  variables: Record<string, VariableValue>;
  changedHeapObjects: string[];
}

// Deep dereferencing helper to resolve any stack item to its real value instead of 'ref #...'
export function resolveStackValue(val: any, heapMap: Map<string, HeapObject>, depth = 0): string {
  if (depth > 5) return '...';
  if (val === null || val === undefined) return 'null';

  // Primitives
  if (typeof val === 'number' || typeof val === 'boolean') {
    return String(val);
  }
  if (typeof val === 'string') {
    return val;
  }

  // Array / List directly in val
  if (Array.isArray(val)) {
    return `[${val.map((x) => resolveStackValue(x, heapMap, depth + 1)).join(', ')}]`;
  }

  // Heap Object reference: { ref: '...' }
  if (typeof val === 'object' && 'ref' in val) {
    const refKey = String(val.ref);
    const obj = heapMap.get(refKey);

    if (obj) {
      // 1. Direct primitive value on the heap object
      if (obj.value !== undefined && typeof obj.value !== 'object') {
        return String(obj.value);
      }
      if (obj.type === 'str' && obj.value !== undefined) {
        return String(obj.value);
      }

      // 2. Heap array / list
      if (obj.type === 'array' || obj.type === 'list' || (obj.items && Array.isArray(obj.items))) {
        const items = obj.items || [];
        return `[${items.map((x: any) => resolveStackValue(x, heapMap, depth + 1)).join(', ')}]`;
      }

      // 3. Inspect object fields
      if (obj.fields && Object.keys(obj.fields).length > 0) {
        const f = obj.fields;

        // Check common value/data field names
        const candidateKeys = [
          'val', 'value', 'data', 'item', 'element', 'elem',
          'ch', 'char', 'character', 'num', 'n', 'v', 'key', 'k'
        ];
        for (const k of candidateKeys) {
          if (f[k] !== undefined && f[k] !== null) {
            // Avoid circular ref pointing back to the same ref
            if (typeof f[k] === 'object' && 'ref' in f[k] && String(f[k].ref) === refKey) {
              continue;
            }
            return resolveStackValue(f[k], heapMap, depth + 1);
          }
        }

        // Pair / Entry structures: (first, second) or key: value
        if (f.first !== undefined && f.second !== undefined) {
          return `(${resolveStackValue(f.first, heapMap, depth + 1)}, ${resolveStackValue(f.second, heapMap, depth + 1)})`;
        }
        if (f.key !== undefined && f.value !== undefined) {
          return `${resolveStackValue(f.key, heapMap, depth + 1)}: ${resolveStackValue(f.value, heapMap, depth + 1)}`;
        }

        // Filter out pointer fields (next, prev, left, right, parent)
        const nonPointerEntries = Object.entries(f).filter(
          ([k]) => !['next', 'prev', 'previous', 'left', 'right', 'parent'].includes(k)
        );

        if (nonPointerEntries.length === 1) {
          return resolveStackValue(nonPointerEntries[0][1], heapMap, depth + 1);
        } else if (nonPointerEntries.length > 1) {
          return nonPointerEntries
            .map(([k, v]) => `${k}:${resolveStackValue(v, heapMap, depth + 1)}`)
            .join(' ');
        }
      }

      // 4. Fallback to readable class name or identifier
      if (obj.class) {
        const shortClass = obj.class.split('.').pop() || obj.class;
        return shortClass;
      }

      return `#${val.ref}`;
    }

    // If obj not found in heap, check if val has an inline value
    if (val.value !== undefined) return String(val.value);
    if (val.val !== undefined) return String(val.val);
    if (val.data !== undefined) return String(val.data);

    return `#${val.ref}`;
  }

  // Plain object
  if (typeof val === 'object') {
    const keys = Object.keys(val);
    if (keys.length === 1) {
      return resolveStackValue(val[keys[0]], heapMap, depth + 1);
    }
    return JSON.stringify(val);
  }

  return String(val);
}

export const StackVisualizer: React.FC<StackVisualizerProps> = ({
  heapMap,
  variables,
  changedHeapObjects,
}) => {
  let rawItems: any[] = [];
  let stackObjId: string | undefined;
  let activeCount: number | undefined;
  let stackObj: HeapObject | undefined;

  // 1. Authoritative Stack Object Discovery:
  // Step A: Check heapMap for objects whose class indicates Stack, Deque, or Vector
  for (const [id, obj] of heapMap.entries()) {
    const className = obj.class?.toLowerCase() || '';
    if (className.includes('stack') || className.includes('deque')) {
      stackObj = obj;
      stackObjId = id;
      break;
    }
  }

  // Step B: Check variables pointing to a Stack
  if (!stackObj) {
    for (const [varName, varVal] of Object.entries(variables)) {
      const lower = varName.toLowerCase();
      if (lower.includes('stack') || lower === 'st' || lower === 's') {
        if (varVal && typeof varVal === 'object' && 'ref' in varVal) {
          const candidate = heapMap.get(String(varVal.ref));
          if (candidate) {
            stackObj = candidate;
            stackObjId = String(varVal.ref);
            break;
          }
        }
      }
    }
  }

  // 2. Extract items from the discovered stack object
  if (stackObj) {
    if (stackObj.fields) {
      const f = stackObj.fields;
      if (f.elementCount !== undefined) activeCount = Number(f.elementCount);
      else if (f.size !== undefined) activeCount = Number(f.size);
      else if (typeof f.top === 'number') activeCount = Number(f.top) + 1;

      // Check array fields (e.g. elementData in java.util.Stack, elements in ArrayDeque, data, arr, items, stack)
      const arrayField = f.elementData || f.elements || f.data || f.items || f.arr || f.buffer || f.stack;
      if (arrayField && typeof arrayField === 'object' && 'ref' in arrayField) {
        const arrObj = heapMap.get(String(arrayField.ref));
        if (arrObj?.items && Array.isArray(arrObj.items)) {
          rawItems = arrObj.items;
        }
      } else if (Array.isArray(arrayField)) {
        rawItems = arrayField;
      }

      // Check linked-list stack implementation (top -> next -> next)
      if (rawItems.length === 0 && (f.top || f.head)) {
        const topField = f.top || f.head;
        if (topField && typeof topField === 'object' && 'ref' in topField) {
          let currId: string | undefined = String(topField.ref);
          const visitedNodes = new Set<string>();
          const linkedItems: any[] = [];
          while (currId && !visitedNodes.has(currId)) {
            visitedNodes.add(currId);
            const nodeObj = heapMap.get(currId);
            if (!nodeObj) break;
            linkedItems.unshift({ ref: currId }); // unshift so top is at the end (top of stack)
            const nextRef = nodeObj.fields?.next;
            if (nextRef && typeof nextRef === 'object' && 'ref' in nextRef) {
              currId = String(nextRef.ref);
            } else {
              break;
            }
          }
          rawItems = linkedItems;
          activeCount = rawItems.length;
        }
      }
    }

    if (rawItems.length === 0 && stackObj.items && Array.isArray(stackObj.items)) {
      rawItems = stackObj.items;
    }
  }

  // 3. Fallback: check variables pointing directly to list/array
  if (rawItems.length === 0) {
    for (const [, varVal] of Object.entries(variables)) {
      if (varVal && typeof varVal === 'object' && 'ref' in varVal) {
        const obj = heapMap.get(String(varVal.ref));
        if (obj && obj.items && Array.isArray(obj.items)) {
          rawItems = obj.items;
          stackObjId = String(varVal.ref);
          if (obj.fields?.elementCount !== undefined) activeCount = Number(obj.fields.elementCount);
          else if (obj.fields?.size !== undefined) activeCount = Number(obj.fields.size);
          break;
        }
      }
    }
  }

  // 4. Fallback: search heapMap for any array/list
  if (rawItems.length === 0) {
    for (const [id, obj] of heapMap.entries()) {
      if ((obj.type === 'list' || obj.type === 'array') && obj.items && Array.isArray(obj.items)) {
        rawItems = obj.items;
        stackObjId = id;
        break;
      }
    }
  }

  // Filter out nulls and slice up to active elements if backed by fixed capacity buffer
  let items = rawItems;
  if (activeCount !== undefined && activeCount >= 0 && activeCount <= items.length) {
    items = items.slice(0, activeCount);
  }
  // Exclude null/undefined slots
  items = items.filter((x) => x !== null && x !== undefined);

  const isChanged = stackObjId ? changedHeapObjects.includes(stackObjId) : false;

    return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none">
      <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[var(--color-text-muted)]">
        <Layers className="w-4 h-4 text-zinc-500" />
        <span className="font-semibold text-[var(--color-text-main)]">LIFO Stack Structure</span>
        <span className="opacity-40">|</span>
        <span>Depth: {items.length}</span>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Open top indicator */}
        <div className="w-56 flex items-center justify-between px-3 py-1 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 border-b border-dashed border-zinc-300 dark:border-zinc-700 mb-2 font-bold">
          <span>PUSH ↓ / POP ↑</span>
          <span>TOP OF STACK</span>
        </div>

        {/* Stack Cylinder / Beaker */}
        <div
          className={`w-60 min-h-64 max-h-96 flex flex-col-reverse items-center justify-start p-3 gap-2 rounded-b-2xl border-x-2 border-b-4 border-t-0 transition-colors ${
            isChanged
              ? 'border-zinc-900 dark:border-white bg-zinc-100/60 dark:bg-zinc-800/40 shadow-sm'
              : 'border-zinc-300 dark:border-zinc-700 bg-[var(--color-bg-card)]'
          } shadow-sm backdrop-blur-md overflow-y-auto`}
        >
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center my-auto py-8 text-[var(--color-text-muted)] text-xs font-mono">
              [ Stack Empty ]
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {items.map((rawVal, idx) => {
                const isTop = idx === items.length - 1;
                const displayVal = resolveStackValue(rawVal, heapMap);

                return (
                  <motion.div
                    key={`stack-item-${idx}`}
                    layout
                    initial={{ y: -50, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -50, opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`w-full relative flex items-center justify-between px-4 py-2.5 rounded-xl border font-mono transition-colors ${
                      isTop
                        ? 'bg-zinc-200/60 dark:bg-zinc-800 border-zinc-900 dark:border-white text-[var(--color-text-main)] shadow-sm font-bold'
                        : 'bg-[var(--color-bg-panel)] border-[var(--color-border)] text-[var(--color-text-main)]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[var(--color-text-muted)]">[{idx}]</span>
                      <span className="font-bold text-sm text-[var(--color-text-main)]">
                        {displayVal}
                      </span>
                    </div>

                    {isTop && (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-white dark:text-zinc-950 bg-zinc-900 dark:bg-white px-1.5 py-0.5 rounded shadow-sm">
                        <ArrowLeft className="w-3 h-3" />
                        <span>TOP</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        {/* Minimal Solid Beaker Base */}
        <div className="w-64 h-2.5 bg-zinc-300 dark:bg-zinc-700 rounded-full border-t border-zinc-400 dark:border-zinc-600 mt-0.5 shadow-sm"></div>
      </div>
    </div>
  );
};
