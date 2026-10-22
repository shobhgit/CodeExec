import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  FastForward,
  Gauge,
} from 'lucide-react';
import { ReconstructedStep } from '../types/tracer';

interface PlaybackControlsProps {
  currentStepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onJumpToStart: () => void;
  onJumpToEnd: () => void;
  onSeek: (step: number) => void;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  currentStep: ReconstructedStep | null;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  currentStepIndex,
  totalSteps,
  isPlaying,
  onPlayPause,
  onStepForward,
  onStepBackward,
  onJumpToStart,
  onJumpToEnd,
  onSeek,
  playbackSpeed,
  setPlaybackSpeed,
  currentStep,
}) => {
  const speeds = [0.5, 1, 1.5, 2, 3];

  return (
    <div className="w-full flex flex-col gap-2 p-3 rounded-2xl border shadow-sm backdrop-blur-xl transition-colors duration-200 bg-[var(--color-bg-panel)] border-[var(--color-border)]">
      {/* Timeline Scrubbing Bar */}
      <div className="flex items-center gap-3 px-2">
        <span className="text-[11px] font-mono text-[var(--color-text-muted)] min-w-16">
          {totalSteps > 0 ? `Step ${currentStepIndex + 1}/${totalSteps}` : '0/0'}
        </span>

        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStepIndex}
          onChange={(e) => onSeek(Number(e.target.value))}
          disabled={totalSteps <= 1}
          className="flex-1 h-1.5 bg-[var(--color-bg-editor)] rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-white disabled:opacity-40"
        />

        {currentStep && (
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full border bg-[var(--color-bg-card)] border-[var(--color-border)] text-[var(--color-text-muted)]">
            {currentStep.event}: <span className="text-zinc-900 dark:text-zinc-100 font-bold">line {currentStep.line}</span>
          </span>
        )}
      </div>

      {/* Main Buttons Bar */}
      <div className="flex items-center justify-between px-2 pt-1 border-t border-[var(--color-border)]">
        {/* Speed Selector */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-text-muted)]">
          <Gauge className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">Speed:</span>
          <div className="flex items-center gap-0.5 p-0.5 rounded-lg border bg-[var(--color-bg-card)] border-[var(--color-border)]">
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => setPlaybackSpeed(s)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-all ${
                  playbackSpeed === s
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Center Control Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onJumpToStart}
            disabled={currentStepIndex === 0 || totalSteps <= 1}
            title="Restart from beginning"
            className="p-2 rounded-xl border bg-[var(--color-bg-card)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onStepBackward}
            disabled={currentStepIndex === 0 || totalSteps <= 1}
            title="Step Backward (Prev line)"
            className="p-2 rounded-xl border bg-[var(--color-bg-card)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Minimalist Solid Play/Pause Button */}
          <button
            onClick={onPlayPause}
            disabled={totalSteps <= 1}
            title={isPlaying ? 'Pause' : 'Play animation'}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-950 font-mono font-bold text-xs flex items-center gap-2 border border-zinc-900 dark:border-white shadow-sm transition-all disabled:opacity-40 disabled:pointer-events-none"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>

          <button
            onClick={onStepForward}
            disabled={currentStepIndex >= totalSteps - 1 || totalSteps <= 1}
            title="Step Forward (Next line)"
            className="p-2 rounded-xl border bg-[var(--color-bg-card)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={onJumpToEnd}
            disabled={currentStepIndex >= totalSteps - 1 || totalSteps <= 1}
            title="Jump to End"
            className="p-2 rounded-xl border bg-[var(--color-bg-card)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <FastForward className="w-4 h-4" />
          </button>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)]">
          <span className="hidden sm:inline">Status:</span>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              isPlaying
                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700'
                : 'bg-[var(--color-bg-card)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
            }`}
          >
            {isPlaying ? 'STEPPING' : 'PAUSED'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlaybackControls;
