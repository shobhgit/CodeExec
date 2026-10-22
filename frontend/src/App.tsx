import React, { useState, useEffect, useRef } from 'react';
import {
  ExecutionRequest,
  ExecutionResponse,
  ReconstructedStep,
  SupportedLanguage,
  TraceStep,
} from './types/tracer';
import { reconstructTrace } from './utils/traceReconstructor';
import { Header } from './components/Header';
import { CodeViewer } from './components/CodeViewer';
import { AnimationStage } from './components/AnimationStage';
import { PlaybackControls } from './components/PlaybackControls';
import { getDSPreset, SupportedDS } from './data/dsPresets';
import { AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  // Theme state: default to 'dark'
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('codeexec_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('codeexec_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 5 Data Structures Selection State
  const [selectedDS, setSelectedDS] = useState<SupportedDS>('stack');
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(undefined);
  const [language, setLanguage] = useState<SupportedLanguage>('python');

  // Load starter preset without auto-execution
  const initialPreset = getDSPreset('stack', 'python');
  const [code, setCode] = useState<string>(initialPreset.code);
  const [rawTrace, setRawTrace] = useState<TraceStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [backendOnline, setBackendOnline] = useState<boolean>(true);
  const [executionError, setExecutionError] = useState<string | null>(null);

  // Compute reconstructed steps
  const reconstructedSteps = React.useMemo(() => {
    return reconstructTrace(rawTrace, code, language);
  }, [rawTrace, code, language]);

  const currentStep: ReconstructedStep | null =
    reconstructedSteps.length > 0 && currentStepIndex < reconstructedSteps.length
      ? reconstructedSteps[currentStepIndex]
      : null;

  // Auto-play timer
  const playTimerRef = useRef<any>(null);

  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.max(300, 1000 / playbackSpeed);
      playTimerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= reconstructedSteps.length - 1) {
            setIsPlaying(false);
            // Trigger celebration confetti on reaching the end of execution!
            confetti({
              particleCount: 55,
              spread: 75,
              origin: { y: 0.8 },
              colors: ['#ffffff', '#e4e4e7', '#a1a1aa', '#71717a', '#27272a'],
            });
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    }

    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, playbackSpeed, reconstructedSteps.length]);

  // Check backend health periodically
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language: 'python', code: 'x = 1' }),
        });
        if (res.ok) {
          setBackendOnline(true);
        }
      } catch (e) {
        try {
          const res2 = await fetch('http://localhost:8080/api/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ language: 'python', code: 'x = 1' }),
          });
          if (res2.ok) setBackendOnline(true);
        } catch (e2) {
          setBackendOnline(false);
        }
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  // Run Code Execution via Backend API (triggered only when user clicks Run & Trace)
  const runCodeExecution = async (lang: SupportedLanguage = language, srcCode: string = code) => {
    setIsLoading(true);
    setIsPlaying(false);
    setExecutionError(null);

    const payload: ExecutionRequest = {
      language: lang,
      code: srcCode,
    };

    try {
      let response: Response;
      try {
        response = await fetch('/api/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (proxyError) {
        response = await fetch('http://localhost:8080/api/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data: ExecutionResponse = await response.json();

      if (data.status === 'success' && data.trace) {
        setRawTrace(data.trace);
        setCurrentStepIndex(0);
        setExecutionError(null);
        setIsPlaying(true);
      } else if (data.status === 'error') {
        const errorMsg =
          data.error?.message ||
          data.error?.type ||
          'Code execution completed with an error or exception.';
        setExecutionError(errorMsg);
        if (data.trace && data.trace.length > 0) {
          setRawTrace(data.trace);
          setCurrentStepIndex(0);
        }
      }
    } catch (err: any) {
      setExecutionError(
        `Failed to reach backend execution server: ${err.message || 'Unknown network error'}. Make sure Docker execution-service is running on port 8080.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Data Structure Selection Change (NO auto-execution)
  const handleSelectDS = (newDS: SupportedDS) => {
    setSelectedDS(newDS);
    let defaultVar: string | undefined = undefined;
    if (newDS === 'linked-list') defaultVar = 'singly';
    else if (newDS === 'array') defaultVar = '1d';
    setSelectedVariant(defaultVar);

    const preset = getDSPreset(newDS, language, defaultVar);
    setCode(preset.code);
    // Reset trace and wait for user to click Run & Trace
    setRawTrace([]);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setExecutionError(null);
  };

  // Handle Variant Change (NO auto-execution)
  const handleSelectVariant = (newVariant: string) => {
    setSelectedVariant(newVariant);
    const preset = getDSPreset(selectedDS, language, newVariant);
    setCode(preset.code);
    setRawTrace([]);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setExecutionError(null);
  };

  // Handle Language Change (NO auto-execution)
  const handleSelectLanguage = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    const preset = getDSPreset(selectedDS, newLang, selectedVariant);
    setCode(preset.code);
    setRawTrace([]);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setExecutionError(null);
  };

  // Reset to initial step
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[var(--color-bg-base)] text-[var(--color-text-main)] font-sans transition-colors duration-200">
      {/* Top Header: Title is strictly "codeexec" only */}
      <Header
        language={language}
        setLanguage={handleSelectLanguage}
        selectedDS={selectedDS}
        setSelectedDS={handleSelectDS}
        selectedVariant={selectedVariant}
        setSelectedVariant={handleSelectVariant}
        onRunCode={() => runCodeExecution()}
        isLoading={isLoading}
        backendOnline={backendOnline}
        onReset={handleReset}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Error banner if execution failed */}
      {executionError && (
        <div className="flex items-center justify-between px-6 py-2.5 bg-zinc-200 dark:bg-zinc-900 border-b border-zinc-300 dark:border-zinc-800 text-xs font-mono text-zinc-900 dark:text-zinc-100">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-zinc-900 dark:text-zinc-100 shrink-0" />
            <span>{executionError}</span>
          </div>
          <button
            onClick={() => setExecutionError(null)}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] px-2 py-0.5 rounded hover:bg-zinc-300 dark:hover:bg-zinc-800"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Workspace Split View */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-4 gap-4">
        {/* Left: Source Code Inspector */}
        <div className="w-full md:w-5/12 h-full flex flex-col">
          <CodeViewer
            code={code}
            setCode={setCode}
            activeLine={currentStep ? currentStep.line : 1}
            language={language}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            functionName={currentStep?.functionName}
          />
        </div>

        {/* Right: Animation Stage & Visual Execution Demonstrator */}
        <div className="w-full md:w-7/12 h-full flex flex-col gap-3">
          <div className="flex-1 overflow-hidden">
            <AnimationStage
              currentStep={currentStep}
              language={language}
              selectedDS={selectedDS}
              selectedVariant={selectedVariant}
            />
          </div>

          {/* Bottom: Playback & Scrubbing Controls */}
          <div className="shrink-0">
            <PlaybackControls
              currentStepIndex={currentStepIndex}
              totalSteps={reconstructedSteps.length}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              onStepForward={() =>
                setCurrentStepIndex((prev) =>
                  Math.min(reconstructedSteps.length - 1, prev + 1)
                )
              }
              onStepBackward={() =>
                setCurrentStepIndex((prev) => Math.max(0, prev - 1))
              }
              onJumpToStart={() => setCurrentStepIndex(0)}
              onJumpToEnd={() =>
                setCurrentStepIndex(Math.max(0, reconstructedSteps.length - 1))
              }
              onSeek={(s) => setCurrentStepIndex(s)}
              playbackSpeed={playbackSpeed}
              setPlaybackSpeed={setPlaybackSpeed}
              currentStep={currentStep}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
