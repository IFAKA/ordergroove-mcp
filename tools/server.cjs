#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const DEFAULT_DATA = path.join(__dirname, '..', 'data');
const INDEX_DIR = path.join(DEFAULT_DATA, 'index');

function parseRootsFromArgs(argv) {
  const roots = [];
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--root' && argv[i + 1]) { roots.push(argv[i + 1]); i++; }
  }
  return roots;
}
function resolveDocRoots() {
  const cli = parseRootsFromArgs(process.argv);
  if (cli.length) return cli.map(r => path.resolve(r));
  if (process.env.MCP_OG_DOC_ROOTS) {
    return process.env.MCP_OG_DOC_ROOTS.split(',').map(s => s.trim()).filter(Boolean).map(r => path.resolve(r));
  }
  return [
    path.join(DEFAULT_DATA, 'ordergroove-md'),
    path.join(DEFAULT_DATA, 'ordergroove-developer')
  ];
}

const DOC_ROOTS = resolveDocRoots();
const META_PATH = path.join(INDEX_DIR, 'meta.jsonl');
const SECTIONS_PATH = path.join(INDEX_DIR, 'sections.jsonl');
const MINI_PATH = path.join(INDEX_DIR, 'search.minisearch.json');
let MINI = null;
let META = [];

function listAllFiles(root) {
  const out = [];
  const stack = [root];
  while (stack.length) {
    const dir = stack.pop();
    let entries = [];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (_) { continue; }
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) stack.push(p);
      else if (e.isFile()) out.push(p);
    }
  }
  return out;
}

function loadIndexFiles() { return DOC_ROOTS.flatMap(listAllFiles).filter(f => /\.(md|html)$/i.test(f)); }
let FILES = loadIndexFiles();

function loadSearchIndex() {
  try {
    const MiniSearch = require('minisearch').default || require('minisearch');
    const raw = fs.readFileSync(MINI_PATH, 'utf8');
    const data = JSON.parse(raw);
    MINI = MiniSearch.loadJSON(JSON.stringify(data.index), data.options);
  } catch (e) { 
    MINI = null; 
  }
  try {
    META = fs.readFileSync(META_PATH, 'utf8').trim().split('\n').filter(Boolean).map(l => JSON.parse(l));
  } catch (e) { 
    META = []; 
  }
}
loadSearchIndex();

function write(message) {
  const payload = JSON.stringify(message);
  process.stdout.write(`Content-Length: ${Buffer.byteLength(payload, 'utf8')}\r\n\r\n${payload}`);
}
function makeResponse(req, result) { return { jsonrpc: '2.0', id: req.id, result }; }
function makeError(req, code, message, data) { return { jsonrpc: '2.0', id: req.id, error: { code, message, data } }; }

function isAllowed(p) { const ap = path.resolve(p); return DOC_ROOTS.some(r => ap.startsWith(path.resolve(r) + path.sep)); }
function readFileSafe(p, offset, limit) {
  if (!isAllowed(p)) throw new Error('Path not under allowed roots');
  const content = fs.readFileSync(p, 'utf8');
  if (typeof offset === 'number' && typeof limit === 'number') return content.slice(offset, offset + limit);
  return content;
}
function searchFiles(query, limit = 20) {
  if (MINI) {
    const hits = MINI.search(query, { prefix: true, fuzzy: 0.2 }).slice(0, limit);
    return hits.map(h => {
      const secId = h.id;
      return { sectionId: secId, score: h.score, snippet: (h.match && h.match[0]) || '' };
    });
  }
  const results = [];
  for (const f of FILES) {
    try {
      const text = fs.readFileSync(f, 'utf8');
      const idx = text.toLowerCase().indexOf(query.toLowerCase());
      if (idx !== -1) {
        const start = Math.max(0, idx - 120);
        const end = Math.min(text.length, idx + query.length + 120);
        results.push({ path: f, snippet: text.slice(start, end) });
        if (results.length >= limit) break;
      }
    } catch (_) {}
  }
  return results;
}

function route(req) {
  if (req.method === 'initialize') return makeResponse(req, { serverInfo: { name: 'ordergroove-mcp', version: '0.1.0' } });
  if (req.method === 'tools/list') return makeResponse(req, { tools: [
    { name: 'search', description: 'Search Ordergroove docs', inputSchema: { type: 'object', properties: { query: { type: 'string' }, limit: { type: 'number' } }, required: ['query'] } },
    { name: 'get_file', description: 'Read doc file content', inputSchema: { type: 'object', properties: { path: { type: 'string' }, offset: { type: 'number' }, limit: { type: 'number' } }, required: ['path'] } },
    { name: 'list_files', description: 'List doc files', inputSchema: { type: 'object', properties: { prefix: { type: 'string' }, limit: { type: 'number' } } } },
    { name: 'refresh_index', description: 'Reload file index', inputSchema: { type: 'object', properties: {} } }
  ] });
  if (req.method === 'tools/call') {
    const { name, arguments: args } = req.params || {};
    try {
      if (name === 'search') return makeResponse(req, { results: searchFiles((args||{}).query, (args||{}).limit) });
      if (name === 'get_file') return makeResponse(req, { path: (args||{}).path, content: readFileSafe((args||{}).path, (args||{}).offset, (args||{}).limit) });
      if (name === 'list_files') {
        const prefix = (args||{}).prefix; const limit = (args||{}).limit;
        let files = FILES; if (prefix) files = files.filter(f => f.includes(prefix));
        return makeResponse(req, { files: (typeof limit === 'number' ? files.slice(0, limit) : files) });
      }
      if (name === 'refresh_index') { FILES = loadIndexFiles(); loadSearchIndex(); return makeResponse(req, { count: FILES.length, indexed: MINI ? true : false }); }
      return makeError(req, -32601, 'Unknown tool: ' + name);
    } catch (e) { return makeError(req, -32000, e.message); }
  }
  return makeError(req, -32601, 'Method not found');
}

function parseMessages(buffer) {
  const messages = [];
  while (true) {
    const headEnd = buffer.indexOf('\r\n\r\n');
    if (headEnd === -1) break;
    const head = buffer.slice(0, headEnd).toString('utf8');
    const m = /Content-Length:\s*(\d+)/i.exec(head);
    if (!m) break;
    const len = parseInt(m[1], 10);
    const total = headEnd + 4 + len;
    if (buffer.length < total) break;
    const json = buffer.slice(headEnd + 4, total).toString('utf8');
    try { messages.push(JSON.parse(json)); } catch (_) {}
    buffer = buffer.slice(total);
  }
  return { messages, rest: buffer };
}

let buf = Buffer.alloc(0);
process.stdin.on('data', chunk => {
  buf = Buffer.concat([buf, chunk]);
  const { messages, rest } = parseMessages(buf);
  buf = rest;
  for (const msg of messages) write(route(msg));
});

process.stdin.on('end', () => process.exit(0));


