import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeapObject, VariableValue } from '../../types/tracer';
import { GitBranch } from 'lucide-react';

interface TrieVisualizerProps {
  heapMap: Map<string, HeapObject>;
  variables: Record<string, VariableValue>;
  changedHeapObjects: string[];
}

export const TrieVisualizer: React.FC<TrieVisualizerProps> = ({
  heapMap,
  variables,
  changedHeapObjects,
}) => {
  // Collect all trie nodes
  const trieNodes: Array<{ id: string; char: string; isEnd: boolean; children: Record<string, string> }> = [];

  for (const [id, obj] of heapMap.entries()) {
    if (obj.class?.toLowerCase().includes('trie') || obj.type === 'object') {
      const f = obj.fields || {};
      const isEnd = Boolean(f.is_end || f.isend || f.isendofword || f.isWord);
      const char = String(f.char || f.val || f.letter || (id === '1' || id === '55' ? 'ROOT' : ''));
      const children: Record<string, string> = {};

      // Check children map or direct fields
      if (f.children && typeof f.children === 'object') {
        if ('ref' in f.children) {
          const mapObj = heapMap.get(String(f.children.ref));
          if (mapObj?.entries) {
            mapObj.entries.forEach(({ key, value }) => {
              if (value && typeof value === 'object' && 'ref' in value) {
                children[String(key)] = String(value.ref);
              }
            });
          }
        }
      }

      // Check direct child fields (e.g. child, next, a, b, c)
      for (const [k, v] of Object.entries(f)) {
        if (k.length === 1 && v && typeof v === 'object' && 'ref' in v) {
          children[k] = String(v.ref);
        }
      }

      trieNodes.push({ id, char, isEnd, children });
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none overflow-y-auto">
      <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[var(--color-text-muted)]">
        <GitBranch className="w-4 h-4 text-zinc-400" />
        <span className="font-semibold text-[var(--color-text-main)]">Prefix Tree (Trie) Structure</span>
        <span className="opacity-40">|</span>
        <span>{trieNodes.length} Nodes</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 max-w-xl p-4 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-xl backdrop-blur-md">
        <AnimatePresence>
          {trieNodes.map((node) => {
            const isChanged = changedHeapObjects.includes(node.id);
            const childKeys = Object.keys(node.children);

            return (
              <motion.div
                key={node.id}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className={`flex flex-col items-center p-3 rounded-xl border-2 font-mono shadow-sm transition-colors ${
                  isChanged
                    ? 'border-zinc-400 bg-zinc-200/60 dark:bg-zinc-800/60 text-[var(--color-text-main)]'
                    : node.isEnd
                    ? 'border-zinc-900 dark:border-white bg-zinc-100 dark:bg-zinc-900 text-[var(--color-text-main)]'
                    : 'border-[var(--color-border)] bg-[var(--color-bg-panel)] text-[var(--color-text-main)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{node.char || `Node #${node.id}`}</span>
                  {node.isEnd && (
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-zinc-900 dark:bg-white text-zinc-100 dark:text-zinc-950">
                      WORD_END
                    </span>
                  )}
                </div>

                {childKeys.length > 0 && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-1.5">
                    <span>Edges:</span>
                    {childKeys.map((c) => (
                      <span key={c} className="px-1 bg-[var(--color-bg-panel)] rounded font-bold text-[var(--color-text-main)] border border-[var(--color-border)]">
                        '{c}' → #{node.children[c]}
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
