const fs = require('fs');
const path = require('path');
const http = require('http');

const leetcodeProblems = [
  // ==========================================
  // ARRAYS & TWO POINTERS
  // ==========================================
  {
    id: 'lc-1-two-sum-py',
    name: 'LC 1: Two Sum',
    title: 'LC 1: Two Sum (Hash Map Lookup)',
    category: 'Arrays & Lists',
    language: 'python',
    code: `class Solution:
    def twoSum(self, nums, target):
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []

# Driver test
nums = [2, 7, 11, 15]
target = 9
sol = Solution()
result = sol.twoSum(nums, target)
print("Indices:", result)`
  },
  {
    id: 'lc-1-two-sum-java',
    name: 'LC 1: Two Sum (Java)',
    title: 'LC 1: Two Sum (HashMap)',
    category: 'Arrays & Lists',
    language: 'java',
    code: `import java.util.HashMap;

public class Main {
    static int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }

    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] res = twoSum(nums, target);
        System.out.println(res[0] + " " + res[1]);
    }
}`
  },
  {
    id: 'lc-26-remove-duplicates-py',
    name: 'LC 26: Remove Duplicates',
    title: 'LC 26: Remove Duplicates from Sorted Array',
    category: 'Arrays & Lists',
    language: 'python',
    code: `class Solution:
    def removeDuplicates(self, nums):
        if not nums:
            return 0
        k = 1
        for i in range(1, len(nums)):
            if nums[i] != nums[i - 1]:
                nums[k] = nums[i]
                k += 1
        return k

nums = [1, 1, 2, 2, 3]
sol = Solution()
k = sol.removeDuplicates(nums)
print("Length:", k, "Array:", nums[:k])`
  },
  {
    id: 'lc-26-remove-duplicates-java',
    name: 'LC 26: Remove Duplicates (Java)',
    title: 'LC 26: Remove Duplicates (Two Pointers)',
    category: 'Arrays & Lists',
    language: 'java',
    code: `public class Main {
    static int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int k = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[i - 1]) {
                nums[k] = nums[i];
                k++;
            }
        }
        return k;
    }

    public static void main(String[] args) {
        int[] nums = {1, 1, 2, 3, 3};
        int k = removeDuplicates(nums);
        System.out.println("Unique count: " + k);
    }
}`
  },
  {
    id: 'lc-121-stock-py',
    name: 'LC 121: Buy/Sell Stock',
    title: 'LC 121: Best Time to Buy and Sell Stock',
    category: 'Arrays & Lists',
    language: 'python',
    code: `class Solution:
    def maxProfit(self, prices):
        min_price = float('inf')
        max_profit = 0
        for price in prices:
            if price < min_price:
                min_price = price
            elif price - min_price > max_profit:
                max_profit = price - min_price
        return max_profit

prices = [7, 1, 5, 3, 6, 4]
sol = Solution()
profit = sol.maxProfit(prices)
print("Max Profit:", profit)`
  },
  {
    id: 'lc-53-max-subarray-py',
    name: 'LC 53: Maximum Subarray',
    title: 'LC 53: Maximum Subarray (Kadane)',
    category: 'Arrays & Lists',
    language: 'python',
    code: `class Solution:
    def maxSubArray(self, nums):
        curr_sum = nums[0]
        max_sum = nums[0]
        for num in nums[1:]:
            curr_sum = max(num, curr_sum + num)
            max_sum = max(max_sum, curr_sum)
        return max_sum

nums = [-2, 1, -3, 4, -1, 2, 1, -5]
sol = Solution()
result = sol.maxSubArray(nums)
print("Max Subarray Sum:", result)`
  },
  {
    id: 'lc-704-binary-search-py',
    name: 'LC 704: Binary Search',
    title: 'LC 704: Binary Search (Left, Mid, Right)',
    category: 'Arrays & Lists',
    language: 'python',
    code: `class Solution:
    def search(self, nums, target):
        left = 0
        right = len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1

nums = [-1, 0, 3, 5, 9, 12]
target = 9
sol = Solution()
idx = sol.search(nums, target)
print("Found at index:", idx)`
  },
  {
    id: 'lc-704-binary-search-java',
    name: 'LC 704: Binary Search (Java)',
    title: 'LC 704: Binary Search (Array Bounds)',
    category: 'Arrays & Lists',
    language: 'java',
    code: `public class Main {
    static int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] nums = {1, 3, 5, 7, 9, 11};
        int target = 7;
        int res = search(nums, target);
        System.out.println("Index: " + res);
    }
}`
  },

  // ==========================================
  // LINKED LISTS
  // ==========================================
  {
    id: 'lc-206-reverse-linked-list-py',
    name: 'LC 206: Reverse Linked List',
    title: 'LC 206: Reverse Linked List (Pointers)',
    category: 'Linked Lists',
    language: 'python',
    code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head):
        prev = None
        curr = head
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        return prev

# Build list: 1 -> 2 -> 3
head = ListNode(1, ListNode(2, ListNode(3)))
sol = Solution()
new_head = sol.reverseList(head)
print("Reversed head value:", new_head.val)`
  },
  {
    id: 'lc-206-reverse-linked-list-java',
    name: 'LC 206: Reverse Linked List (Java)',
    title: 'LC 206: Reverse Linked List (Pointer Reversal)',
    category: 'Linked Lists',
    language: 'java',
    code: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    static ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }

    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        ListNode rev = reverseList(head);
        System.out.println("Reversed head: " + rev.val);
    }
}`
  },
  {
    id: 'lc-21-merge-two-sorted-lists-py',
    name: 'LC 21: Merge Two Sorted Lists',
    title: 'LC 21: Merge Two Sorted Lists',
    category: 'Linked Lists',
    language: 'python',
    code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, list1, list2):
        dummy = ListNode(0)
        tail = dummy
        while list1 and list2:
            if list1.val < list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next
        tail.next = list1 if list1 else list2
        return dummy.next

l1 = ListNode(1, ListNode(3))
l2 = ListNode(2, ListNode(4))
sol = Solution()
merged = sol.mergeTwoLists(l1, l2)
print("Merged head:", merged.val)`
  },
  {
    id: 'lc-141-linked-list-cycle-py',
    name: 'LC 141: Linked List Cycle',
    title: 'LC 141: Linked List Cycle (Floyd Tortoise & Hare)',
    category: 'Linked Lists',
    language: 'python',
    code: `class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

class Solution:
    def hasCycle(self, head):
        slow = head
        fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        return False

# Build cyclic list: 1 -> 2 -> 3 -> 2
n1 = ListNode(1)
n2 = ListNode(2)
n3 = ListNode(3)
n1.next = n2
n2.next = n3
n3.next = n2 # Cycle

sol = Solution()
found = sol.hasCycle(n1)
print("Cycle detected:", found)`
  },
  {
    id: 'lc-876-middle-linked-list-py',
    name: 'LC 876: Middle of List',
    title: 'LC 876: Middle of the Linked List',
    category: 'Linked Lists',
    language: 'python',
    code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def middleNode(self, head):
        slow = head
        fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        return slow

head = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5)))))
sol = Solution()
mid = sol.middleNode(head)
print("Middle value:", mid.val)`
  },

  // ==========================================
  // STACKS & QUEUES
  // ==========================================
  {
    id: 'lc-20-valid-parentheses-py',
    name: 'LC 20: Valid Parentheses',
    title: 'LC 20: Valid Parentheses (LIFO Stack)',
    category: 'Stacks',
    language: 'python',
    code: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        for char in s:
            if char in mapping:
                top_elem = stack.pop() if stack else '#'
                if mapping[char] != top_elem:
                    return False
            else:
                stack.append(char)
        return not stack

s = "({[]})"
sol = Solution()
valid = sol.isValid(s)
print("Is valid:", valid)`
  },
  {
    id: 'lc-20-valid-parentheses-java',
    name: 'LC 20: Valid Parentheses (Java)',
    title: 'LC 20: Valid Parentheses (Stack Matching)',
    category: 'Stacks',
    language: 'java',
    code: `import java.util.Stack;

public class Main {
    static boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        String s = "{[()]}";
        boolean res = isValid(s);
        System.out.println("Valid: " + res);
    }
}`
  },
  {
    id: 'lc-155-min-stack-py',
    name: 'LC 155: Min Stack',
    title: 'LC 155: Min Stack (Two Stacks)',
    category: 'Stacks',
    language: 'python',
    code: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self) -> None:
        val = self.stack.pop()
        if val == self.min_stack[-1]:
            self.min_stack.pop()

    def getMin(self) -> int:
        return self.min_stack[-1]

ms = MinStack()
ms.push(5)
ms.push(2)
ms.push(7)
ms.push(1)
print("Min is:", ms.getMin())
ms.pop()
print("Min after pop:", ms.getMin())`
  },
  {
    id: 'lc-232-queue-using-stacks-py',
    name: 'LC 232: Queue using Stacks',
    title: 'LC 232: Implement Queue using Stacks',
    category: 'Queues',
    language: 'python',
    code: `class MyQueue:
    def __init__(self):
        self.in_stack = []
        self.out_stack = []

    def push(self, x: int) -> None:
        self.in_stack.append(x)

    def pop(self) -> int:
        self.peek()
        return self.out_stack.pop()

    def peek(self) -> int:
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack[-1]

q = MyQueue()
q.push(10)
q.push(20)
q.push(30)
print("Front:", q.pop())
print("Next front:", q.peek())`
  },
  {
    id: 'lc-622-circular-queue-py',
    name: 'LC 622: Circular Queue',
    title: 'LC 622: Design Circular Queue',
    category: 'Circular Queues',
    language: 'python',
    code: `class MyCircularQueue:
    def __init__(self, k: int):
        self.queue = [0] * k
        self.head = 0
        self.tail = 0
        self.count = 0
        self.capacity = k

    def enQueue(self, value: int) -> bool:
        if self.count == self.capacity:
            return False
        self.queue[self.tail] = value
        self.tail = (self.tail + 1) % self.capacity
        self.count += 1
        return True

    def deQueue(self) -> bool:
        if self.count == 0:
            return False
        self.head = (self.head + 1) % self.capacity
        self.count -= 1
        return True

cq = MyCircularQueue(3)
cq.enQueue(1)
cq.enQueue(2)
cq.enQueue(3)
cq.deQueue()
cq.enQueue(4)
print("Queue count:", cq.count, "Head:", cq.head, "Tail:", cq.tail)`
  },
  {
    id: 'lc-622-circular-queue-java',
    name: 'LC 622: Circular Queue (Java)',
    title: 'LC 622: Design Circular Queue (Modulo Index)',
    category: 'Circular Queues',
    language: 'java',
    code: `public class Main {
    static class MyCircularQueue {
        int[] data;
        int head = 0;
        int tail = 0;
        int count = 0;
        int capacity;

        public MyCircularQueue(int k) {
            capacity = k;
            data = new int[k];
        }

        public boolean enQueue(int value) {
            if (count == capacity) return false;
            data[tail] = value;
            tail = (tail + 1) % capacity;
            count++;
            return true;
        }

        public boolean deQueue() {
            if (count == 0) return false;
            head = (head + 1) % capacity;
            count--;
            return true;
        }
    }

    public static void main(String[] args) {
        MyCircularQueue cq = new MyCircularQueue(4);
        cq.enQueue(10);
        cq.enQueue(20);
        cq.enQueue(30);
        cq.deQueue();
        cq.enQueue(40);
        System.out.println("Enqueued count: " + cq.count);
    }
}`
  },

  // ==========================================
  // BINARY TREES & BST
  // ==========================================
  {
    id: 'lc-226-invert-binary-tree-py',
    name: 'LC 226: Invert Tree',
    title: 'LC 226: Invert Binary Tree',
    category: 'Trees & BST',
    language: 'python',
    code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def invertTree(self, root):
        if not root:
            return None
        root.left, root.right = root.right, root.left
        self.invertTree(root.left)
        self.invertTree(root.right)
        return root

# Build tree:
#     4
#    / \\
#   2   7
root = TreeNode(4, TreeNode(2), TreeNode(7))
sol = Solution()
inverted = sol.invertTree(root)
print("Inverted root left:", inverted.left.val, "right:", inverted.right.val)`
  },
  {
    id: 'lc-226-invert-binary-tree-java',
    name: 'LC 226: Invert Binary Tree (Java)',
    title: 'LC 226: Invert Binary Tree (Left/Right Swap)',
    category: 'Trees & BST',
    language: 'java',
    code: `public class Main {
    static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int val) { this.val = val; }
    }

    static TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        invertTree(root.left);
        invertTree(root.right);
        return root;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(4);
        root.left = new TreeNode(2);
        root.right = new TreeNode(7);
        TreeNode res = invertTree(root);
        System.out.println("Root left: " + res.left.val + ", right: " + res.right.val);
    }
}`
  },
  {
    id: 'lc-104-max-depth-tree-py',
    name: 'LC 104: Max Depth Tree',
    title: 'LC 104: Maximum Depth of Binary Tree',
    category: 'Trees & BST',
    language: 'python',
    code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxDepth(self, root):
        if not root:
            return 0
        left_d = self.maxDepth(root.left)
        right_d = self.maxDepth(root.right)
        return max(left_d, right_d) + 1

root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
sol = Solution()
depth = sol.maxDepth(root)
print("Tree Depth:", depth)`
  },
  {
    id: 'lc-700-search-bst-py',
    name: 'LC 700: Search in BST',
    title: 'LC 700: Search in a Binary Search Tree',
    category: 'Trees & BST',
    language: 'python',
    code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def searchBST(self, root, val):
        curr = root
        while curr:
            if curr.val == val:
                return curr
            elif val < curr.val:
                curr = curr.left
            else:
                curr = curr.right
        return None

# BST: 4 -> L:2, R:7
root = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(7))
sol = Solution()
found = sol.searchBST(root, 2)
print("Found node val:", found.val if found else "None")`
  },
  {
    id: 'lc-701-insert-bst-py',
    name: 'LC 701: Insert into BST',
    title: 'LC 701: Insert into a Binary Search Tree',
    category: 'Trees & BST',
    language: 'python',
    code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def insertIntoBST(self, root, val):
        if not root:
            return TreeNode(val)
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
        return root

root = TreeNode(4, TreeNode(2), TreeNode(7))
sol = Solution()
sol.insertIntoBST(root, 5)
print("Inserted 5 into BST. Root.right.left is:", root.right.left.val)`
  },
  {
    id: 'lc-94-inorder-traversal-py',
    name: 'LC 94: Inorder Traversal',
    title: 'LC 94: Binary Tree Inorder Traversal',
    category: 'Trees & BST',
    language: 'python',
    code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def inorderTraversal(self, root):
        result = []
        def dfs(node):
            if not node:
                return
            dfs(node.left)
            result.append(node.val)
            dfs(node.right)
        dfs(root)
        return result

root = TreeNode(2, TreeNode(1), TreeNode(3))
sol = Solution()
vals = sol.inorderTraversal(root)
print("Inorder values:", vals)`
  },

  // ==========================================
  // HEAPS & PRIORITY QUEUES
  // ==========================================
  {
    id: 'lc-1046-last-stone-weight-py',
    name: 'LC 1046: Last Stone Weight',
    title: 'LC 1046: Last Stone Weight (Heap Simulation)',
    category: 'Heaps',
    language: 'python',
    code: `import heapq

class Solution:
    def lastStoneWeight(self, stones):
        # Python heapq is min-heap, so negate for max-heap
        max_heap = [-s for s in stones]
        heapq.heapify(max_heap)

        while len(max_heap) > 1:
            first = -heapq.heappop(max_heap)
            second = -heapq.heappop(max_heap)
            if first != second:
                heapq.heappush(max_heap, -(first - second))

        return -max_heap[0] if max_heap else 0

stones = [2, 7, 4, 1, 8, 1]
sol = Solution()
remaining = sol.lastStoneWeight(stones)
print("Remaining stone:", remaining)`
  },
  {
    id: 'lc-215-kth-largest-java',
    name: 'LC 215: Kth Largest (Java)',
    title: 'LC 215: Kth Largest Element (PriorityQueue)',
    category: 'Heaps',
    language: 'java',
    code: `import java.util.PriorityQueue;

public class Main {
    static int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : nums) {
            minHeap.add(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        return minHeap.peek();
    }

    public static void main(String[] args) {
        int[] nums = {3, 2, 1, 5, 6, 4};
        int k = 2;
        int res = findKthLargest(nums, k);
        System.out.println("2nd Largest: " + res);
    }
}`
  },

  // ==========================================
  // HASH MAPS & SETS
  // ==========================================
  {
    id: 'lc-217-contains-duplicate-py',
    name: 'LC 217: Contains Duplicate',
    title: 'LC 217: Contains Duplicate (Set Membership)',
    category: 'Sets & Tuples',
    language: 'python',
    code: `class Solution:
    def containsDuplicate(self, nums):
        seen = set()
        for num in nums:
            if num in seen:
                return True
            seen.add(num)
        return False

nums = [1, 2, 3, 1]
sol = Solution()
has_dup = sol.containsDuplicate(nums)
print("Has duplicate:", has_dup)`
  },
  {
    id: 'lc-217-contains-duplicate-java',
    name: 'LC 217: Contains Duplicate (Java)',
    title: 'LC 217: Contains Duplicate (HashSet)',
    category: 'Sets & Tuples',
    language: 'java',
    code: `import java.util.HashSet;

public class Main {
    static boolean containsDuplicate(int[] nums) {
        HashSet<Integer> set = new HashSet<>();
        for (int num : nums) {
            if (set.contains(num)) return true;
            set.add(num);
        }
        return false;
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 2};
        boolean dup = containsDuplicate(nums);
        System.out.println("Contains duplicate: " + dup);
    }
}`
  },
  {
    id: 'lc-242-valid-anagram-py',
    name: 'LC 242: Valid Anagram',
    title: 'LC 242: Valid Anagram (Frequency Map)',
    category: 'Hash Maps & Dicts',
    language: 'python',
    code: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        count = {}
        for char in s:
            count[char] = count.get(char, 0) + 1
        for char in t:
            if char not in count or count[char] == 0:
                return False
            count[char] -= 1
        return True

s = "anagram"
t = "nagaram"
sol = Solution()
print("Is anagram:", sol.isAnagram(s, t))`
  },
  {
    id: 'lc-349-intersection-arrays-py',
    name: 'LC 349: Intersection of Arrays',
    title: 'LC 349: Intersection of Two Arrays',
    category: 'Sets & Tuples',
    language: 'python',
    code: `class Solution:
    def intersection(self, nums1, nums2):
        set1 = set(nums1)
        res = []
        for n in nums2:
            if n in set1:
                res.append(n)
                set1.remove(n)
        return res

nums1 = [1, 2, 2, 1]
nums2 = [2, 2]
sol = Solution()
print("Intersection:", sol.intersection(nums1, nums2))`
  },

  // ==========================================
  // GRAPHS & CYCLES
  // ==========================================
  {
    id: 'lc-207-course-schedule-py',
    name: 'LC 207: Course Schedule',
    title: 'LC 207: Course Schedule (Directed Cycle Detection)',
    category: 'Graphs & Cycles',
    language: 'python',
    code: `class Solution:
    def canFinish(self, numCourses, prerequisites):
        adj = {i: [] for i in range(numCourses)}
        for dest, src in prerequisites:
            adj[src].append(dest)

        visited = set()
        rec_stack = set()

        def has_cycle(course):
            visited.add(course)
            rec_stack.add(course)
            for neighbor in adj[course]:
                if neighbor not in visited:
                    if has_cycle(neighbor):
                        return True
                elif neighbor in rec_stack:
                    return True
            rec_stack.remove(course)
            return False

        for c in range(numCourses):
            if c not in visited:
                if has_cycle(c):
                    return False
        return True

# 2 courses with cycle: 0 -> 1 and 1 -> 0
prereqs = [[1, 0], [0, 1]]
sol = Solution()
can_finish = sol.canFinish(2, prereqs)
print("Can finish all courses:", can_finish)`
  },
  {
    id: 'lc-841-keys-and-rooms-py',
    name: 'LC 841: Keys and Rooms',
    title: 'LC 841: Keys and Rooms (Graph Traversal)',
    category: 'Graphs & Cycles',
    language: 'python',
    code: `class Solution:
    def canVisitAllRooms(self, rooms):
        visited = set([0])
        stack = [0]
        while stack:
            room = stack.pop()
            for key in rooms[room]:
                if key not in visited:
                    visited.add(key)
                    stack.append(key)
        return len(visited) == len(rooms)

rooms = [[1], [2], [3], []]
sol = Solution()
print("Visited all rooms:", sol.canVisitAllRooms(rooms))`
  },

  // ==========================================
  // TRIES (PREFIX TREES)
  // ==========================================
  {
    id: 'lc-208-implement-trie-py',
    name: 'LC 208: Implement Trie',
    title: 'LC 208: Implement Trie (Prefix Tree)',
    category: 'Tries',
    language: 'python',
    code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                curr.children[ch] = TrieNode()
            curr = curr.children[ch]
        curr.is_end = True

    def search(self, word: str) -> bool:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                return False
            curr = curr.children[ch]
        return curr.is_end

trie = Trie()
trie.insert("apple")
print("Search apple:", trie.search("apple"))
print("Search app:", trie.search("app"))`
  },
  {
    id: 'lc-208-implement-trie-java',
    name: 'LC 208: Implement Trie (Java)',
    title: 'LC 208: Implement Trie (Node Links)',
    category: 'Tries',
    language: 'java',
    code: `public class Main {
    static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEndOfWord = false;
    }

    static class Trie {
        TrieNode root = new TrieNode();

        public void insert(String word) {
            TrieNode curr = root;
            for (char c : word.toCharArray()) {
                int idx = c - 'a';
                if (curr.children[idx] == null) {
                    curr.children[idx] = new TrieNode();
                }
                curr = curr.children[idx];
            }
            curr.isEndOfWord = true;
        }

        public boolean search(String word) {
            TrieNode curr = root;
            for (char c : word.toCharArray()) {
                int idx = c - 'a';
                if (curr.children[idx] == null) return false;
                curr = curr.children[idx];
            }
            return curr.isEndOfWord;
        }
    }

    public static void main(String[] args) {
        Trie trie = new Trie();
        trie.insert("cat");
        trie.insert("car");
        System.out.println("Has cat: " + trie.search("cat"));
    }
}`
  },

  // ==========================================
  // UNION-FIND (DISJOINT SET UNION)
  // ==========================================
  {
    id: 'lc-547-provinces-py',
    name: 'LC 547: Number of Provinces',
    title: 'LC 547: Number of Provinces (Union-Find / DSU)',
    category: 'Union-Find',
    language: 'python',
    code: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.count = n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x != root_y:
            self.parent[root_x] = root_y
            self.count -= 1

isConnected = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1]
]
n = len(isConnected)
uf = UnionFind(n)
for i in range(n):
    for j in range(i + 1, n):
        if isConnected[i][j] == 1:
            uf.union(i, j)

print("Number of provinces:", uf.count)`
  },
  {
    id: 'lc-684-redundant-connection-py',
    name: 'LC 684: Redundant Connection',
    title: 'LC 684: Redundant Connection (Cycle with DSU)',
    category: 'Union-Find',
    language: 'python',
    code: `class Solution:
    def findRedundantConnection(self, edges):
        parent = list(range(len(edges) + 1))

        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        for u, v in edges:
            root_u = find(u)
            root_v = find(v)
            if root_u == root_v:
                return [u, v]
            parent[root_u] = root_v
        return []

edges = [[1, 2], [1, 3], [2, 3]]
sol = Solution()
print("Redundant edge:", sol.findRedundantConnection(edges))`
  },

  // ==========================================
  // RECURSION & DYNAMIC PROGRAMMING
  // ==========================================
  {
    id: 'lc-70-climbing-stairs-py',
    name: 'LC 70: Climbing Stairs',
    title: 'LC 70: Climbing Stairs (Recursion & Memo)',
    category: 'Recursion',
    language: 'python',
    code: `class Solution:
    def climbStairs(self, n: int) -> int:
        memo = {}
        def helper(i):
            if i > n:
                return 0
            if i == n:
                return 1
            if i in memo:
                return memo[i]
            memo[i] = helper(i + 1) + helper(i + 2)
            return memo[i]
        return helper(0)

sol = Solution()
ways = sol.climbStairs(4)
print("Ways to climb 4 steps:", ways)`
  },
  {
    id: 'lc-509-fibonacci-py',
    name: 'LC 509: Fibonacci Number',
    title: 'LC 509: Fibonacci Number (Call Stack Cascade)',
    category: 'Recursion',
    language: 'python',
    code: `class Solution:
    def fib(self, n: int) -> int:
        if n <= 1:
            return n
        return self.fib(n - 1) + self.fib(n - 2)

sol = Solution()
result = sol.fib(4)
print("Fib(4) =", result)`
  },
  {
    id: 'lc-509-fibonacci-java',
    name: 'LC 509: Fibonacci Number (Java)',
    title: 'LC 509: Fibonacci Number (Stack Frames)',
    category: 'Recursion',
    language: 'java',
    code: `public class Main {
    static int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }

    public static void main(String[] args) {
        int n = 4;
        int res = fib(n);
        System.out.println("Fib(4): " + res);
    }
}`
  }
];

// Function to call backend /api/execute
function executeCode(language, code) {
  return new Promise((resolve, reject) => {
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
            reject(new Error('Invalid JSON: ' + body));
          }
        });
      }
    );
    req.on('error', reject);
    req.setTimeout(25000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log(`Starting LeetCode test catalog generation (${leetcodeProblems.length} problems)...`);
  const finalized = [];

  for (let i = 0; i < leetcodeProblems.length; i++) {
    const p = leetcodeProblems[i];
    process.stdout.write(`[${i + 1}/${leetcodeProblems.length}] Testing ${p.name} (${p.language})... `);
    try {
      const response = await executeCode(p.language, p.code);
      if (response.status === 'success') {
        const traceLen = response.trace ? response.trace.length : 0;
        console.log(`SUCCESS (${traceLen} trace steps, stdout: ${JSON.stringify(response.stdout?.trim())})`);
        finalized.push({
          ...p,
          cachedResponse: response,
        });
      } else {
        console.log('ERROR response:', response.error);
        finalized.push({
          ...p,
          cachedResponse: response,
        });
      }
    } catch (err) {
      console.log('REQUEST FAILED:', err.message);
      finalized.push({ ...p });
    }
  }

  const outDir = path.resolve(__dirname, '../frontend/src/data');
  const tsContent = `import { PresetItem } from '../types/tracer';\n\nexport const CATALOG_PRESETS: PresetItem[] = ${JSON.stringify(
    finalized,
    null,
    2
  )};\n`;
  fs.writeFileSync(path.join(outDir, 'catalogPresets.ts'), tsContent, 'utf8');
  console.log(`Successfully wrote ${finalized.length} runnable LeetCode presets to catalogPresets.ts!`);
}

run();
