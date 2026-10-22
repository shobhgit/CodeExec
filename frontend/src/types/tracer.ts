export type SupportedLanguage = 'python' | 'java' | 'javascript' | string;

export interface ExecutionRequest {
  language: SupportedLanguage;
  code: string;
}

export interface VariableRef {
  ref: number | string;
}

export type VariableValue = string | number | boolean | null | undefined | VariableRef | any;

export interface HeapObject {
  object: string;
  type?: 'object' | 'array' | 'list' | 'dict' | 'set' | 'tuple' | string;
  class?: string;
  fields?: Record<string, any>;
  changes?: Record<string, any>;
  items?: any[];
  entries?: Array<{ key: any; value: any }>;
  value?: any;
  [key: string]: any;
}

export interface TraceStep {
  event: 'line' | 'call' | 'return' | 'exception' | 'uncaught_exception' | 'instruction_limit_reached' | string;
  line: number;
  function?: string;
  variables?: Record<string, VariableValue>;
  heap?: HeapObject[];
  stdout?: string;
  exception_msg?: string;
  [key: string]: any;
}

export interface ExecutionResponse {
  status: 'success' | 'error';
  stdout?: string | null;
  trace?: TraceStep[] | null;
  error?: {
    type?: string;
    message?: string;
    [key: string]: any;
  } | null;
}

export interface PresetItem {
  id: string;
  name: string;
  title: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard' | string;
  category: string;
  language: SupportedLanguage;
  code: string;
  cachedResponse?: ExecutionResponse;
}

export type DataStructureType =
  | 'tree'
  | 'linked-list'
  | 'doubly-linked-list'
  | 'stack'
  | 'queue'
  | 'circular-queue'
  | 'heap'
  | 'hash-map'
  | 'set'
  | 'array'
  | 'matrix'
  | 'graph'
  | 'trie'
  | 'union-find'
  | 'recursion'
  | 'generic';

export interface ReconstructedStep {
  stepIndex: number;
  totalSteps: number;
  event: string;
  line: number;
  functionName: string;
  variables: Record<string, VariableValue>;
  heapMap: Map<string, HeapObject>;
  accumulatedStdout: string;
  changedVariables: string[];
  changedHeapObjects: string[];
  detectedDataStructure: DataStructureType;
  callStack: Array<{ function: string; line: number }>;
}
