import React from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Terminal,
  Sun,
  Moon,
  Layers,
  ArrowRightLeft,
  GitCommit,
  LayoutGrid,
  GitFork,
  Code2,
} from 'lucide-react';
import { SupportedLanguage } from '../types/tracer';
import { DS_DEFINITIONS, SupportedDS } from '../data/dsPresets';

interface HeaderProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  selectedDS: SupportedDS;
  setSelectedDS: (ds: SupportedDS) => void;
  selectedVariant?: string;
  setSelectedVariant?: (variant: string) => void;
  onRunCode: () => void;
  isLoading: boolean;
  backendOnline: boolean;
  onReset: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const ICONS: Record<SupportedDS, React.ComponentType<{ className?: string }>> = {
  stack: Layers,
  queue: ArrowRightLeft,
  'linked-list': GitCommit,
  array: LayoutGrid,
  tree: GitFork,
};

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  selectedDS,
  setSelectedDS,
  selectedVariant,
  setSelectedVariant,
  onRunCode,
  isLoading,
  backendOnline,
  onReset,
  theme,
  onToggleTheme,
}) => {
  const currentDef = DS_DEFINITIONS.find((d) => d.id === selectedDS);

  return (
    <header className="w-full flex flex-col lg:flex-row items-center justify-between px-6 py-3 border-b select-none transition-colors duration-200 bg-[var(--color-bg-panel)] border-[var(--color-border)] backdrop-blur-xl gap-4">
      {/* Brand logo: Strictly "codeexec" only */}
      <div className="flex items-center gap-3">
        {/* Minimal Monochrome Brand Badge */}
        <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border border-zinc-700/30 flex items-center justify-center shadow-sm">
          <Terminal className="w-4 h-4" />
        </div>

        <div className="flex items-center">
          <h1 className="text-lg font-black tracking-tight font-mono lowercase text-[var(--color-text-main)]">
            codeexec
          </h1>
        </div>
      </div>

      {/* Middle: 5 Core Data Structure Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <div className="flex items-center gap-1 p-1 rounded-xl border bg-[var(--color-bg-card)] border-[var(--color-border)] shadow-sm">
          {DS_DEFINITIONS.map((def) => {
            const Icon = ICONS[def.id] || Code2;
            const isSelected = selectedDS === def.id;

            return (
              <button
                key={def.id}
                onClick={() => setSelectedDS(def.id)}
                title={def.description}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  isSelected
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-editor)]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white dark:text-zinc-950' : 'text-[var(--color-text-dim)]'}`} />
                <span>{def.label}</span>
              </button>
            );
          })}
        </div>

        {/* Optional Sub-Variant Switcher (e.g. Singly vs Doubly or 1D vs 2D) */}
        {currentDef?.variants && currentDef.variants.length > 0 && setSelectedVariant && (
          <div className="flex items-center gap-1 p-1 rounded-xl border bg-[var(--color-bg-card)] border-[var(--color-border)] text-xs font-mono">
            {currentDef.variants.map((v) => {
              const isVarSelected = selectedVariant === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    isVarSelected
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
                  }`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Right Action: Language toggle, Theme toggle, Backend status, and Run & Trace */}
      <div className="flex items-center gap-2.5">
        {/* Language selector toggle */}
        <div className="flex items-center gap-0.5 p-1 rounded-xl border bg-[var(--color-bg-card)] border-[var(--color-border)]">
          {(['python', 'java'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                language === lang
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Dark / Light Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          className="p-2 rounded-xl border bg-[var(--color-bg-card)] border-[var(--color-border)] text-[var(--color-text-main)] hover:bg-[var(--color-bg-editor)] transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-zinc-300" />
          ) : (
            <Moon className="w-4 h-4 text-zinc-700" />
          )}
        </button>

        {/* Backend health status badge */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-mono border ${
            backendOnline
              ? 'bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200'
              : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 text-zinc-500'
          }`}
          title={backendOnline ? 'Docker Backend Online on port 8080' : 'Connecting to Docker backend...'}
        >
          {backendOnline ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-200" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 text-zinc-500" />
          )}
          <span className="hidden xl:inline">{backendOnline ? 'Engine Online' : 'Connecting...'}</span>
        </div>

        {/* Reset button */}
        <button
          onClick={onReset}
          title="Reset trace to step 1"
          className="p-2 rounded-xl border bg-[var(--color-bg-card)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Run & Trace Button: Minimalist Solid Accent Button */}
        <button
          onClick={onRunCode}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-950 text-xs font-mono font-bold shadow-sm border border-zinc-900 dark:border-white transition-all disabled:opacity-40"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-current" />
          )}
          <span>{isLoading ? 'TRACING...' : 'RUN & TRACE'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
