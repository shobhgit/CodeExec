import urllib.request
import json

java_code = """import java.util.Queue;
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

req = urllib.request.Request('http://localhost:8080/api/execute', data=json.dumps({'language':'java', 'code': java_code}).encode('utf-8'), headers={'Content-Type':'application/json'})
res = urllib.request.urlopen(req)
data = json.loads(res.read().decode('utf-8'))
print('Java Collections Queue status:', data.get('status'), 'steps:', len(data.get('trace', [])))
if data.get('trace'):
    last = data['trace'][-1]
    print('Last step variables:', last.get('variables'))
    print('Last step heap:', json.dumps(last.get('heap', [])))
