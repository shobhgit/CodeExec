import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeapObject, VariableValue } from '../../types/tracer';
import { CircleDot } from 'lucide-react';

interface SetVisualizerProps {
  heapMap: Map<string, HeapObject>;
  variables: Record<string, VariableValue>;
  changedHeapObjects: string[];
}

export const SetVisualizer: React.FC<SetVisualizerProps> = ({
  heapMap,
  variables,
  changedHeapObjects,
}) => {
  let items: any[] = [];
  let setId: string | undefined;

  for (const [id, obj] of heapMap.entries()) {
    if (obj.type === 'set' || obj.type === 'tuple' || obj.class?.toLowerCase().includes('hashset')) {
      setId = id;
      if (obj.items) items = obj.items;
      break;
    }
  }

  if (items.length === 0) {
    for (const [varName, varVal] of Object.entries(variables)) {
      if (varVal && typeof varVal === 'object' && 'ref' in varVal) {
        const obj = heapMap.get(String(varVal.ref));
        if (obj?.items) {
          items = obj.items;
          setId = String(varVal.ref);
          break;
        }
      }
    }
  }

  // Filter raw python tags like ["SET", ...] if present
  const cleanedItems = items.filter((x) => x !== 'SET' && x !== 'TUPLE');
  const isChanged = setId ? changedHeapObjects.includes(setId) : false;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none">
      <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[var(--color-text-muted)]">
        <CircleDot className="w-4 h-4 text-zinc-400" />
        <span className="font-semibold text-[var(--color-text-main)]">Unique Mathematical Set Container</span>
        <span className="opacity-40">|</span>
        <span>Cardinality: {cleanedItems.length}</span>
      </div>

      <div
        className={`w-full max-w-md min-h-56 p-6 rounded-3xl border-2 transition-colors ${
          isChanged
            ? 'border-[var(--color-text-muted)] bg-zinc-200/50 dark:bg-zinc-800/50 shadow-md'
            : 'border-[var(--color-border)] bg-[var(--color-bg-card)]'
        } shadow-xl backdrop-blur-md flex flex-wrap items-center justify-center gap-3 relative`}
      >
        <div className="absolute top-3 left-4 text-[10px] font-mono text-[var(--color-text-muted)]">
          {'{ x | x ∈ Set }'}
        </div>

        {cleanedItems.length === 0 ? (
          <div className="text-[var(--color-text-muted)] text-xs font-mono py-8">∅ (Empty Set)</div>
        ) : (
          <AnimatePresence>
            {cleanedItems.map((val, idx) => (
              <motion.div
                key={`${val}-${idx}`}
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="px-4 py-2.5 rounded-2xl bg-zinc-900 dark:bg-zinc-100 border border-zinc-700 dark:border-zinc-300 text-zinc-100 dark:text-zinc-950 font-mono font-bold text-sm shadow-md flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600"></span>
                <span>{val && typeof val === 'object' && 'ref' in val ? `#${val.ref}` : String(val)}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
