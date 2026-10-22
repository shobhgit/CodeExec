import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeapObject, VariableValue } from '../../types/tracer';
import { ArrowLeft } from 'lucide-react';
import { resolveStackValue } from './StackVisualizer';

interface QueueVisualizerProps {
  heapMap: Map<string, HeapObject>;
  variables: Record<string, VariableValue>;
  changedHeapObjects: string[];
}

interface QueueItem {
  rawVal: any;
  key: string;
  displayVal: string;
  slotIdx?: number;
}

export const QueueVisualizer: React.FC<QueueVisualizerProps> = ({
  heapMap,
  variables,
  changedHeapObjects,
}) => {
  let queueId: string | undefined;
  let queueCandidate: HeapObject | undefined;

  // 1. Look for Queue / Deque instances in variables or heapMap
  // 1a. Check variables pointing to Queue objects or list/array
  for (const [varName, varVal] of Object.entries(variables)) {
    if (varVal && typeof varVal === 'object' && 'ref' in varVal) {
      const obj = heapMap.get(String(varVal.ref));
      if (!obj) continue;
      const lowerClass = obj.class?.toLowerCase() || '';
      const vLower = varName.toLowerCase();
      const f = obj.fields || {};

      if (
        lowerClass.includes('queue') ||
        lowerClass.includes('deque') ||
        vLower === 'q' ||
        vLower.includes('queue') ||
        vLower === 'fifo' ||
        'front' in f ||
        'head' in f ||
        'rear' in f ||
        'tail' in f ||
        'first' in f ||
        ((vLower === 'self' || vLower === 'this') &&
          ('items' in f ||
            'elements' in f ||
            'data' in f ||
            'front' in f ||
            'head' in f ||
            'rear' in f ||
            'tail' in f))
      ) {
        queueCandidate = obj;
        queueId = String(varVal.ref);
        break;
      }
    }
  }

  // 1b. If not found in variables, search all heap objects
  if (!queueCandidate) {
    for (const [id, obj] of heapMap.entries()) {
      const lowerClass = obj.class?.toLowerCase() || '';
      const f = obj.fields || {};
      if (
        lowerClass.includes('queue') ||
        lowerClass.includes('deque') ||
        'front' in f ||
        'head' in f ||
        'rear' in f ||
        'tail' in f ||
        'first' in f
      ) {
        queueCandidate = obj;
        queueId = id;
        break;
      }
    }
  }

  let rawItems: any[] = [];
  let itemSlotIndices: (number | undefined)[] = [];
  let detectedFront: number | undefined;
  let detectedRear: number | undefined;

  // 2. Extract elements from queueCandidate
  if (queueCandidate) {
    const f = queueCandidate.fields || {};

    // Check if queueCandidate is backed by an array / list (e.g. items, elements, data, arr, queue, buffer, elementData)
    const arrayField =
      f.items || f.elements || f.data || f.arr || f.queue || f.buffer || f.elementData;
    let backingArray: any[] | undefined;

    if (arrayField && typeof arrayField === 'object' && 'ref' in arrayField) {
      const arrObj = heapMap.get(String(arrayField.ref));
      if (arrObj?.items && Array.isArray(arrObj.items)) {
        backingArray = arrObj.items;
      }
    } else if (Array.isArray(arrayField)) {
      backingArray = arrayField;
    } else if (queueCandidate.items && Array.isArray(queueCandidate.items)) {
      backingArray = queueCandidate.items;
    }

    // Support Python collections.deque representation: ["INSTANCE_PPRINT", "deque", "deque([1, 2, 3])"]
    if (!backingArray && queueCandidate.value) {
      const valStr = Array.isArray(queueCandidate.value)
        ? String(queueCandidate.value[2] || queueCandidate.value[1] || queueCandidate.value[0])
        : String(queueCandidate.value);
      const match = valStr.match(/deque\(\s*\[(.*?)\]\s*\)/);
      if (match) {
        try {
          backingArray = JSON.parse(`[${match[1]}]`);
        } catch {
          backingArray = match[1].split(',').map((s) => s.trim()).filter(Boolean);
        }
      }
    }

    if (backingArray) {
      // Normalize front/head and rear/tail pointers
      const front =
        typeof f.front === 'number'
          ? Number(f.front)
          : typeof f.head === 'number'
          ? Number(f.head)
          : typeof f.first === 'number'
          ? Number(f.first)
          : undefined;

      const rear =
        typeof f.rear === 'number'
          ? Number(f.rear)
          : typeof f.tail === 'number'
          ? Number(f.tail)
          : typeof f.last === 'number'
          ? Number(f.last)
          : typeof f.back === 'number'
          ? Number(f.back)
          : undefined;

      const size =
        typeof f.size === 'number'
          ? Number(f.size)
          : typeof f.count === 'number'
          ? Number(f.count)
          : typeof f.len === 'number'
          ? Number(f.len)
          : typeof f.length === 'number'
          ? Number(f.length)
          : undefined;

      detectedFront = front;
      detectedRear = rear;

      const cap = backingArray.length;

      // 2a. Both front and rear pointers exist (authoritative array-based queue)
      if (front !== undefined && rear !== undefined) {
        if (rear === -1) {
          // Empty queue in 0-indexed rear=-1 implementations
          rawItems = [];
          itemSlotIndices = [];
        } else if (front <= rear) {
          if (front === rear) {
            // Either empty, or completely full circular buffer
            if (size !== undefined && size > 0 && cap > 0) {
              const active: any[] = [];
              const slots: number[] = [];
              for (let i = 0; i < cap; i++) {
                const sIdx = (front + i) % cap;
                if (sIdx < backingArray.length) {
                  active.push(backingArray[sIdx]);
                  slots.push(sIdx);
                }
              }
              rawItems = active;
              itemSlotIndices = slots;
            } else {
              rawItems = [];
              itemSlotIndices = [];
            }
          } else {
            // Standard linear queue range from front to rear
            const isRearInclusive = size !== undefined && size === rear - front + 1;
            const endIdx = isRearInclusive ? rear + 1 : rear;
            const active: any[] = [];
            const slots: number[] = [];
            for (let i = front; i < endIdx && i < backingArray.length; i++) {
              active.push(backingArray[i]);
              slots.push(i);
            }
            rawItems = active;
            itemSlotIndices = slots;
          }
        } else {
          // Circular queue wraparound: rear < front
          const active: any[] = [];
          const slots: number[] = [];
          // Part 1: front to end of buffer
          for (let i = front; i < cap; i++) {
            active.push(backingArray[i]);
            slots.push(i);
          }
          // Part 2: 0 to rear
          const isRearInclusive = size !== undefined && size === cap - front + rear + 1;
          const endIdx = isRearInclusive ? rear + 1 : rear;
          for (let i = 0; i < endIdx && i < backingArray.length; i++) {
            active.push(backingArray[i]);
            slots.push(i);
          }
          rawItems = active;
          itemSlotIndices = slots;
        }
      } else if (front !== undefined && size !== undefined) {
        // Size and front are known: take 'size' items starting from 'front'
        const active: any[] = [];
        const slots: number[] = [];
        for (let i = 0; i < size; i++) {
          const idx = cap > 0 ? (front + i) % cap : front + i;
          if (idx < backingArray.length) {
            active.push(backingArray[idx]);
            slots.push(idx);
          }
        }
        rawItems = active;
        itemSlotIndices = slots;
      } else if (rear !== undefined && rear > 0) {
        const active: any[] = [];
        const slots: number[] = [];
        for (let i = 0; i < rear && i < backingArray.length; i++) {
          active.push(backingArray[i]);
          slots.push(i);
        }
        rawItems = active;
        itemSlotIndices = slots;
      } else if (size !== undefined && size > 0) {
        const active: any[] = [];
        const slots: number[] = [];
        for (let i = 0; i < size && i < backingArray.length; i++) {
          active.push(backingArray[i]);
          slots.push(i);
        }
        rawItems = active;
        itemSlotIndices = slots;
      } else {
        // Dynamic list (Python self.items = [] or plain array)
        rawItems = backingArray.filter((x) => x !== null && x !== undefined);
        itemSlotIndices = rawItems.map((_, i) => i);
      }
    }

    // 2b. Check if it's a linked-list queue (e.g. java.util.LinkedList with 'first', or custom with 'front'/'head')
    if (rawItems.length === 0) {
      const headField = f.first || f.front || f.head;
      if (headField && typeof headField === 'object' && 'ref' in headField) {
        let currId: string | undefined = String(headField.ref);
        const visited = new Set<string>();
        const linkedItems: any[] = [];
        const slots: number[] = [];
        let count = 0;
        while (currId && !visited.has(currId)) {
          visited.add(currId);
          const nodeObj = heapMap.get(currId);
          if (!nodeObj) break;
          const val =
            nodeObj.fields?.item ??
            nodeObj.fields?.val ??
            nodeObj.fields?.value ??
            nodeObj.fields?.data ??
            currId;
          linkedItems.push(val);
          slots.push(Number(currId) || count++);
          if (
            nodeObj.fields?.next &&
            typeof nodeObj.fields.next === 'object' &&
            'ref' in nodeObj.fields.next
          ) {
            currId = String(nodeObj.fields.next.ref);
          } else {
            break;
          }
        }
        rawItems = linkedItems;
        itemSlotIndices = slots;
      }
    }
  }

  // 3. Fallback: Search variables or heapMap for any active list / array
  if (rawItems.length === 0) {
    for (const [, varVal] of Object.entries(variables)) {
      if (varVal && typeof varVal === 'object' && 'ref' in varVal) {
        const obj = heapMap.get(String(varVal.ref));
        if (obj?.items && Array.isArray(obj.items)) {
          rawItems = obj.items;
          itemSlotIndices = rawItems.map((_, i) => i);
          queueId = String(varVal.ref);
          break;
        }
      }
    }
  }

  if (rawItems.length === 0) {
    for (const [id, obj] of heapMap.entries()) {
      if ((obj.type === 'list' || obj.type === 'array') && obj.items && Array.isArray(obj.items)) {
        rawItems = obj.items;
        itemSlotIndices = rawItems.map((_, i) => i);
        queueId = id;
        break;
      }
    }
  }

  // Filter out any null/undefined slots
  const validIndices: number[] = [];
  rawItems.forEach((x, idx) => {
    if (x !== null && x !== undefined) {
      validIndices.push(idx);
    }
  });

  const finalItems = validIndices.map((idx) => rawItems[idx]);
  const finalSlots = validIndices.map((idx) => itemSlotIndices[idx] ?? idx);

  // 4. Stable item key resolution for Framer Motion popLayout:
  // For array queues with fixed slots: use slot index (stable across FIFO dequeues!)
  // For dynamic lists / values: use occurrence counts of values to preserve identity without render-phase mutations
  const occurrenceCount = new Map<string, number>();

  const queueItems: QueueItem[] = finalItems.map((rawVal, idx) => {
    const slot = finalSlots[idx];
    const displayVal = resolveStackValue(rawVal, heapMap);

    let key = '';
    if (slot !== undefined && (detectedFront !== undefined || detectedRear !== undefined)) {
      key = `slot-${slot}`;
    } else {
      const occ = occurrenceCount.get(displayVal) || 0;
      occurrenceCount.set(displayVal, occ + 1);
      key = `val-${displayVal}-${occ}`;
    }

    return {
      rawVal,
      key,
      displayVal,
      slotIdx: slot,
    };
  });

  const isChanged = queueId ? changedHeapObjects.includes(queueId) : false;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none overflow-x-auto">
      {/* Header bar */}
      <div className="flex items-center gap-2 mb-6 text-xs font-mono text-[var(--color-text-muted)]">
        <span className="w-2 h-2 rounded-full bg-zinc-500 inline-block"></span>
        <span className="font-semibold text-[var(--color-text-main)]">FIFO Queue Conveyor</span>
        <span className="opacity-40">|</span>
        <span>Count: {queueItems.length}</span>
        {detectedFront !== undefined && (
          <>
            <span className="opacity-40">|</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Front: {detectedFront}</span>
          </>
        )}
        {detectedRear !== undefined && (
          <>
            <span className="opacity-40">|</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Rear: {detectedRear}</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Dequeue indicator on the Front (left) */}
        <div className="flex flex-col items-center text-xs font-mono text-zinc-600 dark:text-zinc-400 shrink-0">
          <span className="font-bold text-zinc-900 dark:text-zinc-100">DEQUEUE</span>
          <span className="text-[10px] text-[var(--color-text-muted)]">Front (0)</span>
          <ArrowLeft className="w-4 h-4 mt-1 text-zinc-500 dark:text-zinc-400" />
        </div>

        {/* Conduit tube conveyor */}
        <div
          className={`relative min-w-80 max-w-3xl min-h-28 flex items-center gap-3 pt-9 pb-3 px-5 rounded-2xl border-2 transition-colors ${
            isChanged
              ? 'border-zinc-900 dark:border-white bg-zinc-100/60 dark:bg-zinc-800/40 shadow-sm'
              : 'border-zinc-300 dark:border-zinc-700 bg-[var(--color-bg-card)]'
          } shadow-sm backdrop-blur-md overflow-x-auto overflow-y-hidden`}
        >
          {/* Empty placeholder (fades out when items enter, fades in when queue becomes empty) */}
          {queueItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full text-center py-6 text-[var(--color-text-muted)] text-xs font-mono"
            >
              [ Queue Empty ]
            </motion.div>
          )}

          {/* AnimatePresence mode="popLayout" always mounted to guarantee entry & exit animations */}
          <AnimatePresence mode="popLayout">
            {queueItems.map((item, idx) => {
              const isFront = idx === 0;
              const isRear = idx === queueItems.length - 1;

              return (
                <motion.div
                  key={item.key}
                  layout
                  initial={{ x: 60, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: -60, opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="relative flex flex-col items-center shrink-0"
                >
                  {/* Pointer tag (FRONT / REAR) */}
                  {(isFront || isRear) && (
                    <div className="absolute -top-6 flex items-center gap-1 whitespace-nowrap z-10">
                      {isFront && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm">
                          FRONT
                        </span>
                      )}
                      {isRear && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-zinc-700 text-white dark:bg-zinc-300 dark:text-zinc-950 shadow-sm">
                          REAR
                        </span>
                      )}
                    </div>
                  )}

                  <div
                    className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-mono border-2 shadow-sm transition-colors ${
                      isFront
                        ? 'border-zinc-900 dark:border-white bg-zinc-200/60 dark:bg-zinc-800 text-zinc-950 dark:text-white font-bold'
                        : isRear
                        ? 'border-zinc-600 dark:border-zinc-400 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100'
                        : 'border-[var(--color-border)] bg-[var(--color-bg-panel)] text-[var(--color-text-main)]'
                    }`}
                  >
                    <span className="text-base font-bold">
                      {item.displayVal}
                    </span>
                    <span className="text-[9px] text-[var(--color-text-muted)] font-normal">
                      [{idx}]
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Enqueue indicator entering on the Rear (right) */}
        <div className="flex flex-col items-center text-xs font-mono text-zinc-600 dark:text-zinc-400 shrink-0">
          <ArrowLeft className="w-4 h-4 mb-1 text-zinc-500 dark:text-zinc-400" />
          <span className="font-bold text-zinc-900 dark:text-zinc-100">ENQUEUE</span>
          <span className="text-[10px] text-[var(--color-text-muted)]">Rear</span>
        </div>
      </div>
    </div>
  );
};

export default QueueVisualizer;
