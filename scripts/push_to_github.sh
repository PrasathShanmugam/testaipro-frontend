#!/bin/bash

# Script to push latest code to GitHub (replacing all files)
# Usage: bash scripts/push_to_github.sh

set -e

echo "=============================================="
echo "Push to GitHub - Replace All Files"
echo "=============================================="
echo ""

# Change to project directory
cd /app

echo "📂 Current directory: $(pwd)"
echo ""

# Check if .git exists
if [ ! -d ".git" ]; then
    echo "❌ Error: .git directory not found!"
    echo "   Please initialize Git first: git init"
    exit 1
fi

echo "✅ Git repository found"
echo ""

# Show current branch
BRANCH=$(git branch --show-current)
echo "📍 Current branch: $BRANCH"
echo ""

# Ask for confirmation
read -p "⚠️  This will REPLACE all files in the '$BRANCH' branch. Continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Aborted by user"
    exit 0
fi

echo ""
echo "Step 1: Removing all tracked files from Git..."
git rm -r --cached . 2>/dev/null || echo "   (already clean)"

echo ""
echo "Step 2: Creating/updating .gitignore..."
cat > .gitignore << 'EOF'
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
env/
ENV/
*.egg-info/
.pytest_cache/

# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
build/
dist/

# IDEs
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Environment
.env.local
.env.*.local

# Logs
*.log
logs/

# Database
*.sqlite
*.db

# Artifacts
backend/screenshots/
backend/uploads/
backend/test_artifacts/
test_reports/

# Temporary
*.tmp
*.temp
.cache/
coverage/
EOF

echo "✅ .gitignore created"

echo ""
echo "Step 3: Adding all current files..."
git add .

echo ""
echo "Step 4: Creating commit..."
git commit -m "Update: Complete codebase refresh with Ollama Cloud integration

- Integrated Ollama Cloud API (gemini-3-pro-preview)
- Removed all Emergent branding
- Renamed .emergent to .testai_config
- Updated all documentation for Ollama Cloud only
- Simplified setup (3 services instead of 4)
- Completed Modules 1 & 2 (Authentication + NLP Test Authoring)
- Added comprehensive setup guides
- WCAG 2.1 AA compliant UI
"

echo ""
echo "Step 5: Files to be pushed:"
git diff --cached --name-only | head -20
echo ""

# Ask for final confirmation
read -p "🚀 Ready to force push to '$BRANCH'? (yes/no): " FINAL_CONFIRM

if [ "$FINAL_CONFIRM" != "yes" ]; then
    echo "❌ Push cancelled"
    echo "   Your changes are committed locally but not pushed"
    echo "   To push later: git push origin $BRANCH --force"
    exit 0
fi

echo ""
echo "Pushing to GitHub..."
git push origin $BRANCH --force

echo ""
echo "=============================================="
echo "✅ Successfully pushed to GitHub!"
echo "=============================================="
echo ""
echo "🔍 Verify on GitHub:"
echo "   - Check that old files are removed"
echo "   - Check that new files are present"
echo "   - Verify .testai_config folder exists"
echo ""
echo "Repository: $(git remote get-url origin)"
echo "Branch: $BRANCH"
echo ""
