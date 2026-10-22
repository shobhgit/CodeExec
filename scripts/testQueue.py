import urllib.request
import json

java_code = """class Queue {
    int[] items = new int[10];
    int front = 0;
    int rear = 0;
    int size = 0;

    void enqueue(int val) {
        items[rear++] = val;
        size++;
    }

    int dequeue() {
        size--;
        return items[front++];
    }
}

public class Main {
    public static void main(String[] args) {
        Queue q = new Queue();
        q.enqueue(10);
        q.enqueue(20);
        q.enqueue(30);
        int popped = q.dequeue();
        q.enqueue(40);
        System.out.println("Dequeued: " + popped);
    }
}"""

req = urllib.request.Request('http://localhost:8080/api/execute', data=json.dumps({'language':'java', 'code': java_code}).encode('utf-8'), headers={'Content-Type':'application/json'})
res = urllib.request.urlopen(req)
data = json.loads(res.read().decode('utf-8'))
print('Java Custom Queue status:', data.get('status'), 'steps:', len(data.get('trace', [])))
if data.get('trace'):
    last = data['trace'][-1]
    print('Last step variables:', last.get('variables'))
    print('Last step heap:', json.dumps(last.get('heap', [])))
