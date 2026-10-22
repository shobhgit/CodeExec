import React from 'react';
import { motion } from 'framer-motion';
import { HeapObject, VariableValue } from '../../types/tracer';
import { LayoutGrid, ArrowDown, Variable } from 'lucide-react';

interface ArrayVisualizerProps {
  heapMap: Map<string, HeapObject>;
  variables: Record<string, VariableValue>;
  changedHeapObjects: string[];
  isMatrix?: boolean;
}

// Dereference array elements to display primitive data
function resolveArrayValue(val: any, heapMap: Map<string, HeapObject>): string {
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'object' && 'ref' in val) {
    const obj = heapMap.get(String(val.ref));
    if (obj) {
      if (obj.fields) {
        if (obj.fields.data !== undefined) return resolveArrayValue(obj.fields.data, heapMap);
        if (obj.fields.val !== undefined) return resolveArrayValue(obj.fields.val, heapMap);
        if (obj.fields.value !== undefined) return resolveArrayValue(obj.fields.value, heapMap);
      }
      if (obj.value !== undefined) return String(obj.value);
      return obj.class || `ref #${val.ref}`;
    }
    return `ref #${val.ref}`;
  }
  return String(val);
}

// Check if a variable name represents an array index/pointer
function isIndexVariable(name: string): boolean {
  const n = name.toLowerCase();
  const knownIndices = new Set([
    'i', 'j', 'k', 'idx', 'index', 'left', 'right', 'low', 'high',
    'mid', 'start', 'end', 'p', 'ptr', 'slow', 'fast', 'l', 'r',
    'row', 'col', 'r', 'c', 'curr_idx', 'next_idx'
  ]);
  if (knownIndices.has(n)) return true;
  if (n.includes('index') || n.includes('idx') || n.includes('ptr')) return true;
  return false;
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  heapMap,
  variables,
  changedHeapObjects,
  isMatrix = false,
}) => {
  // Find array objects
  const arrayObjs: HeapObject[] = [];
  for (const [, obj] of heapMap.entries()) {
    if (obj.type === 'array' || obj.type === 'list') {
      arrayObjs.push(obj);
    }
  }

  // Check if primary array has 2D references
  const primaryArray = arrayObjs[0];
  let matrixRows: any[][] = [];

  if (primaryArray && primaryArray.items) {
    const hasRefs = primaryArray.items.some((it) => it && typeof it === 'object' && 'ref' in it);
    if (hasRefs) {
      matrixRows = primaryArray.items.map((it) => {
        if (it && typeof it === 'object' && 'ref' in it) {
          const subObj = heapMap.get(String(it.ref));
          return subObj?.items || [it];
        }
        return [it];
      });
    }
  }

  const render2D = isMatrix || matrixRows.length > 0;
  const arrayLength = primaryArray?.items?.length || 0;

  // Distinguish true array index pointers vs general loop/scalar variables
  const indexPointers: Record<number, string[]> = {};
  const loopVariables: Record<string, any> = {};

  for (const [varName, varVal] of Object.entries(variables)) {
    // Ignore internal or large container references in the loop variable list
    if (varVal && typeof varVal === 'object' && 'ref' in varVal) {
      const obj = heapMap.get(String(varVal.ref));
      if (obj && (obj.type === 'array' || obj.type === 'list' || obj.type === 'dict')) {
        continue; // Don't list the whole array in the loop scalars list
      }
    }

    if (
      typeof varVal === 'number' &&
      Number.isInteger(varVal) &&
      varVal >= 0 &&
      varVal < arrayLength &&
      isIndexVariable(varName)
    ) {
      if (!indexPointers[varVal]) indexPointers[varVal] = [];
      indexPointers[varVal].push(varName);
    }

    // Every variable in scope is also tracked as a loop variable
    loopVariables[varName] = varVal;
  }

  if (arrayObjs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-[var(--color-text-muted)] py-12">
        <p className="text-sm">No array structure found in current step.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none overflow-x-auto">
      <div className="flex items-center gap-2 mb-6 text-xs font-mono text-[var(--color-text-muted)]">
        <LayoutGrid className="w-4 h-4 text-zinc-400" />
        <span className="font-semibold text-[var(--color-text-main)]">
          {render2D ? '2D Matrix Grid' : 'Contiguous 1D Array'}
        </span>
        <span className="opacity-40">|</span>
        <span>
          {render2D
            ? `${matrixRows.length} Rows × ${matrixRows[0]?.length || 0} Cols`
            : `${primaryArray?.items?.length || 0} Elements`}
        </span>
      </div>

      {render2D ? (
        /* 2D Matrix Grid View */
        <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-xl backdrop-blur-md">
          {matrixRows.map((row, rIdx) => (
            <div key={rIdx} className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[var(--color-text-muted)] w-8 text-right font-bold">
                r[{rIdx}]
              </span>
              <div className="flex items-center gap-2">
                {row.map((cell, cIdx) => (
                  <motion.div
                    key={`${rIdx}-${cIdx}`}
                    layout
                    className="w-14 h-14 rounded-xl bg-[var(--color-bg-panel)] border border-[var(--color-border)] flex flex-col items-center justify-center font-mono shadow-md"
                  >
                    <span className="text-sm font-bold text-[var(--color-text-main)]">
                      {resolveArrayValue(cell, heapMap)}
                    </span>
                    <span className="text-[8px] text-[var(--color-text-muted)]">[{rIdx},{cIdx}]</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* 1D Array Cells View */
        <div className="flex flex-col items-center max-w-full">
          <div className="flex items-end gap-2.5 pt-12 pb-6 px-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-xl backdrop-blur-md overflow-x-auto max-w-full">
            {primaryArray?.items?.map((rawVal, idx) => {
              const pointers = indexPointers[idx] || [];
              const isChanged = changedHeapObjects.includes(primaryArray.object);
              const displayVal = resolveArrayValue(rawVal, heapMap);

              return (
                <div key={idx} className="relative flex flex-col items-center">
                  {/* Floating index pointers (e.g., i, j, left, right) */}
                  {pointers.length > 0 && (
                    <motion.div
                      initial={{ y: 5, opacity: 0 }}
                      animate={{ y: -30, opacity: 1 }}
                      className="absolute -top-1 flex flex-col items-center z-20"
                    >
                      <div className="flex items-center gap-1">
                        {pointers.map((ptr) => (
                          <span
                            key={ptr}
                            className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-900 dark:bg-white text-zinc-100 dark:text-zinc-950 border border-zinc-700 dark:border-zinc-300 shadow-sm"
                          >
                            {ptr}
                          </span>
                        ))}
                      </div>
                      <ArrowDown className="w-3.5 h-3.5 text-zinc-900 dark:text-white mt-0.5 animate-bounce" />
                    </motion.div>
                  )}

                  {/* Cell Box */}
                  <motion.div
                    layout
                    animate={{
                      scale: pointers.length > 0 ? 1.05 : 1,
                      borderColor:
                        pointers.length > 0
                          ? 'var(--color-text-main)'
                          : isChanged
                          ? 'var(--color-text-muted)'
                          : 'var(--color-border)',
                    }}
                    className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center font-mono border-2 shadow-md transition-colors ${
                      pointers.length > 0
                        ? 'bg-zinc-200 dark:bg-zinc-800 text-[var(--color-text-main)] border-zinc-900 dark:border-white'
                        : isChanged
                        ? 'bg-zinc-100 dark:bg-zinc-900 text-[var(--color-text-main)] border-zinc-400 dark:border-zinc-600'
                        : 'bg-[var(--color-bg-panel)] border-[var(--color-border)] text-[var(--color-text-main)]'
                    }`}
                  >
                    <span className="text-base font-bold text-[var(--color-text-main)]">
                      {displayVal}
                    </span>
                    <span className="text-[9px] text-[var(--color-text-muted)] font-normal">[{idx}]</span>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Active Loop & Local Variables Bar */}
          {Object.keys(loopVariables).length > 0 && (
            <div className="mt-6 flex flex-col items-center w-full max-w-xl">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[var(--color-text-muted)] mb-2">
                <Variable className="w-3.5 h-3.5" />
                <span>LOOP & LOCAL VARIABLES IN SCOPE</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 p-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-md">
                {Object.entries(loopVariables).map(([name, val]) => {
                  const display = resolveArrayValue(val, heapMap);
                  const isIndex = isIndexVariable(name) && typeof val === 'number';

                  return (
                    <div
                      key={name}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono text-xs bg-[var(--color-bg-panel)] border-[var(--color-border)]"
                    >
                      <span className={isIndex ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-500 dark:text-zinc-400 font-bold'}>
                        {name}
                      </span>
                      <span className="text-[var(--color-text-muted)]">=</span>
                      <span className="text-[var(--color-text-main)] font-semibold">{display}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
