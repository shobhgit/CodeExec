import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeapObject, VariableValue } from '../../types/tracer';
import { Cpu, ArrowRight } from 'lucide-react';

interface GenericMemoryVisualizerProps {
  heapMap: Map<string, HeapObject>;
  variables: Record<string, VariableValue>;
  changedHeapObjects: string[];
}

export const GenericMemoryVisualizer: React.FC<GenericMemoryVisualizerProps> = ({
  heapMap,
  variables,
  changedHeapObjects,
}) => {
  const heapArray = Array.from(heapMap.values());

  return (
    <div className="w-full h-full flex flex-col p-6 select-none overflow-y-auto">
      <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[var(--color-text-muted)]">
        <Cpu className="w-4 h-4 text-zinc-400" />
        <span className="font-semibold text-[var(--color-text-main)]">Heap Memory & Pointer Allocation Graph</span>
        <span className="opacity-40">|</span>
        <span>{heapArray.length} Allocated Objects</span>
      </div>

      {heapArray.length === 0 ? (
        <div className="flex flex-col items-center justify-center my-auto py-12 text-[var(--color-text-muted)] text-xs font-mono">
          [ No objects allocated on heap yet ]
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {heapArray.map((obj) => {
              const isChanged = changedHeapObjects.includes(obj.object);

              return (
                <motion.div
                  key={obj.object}
                  layout
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className={`p-4 rounded-2xl border-2 font-mono shadow-md transition-all ${
                    isChanged
                      ? 'border-zinc-500 bg-zinc-200/60 dark:bg-zinc-800/60 text-[var(--color-text-main)]'
                      : 'border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text-main)]'
                  }`}
                >
                  {/* Object Header */}
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2 mb-3">
                    <span className="text-xs font-bold text-[var(--color-text-main)]">
                      {obj.class || obj.type || 'Object'}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-[var(--color-bg-base)] text-[var(--color-text-muted)] font-semibold border border-[var(--color-border)]">
                      ref #{obj.object}
                    </span>
                  </div>

                  {/* Object Fields */}
                  {obj.fields && Object.keys(obj.fields).length > 0 && (
                    <div className="flex flex-col gap-1.5 text-xs">
                      {Object.entries(obj.fields).map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between py-0.5">
                          <span className="text-[var(--color-text-muted)]">{k}:</span>
                          <span className="font-bold">
                            {v && typeof v === 'object' && 'ref' in v ? (
                              <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                                <ArrowRight className="w-3 h-3 inline" /> #{v.ref}
                              </span>
                            ) : v === null ? (
                              <span className="text-[var(--color-text-muted)] opacity-50">null</span>
                            ) : (
                              String(v)
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Array/List Items */}
                  {obj.items && Array.isArray(obj.items) && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {obj.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[var(--color-bg-base)] text-xs font-bold text-[var(--color-text-main)] border border-[var(--color-border)]"
                        >
                          {item && typeof item === 'object' && 'ref' in item
                            ? `#${item.ref}`
                            : String(item)}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Dict Entries */}
                  {obj.entries && (
                    <div className="flex flex-col gap-1 mt-2">
                      {obj.entries.map(({ key, value }, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-[var(--color-text-muted)]">"{String(key)}":</span>
                          <span className="font-bold text-[var(--color-text-main)]">
                            {value && typeof value === 'object' && 'ref' in value
                              ? `#${value.ref}`
                              : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
