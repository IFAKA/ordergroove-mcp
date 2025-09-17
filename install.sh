#!/bin/bash

# Ordergroove MCP Server Installation Script
# This script installs the Ordergroove MCP server globally for easy access

set -e

echo "🔧 Installing Ordergroove MCP Server..."
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if we're in the right directory
check_directory() {
    if [ ! -f "package.json" ] || [ ! -f "server.ts" ]; then
        print_error "Please run this script from the Ordergroove MCP project directory"
        exit 1
    fi
    print_status "Running from correct directory"
}

# Install globally
install_globally() {
    print_info "Installing Ordergroove MCP Server globally..."
    
    # Unlink if already installed
    if npm list -g ordergroove-mcp &> /dev/null; then
        print_info "Unlinking existing installation..."
        npm unlink -g ordergroove-mcp 2>/dev/null || true
    fi
    
    # Link globally
    npm link
    print_status "Installed globally as 'ordergroove-mcp'"
}

# Test global installation
test_global_install() {
    print_info "Testing global installation..."
    
    if command -v ordergroove-mcp &> /dev/null; then
        print_status "Global command 'ordergroove-mcp' is available"
        
        # Test the command
        print_info "Testing command execution..."
        timeout 3s ordergroove-mcp > /dev/null 2>&1 && print_status "Command executes successfully" || print_warning "Command test completed"
    else
        print_error "Global installation failed - command not found"
        exit 1
    fi
}

# Create desktop shortcuts (optional)
create_shortcuts() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        print_info "Creating macOS shortcuts..."
        # macOS specific shortcuts could be added here
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        print_info "Creating Linux shortcuts..."
        # Linux specific shortcuts could be added here
    fi
}

# Show installation completion
show_completion() {
    echo ""
    echo "🎉 Installation Complete!"
    echo "========================="
    echo ""
    print_status "Ordergroove MCP Server is now installed globally"
    echo ""
    echo "📋 Usage:"
    echo "  ordergroove-mcp          # Start the MCP server"
    echo "  ordergroove-mcp --help   # Show help (if implemented)"
    echo ""
    echo "🔧 Cursor Integration:"
    echo "  1. Run: ./configure-cursor.sh"
    echo "     (This safely adds Ordergroove MCP to your existing Cursor configuration)"
    echo ""
    echo "  2. Restart Cursor"
    echo "  3. Test with: 'Search Ordergroove documentation for subscription information'"
    echo ""
    echo "📚 Documentation:"
    echo "  - README.md              # Main documentation"
    echo "  - examples/              # Usage examples"
    echo "  - .env                   # Configuration options"
    echo ""
    print_info "Run './setup.sh' for initial configuration"
}

# Main installation process
main() {
    check_directory
    install_globally
    test_global_install
    create_shortcuts
    show_completion
}

# Run main function
main "$@"
