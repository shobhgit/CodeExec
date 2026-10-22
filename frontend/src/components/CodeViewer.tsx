import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Edit3, Lock } from 'lucide-react';

interface CodeViewerProps {
  code: string;
  setCode: (c: string) => void;
  activeLine: number;
  language: string;
  isEditable: boolean;
  setIsEditable: (e: boolean) => void;
  functionName?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  code,
  setCode,
  activeLine,
  language,
  isEditable,
  setIsEditable,
  functionName,
}) => {
  const lines = code.split('\n');

  return (
    <div className="w-full h-full flex flex-col rounded-2xl border shadow-sm backdrop-blur-xl overflow-hidden transition-colors duration-200 bg-[var(--color-bg-panel)] border-[var(--color-border)]">
      {/* Code Viewer Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-bg-card)]">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-[var(--color-text-main)]">
            Source Code
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700">
            {language}
          </span>
          {functionName && (
            <span className="text-[10px] font-mono text-[var(--color-text-muted)] hidden sm:inline">
              fn: <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{functionName}</span>
            </span>
          )}
        </div>

        <button
          onClick={() => setIsEditable(!isEditable)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all border ${
            isEditable
              ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-400 dark:border-zinc-600 font-bold'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] border-transparent hover:bg-[var(--color-bg-editor)]'
          }`}
          title={isEditable ? 'Switch to Step-Highlight View' : 'Edit Code to Run Custom Example'}
        >
          {isEditable ? <Edit3 className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
          <span>{isEditable ? 'Editing' : 'Locked'}</span>
        </button>
      </div>

      {/* Editor or Stepping Line View */}
      <div className="flex-1 overflow-auto p-3 font-mono text-xs leading-6 bg-[var(--color-bg-editor)]">
        {isEditable ? (
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-transparent resize-none outline-none font-mono text-[var(--color-text-main)] text-xs leading-6 p-2"
            spellCheck={false}
          />
        ) : (
          <div className="flex flex-col">
            {lines.map((lineText, idx) => {
              const lineNum = idx + 1;
              const isActive = lineNum === activeLine;

              return (
                <div
                  key={lineNum}
                  className={`relative flex items-center group rounded-md transition-colors px-2 ${
                    isActive
                      ? 'bg-zinc-200/80 dark:bg-zinc-800/80 text-[var(--color-text-main)] font-semibold shadow-inner'
                      : 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-card)]'
                  }`}
                >
                  {/* Active Line Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeLineIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-900 dark:bg-zinc-100 rounded-r"
                    />
                  )}

                  {/* Line Number */}
                  <span
                    className={`w-8 select-none text-right pr-3 shrink-0 ${
                      isActive ? 'text-zinc-900 dark:text-zinc-100 font-bold' : 'text-[var(--color-text-dim)]'
                    }`}
                  >
                    {lineNum}
                  </span>

                  {/* Code Line Content */}
                  <span className={`whitespace-pre select-text ${isActive ? 'text-[var(--color-text-main)]' : ''}`}>
                    {lineText || ' '}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeViewer;
