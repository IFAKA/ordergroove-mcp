#!/usr/bin/env node
const { spawn } = require('child_process');

function send(cp, obj) {
  const s = JSON.stringify(obj);
  cp.stdin.write(`Content-Length: ${Buffer.byteLength(s, 'utf8')}\r\n\r\n${s}`);
}

function run(query) {
  return new Promise((resolve, reject) => {
    const cp = spawn('node', ['tools/server.cjs'], { stdio: ['pipe', 'pipe', 'inherit'] });

    let buf = Buffer.alloc(0);
    cp.stdout.on('data', chunk => {
      buf = Buffer.concat([buf, chunk]);
      while (true) {
        const headEnd = buf.indexOf('\r\n\r\n');
        if (headEnd === -1) break;
        const head = buf.slice(0, headEnd).toString('utf8');
        const m = /Content-Length:\s*(\d+)/i.exec(head);
        if (!m) break;
        const len = parseInt(m[1], 10);
        const total = headEnd + 4 + len;
        if (buf.length < total) break;
        const json = buf.slice(headEnd + 4, total).toString('utf8');
        buf = buf.slice(total);
        try {
          const msg = JSON.parse(json);
          if (msg.id === 2 && msg.result) {
            if (msg.result.content && Array.isArray(msg.result.content)) {
              const text = msg.result.content.find(c => c.type === 'text')?.text || '';
              console.log(text);
            } else if (msg.result.results) {
              const lines = msg.result.results.map(r => r.headingPath || r.path || JSON.stringify(r));
              console.log(lines.join('\n'));
            } else {
              console.log(JSON.stringify(msg.result));
            }
            resolve();
            try { cp.stdin.end(); } catch (_) {}
          }
        } catch (_) {}
      }
    });

    cp.on('error', reject);
    cp.on('close', code => { if (code && code !== 0) reject(new Error('Server exited with code ' + code)); });

    setTimeout(() => {
      send(cp, { jsonrpc: '2.0', id: 1, method: 'initialize' });
      setTimeout(() => {
        send(cp, { jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'search', arguments: { query, limit: 10 } } });
      }, 150);
    }, 150);
  });
}

const query = process.argv.slice(2).join(' ') || 'Purchase POST';
run(query).catch(err => { console.error(err.message || String(err)); process.exit(1); });


