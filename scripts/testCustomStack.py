import urllib.request
import json

java_code = """class Stack {
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
}"""

req = urllib.request.Request('http://localhost:8080/api/execute', data=json.dumps({'language':'java', 'code': java_code}).encode('utf-8'), headers={'Content-Type':'application/json'})
res = urllib.request.urlopen(req)
data = json.loads(res.read().decode('utf-8'))
print('Java Custom Stack status:', data.get('status'), 'steps:', len(data.get('trace', [])))
if data.get('trace'):
    last = data['trace'][-1]
    print('Last step variables:', last.get('variables'))
    print('Last step heap:', json.dumps(last.get('heap', [])))
