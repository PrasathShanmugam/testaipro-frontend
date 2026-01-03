#!/bin/bash

# Ollama Installation Script for TestAI Pro
# This script installs Ollama and the required AI model

set -e

echo "=================================="
echo "Ollama Installation for TestAI Pro"
echo "=================================="
echo ""

# Check if Ollama is already installed
if command -v ollama &> /dev/null; then
    echo "✓ Ollama is already installed"
    ollama --version
else
    echo "→ Installing Ollama..."
    
    # Install Ollama
    curl -fsSL https://ollama.ai/install.sh | sh
    
    echo "✓ Ollama installed successfully"
fi

echo ""
echo "→ Starting Ollama service..."

# Start Ollama service in background
nohup ollama serve > /tmp/ollama.log 2>&1 &

sleep 3

echo "✓ Ollama service started"
echo ""
echo "→ Pulling llama3.2 model (this may take a few minutes)..."

# Pull the required model
ollama pull llama3.2

echo ""
echo "=================================="
echo "✓ Installation Complete!"
echo "=================================="
echo ""
echo "Ollama is now running and ready to use."
echo "The llama3.2 model has been downloaded."
echo ""
echo "To verify:"
echo "  curl http://localhost:11434/api/version"
echo ""
echo "To check available models:"
echo "  ollama list"
echo ""
