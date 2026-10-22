# CodeExec API input and output catalog

This catalog pairs every stored API trace fixture with the request body to send and the response body returned by the backend. The payloads are taken from the repository fixtures in fixtures/api-traces/.

- Endpoint: POST /api/execute
- Content type: application/json
- Request fields: language, code
- Response fields: status, stdout, trace, error

## Contents

### Java cases

- [java-array](#java-array)
- [java-arraydeque-queue](#java-arraydeque-queue)
- [java-arraylist](#java-arraylist)
- [java-binary-tree](#java-binary-tree)
- [java-bst-insert-search](#java-bst-insert-search)
- [java-bst-minimal](#java-bst-minimal)
- [java-circular-queue](#java-circular-queue)
- [java-compilation-error](#java-compilation-error)
- [java-doubly-linked-list](#java-doubly-linked-list)
- [java-graph-cycle-minimal](#java-graph-cycle-minimal)
- [java-graph-cycle-shared-refs](#java-graph-cycle-shared-refs)
- [java-hashmap](#java-hashmap)
- [java-hashset](#java-hashset)
- [java-jdk-linked-list](#java-jdk-linked-list)
- [java-linked-objects](#java-linked-objects)
- [java-nested-array](#java-nested-array)
- [java-one-line-program](#java-one-line-program)
- [java-priority-queue](#java-priority-queue)
- [java-recursion](#java-recursion)
- [java-runtime-error](#java-runtime-error)
- [java-stack-class](#java-stack-class)
- [java-trie-minimal](#java-trie-minimal)
- [java-trie-node-chain](#java-trie-node-chain)
- [java-trie-prefix](#java-trie-prefix)
- [java-trie-three-letter-prefix](#java-trie-three-letter-prefix)
- [java-union-find](#java-union-find)
- [java-union-find-minimal](#java-union-find-minimal)

### Python cases

- [python-basic-arithmetic](#python-basic-arithmetic)
- [python-binary-tree](#python-binary-tree)
- [python-binary-tree-minimal](#python-binary-tree-minimal)
- [python-bst-insert-search](#python-bst-insert-search)
- [python-bst-insert-search-minimal](#python-bst-insert-search-minimal)
- [python-bst-minimal](#python-bst-minimal)
- [python-bst-structure-minimal](#python-bst-structure-minimal)
- [python-circular-queue](#python-circular-queue)
- [python-dictionary](#python-dictionary)
- [python-doubly-linked-list](#python-doubly-linked-list)
- [python-graph-cycle-minimal](#python-graph-cycle-minimal)
- [python-graph-cycle-shared-refs](#python-graph-cycle-shared-refs)
- [python-heapq-priority-queue](#python-heapq-priority-queue)
- [python-instruction-limit](#python-instruction-limit)
- [python-linked-nodes](#python-linked-nodes)
- [python-list-mutation](#python-list-mutation)
- [python-nested-list](#python-nested-list)
- [python-queue-deque](#python-queue-deque)
- [python-recursion](#python-recursion)
- [python-runtime-error](#python-runtime-error)
- [python-singly-linked-insert-delete](#python-singly-linked-insert-delete)
- [python-stack-list](#python-stack-list)
- [python-trie-minimal](#python-trie-minimal)
- [python-trie-prefix](#python-trie-prefix)
- [python-tuple-set](#python-tuple-set)
- [python-union-find](#python-union-find)
- [python-union-find-minimal](#python-union-find-minimal)

### Other API cases

- [api-unsupported-language](#api-unsupported-language)

## Coverage

| Language | Fixtures |
|---|---:|
| java | 27 |
| javascript | 1 |
| python | 27 |

| Response status | Fixtures |
|---|---:|
| error | 16 |
| success | 39 |

The collection includes arrays and nested arrays/lists, maps and dictionaries, sets, stacks, queues, linked lists and nodes, trees and BSTs, graphs and cycles, heaps and priority queues, tries, union-find, recursion, normal output, compile/runtime errors, instruction limits, and unsupported-language handling.

Fixtures with an error or timeout are included intentionally as examples of captured responses, not successful executions. Runtime-dependent timeout results can differ when Docker or execution timeout settings change.

## Java

### java-array

Source fixture: fixtures/api-traces/java-array.json

Request body

```json
{
  "code": "public class Main {\n    public static void main(String[] args) {\n        int[] values = {1, 2, 3};\n        values[1] = 9;\n        System.out.println(values[1]);\n    }\n}",
  "language": "java"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "9\n",
  "trace": [
    {
      "event": "line",
      "line": 4,
      "function": "main",
      "variables": {
        "values": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "55",
          "type": "array",
          "items": [
            1,
            2,
            3
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 5,
      "function": "main",
      "variables": {
        "values": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "55",
          "type": "array",
          "items": [
            1,
            9,
            3
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "function": "main",
      "variables": {
        "values": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "55",
          "type": "array",
          "items": [
            1,
            9,
            3
          ]
        }
      ]
    }
  ],
  "error": null
}
```

### java-arraydeque-queue

Source fixture: fixtures/api-traces/java-arraydeque-queue.json

Request body

```json
{
  "language": "java",
  "code": "import java.util.ArrayDeque;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayDeque<Integer> queue = new ArrayDeque<>();\n        queue.add(4);\n        queue.add(8);\n        int first = queue.remove();\n        System.out.println(first + queue.peek());\n    }\n}"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "12\n",
  "trace": [
    {
      "event": "line",
      "line": 5,
      "function": "main",
      "variables": {
        "queue": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "65",
          "type": "array",
          "items": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "55",
          "type": "object",
          "class": "java.util.ArrayDeque",
          "fields": {
            "elements": {
              "ref": 65
            },
            "head": 0,
            "tail": 0
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "function": "main",
      "variables": {
        "queue": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "65",
          "type": "array",
          "items": [
            {
              "ref": 66
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "55",
          "type": "object",
          "class": "java.util.ArrayDeque",
          "fields": {
            "elements": {
              "ref": 65
            },
            "head": 0,
            "tail": 1
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "function": "main",
      "variables": {
        "queue": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "65",
          "type": "array",
          "items": [
            {
              "ref": 66
            },
            {
              "ref": 67
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "55",
          "type": "object",
          "class": "java.util.ArrayDeque",
          "fields": {
            "elements": {
              "ref": 65
            },
            "head": 0,
            "tail": 2
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 8,
      "function": "main",
      "variables": {
        "queue": {
          "ref": 55
        },
        "first": 4
      },
      "heap": [
        {
          "object": "65",
          "type": "array",
          "items": [
            null,
            {
              "ref": 67
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "55",
          "type": "object",
          "class": "java.util.ArrayDeque",
          "fields": {
            "elements": {
              "ref": 65
            },
            "head": 1,
            "tail": 2
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 9,
      "function": "main",
      "variables": {
        "queue": {
          "ref": 55
        },
        "first": 4
      },
      "heap": [
        {
          "object": "65",
          "type": "array",
          "items": [
            null,
            {
              "ref": 67
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "55",
          "type": "object",
          "class": "java.util.ArrayDeque",
          "fields": {
            "elements": {
              "ref": 65
            },
            "head": 1,
            "tail": 2
          }
        }
      ]
    }
  ],
  "error": null
}
```

### java-arraylist

Source fixture: fixtures/api-traces/java-arraylist.json

Request body

```json
{
  "code": "import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> values = new ArrayList<>();\n        values.add(4);\n        values.add(7);\n        values.set(0, 9);\n        System.out.println(values.get(0) + values.get(1));\n    }\n}",
  "language": "java"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "16\n",
  "trace": [
    {
      "event": "line",
      "line": 5,
      "function": "main",
      "variables": {
        "values": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "66",
          "type": "array",
          "items": []
        },
        {
          "object": "55",
          "type": "object",
          "class": "java.util.ArrayList",
          "fields": {
            "elementData": {
              "ref": 66
            },
            "size": 0,
            "modCount": 0
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "function": "main",
      "variables": {
        "values": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "67",
          "type": "array",
          "items": [
            {
              "ref": 68
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "55",
          "type": "object",
          "class": "java.util.ArrayList",
          "fields": {
            "elementData": {
              "ref": 67
            },
            "size": 1,
            "modCount": 1
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "function": "main",
      "variables": {
        "values": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "67",
          "type": "array",
          "items": [
            {
              "ref": 68
            },
            {
              "ref": 69
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "55",
          "type": "object",
          "class": "java.util.ArrayList",
          "fields": {
            "elementData": {
              "ref": 67
            },
            "size": 2,
            "modCount": 2
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 8,
      "function": "main",
      "variables": {
        "values": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "67",
          "type": "array",
          "items": [
            {
              "ref": 70
            },
            {
              "ref": 69
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "55",
          "type": "object",
          "class": "java.util.ArrayList",
          "fields": {
            "elementData": {
              "ref": 67
            },
            "size": 2,
            "modCount": 2
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 9,
      "function": "main",
      "variables": {
        "values": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "67",
          "type": "array",
          "items": [
            {
              "ref": 70
            },
            {
              "ref": 69
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "55",
          "type": "object",
          "class": "java.util.ArrayList",
          "fields": {
            "elementData": {
              "ref": 67
            },
            "size": 2,
            "modCount": 2
          }
        }
      ]
    }
  ],
  "error": null
}
```

### java-binary-tree

Source fixture: fixtures/api-traces/java-binary-tree.json

Request body

```json
{
  "language": "java",
  "code": "public class Main {\n    static class Node {\n        int value;\n        Node left;\n        Node right;\n        Node(int value) { this.value = value; }\n    }\n    public static void main(String[] args) {\n        Node root = new Node(2);\n        root.left = new Node(1);\n        root.right = new Node(3);\n        System.out.println(root.left.value + root.value + root.right.value);\n    }\n}"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "6\n",
  "trace": [
    {
      "event": "line",
      "line": 10,
      "function": "main",
      "variables": {
        "root": {
          "ref": 56
        }
      },
      "heap": [
        {
          "object": "56",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 2,
            "left": null,
            "right": null
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 11,
      "function": "main",
      "variables": {
        "root": {
          "ref": 56
        }
      },
      "heap": [
        {
          "object": "57",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 1,
            "left": null,
            "right": null
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 2,
            "left": {
              "ref": 57
            },
            "right": null
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 12,
      "function": "main",
      "variables": {
        "root": {
          "ref": 56
        }
      },
      "heap": [
        {
          "object": "57",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 1,
            "left": null,
            "right": null
          }
        },
        {
          "object": "58",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 3,
            "left": null,
            "right": null
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 2,
            "left": {
              "ref": 57
            },
            "right": {
              "ref": 58
            }
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 13,
      "function": "main",
      "variables": {
        "root": {
          "ref": 56
        }
      },
      "heap": [
        {
          "object": "57",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 1,
            "left": null,
            "right": null
          }
        },
        {
          "object": "58",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 3,
            "left": null,
            "right": null
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 2,
            "left": {
              "ref": 57
            },
            "right": {
              "ref": 58
            }
          }
        }
      ]
    }
  ],
  "error": null
}
```

### java-bst-insert-search

Source fixture: fixtures/api-traces/java-bst-insert-search.json

Request body

```json
{
  "code": "public class Main {\n    static class Node { int value; Node left, right; Node(int value) { this.value = value; } }\n    static Node insert(Node root, int value) {\n        if (root == null) return new Node(value);\n        if (value < root.value) root.left = insert(root.left, value);\n        else root.right = insert(root.right, value);\n        return root;\n    }\n    static boolean contains(Node root, int value) {\n        while (root != null) {\n            if (root.value == value) return true;\n            root = value < root.value ? root.left : root.right;\n        }\n        return false;\n    }\n    public static void main(String[] args) {\n        Node root = null;\n        for (int value : new int[]{8, 3, 10, 6, 4}) root = insert(root, value);\n        System.out.println(contains(root, 4) + \" \" + root.left.left.value);\n    }\n}",
  "language": "java"
}
```

Backend response

```json
{
  "status": "error",
  "stdout": null,
  "trace": null,
  "error": {
    "message": "Docker execution failed: Code execution timed out after 5 seconds",
    "type": "RuntimeException"
  }
}
```

### java-bst-minimal

Source fixture: fixtures/api-traces/java-bst-minimal.json

Request body

```json
{
  "language": "java",
  "code": "public class Main {\n    static class N { int v; N l, r; N(int v) { this.v = v; } }\n    public static void main(String[] args) {\n        N root = new N(8); root.l = new N(3); root.r = new N(10);\n        int value = 4; N node = root; N parent = null;\n        while (node != null) { parent = node; node = value < node.v ? node.l : node.r; }\n        if (value < parent.v) parent.l = new N(value); else parent.r = new N(value);\n        System.out.println(parent.r.v == value);\n    }\n}"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "true\n",
  "trace": [
    {
      "event": "line",
      "line": 5,
      "function": "main",
      "variables": {
        "root": {
          "ref": 56
        }
      },
      "heap": [
        {
          "object": "57",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "v": 3,
            "l": null,
            "r": null
          }
        },
        {
          "object": "58",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "v": 10,
            "l": null,
            "r": null
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "v": 8,
            "l": {
              "ref": 57
            },
            "r": {
              "ref": 58
            }
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "function": "main",
      "variables": {
        "root": {
          "ref": 56
        },
        "value": 4,
        "node": {
          "ref": 56
        },
        "parent": null
      },
      "heap": [
        {
          "object": "57",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "v": 3,
            "l": null,
            "r": null
          }
        },
        {
          "object": "58",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "v": 10,
            "l": null,
            "r": null
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "v": 8,
            "l": {
              "ref": 57
            },
            "r": {
              "ref": 58
            }
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "function": "main",
      "variables": {
        "root": {
          "ref": 56
        },
        "value": 4,
        "node": null,
        "parent": {
          "ref": 57
        }
      },
      "heap": [
        {
          "object": "57",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "v": 3,
            "l": null,
            "r": null
          }
        },
        {
          "object": "58",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "v": 10,
            "l": null,
            "r": null
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "v": 8,
            "l": {
              "ref": 57
            },
            "r": {
              "ref": 58
            }
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 8,
      "function": "main",
      "variables": {
        "root": {
          "ref": 56
        },
        "value": 4,
        "node": null,
        "parent": {
          "ref": 57
        }
      },
      "heap": [
        {
          "object": "59",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "v": 4,
            "l": null,
            "r": null
          }
        },
        {
          "object": "57",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "v": 3,
            "l": null,
            "r": {
              "ref": 59
            }
          }
        },
        {
          "object": "58",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "v": 10,
            "l": null,
            "r": null
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "v": 8,
            "l": {
              "ref": 57
            },
            "r": {
              "ref": 58
            }
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 9,
      "function": "main",
      "variables": {
        "root": {
          "ref": 56
        },
        "value": 4,
        "node": null,
        "parent": {
          "ref": 57
        }
      },
      "heap": [
        {
          "object": "59",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "v": 4,
            "l": null,
            "r": null
          }
        },
        {
          "object": "57",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "v": 3,
            "l": null,
            "r": {
              "ref": 59
            }
          }
        },
        {
          "object": "58",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "v": 10,
            "l": null,
            "r": null
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "v": 8,
            "l": {
              "ref": 57
            },
            "r": {
              "ref": 58
            }
          }
        }
      ]
    }
  ],
  "error": null
}
```

### java-circular-queue

Source fixture: fixtures/api-traces/java-circular-queue.json

Request body

```json
{
  "code": "import java.util.Arrays;\npublic class Main {\n    static class CircularQueue {\n        int[] data = new int[3]; int front, size;\n        void add(int value) { data[(front + size) % data.length] = value; size++; }\n        int remove() { int value = data[front]; front = (front + 1) % data.length; size--; return value; }\n        public String toString() { int[] out = new int[size]; for (int i = 0; i < size; i++) out[i] = data[(front + i) % data.length]; return Arrays.toString(out); }\n    }\n    public static void main(String[] args) {\n        CircularQueue queue = new CircularQueue(); queue.add(1); queue.add(2); queue.remove(); queue.add(3);\n        System.out.println(queue + \" \" + queue.size);\n    }\n}",
  "language": "java"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "[2, 3] 2\n",
  "trace": [
    {
      "event": "line",
      "line": 11,
      "function": "main",
      "variables": {
        "queue": {
          "ref": 56
        }
      },
      "heap": [
        {
          "object": "57",
          "type": "array",
          "items": [
            1,
            2,
            3
          ]
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$CircularQueue",
          "fields": {
            "data": {
              "ref": 57
            },
            "front": 1,
            "size": 2
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 12,
      "function": "main",
      "variables": {
        "queue": {
          "ref": 56
        }
      },
      "heap": [
        {
          "object": "57",
          "type": "array",
          "items": [
            1,
            2,
            3
          ]
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$CircularQueue",
          "fields": {
            "data": {
              "ref": 57
            },
            "front": 1,
            "size": 2
          }
        }
      ]
    }
  ],
  "error": null
}
```

### java-compilation-error

Source fixture: fixtures/api-traces/java-compilation-error.json

Request body

```json
{
  "code": "public class Main { public static void main(String[] args) { int x = ; } }",
  "language": "java"
}
```

Backend response

```json
{
  "status": "error",
  "stdout": null,
  "trace": null,
  "error": {
    "type": "CompilationError",
    "message": "/code/Main.java:1: error: illegal start of expression\npublic class Main { public static void main(String[] args) { int x = ; } }\n                                                                     ^\n1 error\n"
  }
}
```

### java-doubly-linked-list

Source fixture: fixtures/api-traces/java-doubly-linked-list.json

Request body

```json
{
  "code": "public class Main {\n    static class Node { int value; Node prev, next; Node(int value) { this.value = value; } }\n    public static void main(String[] args) {\n        Node first = new Node(1), middle = new Node(2), last = new Node(3);\n        first.next = middle; middle.prev = first; middle.next = last; last.prev = middle;\n        System.out.println(first.value + \" \" + first.next.value + \" \" + last.value + \" \" + (last.prev.prev == first));\n    }\n}",
  "language": "java"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "1 2 3 true\n",
  "trace": [
    {
      "event": "line",
      "line": 5,
      "function": "main",
      "variables": {
        "first": {
          "ref": 56
        },
        "middle": {
          "ref": 57
        },
        "last": {
          "ref": 58
        }
      },
      "heap": [
        {
          "object": "56",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 1,
            "prev": null,
            "next": null
          }
        },
        {
          "object": "57",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 2,
            "prev": null,
            "next": null
          }
        },
        {
          "object": "58",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 3,
            "prev": null,
            "next": null
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "function": "main",
      "variables": {
        "first": {
          "ref": 56
        },
        "middle": {
          "ref": 57
        },
        "last": {
          "ref": 58
        }
      },
      "heap": [
        {
          "object": "58",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 3,
            "prev": {
              "ref": 57
            },
            "next": null
          }
        },
        {
          "object": "57",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 2,
            "prev": {
              "ref": 56
            },
            "next": {
              "ref": 58
            }
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 1,
            "prev": null,
            "next": {
              "ref": 57
            }
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "function": "main",
      "variables": {
        "first": {
          "ref": 56
        },
        "middle": {
          "ref": 57
        },
        "last": {
          "ref": 58
        }
      },
      "heap": [
        {
          "object": "58",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 3,
            "prev": {
              "ref": 57
            },
            "next": null
          }
        },
        {
          "object": "57",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 2,
            "prev": {
              "ref": 56
            },
            "next": {
              "ref": 58
            }
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 1,
            "prev": null,
            "next": {
              "ref": 57
            }
          }
        }
      ]
    }
  ],
  "error": null
}
```

### java-graph-cycle-minimal

Source fixture: fixtures/api-traces/java-graph-cycle-minimal.json

Request body

```json
{
  "language": "java",
  "code": "public class Main {\n    static class N { N next; }\n    public static void main(String[] args) {\n        N a = new N(), b = new N(), c = new N();\n        a.next = b; b.next = c; c.next = a;\n        System.out.println(c.next == a && a.next.next == c);\n    }\n}"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "true\n",
  "trace": [
    {
      "event": "line",
      "line": 5,
      "function": "main",
      "variables": {
        "a": {
          "ref": 56
        },
        "b": {
          "ref": 57
        },
        "c": {
          "ref": 58
        }
      },
      "heap": [
        {
          "object": "56",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "next": null
          }
        },
        {
          "object": "57",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "next": null
          }
        },
        {
          "object": "58",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "next": null
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "function": "main",
      "variables": {
        "a": {
          "ref": 56
        },
        "b": {
          "ref": 57
        },
        "c": {
          "ref": 58
        }
      },
      "heap": [
        {
          "object": "58",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "next": {
              "ref": 56
            }
          }
        },
        {
          "object": "57",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "next": {
              "ref": 58
            }
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "next": {
              "ref": 57
            }
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "function": "main",
      "variables": {
        "a": {
          "ref": 56
        },
        "b": {
          "ref": 57
        },
        "c": {
          "ref": 58
        }
      },
      "heap": [
        {
          "object": "58",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "next": {
              "ref": 56
            }
          }
        },
        {
          "object": "57",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "next": {
              "ref": 58
            }
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$N",
          "fields": {
            "next": {
              "ref": 57
            }
          }
        }
      ]
    }
  ],
  "error": null
}
```

### java-graph-cycle-shared-refs

Source fixture: fixtures/api-traces/java-graph-cycle-shared-refs.json

Request body

```json
{
  "code": "import java.util.*;\npublic class Main {\n    static class Node { String name; List<Node> neighbors = new ArrayList<>(); Node(String name) { this.name = name; } }\n    public static void main(String[] args) {\n        Node a = new Node(\"A\"), b = new Node(\"B\"), c = new Node(\"C\");\n        a.neighbors.add(b); a.neighbors.add(c); b.neighbors.add(c); c.neighbors.add(a);\n        Set<String> seen = new HashSet<>();\n        Queue<Node> queue = new ArrayDeque<>(); queue.add(a);\n        while (!queue.isEmpty()) { Node n = queue.remove(); if (seen.add(n.name)) queue.addAll(n.neighbors); }\n        System.out.println(seen.size() + \" \" + (a.neighbors.get(1) == c) + \" \" + (c.neighbors.get(0) == a));\n    }\n}",
  "language": "java"
}
```

Backend response

```json
{
  "status": "error",
  "stdout": null,
  "trace": null,
  "error": {
    "message": "Docker execution failed: Code execution timed out after 5 seconds",
    "type": "RuntimeException"
  }
}
```

### java-hashmap

Source fixture: fixtures/api-traces/java-hashmap.json

Request body

```json
{
  "code": "import java.util.HashMap;\npublic class Main {\n    public static void main(String[] args) {\n        HashMap<String, Integer> scores = new HashMap<>();\n        scores.put(\"ada\", 3);\n        scores.put(\"linus\", 4);\n        System.out.println(scores.get(\"ada\") + scores.get(\"linus\"));\n    }\n}",
  "language": "java"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "7\n",
  "trace": [
    {
      "event": "line",
      "line": 5,
      "function": "main",
      "variables": {
        "scores": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "55",
          "type": "object",
          "class": "java.util.HashMap",
          "fields": {
            "table": null,
            "entrySet": null,
            "size": 0,
            "modCount": 0,
            "threshold": 0,
            "loadFactor": 0.75,
            "keySet": null,
            "values": null
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "function": "main",
      "variables": {
        "scores": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "61",
          "type": "array",
          "items": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
              "ref": 62
            }
          ]
        },
        {
          "object": "55",
          "type": "object",
          "class": "java.util.HashMap",
          "fields": {
            "table": {
              "ref": 61
            },
            "entrySet": null,
            "size": 1,
            "modCount": 1,
            "threshold": 12,
            "loadFactor": 0.75,
            "keySet": null,
            "values": null
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "function": "main",
      "variables": {
        "scores": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "61",
          "type": "array",
          "items": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
              "ref": 63
            },
            null,
            null,
            {
              "ref": 62
            }
          ]
        },
        {
          "object": "55",
          "type": "object",
          "class": "java.util.HashMap",
          "fields": {
            "table": {
              "ref": 61
            },
            "entrySet": null,
            "size": 2,
            "modCount": 2,
            "threshold": 12,
            "loadFactor": 0.75,
            "keySet": null,
            "values": null
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 8,
      "function": "main",
      "variables": {
        "scores": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "61",
          "type": "array",
          "items": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
              "ref": 63
            },
            null,
            null,
            {
              "ref": 62
            }
          ]
        },
        {
          "object": "55",
          "type": "object",
          "class": "java.util.HashMap",
          "fields": {
            "table": {
              "ref": 61
            },
            "entrySet": null,
            "size": 2,
            "modCount": 2,
            "threshold": 12,
            "loadFactor": 0.75,
            "keySet": null,
            "values": null
          }
        }
      ]
    }
  ],
  "error": null
}
```

### java-hashset

Source fixture: fixtures/api-traces/java-hashset.json

Request body

```json
{
  "code": "import java.util.HashSet;\npublic class Main {\n    public static void main(String[] args) {\n        HashSet<Integer> values = new HashSet<>();\n        values.add(2);\n        values.add(5);\n        System.out.println(values.size());\n    }\n}",
  "language": "java"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "2\n",
  "trace": [
    {
      "event": "line",
      "line": 5,
      "function": "main",
      "variables": {
        "values": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "64",
          "type": "object",
          "class": "java.util.HashMap",
          "fields": {
            "table": null,
            "entrySet": null,
            "size": 0,
            "modCount": 0,
            "threshold": 0,
            "loadFactor": 0.75,
            "keySet": null,
            "values": null
          }
        },
        {
          "object": "55",
          "type": "object",
          "class": "java.util.HashSet",
          "fields": {
            "map": {
              "ref": 64
            }
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "function": "main",
      "variables": {
        "values": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "68",
          "type": "array",
          "items": [
            null,
            null,
            {
              "ref": 69
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "64",
          "type": "object",
          "class": "java.util.HashMap",
          "fields": {
            "table": {
              "ref": 68
            },
            "entrySet": null,
            "size": 1,
            "modCount": 1,
            "threshold": 12,
            "loadFactor": 0.75,
            "keySet": null,
            "values": null
          }
        },
        {
          "object": "55",
          "type": "object",
          "class": "java.util.HashSet",
          "fields": {
            "map": {
              "ref": 64
            }
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "function": "main",
      "variables": {
        "values": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "68",
          "type": "array",
          "items": [
            null,
            null,
            {
              "ref": 69
            },
            null,
            null,
            {
              "ref": 70
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "64",
          "type": "object",
          "class": "java.util.HashMap",
          "fields": {
            "table": {
              "ref": 68
            },
            "entrySet": null,
            "size": 2,
            "modCount": 2,
            "threshold": 12,
            "loadFactor": 0.75,
            "keySet": null,
            "values": null
          }
        },
        {
          "object": "55",
          "type": "object",
          "class": "java.util.HashSet",
          "fields": {
            "map": {
              "ref": 64
            }
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 8,
      "function": "main",
      "variables": {
        "values": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "68",
          "type": "array",
          "items": [
            null,
            null,
            {
              "ref": 69
            },
            null,
            null,
            {
              "ref": 70
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "64",
          "type": "object",
          "class": "java.util.HashMap",
          "fields": {
            "table": {
              "ref": 68
            },
            "entrySet": null,
            "size": 2,
            "modCount": 2,
            "threshold": 12,
            "loadFactor": 0.75,
            "keySet": null,
            "values": null
          }
        },
        {
          "object": "55",
          "type": "object",
          "class": "java.util.HashSet",
          "fields": {
            "map": {
              "ref": 64
            }
          }
        }
      ]
    }
  ],
  "error": null
}
```

### java-jdk-linked-list

Source fixture: fixtures/api-traces/java-jdk-linked-list.json

Request body

```json
{
  "code": "import java.util.LinkedList;\npublic class Main {\n    public static void main(String[] args) {\n        LinkedList<Integer> values = new LinkedList<>();\n        values.add(1); values.add(3); values.add(1, 2); values.removeLast();\n        System.out.println(values.getFirst() + \" \" + values.getLast() + \" \" + values.size());\n    }\n}",
  "language": "java"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "1 2 2\n",
  "trace": [
    {
      "event": "line",
      "line": 5,
      "function": "main",
      "variables": {
        "values": {
          "ref": 57
        }
      },
      "heap": [
        {
          "object": "57",
          "type": "object",
          "class": "java.util.LinkedList",
          "fields": {
            "size": 0,
            "first": null,
            "last": null,
            "modCount": 0
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "function": "main",
      "variables": {
        "values": {
          "ref": 57
        }
      },
      "heap": [
        {
          "object": "70",
          "type": "object",
          "class": "java.lang.Integer",
          "fields": {
            "value": 1
          }
        },
        {
          "object": "77",
          "type": "object",
          "class": "java.lang.Integer",
          "fields": {
            "value": 2
          }
        },
        {
          "object": "76",
          "type": "object",
          "class": "java.util.LinkedList$Node",
          "fields": {
            "item": {
              "ref": 77
            },
            "next": null,
            "prev": {
              "ref": 69
            }
          }
        },
        {
          "object": "69",
          "type": "object",
          "class": "java.util.LinkedList$Node",
          "fields": {
            "item": {
              "ref": 70
            },
            "next": {
              "ref": 76
            },
            "prev": null
          }
        },
        {
          "object": "57",
          "type": "object",
          "class": "java.util.LinkedList",
          "fields": {
            "size": 2,
            "first": {
              "ref": 69
            },
            "last": {
              "ref": 76
            },
            "modCount": 4
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "function": "main",
      "variables": {
        "values": {
          "ref": 57
        }
      },
      "heap": [
        {
          "object": "70",
          "type": "object",
          "class": "java.lang.Integer",
          "fields": {
            "value": 1
          }
        },
        {
          "object": "77",
          "type": "object",
          "class": "java.lang.Integer",
          "fields": {
            "value": 2
          }
        },
        {
          "object": "76",
          "type": "object",
          "class": "java.util.LinkedList$Node",
          "fields": {
            "item": {
              "ref": 77
            },
            "next": null,
            "prev": {
              "ref": 69
            }
          }
        },
        {
          "object": "69",
          "type": "object",
          "class": "java.util.LinkedList$Node",
          "fields": {
            "item": {
              "ref": 70
            },
            "next": {
              "ref": 76
            },
            "prev": null
          }
        },
        {
          "object": "57",
          "type": "object",
          "class": "java.util.LinkedList",
          "fields": {
            "size": 2,
            "first": {
              "ref": 69
            },
            "last": {
              "ref": 76
            },
            "modCount": 4
          }
        }
      ]
    }
  ],
  "error": null
}
```

### java-linked-objects

Source fixture: fixtures/api-traces/java-linked-objects.json

Request body

```json
{
  "code": "public class Main {\n    static class Node {\n        int value;\n        Node next;\n        Node(int value) { this.value = value; }\n    }\n    public static void main(String[] args) {\n        Node first = new Node(1);\n        Node second = new Node(2);\n        first.next = second;\n        System.out.println(first.next.value);\n    }\n}",
  "language": "java"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "2\n",
  "trace": [
    {
      "event": "line",
      "line": 9,
      "function": "main",
      "variables": {
        "first": {
          "ref": 56
        }
      },
      "heap": [
        {
          "object": "56",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 1,
            "next": null
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 10,
      "function": "main",
      "variables": {
        "first": {
          "ref": 56
        },
        "second": {
          "ref": 57
        }
      },
      "heap": [
        {
          "object": "56",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 1,
            "next": null
          }
        },
        {
          "object": "57",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 2,
            "next": null
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 11,
      "function": "main",
      "variables": {
        "first": {
          "ref": 56
        },
        "second": {
          "ref": 57
        }
      },
      "heap": [
        {
          "object": "57",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 2,
            "next": null
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 1,
            "next": {
              "ref": 57
            }
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 12,
      "function": "main",
      "variables": {
        "first": {
          "ref": 56
        },
        "second": {
          "ref": 57
        }
      },
      "heap": [
        {
          "object": "57",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 2,
            "next": null
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$Node",
          "fields": {
            "value": 1,
            "next": {
              "ref": 57
            }
          }
        }
      ]
    }
  ],
  "error": null
}
```

### java-nested-array

Source fixture: fixtures/api-traces/java-nested-array.json

Request body

```json
{
  "code": "public class Main {\n    public static void main(String[] args) {\n        int[][] grid = {{1, 2}, {3, 4}};\n        grid[1][0] = 8;\n        System.out.println(grid[1][0]);\n    }\n}",
  "language": "java"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "8\n",
  "trace": [
    {
      "event": "line",
      "line": 4,
      "function": "main",
      "variables": {
        "grid": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "55",
          "type": "array",
          "items": [
            {
              "ref": 56
            },
            {
              "ref": 57
            }
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 5,
      "function": "main",
      "variables": {
        "grid": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "55",
          "type": "array",
          "items": [
            {
              "ref": 56
            },
            {
              "ref": 57
            }
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "function": "main",
      "variables": {
        "grid": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "55",
          "type": "array",
          "items": [
            {
              "ref": 56
            },
            {
              "ref": 57
            }
          ]
        }
      ]
    }
  ],
  "error": null
}
```

### java-one-line-program

Source fixture: fixtures/api-traces/java-one-line-program.json

Request body

```json
{
  "code": "public class Main { public static void main(String[] args) { System.out.println(10 + 20); } }",
  "language": "java"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "30\n",
  "trace": [],
  "error": null
}
```

### java-priority-queue

Source fixture: fixtures/api-traces/java-priority-queue.json

Request body

```json
{
  "code": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        PriorityQueue<Integer> values = new PriorityQueue<>(Arrays.asList(7, 2, 5));\n        values.add(1);\n        List<Integer> result = new ArrayList<>();\n        while (!values.isEmpty()) result.add(values.remove());\n        System.out.println(result);\n    }\n}",
  "language": "java"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "[1, 2, 5, 7]\n",
  "trace": [
    {
      "event": "line",
      "line": 5,
      "function": "main",
      "variables": {
        "values": {
          "ref": 58
        }
      },
      "heap": [
        {
          "object": "64",
          "type": "array",
          "items": [
            {
              "ref": 65
            },
            {
              "ref": 66
            },
            {
              "ref": 67
            }
          ]
        },
        {
          "object": "58",
          "type": "object",
          "class": "java.util.PriorityQueue",
          "fields": {
            "queue": {
              "ref": 64
            },
            "size": 3,
            "comparator": null,
            "modCount": 0
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "function": "main",
      "variables": {
        "values": {
          "ref": 58
        }
      },
      "heap": [
        {
          "object": "68",
          "type": "array",
          "items": [
            {
              "ref": 69
            },
            {
              "ref": 65
            },
            {
              "ref": 67
            },
            {
              "ref": 66
            },
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "58",
          "type": "object",
          "class": "java.util.PriorityQueue",
          "fields": {
            "queue": {
              "ref": 68
            },
            "size": 4,
            "comparator": null,
            "modCount": 1
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "function": "main",
      "variables": {
        "values": {
          "ref": 58
        },
        "result": {
          "ref": 70
        }
      },
      "heap": [
        {
          "object": "68",
          "type": "array",
          "items": [
            {
              "ref": 69
            },
            {
              "ref": 65
            },
            {
              "ref": 67
            },
            {
              "ref": 66
            },
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "58",
          "type": "object",
          "class": "java.util.PriorityQueue",
          "fields": {
            "queue": {
              "ref": 68
            },
            "size": 4,
            "comparator": null,
            "modCount": 1
          }
        },
        {
          "object": "77",
          "type": "array",
          "items": []
        },
        {
          "object": "70",
          "type": "object",
          "class": "java.util.ArrayList",
          "fields": {
            "elementData": {
              "ref": 77
            },
            "size": 0,
            "modCount": 0
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 8,
      "function": "main",
      "variables": {
        "values": {
          "ref": 58
        },
        "result": {
          "ref": 70
        }
      },
      "heap": [
        {
          "object": "68",
          "type": "array",
          "items": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "58",
          "type": "object",
          "class": "java.util.PriorityQueue",
          "fields": {
            "queue": {
              "ref": 68
            },
            "size": 0,
            "comparator": null,
            "modCount": 5
          }
        },
        {
          "object": "78",
          "type": "array",
          "items": [
            {
              "ref": 69
            },
            {
              "ref": 65
            },
            {
              "ref": 67
            },
            {
              "ref": 66
            },
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "70",
          "type": "object",
          "class": "java.util.ArrayList",
          "fields": {
            "elementData": {
              "ref": 78
            },
            "size": 4,
            "modCount": 4
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 9,
      "function": "main",
      "variables": {
        "values": {
          "ref": 58
        },
        "result": {
          "ref": 70
        }
      },
      "heap": [
        {
          "object": "68",
          "type": "array",
          "items": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "58",
          "type": "object",
          "class": "java.util.PriorityQueue",
          "fields": {
            "queue": {
              "ref": 68
            },
            "size": 0,
            "comparator": null,
            "modCount": 5
          }
        },
        {
          "object": "78",
          "type": "array",
          "items": [
            {
              "ref": 69
            },
            {
              "ref": 65
            },
            {
              "ref": 67
            },
            {
              "ref": 66
            },
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "70",
          "type": "object",
          "class": "java.util.ArrayList",
          "fields": {
            "elementData": {
              "ref": 78
            },
            "size": 4,
            "modCount": 4
          }
        }
      ]
    }
  ],
  "error": null
}
```

### java-recursion

Source fixture: fixtures/api-traces/java-recursion.json

Request body

```json
{
  "code": "public class Main {\n    static int factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(factorial(5));\n    }\n}",
  "language": "java"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "120\n",
  "trace": [
    {
      "event": "line",
      "line": 3,
      "function": "factorial",
      "variables": {
        "n": 5
      }
    },
    {
      "event": "line",
      "line": 4,
      "function": "factorial",
      "variables": {
        "n": 5
      }
    },
    {
      "event": "line",
      "line": 3,
      "function": "factorial",
      "variables": {
        "n": 4
      }
    },
    {
      "event": "line",
      "line": 4,
      "function": "factorial",
      "variables": {
        "n": 4
      }
    },
    {
      "event": "line",
      "line": 3,
      "function": "factorial",
      "variables": {
        "n": 3
      }
    },
    {
      "event": "line",
      "line": 4,
      "function": "factorial",
      "variables": {
        "n": 3
      }
    },
    {
      "event": "line",
      "line": 3,
      "function": "factorial",
      "variables": {
        "n": 2
      }
    },
    {
      "event": "line",
      "line": 4,
      "function": "factorial",
      "variables": {
        "n": 2
      }
    },
    {
      "event": "line",
      "line": 3,
      "function": "factorial",
      "variables": {
        "n": 1
      }
    },
    {
      "event": "line",
      "line": 4,
      "function": "factorial",
      "variables": {
        "n": 2
      }
    },
    {
      "event": "line",
      "line": 4,
      "function": "factorial",
      "variables": {
        "n": 3
      }
    },
    {
      "event": "line",
      "line": 4,
      "function": "factorial",
      "variables": {
        "n": 4
      }
    },
    {
      "event": "line",
      "line": 4,
      "function": "factorial",
      "variables": {
        "n": 5
      }
    },
    {
      "event": "line",
      "line": 7,
      "function": "main"
    },
    {
      "event": "line",
      "line": 8,
      "function": "main"
    }
  ],
  "error": null
}
```

### java-runtime-error

Source fixture: fixtures/api-traces/java-runtime-error.json

Request body

```json
{
  "code": "public class Main {\n    public static void main(String[] args) {\n        int zero = 0;\n        System.out.println(10 / zero);\n    }\n}",
  "language": "java"
}
```

Backend response

```json
{
  "status": "error",
  "stdout": "",
  "trace": [
    {
      "event": "line",
      "line": 4,
      "function": "main",
      "variables": {
        "zero": 0
      }
    },
    {
      "event": "exception",
      "line": 4,
      "function": "main",
      "type": "java.lang.ArithmeticException",
      "message": "/ by zero"
    }
  ],
  "error": {
    "type": "java.lang.ArithmeticException",
    "message": "/ by zero"
  }
}
```

### java-stack-class

Source fixture: fixtures/api-traces/java-stack-class.json

Request body

```json
{
  "code": "import java.util.Stack;\npublic class Main {\n    public static void main(String[] args) {\n        Stack<String> values = new Stack<>();\n        values.push(\"a\"); values.push(\"b\");\n        String top = values.pop();\n        System.out.println(top + \" \" + values.peek());\n    }\n}",
  "language": "java"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "b a\n",
  "trace": [
    {
      "event": "line",
      "line": 5,
      "function": "main",
      "variables": {
        "values": {
          "ref": 57
        }
      },
      "heap": [
        {
          "object": "67",
          "type": "array",
          "items": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "57",
          "type": "object",
          "class": "java.util.Stack",
          "fields": {
            "elementData": {
              "ref": 67
            },
            "elementCount": 0,
            "capacityIncrement": 0,
            "modCount": 0
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "function": "main",
      "variables": {
        "values": {
          "ref": 57
        }
      },
      "heap": [
        {
          "object": "67",
          "type": "array",
          "items": [
            "a",
            "b",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "57",
          "type": "object",
          "class": "java.util.Stack",
          "fields": {
            "elementData": {
              "ref": 67
            },
            "elementCount": 2,
            "capacityIncrement": 0,
            "modCount": 2
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "function": "main",
      "variables": {
        "values": {
          "ref": 57
        },
        "top": "b"
      },
      "heap": [
        {
          "object": "67",
          "type": "array",
          "items": [
            "a",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "57",
          "type": "object",
          "class": "java.util.Stack",
          "fields": {
            "elementData": {
              "ref": 67
            },
            "elementCount": 1,
            "capacityIncrement": 0,
            "modCount": 3
          }
        },
        {
          "object": "75",
          "type": "array",
          "items": [
            98
          ]
        },
        {
          "object": "69",
          "type": "object",
          "class": "java.lang.String",
          "fields": {
            "value": {
              "ref": 75
            },
            "coder": 0,
            "hash": 0,
            "hashIsZero": false
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 8,
      "function": "main",
      "variables": {
        "values": {
          "ref": 57
        },
        "top": "b"
      },
      "heap": [
        {
          "object": "67",
          "type": "array",
          "items": [
            "a",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "57",
          "type": "object",
          "class": "java.util.Stack",
          "fields": {
            "elementData": {
              "ref": 67
            },
            "elementCount": 1,
            "capacityIncrement": 0,
            "modCount": 3
          }
        },
        {
          "object": "75",
          "type": "array",
          "items": [
            98
          ]
        },
        {
          "object": "69",
          "type": "object",
          "class": "java.lang.String",
          "fields": {
            "value": {
              "ref": 75
            },
            "coder": 0,
            "hash": 0,
            "hashIsZero": false
          }
        }
      ]
    }
  ],
  "error": null
}
```

### java-trie-minimal

Source fixture: fixtures/api-traces/java-trie-minimal.json

Request body

```json
{
  "language": "java",
  "code": "import java.util.HashMap;\npublic class Main {\n    static class T { HashMap<Character, T> children = new HashMap<>(); boolean end; }\n    public static void main(String[] args) {\n        T root = new T(); root.children.put('c', new T());\n        root.children.get('c').end = true;\n        System.out.println(root.children.get('c').end);\n    }\n}"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "true\n",
  "trace": [
    {
      "event": "line",
      "line": 6,
      "function": "main",
      "variables": {
        "root": {
          "ref": 56
        }
      },
      "heap": [
        {
          "object": "63",
          "type": "array",
          "items": [
            null,
            null,
            null,
            {
              "ref": 64
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "57",
          "type": "object",
          "class": "java.util.HashMap",
          "fields": {
            "table": {
              "ref": 63
            },
            "entrySet": null,
            "size": 1,
            "modCount": 1,
            "threshold": 12,
            "loadFactor": 0.75,
            "keySet": null,
            "values": null
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$T",
          "fields": {
            "children": {
              "ref": 57
            },
            "end": false
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "function": "main",
      "variables": {
        "root": {
          "ref": 56
        }
      },
      "heap": [
        {
          "object": "63",
          "type": "array",
          "items": [
            null,
            null,
            null,
            {
              "ref": 64
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "57",
          "type": "object",
          "class": "java.util.HashMap",
          "fields": {
            "table": {
              "ref": 63
            },
            "entrySet": null,
            "size": 1,
            "modCount": 1,
            "threshold": 12,
            "loadFactor": 0.75,
            "keySet": null,
            "values": null
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$T",
          "fields": {
            "children": {
              "ref": 57
            },
            "end": false
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 8,
      "function": "main",
      "variables": {
        "root": {
          "ref": 56
        }
      },
      "heap": [
        {
          "object": "63",
          "type": "array",
          "items": [
            null,
            null,
            null,
            {
              "ref": 64
            },
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        {
          "object": "57",
          "type": "object",
          "class": "java.util.HashMap",
          "fields": {
            "table": {
              "ref": 63
            },
            "entrySet": null,
            "size": 1,
            "modCount": 1,
            "threshold": 12,
            "loadFactor": 0.75,
            "keySet": null,
            "values": null
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$T",
          "fields": {
            "children": {
              "ref": 57
            },
            "end": false
          }
        }
      ]
    }
  ],
  "error": null
}
```

### java-trie-node-chain

Source fixture: fixtures/api-traces/java-trie-node-chain.json

Request body

```json
{
  "language": "java",
  "code": "public class Main {\n    static class T { T c, a, t; boolean end; }\n    public static void main(String[] args) {\n        T root = new T(); root.c = new T(); root.c.a = new T();\n        root.c.a.t = new T(); root.c.a.t.end = true;\n        System.out.println(root.c.a.t.end);\n    }\n}"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "true\n",
  "trace": [
    {
      "event": "line",
      "line": 5,
      "function": "main",
      "variables": {
        "root": {
          "ref": 56
        }
      },
      "heap": [
        {
          "object": "58",
          "type": "object",
          "class": "Main$T",
          "fields": {
            "c": null,
            "a": null,
            "t": null,
            "end": false
          }
        },
        {
          "object": "57",
          "type": "object",
          "class": "Main$T",
          "fields": {
            "c": null,
            "a": {
              "ref": 58
            },
            "t": null,
            "end": false
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$T",
          "fields": {
            "c": {
              "ref": 57
            },
            "a": null,
            "t": null,
            "end": false
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "function": "main",
      "variables": {
        "root": {
          "ref": 56
        }
      },
      "heap": [
        {
          "object": "59",
          "type": "object",
          "class": "Main$T",
          "fields": {
            "c": null,
            "a": null,
            "t": null,
            "end": true
          }
        },
        {
          "object": "58",
          "type": "object",
          "class": "Main$T",
          "fields": {
            "c": null,
            "a": null,
            "t": {
              "ref": 59
            },
            "end": false
          }
        },
        {
          "object": "57",
          "type": "object",
          "class": "Main$T",
          "fields": {
            "c": null,
            "a": {
              "ref": 58
            },
            "t": null,
            "end": false
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$T",
          "fields": {
            "c": {
              "ref": 57
            },
            "a": null,
            "t": null,
            "end": false
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "function": "main",
      "variables": {
        "root": {
          "ref": 56
        }
      },
      "heap": [
        {
          "object": "59",
          "type": "object",
          "class": "Main$T",
          "fields": {
            "c": null,
            "a": null,
            "t": null,
            "end": true
          }
        },
        {
          "object": "58",
          "type": "object",
          "class": "Main$T",
          "fields": {
            "c": null,
            "a": null,
            "t": {
              "ref": 59
            },
            "end": false
          }
        },
        {
          "object": "57",
          "type": "object",
          "class": "Main$T",
          "fields": {
            "c": null,
            "a": {
              "ref": 58
            },
            "t": null,
            "end": false
          }
        },
        {
          "object": "56",
          "type": "object",
          "class": "Main$T",
          "fields": {
            "c": {
              "ref": 57
            },
            "a": null,
            "t": null,
            "end": false
          }
        }
      ]
    }
  ],
  "error": null
}
```

### java-trie-prefix

Source fixture: fixtures/api-traces/java-trie-prefix.json

Request body

```json
{
  "code": "import java.util.*;\npublic class Main {\n    static class Trie { Map<Character, Trie> children = new HashMap<>(); boolean end; }\n    public static void main(String[] args) {\n        Trie root = new Trie();\n        for (String word : new String[]{\"cat\", \"car\"}) {\n            Trie node = root;\n            for (char ch : word.toCharArray()) node = node.children.computeIfAbsent(ch, k -> new Trie());\n            node.end = true;\n        }\n        Trie node = root;\n        for (char ch : \"cat\".toCharArray()) node = node.children.get(ch);\n        System.out.println(node.end + \" \" + root.children.get('c').children.containsKey('r'));\n    }\n}",
  "language": "java"
}
```

Backend response

```json
{
  "status": "error",
  "stdout": null,
  "trace": null,
  "error": {
    "message": "Docker execution failed: Code execution timed out after 5 seconds",
    "type": "RuntimeException"
  }
}
```

### java-trie-three-letter-prefix

Source fixture: fixtures/api-traces/java-trie-three-letter-prefix.json

Request body

```json
{
  "language": "java",
  "code": "import java.util.HashMap;\npublic class Main {\n    static class T { HashMap<Character, T> children = new HashMap<>(); boolean end; }\n    public static void main(String[] args) {\n        T root = new T(); root.children.put('c', new T());\n        T a = root.children.get('c'); a.children.put('a', new T());\n        T t = a.children.get('a'); t.children.put('t', new T());\n        t.children.get('t').end = true;\n        T found = root.children.get('c').children.get('a').children.get('t');\n        System.out.println(found.end);\n    }\n}"
}
```

Backend response

```json
{
  "status": "error",
  "stdout": null,
  "trace": null,
  "error": {
    "message": "Docker execution failed: Code execution timed out after 5 seconds",
    "type": "RuntimeException"
  }
}
```

### java-union-find-minimal

Source fixture: fixtures/api-traces/java-union-find-minimal.json

Request body

```json
{
  "language": "java",
  "code": "public class Main {\n    public static void main(String[] args) {\n        int[] parent = {0, 1, 2}; parent[1] = 0; parent[2] = 1;\n        while (parent[2] != parent[parent[2]]) parent[2] = parent[parent[2]];\n        System.out.println(parent[0] == parent[parent[2]]);\n    }\n}"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "true\n",
  "trace": [
    {
      "event": "line",
      "line": 4,
      "function": "main",
      "variables": {
        "parent": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "55",
          "type": "array",
          "items": [
            0,
            0,
            1
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 5,
      "function": "main",
      "variables": {
        "parent": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "55",
          "type": "array",
          "items": [
            0,
            0,
            0
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "function": "main",
      "variables": {
        "parent": {
          "ref": 55
        }
      },
      "heap": [
        {
          "object": "55",
          "type": "array",
          "items": [
            0,
            0,
            0
          ]
        }
      ]
    }
  ],
  "error": null
}
```

### java-union-find

Source fixture: fixtures/api-traces/java-union-find.json

Request body

```json
{
  "code": "import java.util.Arrays;\npublic class Main {\n    static int find(int[] parent, int x) { if (parent[x] != x) parent[x] = find(parent, parent[x]); return parent[x]; }\n    static void union(int[] parent, int a, int b) { parent[find(parent, a)] = find(parent, b); }\n    public static void main(String[] args) {\n        int[] parent = {0, 1, 2, 3};\n        union(parent, 0, 1); union(parent, 2, 3); union(parent, 1, 2);\n        System.out.println((find(parent, 0) == find(parent, 3)) + \" \" + Arrays.toString(parent));\n    }\n}",
  "language": "java"
}
```

Backend response

```json
{
  "status": "error",
  "stdout": null,
  "trace": null,
  "error": {
    "message": "Docker execution failed: Code execution timed out after 5 seconds",
    "type": "RuntimeException"
  }
}
```

## Python

### python-basic-arithmetic

Source fixture: fixtures/api-traces/python-basic-arithmetic.json

Request body

```json
{
  "code": "x = 10\ny = 20\nprint(x + y)",
  "language": "python"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "30\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2,
      "variables": {
        "x": 10
      }
    },
    {
      "event": "line",
      "line": 3,
      "variables": {
        "x": 10,
        "y": 20
      }
    },
    {
      "event": "return",
      "line": 3,
      "stdout": "30\n"
    }
  ],
  "error": null
}
```

### python-binary-tree-minimal

Source fixture: fixtures/api-traces/python-binary-tree-minimal.json

Request body

```json
{
  "code": "class Node: pass\nroot = Node()\nroot.value = 2\nroot.left = Node()\nroot.left.value = 1\nroot.right = Node()\nroot.right.value = 3\nprint(root.left.value + root.value + root.right.value)",
  "language": "python"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "6\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2
    },
    {
      "event": "line",
      "line": 3,
      "variables": {
        "root": {
          "ref": 1
        }
      }
    },
    {
      "event": "line",
      "line": 4,
      "heap": [
        {
          "object": "1",
          "type": "object",
          "class": "Node",
          "changes": {
            "value": 2
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 5,
      "heap": [
        {
          "object": "1",
          "type": "object",
          "class": "Node",
          "changes": {
            "left": {
              "ref": 2
            },
            "value": 2
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "heap": [
        {
          "object": "2",
          "type": "object",
          "class": "Node",
          "changes": {
            "value": 1
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "heap": [
        {
          "object": "1",
          "type": "object",
          "class": "Node",
          "changes": {
            "left": {
              "ref": 2
            },
            "right": {
              "ref": 3
            },
            "value": 2
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 8,
      "heap": [
        {
          "object": "3",
          "type": "object",
          "class": "Node",
          "changes": {
            "value": 3
          }
        }
      ]
    },
    {
      "event": "return",
      "line": 8,
      "stdout": "6\n"
    }
  ],
  "error": null
}
```

### python-binary-tree

Source fixture: fixtures/api-traces/python-binary-tree.json

Request body

```json
{
  "language": "python",
  "code": "class Node:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\nroot = Node(2)\nroot.left = Node(1)\nroot.right = Node(3)\nprint(root.left.value + root.value + root.right.value)"
}
```

Backend response

```json
{
  "status": "error",
  "stdout": null,
  "trace": null,
  "error": {
    "message": "Docker execution failed: Code execution timed out after 5 seconds",
    "type": "RuntimeException"
  }
}
```

### python-bst-insert-search-minimal

Source fixture: fixtures/api-traces/python-bst-insert-search-minimal.json

Request body

```json
{
  "language": "python",
  "code": "root = {\"v\": 8, \"l\": {\"v\": 3, \"l\": None, \"r\": None}, \"r\": {\"v\": 10, \"l\": None, \"r\": None}}\nvalue = 4\nparent = root[\"l\"]\nnode = {\"v\": value, \"l\": None, \"r\": None}\nif value < parent[\"v\"]:\n    parent[\"l\"] = node\nelse:\n    parent[\"r\"] = node\ncurrent = root[\"l\"]\nif value > current[\"v\"]:\n    current = current[\"r\"]\nprint(current[\"v\"] == value)"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "True\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2,
      "variables": {
        "root": {
          "ref": 1
        }
      },
      "heap": [
        {
          "object": "1",
          "type": "dict",
          "entries": [
            {
              "key": "v",
              "value": 8
            },
            {
              "key": "l",
              "value": {
                "ref": 2
              }
            },
            {
              "key": "r",
              "value": {
                "ref": 3
              }
            }
          ]
        },
        {
          "object": "2",
          "type": "dict",
          "entries": [
            {
              "key": "v",
              "value": 3
            },
            {
              "key": "l",
              "value": null
            },
            {
              "key": "r",
              "value": null
            }
          ]
        },
        {
          "object": "3",
          "type": "dict",
          "entries": [
            {
              "key": "v",
              "value": 10
            },
            {
              "key": "l",
              "value": null
            },
            {
              "key": "r",
              "value": null
            }
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 3,
      "variables": {
        "root": {
          "ref": 1
        },
        "value": 4
      }
    },
    {
      "event": "line",
      "line": 4,
      "variables": {
        "root": {
          "ref": 1
        },
        "value": 4,
        "parent": {
          "ref": 2
        }
      }
    },
    {
      "event": "line",
      "line": 5,
      "variables": {
        "root": {
          "ref": 1
        },
        "value": 4,
        "parent": {
          "ref": 2
        },
        "node": {
          "ref": 4
        }
      },
      "heap": [
        {
          "object": "4",
          "type": "dict",
          "entries": [
            {
              "key": "v",
              "value": 4
            },
            {
              "key": "l",
              "value": null
            },
            {
              "key": "r",
              "value": null
            }
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 8
    },
    {
      "event": "line",
      "line": 9,
      "heap": [
        {
          "object": "2",
          "type": "dict",
          "entries": [
            {
              "key": "v",
              "value": 3
            },
            {
              "key": "l",
              "value": null
            },
            {
              "key": "r",
              "value": {
                "ref": 4
              }
            }
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 10,
      "variables": {
        "root": {
          "ref": 1
        },
        "value": 4,
        "parent": {
          "ref": 2
        },
        "node": {
          "ref": 4
        },
        "current": {
          "ref": 2
        }
      }
    },
    {
      "event": "line",
      "line": 11
    },
    {
      "event": "line",
      "line": 12,
      "variables": {
        "root": {
          "ref": 1
        },
        "value": 4,
        "parent": {
          "ref": 2
        },
        "node": {
          "ref": 4
        },
        "current": {
          "ref": 4
        }
      }
    },
    {
      "event": "return",
      "line": 12,
      "stdout": "True\n"
    }
  ],
  "error": null
}
```

### python-bst-insert-search

Source fixture: fixtures/api-traces/python-bst-insert-search.json

Request body

```json
{
  "code": "class Node: pass\nroot = Node()\nroot.value = 8\nroot.left = Node()\nroot.left.value = 3\nroot.right = Node()\nroot.right.value = 10\nroot.left.right = Node()\nroot.left.right.value = 6\nvalue = 4\ncurrent = root\nwhile current:\n    parent = current\n    current = current.left if value < current.value else current.right\nnode = Node()\nnode.value = value\nif value < parent.value:\n    parent.left = node\nelse:\n    parent.right = node\ncurrent = root\nfound = False\nwhile current:\n    if current.value == value:\n        found = True\n        break\n    current = current.left if value < current.value else current.right\nprint(found, root.left.left.value)",
  "language": "python"
}
```

Backend response

```json
{
  "status": "error",
  "stdout": "",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2
    },
    {
      "event": "line",
      "line": 3,
      "variables": {
        "root": {
          "ref": 1
        }
      }
    },
    {
      "event": "line",
      "line": 4,
      "heap": [
        {
          "object": "1",
          "type": "object",
          "class": "Node",
          "changes": {
            "value": 8
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 5,
      "heap": [
        {
          "object": "1",
          "type": "object",
          "class": "Node",
          "changes": {
            "left": {
              "ref": 2
            },
            "value": 8
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "heap": [
        {
          "object": "2",
          "type": "object",
          "class": "Node",
          "changes": {
            "value": 3
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "heap": [
        {
          "object": "1",
          "type": "object",
          "class": "Node",
          "changes": {
            "left": {
              "ref": 2
            },
            "right": {
              "ref": 3
            },
            "value": 8
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 8,
      "heap": [
        {
          "object": "3",
          "type": "object",
          "class": "Node",
          "changes": {
            "value": 10
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 9,
      "heap": [
        {
          "object": "2",
          "type": "object",
          "class": "Node",
          "changes": {
            "right": {
              "ref": 4
            },
            "value": 3
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 10,
      "heap": [
        {
          "object": "4",
          "type": "object",
          "class": "Node",
          "changes": {
            "value": 6
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 11,
      "variables": {
        "root": {
          "ref": 1
        },
        "value": 4
      }
    },
    {
      "event": "line",
      "line": 12,
      "variables": {
        "root": {
          "ref": 1
        },
        "value": 4,
        "current": {
          "ref": 1
        }
      }
    },
    {
      "event": "line",
      "line": 13
    },
    {
      "event": "line",
      "line": 14,
      "variables": {
        "root": {
          "ref": 1
        },
        "value": 4,
        "current": {
          "ref": 1
        },
        "parent": {
          "ref": 1
        }
      }
    },
    {
      "event": "line",
      "line": 12,
      "variables": {
        "root": {
          "ref": 1
        },
        "value": 4,
        "current": {
          "ref": 2
        },
        "parent": {
          "ref": 1
        }
      }
    },
    {
      "event": "line",
      "line": 13
    },
    {
      "event": "line",
      "line": 14,
      "variables": {
        "root": {
          "ref": 1
        },
        "value": 4,
        "current": {
          "ref": 2
        },
        "parent": {
          "ref": 2
        }
      }
    },
    {
      "event": "line",
      "line": 12,
      "variables": {
        "root": {
          "ref": 1
        },
        "value": 4,
        "current": {
          "ref": 4
        },
        "parent": {
          "ref": 2
        }
      }
    },
    {
      "event": "line",
      "line": 13
    },
    {
      "event": "line",
      "line": 14,
      "variables": {
        "root": {
          "ref": 1
        },
        "value": 4,
        "current": {
          "ref": 4
        },
        "parent": {
          "ref": 4
        }
      }
    },
    {
      "event": "exception",
      "line": 14
    }
  ],
  "error": {
    "type": "ExecutionError",
    "message": "An exception occurred during code execution."
  }
}
```

### python-bst-minimal

Source fixture: fixtures/api-traces/python-bst-minimal.json

Request body

```json
{
  "language": "python",
  "code": "root = {\"v\": 8, \"l\": {\"v\": 3, \"l\": None, \"r\": None}, \"r\": {\"v\": 10, \"l\": None, \"r\": None}}\nvalue = 4\nnode = root\nwhile True:\n    side = \"l\" if value < node[\"v\"] else \"r\"\n    if node[side] is None:\n        node[side] = {\"v\": value, \"l\": None, \"r\": None}\n        break\n    node = node[side]\nfound = root\nwhile found is not None and found[\"v\"] != value:\n    found = found[\"l\"] if value < found[\"v\"] else found[\"r\"]\nprint(found is not None, found[\"v\"])"
}
```

Backend response

```json
{
  "status": "error",
  "stdout": null,
  "trace": null,
  "error": {
    "message": "Docker execution failed: Code execution timed out after 5 seconds",
    "type": "RuntimeException"
  }
}
```

### python-bst-structure-minimal

Source fixture: fixtures/api-traces/python-bst-structure-minimal.json

Request body

```json
{
  "code": "root = {\"v\": 8, \"l\": {\"v\": 3, \"l\": None, \"r\": None}, \"r\": {\"v\": 10, \"l\": None, \"r\": None}}\nroot[\"l\"][\"r\"] = {\"v\": 4, \"l\": None, \"r\": None}\nprint(root[\"l\"][\"r\"][\"v\"] < root[\"v\"])",
  "language": "python"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "True\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2,
      "variables": {
        "root": {
          "ref": 1
        }
      },
      "heap": [
        {
          "object": "1",
          "type": "dict",
          "entries": [
            {
              "key": "v",
              "value": 8
            },
            {
              "key": "l",
              "value": {
                "ref": 2
              }
            },
            {
              "key": "r",
              "value": {
                "ref": 3
              }
            }
          ]
        },
        {
          "object": "2",
          "type": "dict",
          "entries": [
            {
              "key": "v",
              "value": 3
            },
            {
              "key": "l",
              "value": null
            },
            {
              "key": "r",
              "value": null
            }
          ]
        },
        {
          "object": "3",
          "type": "dict",
          "entries": [
            {
              "key": "v",
              "value": 10
            },
            {
              "key": "l",
              "value": null
            },
            {
              "key": "r",
              "value": null
            }
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 3,
      "heap": [
        {
          "object": "2",
          "type": "dict",
          "entries": [
            {
              "key": "v",
              "value": 3
            },
            {
              "key": "l",
              "value": null
            },
            {
              "key": "r",
              "value": {
                "ref": 4
              }
            }
          ]
        },
        {
          "object": "4",
          "type": "dict",
          "entries": [
            {
              "key": "v",
              "value": 4
            },
            {
              "key": "l",
              "value": null
            },
            {
              "key": "r",
              "value": null
            }
          ]
        }
      ]
    },
    {
      "event": "return",
      "line": 3,
      "stdout": "True\n"
    }
  ],
  "error": null
}
```

### python-circular-queue

Source fixture: fixtures/api-traces/python-circular-queue.json

Request body

```json
{
  "code": "data = [None, None, None]\nfront = 0\nsize = 0\ndata[(front + size) % 3] = 1\nsize += 1\ndata[(front + size) % 3] = 2\nsize += 1\nfront = (front + 1) % 3\nsize -= 1\ndata[(front + size) % 3] = 3\nsize += 1\nprint([data[(front + i) % 3] for i in range(size)], size)",
  "language": "python"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "[2, 3] 2\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2,
      "variables": {
        "data": {
          "ref": 1
        }
      },
      "heap": [
        {
          "object": "1",
          "type": "list",
          "items": [
            null,
            null,
            null
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 3,
      "variables": {
        "data": {
          "ref": 1
        },
        "front": 0
      }
    },
    {
      "event": "line",
      "line": 4,
      "variables": {
        "data": {
          "ref": 1
        },
        "front": 0,
        "size": 0
      }
    },
    {
      "event": "line",
      "line": 5,
      "heap": [
        {
          "object": "1",
          "type": "list",
          "items": [
            1,
            null,
            null
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "variables": {
        "data": {
          "ref": 1
        },
        "front": 0,
        "size": 1
      }
    },
    {
      "event": "line",
      "line": 7,
      "heap": [
        {
          "object": "1",
          "type": "list",
          "items": [
            1,
            2,
            null
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 8,
      "variables": {
        "data": {
          "ref": 1
        },
        "front": 0,
        "size": 2
      }
    },
    {
      "event": "line",
      "line": 9,
      "variables": {
        "data": {
          "ref": 1
        },
        "front": 1,
        "size": 2
      }
    },
    {
      "event": "line",
      "line": 10,
      "variables": {
        "data": {
          "ref": 1
        },
        "front": 1,
        "size": 1
      }
    },
    {
      "event": "line",
      "line": 11,
      "heap": [
        {
          "object": "1",
          "type": "list",
          "items": [
            1,
            2,
            3
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 12,
      "variables": {
        "data": {
          "ref": 1
        },
        "front": 1,
        "size": 2
      }
    },
    {
      "event": "call",
      "line": 12,
      "function": "<listcomp>"
    },
    {
      "event": "line",
      "line": 12,
      "function": "<listcomp>"
    },
    {
      "event": "line",
      "line": 12,
      "function": "<listcomp>"
    },
    {
      "event": "line",
      "line": 12,
      "function": "<listcomp>"
    },
    {
      "event": "return",
      "line": 12,
      "function": "<listcomp>",
      "heap": [
        {
          "object": "3",
          "type": "list",
          "items": [
            2,
            3
          ]
        }
      ]
    },
    {
      "event": "return",
      "line": 12,
      "stdout": "[2, 3] 2\n"
    }
  ],
  "error": null
}
```

### python-dictionary

Source fixture: fixtures/api-traces/python-dictionary.json

Request body

```json
{
  "code": "scores = {\"ada\": 1, \"linus\": 2}\nscores[\"ada\"] = 3\nprint(scores)",
  "language": "python"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "{'ada': 3, 'linus': 2}\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2,
      "variables": {
        "scores": {
          "ref": 1
        }
      },
      "heap": [
        {
          "object": "1",
          "type": "dict",
          "entries": [
            {
              "key": "ada",
              "value": 1
            },
            {
              "key": "linus",
              "value": 2
            }
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 3,
      "heap": [
        {
          "object": "1",
          "type": "dict",
          "entries": [
            {
              "key": "ada",
              "value": 3
            },
            {
              "key": "linus",
              "value": 2
            }
          ]
        }
      ]
    },
    {
      "event": "return",
      "line": 3,
      "stdout": "{'ada': 3, 'linus': 2}\n"
    }
  ],
  "error": null
}
```

### python-doubly-linked-list

Source fixture: fixtures/api-traces/python-doubly-linked-list.json

Request body

```json
{
  "code": "class Node: pass\nfirst = Node()\nfirst.value = 1\nmiddle = Node()\nmiddle.value = 2\nlast = Node()\nlast.value = 3\nfirst.next = middle\nmiddle.prev = first\nmiddle.next = last\nlast.prev = middle\nprint(first.value, first.next.value, last.value, last.prev.prev is first)",
  "language": "python"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "1 2 3 True\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2
    },
    {
      "event": "line",
      "line": 3,
      "variables": {
        "first": {
          "ref": 1
        }
      }
    },
    {
      "event": "line",
      "line": 4,
      "heap": [
        {
          "object": "1",
          "type": "object",
          "class": "Node",
          "changes": {
            "value": 1
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 5,
      "variables": {
        "first": {
          "ref": 1
        },
        "middle": {
          "ref": 2
        }
      }
    },
    {
      "event": "line",
      "line": 6,
      "heap": [
        {
          "object": "2",
          "type": "object",
          "class": "Node",
          "changes": {
            "value": 2
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "variables": {
        "first": {
          "ref": 1
        },
        "middle": {
          "ref": 2
        },
        "last": {
          "ref": 3
        }
      }
    },
    {
      "event": "line",
      "line": 8,
      "heap": [
        {
          "object": "3",
          "type": "object",
          "class": "Node",
          "changes": {
            "value": 3
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 9,
      "heap": [
        {
          "object": "1",
          "type": "object",
          "class": "Node",
          "changes": {
            "next": {
              "ref": 2
            },
            "value": 1
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 10,
      "heap": [
        {
          "object": "2",
          "type": "object",
          "class": "Node",
          "changes": {
            "prev": {
              "ref": 1
            },
            "value": 2
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 11,
      "heap": [
        {
          "object": "2",
          "type": "object",
          "class": "Node",
          "changes": {
            "next": {
              "ref": 3
            },
            "prev": {
              "ref": 1
            },
            "value": 2
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 12,
      "heap": [
        {
          "object": "3",
          "type": "object",
          "class": "Node",
          "changes": {
            "prev": {
              "ref": 2
            },
            "value": 3
          }
        }
      ]
    },
    {
      "event": "return",
      "line": 12,
      "stdout": "1 2 3 True\n"
    }
  ],
  "error": null
}
```

### python-graph-cycle-minimal

Source fixture: fixtures/api-traces/python-graph-cycle-minimal.json

Request body

```json
{
  "language": "python",
  "code": "class Node: pass\na = Node()\nb = Node()\nc = Node()\na.next = b\nb.next = c\nc.next = a\nprint(c.next is a and a.next.next is c)"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "True\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2
    },
    {
      "event": "line",
      "line": 3,
      "variables": {
        "a": {
          "ref": 1
        }
      }
    },
    {
      "event": "line",
      "line": 4,
      "variables": {
        "a": {
          "ref": 1
        },
        "b": {
          "ref": 2
        }
      }
    },
    {
      "event": "line",
      "line": 5,
      "variables": {
        "a": {
          "ref": 1
        },
        "b": {
          "ref": 2
        },
        "c": {
          "ref": 3
        }
      }
    },
    {
      "event": "line",
      "line": 6,
      "heap": [
        {
          "object": "1",
          "type": "object",
          "class": "Node",
          "changes": {
            "next": {
              "ref": 2
            }
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "heap": [
        {
          "object": "2",
          "type": "object",
          "class": "Node",
          "changes": {
            "next": {
              "ref": 3
            }
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 8,
      "heap": [
        {
          "object": "3",
          "type": "object",
          "class": "Node",
          "changes": {
            "next": {
              "ref": 1
            }
          }
        }
      ]
    },
    {
      "event": "return",
      "line": 8,
      "stdout": "True\n"
    }
  ],
  "error": null
}
```

### python-graph-cycle-shared-refs

Source fixture: fixtures/api-traces/python-graph-cycle-shared-refs.json

Request body

```json
{
  "code": "class Node: pass\na = Node()\nb = Node()\nc = Node()\na.name = \"A\"\nb.name = \"B\"\nc.name = \"C\"\na.neighbors = [b, c]\nb.neighbors = [c]\nc.neighbors = [a]\nseen = set()\nqueue = [a]\nwhile queue:\n    node = queue.pop(0)\n    if node.name in seen:\n        continue\n    seen.add(node.name)\n    queue.extend(node.neighbors)\nprint(len(seen), a.neighbors[1] is c, c.neighbors[0] is a)",
  "language": "python"
}
```

Backend response

```json
{
  "status": "error",
  "stdout": null,
  "trace": null,
  "error": {
    "message": "Docker execution failed: Code execution timed out after 5 seconds",
    "type": "RuntimeException"
  }
}
```

### python-heapq-priority-queue

Source fixture: fixtures/api-traces/python-heapq-priority-queue.json

Request body

```json
{
  "code": "import heapq\nvalues = [7, 2, 5]\nheapq.heapify(values)\nheapq.heappush(values, 1)\nresult = []\nwhile values:\n    result.append(heapq.heappop(values))\nprint(result)",
  "language": "python"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "[1, 2, 5, 7]\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2,
      "variables": {
        "heapq": {
          "ref": 1
        }
      }
    },
    {
      "event": "line",
      "line": 3,
      "variables": {
        "heapq": {
          "ref": 1
        },
        "values": {
          "ref": 2
        }
      },
      "heap": [
        {
          "object": "2",
          "type": "list",
          "items": [
            7,
            2,
            5
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 4,
      "heap": [
        {
          "object": "2",
          "type": "list",
          "items": [
            2,
            7,
            5
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 5,
      "heap": [
        {
          "object": "2",
          "type": "list",
          "items": [
            1,
            2,
            5,
            7
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "variables": {
        "heapq": {
          "ref": 1
        },
        "values": {
          "ref": 2
        },
        "result": {
          "ref": 3
        }
      },
      "heap": [
        {
          "object": "3",
          "value": [
            "LIST"
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 7
    },
    {
      "event": "line",
      "line": 6,
      "heap": [
        {
          "object": "2",
          "type": "list",
          "items": [
            2,
            7,
            5
          ]
        },
        {
          "object": "3",
          "type": "list",
          "items": [
            1
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 7
    },
    {
      "event": "line",
      "line": 6,
      "heap": [
        {
          "object": "2",
          "type": "list",
          "items": [
            5,
            7
          ]
        },
        {
          "object": "3",
          "type": "list",
          "items": [
            1,
            2
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 7
    },
    {
      "event": "line",
      "line": 6,
      "heap": [
        {
          "object": "2",
          "type": "list",
          "items": [
            7
          ]
        },
        {
          "object": "3",
          "type": "list",
          "items": [
            1,
            2,
            5
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 7
    },
    {
      "event": "line",
      "line": 6,
      "heap": [
        {
          "object": "2",
          "value": [
            "LIST"
          ]
        },
        {
          "object": "3",
          "type": "list",
          "items": [
            1,
            2,
            5,
            7
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 8
    },
    {
      "event": "return",
      "line": 8,
      "stdout": "[1, 2, 5, 7]\n"
    }
  ],
  "error": null
}
```

### python-instruction-limit

Source fixture: fixtures/api-traces/python-instruction-limit.json

Request body

```json
{
  "language": "python",
  "code": "for i in range(1001):\n    x = i"
}
```

Backend response

```json
{
  "status": "error",
  "stdout": null,
  "trace": null,
  "error": {
    "message": "Docker execution failed: Code execution timed out after 5 seconds",
    "type": "RuntimeException"
  }
}
```

### python-linked-nodes

Source fixture: fixtures/api-traces/python-linked-nodes.json

Request body

```json
{
  "code": "class Node:\n    def __init__(self, value):\n        self.value = value\n        self.next = None\na = Node(1)\nb = Node(2)\na.next = b\nprint(a.value, a.next.value)",
  "language": "python"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "1 2\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 5
    },
    {
      "event": "call",
      "line": 2,
      "function": "__init__"
    },
    {
      "event": "line",
      "line": 3,
      "function": "__init__"
    },
    {
      "event": "line",
      "line": 4,
      "function": "__init__",
      "heap": [
        {
          "object": "1",
          "type": "object",
          "class": "Node",
          "changes": {
            "value": 1
          }
        }
      ]
    },
    {
      "event": "return",
      "line": 4,
      "function": "__init__",
      "heap": [
        {
          "object": "1",
          "type": "object",
          "class": "Node",
          "changes": {
            "next": null,
            "value": 1
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "variables": {
        "a": {
          "ref": 1
        }
      }
    },
    {
      "event": "call",
      "line": 2,
      "function": "__init__"
    },
    {
      "event": "line",
      "line": 3,
      "function": "__init__"
    },
    {
      "event": "line",
      "line": 4,
      "function": "__init__",
      "heap": [
        {
          "object": "2",
          "type": "object",
          "class": "Node",
          "changes": {
            "value": 2
          }
        }
      ]
    },
    {
      "event": "return",
      "line": 4,
      "function": "__init__",
      "heap": [
        {
          "object": "2",
          "type": "object",
          "class": "Node",
          "changes": {
            "next": null,
            "value": 2
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "variables": {
        "a": {
          "ref": 1
        },
        "b": {
          "ref": 2
        }
      }
    },
    {
      "event": "line",
      "line": 8,
      "heap": [
        {
          "object": "1",
          "type": "object",
          "class": "Node",
          "changes": {
            "next": {
              "ref": 2
            },
            "value": 1
          }
        }
      ]
    },
    {
      "event": "return",
      "line": 8,
      "stdout": "1 2\n"
    }
  ],
  "error": null
}
```

### python-list-mutation

Source fixture: fixtures/api-traces/python-list-mutation.json

Request body

```json
{
  "code": "nums = [1, 2, 3]\nnums.append(4)\nnums[0] = 10\nprint(nums)",
  "language": "python"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "[10, 2, 3, 4]\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2,
      "variables": {
        "nums": {
          "ref": 1
        }
      },
      "heap": [
        {
          "object": "1",
          "type": "list",
          "items": [
            1,
            2,
            3
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 3,
      "heap": [
        {
          "object": "1",
          "type": "list",
          "items": [
            1,
            2,
            3,
            4
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 4,
      "heap": [
        {
          "object": "1",
          "type": "list",
          "items": [
            10,
            2,
            3,
            4
          ]
        }
      ]
    },
    {
      "event": "return",
      "line": 4,
      "stdout": "[10, 2, 3, 4]\n"
    }
  ],
  "error": null
}
```

### python-nested-list

Source fixture: fixtures/api-traces/python-nested-list.json

Request body

```json
{
  "code": "grid = [[1, 2], [3, 4]]\ngrid[0][1] = 9\nprint(grid)",
  "language": "python"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "[[1, 9], [3, 4]]\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2,
      "variables": {
        "grid": {
          "ref": 1
        }
      },
      "heap": [
        {
          "object": "1",
          "type": "list",
          "items": [
            {
              "ref": 2
            },
            {
              "ref": 3
            }
          ]
        },
        {
          "object": "2",
          "type": "list",
          "items": [
            1,
            2
          ]
        },
        {
          "object": "3",
          "type": "list",
          "items": [
            3,
            4
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 3,
      "heap": [
        {
          "object": "2",
          "type": "list",
          "items": [
            1,
            9
          ]
        }
      ]
    },
    {
      "event": "return",
      "line": 3,
      "stdout": "[[1, 9], [3, 4]]\n"
    }
  ],
  "error": null
}
```

### python-queue-deque

Source fixture: fixtures/api-traces/python-queue-deque.json

Request body

```json
{
  "code": "from collections import deque\nqueue = deque([1, 2])\nqueue.append(3)\nfirst = queue.popleft()\nprint(first, list(queue))",
  "language": "python"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "1 [2, 3]\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2
    },
    {
      "event": "line",
      "line": 3,
      "variables": {
        "queue": {
          "ref": 1
        }
      },
      "heap": [
        {
          "object": "1",
          "value": [
            "INSTANCE_PPRINT",
            "deque",
            "deque([1, 2])"
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 4,
      "heap": [
        {
          "object": "1",
          "value": [
            "INSTANCE_PPRINT",
            "deque",
            "deque([1, 2, 3])"
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 5,
      "variables": {
        "queue": {
          "ref": 1
        },
        "first": 1
      },
      "heap": [
        {
          "object": "1",
          "value": [
            "INSTANCE_PPRINT",
            "deque",
            "deque([2, 3])"
          ]
        }
      ]
    },
    {
      "event": "return",
      "line": 5,
      "stdout": "1 [2, 3]\n"
    }
  ],
  "error": null
}
```

### python-recursion

Source fixture: fixtures/api-traces/python-recursion.json

Request body

```json
{
  "code": "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\nprint(factorial(5))",
  "language": "python"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "120\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 5
    },
    {
      "event": "call",
      "line": 1,
      "function": "factorial"
    },
    {
      "event": "line",
      "line": 2,
      "function": "factorial"
    },
    {
      "event": "line",
      "line": 4,
      "function": "factorial"
    },
    {
      "event": "call",
      "line": 1,
      "function": "factorial"
    },
    {
      "event": "line",
      "line": 2,
      "function": "factorial"
    },
    {
      "event": "line",
      "line": 4,
      "function": "factorial"
    },
    {
      "event": "call",
      "line": 1,
      "function": "factorial"
    },
    {
      "event": "line",
      "line": 2,
      "function": "factorial"
    },
    {
      "event": "line",
      "line": 4,
      "function": "factorial"
    },
    {
      "event": "call",
      "line": 1,
      "function": "factorial"
    },
    {
      "event": "line",
      "line": 2,
      "function": "factorial"
    },
    {
      "event": "line",
      "line": 4,
      "function": "factorial"
    },
    {
      "event": "call",
      "line": 1,
      "function": "factorial"
    },
    {
      "event": "line",
      "line": 2,
      "function": "factorial"
    },
    {
      "event": "line",
      "line": 3,
      "function": "factorial"
    },
    {
      "event": "return",
      "line": 3,
      "function": "factorial"
    },
    {
      "event": "return",
      "line": 4,
      "function": "factorial"
    },
    {
      "event": "return",
      "line": 4,
      "function": "factorial"
    },
    {
      "event": "return",
      "line": 4,
      "function": "factorial"
    },
    {
      "event": "return",
      "line": 4,
      "function": "factorial"
    },
    {
      "event": "return",
      "line": 5,
      "stdout": "120\n"
    }
  ],
  "error": null
}
```

### python-runtime-error

Source fixture: fixtures/api-traces/python-runtime-error.json

Request body

```json
{
  "code": "values = [1]\nprint(values[2])",
  "language": "python"
}
```

Backend response

```json
{
  "status": "error",
  "stdout": "",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2,
      "variables": {
        "values": {
          "ref": 1
        }
      },
      "heap": [
        {
          "object": "1",
          "type": "list",
          "items": [
            1
          ]
        }
      ]
    },
    {
      "event": "exception",
      "line": 2
    }
  ],
  "error": {
    "type": "ExecutionError",
    "message": "An exception occurred during code execution."
  }
}
```

### python-singly-linked-insert-delete

Source fixture: fixtures/api-traces/python-singly-linked-insert-delete.json

Request body

```json
{
  "code": "class Node: pass\nhead = Node()\nhead.value = 1\nhead.next = Node()\nhead.next.value = 3\nmiddle = Node()\nmiddle.value = 2\nmiddle.next = head.next\nhead.next = middle\nhead.next = head.next.next\nprint(head.value, head.next.value)",
  "language": "python"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "1 3\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2
    },
    {
      "event": "line",
      "line": 3,
      "variables": {
        "head": {
          "ref": 1
        }
      }
    },
    {
      "event": "line",
      "line": 4,
      "heap": [
        {
          "object": "1",
          "type": "object",
          "class": "Node",
          "changes": {
            "value": 1
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 5,
      "heap": [
        {
          "object": "1",
          "type": "object",
          "class": "Node",
          "changes": {
            "next": {
              "ref": 2
            },
            "value": 1
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 6,
      "heap": [
        {
          "object": "2",
          "type": "object",
          "class": "Node",
          "changes": {
            "value": 3
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 7,
      "variables": {
        "head": {
          "ref": 1
        },
        "middle": {
          "ref": 3
        }
      }
    },
    {
      "event": "line",
      "line": 8,
      "heap": [
        {
          "object": "3",
          "type": "object",
          "class": "Node",
          "changes": {
            "value": 2
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 9,
      "heap": [
        {
          "object": "3",
          "type": "object",
          "class": "Node",
          "changes": {
            "next": {
              "ref": 2
            },
            "value": 2
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 10,
      "heap": [
        {
          "object": "1",
          "type": "object",
          "class": "Node",
          "changes": {
            "next": {
              "ref": 3
            },
            "value": 1
          }
        }
      ]
    },
    {
      "event": "line",
      "line": 11,
      "heap": [
        {
          "object": "1",
          "type": "object",
          "class": "Node",
          "changes": {
            "next": {
              "ref": 2
            },
            "value": 1
          }
        }
      ]
    },
    {
      "event": "return",
      "line": 11,
      "stdout": "1 3\n"
    }
  ],
  "error": null
}
```

### python-stack-list

Source fixture: fixtures/api-traces/python-stack-list.json

Request body

```json
{
  "code": "stack = []\nstack.append(\"a\")\nstack.append(\"b\")\ntop = stack.pop()\nprint(top, stack)",
  "language": "python"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "b ['a']\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2,
      "variables": {
        "stack": {
          "ref": 1
        }
      },
      "heap": [
        {
          "object": "1",
          "value": [
            "LIST"
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 3,
      "heap": [
        {
          "object": "1",
          "type": "list",
          "items": [
            "a"
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 4,
      "heap": [
        {
          "object": "1",
          "type": "list",
          "items": [
            "a",
            "b"
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 5,
      "variables": {
        "stack": {
          "ref": 1
        },
        "top": "b"
      },
      "heap": [
        {
          "object": "1",
          "type": "list",
          "items": [
            "a"
          ]
        }
      ]
    },
    {
      "event": "return",
      "line": 5,
      "stdout": "b ['a']\n"
    }
  ],
  "error": null
}
```

### python-trie-minimal

Source fixture: fixtures/api-traces/python-trie-minimal.json

Request body

```json
{
  "language": "python",
  "code": "trie = {}\ntrie.setdefault(\"c\", {}).setdefault(\"a\", {})[\"t\"] = True\nprint(trie.get(\"c\", {}).get(\"a\", {}).get(\"t\", False))"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "True\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2,
      "variables": {
        "trie": {
          "ref": 1
        }
      },
      "heap": [
        {
          "object": "1",
          "value": [
            "DICT"
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 3,
      "heap": [
        {
          "object": "1",
          "type": "dict",
          "entries": [
            {
              "key": "c",
              "value": {
                "ref": 2
              }
            }
          ]
        },
        {
          "object": "2",
          "type": "dict",
          "entries": [
            {
              "key": "a",
              "value": {
                "ref": 3
              }
            }
          ]
        },
        {
          "object": "3",
          "type": "dict",
          "entries": [
            {
              "key": "t",
              "value": true
            }
          ]
        }
      ]
    },
    {
      "event": "return",
      "line": 3,
      "stdout": "True\n"
    }
  ],
  "error": null
}
```

### python-trie-prefix

Source fixture: fixtures/api-traces/python-trie-prefix.json

Request body

```json
{
  "code": "root = {}\nfor word in [\"cat\", \"car\"]:\n    node = root\n    for char in word:\n        if char not in node:\n            node[char] = {}\n        node = node[char]\n    node[\"$\"] = True\nnode = root\nfor char in \"cat\":\n    node = node.get(char, {})\nprint(\"$\" in node, \"r\" in root[\"c\"])",
  "language": "python"
}
```

Backend response

```json
{
  "status": "error",
  "stdout": null,
  "trace": null,
  "error": {
    "message": "Docker execution failed: Code execution timed out after 5 seconds",
    "type": "RuntimeException"
  }
}
```

### python-tuple-set

Source fixture: fixtures/api-traces/python-tuple-set.json

Request body

```json
{
  "code": "coords = (2, 3)\nunique = {1, 2, 2}\nprint(coords, sorted(unique))",
  "language": "python"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "(2, 3) [1, 2]\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2,
      "variables": {
        "coords": {
          "ref": 1
        }
      },
      "heap": [
        {
          "object": "1",
          "value": [
            "TUPLE",
            2,
            3
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 3,
      "variables": {
        "coords": {
          "ref": 1
        },
        "unique": {
          "ref": 2
        }
      },
      "heap": [
        {
          "object": "2",
          "value": [
            "SET",
            1,
            2
          ]
        }
      ]
    },
    {
      "event": "return",
      "line": 3,
      "stdout": "(2, 3) [1, 2]\n"
    }
  ],
  "error": null
}
```

### python-union-find-minimal

Source fixture: fixtures/api-traces/python-union-find-minimal.json

Request body

```json
{
  "language": "python",
  "code": "parent = [0, 1, 2]\nparent[1] = 0\nparent[2] = 1\nwhile parent[2] != parent[parent[2]]:\n    parent[2] = parent[parent[2]]\nprint(parent[0] == parent[parent[2]])"
}
```

Backend response

```json
{
  "status": "success",
  "stdout": "True\n",
  "trace": [
    {
      "event": "line",
      "line": 1
    },
    {
      "event": "line",
      "line": 2,
      "variables": {
        "parent": {
          "ref": 1
        }
      },
      "heap": [
        {
          "object": "1",
          "type": "list",
          "items": [
            0,
            1,
            2
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 3,
      "heap": [
        {
          "object": "1",
          "type": "list",
          "items": [
            0,
            0,
            2
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 4,
      "heap": [
        {
          "object": "1",
          "type": "list",
          "items": [
            0,
            0,
            1
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 5
    },
    {
      "event": "line",
      "line": 4,
      "heap": [
        {
          "object": "1",
          "type": "list",
          "items": [
            0,
            0,
            0
          ]
        }
      ]
    },
    {
      "event": "line",
      "line": 6
    },
    {
      "event": "return",
      "line": 6,
      "stdout": "True\n"
    }
  ],
  "error": null
}
```

### python-union-find

Source fixture: fixtures/api-traces/python-union-find.json

Request body

```json
{
  "code": "parent = [0, 1, 2, 3]\ndef find(x):\n    if parent[x] != x:\n        parent[x] = find(parent[x])\n    return parent[x]\ndef union(a, b):\n    parent[find(a)] = find(b)\nunion(0, 1)\nunion(2, 3)\nunion(1, 2)\nprint(find(0) == find(3), parent)",
  "language": "python"
}
```

Backend response

```json
{
  "status": "error",
  "stdout": null,
  "trace": null,
  "error": {
    "message": "Docker execution failed: Code execution timed out after 5 seconds",
    "type": "RuntimeException"
  }
}
```

## Other API cases

### api-unsupported-language

Source fixture: fixtures/api-traces/api-unsupported-language.json

Request body

```json
{
  "language": "javascript",
  "code": "console.log(1)"
}
```

Backend response

```json
{
  "status": "error",
  "stdout": null,
  "trace": null,
  "error": null
}
```



