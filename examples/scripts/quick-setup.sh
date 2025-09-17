#!/bin/bash

# Quick Setup Script for Ordergroove MCP Server
# This script provides a one-command setup for new users

set -e

echo "⚡ Quick Setup for Ordergroove MCP Server"
echo "========================================"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if setup.sh exists
if [ ! -f "../setup.sh" ]; then
    echo "❌ setup.sh not found. Please run this from the examples/scripts/ directory"
    exit 1
fi

# Run setup
print_info "Running full setup..."
cd ..
./setup.sh

# Run installation
print_info "Installing globally..."
./install.sh

# Configure Cursor safely
print_info "Setting up Cursor configuration..."
./configure-cursor.sh

echo ""
echo "🎉 Quick Setup Complete!"
echo "========================"
echo ""
print_status "Ordergroove MCP Server is ready to use"
echo ""
echo "📋 Next Steps:"
echo "1. Restart Cursor"
echo "2. Open a new chat"
echo "3. Try: 'Search Ordergroove documentation for subscription information'"
echo ""
print_info "Run 'ordergroove-mcp' to start the server manually"
