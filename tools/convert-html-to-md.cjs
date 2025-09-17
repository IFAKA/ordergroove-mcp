#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const REPO_ROOT = path.join(__dirname, '..');
const HTML_ROOT = path.join(REPO_ROOT, 'data', 'ordergroove-developer');
const MD_OUTPUT_ROOT = path.join(REPO_ROOT, 'ordergroove-md');

function ensureDir(p) { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); }

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

function extractHtmlToMarkdown(html, url) {
  const $ = cheerio.load(html);
  const title = $('title').first().text().trim() || $('h1').first().text().trim() || 'Untitled';
  
  // Try to narrow to main content
  let $main = $('main');
  if (!$main.length) $main = $('[role="main"]');
  if (!$main.length) $main = $('.rm-Content, .hub-content, article, .article, .content, .markdown');
  
  const content = ($main.length ? $main.first().html() : $('body').html()) || '';
  
  // Preserve heading IDs as anchor links
  $main.find('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const $el = $(el);
    const id = $el.attr('id');
    if (id) {
      $el.attr('id', id); // Keep the ID
    }
  });
  
  const turndown = new TurndownService({ 
    headingStyle: 'atx', 
    codeBlockStyle: 'fenced',
    // Custom rule to preserve heading IDs
    customRules: [{
      filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      replacement: function (content, node) {
        const level = node.tagName.toLowerCase();
        const id = node.getAttribute('id');
        const anchor = id ? ` {#${id}}` : '';
        return `${'#'.repeat(parseInt(level[1]))} ${content}${anchor}\n\n`;
      }
    }]
  });
  
  const mdBody = turndown.turndown(content);
  const md = `---
title: ${title}
source: ${url || ''}
---

# ${title}

${mdBody}
`;
  
  return { title, md };
}

function relativePathFromHtml(htmlPath) {
  // Convert HTML path to relative path structure
  const rel = path.relative(HTML_ROOT, htmlPath);
  return rel.replace(/\.html$/i, '.md');
}

(function main() {
  const htmlFiles = listFiles(HTML_ROOT, '.html');
  let converted = 0;
  
  for (const htmlPath of htmlFiles) {
    try {
      const html = fs.readFileSync(htmlPath, 'utf8');
      const m1 = /Saved from:\s*(.*)\s*-->/.exec(html);
      const url = m1 ? m1[1].trim() : '';
      
      const { title, md } = extractHtmlToMarkdown(html, url);
      const relPath = relativePathFromHtml(htmlPath);
      const outputPath = path.join(MD_OUTPUT_ROOT, relPath);
      
      ensureDir(path.dirname(outputPath));
      fs.writeFileSync(outputPath, md, 'utf8');
      converted++;
      
      console.log(`Converted: ${relPath}`);
    } catch (e) {
      console.error(`Failed to convert ${htmlPath}:`, e.message);
    }
  }
  
  console.log(`\nConverted ${converted} HTML files to Markdown`);
})();
