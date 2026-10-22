import { SupportedLanguage } from '../types/tracer';

export type SupportedDS = 'stack' | 'queue' | 'linked-list' | 'array' | 'tree';

export interface DSPreset {
  id: string;
  ds: SupportedDS;
  variant?: string; // e.g. 'singly' | 'doubly' or '1d' | '2d'
  title: string;
  language: SupportedLanguage;
  code: string;
}

export const DS_DEFINITIONS: Array<{
  id: SupportedDS;
  label: string;
  iconName: string;
  description: string;
  variants?: Array<{ id: string; label: string }>;
}> = [
  {
    id: 'stack',
    label: 'Stack',
    iconName: 'Layers',
    description: 'LIFO Stack without Predefined Collections',
  },
  {
    id: 'queue',
    label: 'Queue',
    iconName: 'ArrowRightLeft',
    description: 'FIFO Queue without Predefined Collections',
  },
  {
    id: 'linked-list',
    label: 'Linked List',
    iconName: 'Network',
    description: 'Singly and Doubly Linked Chains',
    variants: [
      { id: 'singly', label: 'Singly' },
      { id: 'doubly', label: 'Doubly' },
    ],
  },
  {
    id: 'array',
    label: 'Array',
    iconName: 'LayoutGrid',
    description: 'Contiguous 1D Arrays & 2D Matrices',
    variants: [
      { id: '1d', label: '1D Array' },
      { id: '2d', label: '2D Matrix' },
    ],
  },
  {
    id: 'tree',
    label: 'Tree',
    iconName: 'GitFork',
    description: 'Binary Tree & BST Node Hierarchy',
  },
];

export const DS_PRESETS: DSPreset[] = [
  // ------------------- 1. STACK (CUSTOM WITHOUT PREDEFINED COLLECTIONS) -------------------
  {
    id: 'stack-java',
    ds: 'stack',
    title: 'Custom Stack (Java)',
    language: 'java',
    code: `class Stack {
    int[] items = new int[10];
    int top = -1;

    void push(int val) {
        items[++top] = val;
    }

    int pop() {
        return items[top--];
    }

    int peek() {
        return items[top];
    }

    boolean isEmpty() {
        return top == -1;
    }
}

public class Main {
    public static void main(String[] args) {
        Stack st = new Stack();
        st.push(10);
        st.push(20);
        st.push(30);
        int topVal = st.pop();
        st.push(40);
        System.out.println("Top: " + topVal);
    }
}`,
  },
  {
    id: 'stack-py',
    ds: 'stack',
    title: 'Custom Stack (Python)',
    language: 'python',
    code: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, val):
        self.items.append(val)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()

    def peek(self):
        if not self.is_empty():
            return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

st = Stack()
st.push(10)
st.push(20)
st.push(30)
top_elem = st.pop()
st.push(40)
print("Popped:", top_elem)
`,
  },

  // ------------------- 2. QUEUE (CUSTOM WITHOUT PREDEFINED COLLECTIONS) -------------------
  {
    id: 'queue-java',
    ds: 'queue',
    title: 'Custom Queue (Java)',
    language: 'java',
    code: `class Queue {
    int[] items = new int[10];
    int front = 0;
    int rear = 0;
    int size = 0;

    void enqueue(int val) {
        items[rear++] = val;
        size++;
    }

    int dequeue() {
        if (size == 0) return -1;
        int val = items[front++];
        size--;
        return val;
    }

    int peek() {
        return items[front];
    }

    boolean isEmpty() {
        return size == 0;
    }
}

public class Main {
    public static void main(String[] args) {
        Queue q = new Queue();
        q.enqueue(10);
        q.enqueue(20);
        q.enqueue(30);
        int front = q.dequeue();
        q.enqueue(40);
        System.out.println("Front: " + front);
    }
}`,
  },
  {
    id: 'queue-py',
    ds: 'queue',
    title: 'Custom Queue (Python)',
    language: 'python',
    code: `class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, val):
        self.items.append(val)

    def dequeue(self):
        if not self.is_empty():
            return self.items.pop(0)

    def peek(self):
        if not self.is_empty():
            return self.items[0]

    def is_empty(self):
        return len(self.items) == 0

q = Queue()
q.enqueue(10)
q.enqueue(20)
q.enqueue(30)
front = q.dequeue()
q.enqueue(40)
print("Front:", front)
`,
  },

  // ------------------- 3. LINKED LIST (SINGLY & DOUBLY) -------------------
  {
    id: 'll-singly-java',
    ds: 'linked-list',
    variant: 'singly',
    title: 'Singly Linked List (Java)',
    language: 'java',
    code: `class Node {
    int val;
    Node next;
    Node(int val) { this.val = val; }
}

public class Main {
    Node head;

    void addTail(int val) {
        Node newNode = new Node(val);
        if (head == null) {
            head = newNode;
            return;
        }
        Node temp = head;
        while (temp.next != null) {
            temp = temp.next;
        }
        temp.next = newNode;
    }

    void addHead(int val) {
        Node newNode = new Node(val);
        newNode.next = head;
        head = newNode;
    }

    public static void main(String[] args) {
        Main list = new Main();
        list.addTail(10);
        list.addTail(20);
        list.addHead(5);
        list.addTail(30);
    }
}`,
  },
  {
    id: 'll-singly-py',
    ds: 'linked-list',
    variant: 'singly',
    title: 'Singly Linked List (Python)',
    language: 'python',
    code: `class Node:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None

    def add_tail(self, val):
        new_node = Node(val)
        if not self.head:
            self.head = new_node
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = new_node

    def add_head(self, val):
        new_node = Node(val, self.head)
        self.head = new_node

lst = LinkedList()
lst.add_tail(10)
lst.add_tail(20)
lst.add_head(5)
lst.add_tail(30)
`,
  },
  {
    id: 'll-doubly-java',
    ds: 'linked-list',
    variant: 'doubly',
    title: 'Doubly Linked List (Java)',
    language: 'java',
    code: `class Node {
    int val;
    Node prev;
    Node next;
    Node(int val) { this.val = val; }
}

public class Main {
    public static void main(String[] args) {
        Node head = new Node(10);
        Node n2 = new Node(20);
        Node n3 = new Node(30);

        head.next = n2;
        n2.prev = head;

        n2.next = n3;
        n3.prev = n2;

        Node curr = head;
        while (curr != null) {
            curr = curr.next;
        }
    }
}`,
  },
  {
    id: 'll-doubly-py',
    ds: 'linked-list',
    variant: 'doubly',
    title: 'Doubly Linked List (Python)',
    language: 'python',
    code: `class Node:
    def __init__(self, val=0):
        self.val = val
        self.prev = None
        self.next = None

n1 = Node(10)
n2 = Node(20)
n3 = Node(30)

n1.next = n2
n2.prev = n1

n2.next = n3
n3.prev = n2

curr = n1
while curr:
    curr = curr.next
`,
  },

  // ------------------- 4. ARRAY & MATRIX -------------------
  {
    id: 'array-1d-java',
    ds: 'array',
    variant: '1d',
    title: '1D Array Two Pointers (Java)',
    language: 'java',
    code: `public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 25, 40, 55, 70, 85};
        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            int currentSum = arr[left] + arr[right];
            if (currentSum == 95) {
                System.out.println("Pair found: " + arr[left] + ", " + arr[right]);
                break;
            } else if (currentSum < 95) {
                left++;
            } else {
                right--;
            }
        }
    }
}`,
  },
  {
    id: 'array-1d-py',
    ds: 'array',
    variant: '1d',
    title: '1D Array Two Pointers (Python)',
    language: 'python',
    code: `arr = [10, 25, 40, 55, 70, 85]
left = 0
right = len(arr) - 1
target = 95

while left < right:
    curr_sum = arr[left] + arr[right]
    if curr_sum == target:
        print("Found pair:", arr[left], arr[right])
        break
    elif curr_sum < target:
        left += 1
    else:
        right -= 1
`,
  },
  {
    id: 'array-2d-java',
    ds: 'array',
    variant: '2d',
    title: '2D Matrix (Java)',
    language: 'java',
    code: `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        int diagSum = 0;
        for (int r = 0; r < 3; r++) {
            diagSum += matrix[r][r];
        }
        System.out.println("Diag sum: " + diagSum);
    }
}`,
  },
  {
    id: 'array-2d-py',
    ds: 'array',
    variant: '2d',
    title: '2D Matrix (Python)',
    language: 'python',
    code: `matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
diag_sum = 0
for i in range(len(matrix)):
    diag_sum += matrix[i][i]
print("Diag sum:", diag_sum)
`,
  },

  // ------------------- 5. BINARY TREE -------------------
  {
    id: 'tree-java',
    ds: 'tree',
    title: 'Binary Search Tree (Java)',
    language: 'java',
    code: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

public class Main {
    static TreeNode insert(TreeNode root, int val) {
        if (root == null) return new TreeNode(val);
        if (val < root.val) root.left = insert(root.left, val);
        else root.right = insert(root.right, val);
        return root;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(4);
        insert(root, 2);
        insert(root, 7);
        insert(root, 1);
        insert(root, 3);
    }
}`,
  },
  {
    id: 'tree-py',
    ds: 'tree',
    title: 'Binary Search Tree (Python)',
    language: 'python',
    code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def insert(root, val):
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root

root = TreeNode(4)
insert(root, 2)
insert(root, 7)
insert(root, 1)
insert(root, 3)
`,
  },
];

export function getDSPreset(
  ds: SupportedDS,
  language: SupportedLanguage,
  variant?: string
): DSPreset {
  const match = DS_PRESETS.find(
    (p) =>
      p.ds === ds &&
      p.language === language &&
      (!variant || p.variant === variant)
  );
  if (match) return match;

  const fallbackLang = DS_PRESETS.find(
    (p) => p.ds === ds && (!variant || p.variant === variant)
  );
  if (fallbackLang) return fallbackLang;

  return DS_PRESETS[0];
}
