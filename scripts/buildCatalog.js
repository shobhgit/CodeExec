const fs = require('fs');
const path = require('path');

const fixturesDir = path.resolve(__dirname, '../fixtures/api-traces');
const files = fs.readdirSync(fixturesDir).filter(f => f.endsWith('.json'));

function getCategory(name) {
  if (name.includes('tree') || name.includes('bst')) return 'Trees & BST';
  if (name.includes('linked') || name.includes('doubly') || name.includes('singly')) return 'Linked Lists';
  if (name.includes('stack')) return 'Stacks';
  if (name.includes('circular-queue')) return 'Circular Queues';
  if (name.includes('queue') || name.includes('deque')) return 'Queues';
  if (name.includes('heap') || name.includes('priority')) return 'Heaps';
  if (name.includes('graph') || name.includes('cycle')) return 'Graphs & Cycles';
  if (name.includes('hashmap') || name.includes('dictionary') || name.includes('dict')) return 'Hash Maps & Dicts';
  if (name.includes('set') || name.includes('tuple')) return 'Sets & Tuples';
  if (name.includes('array') || name.includes('list-mutation') || name.includes('nested-list') || name.includes('arithmetic')) return 'Arrays & Lists';
  if (name.includes('trie')) return 'Tries';
  if (name.includes('union-find')) return 'Union-Find';
  if (name.includes('recursion')) return 'Recursion';
  return 'Edge Cases & Errors';
}

function getTitle(name) {
  return name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

const presets = files.map(file => {
  const content = JSON.parse(fs.readFileSync(path.join(fixturesDir, file), 'utf8'));
  const id = path.basename(file, '.json');
  return {
    id,
    name: content.name || id,
    title: getTitle(id),
    category: getCategory(id),
    language: content.request ? content.request.language : (id.startsWith('java') ? 'java' : 'python'),
    code: content.request ? content.request.code : '',
    cachedResponse: content.response
  };
});

const outDir = path.resolve(__dirname, '../frontend/src/data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const tsContent = `import { PresetItem } from '../types/tracer';\n\nexport const CATALOG_PRESETS: PresetItem[] = ${JSON.stringify(presets, null, 2)};\n`;
fs.writeFileSync(path.join(outDir, 'catalogPresets.ts'), tsContent, 'utf8');
console.log(`Successfully generated ${presets.length} presets in catalogPresets.ts`);
