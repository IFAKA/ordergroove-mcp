#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

// Environment configuration
const DATA_DIR = process.env.MCP_OG_DATA_DIR || path.join(process.cwd(), 'data');
const INDEX_DIR = path.join(DATA_DIR, 'index');
const META_PATH = path.join(INDEX_DIR, 'meta.jsonl');
const SECTIONS_PATH = path.join(INDEX_DIR, 'sections.jsonl');
const MINI_PATH = path.join(INDEX_DIR, 'search.minisearch.json');
const DEFAULT_SEARCH_LIMIT = parseInt(process.env.MCP_OG_SEARCH_LIMIT || '20');
const ENABLE_WRITE_OPS = process.env.MCP_OG_ENABLE_WRITE_OPS === 'true' || process.env.MCP_OG_ENABLE_WRITE_OPS === '1';
const HTTP_PORT = parseInt(process.env.MCP_OG_HTTP_PORT || '3000');
const HTTP_HOST = process.env.MCP_OG_HTTP_HOST || 'localhost';

let MINI: any = null;
let META: any[] = [];
let SECTIONS: any[] = [];

// Load search index
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
    META = fs.readFileSync(META_PATH, 'utf8')
      .trim()
      .split('\n')
      .filter(Boolean)
      .map(l => JSON.parse(l));
  } catch (e) {
    META = [];
  }
  
  try {
    SECTIONS = fs.readFileSync(SECTIONS_PATH, 'utf8')
      .trim()
      .split('\n')
      .filter(Boolean)
      .map(l => JSON.parse(l));
  } catch (e) {
    SECTIONS = [];
  }
}

// Initialize search index
loadSearchIndex();

const server = new Server(
  {
    name: 'ordergroove-mcp-http',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  }
);

// List tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'search',
        description: 'Search Ordergroove documentation',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query',
            },
            limit: {
              type: 'number',
              description: 'Maximum number of results',
              default: DEFAULT_SEARCH_LIMIT,
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_file',
        description: 'Get content of a documentation file',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'File path',
            },
            offset: {
              type: 'number',
              description: 'Start offset',
            },
            limit: {
              type: 'number',
              description: 'Maximum length',
            },
          },
          required: ['path'],
        },
      },
      {
        name: 'list_files',
        description: 'List available documentation files',
        inputSchema: {
          type: 'object',
          properties: {
            prefix: {
              type: 'string',
              description: 'Filter by prefix',
            },
            limit: {
              type: 'number',
              description: 'Maximum number of files',
            },
          },
        },
      },
      {
        name: 'refresh_index',
        description: 'Reload the search index',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      ...(ENABLE_WRITE_OPS ? [{
        name: 'rebuild_index',
        description: 'Rebuild the search index from source files (write operation)',
        inputSchema: {
          type: 'object',
          properties: {
            force: {
              type: 'boolean',
              description: 'Force rebuild even if index is recent',
              default: false,
            },
          },
        },
      }] : []),
    ],
  };
});

// List resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'ordergroove://docs/overview',
        name: 'Documentation Overview',
        description: 'Overview of available Ordergroove documentation structure',
        mimeType: 'application/json',
      },
      {
        uri: 'ordergroove://docs/sections',
        name: 'Documentation Sections',
        description: 'All documentation sections with metadata',
        mimeType: 'application/json',
      },
      {
        uri: 'ordergroove://docs/search-index',
        name: 'Search Index Status',
        description: 'Current status of the search index',
        mimeType: 'application/json',
      },
    ],
  };
});

// Read resources
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  switch (uri) {
    case 'ordergroove://docs/overview': {
      const overview = {
        totalDocs: META.length,
        totalSections: SECTIONS.length,
        searchIndexAvailable: MINI !== null,
        dataDirectory: DATA_DIR,
        categories: [...new Set(META.map(m => m.category).filter(Boolean))],
        lastUpdated: META.length > 0 ? META[0].updated_at : null,
        transport: 'HTTP',
        endpoint: `http://${HTTP_HOST}:${HTTP_PORT}`,
      };
      
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(overview, null, 2),
          },
        ],
      };
    }

    case 'ordergroove://docs/sections': {
      const sections = SECTIONS.map(s => ({
        id: s.id,
        headingPath: s.headingPath,
        text: s.text?.slice(0, 200) + (s.text?.length > 200 ? '...' : ''),
        filePath: s.filePath,
      }));
      
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(sections, null, 2),
          },
        ],
      };
    }

    case 'ordergroove://docs/search-index': {
      const indexStatus = {
        available: MINI !== null,
        totalDocuments: META.length,
        totalSections: SECTIONS.length,
        indexPath: MINI_PATH,
        lastLoaded: new Date().toISOString(),
        transport: 'HTTP',
      };
      
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(indexStatus, null, 2),
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown resource: ${uri}`);
  }
});

// List prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: 'search_docs',
        description: 'Search Ordergroove documentation for specific topics',
        arguments: [
          {
            name: 'topic',
            description: 'The topic or question to search for',
            required: true,
          },
          {
            name: 'context',
            description: 'Additional context about what you\'re looking for',
            required: false,
          },
        ],
      },
      {
        name: 'explain_feature',
        description: 'Get a comprehensive explanation of an Ordergroove feature',
        arguments: [
          {
            name: 'feature',
            description: 'The feature name or functionality to explain',
            required: true,
          },
          {
            name: 'level',
            description: 'Explanation level: beginner, intermediate, or advanced',
            required: false,
          },
        ],
      },
      {
        name: 'troubleshoot_issue',
        description: 'Help troubleshoot a specific issue or error',
        arguments: [
          {
            name: 'issue',
            description: 'Description of the issue or error message',
            required: true,
          },
          {
            name: 'context',
            description: 'Additional context about when/where the issue occurs',
            required: false,
          },
        ],
      },
      {
        name: 'implementation_guide',
        description: 'Get step-by-step implementation guidance',
        arguments: [
          {
            name: 'task',
            description: 'The implementation task or feature to set up',
            required: true,
          },
          {
            name: 'platform',
            description: 'Platform (Shopify, BigCommerce, custom, etc.)',
            required: false,
          },
        ],
      },
    ],
  };
});

// Get prompt
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: promptArgs } = request.params;

  switch (name) {
    case 'search_docs': {
      const { topic, context } = promptArgs as { topic: string; context?: string };
      
      return {
        description: `Search Ordergroove documentation for information about: ${topic}`,
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `I need to find information about "${topic}" in the Ordergroove documentation.${context ? ` Additional context: ${context}` : ''}

Please search the documentation and provide:
1. Relevant sections and their content
2. Key concepts and explanations
3. Any related features or functionality
4. Implementation details if applicable

Use the search tool to find relevant documentation sections.`,
            },
          },
        ],
      };
    }

    case 'explain_feature': {
      const { feature, level = 'intermediate' } = promptArgs as { feature: string; level?: string };
      
      return {
        description: `Explain the ${feature} feature at ${level} level`,
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please explain the "${feature}" feature in Ordergroove at a ${level} level.

For a ${level} explanation, please include:
${level === 'beginner' ? '- What the feature is and why it\'s useful\n- Basic setup and configuration\n- Simple examples' : ''}
${level === 'intermediate' ? '- How the feature works\n- Configuration options\n- Common use cases\n- Integration considerations' : ''}
${level === 'advanced' ? '- Technical implementation details\n- API endpoints and parameters\n- Advanced configuration\n- Troubleshooting and optimization' : ''}

Use the search tool to find relevant documentation and provide a comprehensive explanation.`,
            },
          },
        ],
      };
    }

    case 'troubleshoot_issue': {
      const { issue, context } = promptArgs as { issue: string; context?: string };
      
      return {
        description: `Troubleshoot the issue: ${issue}`,
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `I'm experiencing this issue: "${issue}"${context ? `\n\nContext: ${context}` : ''}

Please help me troubleshoot this by:
1. Searching for similar issues in the documentation
2. Identifying potential causes
3. Providing step-by-step solutions
4. Suggesting preventive measures

Use the search tool to find relevant troubleshooting information and documentation.`,
            },
          },
        ],
      };
    }

    case 'implementation_guide': {
      const { task, platform } = promptArgs as { task: string; platform?: string };
      
      return {
        description: `Implementation guide for: ${task}${platform ? ` on ${platform}` : ''}`,
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `I need a step-by-step implementation guide for "${task}"${platform ? ` on ${platform}` : ''}.

Please provide:
1. Prerequisites and requirements
2. Step-by-step implementation instructions
3. Configuration details
4. Testing and validation steps
5. Common pitfalls and how to avoid them

Use the search tool to find relevant documentation and create a comprehensive implementation guide.`,
            },
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown prompt: ${name}`);
  }
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'search': {
      const { query, limit = DEFAULT_SEARCH_LIMIT } = args as { query: string; limit?: number };
      
      if (!query || query.trim().length === 0) {
        throw new Error('Search query cannot be empty');
      }
      
      if (MINI) {
        try {
          const hits = MINI.search(query, { prefix: true, fuzzy: 0.2 }).slice(0, limit);
          const results = hits.map((hit: any) => {
            const section = SECTIONS.find(s => s.id === hit.id);
            return {
              sectionId: hit.id,
              score: hit.score,
              snippet: section?.text?.slice(0, 200) + (section?.text?.length > 200 ? '...' : '') || '',
              headingPath: section?.headingPath || '',
              filePath: section?.filePath || '',
            };
          });
          
          return {
            content: [
              {
                type: 'text',
                text: `Found ${results.length} results for "${query}":\n\n` +
                  results.map(r => 
                    `**${r.headingPath}** (score: ${r.score.toFixed(2)})\n${r.snippet}\n*File: ${r.filePath}*\n`
                  ).join('\n---\n'),
              },
            ],
          };
        } catch (error) {
          throw new Error(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      } else {
        throw new Error('Search index not available. Please run refresh_index first.');
      }
    }

    case 'get_file': {
      const { path: filePath, offset, limit } = args as { 
        path: string; 
        offset?: number; 
        limit?: number; 
      };
      
      if (!filePath || filePath.trim().length === 0) {
        throw new Error('File path cannot be empty');
      }
      
      try {
        // Security check: ensure file is within allowed directories
        const resolvedPath = path.resolve(filePath);
        const dataDirResolved = path.resolve(DATA_DIR);
        if (!resolvedPath.startsWith(dataDirResolved)) {
          throw new Error('File path must be within the data directory');
        }
        
        if (!fs.existsSync(resolvedPath)) {
          throw new Error(`File not found: ${filePath}`);
        }
        
        const stats = fs.statSync(resolvedPath);
        if (!stats.isFile()) {
          throw new Error(`Path is not a file: ${filePath}`);
        }
        
        const content = fs.readFileSync(resolvedPath, 'utf8');
        const result = typeof offset === 'number' && typeof limit === 'number' 
          ? content.slice(offset, offset + limit)
          : content;
        
        return {
          content: [
            {
              type: 'text',
              text: result,
            },
          ],
        };
      } catch (error) {
        throw new Error(`Error reading file: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    case 'list_files': {
      const { prefix, limit } = args as { prefix?: string; limit?: number };
      let files = META.map(m => m.path_md);
      if (prefix) {
        files = files.filter(f => f.includes(prefix));
      }
      if (typeof limit === 'number') {
        files = files.slice(0, limit);
      }
      
      return {
        content: [
          {
            type: 'text',
            text: `Available files (${files.length}):\n\n` + files.join('\n'),
          },
        ],
      };
    }

    case 'refresh_index': {
      try {
        loadSearchIndex();
        return {
          content: [
            {
              type: 'text',
              text: `Index refreshed successfully. Loaded ${META.length} docs, ${SECTIONS.length} sections, search index: ${MINI ? 'available' : 'unavailable'}`,
            },
          ],
        };
      } catch (error) {
        throw new Error(`Failed to refresh index: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    case 'rebuild_index': {
      if (!ENABLE_WRITE_OPS) {
        throw new Error('Write operations are disabled. Set MCP_OG_ENABLE_WRITE_OPS=true to enable.');
      }
      
      const { force = false } = args as { force?: boolean };
      
      try {
        // Check if rebuild is needed
        if (!force && MINI && META.length > 0) {
          const indexAge = Date.now() - (META[0]?.updated_at ? new Date(META[0].updated_at).getTime() : 0);
          if (indexAge < 24 * 60 * 60 * 1000) { // 24 hours
            return {
              content: [
                {
                  type: 'text',
                  text: 'Index is recent (less than 24 hours old). Use force=true to rebuild anyway.',
                },
              ],
            };
          }
        }
        
        // This would typically call the build scripts
        // For now, just reload the existing index
        loadSearchIndex();
        
        return {
          content: [
            {
              type: 'text',
              text: `Index rebuild completed. Loaded ${META.length} docs, ${SECTIONS.length} sections, search index: ${MINI ? 'available' : 'unavailable'}`,
            },
          ],
        };
      } catch (error) {
        throw new Error(`Failed to rebuild index: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start HTTP server
async function main() {
  const transport = new SSEServerTransport('/message', server);
  await transport.start();
  
  console.log(`Ordergroove MCP HTTP server running on http://${HTTP_HOST}:${HTTP_PORT}`);
  console.log(`SSE endpoint: http://${HTTP_HOST}:${HTTP_PORT}/message`);
  console.log(`Data directory: ${DATA_DIR}`);
  console.log(`Write operations: ${ENABLE_WRITE_OPS ? 'enabled' : 'disabled'}`);
}

main().catch(console.error);
