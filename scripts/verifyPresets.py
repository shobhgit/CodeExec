import urllib.request
import json

presets = [
  ('stack', 'python', 'stack = []\nstack.append(10)\nstack.append(20)\nstack.append(30)\ntop_elem = stack.pop()\nstack.append(40)\nprint("Popped:", top_elem)\n'),
  ('stack', 'java', 'import java.util.Stack;\npublic class Main {\n    public static void main(String[] args) {\n        Stack<Integer> st = new Stack<>();\n        st.push(10);\n        st.push(20);\n        st.push(30);\n        int top = st.pop();\n        st.push(40);\n        System.out.println("Top: " + top);\n    }\n}'),
  ('queue', 'python', 'from collections import deque\nqueue = deque()\nqueue.append(10)\nqueue.append(20)\nqueue.append(30)\nfront = queue.popleft()\nqueue.append(40)\nprint("Front:", front)\n'),
  ('queue', 'java', 'import java.util.Queue;\nimport java.util.LinkedList;\npublic class Main {\n    public static void main(String[] args) {\n        Queue<Integer> queue = new LinkedList<>();\n        queue.add(10);\n        queue.add(20);\n        queue.add(30);\n        int front = queue.poll();\n        queue.add(40);\n        System.out.println("Front: " + front);\n    }\n}'),
  ('linked-list', 'python', 'class Node:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def add_tail(self, val):\n        new_node = Node(val)\n        if not self.head:\n            self.head = new_node\n            return\n        curr = self.head\n        while curr.next:\n            curr = curr.next\n        curr.next = new_node\nlst = LinkedList()\nlst.add_tail(10)\nlst.add_tail(20)\n'),
  ('array', 'python', 'arr = [10, 25, 40, 55, 70, 85]\nleft = 0\nright = len(arr) - 1\ntarget = 95\nwhile left < right:\n    curr_sum = arr[left] + arr[right]\n    if curr_sum == target:\n        print("Found pair:", arr[left], arr[right])\n        break\n    elif curr_sum < target:\n        left += 1\n    else:\n        right -= 1\n'),
  ('tree', 'python', 'class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\ndef insert(root, val):\n    if not root:\n        return TreeNode(val)\n    if val < root.val:\n        root.left = insert(root.left, val)\n    else:\n        root.right = insert(root.right, val)\n    return root\nroot = TreeNode(4)\ninsert(root, 2)\ninsert(root, 7)\ninsert(root, 1)\ninsert(root, 3)\n')
]

for ds, lang, code in presets:
    req = urllib.request.Request('http://localhost:8080/api/execute', data=json.dumps({'language': lang, 'code': code}).encode('utf-8'), headers={'Content-Type':'application/json'})
    res = urllib.request.urlopen(req)
    data = json.loads(res.read().decode('utf-8'))
    print(f'[{ds.upper()}] ({lang}): status={data.get("status")}, steps={len(data.get("trace", []))}')
