import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeapObject, VariableValue } from '../../types/tracer';
import { Database, ArrowRight } from 'lucide-react';

interface HashMapVisualizerProps {
  heapMap: Map<string, HeapObject>;
  variables: Record<string, VariableValue>;
  changedHeapObjects: string[];
}

export const HashMapVisualizer: React.FC<HashMapVisualizerProps> = ({
  heapMap,
  variables,
  changedHeapObjects,
}) => {
  let entries: Array<{ key: any; value: any }> = [];
  let mapId: string | undefined;

  for (const [id, obj] of heapMap.entries()) {
    if (obj.type === 'dict') {
      mapId = id;
      if (obj.entries) entries = obj.entries;
      break;
    }
    if (obj.class?.toLowerCase().includes('hashmap')) {
      mapId = id;
      // Extract from Java HashMap table
      const tableRef = obj.fields?.table;
      if (tableRef && typeof tableRef === 'object' && 'ref' in tableRef) {
        const tableObj = heapMap.get(String(tableRef.ref));
        if (tableObj?.items) {
          tableObj.items.forEach((item, slotIdx) => {
            if (item && typeof item === 'object' && 'ref' in item) {
              const nodeObj = heapMap.get(String(item.ref));
              if (nodeObj?.fields) {
                entries.push({
                  key: nodeObj.fields.key ?? `Slot ${slotIdx}`,
                  value: nodeObj.fields.value ?? 'val',
                });
              } else {
                entries.push({ key: `Slot ${slotIdx}`, value: `#${item.ref}` });
              }
            }
          });
        }
      }
      break;
    }
  }

  // Fallback to searching variables
  if (entries.length === 0) {
    for (const [varName, varVal] of Object.entries(variables)) {
      if (varVal && typeof varVal === 'object' && 'ref' in varVal) {
        const obj = heapMap.get(String(varVal.ref));
        if (obj?.entries) {
          entries = obj.entries;
          mapId = String(varVal.ref);
          break;
        }
      }
    }
  }

  const isChanged = mapId ? changedHeapObjects.includes(mapId) : false;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none overflow-y-auto">
      <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[var(--color-text-muted)]">
        <Database className="w-4 h-4 text-zinc-400" />
        <span className="font-semibold text-[var(--color-text-main)]">Key-Value Hash Storage</span>
        <span className="opacity-40">|</span>
        <span>Entries: {entries.length}</span>
        {mapId && <span className="opacity-40">| Obj #{mapId}</span>}
      </div>

      <div
        className={`w-full max-w-xl p-5 rounded-2xl border-2 transition-colors ${
          isChanged
            ? 'border-[var(--color-text-muted)] bg-zinc-200/50 dark:bg-zinc-800/50 shadow-md'
            : 'border-[var(--color-border)] bg-[var(--color-bg-card)]'
        } shadow-xl backdrop-blur-md`}
      >
        {entries.length === 0 ? (
          <div className="py-8 text-center text-[var(--color-text-muted)] text-xs font-mono">
            [ Hash Map Empty ]
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AnimatePresence>
              {entries.map(({ key, value }, idx) => (
                <motion.div
                  key={`${key}-${value}-${idx}`}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-bg-panel)] border border-[var(--color-border)] shadow-sm font-mono"
                >
                  {/* Key chip */}
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-md text-xs font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700">
                      "{String(key)}"
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                  </div>

                  {/* Value badge */}
                  <span className="text-sm font-bold text-[var(--color-text-main)] bg-[var(--color-bg-card)] px-2.5 py-1 rounded-md border border-[var(--color-border)]">
                    {value && typeof value === 'object' && 'ref' in value ? `#${value.ref}` : String(value)}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
