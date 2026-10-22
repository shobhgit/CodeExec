import urllib.request
import json

py_code = """class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, val):
        self.items.append(val)

    def dequeue(self):
        if self.items:
            return self.items.pop(0)

q = Queue()
q.enqueue(10)
q.enqueue(20)
q.enqueue(30)
popped = q.dequeue()
q.enqueue(40)
print("Dequeued:", popped)
"""

req = urllib.request.Request('http://localhost:8080/api/execute', data=json.dumps({'language':'python', 'code': py_code}).encode('utf-8'), headers={'Content-Type':'application/json'})
res = urllib.request.urlopen(req)
data = json.loads(res.read().decode('utf-8'))
for idx, s in enumerate(data.get('trace', [])):
    if s.get('heap'):
        print(f"Step {idx} (line {s.get('line')}): vars={s.get('variables')}, heap={json.dumps(s.get('heap'))[:150]}")
