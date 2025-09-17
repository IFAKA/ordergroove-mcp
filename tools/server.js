#!/usr/bin/env node

// Wrapper to run the TypeScript MCP server
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = dirname(__dirname);

// Run the TypeScript server with ts-node
const server = spawn('node', ['--loader', 'ts-node/esm', 'server.ts'], {
  cwd: projectRoot,
  stdio: 'inherit'
});

server.on('error', (error) => {
  console.error('Failed to start MCP server:', error);
  process.exit(1);
});

server.on('exit', (code) => {
  process.exit(code);
});

// Handle process termination
process.on('SIGINT', () => {
  server.kill('SIGINT');
});

process.on('SIGTERM', () => {
  server.kill('SIGTERM');
});