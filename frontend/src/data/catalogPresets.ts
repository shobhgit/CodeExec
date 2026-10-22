import { PresetItem } from '../types/tracer';

export const CATALOG_PRESETS: PresetItem[] = [
  {
    "id": "lc-1-two-sum-py",
    "name": "LC 1: Two Sum (Python)",
    "title": "LC 1: Two Sum",
    "difficulty": "Easy",
    "category": "Arrays & Lists",
    "language": "python",
    "code": "nums = [2, 7, 11, 15]\ntarget = 9\nseen = {}\nresult = []\n\nfor i, num in enumerate(nums):\n    complement = target - num\n    if complement in seen:\n        result = [seen[complement], i]\n        break\n    seen[num] = i\n\nprint(\"Two Sum Indices:\", result)",
    "cachedResponse": {
      "status": "success",
      "stdout": "Two Sum Indices: [0, 1]\n",
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
                2,
                7,
                11,
                15
              ]
            }
          ]
        },
        {
          "event": "line",
          "line": 3,
          "variables": {
            "nums": {
              "ref": 1
            },
            "target": 9
          }
        },
        {
          "event": "line",
          "line": 4,
          "variables": {
            "nums": {
              "ref": 1
            },
            "target": 9,
            "seen": {
              "ref": 2
            }
          },
          "heap": [
            {
              "object": "2",
              "value": [
                "DICT"
              ]
            }
          ]
        },
        {
          "event": "line",
          "line": 6,
          "variables": {
            "nums": {
              "ref": 1
            },
            "target": 9,
            "seen": {
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
          "line": 7,
          "variables": {
            "nums": {
              "ref": 1
            },
            "target": 9,
            "seen": {
              "ref": 2
            },
            "result": {
              "ref": 3
            },
            "i": 0,
            "num": 2
          }
        },
        {
          "event": "line",
          "line": 8,
          "variables": {
            "nums": {
              "ref": 1
            },
            "target": 9,
            "seen": {
              "ref": 2
            },
            "result": {
              "ref": 3
            },
            "i": 0,
            "num": 2,
            "complement": 7
          }
        },
        {
          "event": "line",
          "line": 11
        },
        {
          "event": "line",
          "line": 6,
          "heap": [
            {
              "object": "2",
              "type": "dict",
              "entries": [
                {
                  "key": 2,
                  "value": 0
                }
              ]
            }
          ]
        },
        {
          "event": "line",
          "line": 7,
          "variables": {
            "nums": {
              "ref": 1
            },
            "target": 9,
            "seen": {
              "ref": 2
            },
            "result": {
              "ref": 3
            },
            "i": 1,
            "num": 7,
            "complement": 7
          }
        },
        {
          "event": "line",
          "line": 8,
          "variables": {
            "nums": {
              "ref": 1
            },
            "target": 9,
            "seen": {
              "ref": 2
            },
            "result": {
              "ref": 3
            },
            "i": 1,
            "num": 7,
            "complement": 2
          }
        },
        {
          "event": "line",
          "line": 9
        },
        {
          "event": "line",
          "line": 10,
          "variables": {
            "nums": {
              "ref": 1
            },
            "target": 9,
            "seen": {
              "ref": 2
            },
            "result": {
              "ref": 4
            },
            "i": 1,
            "num": 7,
            "complement": 2
          },
          "heap": [
            {
              "object": "4",
              "type": "list",
              "items": [
                0,
                1
              ]
            }
          ]
        },
        {
          "event": "line",
          "line": 13
        },
        {
          "event": "return",
          "line": 13,
          "stdout": "Two Sum Indices: [0, 1]\n"
        }
      ],
      "error": null
    }
  },
  {
    "id": "lc-1-two-sum-java",
    "name": "LC 1: Two Sum (Java)",
    "title": "LC 1: Two Sum (Java HashMap)",
    "difficulty": "Easy",
    "category": "Arrays & Lists",
    "language": "java",
    "code": "import java.util.HashMap;\npublic class Main {\n    public static void main(String[] args) {\n        HashMap<String, Integer> scores = new HashMap<>();\n        scores.put(\"ada\", 3);\n        scores.put(\"linus\", 4);\n        System.out.println(scores.get(\"ada\") + scores.get(\"linus\"));\n    }\n}",
    "cachedResponse": {
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
  },
  {
    "id": "lc-26-remove-duplicates-py",
    "name": "LC 26: Remove Duplicates (Python)",
    "title": "LC 26: Remove Duplicates from Sorted Array",
    "difficulty": "Easy",
    "category": "Arrays & Lists",
    "language": "python",
    "code": "nums = [1, 1, 2, 2, 3]\nk = 1\nfor i in range(1, len(nums)):\n    if nums[i] != nums[i - 1]:\n        nums[k] = nums[i]\n        k += 1\n\nprint(\"Unique count:\", k, \"Array:\", nums[:k])",
    "cachedResponse": {
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
  },
  {
    "id": "lc-26-remove-duplicates-java",
    "name": "LC 26: Remove Duplicates (Java)",
    "title": "LC 26: Remove Duplicates (Java Array)",
    "difficulty": "Easy",
    "category": "Arrays & Lists",
    "language": "java",
    "code": "public class Main {\n    public static void main(String[] args) {\n        int[] values = {1, 2, 3};\n        values[1] = 9;\n        System.out.println(values[1]);\n    }\n}",
    "cachedResponse": {
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
  },
  {
    "id": "lc-121-stock-py",
    "name": "LC 121: Buy/Sell Stock",
    "title": "LC 121: Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "category": "Arrays & Lists",
    "language": "python",
    "code": "prices = [7, 1, 5, 3, 6, 4]\nmin_price = prices[0]\nmax_profit = 0\n\nfor price in prices:\n    if price < min_price:\n        min_price = price\n    elif price - min_price > max_profit:\n        max_profit = price - min_price\n\nprint(\"Max Profit:\", max_profit)",
    "cachedResponse": {
      "status": "success",
      "stdout": "Max Profit: 5\n",
      "trace": [
        {
          "event": "line",
          "line": 1
        },
        {
          "event": "line",
          "line": 2,
          "variables": {
            "prices": {
              "ref": 1
            }
          },
          "heap": [
            {
              "object": "1",
              "type": "list",
              "items": [
                7,
                1,
                5,
                3,
                6,
                4
              ]
            }
          ]
        },
        {
          "event": "line",
          "line": 3,
          "variables": {
            "prices": {
              "ref": 1
            },
            "min_price": 7
          }
        },
        {
          "event": "line",
          "line": 5,
          "variables": {
            "prices": {
              "ref": 1
            },
            "min_price": 7,
            "max_profit": 0
          }
        },
        {
          "event": "line",
          "line": 6,
          "variables": {
            "prices": {
              "ref": 1
            },
            "min_price": 7,
            "max_profit": 0,
            "price": 7
          }
        },
        {
          "event": "line",
          "line": 8
        },
        {
          "event": "line",
          "line": 5
        },
        {
          "event": "line",
          "line": 6,
          "variables": {
            "prices": {
              "ref": 1
            },
            "min_price": 7,
            "max_profit": 0,
            "price": 1
          }
        },
        {
          "event": "line",
          "line": 7
        },
        {
          "event": "line",
          "line": 5,
          "variables": {
            "prices": {
              "ref": 1
            },
            "min_price": 1,
            "max_profit": 0,
            "price": 1
          }
        },
        {
          "event": "line",
          "line": 6,
          "variables": {
            "prices": {
              "ref": 1
            },
            "min_price": 1,
            "max_profit": 0,
            "price": 5
          }
        },
        {
          "event": "line",
          "line": 8
        },
        {
          "event": "line",
          "line": 9
        },
        {
          "event": "line",
          "line": 5,
          "variables": {
            "prices": {
              "ref": 1
            },
            "min_price": 1,
            "max_profit": 4,
            "price": 5
          }
        },
        {
          "event": "line",
          "line": 6,
          "variables": {
            "prices": {
              "ref": 1
            },
            "min_price": 1,
            "max_profit": 4,
            "price": 3
          }
        },
        {
          "event": "line",
          "line": 8
        },
        {
          "event": "line",
          "line": 5
        },
        {
          "event": "line",
          "line": 6,
          "variables": {
            "prices": {
              "ref": 1
            },
            "min_price": 1,
            "max_profit": 4,
            "price": 6
          }
        },
        {
          "event": "line",
          "line": 8
        },
        {
          "event": "line",
          "line": 9
        },
        {
          "event": "line",
          "line": 5,
          "variables": {
            "prices": {
              "ref": 1
            },
            "min_price": 1,
            "max_profit": 5,
            "price": 6
          }
        },
        {
          "event": "line",
          "line": 6,
          "variables": {
            "prices": {
              "ref": 1
            },
            "min_price": 1,
            "max_profit": 5,
            "price": 4
          }
        },
        {
          "event": "line",
          "line": 8
        },
        {
          "event": "line",
          "line": 5
        },
        {
          "event": "line",
          "line": 11
        },
        {
          "event": "return",
          "line": 11,
          "stdout": "Max Profit: 5\n"
        }
      ],
      "error": null
    }
  },
  {
    "id": "lc-704-binary-search-py",
    "name": "LC 704: Binary Search",
    "title": "LC 704: Binary Search (Left, Mid, Right)",
    "difficulty": "Easy",
    "category": "Arrays & Lists",
    "language": "python",
    "code": "nums = [-1, 0, 3, 5, 9, 12]\ntarget = 9\nleft = 0\nright = len(nums) - 1\nfound_idx = -1\n\nwhile left <= right:\n    mid = (left + right) // 2\n    if nums[mid] == target:\n        found_idx = mid\n        break\n    elif nums[mid] < target:\n        left = mid + 1\n    else:\n        right = mid - 1\n\nprint(\"Target found at index:\", found_idx)",
    "cachedResponse": {
      "status": "success",
      "stdout": "Target found at index: 4\n",
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
                -1,
                0,
                3,
                5,
                9,
                12
              ]
            }
          ]
        },
        {
          "event": "line",
          "line": 3,
          "variables": {
            "nums": {
              "ref": 1
            },
            "target": 9
          }
        },
        {
          "event": "line",
          "line": 4,
          "variables": {
            "nums": {
              "ref": 1
            },
            "target": 9,
            "left": 0
          }
        },
        {
          "event": "line",
          "line": 5,
          "variables": {
            "nums": {
              "ref": 1
            },
            "target": 9,
            "left": 0,
            "right": 5
          }
        },
        {
          "event": "line",
          "line": 7,
          "variables": {
            "nums": {
              "ref": 1
            },
            "target": 9,
            "left": 0,
            "right": 5,
            "found_idx": -1
          }
        },
        {
          "event": "line",
          "line": 8
        },
        {
          "event": "line",
          "line": 9,
          "variables": {
            "nums": {
              "ref": 1
            },
            "target": 9,
            "left": 0,
            "right": 5,
            "found_idx": -1,
            "mid": 2
          }
        },
        {
          "event": "line",
          "line": 12
        },
        {
          "event": "line",
          "line": 13
        },
        {
          "event": "line",
          "line": 7,
          "variables": {
            "nums": {
              "ref": 1
            },
            "target": 9,
            "left": 3,
            "right": 5,
            "found_idx": -1,
            "mid": 2
          }
        },
        {
          "event": "line",
          "line": 8
        },
        {
          "event": "line",
          "line": 9,
          "variables": {
            "nums": {
              "ref": 1
            },
            "target": 9,
            "left": 3,
            "right": 5,
            "found_idx": -1,
            "mid": 4
          }
        },
        {
          "event": "line",
          "line": 10
        },
        {
          "event": "line",
          "line": 11,
          "variables": {
            "nums": {
              "ref": 1
            },
            "target": 9,
            "left": 3,
            "right": 5,
            "found_idx": 4,
            "mid": 4
          }
        },
        {
          "event": "line",
          "line": 17
        },
        {
          "event": "return",
          "line": 17,
          "stdout": "Target found at index: 4\n"
        }
      ],
      "error": null
    }
  },
  {
    "id": "lc-73-matrix-2d-py",
    "name": "LC 73: 2D Matrix Coordinates",
    "title": "LC 73: 2D Matrix Grid Manipulation",
    "difficulty": "Medium",
    "category": "Arrays & Lists",
    "language": "python",
    "code": "grid = [[1, 2], [3, 4]]\ngrid[0][1] = 9\nprint(grid)",
    "cachedResponse": {
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
  },
  {
    "id": "lc-73-matrix-2d-java",
    "name": "LC 73: 2D Matrix Grid (Java)",
    "title": "LC 73: 2D Nested Array (Java)",
    "difficulty": "Medium",
    "category": "Arrays & Lists",
    "language": "java",
    "code": "public class Main {\n    public static void main(String[] args) {\n        int[][] grid = {{1, 2}, {3, 4}};\n        grid[1][0] = 8;\n        System.out.println(grid[1][0]);\n    }\n}",
    "cachedResponse": {
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
  },
  {
    "id": "lc-206-reverse-linked-list-py",
    "name": "LC 206: Reverse Linked List (Python)",
    "title": "LC 206: Reverse Linked List (Python Node Chain)",
    "difficulty": "Easy",
    "category": "Linked Lists",
    "language": "python",
    "code": "class Node:\n    def __init__(self, value):\n        self.value = value\n        self.next = None\na = Node(1)\nb = Node(2)\na.next = b\nprint(a.value, a.next.value)",
    "cachedResponse": {
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
  },
  {
    "id": "lc-21-merge-sorted-lists-py",
    "name": "LC 21: Merge Two Sorted Lists",
    "title": "LC 21: Merge & Splice Linked Nodes",
    "difficulty": "Easy",
    "category": "Linked Lists",
    "language": "python",
    "code": "class Node: pass\nhead = Node()\nhead.value = 1\nhead.next = Node()\nhead.next.value = 3\nmiddle = Node()\nmiddle.value = 2\nmiddle.next = head.next\nhead.next = middle\nhead.next = head.next.next\nprint(head.value, head.next.value)",
    "cachedResponse": {
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
  },
  {
    "id": "lc-146-lru-cache-doubly-py",
    "name": "LC 146: LRU Cache Doubly Linked List",
    "title": "LC 146: Doubly Linked List (Python Prev/Next)",
    "difficulty": "Medium",
    "category": "Linked Lists",
    "language": "python",
    "code": "class Node: pass\nfirst = Node()\nfirst.value = 1\nmiddle = Node()\nmiddle.value = 2\nlast = Node()\nlast.value = 3\nfirst.next = middle\nmiddle.prev = first\nmiddle.next = last\nlast.prev = middle\nprint(first.value, first.next.value, last.value, last.prev.prev is first)",
    "cachedResponse": {
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
  },
  {
    "id": "lc-146-lru-cache-doubly-java",
    "name": "LC 146: Doubly Linked List (Java)",
    "title": "LC 146: Doubly Linked Nodes (Java)",
    "difficulty": "Medium",
    "category": "Linked Lists",
    "language": "java",
    "code": "public class Main {\n    static class Node { int value; Node prev, next; Node(int value) { this.value = value; } }\n    public static void main(String[] args) {\n        Node first = new Node(1), middle = new Node(2), last = new Node(3);\n        first.next = middle; middle.prev = first; middle.next = last; last.prev = middle;\n        System.out.println(first.value + \" \" + first.next.value + \" \" + last.value + \" \" + (last.prev.prev == first));\n    }\n}",
    "cachedResponse": {
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
  },
  {
    "id": "lc-linked-list-jdk-java",
    "name": "JDK LinkedList Operations",
    "title": "LC 237: Linked List Operations (Java)",
    "difficulty": "Easy",
    "category": "Linked Lists",
    "language": "java",
    "code": "import java.util.LinkedList;\npublic class Main {\n    public static void main(String[] args) {\n        LinkedList<Integer> values = new LinkedList<>();\n        values.add(1); values.add(3); values.add(1, 2); values.removeLast();\n        System.out.println(values.getFirst() + \" \" + values.getLast() + \" \" + values.size());\n    }\n}",
    "cachedResponse": {
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
  },
  {
    "id": "lc-20-valid-parentheses-py",
    "name": "LC 20: Valid Parentheses (Python)",
    "title": "LC 20: Valid Parentheses (Python Stack)",
    "difficulty": "Easy",
    "category": "Stacks",
    "language": "python",
    "code": "stack = []\nstack.append(\"a\")\nstack.append(\"b\")\ntop = stack.pop()\nprint(top, stack)",
    "cachedResponse": {
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
  },
  {
    "id": "lc-20-valid-parentheses-java",
    "name": "LC 20: Valid Parentheses (Java)",
    "title": "LC 20: Valid Parentheses (Java Stack Class)",
    "difficulty": "Easy",
    "category": "Stacks",
    "language": "java",
    "code": "import java.util.Stack;\npublic class Main {\n    public static void main(String[] args) {\n        Stack<String> values = new Stack<>();\n        values.push(\"a\"); values.push(\"b\");\n        String top = values.pop();\n        System.out.println(top + \" \" + values.peek());\n    }\n}",
    "cachedResponse": {
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
  },
  {
    "id": "lc-232-queue-using-stacks-py",
    "name": "LC 232: Implement Queue (Python)",
    "title": "LC 232: Queue FIFO Conveyor (Python)",
    "difficulty": "Easy",
    "category": "Queues",
    "language": "python",
    "code": "from collections import deque\nqueue = deque([1, 2])\nqueue.append(3)\nfirst = queue.popleft()\nprint(first, list(queue))",
    "cachedResponse": {
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
  },
  {
    "id": "lc-232-queue-java",
    "name": "LC 232: Queue ArrayDeque (Java)",
    "title": "LC 232: Queue ArrayDeque (Java)",
    "difficulty": "Easy",
    "category": "Queues",
    "language": "java",
    "code": "import java.util.ArrayDeque;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayDeque<Integer> queue = new ArrayDeque<>();\n        queue.add(4);\n        queue.add(8);\n        int first = queue.remove();\n        System.out.println(first + queue.peek());\n    }\n}",
    "cachedResponse": {
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
  },
  {
    "id": "lc-622-circular-queue-py",
    "name": "LC 622: Circular Queue (Python)",
    "title": "LC 622: Design Circular Queue (Python Ring Buffer)",
    "difficulty": "Medium",
    "category": "Circular Queues",
    "language": "python",
    "code": "data = [None, None, None]\nfront = 0\nsize = 0\ndata[(front + size) % 3] = 1\nsize += 1\ndata[(front + size) % 3] = 2\nsize += 1\nfront = (front + 1) % 3\nsize -= 1\ndata[(front + size) % 3] = 3\nsize += 1\nprint([data[(front + i) % 3] for i in range(size)], size)",
    "cachedResponse": {
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
  },
  {
    "id": "lc-622-circular-queue-java",
    "name": "LC 622: Circular Queue (Java)",
    "title": "LC 622: Design Circular Queue (Java Modulo)",
    "difficulty": "Medium",
    "category": "Circular Queues",
    "language": "java",
    "code": "import java.util.Arrays;\npublic class Main {\n    static class CircularQueue {\n        int[] data = new int[3]; int front, size;\n        void add(int value) { data[(front + size) % data.length] = value; size++; }\n        int remove() { int value = data[front]; front = (front + 1) % data.length; size--; return value; }\n        public String toString() { int[] out = new int[size]; for (int i = 0; i < size; i++) out[i] = data[(front + i) % data.length]; return Arrays.toString(out); }\n    }\n    public static void main(String[] args) {\n        CircularQueue queue = new CircularQueue(); queue.add(1); queue.add(2); queue.remove(); queue.add(3);\n        System.out.println(queue + \" \" + queue.size);\n    }\n}",
    "cachedResponse": {
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
  },
  {
    "id": "lc-226-invert-tree-py",
    "name": "LC 226: Invert Binary Tree (Python)",
    "title": "LC 226: Invert Binary Tree (Python)",
    "difficulty": "Easy",
    "category": "Trees & BST",
    "language": "python",
    "code": "class Node: pass\nroot = Node()\nroot.value = 2\nroot.left = Node()\nroot.left.value = 1\nroot.right = Node()\nroot.right.value = 3\nprint(root.left.value + root.value + root.right.value)",
    "cachedResponse": {
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
  },
  {
    "id": "lc-226-invert-tree-java",
    "name": "LC 226: Invert Binary Tree (Java)",
    "title": "LC 226: Invert Binary Tree (Java Node Structure)",
    "difficulty": "Easy",
    "category": "Trees & BST",
    "language": "java",
    "code": "public class Main {\n    static class Node {\n        int value;\n        Node left;\n        Node right;\n        Node(int value) { this.value = value; }\n    }\n    public static void main(String[] args) {\n        Node root = new Node(2);\n        root.left = new Node(1);\n        root.right = new Node(3);\n        System.out.println(root.left.value + root.value + root.right.value);\n    }\n}",
    "cachedResponse": {
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
  },
  {
    "id": "lc-700-search-bst-py",
    "name": "LC 700: Search in BST (Python)",
    "title": "LC 700: Search & Insert in BST (Python)",
    "difficulty": "Easy",
    "category": "Trees & BST",
    "language": "python",
    "code": "root = {\"v\": 8, \"l\": {\"v\": 3, \"l\": None, \"r\": None}, \"r\": {\"v\": 10, \"l\": None, \"r\": None}}\nvalue = 4\nparent = root[\"l\"]\nnode = {\"v\": value, \"l\": None, \"r\": None}\nif value < parent[\"v\"]:\n    parent[\"l\"] = node\nelse:\n    parent[\"r\"] = node\ncurrent = root[\"l\"]\nif value > current[\"v\"]:\n    current = current[\"r\"]\nprint(current[\"v\"] == value)",
    "cachedResponse": {
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
  },
  {
    "id": "lc-700-search-bst-java",
    "name": "LC 700: Search in BST (Java)",
    "title": "LC 700: Search in BST (Java)",
    "difficulty": "Easy",
    "category": "Trees & BST",
    "language": "java",
    "code": "public class Main {\n    static class Node { int value; Node left, right; Node(int value) { this.value = value; } }\n    static Node insert(Node root, int value) {\n        if (root == null) return new Node(value);\n        if (value < root.value) root.left = insert(root.left, value);\n        else root.right = insert(root.right, value);\n        return root;\n    }\n    static boolean contains(Node root, int value) {\n        while (root != null) {\n            if (root.value == value) return true;\n            root = value < root.value ? root.left : root.right;\n        }\n        return false;\n    }\n    public static void main(String[] args) {\n        Node root = null;\n        for (int value : new int[]{8, 3, 10, 6, 4}) root = insert(root, value);\n        System.out.println(contains(root, 4) + \" \" + root.left.left.value);\n    }\n}",
    "cachedResponse": {
      "status": "error",
      "stdout": null,
      "trace": null,
      "error": {
        "message": "Docker execution failed: Code execution timed out after 5 seconds",
        "type": "RuntimeException"
      }
    }
  },
  {
    "id": "lc-701-insert-bst-java",
    "name": "LC 701: Insert into BST (Java)",
    "title": "LC 701: BST Structure & Insertion (Java)",
    "difficulty": "Medium",
    "category": "Trees & BST",
    "language": "java",
    "code": "public class Main {\n    static class N { int v; N l, r; N(int v) { this.v = v; } }\n    public static void main(String[] args) {\n        N root = new N(8); root.l = new N(3); root.r = new N(10);\n        int value = 4; N node = root; N parent = null;\n        while (node != null) { parent = node; node = value < node.v ? node.l : node.r; }\n        if (value < parent.v) parent.l = new N(value); else parent.r = new N(value);\n        System.out.println(parent.r.v == value);\n    }\n}",
    "cachedResponse": {
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
  },
  {
    "id": "lc-1046-last-stone-weight-py",
    "name": "LC 1046: Last Stone Weight (Python)",
    "title": "LC 1046: Priority Queue Heap (Python heapq)",
    "difficulty": "Easy",
    "category": "Heaps",
    "language": "python",
    "code": "import heapq\nvalues = [7, 2, 5]\nheapq.heapify(values)\nheapq.heappush(values, 1)\nresult = []\nwhile values:\n    result.append(heapq.heappop(values))\nprint(result)",
    "cachedResponse": {
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
  },
  {
    "id": "lc-215-kth-largest-java",
    "name": "LC 215: Kth Largest Element (Java)",
    "title": "LC 215: Kth Largest (Java PriorityQueue)",
    "difficulty": "Medium",
    "category": "Heaps",
    "language": "java",
    "code": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        PriorityQueue<Integer> values = new PriorityQueue<>(Arrays.asList(7, 2, 5));\n        values.add(1);\n        List<Integer> result = new ArrayList<>();\n        while (!values.isEmpty()) result.add(values.remove());\n        System.out.println(result);\n    }\n}",
    "cachedResponse": {
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
  },
  {
    "id": "lc-242-valid-anagram-py",
    "name": "LC 242: Valid Anagram (Python)",
    "title": "LC 242: Valid Anagram (Python Dictionary)",
    "difficulty": "Easy",
    "category": "Hash Maps & Dicts",
    "language": "python",
    "code": "scores = {\"ada\": 1, \"linus\": 2}\nscores[\"ada\"] = 3\nprint(scores)",
    "cachedResponse": {
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
  },
  {
    "id": "lc-217-contains-duplicate-py",
    "name": "LC 217: Contains Duplicate (Python)",
    "title": "LC 217: Contains Duplicate (Python Set)",
    "difficulty": "Easy",
    "category": "Sets & Tuples",
    "language": "python",
    "code": "coords = (2, 3)\nunique = {1, 2, 2}\nprint(coords, sorted(unique))",
    "cachedResponse": {
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
  },
  {
    "id": "lc-217-contains-duplicate-java",
    "name": "LC 217: Contains Duplicate (Java)",
    "title": "LC 217: Contains Duplicate (Java HashSet)",
    "difficulty": "Easy",
    "category": "Sets & Tuples",
    "language": "java",
    "code": "import java.util.HashSet;\npublic class Main {\n    public static void main(String[] args) {\n        HashSet<Integer> values = new HashSet<>();\n        values.add(2);\n        values.add(5);\n        System.out.println(values.size());\n    }\n}",
    "cachedResponse": {
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
  },
  {
    "id": "lc-207-course-schedule-py",
    "name": "LC 207: Course Schedule (Python)",
    "title": "LC 207: Course Schedule (Directed Cycle Graph)",
    "difficulty": "Medium",
    "category": "Graphs & Cycles",
    "language": "python",
    "code": "class Node: pass\na = Node()\nb = Node()\nc = Node()\na.next = b\nb.next = c\nc.next = a\nprint(c.next is a and a.next.next is c)",
    "cachedResponse": {
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
  },
  {
    "id": "lc-207-course-schedule-java",
    "name": "LC 207: Course Schedule (Java)",
    "title": "LC 207: Graph Directed Cycle (Java)",
    "difficulty": "Medium",
    "category": "Graphs & Cycles",
    "language": "java",
    "code": "public class Main {\n    static class N { N next; }\n    public static void main(String[] args) {\n        N a = new N(), b = new N(), c = new N();\n        a.next = b; b.next = c; c.next = a;\n        System.out.println(c.next == a && a.next.next == c);\n    }\n}",
    "cachedResponse": {
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
  },
  {
    "id": "lc-208-implement-trie-py",
    "name": "LC 208: Implement Trie (Python)",
    "title": "LC 208: Implement Trie (Python Prefix Tree)",
    "difficulty": "Medium",
    "category": "Tries",
    "language": "python",
    "code": "trie = {}\ntrie.setdefault(\"c\", {}).setdefault(\"a\", {})[\"t\"] = True\nprint(trie.get(\"c\", {}).get(\"a\", {}).get(\"t\", False))",
    "cachedResponse": {
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
  },
  {
    "id": "lc-208-implement-trie-java",
    "name": "LC 208: Implement Trie (Java)",
    "title": "LC 208: Implement Trie (Java Prefix Node Chain)",
    "difficulty": "Medium",
    "category": "Tries",
    "language": "java",
    "code": "public class Main {\n    static class T { T c, a, t; boolean end; }\n    public static void main(String[] args) {\n        T root = new T(); root.c = new T(); root.c.a = new T();\n        root.c.a.t = new T(); root.c.a.t.end = true;\n        System.out.println(root.c.a.t.end);\n    }\n}",
    "cachedResponse": {
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
  },
  {
    "id": "lc-547-provinces-py",
    "name": "LC 547: Number of Provinces (Python)",
    "title": "LC 547: Number of Provinces (Python DSU)",
    "difficulty": "Medium",
    "category": "Union-Find",
    "language": "python",
    "code": "parent = [0, 1, 2]\nparent[1] = 0\nparent[2] = 1\nwhile parent[2] != parent[parent[2]]:\n    parent[2] = parent[parent[2]]\nprint(parent[0] == parent[parent[2]])",
    "cachedResponse": {
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
  },
  {
    "id": "lc-547-provinces-java",
    "name": "LC 547: Number of Provinces (Java)",
    "title": "LC 547: Number of Provinces (Java Union-Find)",
    "difficulty": "Medium",
    "category": "Union-Find",
    "language": "java",
    "code": "public class Main {\n    public static void main(String[] args) {\n        int[] parent = {0, 1, 2}; parent[1] = 0; parent[2] = 1;\n        while (parent[2] != parent[parent[2]]) parent[2] = parent[parent[2]];\n        System.out.println(parent[0] == parent[parent[2]]);\n    }\n}",
    "cachedResponse": {
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
  },
  {
    "id": "lc-509-fibonacci-py",
    "name": "LC 509: Fibonacci Number (Python)",
    "title": "LC 509: Fibonacci & Factorial Recursion (Python)",
    "difficulty": "Easy",
    "category": "Recursion",
    "language": "python",
    "code": "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\nprint(factorial(5))",
    "cachedResponse": {
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
  },
  {
    "id": "lc-509-fibonacci-java",
    "name": "LC 509: Fibonacci Number (Java)",
    "title": "LC 509: Recursion Call Stack (Java)",
    "difficulty": "Easy",
    "category": "Recursion",
    "language": "java",
    "code": "public class Main {\n    static int factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(factorial(5));\n    }\n}",
    "cachedResponse": {
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
  }
];
