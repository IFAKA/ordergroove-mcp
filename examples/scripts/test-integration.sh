#!/bin/bash

# Test Integration Script for Ordergroove MCP Server
# This script tests the MCP server integration

set -e

echo "🧪 Testing Ordergroove MCP Server Integration"
echo "============================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Test 1: Check if server starts
test_server_startup() {
    print_info "Testing server startup..."
    
    if timeout 5s npm start > /dev/null 2>&1; then
        print_status "Server starts successfully"
        return 0
    else
        print_error "Server startup failed"
        return 1
    fi
}

# Test 2: Check if global command is available
test_global_command() {
    print_info "Testing global command availability..."
    
    if command -v ordergroove-mcp &> /dev/null; then
        print_status "Global command 'ordergroove-mcp' is available"
        return 0
    else
        print_warning "Global command not found - run 'npm link' to install globally"
        return 1
    fi
}

# Test 3: Check if search index exists
test_search_index() {
    print_info "Testing search index..."
    
    if [ -f "data/index/search.minisearch.json" ] && [ -f "data/index/sections.jsonl" ]; then
        print_status "Search index files exist"
        return 0
    else
        print_warning "Search index missing - run 'npm run index:md' to build"
        return 1
    fi
}

# Test 4: Check Cursor configuration
test_cursor_config() {
    print_info "Testing Cursor configuration..."
    
    if [ -f ~/.cursor/mcp.json ]; then
        if grep -q "ordergroove-mcp" ~/.cursor/mcp.json; then
            print_status "Cursor configuration found and contains ordergroove-mcp"
            return 0
        else
            print_warning "Cursor configuration exists but doesn't contain ordergroove-mcp"
            return 1
        fi
    else
        print_warning "Cursor configuration not found at ~/.cursor/mcp.json"
        return 1
    fi
}

# Test 5: Test MCP functionality
test_mcp_functionality() {
    print_info "Testing MCP functionality..."
    
    # Create a simple test script
    cat > /tmp/test-mcp.js << 'EOF'
#!/usr/bin/env node
const { spawn } = require('child_process');

const server = spawn('npm', ['start'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  cwd: process.cwd()
});

let messageId = 1;
const testMessage = {
  jsonrpc: '2.0',
  id: messageId,
  method: 'tools/list',
  params: {}
};

let responseData = '';
server.stdout.on('data', (data) => {
  responseData += data.toString();
  const lines = responseData.split('\n').filter(line => line.trim());
  
  for (const line of lines) {
    try {
      const response = JSON.parse(line);
      if (response.id === messageId) {
        if (response.result && response.result.tools) {
          console.log('SUCCESS: Found', response.result.tools.length, 'tools');
          server.kill();
          process.exit(0);
        } else if (response.error) {
          console.log('ERROR:', response.error.message);
          server.kill();
          process.exit(1);
        }
      }
    } catch (e) {
      // Continue reading
    }
  }
});

server.stderr.on('data', (data) => {
  // Ignore stderr
});

setTimeout(() => {
  server.stdin.write(JSON.stringify(testMessage) + '\n');
}, 1000);

setTimeout(() => {
  console.log('TIMEOUT: Test timed out');
  server.kill();
  process.exit(1);
}, 10000);
EOF

    if node /tmp/test-mcp.js; then
        print_status "MCP functionality test passed"
        rm -f /tmp/test-mcp.js
        return 0
    else
        print_error "MCP functionality test failed"
        rm -f /tmp/test-mcp.js
        return 1
    fi
}

# Run all tests
run_tests() {
    local passed=0
    local total=5
    
    test_server_startup && ((passed++))
    test_global_command && ((passed++))
    test_search_index && ((passed++))
    test_cursor_config && ((passed++))
    test_mcp_functionality && ((passed++))
    
    echo ""
    echo "📊 Test Results: $passed/$total tests passed"
    
    if [ $passed -eq $total ]; then
        echo ""
        print_status "All tests passed! Ordergroove MCP Server is ready to use."
        echo ""
        echo "🎯 Next Steps:"
        echo "1. Restart Cursor"
        echo "2. Open a new chat"
        echo "3. Try: 'Search Ordergroove documentation for subscription information'"
        return 0
    else
        echo ""
        print_warning "Some tests failed. Check the output above for details."
        echo ""
        echo "🔧 Common fixes:"
        echo "- Run 'npm run index:md' to build search index"
        echo "- Run 'npm link' to install globally"
        echo "- Copy examples/configs/cursor-mcp-config.json to ~/.cursor/mcp.json"
        return 1
    fi
}

# Main execution
main() {
    cd "$(dirname "$0")/../.."
    run_tests
}

main "$@"
