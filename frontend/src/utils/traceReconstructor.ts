import {
  DataStructureType,
  HeapObject,
  ReconstructedStep,
  TraceStep,
  VariableValue,
} from '../types/tracer';

export function reconstructTrace(
  trace: TraceStep[],
  codeHint: string = '',
  languageHint: string = 'python'
): ReconstructedStep[] {
  if (!trace || trace.length === 0) {
    return [];
  }

  const result: ReconstructedStep[] = [];
  const currentHeap = new Map<string, HeapObject>();
  let currentVariables: Record<string, VariableValue> = {};
  let currentStdout = '';
  const callStack: Array<{ function: string; line: number }> = [];

  for (let stepIndex = 0; stepIndex < trace.length; stepIndex++) {
    const rawStep = trace[stepIndex];
    const prevVariables = { ...currentVariables };
    const changedVariables: string[] = [];
    const changedHeapObjects: string[] = [];

    // Track call stack
    if (rawStep.event === 'call') {
      callStack.push({
        function: rawStep.function || 'anonymous',
        line: rawStep.line,
      });
      // New frame often resets locals
      currentVariables = {};
    } else if (rawStep.event === 'return') {
      if (callStack.length > 0) {
        callStack.pop();
      }
    }

    // Merge variables
    if (rawStep.variables) {
      for (const [key, val] of Object.entries(rawStep.variables)) {
        if (JSON.stringify(prevVariables[key]) !== JSON.stringify(val)) {
          changedVariables.push(key);
        }
        currentVariables[key] = val;
      }
    }

    // Merge heap updates
    if (rawStep.heap && Array.isArray(rawStep.heap)) {
      for (const heapItem of rawStep.heap) {
        const objId = String(heapItem.object);
        changedHeapObjects.push(objId);

        if (!currentHeap.has(objId)) {
          // Deep clone to avoid mutating history
          const cloned: HeapObject = {
            object: objId,
            type: heapItem.type || 'object',
            class: heapItem.class,
            fields: heapItem.fields ? { ...heapItem.fields } : {},
            items: heapItem.items ? [...heapItem.items] : undefined,
            entries: heapItem.entries ? [...heapItem.entries] : undefined,
            value: heapItem.value,
          };
          if (heapItem.changes) {
            cloned.fields = { ...cloned.fields, ...heapItem.changes };
          }
          currentHeap.set(objId, cloned);
        } else {
          const existing = currentHeap.get(objId)!;
          const updated: HeapObject = {
            ...existing,
            fields: { ...existing.fields },
          };

          if (heapItem.type) updated.type = heapItem.type;
          if (heapItem.class) updated.class = heapItem.class;
          if (heapItem.items) updated.items = [...heapItem.items];
          if (heapItem.entries) updated.entries = [...heapItem.entries];
          if (heapItem.value !== undefined) updated.value = heapItem.value;

          if (heapItem.fields) {
            updated.fields = { ...updated.fields, ...heapItem.fields };
          }
          if (heapItem.changes) {
            updated.fields = { ...updated.fields, ...heapItem.changes };
          }

          currentHeap.set(objId, updated);
        }
      }
    }

    // Accumulate stdout
    if (rawStep.stdout) {
      if (!currentStdout.endsWith(rawStep.stdout)) {
        currentStdout += rawStep.stdout;
      }
    }

    // Snapshot heap for this step
    const heapSnapshot = new Map<string, HeapObject>();
    for (const [id, obj] of currentHeap.entries()) {
      heapSnapshot.set(id, {
        ...obj,
        fields: obj.fields ? { ...obj.fields } : undefined,
        items: obj.items ? [...obj.items] : undefined,
        entries: obj.entries ? [...obj.entries] : undefined,
      });
    }

    const detected = detectDataStructure(
      heapSnapshot,
      currentVariables,
      codeHint,
      languageHint
    );

    result.push({
      stepIndex,
      totalSteps: trace.length,
      event: rawStep.event,
      line: rawStep.line,
      functionName: rawStep.function || (callStack.length > 0 ? callStack[callStack.length - 1].function : 'main'),
      variables: { ...currentVariables },
      heapMap: heapSnapshot,
      accumulatedStdout: currentStdout,
      changedVariables,
      changedHeapObjects,
      detectedDataStructure: detected,
      callStack: [...callStack],
    });
  }

  return result;
}

export function detectDataStructure(
  heap: Map<string, HeapObject>,
  variables: Record<string, VariableValue>,
  code: string = '',
  language: string = 'python'
): DataStructureType {
  const codeLower = code.toLowerCase();

  // 1. Check for Trie
  if (
    codeLower.includes('trie') ||
    Array.from(heap.values()).some(
      (o) =>
        o.class?.toLowerCase().includes('trie') ||
        (o.fields && ('is_end' in o.fields || 'isend' in o.fields || 'isendofword' in o.fields))
    )
  ) {
    return 'trie';
  }

  // 2. Check for Union-Find
  if (
    codeLower.includes('union') ||
    codeLower.includes('find') ||
    codeLower.includes('parent') && (codeLower.includes('root') || codeLower.includes('find('))
  ) {
    return 'union-find';
  }

  // 3. Check for Binary Tree / BST
  const hasTreeNodes = Array.from(heap.values()).some((o) => {
    if (o.type === 'object') {
      const f = o.fields || {};
      return ('left' in f && 'right' in f) || ('left_child' in f && 'right_child' in f);
    }
    return false;
  });
  if (hasTreeNodes || codeLower.includes('bst') || codeLower.includes('tree')) {
    return 'tree';
  }

  // 4. Check for Circular Queue
  if (
    codeLower.includes('circular') ||
    codeLower.includes('circularqueue') ||
    Array.from(heap.values()).some((o) => o.class?.toLowerCase().includes('circularqueue'))
  ) {
    return 'circular-queue';
  }

  // 5. Check for Priority Queue / Heap
  if (
    codeLower.includes('heapq') ||
    codeLower.includes('priorityqueue') ||
    Array.from(heap.values()).some((o) => o.class?.toLowerCase().includes('priorityqueue'))
  ) {
    return 'heap';
  }

  // 6. Check for Stack
  if (
    codeLower.includes('stack') ||
    Array.from(heap.values()).some((o) => o.class?.toLowerCase().includes('stack'))
  ) {
    return 'stack';
  }

  // 7. Check for Queue / Deque
  const hasQueueObject = Array.from(heap.values()).some((o) => {
    const cls = o.class?.toLowerCase() || '';
    if (cls.includes('queue') || cls.includes('deque')) return true;
    if (
      o.fields &&
      (('front' in o.fields && 'rear' in o.fields) ||
        ('head' in o.fields && 'tail' in o.fields))
    ) {
      return true;
    }
    return false;
  });

  if (
    codeLower.includes('queue') ||
    codeLower.includes('deque') ||
    codeLower.includes('enqueue') ||
    codeLower.includes('dequeue') ||
    hasQueueObject
  ) {
    return 'queue';
  }

  // 8. Check for Doubly Linked List
  const hasDoublyNodes = Array.from(heap.values()).some((o) => {
    if (o.type === 'object' && o.fields) {
      return ('next' in o.fields && 'prev' in o.fields) || ('next' in o.fields && 'previous' in o.fields);
    }
    return false;
  });
  if (
    hasDoublyNodes ||
    codeLower.includes('doubly') ||
    Array.from(heap.values()).some((o) => o.class?.toLowerCase().includes('linkedlist'))
  ) {
    return 'doubly-linked-list';
  }

  // 9. Check for Singly Linked List
  const hasSinglyNodes = Array.from(heap.values()).some((o) => {
    if (o.type === 'object' && o.fields) {
      return 'next' in o.fields && !('left' in o.fields);
    }
    return false;
  });
  if (hasSinglyNodes || codeLower.includes('node') && codeLower.includes('next')) {
    return 'linked-list';
  }

  // 10. Check for Graph / Cycles
  if (codeLower.includes('graph') || codeLower.includes('cycle') || codeLower.includes('visited')) {
    return 'graph';
  }

  // 11. Check for Hash Map / Dictionary
  const hasDict = Array.from(heap.values()).some(
    (o) => o.type === 'dict' || o.class?.toLowerCase().includes('hashmap')
  );
  if (hasDict || codeLower.includes('hashmap') || codeLower.includes('dict')) {
    return 'hash-map';
  }

  // 12. Check for Set / HashSet
  const hasSet = Array.from(heap.values()).some(
    (o) => o.type === 'set' || o.class?.toLowerCase().includes('hashset')
  );
  if (hasSet || codeLower.includes('hashset') || codeLower.includes('set(')) {
    return 'set';
  }

  // 13. Check for 2D Matrix vs 1D Array
  const arrays = Array.from(heap.values()).filter(
    (o) => o.type === 'array' || o.type === 'list'
  );
  if (arrays.length > 0) {
    const is2D = arrays.some((o) =>
      o.items?.some((it) => it && typeof it === 'object' && 'ref' in it)
    );
    if (is2D || codeLower.includes('matrix') || codeLower.includes('nested')) {
      return 'matrix';
    }
    return 'array';
  }

  // 14. Check for Recursion
  if (codeLower.includes('def') || codeLower.includes('static')) {
    if (codeLower.includes('factorial') || codeLower.includes('fib') || codeLower.includes('recur')) {
      return 'recursion';
    }
  }

  return 'generic';
}
