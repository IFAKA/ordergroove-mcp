#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');
const MiniSearch = require('minisearch').default || require('minisearch');

const DATA_DIR = path.join(__dirname, '..', 'data');
const HTML_ROOTS = [
  path.join(DATA_DIR, 'ordergroove-developer'),
  path.join(DATA_DIR, 'ordergroove-md')
];
const MD_DIR = path.join(DATA_DIR, 'md');
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

function extractHtmlToMarkdown(html, url) {
  const $ = cheerio.load(html);
  const title = $('title').first().text().trim() || $('h1').first().text().trim() || 'Untitled';
  // Try to narrow to main content
  let $main = $('main');
  if (!$main.length) $main = $('[role="main"]');
  if (!$main.length) $main = $('.rm-Content, .hub-content, article, .article, .content, .markdown');
  const content = ($main.length ? $main.first().html() : $('body').html()) || '';
  const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
  const mdBody = turndown.turndown(content);
  const md = `---\nsource: ${url || ''}\n---\n\n# ${title}\n\n${mdBody}\n`;
  // parse headings
  const headings = [];
  $('h1, h2, h3').each((_, el) => headings.push($(el).text().trim()));
  return { title, headings, md };
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
  ensureDir(MD_DIR);
  ensureDir(INDEX_DIR);
  const allHtml = HTML_ROOTS.flatMap(r => listFiles(r, ['.html']));
  const docs = [];
  const sections = [];
  let docId = 1; let secId = 1;
  for (const htmlPath of allHtml) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const m1 = /Saved from:\s*(.*)\s*-->/.exec(html);
    const url = m1 ? m1[1].trim() : '';
    const { title, headings, md } = extractHtmlToMarkdown(html, url);
    const rel = path.relative(DATA_DIR, htmlPath);
    const mdRel = rel.replace(/\.html$/i, '.md').replace(/^ordergroove-developer\//, 'md/ordergroove-developer/').replace(/^ordergroove-md\//, 'md/ordergroove-md/');
    const mdAbs = path.join(DATA_DIR, mdRel);
    ensureDir(path.dirname(mdAbs));
    fs.writeFileSync(mdAbs, md, 'utf8');
    const id = docId++;
    docs.push({ id, path_html: htmlPath, path_md: mdAbs, url, title, headings });
    const ch = chunkMarkdown(md);
    for (const c of ch) { sections.push({ id: secId++, docId: id, headingPath: c.headingPath, text: c.text }); }
  }
  // write meta and sections
  const metaPath = path.join(INDEX_DIR, 'meta.jsonl');
  const secPath = path.join(INDEX_DIR, 'sections.jsonl');
  fs.writeFileSync(metaPath, docs.map(d => JSON.stringify(d)).join('\n') + '\n', 'utf8');
  fs.writeFileSync(secPath, sections.map(s => JSON.stringify(s)).join('\n') + '\n', 'utf8');

  // build minisearch index over sections
  const options = { fields: ['text', 'headingPath'], storeFields: ['docId', 'headingPath'], searchOptions: { fuzzy: 0.2, prefix: true } };
  const mini = new MiniSearch(options);
  mini.addAll(sections.map(s => ({ id: s.id, text: s.text, headingPath: s.headingPath, docId: s.docId })));
  const miniPath = path.join(INDEX_DIR, 'search.minisearch.json');
  fs.writeFileSync(miniPath, JSON.stringify({ options, index: mini }), 'utf8');

  console.log('Indexed docs:', docs.length, 'sections:', sections.length);
})();


