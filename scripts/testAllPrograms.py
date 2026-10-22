import urllib.request
import json

programs = [
    {
        "name": "Singly Linked List (Java)",
        "language": "java",
        "code": """class Node {
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
}"""
    },
    {
        "name": "Singly Linked List (Python)",
        "language": "python",
        "code": """class Node:
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
"""
    },
    {
        "name": "Doubly Linked List (Java)",
        "language": "java",
        "code": """class Node {
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
}"""
    },
    {
        "name": "Doubly Linked List (Python)",
        "language": "python",
        "code": """class Node:
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
"""
    },
    {
        "name": "LIFO Stack (Java)",
        "language": "java",
        "code": """import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Stack<Integer> st = new Stack<>();
        st.push(10);
        st.push(20);
        st.push(30);
        int top = st.pop();
        st.push(40);
        System.out.println("Top: " + top);
    }
}"""
    },
    {
        "name": "LIFO Stack (Python)",
        "language": "python",
        "code": """stack = []
stack.append(10)
stack.append(20)
stack.append(30)
top_elem = stack.pop()
stack.append(40)
print("Popped:", top_elem)
"""
    },
    {
        "name": "FIFO Queue (Java)",
        "language": "java",
        "code": """import java.util.Queue;
import java.util.LinkedList;

public class Main {
    public static void main(String[] args) {
        Queue<Integer> queue = new LinkedList<>();
        queue.add(10);
        queue.add(20);
        queue.add(30);
        int front = queue.poll();
        queue.add(40);
        System.out.println("Front: " + front);
    }
}"""
    },
    {
        "name": "FIFO Queue (Python)",
        "language": "python",
        "code": """from collections import deque

queue = deque()
queue.append(10)
queue.append(20)
queue.append(30)
front = queue.popleft()
queue.append(40)
print("Front:", front)
"""
    },
    {
        "name": "Circular Queue (Java)",
        "language": "java",
        "code": """class CircularQueue {
    int[] queue;
    int front = 0;
    int rear = 0;
    int size = 0;
    int capacity;

    CircularQueue(int k) {
        capacity = k;
        queue = new int[k];
    }

    boolean enQueue(int value) {
        if (size == capacity) return false;
        queue[rear] = value;
        rear = (rear + 1) % capacity;
        size++;
        return true;
    }

    boolean deQueue() {
        if (size == 0) return false;
        front = (front + 1) % capacity;
        size--;
        return true;
    }
}

public class Main {
    public static void main(String[] args) {
        CircularQueue cq = new CircularQueue(4);
        cq.enQueue(10);
        cq.enQueue(20);
        cq.enQueue(30);
        cq.deQueue();
        cq.enQueue(40);
    }
}"""
    },
    {
        "name": "Circular Queue (Python)",
        "language": "python",
        "code": """class CircularQueue:
    def __init__(self, k: int):
        self.capacity = k
        self.queue = [None] * k
        self.front = 0
        self.rear = 0
        self.size = 0

    def enqueue(self, val: int) -> bool:
        if self.size == self.capacity:
            return False
        self.queue[self.rear] = val
        self.rear = (self.rear + 1) % self.capacity
        self.size += 1
        return True

    def dequeue(self) -> bool:
        if self.size == 0:
            return False
        self.queue[self.front] = None
        self.front = (self.front + 1) % self.capacity
        self.size -= 1
        return True

cq = CircularQueue(4)
cq.enqueue(10)
cq.enqueue(20)
cq.enqueue(30)
cq.dequeue()
cq.enqueue(40)
"""
    },
    {
        "name": "Binary Search Tree (Java)",
        "language": "java",
        "code": """class TreeNode {
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
}"""
    },
    {
        "name": "Binary Search Tree (Python)",
        "language": "python",
        "code": """class TreeNode:
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
"""
    },
    {
        "name": "Binary Heap (Java)",
        "language": "java",
        "code": """import java.util.PriorityQueue;

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.add(45);
        pq.add(10);
        pq.add(30);
        pq.add(5);
        int min = pq.poll();
        pq.add(15);
        System.out.println("Min: " + min);
    }
}"""
    },
    {
        "name": "Binary Heap (Python)",
        "language": "python",
        "code": """import heapq

pq = []
heapq.heappush(pq, 45)
heapq.heappush(pq, 10)
heapq.heappush(pq, 30)
heapq.heappush(pq, 5)
min1 = heapq.heappop(pq)
heapq.heappush(pq, 15)
print("Min:", min1)
"""
    },
    {
        "name": "Hash Map (Java)",
        "language": "java",
        "code": """import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("apple", 3);
        map.put("banana", 5);
        map.put("cherry", 8);
        map.put("apple", 4);
        int apples = map.get("apple");
        map.remove("cherry");
        System.out.println("Apples: " + apples);
    }
}"""
    },
    {
        "name": "Hash Map (Python)",
        "language": "python",
        "code": """counts = {}
words = ["apple", "banana", "apple", "cherry", "banana"]
for w in words:
    counts[w] = counts.get(w, 0) + 1
print("Counts:", counts)
"""
    },
    {
        "name": "Set (Java)",
        "language": "java",
        "code": """import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        HashSet<Integer> set = new HashSet<>();
        set.add(10);
        set.add(20);
        set.add(10);
        set.add(30);
        boolean has20 = set.contains(20);
        set.remove(10);
        System.out.println("Has 20: " + has20);
    }
}"""
    },
    {
        "name": "Set (Python)",
        "language": "python",
        "code": """seen = set()
nums = [4, 2, 7, 2, 8, 4]
for num in nums:
    seen.add(num)
seen.discard(2)
print("Unique:", seen)
"""
    },
    {
        "name": "2D Matrix (Java)",
        "language": "java",
        "code": """public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        int sum = 0;
        for (int r = 0; r < 3; r++) {
            sum += matrix[r][r];
        }
        System.out.println("Diag sum: " + sum);
    }
}"""
    },
    {
        "name": "2D Matrix (Python)",
        "language": "python",
        "code": """matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
diag_sum = 0
for i in range(len(matrix)):
    diag_sum += matrix[i][i]
print("Diag sum:", diag_sum)
"""
    },
    {
        "name": "Union-Find (Java)",
        "language": "java",
        "code": """class UnionFind {
    int[] parent;
    UnionFind(int n) {
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    void union(int x, int y) {
        int rx = find(x);
        int ry = find(y);
        if (rx != ry) parent[rx] = ry;
    }
}

public class Main {
    public static void main(String[] args) {
        UnionFind uf = new UnionFind(4);
        uf.union(0, 1);
        uf.union(1, 2);
        boolean conn = uf.find(0) == uf.find(2);
        System.out.println("Connected: " + conn);
    }
}"""
    },
    {
        "name": "Union-Find (Python)",
        "language": "python",
        "code": """class UnionFind:
    def __init__(self, n):
        self.parent = [i for i in range(n)]

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx != ry:
            self.parent[rx] = ry

uf = UnionFind(4)
uf.union(0, 1)
uf.union(1, 2)
conn = (uf.find(0) == uf.find(2))
print("Connected:", conn)
"""
    },
    {
        "name": "Recursion (Java)",
        "language": "java",
        "code": """public class Main {
    static int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }
    public static void main(String[] args) {
        int res = fib(3);
        System.out.println("Fib: " + res);
    }
}"""
    },
    {
        "name": "Recursion (Python)",
        "language": "python",
        "code": """def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

res = fib(3)
print("Fib:", res)
"""
    }
]

print(f"Testing {len(programs)} code examples against http://localhost:8080/api/execute ...")
passed = 0
failed = 0

for p in programs:
    payload = json.dumps({"language": p["language"], "code": p["code"]}).encode("utf-8")
    req = urllib.request.Request(
        "http://localhost:8080/api/execute",
        data=payload,
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data.get("status") == "success" and data.get("trace") and len(data["trace"]) > 0:
                print(f"  [PASS] {p['name']} ({len(data['trace'])} trace steps)")
                passed += 1
            else:
                print(f"  [FAIL] {p['name']}: {data.get('error') or data.get('status')}")
                failed += 1
    except Exception as e:
        print(f"  [ERROR] {p['name']}: {e}")
        failed += 1

print(f"\nResults: {passed} PASSED, {failed} FAILED out of {len(programs)} total.")
