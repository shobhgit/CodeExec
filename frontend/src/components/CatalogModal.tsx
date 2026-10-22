import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CATALOG_PRESETS } from '../data/catalogPresets';
import { PresetItem, SupportedLanguage } from '../types/tracer';
import { X, Search, Check, PlayCircle, Zap } from 'lucide-react';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: PresetItem) => void;
  currentPresetId: string;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
  currentPresetId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | SupportedLanguage>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'Arrays & Lists',
    'Linked Lists',
    'Stacks',
    'Queues',
    'Circular Queues',
    'Trees & BST',
    'Heaps',
    'Hash Maps & Dicts',
    'Sets & Tuples',
    'Graphs & Cycles',
    'Tries',
    'Union-Find',
    'Recursion',
  ];

  const filteredPresets = CATALOG_PRESETS.filter((p) => {
    const matchesLang = selectedLanguage === 'all' || p.language === selectedLanguage;
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLang && matchesCat && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-4xl max-h-[85vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border transition-colors duration-200 bg-[var(--color-bg-base)] border-[var(--color-border)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)] bg-[var(--color-bg-panel)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-zinc-900 dark:bg-white text-zinc-100 dark:text-zinc-950 border border-zinc-800 dark:border-zinc-200 shadow-sm">
              <Zap className="w-5 h-5 text-zinc-100 dark:text-zinc-950" />
            </div>
            <div>
              <h2 className="text-base font-extrabold font-heading text-[var(--color-text-main)] flex items-center gap-2">
                <span>CodeExec LeetCode Catalogue</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 font-bold">
                  Runnable Problems
                </span>
              </h2>
              <p className="text-xs text-[var(--color-text-muted)]">
                Curated algorithms with step-by-step memory & shape execution traces
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-zinc-800/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 p-4 border-b border-[var(--color-border)] bg-[var(--color-bg-card)]">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[var(--color-text-dim)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search LeetCode problem, data structure, or algorithm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs font-mono outline-none border transition-colors bg-[var(--color-bg-editor)] border-[var(--color-border)] text-[var(--color-text-main)] focus:border-zinc-500"
            />
          </div>

          {/* Language filter */}
          <div className="flex items-center gap-1 p-1 rounded-xl border bg-[var(--color-bg-editor)] border-[var(--color-border)] shrink-0">
            {(['all', 'python', 'java'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                  selectedLanguage === lang
                    ? 'bg-zinc-900 dark:bg-white text-zinc-100 dark:text-zinc-950 font-bold shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 overflow-x-auto border-b border-[var(--color-border)] bg-[var(--color-bg-panel)]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-zinc-900 dark:bg-white text-zinc-100 dark:text-zinc-950 border-zinc-900 dark:border-white font-bold shadow-sm'
                  : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-zinc-800/15'
              }`}
            >
              {cat === 'all' ? 'All Algorithms' : cat}
            </button>
          ))}
        </div>

        {/* Presets Grid */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-[var(--color-bg-base)]">
          {filteredPresets.map((preset) => {
            const isSelected = preset.id === currentPresetId;
            const diff = preset.difficulty || 'Easy';

            return (
              <motion.div
                key={preset.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => {
                  onSelectPreset(preset);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer font-mono flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'border-zinc-900 dark:border-white bg-zinc-200/50 dark:bg-zinc-800/60 shadow-md'
                    : 'border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-zinc-400 dark:hover:border-zinc-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700"
                    >
                      {preset.language}
                    </span>

                    {/* Difficulty Badge */}
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        diff === 'Easy'
                          ? 'text-zinc-700 dark:text-zinc-300 bg-zinc-200/60 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700'
                          : diff === 'Medium'
                          ? 'text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-600'
                          : 'text-zinc-950 dark:text-white bg-zinc-300 dark:bg-zinc-700 border border-zinc-500 font-bold'
                      }`}
                    >
                      {diff}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold font-sans mb-1 line-clamp-1 text-[var(--color-text-main)]">
                    {preset.title}
                  </h3>
                  <p className="text-[10px] text-[var(--color-text-dim)] line-clamp-1">
                    {preset.category}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-[var(--color-border)] text-[10px]">
                  <span className="text-[var(--color-text-muted)] flex items-center gap-1">
                    <PlayCircle className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                    <span>Instant Trace</span>
                  </span>
                  {isSelected && (
                    <span className="text-zinc-900 dark:text-white font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Active
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
