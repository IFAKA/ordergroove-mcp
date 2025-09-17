#!/bin/bash

# Configure Cursor MCP Integration Script
# This script safely adds Ordergroove MCP to existing Cursor configuration

set -e

echo "🔧 Configuring Cursor MCP Integration..."
echo "======================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

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

# Check if ordergroove-mcp is already configured
check_existing_config() {
    local config_file="$1"
    
    if [ -f "$config_file" ]; then
        if grep -q '"ordergroove-mcp"' "$config_file"; then
            return 0  # Already configured
        fi
    fi
    return 1  # Not configured
}

# Add ordergroove-mcp to existing configuration
add_to_config() {
    local config_file="$1"
    local temp_file=$(mktemp)
    
    # Create backup
    cp "$config_file" "${config_file}.backup.$(date +%Y%m%d_%H%M%S)"
    print_info "Created backup: ${config_file}.backup.$(date +%Y%m%d_%H%M%S)"
    
    # Use Node.js to safely merge JSON
    node -e "
const fs = require('fs');
const configFile = '$config_file';

try {
    // Read existing config
    let config = {};
    if (fs.existsSync(configFile)) {
        const content = fs.readFileSync(configFile, 'utf8');
        config = JSON.parse(content);
    }
    
    // Ensure mcpServers exists
    if (!config.mcpServers) {
        config.mcpServers = {};
    }
    
    // Add ordergroove-mcp if not already present
    if (!config.mcpServers['ordergroove-mcp']) {
        config.mcpServers['ordergroove-mcp'] = {
            command: 'ordergroove-mcp',
            args: []
        };
        
        // Write updated config
        fs.writeFileSync(configFile, JSON.stringify(config, null, 2) + '\n');
        console.log('SUCCESS: Added ordergroove-mcp to existing configuration');
    } else {
        console.log('INFO: ordergroove-mcp already configured');
    }
} catch (error) {
    console.error('ERROR: Failed to update configuration:', error.message);
    process.exit(1);
}
"
}

# Main configuration function
configure_cursor() {
    local cursor_config_dir="$HOME/.cursor"
    local config_file="$cursor_config_dir/mcp.json"
    
    print_info "Checking Cursor MCP configuration..."
    
    # Create .cursor directory if it doesn't exist
    if [ ! -d "$cursor_config_dir" ]; then
        mkdir -p "$cursor_config_dir"
        print_status "Created Cursor configuration directory"
    fi
    
    # Check if already configured
    if check_existing_config "$config_file"; then
        print_warning "Ordergroove MCP is already configured in Cursor"
        print_info "Current configuration:"
        if [ -f "$config_file" ]; then
            cat "$config_file" | jq '.mcpServers["ordergroove-mcp"]' 2>/dev/null || echo "  (configuration exists but jq not available for pretty printing)"
        fi
        return 0
    fi
    
    # Add to configuration
    print_info "Adding Ordergroove MCP to Cursor configuration..."
    add_to_config "$config_file"
    
    if [ $? -eq 0 ]; then
        print_status "Successfully configured Ordergroove MCP in Cursor"
        print_info "Configuration file: $config_file"
        print_info "Added configuration:"
        echo "  {"
        echo "    \"ordergroove-mcp\": {"
        echo "      \"command\": \"ordergroove-mcp\","
        echo "      \"args\": []"
        echo "    }"
        echo "  }"
    else
        print_error "Failed to configure Ordergroove MCP in Cursor"
        return 1
    fi
}

# Show completion message
show_completion() {
    echo ""
    echo "🎉 Cursor Configuration Complete!"
    echo "================================="
    echo ""
    print_status "Ordergroove MCP has been added to your Cursor configuration"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Restart Cursor"
    echo "2. Open a new chat"
    echo "3. Try: 'Search Ordergroove documentation for subscription information'"
    echo ""
    echo "🔧 Configuration Details:"
    echo "  - File: ~/.cursor/mcp.json"
    echo "  - Server: ordergroove-mcp"
    echo "  - Command: ordergroove-mcp"
    echo ""
    print_info "Your existing MCP configurations have been preserved"
}

# Main execution
main() {
    configure_cursor
    if [ $? -eq 0 ]; then
        show_completion
    else
        print_error "Configuration failed"
        exit 1
    fi
}

main "$@"
