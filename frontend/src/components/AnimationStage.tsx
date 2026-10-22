import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReconstructedStep } from '../types/tracer';
import { SupportedDS } from '../data/dsPresets';
import { TreeVisualizer } from './visualizers/TreeVisualizer';
import { LinkedListVisualizer } from './visualizers/LinkedListVisualizer';
import { StackVisualizer } from './visualizers/StackVisualizer';
import { QueueVisualizer } from './visualizers/QueueVisualizer';
import { ArrayVisualizer } from './visualizers/ArrayVisualizer';
import { GenericMemoryVisualizer } from './visualizers/GenericMemoryVisualizer';
import { Eye, Layers, Cpu, Terminal, Sparkles } from 'lucide-react';

interface AnimationStageProps {
  currentStep: ReconstructedStep | null;
  language: string;
  selectedDS: SupportedDS;
  selectedVariant?: string;
}

export const AnimationStage: React.FC<AnimationStageProps> = ({
  currentStep,
  selectedDS,
  selectedVariant,
}) => {
  const [activeTab, setActiveTab] = useState<'shape' | 'heap' | 'variables' | 'console'>('shape');

  if (!currentStep) {
    const dsName =
      selectedDS === 'linked-list'
        ? selectedVariant === 'doubly'
          ? 'Doubly Linked List'
          : 'Singly Linked List'
        : selectedDS === 'array'
        ? selectedVariant === '2d'
          ? '2D Matrix'
          : '1D Array'
        : selectedDS === 'tree'
        ? 'Binary Search Tree'
        : selectedDS.toUpperCase();

    return (
      <div className="w-full h-full flex flex-col items-center justify-center py-16 rounded-2xl border shadow-sm transition-colors duration-200 bg-[var(--color-bg-panel)] border-[var(--color-border)] text-[var(--color-text-muted)]">
        <Sparkles className="w-7 h-7 text-zinc-400 mb-3" />
        <p className="text-sm font-bold text-[var(--color-text-main)]">Ready to trace {dsName} execution.</p>
        <p className="text-xs text-[var(--color-text-muted)] mt-1">Click "RUN & TRACE" above to execute and step through the animation.</p>
      </div>
    );
  }

  // Section hardcoded to specifically assume that data structure's visualizer
  const renderShapeVisualizer = () => {
    switch (selectedDS) {
      case 'tree':
        return (
          <TreeVisualizer
            heapMap={currentStep.heapMap}
            variables={currentStep.variables}
            changedHeapObjects={currentStep.changedHeapObjects}
          />
        );
      case 'linked-list':
        return (
          <LinkedListVisualizer
            heapMap={currentStep.heapMap}
            variables={currentStep.variables}
            changedHeapObjects={currentStep.changedHeapObjects}
            isDoubly={selectedVariant === 'doubly'}
          />
        );
      case 'stack':
        return (
          <StackVisualizer
            heapMap={currentStep.heapMap}
            variables={currentStep.variables}
            changedHeapObjects={currentStep.changedHeapObjects}
          />
        );
      case 'queue':
        return (
          <QueueVisualizer
            heapMap={currentStep.heapMap}
            variables={currentStep.variables}
            changedHeapObjects={currentStep.changedHeapObjects}
          />
        );
      case 'array':
        return (
          <ArrayVisualizer
            heapMap={currentStep.heapMap}
            variables={currentStep.variables}
            changedHeapObjects={currentStep.changedHeapObjects}
            isMatrix={selectedVariant === '2d'}
          />
        );
      default:
        return (
          <GenericMemoryVisualizer
            heapMap={currentStep.heapMap}
            variables={currentStep.variables}
            changedHeapObjects={currentStep.changedHeapObjects}
          />
        );
    }
  };

  return (
    <div className="w-full h-full flex flex-col rounded-2xl border shadow-sm overflow-hidden transition-colors duration-200 bg-[var(--color-bg-panel)] border-[var(--color-border)]">
      {/* Stage Header & Tabs */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-zinc-500 inline-block"></span>
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-[var(--color-text-main)]">
            Execution Canvas
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700">
            {selectedDS.toUpperCase()}
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 p-0.5 rounded-xl border bg-[var(--color-bg-editor)] border-[var(--color-border)]">
          <button
            onClick={() => setActiveTab('shape')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'shape'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive Shape</span>
          </button>

          <button
            onClick={() => setActiveTab('heap')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'heap'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Heap Allocations</span>
          </button>

          <button
            onClick={() => setActiveTab('variables')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'variables'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Variables</span>
          </button>

          <button
            onClick={() => setActiveTab('console')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'console'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Stdout Terminal</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Body */}
      <div className="flex-1 w-full relative overflow-hidden bg-grid-pattern flex flex-col">
        <AnimatePresence mode="wait">
          {activeTab === 'shape' && (
            <motion.div
              key="shape"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              {renderShapeVisualizer()}
            </motion.div>
          )}

          {activeTab === 'heap' && (
            <motion.div
              key="heap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full overflow-y-auto"
            >
              <GenericMemoryVisualizer
                heapMap={currentStep.heapMap}
                variables={currentStep.variables}
                changedHeapObjects={currentStep.changedHeapObjects}
              />
            </motion.div>
          )}

          {activeTab === 'variables' && (
            <motion.div
              key="variables"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full p-6 overflow-y-auto"
            >
              <div className="max-w-md mx-auto rounded-2xl border p-4 shadow-sm bg-[var(--color-bg-card)] border-[var(--color-border)]">
                <div className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 mb-3 border-b border-[var(--color-border)] pb-2 flex items-center justify-between">
                  <span>LOCAL VARIABLES IN SCOPE</span>
                  <span className="text-[10px] text-[var(--color-text-dim)]">{currentStep.functionName}()</span>
                </div>
                {Object.keys(currentStep.variables).length === 0 ? (
                  <div className="py-6 text-center text-xs font-mono text-[var(--color-text-muted)]">
                    [ No local variables in scope ]
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {Object.entries(currentStep.variables).map(([k, v]) => {
                      const isChanged = currentStep.changedVariables.includes(k);
                      return (
                        <div
                          key={k}
                          className={`flex items-center justify-between p-2.5 rounded-xl border font-mono text-xs ${
                            isChanged
                              ? 'border-zinc-900 dark:border-white bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                              : 'border-[var(--color-border)] bg-[var(--color-bg-editor)] text-[var(--color-text-main)]'
                          }`}
                        >
                          <span className="font-bold text-zinc-700 dark:text-zinc-300">{k}</span>
                          <span className="font-semibold">
                            {v && typeof v === 'object' && 'ref' in v
                              ? `ref #${v.ref}`
                              : String(v)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'console' && (
            <motion.div
              key="console"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full p-6 overflow-y-auto font-mono text-xs bg-[var(--color-bg-editor)] text-zinc-300"
            >
              <div className="flex items-center gap-2 text-zinc-400 mb-3 border-b border-[var(--color-border)] pb-2">
                <Terminal className="w-4 h-4 text-zinc-400" />
                <span className="font-bold">CODEEXEC STANDARD OUTPUT</span>
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed font-mono text-[var(--color-text-main)]">
                {currentStep.accumulatedStdout || '[ Program stdout will stream here ]'}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimationStage;
