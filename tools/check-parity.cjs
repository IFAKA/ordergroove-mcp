#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const REPO_ROOT = path.join(__dirname, '..');
const HTML_ROOT = path.join(REPO_ROOT, 'data', 'ordergroove-developer');
const MD_ROOT = path.join(REPO_ROOT, 'ordergroove-md');

function listFiles(root, ext) {
  const out = [];
  const stack = [root];
  while (stack.length) {
    const dir = stack.pop();
    let entries = [];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (_) { continue; }
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) stack.push(p);
      else if (e.isFile() && p.toLowerCase().endsWith(ext)) out.push(p);
    }
  }
  return out;
}

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

function getHtmlAnchors(html) {
  const $ = cheerio.load(html);
  const anchors = new Set();
  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const id = $(el).attr('id');
    if (id) anchors.add(id);
  });
  return anchors;
}

function getMdAnchors(md) {
  const anchors = new Set();
  const lines = md.split('\n');
  for (const line of lines) {
    const m = /^(#{1,6})\s+(.*)$/.exec(line);
    if (m) anchors.add(slugify(m[2]));
  }
  return anchors;
}

function relativeKeyFromHtmlPath(p) {
  const rel = path.relative(HTML_ROOT, p).replace(/\.html$/i, '');
  return rel;
}

function findCorrespondingMd(relKey) {
  const candidates = [];
  const parts = relKey.split(path.sep);
  const tail = parts[parts.length - 1];
  const mdFiles = listFiles(MD_ROOT, '.md');
  for (const md of mdFiles) {
    if (md.toLowerCase().endsWith(tail.toLowerCase() + '.md')) candidates.push(md);
  }
  candidates.sort((a, b) => b.length - a.length);
  return candidates[0] || null;
}

(function main(){
  const htmlFiles = listFiles(HTML_ROOT, '.html');
  const report = [];

  for (const htmlPath of htmlFiles) {
    const relKey = relativeKeyFromHtmlPath(htmlPath);
    const mdPath = findCorrespondingMd(relKey);
    if (!mdPath) {
      report.push({ html: htmlPath, md: null, missing: 'md' });
      continue;
    }
    const html = fs.readFileSync(htmlPath, 'utf8');
    const md = fs.readFileSync(mdPath, 'utf8');
    const htmlAnchors = getHtmlAnchors(html);
    const mdAnchors = getMdAnchors(md);
    const missingInMd = [...htmlAnchors].filter(a => !mdAnchors.has(a));
    const extraInMd = [...mdAnchors].filter(a => !htmlAnchors.has(a));
    if (missingInMd.length || extraInMd.length) {
      report.push({ html: htmlPath, md: mdPath, missingInMd, extraInMd });
    }
  }

  if (!report.length) {
    console.log('Parity OK: All HTML anchors matched in Markdown.');
  } else {
    console.log(JSON.stringify(report, null, 2));
    process.exitCode = 1;
  }
})();


