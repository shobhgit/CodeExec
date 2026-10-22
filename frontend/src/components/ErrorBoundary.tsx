import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CodeExec ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    localStorage.removeItem('codeexec_theme');
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-black text-zinc-100 p-6 font-mono">
          <div className="max-w-md w-full p-6 rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl flex flex-col items-center text-center">
            <AlertCircle className="w-12 h-12 text-zinc-100 mb-4" />
            <h2 className="text-xl font-bold text-zinc-100 mb-2">CodeExec Encountered an Error</h2>
            <p className="text-xs text-zinc-400 mb-4">
              {this.state.error?.message || 'A client-side runtime exception occurred.'}
            </p>
            <button
              onClick={this.handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-zinc-950 font-bold text-sm shadow-md hover:bg-zinc-200 active:scale-95 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
