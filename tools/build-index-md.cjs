#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const MiniSearch = require('minisearch').default || require('minisearch');

const REPO_ROOT = path.join(__dirname, '..');
// Use the new consolidated Markdown structure
const MD_SOURCE_ROOT = path.join(REPO_ROOT, 'ordergroove-md');
const DATA_DIR = path.join(REPO_ROOT, 'data');
const INDEX_DIR = path.join(DATA_DIR, 'index');

function ensureDir(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }

function listFiles(root, exts) {
  const out = [];
  const stack = [root];
  while (stack.length) {
    const dir = stack.pop();
    let entries = [];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (_) { continue; }
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) stack.push(p);
      else if (e.isFile() && exts.some(ext => p.toLowerCase().endsWith(ext))) out.push(p);
    }
  }
  return out;
}

function readJsonFile(jsonPath) {
  try {
    const content = fs.readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(content);
    return {
      title: data.title || path.basename(jsonPath, '.json'),
      headings: data.headings || [],
      content: content
    };
  } catch (e) {
    return {
      title: path.basename(jsonPath, '.json'),
      headings: [],
      content: ''
    };
  }
}

function readTitleAndHeadings(md) {
  const lines = md.split('\n');
  let title = 'Untitled';
  const headings = [];
  for (const line of lines) {
    const m = /^(#{1,6})\s+(.*)$/.exec(line);
    if (m) {
      const level = m[1].length;
      const text = m[2].trim();
      if (level === 1 && title === 'Untitled') title = text;
      if (level <= 3) headings.push(text);
    }
  }
  return { title, headings };
}

function chunkMarkdown(md, maxLen = 1600) {
  const lines = md.split('\n');
  const chunks = [];
  let buf = [];
  let currentHeadings = [];
  for (const line of lines) {
    const h = /^(#{1,3})\s+(.*)/.exec(line);
    if (h) {
      if (buf.join('\n').length > 0) {
        chunks.push({ headingPath: currentHeadings.join(' > '), text: buf.join('\n') });
        buf = [];
      }
      const level = h[1].length; const text = h[2].trim();
      currentHeadings = currentHeadings.slice(0, level - 1);
      currentHeadings[level - 1] = text;
      buf.push(line);
    } else {
      buf.push(line);
    }
    if (buf.join('\n').length >= maxLen) {
      chunks.push({ headingPath: currentHeadings.join(' > '), text: buf.join('\n') });
      buf = [];
    }
  }
  if (buf.length) chunks.push({ headingPath: currentHeadings.join(' > '), text: buf.join('\n') });
  return chunks.filter(c => c.text.trim().length > 0);
}

(function main(){
  ensureDir(INDEX_DIR);
  const allMd = listFiles(MD_SOURCE_ROOT, ['.md']);
  const allJson = listFiles(MD_SOURCE_ROOT, ['.json']);
  const docs = [];
  const sections = [];
  let docId = 1; let secId = 1;

  // Process Markdown files
  for (const mdPath of allMd) {
    const md = fs.readFileSync(mdPath, 'utf8');
    const { title, headings } = readTitleAndHeadings(md);
    const id = docId++;
    docs.push({ id, path_md: mdPath, title, headings, type: 'markdown' });
    const ch = chunkMarkdown(md);
    for (const c of ch) sections.push({ id: secId++, docId: id, headingPath: c.headingPath, text: c.text });
  }

  // Process JSON files
  for (const jsonPath of allJson) {
    const { title, headings, content } = readJsonFile(jsonPath);
    const id = docId++;
    docs.push({ id, path_md: jsonPath, title, headings, type: 'json' });
    // For JSON files, create a single section with the content
    sections.push({ id: secId++, docId: id, headingPath: title, text: content });
  }

  const metaPath = path.join(INDEX_DIR, 'meta.jsonl');
  const secPath = path.join(INDEX_DIR, 'sections.jsonl');
  fs.writeFileSync(metaPath, docs.map(d => JSON.stringify(d)).join('\n') + '\n', 'utf8');
  fs.writeFileSync(secPath, sections.map(s => JSON.stringify(s)).join('\n') + '\n', 'utf8');

  const options = { fields: ['text', 'headingPath'], storeFields: ['docId', 'headingPath'], searchOptions: { fuzzy: 0.2, prefix: true } };
  const mini = new MiniSearch(options);
  mini.addAll(sections.map(s => ({ id: s.id, text: s.text, headingPath: s.headingPath, docId: s.docId })));
  const miniPath = path.join(INDEX_DIR, 'search.minisearch.json');
  fs.writeFileSync(miniPath, JSON.stringify({ options, index: mini }), 'utf8');

  console.log('Indexed (MD+JSON source) docs:', docs.length, 'sections:', sections.length);
  console.log('- Markdown files:', allMd.length);
  console.log('- JSON files:', allJson.length);
})();


