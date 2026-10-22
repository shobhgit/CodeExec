import React from 'react';
import { motion } from 'framer-motion';
import { HeapObject, VariableValue } from '../../types/tracer';
import { RefreshCw } from 'lucide-react';

interface CircularQueueVisualizerProps {
  heapMap: Map<string, HeapObject>;
  variables: Record<string, VariableValue>;
  changedHeapObjects: string[];
}

function resolveSlotValue(val: any, heapMap: Map<string, HeapObject>): string {
  if (val === null || val === undefined || val === -1) return '—';
  if (typeof val === 'object' && 'ref' in val) {
    const obj = heapMap.get(String(val.ref));
    if (obj) {
      if (obj.fields) {
        if (obj.fields.data !== undefined) return resolveSlotValue(obj.fields.data, heapMap);
        if (obj.fields.val !== undefined) return resolveSlotValue(obj.fields.val, heapMap);
        if (obj.fields.value !== undefined) return resolveSlotValue(obj.fields.value, heapMap);
      }
      if (obj.value !== undefined) return String(obj.value);
      return obj.class || `ref #${val.ref}`;
    }
    return `ref #${val.ref}`;
  }
  return String(val);
}

export const CircularQueueVisualizer: React.FC<CircularQueueVisualizerProps> = ({
  heapMap,
  variables,
  changedHeapObjects,
}) => {
  let head = 0;
  let tail = 0;
  let capacity = 5;
  let slots: any[] = [];
  let foundObj: HeapObject | undefined;

  for (const [id, obj] of heapMap.entries()) {
    if (obj.class?.toLowerCase().includes('circularqueue') || obj.type === 'object') {
      const f = obj.fields || {};
      if ('head' in f || 'front' in f || 'tail' in f || 'rear' in f) {
        foundObj = obj;
        head = Number(f.head ?? f.front ?? 0);
        tail = Number(f.tail ?? f.rear ?? 0);
        capacity = Number(f.capacity ?? f.k ?? 5);

        // Find internal data array
        const dataRef = f.data || f.queue || f.items;
        if (dataRef && typeof dataRef === 'object' && 'ref' in dataRef) {
          const arrObj = heapMap.get(String(dataRef.ref));
          if (arrObj?.items) slots = arrObj.items;
        } else if (Array.isArray(dataRef)) {
          slots = dataRef;
        }
        break;
      }
    }
  }

  // Fallback slots
  if (slots.length === 0) {
    for (const [id, obj] of heapMap.entries()) {
      if ((obj.type === 'array' || obj.type === 'list') && obj.items && obj.items.length >= 3) {
        slots = obj.items;
        capacity = slots.length;
        break;
      }
    }
  }

  // Check variables for head / tail
  if (variables.head !== undefined) head = Number(variables.head);
  if (variables.front !== undefined) head = Number(variables.front);
  if (variables.tail !== undefined) tail = Number(variables.tail);
  if (variables.rear !== undefined) tail = Number(variables.rear);

  const numSlots = Math.max(capacity, slots.length || 5);
  const radius = 110;
  const centerX = 160;
  const centerY = 160;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none">
      <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[var(--color-text-muted)]">
        <RefreshCw className="w-4 h-4 text-zinc-400" />
        <span className="font-semibold text-[var(--color-text-main)]">Circular Ring Buffer (Capacity {numSlots})</span>
        <span className="opacity-40">|</span>
        <span className="text-zinc-900 dark:text-white font-bold">Head: {head}</span>
        <span className="opacity-40">|</span>
        <span className="text-zinc-600 dark:text-zinc-400 font-bold">Tail: {tail}</span>
      </div>

      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Central Hub */}
        <div className="absolute w-28 h-28 rounded-full bg-[var(--color-bg-card)] border-2 border-[var(--color-border)] shadow-xl flex flex-col items-center justify-center text-center p-2 z-10">
          <span className="text-[10px] font-mono text-[var(--color-text-muted)] font-bold">RING BUFFER</span>
          <span className="text-xs font-mono font-bold text-[var(--color-text-main)]">
            {tail >= head ? tail - head : numSlots - head + tail} items
          </span>
          <span className="text-[9px] font-mono text-[var(--color-text-muted)]">WRAPAROUND</span>
        </div>

        {/* Circular SVG Tracks */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 320">
          <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="var(--color-border)" strokeWidth="4" />
          <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>

        {/* Slots distributed in a circle */}
        {Array.from({ length: numSlots }).map((_, idx) => {
          const angle = (idx / numSlots) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          const isHead = idx === head % numSlots;
          const isTail = idx === tail % numSlots;
          const val = slots[idx];
          const hasVal = val !== null && val !== undefined && val !== -1;

          return (
            <div
              key={idx}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20"
              style={{ left: `${x}px`, top: `${y}px` }}
            >
              {/* Pointer tags */}
              {(isHead || isTail) && (
                <div className="absolute -top-6 flex items-center gap-1 whitespace-nowrap">
                  {isHead && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-zinc-900 dark:bg-white text-zinc-100 dark:text-zinc-950 border border-zinc-700 dark:border-zinc-300 shadow-sm">
                      H
                    </span>
                  )}
                  {isTail && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-zinc-700 dark:bg-zinc-300 text-zinc-100 dark:text-zinc-900 shadow-sm">
                      T
                    </span>
                  )}
                </div>
              )}

              <motion.div
                layout
                animate={{
                  scale: isHead || isTail ? 1.08 : 1,
                  borderColor: isHead ? 'var(--color-text-main)' : isTail ? 'var(--color-text-muted)' : 'var(--color-border)',
                }}
                className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-mono border-2 shadow-md transition-colors ${
                  hasVal
                    ? 'bg-[var(--color-bg-card)] text-[var(--color-text-main)]'
                    : 'bg-[var(--color-bg-panel)] text-[var(--color-text-muted)] border-dashed'
                }`}
              >
                <span className="text-xs font-bold">{resolveSlotValue(val, heapMap)}</span>
                <span className="text-[8px] text-[var(--color-text-muted)] font-normal">[{idx}]</span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
