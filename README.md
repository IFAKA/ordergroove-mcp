# Ordergroove MCP Server

🚀 **Easy-to-use MCP server for Ordergroove documentation** - Access comprehensive Ordergroove docs directly in Cursor or VS Code with powerful search, file access, and intelligent prompts.

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start-5-minutes)
- [Usage](#-usage)
- [Configuration](#️-configuration)
- [Available Tools](#️-available-tools)
- [Commands](#-commands)
- [Use Cases](#-use-cases)
- [Troubleshooting](#-troubleshooting)
- [Example Queries](#-example-queries)
- [Project Structure](#️-project-structure)
- [Testing](#-testing)
- [Customization](#-customization)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **🔍 Smart Search** - Find relevant documentation instantly
- **📁 File Access** - Read specific documentation files
- **💡 Intelligent Prompts** - Pre-built prompts for common tasks
- **🔧 Easy Setup** - One-command installation and configuration
- **🎯 IDE Integration** - Seamless integration with Cursor IDE and VS Code
- **📚 Comprehensive Coverage** - Full Ordergroove documentation access

## 🚀 Quick Start (5 minutes)

### Prerequisites
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **IDE** - Choose one:
  - **Cursor IDE** - [Download here](https://cursor.sh/) (Recommended)
  - **VS Code** - [Download here](https://code.visualstudio.com/) with GitHub Copilot access

### Option 1: Automated Setup (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd ordergroove-mcp

# Run automated setup
./setup.sh

# Install globally
./install.sh

# Configure your IDE
./configure-cursor.sh  # For Cursor IDE
# OR follow VS Code setup below

# Test the integration
npm test
```

### IDE-Specific Setup

#### For Cursor IDE
```bash
# Configure Cursor (safely adds to existing config)
./configure-cursor.sh
```

#### For VS Code
1. **Open Command Palette** (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Windows/Linux)
2. **Type and select** `MCP: Add Server`
3. **Choose transport method**: Standard Input/Output (stdio)
4. **Enter server details**:
   - **Command**: `ordergroove-mcp`
   - **Name**: `ordergroove-mcp`
5. **Start the server**:
   - Command Palette → `MCP: List Servers`
   - Select `ordergroove-mcp` → `Start Server`

### Option 2: Manual Setup
```bash
# Install dependencies
npm install

# Build search index
npm run index:md

# Install globally
npm link

# Configure Cursor manually (see Configuration section)
```

## 🎯 Usage

### Start the Server
```bash
# Global command (after installation)
ordergroove-mcp

# Or via npm
npm start

# Development mode
npm run dev
```

### Example Queries in Your IDE
- "Search Ordergroove documentation for subscription information"
- "Show me the subscription manager API reference"
- "How do I implement cart offers?"
- "Find troubleshooting guides for subscription issues"

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the project root:

```bash
# Data directory (default: ./data)
MCP_OG_DATA_DIR=./data

# Default search result limit (default: 20)
MCP_OG_SEARCH_LIMIT=20

# Enable write operations like rebuild_index (default: false)
MCP_OG_ENABLE_WRITE_OPS=false

# HTTP server configuration (for team sharing)
MCP_OG_HTTP_PORT=3000
MCP_OG_HTTP_HOST=localhost
```

### IDE Integration

#### Cursor IDE Configuration
**Safe Configuration (Recommended):**
```bash
./configure-cursor.sh
```
This script safely adds Ordergroove MCP to your existing Cursor configuration without overwriting other MCP servers.

**Manual Configuration:**
Add to your `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "ordergroove-mcp": {
      "command": "ordergroove-mcp",
      "args": []
    }
  }
}
```

#### VS Code Configuration
VS Code uses its built-in MCP interface instead of JSON configuration files:

1. **Add MCP Server**:
   - Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
   - Type `MCP: Add Server`
   - Select **Standard Input/Output (stdio)**
   - Command: `ordergroove-mcp`
   - Name: `ordergroove-mcp`

2. **Start Server**:
   - Command Palette → `MCP: List Servers`
   - Select `ordergroove-mcp` → `Start Server`

3. **Verify Installation**:
   - Check that the server appears in the MCP servers list
   - Test with a query like "Search Ordergroove documentation"

### Advanced Configuration

#### Cursor IDE Advanced Configuration
For multiple environments or custom settings in Cursor:

```json
{
  "mcpServers": {
    "ordergroove-mcp": {
      "command": "ordergroove-mcp",
      "args": [],
      "env": {
        "MCP_OG_SEARCH_LIMIT": "50",
        "MCP_OG_ENABLE_WRITE_OPS": "false"
      }
    },
    "ordergroove-mcp-dev": {
      "command": "ordergroove-mcp",
      "args": [],
      "env": {
        "MCP_OG_DATA_DIR": "./data-dev",
        "MCP_OG_SEARCH_LIMIT": "100",
        "MCP_OG_ENABLE_WRITE_OPS": "true"
      }
    }
  }
}
```

#### VS Code Advanced Configuration
VS Code handles environment variables through the MCP server interface. You can set environment variables by:

1. **Using a wrapper script** that sets environment variables before starting the MCP server
2. **Setting system environment variables** before launching VS Code
3. **Using VS Code's integrated terminal** with pre-configured environment variables

## 🛠️ Available Tools

### Core Tools
- **`search`** - Search Ordergroove documentation with smart matching
- **`get_file`** - Read specific documentation files with offset/limit support
- **`list_files`** - Browse available documentation files
- **`refresh_index`** - Reload the search index
- **`rebuild_index`** - Rebuild search index (requires write permissions)

### Resources
- **`ordergroove://docs/overview`** - Documentation overview and statistics
- **`ordergroove://docs/sections`** - All documentation sections with metadata
- **`ordergroove://docs/search-index`** - Search index status and information

### Intelligent Prompts
- **`search_docs`** - Search documentation for specific topics
- **`explain_feature`** - Get comprehensive feature explanations (beginner/intermediate/advanced)
- **`troubleshoot_issue`** - Help troubleshoot issues with step-by-step solutions
- **`implementation_guide`** - Get step-by-step implementation guidance

## 📚 Commands

### Setup & Installation
- `./setup.sh` - Automated setup
- `./install.sh` - Global installation
- `./configure-cursor.sh` - Safe Cursor configuration
- `npm run quick-setup` - One-command setup

### Development
- `npm start` - Start MCP server
- `npm run dev` - Development mode
- `npm run test` - Run integration tests

### Maintenance
- `npm run index:md` - Rebuild search index
- `npm run clean` - Clean index files
- `npm run reset` - Reset and rebuild

## 🎯 Use Cases

### For Developers
- **API Reference Lookups** - Quick access to API documentation
- **Implementation Guides** - Step-by-step integration instructions
- **Code Examples** - Find relevant code snippets and examples
- **Troubleshooting** - Resolve common integration issues

### For Support Teams
- **Customer Issue Resolution** - Find solutions to customer problems
- **Feature Explanations** - Understand and explain Ordergroove features
- **Platform-Specific Guides** - Access platform-specific documentation
- **Integration Support** - Help customers with integration issues

### For Product Teams
- **Feature Documentation** - Access comprehensive feature documentation
- **User Guides** - Find user-facing documentation and guides
- **Platform Capabilities** - Understand Ordergroove's capabilities
- **Integration Requirements** - Review integration requirements and specifications

## 🔧 Troubleshooting

### Common Issues

**Server won't start**
- Check Node.js version: `node --version` (should be 18+)
- Check dependencies: `npm install`

**Search not working**
- Rebuild search index: `npm run index:md`
- Check if `data/index/` files exist

**IDE integration issues**

*Cursor IDE:*
- Verify `~/.cursor/mcp.json` exists and is valid JSON
- Restart Cursor after configuration changes
- Check if `ordergroove-mcp` command is available globally

*VS Code:*
- Ensure you have GitHub Copilot access enabled
- Check that MCP support is enabled in VS Code settings (`chat.mcp.enabled`)
- Verify the MCP server appears in `MCP: List Servers`
- Restart VS Code after adding the MCP server
- Check if `ordergroove-mcp` command is available globally

**Permission errors**
- Check file permissions in the project directory
- Ensure you have write access to the data directory

### Getting Help
- Run `npm test` to diagnose issues
- Check the examples directory for configuration templates
- Review the example queries section below
- Create an issue if you encounter problems

## 📖 Example Queries

### Basic Documentation Search
- "Search Ordergroove documentation for subscription information"
- "Find information about subscription manager"
- "Show me documentation about prepaid subscriptions"
- "Search for API reference documentation"

### API Reference Lookups
- "Show me the subscription API reference"
- "Get the customer API documentation"
- "Display the order API endpoints"
- "Show me the product API reference"

### Implementation Help
- "How do I implement subscription enrollment?"
- "What are the steps to set up cart offers?"
- "Show me the guided selling implementation guide"
- "How do I integrate with Shopify?"

### Troubleshooting
- "Help me troubleshoot subscription manager issues"
- "Find solutions for cart offer problems"
- "Show me common integration issues"
- "What are the troubleshooting steps for API errors?"

## 🏗️ Project Structure

```
ordergroove-mcp/
├── ordergroove-md/          # Single source of truth for all documentation (Markdown)
├── data/index/              # Generated search index and metadata
├── tools/                   # Build and utility scripts
├── examples/                # Configuration templates and helper scripts
│   ├── configs/            # Configuration templates
│   ├── templates/          # Usage templates
│   └── scripts/            # Helper scripts
├── setup.sh                # Automated setup script
├── install.sh              # Global installation script
├── configure-cursor.sh      # Safe Cursor configuration script
├── README.md               # Complete documentation (this file)
└── server.ts               # Main MCP server
```

## 🧪 Testing

### Quick Test
```bash
# Test the server
npm start

# Test global command
ordergroove-mcp

# Run integration tests
npm test
```

### Manual Testing
1. Start the server: `npm start`
2. In another terminal, test with MCP Inspector:
   ```bash
   npx @modelcontextprotocol/inspector npm start
   ```

## 🎨 Customization

### Custom Prompts
Create specialized prompts for your team's specific needs:
- Technical documentation queries
- Customer support scenarios
- Implementation workflows
- Troubleshooting procedures

### Custom Configurations
Tailor the MCP server for your environment:
- Development vs production settings
- Team-specific configurations
- Platform-specific optimizations
- Security and access controls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

## 🎉 You're Ready!

You now have a fully functional Ordergroove MCP Server integrated with your IDE (Cursor or VS Code). You can:

- **Search** Ordergroove documentation instantly
- **Access** specific files and sections
- **Get help** with implementation and troubleshooting
- **Use intelligent prompts** for common tasks

Start exploring and let the MCP server help you work more efficiently with Ordergroove documentation!