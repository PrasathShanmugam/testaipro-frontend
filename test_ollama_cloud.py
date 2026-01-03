#!/usr/bin/env python3
"""
Test script to verify Ollama Cloud integration
"""

import asyncio
import sys
import os
sys.path.insert(0, '/app/backend')

from services.ai_service import AIService

async def test_ollama_cloud():
    print("=" * 60)
    print("Testing Ollama Cloud Integration")
    print("=" * 60)
    print()
    
    # Initialize AI Service
    print("Initializing AI Service...")
    ai_service = AIService()
    print(f"✓ Model: {ai_service.model}")
    print(f"✓ Host: {ai_service.host}")
    print(f"✓ API Key: {ai_service.api_key[:20]}..." if ai_service.api_key else "✗ API Key not set")
    print()
    
    # Test 1: Parse NLP Command
    print("Test 1: Parsing NLP Command")
    print("-" * 60)
    test_command = "click on Login button"
    print(f"Input: '{test_command}'")
    
    try:
        result = await ai_service.parse_nlp_command(test_command)
        print("✓ Success!")
        print(f"Result: {result}")
    except Exception as e:
        print(f"✗ Failed: {e}")
    
    print()
    
    # Test 2: Analyze Failure
    print("Test 2: Analyzing Test Failure")
    print("-" * 60)
    error_msg = "Element not found: Login button"
    print(f"Input: '{error_msg}'")
    
    try:
        result = await ai_service.analyze_failure_root_cause(error_msg)
        print("✓ Success!")
        print(f"Result: {result}")
    except Exception as e:
        print(f"✗ Failed: {e}")
    
    print()
    print("=" * 60)
    print("Tests Complete!")
    print("=" * 60)

if __name__ == "__main__":
    # Load environment variables
    from dotenv import load_dotenv
    from pathlib import Path
    
    env_path = Path("/app/backend/.env")
    load_dotenv(env_path)
    
    print("Environment Variables:")
    print(f"  OLLAMA_HOST: {os.getenv('OLLAMA_HOST')}")
    print(f"  OLLAMA_MODEL: {os.getenv('OLLAMA_MODEL')}")
    print(f"  OLLAMA_API_KEY: {'Set' if os.getenv('OLLAMA_API_KEY') else 'Not Set'}")
    print()
    
    # Run tests
    asyncio.run(test_ollama_cloud())
