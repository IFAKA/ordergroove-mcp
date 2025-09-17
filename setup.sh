#!/bin/bash

# Ordergroove MCP Server Setup Script
# This script sets up the Ordergroove MCP server for easy installation and use

set -e

echo "🚀 Setting up Ordergroove MCP Server..."
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        echo "Visit: https://nodejs.org/"
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_status "Node.js $(node --version) is installed"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    print_status "npm $(npm --version) is installed"
}

# Install dependencies
install_dependencies() {
    print_info "Installing dependencies..."
    npm install
    print_status "Dependencies installed"
}

# Build search index
build_index() {
    print_info "Building search index from documentation..."
    npm run index:md
    print_status "Search index built successfully"
}

# Create configuration files
create_config() {
    print_info "Creating configuration files..."
    
    # Create .env file if it doesn't exist
    if [ ! -f .env ]; then
        cat > .env << EOF
# Ordergroove MCP Server Configuration
# Copy this file to .env.local and modify as needed

# Data directory (default: ./data)
MCP_OG_DATA_DIR=./data

# Default search result limit (default: 20)
MCP_OG_SEARCH_LIMIT=20

# Enable write operations like rebuild_index (default: false)
MCP_OG_ENABLE_WRITE_OPS=false

# HTTP server configuration (for team sharing)
MCP_OG_HTTP_PORT=3000
MCP_OG_HTTP_HOST=localhost
EOF
        print_status "Created .env configuration file"
    else
        print_info ".env file already exists, skipping creation"
    fi
    
    # Create example Cursor configuration
    if [ ! -f examples/configs/cursor-mcp-config.json ]; then
        mkdir -p examples/configs
        cat > examples/configs/cursor-mcp-config.json << EOF
{
  "mcpServers": {
    "ordergroove-mcp": {
      "command": "ordergroove-mcp",
      "args": []
    }
  }
}
EOF
        print_status "Created example Cursor configuration"
    fi
}

# Test the installation
test_installation() {
    print_info "Testing MCP server installation..."
    
    # Test if the command is available
    if command -v ordergroove-mcp &> /dev/null; then
        print_status "ordergroove-mcp command is available globally"
    else
        print_warning "ordergroove-mcp command not found globally. Run 'npm link' to install globally."
    fi
    
    # Test server startup
    print_info "Testing server startup..."
    timeout 5s npm start > /dev/null 2>&1 && print_status "Server starts successfully" || print_warning "Server startup test failed"
}

# Create usage examples
create_examples() {
    print_info "Creating usage examples..."
    
    mkdir -p examples
    
    # Create example queries
    cat > examples/example-queries.md << EOF
# Ordergroove MCP Server - Example Queries

## Basic Search Queries
- "Search Ordergroove documentation for subscription information"
- "Find information about subscription manager"
- "Show me documentation about prepaid subscriptions"
- "Search for API reference documentation"

## File Access Queries
- "Show me the subscription API reference"
- "Get the troubleshooting guide for cart offers"
- "Display the systems landscape documentation"

## Implementation Queries
- "How do I implement subscription enrollment?"
- "What are the steps to set up cart offers?"
- "Show me the guided selling implementation guide"

## Troubleshooting Queries
- "Help me troubleshoot subscription manager issues"
- "Find solutions for cart offer problems"
- "Show me common integration issues"
EOF

    print_status "Created usage examples"
}

# Display setup completion
show_completion() {
    echo ""
    echo "🎉 Setup Complete!"
    echo "=================="
    echo ""
    print_status "Ordergroove MCP Server is ready to use"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Configure Cursor:"
    echo "   - Run: ./configure-cursor.sh"
    echo "   - This will safely add Ordergroove MCP to your existing Cursor configuration"
    echo ""
    echo "2. Test the integration:"
    echo "   - Restart Cursor"
    echo "   - Open a new chat"
    echo "   - Try: 'Search Ordergroove documentation for subscription information'"
    echo ""
    echo "3. Available commands:"
    echo "   - npm start          # Start the MCP server"
    echo "   - npm run dev        # Start in development mode"
    echo "   - npm run index:md   # Rebuild search index"
    echo "   - npm run test       # Run tests"
    echo ""
    echo "📚 Documentation:"
    echo "   - README.md          # Main documentation"
    echo "   - examples/          # Usage examples and templates"
    echo "   - .env               # Configuration options"
    echo ""
    echo "🔧 Configuration:"
    echo "   - Edit .env file to customize settings"
    echo "   - Modify examples/cursor-mcp-config.json for Cursor integration"
    echo ""
    print_info "For support, check the README.md or create an issue"
}

# Main setup process
main() {
    echo "Starting Ordergroove MCP Server setup..."
    echo ""
    
    check_node
    check_npm
    install_dependencies
    build_index
    create_config
    create_examples
    test_installation
    show_completion
}

# Run main function
main "$@"
