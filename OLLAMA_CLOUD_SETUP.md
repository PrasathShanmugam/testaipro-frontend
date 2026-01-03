# Ollama Cloud Configuration

## ✅ Current Setup

TestAI Pro is now configured to use **Ollama Cloud** instead of local Ollama installation.

### Configuration Details

**Model**: `gemini-3-pro-preview`  
**Host**: `https://ollama.com`  
**API Key**: Configured in `.env` file  

---

## 🔧 Environment Variables

The following variables are set in `/app/backend/.env`:

```env
OLLAMA_API_KEY=d3dd90ec6ade487e915147edaf8ce8af.JoK1e-oW-exfdx5o7WVP9fRA
OLLAMA_HOST=https://ollama.com
OLLAMA_MODEL=gemini-3-pro-preview
```

---

## 🚀 Benefits of Ollama Cloud

✅ **No Local Installation Required**
- No need to install Ollama locally
- No need to download large AI models (~2GB)
- Saves disk space

✅ **Always Updated**
- Latest model versions automatically
- No manual updates required
- Better performance with cloud infrastructure

✅ **Scalable**
- Handle multiple concurrent requests
- No local resource limitations
- Better for production environments

---

## 🎯 What This Enables

### 1. NLP Test Parsing
Write tests in plain English:
```
go to https://example.com
click on Login button
type 'user@test.com' into Email field
```

The AI parses these commands into structured test steps.

### 2. Test Generation from Documents
Upload a BRD (PDF/DOCX) and AI will:
- Extract requirements
- Generate test cases
- Identify edge cases
- Create step-by-step tests

### 3. Failure Root Cause Analysis
When a test fails, AI analyzes:
- Error messages
- Screenshots
- Execution context
- Provides fix suggestions

---

## 🔄 Switching Between Local and Cloud

### Using Cloud (Current Setup)
```env
# backend/.env
OLLAMA_HOST=https://ollama.com
OLLAMA_API_KEY=your-api-key
OLLAMA_MODEL=gemini-3-pro-preview
```

### Using Local Ollama
```env
# backend/.env
OLLAMA_HOST=http://localhost:11434
OLLAMA_API_KEY=  # Leave empty for local
OLLAMA_MODEL=llama3.2
```

Then start local Ollama:
```bash
ollama serve
ollama pull llama3.2
```

---

## 🧪 Testing the AI Integration

### Test NLP Parsing
```bash
curl -X POST http://localhost:8001/api/tests/parse \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "script": "go to https://example.com\nclick on Login button\ntype '\''user@test.com'\'' into Email field"
  }'
```

### Test Document Generation
```bash
# Upload a BRD document
curl -X POST http://localhost:8001/api/tests/generate-from-document \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/document.pdf"
```

---

## 📊 API Usage

The AI Service is called automatically when:

1. **Creating Tests**
   - Parsing NLP commands
   - Validating test scripts
   - Generating test steps

2. **Generating Tests**
   - Uploading BRD documents
   - Processing requirements
   - Creating edge cases

3. **Executing Tests**
   - Analyzing failures
   - Providing root causes
   - Suggesting fixes

---

## 🔐 Security Notes

### API Key Storage
- ✅ Stored in `.env` file (not committed to git)
- ✅ Server-side only (never exposed to frontend)
- ✅ Environment variable based (secure)

### Best Practices
1. Never commit `.env` file to version control
2. Use different API keys for dev/staging/production
3. Rotate API keys periodically
4. Monitor API usage and costs

---

## 💡 Model Information

### gemini-3-pro-preview

**Capabilities:**
- Advanced natural language understanding
- JSON structured output
- Code and test generation
- Multi-turn conversations
- Context retention

**Best For:**
- NLP command parsing
- Test case generation
- Requirement analysis
- Error diagnosis

---

## 📈 Performance

### Expected Response Times
- **NLP Parsing**: 1-3 seconds
- **Document Analysis**: 5-15 seconds (depends on size)
- **Failure Analysis**: 1-2 seconds

### Rate Limits
Check your Ollama Cloud plan for:
- Requests per minute
- Requests per day
- Token limits

---

## 🐛 Troubleshooting

### "AI features not working"

**Check Backend Logs:**
```bash
tail -f /var/log/supervisor/backend.err.log | grep -i "ollama"
```

**Verify API Key:**
```bash
cd /app/backend
source venv/bin/activate
python -c "import os; from dotenv import load_dotenv; load_dotenv('.env'); print('API Key:', os.getenv('OLLAMA_API_KEY')[:20] + '...')"
```

**Test API Directly:**
```bash
curl -X POST https://ollama.com/api/chat \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-3-pro-preview",
    "messages": [{"role": "user", "content": "Hello"}],
    "stream": false
  }'
```

### "Invalid API Key" Error

1. Check `.env` file has correct key
2. Restart backend: `sudo supervisorctl restart backend`
3. Verify key format (should be alphanumeric with dots/dashes)

### "Model not found" Error

1. Check `OLLAMA_MODEL` in `.env`
2. Verify model name spelling
3. Check if model is available in your Ollama Cloud plan

---

## 🔄 Fallback Behavior

If Ollama Cloud API fails, the system will:

1. **Log the Error**
   - Detailed error message in logs
   - HTTP status code
   - API response

2. **Use Fallback Logic**
   - Basic rule-based NLP parsing
   - Still functional, but less intelligent
   - No AI-powered features

3. **Continue Operation**
   - Tests can still be created manually
   - Execution works normally
   - Reports are generated

---

## 📞 Support

### Ollama Cloud Support
- Website: https://ollama.com
- Documentation: https://ollama.com/docs
- Status: https://status.ollama.com

### Check API Status
```bash
curl -I https://ollama.com/api/health
```

---

## 🎉 Summary

✅ **Ollama Cloud Configured**
- API Key: Set in `.env`
- Model: gemini-3-pro-preview
- Host: https://ollama.com

✅ **Features Enabled**
- NLP test parsing
- Document-based test generation
- AI-powered failure analysis

✅ **No Local Installation Needed**
- Saves ~2GB disk space
- No manual model downloads
- Always up-to-date

**Everything is ready to use!** 🚀

Test it by creating a test with plain English commands in the UI.
