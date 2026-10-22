const fs = require('fs');
const path = require('path');
const http = require('http');

// Helper to make API call
function executeCode(language, code) {
  return new Promise((resolve) => {
    const payload = JSON.stringify({ language, code });
    const req = http.request(
      {
        hostname: 'localhost',
        port: 8080,
        path: '/api/execute',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            resolve({ status: 'error', error: { message: body } });
          }
        });
      }
    );
    req.on('error', (err) => resolve({ status: 'error', error: { message: err.message } }));
    req.setTimeout(12000, () => {
      req.destroy();
      resolve({ status: 'error', error: { message: 'Timed out (12s)' } });
    });
    req.write(payload);
    req.end();
  });
}

const leetcodePresets = [
  // --- ARRAYS & TWO POINTERS ---
  {
    id: 'lc-1-two-sum-py',
    name: 'LC 1: Two Sum (Python)',
    title: 'LC 1: Two Sum (Hash Map Lookup)',
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

print("Two Sum Indices:", result)`
  },
  {
    id: 'lc-1-two-sum-java',
    name: 'LC 1: Two Sum (Java)',
    title: 'LC 1: Two Sum (HashMap)',
    category: 'Arrays & Lists',
    language: 'java',
    code: `import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        HashMap<Integer, Integer> map = new HashMap<>();
        int[] result = new int[2];

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                result[0] = map.get(complement);
                result[1] = i;
                break;
            }
            map.put(nums[i], i);
        }
        System.out.println("Indices: [" + result[0] + ", " + result[1] + "]");
    }
}`
  },
  {
    id: 'lc-26-remove-duplicates-py',
    name: 'LC 26: Remove Duplicates (Python)',
    title: 'LC 26: Remove Duplicates (Two Pointers)',
    category: 'Arrays & Lists',
    language: 'python',
    code: `nums = [1, 1, 2, 2, 3]
k = 1
for i in range(1, len(nums)):
    if nums[i] != nums[i - 1]:
        nums[k] = nums[i]
        k += 1

print("Unique count:", k, "Array:", nums[:k])`
  },
  {
    id: 'lc-26-remove-duplicates-java',
    name: 'LC 26: Remove Duplicates (Java)',
    title: 'LC 26: Remove Duplicates (In-Place Array)',
    category: 'Arrays & Lists',
    language: 'java',
    code: `public class Main {
    public static void main(String[] args) {
        int[] nums = {1, 1, 2, 3, 3};
        int k = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[i - 1]) {
                nums[k] = nums[i];
                k++;
            }
        }
        System.out.println("Unique count: " + k);
    }
}`
  },
  {
    id: 'lc-121-stock-py',
    name: 'LC 121: Best Time to Buy/Sell Stock (Python)',
    title: 'LC 121: Buy/Sell Stock (Single Pass)',
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

print("Max Profit:", max_profit)`
  },
  {
    id: 'lc-53-max-subarray-py',
    name: 'LC 53: Maximum Subarray (Python)',
    title: 'LC 53: Maximum Subarray (Kadane)',
    category: 'Arrays & Lists',
    language: 'python',
    code: `nums = [-2, 1, -3, 4, -1, 2, 1, -5]
curr_sum = nums[0]
max_sum = nums[0]

for num in nums[1:]:
    curr_sum = max(num, curr_sum + num)
    max_sum = max(max_sum, curr_sum)

print("Max Subarray Sum:", max_sum)`
  },
  {
    id: 'lc-704-binary-search-py',
    name: 'LC 704: Binary Search (Python)',
    title: 'LC 704: Binary Search (Left, Mid, Right)',
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

print("Target found at index:", found_idx)`
  },
  {
    id: 'lc-704-binary-search-java',
    name: 'LC 704: Binary Search (Java)',
    title: 'LC 704: Binary Search (Interval Bisecting)',
    category: 'Arrays & Lists',
    language: 'java',
    code: `public class Main {
    public static void main(String[] args) {
        int[] nums = {1, 3, 5, 7, 9, 11};
        int target = 7;
        int left = 0;
        int right = nums.length - 1;
        int found = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                found = mid;
                break;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        System.out.println("Found at index: " + found);
    }
}`
  },

  // --- LINKED LISTS ---
  {
    id: 'lc-206-reverse-linked-list-py',
    name: 'LC 206: Reverse Linked List (Python)',
    title: 'LC 206: Reverse Linked List (Pointer Reversal)',
    category: 'Linked Lists',
    language: 'python',
    code: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

# Build 1 -> 2 -> 3
a = Node(1)
b = Node(2)
c = Node(3)
a.next = b
b.next = c

prev = None
curr = a
while curr:
    nxt = curr.next
    curr.next = prev
    prev = curr
    curr = nxt

print("Reversed list head:", prev.val)`
  },
  {
    id: 'lc-206-reverse-linked-list-java',
    name: 'LC 206: Reverse Linked List (Java)',
    title: 'LC 206: Reverse Linked List (In-Place Links)',
    category: 'Linked Lists',
    language: 'java',
    code: `public class Main {
    static class Node {
        int val;
        Node next;
        Node(int val) { this.val = val; }
    }

    public static void main(String[] args) {
        Node a = new Node(1);
        Node b = new Node(2);
        Node c = new Node(3);
        a.next = b;
        b.next = c;

        Node prev = null;
        Node curr = a;
        while (curr != null) {
            Node nxt = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nxt;
        }

        System.out.println("Reversed head: " + prev.val);
    }
}`
  },
  {
    id: 'lc-21-merge-sorted-lists-py',
    name: 'LC 21: Merge Two Sorted Lists (Python)',
    title: 'LC 21: Merge Two Sorted Lists (Splice)',
    category: 'Linked Lists',
    language: 'python',
    code: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

# List 1: 1 -> 3
l1 = Node(1)
l1.next = Node(3)

# List 2: 2 -> 4
l2 = Node(2)
l2.next = Node(4)

dummy = Node(0)
tail = dummy

p1 = l1
p2 = l2
while p1 and p2:
    if p1.val <= p2.val:
        tail.next = p1
        p1 = p1.next
    else:
        tail.next = p2
        p2 = p2.next
    tail = tail.next

tail.next = p1 if p1 else p2
print("Merged head:", dummy.next.val, "second:", dummy.next.next.val)`
  },
  {
    id: 'lc-141-linked-list-cycle-py',
    name: 'LC 141: Linked List Cycle (Python)',
    title: 'LC 141: Linked List Cycle (Floyd Fast/Slow)',
    category: 'Linked Lists',
    language: 'python',
    code: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

n1 = Node(1)
n2 = Node(2)
n3 = Node(3)
n1.next = n2
n2.next = n3
n3.next = n2 # Cycle back to n2

slow = n1
fast = n1
has_cycle = False

while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow == fast:
        has_cycle = True
        break

print("Cycle found:", has_cycle)`
  },
  {
    id: 'lc-doubly-linked-list-java',
    name: 'Doubly Linked List (Java)',
    title: 'Doubly Linked List (Bidirectional Nodes)',
    category: 'Linked Lists',
    language: 'java',
    code: `public class Main {
    static class Node {
        int val;
        Node prev;
        Node next;
        Node(int val) { this.val = val; }
    }

    public static void main(String[] args) {
        Node n1 = new Node(10);
        Node n2 = new Node(20);
        Node n3 = new Node(30);

        n1.next = n2;
        n2.prev = n1;
        n2.next = n3;
        n3.prev = n2;

        System.out.println("Forward: " + n1.val + " -> " + n1.next.val);
        System.out.println("Backward: " + n3.val + " -> " + n3.prev.val);
    }
}`
  },

  // --- STACKS & QUEUES ---
  {
    id: 'lc-20-valid-parentheses-py',
    name: 'LC 20: Valid Parentheses (Python)',
    title: 'LC 20: Valid Parentheses (LIFO Stack)',
    category: 'Stacks',
    language: 'python',
    code: `s = "{[()]}"
stack = []
pairs = {')': '(', '}': '{', ']': '['}
valid = True

for char in s:
    if char in '({[':
        stack.append(char)
    elif char in pairs:
        if not stack or stack[-1] != pairs[char]:
            valid = False
            break
        stack.pop()

valid = valid and len(stack) == 0
print("Is valid expression:", valid)`
  },
  {
    id: 'lc-20-valid-parentheses-java',
    name: 'LC 20: Valid Parentheses (Java)',
    title: 'LC 20: Valid Parentheses (Stack Bracket Match)',
    category: 'Stacks',
    language: 'java',
    code: `import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        String s = "{[()]}";
        Stack<Character> stack = new Stack<>();
        boolean valid = true;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) {
                valid = false;
                break;
            }
        }
        valid = valid && stack.isEmpty();
        System.out.println("Valid: " + valid);
    }
}`
  },
  {
    id: 'lc-155-min-stack-py',
    name: 'LC 155: Min Stack (Python)',
    title: 'LC 155: Min Stack (Value & Minimum Stacks)',
    category: 'Stacks',
    language: 'python',
    code: `stack = []
min_stack = []

def push(val):
    stack.append(val)
    if not min_stack or val <= min_stack[-1]:
        min_stack.append(val)

def pop():
    val = stack.pop()
    if val == min_stack[-1]:
        min_stack.pop()
    return val

push(5)
push(2)
push(8)
push(1)
print("Current min:", min_stack[-1])
pop()
print("Min after pop:", min_stack[-1])`
  },
  {
    id: 'lc-232-queue-using-stacks-py',
    name: 'LC 232: Queue using Stacks (Python)',
    title: 'LC 232: Implement Queue using Stacks',
    category: 'Queues',
    language: 'python',
    code: `in_stack = []
out_stack = []

def enqueue(x):
    in_stack.append(x)

def dequeue():
    if not out_stack:
        while in_stack:
            out_stack.append(in_stack.pop())
    return out_stack.pop()

enqueue(10)
enqueue(20)
enqueue(30)
val1 = dequeue()
val2 = dequeue()
print("Dequeued values:", val1, val2)`
  },
  {
    id: 'lc-622-circular-queue-py',
    name: 'LC 622: Circular Queue (Python)',
    title: 'LC 622: Design Circular Queue (Ring Buffer)',
    category: 'Circular Queues',
    language: 'python',
    code: `capacity = 4
queue = [0] * capacity
head = 0
tail = 0
count = 0

def enqueue(val):
    global tail, count
    if count == capacity:
        return False
    queue[tail] = val
    tail = (tail + 1) % capacity
    count += 1
    return True

def dequeue():
    global head, count
    if count == 0:
        return None
    val = queue[head]
    head = (head + 1) % capacity
    count -= 1
    return val

enqueue(10)
enqueue(20)
enqueue(30)
dequeue()
enqueue(40)
enqueue(50)
print("Ring buffer items:", queue, "Head:", head, "Tail:", tail)`
  },
  {
    id: 'lc-622-circular-queue-java',
    name: 'LC 622: Circular Queue (Java)',
    title: 'LC 622: Design Circular Queue (Array Modulo)',
    category: 'Circular Queues',
    language: 'java',
    code: `public class Main {
    public static void main(String[] args) {
        int capacity = 4;
        int[] queue = new int[capacity];
        int head = 0;
        int tail = 0;
        int count = 0;

        // Enqueue 10, 20, 30
        queue[tail] = 10; tail = (tail + 1) % capacity; count++;
        queue[tail] = 20; tail = (tail + 1) % capacity; count++;
        queue[tail] = 30; tail = (tail + 1) % capacity; count++;

        // Dequeue
        head = (head + 1) % capacity; count--;

        // Enqueue 40 (wraparound)
        queue[tail] = 40; tail = (tail + 1) % capacity; count++;

        System.out.println("Count: " + count + " Head: " + head + " Tail: " + tail);
    }
}`
  },

  // --- TREES & BINARY SEARCH TREES ---
  {
    id: 'lc-226-invert-binary-tree-py',
    name: 'LC 226: Invert Binary Tree (Python)',
    title: 'LC 226: Invert Binary Tree (Mirror Swap)',
    category: 'Trees & BST',
    language: 'python',
    code: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

# Build tree:
#     4
#    / \\
#   2   7
root = TreeNode(4)
root.left = TreeNode(2)
root.right = TreeNode(7)

def invert(node):
    if not node:
        return None
    node.left, node.right = node.right, node.left
    invert(node.left)
    invert(node.right)
    return node

invert(root)
print("Inverted root left:", root.left.val, "right:", root.right.val)`
  },
  {
    id: 'lc-226-invert-binary-tree-java',
    name: 'LC 226: Invert Binary Tree (Java)',
    title: 'LC 226: Invert Binary Tree (Child Swap)',
    category: 'Trees & BST',
    language: 'java',
    code: `public class Main {
    static class Node {
        int val;
        Node left;
        Node right;
        Node(int val) { this.val = val; }
    }

    public static void main(String[] args) {
        Node root = new Node(4);
        root.left = new Node(2);
        root.right = new Node(7);

        Node tmp = root.left;
        root.left = root.right;
        root.right = tmp;

        System.out.println("Root left: " + root.left.val + ", right: " + root.right.val);
    }
}`
  },
  {
    id: 'lc-700-search-bst-py',
    name: 'LC 700: Search in BST (Python)',
    title: 'LC 700: Search in a Binary Search Tree',
    category: 'Trees & BST',
    language: 'python',
    code: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

root = TreeNode(4)
root.left = TreeNode(2)
root.right = TreeNode(7)
root.left.left = TreeNode(1)
root.left.right = TreeNode(3)

target = 2
curr = root
found = None

while curr:
    if curr.val == target:
        found = curr
        break
    elif target < curr.val:
        curr = curr.left
    else:
        curr = curr.right

print("Found node val:", found.val if found else "None")`
  },
  {
    id: 'lc-701-insert-bst-py',
    name: 'LC 701: Insert into BST (Python)',
    title: 'LC 701: Insert into a Binary Search Tree',
    category: 'Trees & BST',
    language: 'python',
    code: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

root = TreeNode(4)
root.left = TreeNode(2)
root.right = TreeNode(7)

val = 5
curr = root
while True:
    if val < curr.val:
        if not curr.left:
            curr.left = TreeNode(val)
            break
        curr = curr.left
    else:
        if not curr.right:
            curr.right = TreeNode(val)
            break
        curr = curr.right

print("Inserted 5. Root.right.left is:", root.right.left.val)`
  },

  // --- HEAPS & PRIORITY QUEUES ---
  {
    id: 'lc-1046-last-stone-weight-py',
    name: 'LC 1046: Last Stone Weight (Python)',
    title: 'LC 1046: Last Stone Weight (Heap Simulation)',
    category: 'Heaps',
    language: 'python',
    code: `import heapq

stones = [2, 7, 4, 1, 8, 1]
max_heap = [-s for s in stones]
heapq.heapify(max_heap)

while len(max_heap) > 1:
    s1 = -heapq.heappop(max_heap)
    s2 = -heapq.heappop(max_heap)
    if s1 != s2:
        heapq.heappush(max_heap, -(s1 - s2))

remaining = -max_heap[0] if max_heap else 0
print("Remaining stone:", remaining)`
  },
  {
    id: 'lc-215-kth-largest-java',
    name: 'LC 215: Kth Largest Element (Java)',
    title: 'LC 215: Kth Largest Element (PriorityQueue)',
    category: 'Heaps',
    language: 'java',
    code: `import java.util.PriorityQueue;

public class Main {
    public static void main(String[] args) {
        int[] nums = {3, 2, 1, 5, 6, 4};
        int k = 2;
        PriorityQueue<Integer> pq = new PriorityQueue<>();

        for (int num : nums) {
            pq.add(num);
            if (pq.size() > k) {
                pq.poll();
            }
        }
        System.out.println("2nd largest: " + pq.peek());
    }
}`
  },

  // --- HASH MAPS & SETS ---
  {
    id: 'lc-217-contains-duplicate-py',
    name: 'LC 217: Contains Duplicate (Python)',
    title: 'LC 217: Contains Duplicate (Set Membership)',
    category: 'Sets & Tuples',
    language: 'python',
    code: `nums = [1, 2, 3, 1]
seen = set()
has_duplicate = False

for n in nums:
    if n in seen:
        has_duplicate = True
        break
    seen.add(n)

print("Contains duplicate:", has_duplicate)`
  },
  {
    id: 'lc-217-contains-duplicate-java',
    name: 'LC 217: Contains Duplicate (Java)',
    title: 'LC 217: Contains Duplicate (HashSet)',
    category: 'Sets & Tuples',
    language: 'java',
    code: `import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 2};
        HashSet<Integer> seen = new HashSet<>();
        boolean hasDuplicate = false;

        for (int n : nums) {
            if (seen.contains(n)) {
                hasDuplicate = true;
                break;
            }
            seen.add(n);
        }
        System.out.println("Duplicate found: " + hasDuplicate);
    }
}`
  },
  {
    id: 'lc-242-valid-anagram-py',
    name: 'LC 242: Valid Anagram (Python)',
    title: 'LC 242: Valid Anagram (Frequency Dictionary)',
    category: 'Hash Maps & Dicts',
    language: 'python',
    code: `s = "anagram"
t = "nagaram"
counts = {}

for ch in s:
    counts[ch] = counts.get(ch, 0) + 1

for ch in t:
    if ch in counts:
        counts[ch] -= 1

is_anagram = all(v == 0 for v in counts.values())
print("Is anagram:", is_anagram)`
  },

  // --- GRAPHS & CYCLES ---
  {
    id: 'lc-207-course-schedule-py',
    name: 'LC 207: Course Schedule (Python)',
    title: 'LC 207: Course Schedule (Cycle Detection in Graph)',
    category: 'Graphs & Cycles',
    language: 'python',
    code: `numCourses = 3
prerequisites = [[1, 0], [2, 1], [0, 2]] # Cycle: 0 -> 1 -> 2 -> 0

adj = {i: [] for i in range(numCourses)}
for dest, src in prerequisites:
    adj[src].append(dest)

visited = set()
rec_stack = set()
has_cycle = False

def dfs(node):
    global has_cycle
    visited.add(node)
    rec_stack.add(node)
    for neighbor in adj[node]:
        if neighbor in rec_stack:
            has_cycle = True
            return
        if neighbor not in visited:
            dfs(neighbor)
    rec_stack.remove(node)

for c in range(numCourses):
    if c not in visited:
        dfs(c)

print("Graph has cycle (deadlock):", has_cycle)`
  },
  {
    id: 'lc-graph-cycle-minimal-java',
    name: 'Graph Cycle (Java)',
    title: 'Directed Graph Cycle (Adjacency References)',
    category: 'Graphs & Cycles',
    language: 'java',
    code: `public class Main {
    static class Node {
        int id;
        Node next;
        Node(int id) { this.id = id; }
    }

    public static void main(String[] args) {
        Node n1 = new Node(1);
        Node n2 = new Node(2);
        Node n3 = new Node(3);

        n1.next = n2;
        n2.next = n3;
        n3.next = n1; // Directed cycle

        System.out.println("Cycle established: " + n1.id + " -> " + n1.next.id + " -> " + n1.next.next.id + " -> " + n1.next.next.next.id);
    }
}`
  },

  // --- TRIES (PREFIX TREES) ---
  {
    id: 'lc-208-implement-trie-py',
    name: 'LC 208: Implement Trie (Python)',
    title: 'LC 208: Implement Trie (Prefix Search Tree)',
    category: 'Tries',
    language: 'python',
    code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

root = TrieNode()

def insert(word):
    curr = root
    for ch in word:
        if ch not in curr.children:
            curr.children[ch] = TrieNode()
        curr = curr.children[ch]
    curr.is_end = True

def search(word):
    curr = root
    for ch in word:
        if ch not in curr.children:
            return False
        curr = curr.children[ch]
    return curr.is_end

insert("apple")
insert("app")
print("Search apple:", search("apple"))
print("Search app:", search("app"))`
  },

  // --- UNION-FIND / DSU ---
  {
    id: 'lc-547-provinces-py',
    name: 'LC 547: Number of Provinces (Python)',
    title: 'LC 547: Number of Provinces (Union-Find / DSU)',
    category: 'Union-Find',
    language: 'python',
    code: `n = 4
parent = list(range(n))
count = n

def find(x):
    while parent[x] != x:
        x = parent[x]
    return x

def union(x, y):
    global count
    rx = find(x)
    ry = find(y)
    if rx != ry:
        parent[rx] = ry
        count -= 1

# Connect 0-1 and 2-3
union(0, 1)
union(2, 3)

print("Provinces count:", count, "Parent array:", parent)`
  },

  // --- RECURSION ---
  {
    id: 'lc-70-climbing-stairs-py',
    name: 'LC 70: Climbing Stairs (Python)',
    title: 'LC 70: Climbing Stairs (Memoized Recursion)',
    category: 'Recursion',
    language: 'python',
    code: `memo = {}

def climb(n):
    if n <= 1:
        return 1
    if n in memo:
        return memo[n]
    memo[n] = climb(n - 1) + climb(n - 2)
    return memo[n]

ways = climb(5)
print("Ways to climb 5 steps:", ways)`
  },
  {
    id: 'lc-509-fibonacci-java',
    name: 'LC 509: Fibonacci Number (Java)',
    title: 'LC 509: Fibonacci Number (Call Stack Cascade)',
    category: 'Recursion',
    language: 'java',
    code: `public class Main {
    static int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }

    public static void main(String[] args) {
        int result = fib(4);
        System.out.println("Fib(4) result: " + result);
    }
}`
  }
];

async function main() {
  console.log('Testing ' + leetcodePresets.length + ' curated LeetCode problems against backend...');
  const finalized = [];

  for (let i = 0; i < leetcodePresets.length; i++) {
    const item = leetcodePresets[i];
    process.stdout.write('[' + (i + 1) + '/' + leetcodePresets.length + '] ' + item.name + '... ');
    const resp = await executeCode(item.language, item.code);
    if (resp.status === 'success') {
      const traceLen = resp.trace ? resp.trace.length : 0;
      console.log('SUCCESS (' + traceLen + ' steps)');
      finalized.push(Object.assign({}, item, { cachedResponse: resp }));
    } else {
      console.log('API status:', resp.status);
      finalized.push(Object.assign({}, item, { cachedResponse: resp }));
    }
  }

  const outPath = path.resolve(__dirname, '../frontend/src/data/catalogPresets.ts');
  const ts = 'import { PresetItem } from \'../types/tracer\';\n\nexport const CATALOG_PRESETS: PresetItem[] = ' + JSON.stringify(finalized, null, 2) + ';\n';
  fs.writeFileSync(outPath, ts, 'utf8');
  console.log('Finished writing ' + finalized.length + ' presets to ' + outPath);
}

main();
