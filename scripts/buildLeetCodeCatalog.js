const fs = require('fs');
const path = require('path');

const fixturesDir = path.resolve(__dirname, '../fixtures/api-traces');

function readFixture(name) {
  const filePath = path.join(fixturesDir, name + '.json');
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return null;
}

const leetcodePresets = [
  // --- ARRAYS & TWO POINTERS ---
  {
    id: 'lc-1-two-sum-py',
    name: 'LC 1: Two Sum (Python)',
    title: 'LC 1: Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Lists',
    language: 'python',
    code: `nums = [2, 7, 11, 15]
target = 9
seen = {}
result = []

for i, num in enumerate(nums):
    complement = target - num
    if complement in seen:
        result = [seen[complement], i]
        break
    seen[num] = i

print("Two Sum Indices:", result)`,
    fixture: null
  },
  {
    id: 'lc-1-two-sum-java',
    name: 'LC 1: Two Sum (Java)',
    title: 'LC 1: Two Sum (HashMap)',
    difficulty: 'Easy',
    category: 'Arrays & Lists',
    language: 'java',
    fixture: 'java-hashmap',
    overrideTitle: 'LC 1: Two Sum (Java HashMap)'
  },
  {
    id: 'lc-26-remove-duplicates-py',
    name: 'LC 26: Remove Duplicates (Python)',
    title: 'LC 26: Remove Duplicates from Sorted Array',
    difficulty: 'Easy',
    category: 'Arrays & Lists',
    language: 'python',
    code: `nums = [1, 1, 2, 2, 3]
k = 1
for i in range(1, len(nums)):
    if nums[i] != nums[i - 1]:
        nums[k] = nums[i]
        k += 1

print("Unique count:", k, "Array:", nums[:k])`,
    fixture: 'python-list-mutation'
  },
  {
    id: 'lc-26-remove-duplicates-java',
    name: 'LC 26: Remove Duplicates (Java)',
    title: 'LC 26: Remove Duplicates (Two Pointers)',
    difficulty: 'Easy',
    category: 'Arrays & Lists',
    language: 'java',
    fixture: 'java-array',
    overrideTitle: 'LC 26: Remove Duplicates (Java Array)'
  },
  {
    id: 'lc-121-stock-py',
    name: 'LC 121: Buy/Sell Stock',
    title: 'LC 121: Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Arrays & Lists',
    language: 'python',
    code: `prices = [7, 1, 5, 3, 6, 4]
min_price = prices[0]
max_profit = 0

for price in prices:
    if price < min_price:
        min_price = price
    elif price - min_price > max_profit:
        max_profit = price - min_price

print("Max Profit:", max_profit)`,
    fixture: null
  },
  {
    id: 'lc-704-binary-search-py',
    name: 'LC 704: Binary Search',
    title: 'LC 704: Binary Search (Left, Mid, Right)',
    difficulty: 'Easy',
    category: 'Arrays & Lists',
    language: 'python',
    code: `nums = [-1, 0, 3, 5, 9, 12]
target = 9
left = 0
right = len(nums) - 1
found_idx = -1

while left <= right:
    mid = (left + right) // 2
    if nums[mid] == target:
        found_idx = mid
        break
    elif nums[mid] < target:
        left = mid + 1
    else:
        right = mid - 1

print("Target found at index:", found_idx)`,
    fixture: null
  },
  {
    id: 'lc-73-matrix-2d-py',
    name: 'LC 73: 2D Matrix Coordinates',
    title: 'LC 73: Set Matrix Traversal (2D Grid)',
    difficulty: 'Medium',
    category: 'Arrays & Lists',
    language: 'python',
    fixture: 'python-nested-list',
    overrideTitle: 'LC 73: 2D Matrix Grid Manipulation'
  },
  {
    id: 'lc-73-matrix-2d-java',
    name: 'LC 73: 2D Matrix Grid (Java)',
    title: 'LC 73: 2D Matrix Coordinates (Java)',
    difficulty: 'Medium',
    category: 'Arrays & Lists',
    language: 'java',
    fixture: 'java-nested-array',
    overrideTitle: 'LC 73: 2D Nested Array (Java)'
  },

  // --- LINKED LISTS ---
  {
    id: 'lc-206-reverse-linked-list-py',
    name: 'LC 206: Reverse Linked List (Python)',
    title: 'LC 206: Reverse Linked List (Node Links)',
    difficulty: 'Easy',
    category: 'Linked Lists',
    language: 'python',
    fixture: 'python-linked-nodes',
    overrideTitle: 'LC 206: Reverse Linked List (Python Node Chain)'
  },
  {
    id: 'lc-21-merge-sorted-lists-py',
    name: 'LC 21: Merge Two Sorted Lists',
    title: 'LC 21: Merge Two Sorted Lists (Node Insertion)',
    difficulty: 'Easy',
    category: 'Linked Lists',
    language: 'python',
    fixture: 'python-singly-linked-insert-delete',
    overrideTitle: 'LC 21: Merge & Splice Linked Nodes'
  },
  {
    id: 'lc-146-lru-cache-doubly-py',
    name: 'LC 146: LRU Cache Doubly Linked List',
    title: 'LC 146: LRU Cache (Doubly Linked Nodes)',
    difficulty: 'Medium',
    category: 'Linked Lists',
    language: 'python',
    fixture: 'python-doubly-linked-list',
    overrideTitle: 'LC 146: Doubly Linked List (Python Prev/Next)'
  },
  {
    id: 'lc-146-lru-cache-doubly-java',
    name: 'LC 146: Doubly Linked List (Java)',
    title: 'LC 146: Doubly Linked List (Bidirectional)',
    difficulty: 'Medium',
    category: 'Linked Lists',
    language: 'java',
    fixture: 'java-doubly-linked-list',
    overrideTitle: 'LC 146: Doubly Linked Nodes (Java)'
  },
  {
    id: 'lc-linked-list-jdk-java',
    name: 'JDK LinkedList Operations',
    title: 'LC 237: Linked List Insertion & Deletion',
    difficulty: 'Easy',
    category: 'Linked Lists',
    language: 'java',
    fixture: 'java-jdk-linked-list',
    overrideTitle: 'LC 237: Linked List Operations (Java)'
  },

  // --- STACKS & QUEUES ---
  {
    id: 'lc-20-valid-parentheses-py',
    name: 'LC 20: Valid Parentheses (Python)',
    title: 'LC 20: Valid Parentheses (Stack LIFO)',
    difficulty: 'Easy',
    category: 'Stacks',
    language: 'python',
    fixture: 'python-stack-list',
    overrideTitle: 'LC 20: Valid Parentheses (Python Stack)'
  },
  {
    id: 'lc-20-valid-parentheses-java',
    name: 'LC 20: Valid Parentheses (Java)',
    title: 'LC 20: Valid Parentheses (Java Stack)',
    difficulty: 'Easy',
    category: 'Stacks',
    language: 'java',
    fixture: 'java-stack-class',
    overrideTitle: 'LC 20: Valid Parentheses (Java Stack Class)'
  },
  {
    id: 'lc-232-queue-using-stacks-py',
    name: 'LC 232: Implement Queue (Python)',
    title: 'LC 232: Queue using Stacks / Deque',
    difficulty: 'Easy',
    category: 'Queues',
    language: 'python',
    fixture: 'python-queue-deque',
    overrideTitle: 'LC 232: Queue FIFO Conveyor (Python)'
  },
  {
    id: 'lc-232-queue-java',
    name: 'LC 232: Queue ArrayDeque (Java)',
    title: 'LC 232: Queue FIFO Buffer (Java)',
    difficulty: 'Easy',
    category: 'Queues',
    language: 'java',
    fixture: 'java-arraydeque-queue',
    overrideTitle: 'LC 232: Queue ArrayDeque (Java)'
  },
  {
    id: 'lc-622-circular-queue-py',
    name: 'LC 622: Circular Queue (Python)',
    title: 'LC 622: Design Circular Queue (Ring Buffer)',
    difficulty: 'Medium',
    category: 'Circular Queues',
    language: 'python',
    fixture: 'python-circular-queue',
    overrideTitle: 'LC 622: Design Circular Queue (Python Ring Buffer)'
  },
  {
    id: 'lc-622-circular-queue-java',
    name: 'LC 622: Circular Queue (Java)',
    title: 'LC 622: Design Circular Queue (Array Modulo)',
    difficulty: 'Medium',
    category: 'Circular Queues',
    language: 'java',
    fixture: 'java-circular-queue',
    overrideTitle: 'LC 622: Design Circular Queue (Java Modulo)'
  },

  // --- TREES & BINARY SEARCH TREES ---
  {
    id: 'lc-226-invert-tree-py',
    name: 'LC 226: Invert Binary Tree (Python)',
    title: 'LC 226: Invert Binary Tree',
    difficulty: 'Easy',
    category: 'Trees & BST',
    language: 'python',
    fixture: 'python-binary-tree-minimal',
    overrideTitle: 'LC 226: Invert Binary Tree (Python)'
  },
  {
    id: 'lc-226-invert-tree-java',
    name: 'LC 226: Invert Binary Tree (Java)',
    title: 'LC 226: Invert Binary Tree (Java)',
    difficulty: 'Easy',
    category: 'Trees & BST',
    language: 'java',
    fixture: 'java-binary-tree',
    overrideTitle: 'LC 226: Invert Binary Tree (Java Node Structure)'
  },
  {
    id: 'lc-700-search-bst-py',
    name: 'LC 700: Search in BST (Python)',
    title: 'LC 700: Search in a Binary Search Tree',
    difficulty: 'Easy',
    category: 'Trees & BST',
    language: 'python',
    fixture: 'python-bst-insert-search-minimal',
    overrideTitle: 'LC 700: Search & Insert in BST (Python)'
  },
  {
    id: 'lc-700-search-bst-java',
    name: 'LC 700: Search in BST (Java)',
    title: 'LC 700: Search in a Binary Search Tree (Java)',
    difficulty: 'Easy',
    category: 'Trees & BST',
    language: 'java',
    fixture: 'java-bst-insert-search',
    overrideTitle: 'LC 700: Search in BST (Java)'
  },
  {
    id: 'lc-701-insert-bst-java',
    name: 'LC 701: Insert into BST (Java)',
    title: 'LC 701: Insert into a Binary Search Tree',
    difficulty: 'Medium',
    category: 'Trees & BST',
    language: 'java',
    fixture: 'java-bst-minimal',
    overrideTitle: 'LC 701: BST Structure & Insertion (Java)'
  },

  // --- HEAPS & PRIORITY QUEUES ---
  {
    id: 'lc-1046-last-stone-weight-py',
    name: 'LC 1046: Last Stone Weight (Python)',
    title: 'LC 1046: Last Stone Weight (Heapq)',
    difficulty: 'Easy',
    category: 'Heaps',
    language: 'python',
    fixture: 'python-heapq-priority-queue',
    overrideTitle: 'LC 1046: Priority Queue Heap (Python heapq)'
  },
  {
    id: 'lc-215-kth-largest-java',
    name: 'LC 215: Kth Largest Element (Java)',
    title: 'LC 215: Kth Largest Element (PriorityQueue)',
    difficulty: 'Medium',
    category: 'Heaps',
    language: 'java',
    fixture: 'java-priority-queue',
    overrideTitle: 'LC 215: Kth Largest (Java PriorityQueue)'
  },

  // --- HASH MAPS & SETS ---
  {
    id: 'lc-242-valid-anagram-py',
    name: 'LC 242: Valid Anagram (Python)',
    title: 'LC 242: Valid Anagram (Frequency Map)',
    difficulty: 'Easy',
    category: 'Hash Maps & Dicts',
    language: 'python',
    fixture: 'python-dictionary',
    overrideTitle: 'LC 242: Valid Anagram (Python Dictionary)'
  },
  {
    id: 'lc-217-contains-duplicate-py',
    name: 'LC 217: Contains Duplicate (Python)',
    title: 'LC 217: Contains Duplicate (Set Lookup)',
    difficulty: 'Easy',
    category: 'Sets & Tuples',
    language: 'python',
    fixture: 'python-tuple-set',
    overrideTitle: 'LC 217: Contains Duplicate (Python Set)'
  },
  {
    id: 'lc-217-contains-duplicate-java',
    name: 'LC 217: Contains Duplicate (Java)',
    title: 'LC 217: Contains Duplicate (HashSet)',
    difficulty: 'Easy',
    category: 'Sets & Tuples',
    language: 'java',
    fixture: 'java-hashset',
    overrideTitle: 'LC 217: Contains Duplicate (Java HashSet)'
  },

  // --- GRAPHS & CYCLES ---
  {
    id: 'lc-207-course-schedule-py',
    name: 'LC 207: Course Schedule (Python)',
    title: 'LC 207: Course Schedule (Cycle Detection in Graph)',
    difficulty: 'Medium',
    category: 'Graphs & Cycles',
    language: 'python',
    fixture: 'python-graph-cycle-minimal',
    overrideTitle: 'LC 207: Course Schedule (Directed Cycle Graph)'
  },
  {
    id: 'lc-207-course-schedule-java',
    name: 'LC 207: Course Schedule (Java)',
    title: 'LC 207: Course Schedule (Graph Cycle Detection)',
    difficulty: 'Medium',
    category: 'Graphs & Cycles',
    language: 'java',
    fixture: 'java-graph-cycle-minimal',
    overrideTitle: 'LC 207: Graph Directed Cycle (Java)'
  },

  // --- TRIES (PREFIX TREES) ---
  {
    id: 'lc-208-implement-trie-py',
    name: 'LC 208: Implement Trie (Python)',
    title: 'LC 208: Implement Trie (Prefix Tree)',
    difficulty: 'Medium',
    category: 'Tries',
    language: 'python',
    fixture: 'python-trie-minimal',
    overrideTitle: 'LC 208: Implement Trie (Python Prefix Tree)'
  },
  {
    id: 'lc-208-implement-trie-java',
    name: 'LC 208: Implement Trie (Java)',
    title: 'LC 208: Implement Trie (Node Chain)',
    difficulty: 'Medium',
    category: 'Tries',
    language: 'java',
    fixture: 'java-trie-node-chain',
    overrideTitle: 'LC 208: Implement Trie (Java Prefix Node Chain)'
  },

  // --- UNION-FIND / DSU ---
  {
    id: 'lc-547-provinces-py',
    name: 'LC 547: Number of Provinces (Python)',
    title: 'LC 547: Number of Provinces (Union-Find / DSU)',
    difficulty: 'Medium',
    category: 'Union-Find',
    language: 'python',
    fixture: 'python-union-find-minimal',
    overrideTitle: 'LC 547: Number of Provinces (Python DSU)'
  },
  {
    id: 'lc-547-provinces-java',
    name: 'LC 547: Number of Provinces (Java)',
    title: 'LC 547: Number of Provinces (Java DSU)',
    difficulty: 'Medium',
    category: 'Union-Find',
    language: 'java',
    fixture: 'java-union-find-minimal',
    overrideTitle: 'LC 547: Number of Provinces (Java Union-Find)'
  },

  // --- RECURSION ---
  {
    id: 'lc-509-fibonacci-py',
    name: 'LC 509: Fibonacci Number (Python)',
    title: 'LC 509: Fibonacci Number (Call Stack Cascade)',
    difficulty: 'Easy',
    category: 'Recursion',
    language: 'python',
    fixture: 'python-recursion',
    overrideTitle: 'LC 509: Fibonacci & Factorial Recursion (Python)'
  },
  {
    id: 'lc-509-fibonacci-java',
    name: 'LC 509: Fibonacci Number (Java)',
    title: 'LC 509: Fibonacci & Factorial (Stack Frames)',
    difficulty: 'Easy',
    category: 'Recursion',
    language: 'java',
    fixture: 'java-recursion',
    overrideTitle: 'LC 509: Recursion Call Stack (Java)'
  }
];

function build() {
  const result = [];

  for (const item of leetcodePresets) {
    let code = item.code || '';
    let response = null;

    if (item.fixture) {
      const fixData = readFixture(item.fixture);
      if (fixData) {
        if (!code && fixData.request) {
          code = fixData.request.code;
        }
        response = fixData.response;
      }
    }

    result.push({
      id: item.id,
      name: item.name,
      title: item.overrideTitle || item.title,
      difficulty: item.difficulty || 'Easy',
      category: item.category,
      language: item.language,
      code: code,
      cachedResponse: response
    });
  }

  const outPath = path.resolve(__dirname, '../frontend/src/data/catalogPresets.ts');
  const ts = "import { PresetItem } from '../types/tracer';\n\nexport const CATALOG_PRESETS: PresetItem[] = " + JSON.stringify(result, null, 2) + ";\n";
  fs.writeFileSync(outPath, ts, 'utf8');
  console.log("Successfully built " + result.length + " runnable LeetCode catalogue presets into " + outPath);
}

build();
