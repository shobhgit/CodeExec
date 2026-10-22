import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VariableValue } from '../../types/tracer';
import { Repeat } from 'lucide-react';

interface RecursionVisualizerProps {
  callStack: Array<{ function: string; line: number }>;
  variables: Record<string, VariableValue>;
  functionName: string;
}

export const RecursionVisualizer: React.FC<RecursionVisualizerProps> = ({
  callStack,
  variables,
  functionName,
}) => {
  // If callStack has items, use them; otherwise at least show the current function
  const frames =
    callStack.length > 0
      ? callStack
      : [{ function: functionName || 'main', line: 1 }];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none overflow-y-auto">
      <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[var(--color-text-muted)]">
        <Repeat className="w-4 h-4 text-zinc-400" />
        <span className="font-semibold text-[var(--color-text-main)]">Recursive Call Stack & Frame Cascade</span>
        <span className="opacity-40">|</span>
        <span>Depth: {frames.length}</span>
      </div>

      <div className="flex flex-col-reverse items-center gap-3 w-full max-w-sm">
        <AnimatePresence>
          {frames.map((frame, idx) => {
            const isTop = idx === frames.length - 1;

            return (
              <motion.div
                key={`${idx}-${frame.function}`}
                layout
                initial={{ y: -30, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -30, opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`w-full p-4 rounded-2xl border-2 font-mono shadow-md transition-all ${
                  isTop
                    ? 'border-zinc-900 dark:border-white bg-[var(--color-bg-card)] text-[var(--color-text-main)]'
                    : 'border-[var(--color-border)] bg-[var(--color-bg-panel)] text-[var(--color-text-muted)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[var(--color-text-main)]">{frame.function}()</span>
                    <span className="text-[10px] text-[var(--color-text-muted)]">line {frame.line}</span>
                  </div>
                  {isTop ? (
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-zinc-900 dark:bg-white text-zinc-100 dark:text-zinc-950 shadow-sm">
                      ACTIVE FRAME
                    </span>
                  ) : (
                    <span className="text-[10px] text-[var(--color-text-muted)]">depth #{idx + 1}</span>
                  )}
                </div>

                {/* Locals in this frame */}
                {isTop && Object.keys(variables).length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-[var(--color-border)] flex flex-wrap gap-2 text-xs">
                    {Object.entries(variables).map(([k, v]) => (
                      <span key={k} className="px-2 py-0.5 rounded bg-[var(--color-bg-base)] text-[var(--color-text-main)] border border-[var(--color-border)]">
                        <span className="text-zinc-500 dark:text-zinc-400 font-semibold">{k}</span> ={' '}
                        <span className="text-[var(--color-text-main)] font-bold">
                          {v && typeof v === 'object' && 'ref' in v ? `#${v.ref}` : String(v)}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
