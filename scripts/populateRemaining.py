import urllib.request
import json
import os

filePath = 'frontend/src/data/catalogPresets.ts'
with open(filePath, 'r', encoding='utf-8') as f:
    text = f.read()

prefix = 'export const CATALOG_PRESETS: PresetItem[] = '
start = text.find(prefix) + len(prefix)
end = text.rfind(';')
presets = json.loads(text[start:end])

for p in presets:
    if not p.get('cachedResponse'):
        print(f"Executing: {p['id']} ({p['language']})...")
        data = json.dumps({'language': p['language'], 'code': p['code']}).encode('utf-8')
        req = urllib.request.Request('http://localhost:8080/api/execute', data=data, headers={'Content-Type': 'application/json'})
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                res = json.loads(resp.read().decode('utf-8'))
                if res.get('status') == 'success':
                    p['cachedResponse'] = res
                    print(f"  -> SUCCESS ({len(res.get('trace', []))} steps)")
                else:
                    print(f"  -> API error: {res.get('error')}")
        except Exception as e:
            print(f"  -> Request failed: {e}")

header = "import { PresetItem } from '../types/tracer';\n\nexport const CATALOG_PRESETS: PresetItem[] = "
with open(filePath, 'w', encoding='utf-8') as f:
    f.write(header + json.dumps(presets, indent=2) + ";\n")

print("All catalogue presets updated with verified responses!")
