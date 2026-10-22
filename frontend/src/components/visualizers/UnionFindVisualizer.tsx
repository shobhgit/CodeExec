import React from 'react';
import { HeapObject, VariableValue } from '../../types/tracer';
import { Binary } from 'lucide-react';

interface UnionFindVisualizerProps {
  heapMap: Map<string, HeapObject>;
  variables: Record<string, VariableValue>;
  changedHeapObjects: string[];
}

export const UnionFindVisualizer: React.FC<UnionFindVisualizerProps> = ({
  heapMap,
  variables,
  changedHeapObjects,
}) => {
  let parentArray: number[] = [];

  for (const [id, obj] of heapMap.entries()) {
    if (obj.type === 'array' || obj.type === 'list') {
      if (obj.items && obj.items.every((x) => typeof x === 'number')) {
        parentArray = obj.items as number[];
        break;
      }
    }
  }

  // Find root for each element
  function findRoot(i: number): number {
    let curr = i;
    const visited = new Set<number>();
    while (curr >= 0 && curr < parentArray.length && parentArray[curr] !== curr && !visited.has(curr)) {
      visited.add(curr);
      curr = parentArray[curr];
    }
    return curr;
  }

  // Group by component root
  const components: Record<number, number[]> = {};
  parentArray.forEach((_, idx) => {
    const root = findRoot(idx);
    if (!components[root]) components[root] = [];
    components[root].push(idx);
  });

  const componentStyles = [
    { border: 'border-zinc-800 dark:border-zinc-200', bg: 'bg-zinc-100 dark:bg-zinc-900', text: 'text-zinc-900 dark:text-zinc-100' },
    { border: 'border-zinc-600 dark:border-zinc-400', bg: 'bg-zinc-200/50 dark:bg-zinc-800/50', text: 'text-zinc-800 dark:text-zinc-200' },
    { border: 'border-zinc-500 dark:border-zinc-500', bg: 'bg-zinc-200/30 dark:bg-zinc-800/30', text: 'text-zinc-700 dark:text-zinc-300' },
    { border: 'border-zinc-400 dark:border-zinc-600', bg: 'bg-zinc-100/60 dark:bg-zinc-900/60', text: 'text-zinc-900 dark:text-zinc-100' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none overflow-y-auto">
      <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[var(--color-text-muted)]">
        <Binary className="w-4 h-4 text-zinc-400" />
        <span className="font-semibold text-[var(--color-text-main)]">Disjoint Set Union (DSU)</span>
        <span className="opacity-40">|</span>
        <span>Elements: {parentArray.length}</span>
        <span className="opacity-40">|</span>
        <span>Components: {Object.keys(components).length}</span>
      </div>

      {/* Parent Table */}
      <div className="flex flex-col items-center mb-6">
        <span className="text-[10px] font-mono text-[var(--color-text-muted)] mb-1 font-bold">PARENT POINTER TABLE</span>
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-xl overflow-x-auto">
          {parentArray.map((p, idx) => {
            const isRoot = p === idx;
            return (
              <div
                key={idx}
                className={`w-14 h-16 rounded-xl flex flex-col items-center justify-center font-mono border-2 shadow-sm transition-colors ${
                  isRoot
                    ? 'border-zinc-900 dark:border-white bg-zinc-200 dark:bg-zinc-800 text-[var(--color-text-main)] font-bold'
                    : 'border-[var(--color-border)] bg-[var(--color-bg-panel)] text-[var(--color-text-main)]'
                }`}
              >
                <span className="text-xs font-bold">{p}</span>
                <span className="text-[9px] text-[var(--color-text-muted)] mt-0.5">i={idx}</span>
                {isRoot && (
                  <span className="text-[7px] font-bold text-zinc-100 dark:text-zinc-950 bg-zinc-900 dark:bg-white px-1 rounded mt-0.5">
                    ROOT
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Connected Components Clusters */}
      <div className="flex flex-wrap items-center justify-center gap-4 max-w-xl">
        {Object.entries(components).map(([root, members], cIdx) => {
          const style = componentStyles[cIdx % componentStyles.length];
          return (
            <div
              key={root}
              className={`p-3 rounded-2xl border-2 font-mono flex flex-col items-center gap-2 shadow-md backdrop-blur-md ${style.border} ${style.bg}`}
            >
              <div className={`text-[10px] font-bold tracking-wider ${style.text}`}>
                COMPONENT ROOT [{root}]
              </div>
              <div className="flex items-center gap-1.5">
                {members.map((m) => (
                  <span
                    key={m}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors ${
                      Number(m) === Number(root)
                        ? 'bg-zinc-900 dark:bg-white text-zinc-100 dark:text-zinc-950 border-zinc-900 dark:border-white shadow-sm'
                        : 'bg-[var(--color-bg-card)] border-[var(--color-border)] text-[var(--color-text-main)]'
                    }`}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
