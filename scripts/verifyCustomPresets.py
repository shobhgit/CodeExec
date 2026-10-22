import urllib.request
import json

presets = [
  ("stack", "java", """class Stack {
    int[] items = new int[10];
    int top = -1;
    void push(int val) { items[++top] = val; }
    int pop() { return items[top--]; }
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
}"""),
  ("stack", "python", """class Stack:
    def __init__(self): self.items = []
    def push(self, val): self.items.append(val)
    def pop(self): return self.items.pop()
st = Stack()
st.push(10)
st.push(20)
st.push(30)
top_elem = st.pop()
st.push(40)
print("Popped:", top_elem)"""),
  ("queue", "java", """class Queue {
    int[] items = new int[10];
    int front = 0, rear = 0, size = 0;
    void enqueue(int val) { items[rear++] = val; size++; }
    int dequeue() { size--; return items[front++]; }
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
}"""),
  ("queue", "python", """class Queue:
    def __init__(self): self.items = []
    def enqueue(self, val): self.items.append(val)
    def dequeue(self): return self.items.pop(0)
q = Queue()
q.enqueue(10)
q.enqueue(20)
q.enqueue(30)
front = q.dequeue()
q.enqueue(40)
print("Front:", front)""")
]

for ds, lang, code in presets:
    req = urllib.request.Request('http://localhost:8080/api/execute', data=json.dumps({'language': lang, 'code': code}).encode('utf-8'), headers={'Content-Type':'application/json'})
    res = urllib.request.urlopen(req)
    data = json.loads(res.read().decode('utf-8'))
    print(f"[{ds.upper()}] ({lang}): status={data.get('status')}, steps={len(data.get('trace', []))}")
