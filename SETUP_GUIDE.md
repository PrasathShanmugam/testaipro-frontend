# TestAI Pro - Setup Guide

## 🚀 AI-Powered Test Automation Platform

TestAI Pro is an intelligent test automation platform that uses AI and NLP to create, execute, and maintain automated tests with minimal effort.

---

## 📋 Prerequisites

### Required Software
1. **Python 3.11+**
2. **Node.js 18+ & Yarn**
3. **MongoDB** (local or cloud)
4. **Ollama** (for AI features)

---

## 🛠️ Installation Steps

### 1. Setup Backend

```bash
cd /app/backend

# Dependencies are already installed, but if needed:
pip install -r requirements.txt

# Install Playwright browsers
playwright install chromium

# Configure environment variables
# Edit .env file if needed
nano .env
```

**Backend .env file:**
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_automation_db
CORS_ORIGINS=*
JWT_SECRET_KEY=your-secret-key-change-in-production
```

### 2. Setup Frontend

```bash
cd /app/frontend

# Dependencies are already installed, but if needed:
yarn install
```

**Frontend .env file** (already configured):
```
REACT_APP_BACKEND_URL=https://your-domain.preview.emergentagent.com
WDS_SOCKET_PORT=443
```

## 🚀 Running the Application

### Start All Services (Recommended)

```bash
# From /app directory
sudo supervisorctl restart all
```

### Or Start Individual Services

**Backend:**
```bash
cd /app/backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Frontend:**
```bash
cd /app/frontend
yarn start
```

---

## 🔍 Verify Installation

### Check Backend Health
```bash
curl http://localhost:8001/api/health
```

Expected response:
```json
{"status":"healthy","database":"connected"}
```

### Check Frontend
Open browser: `http://localhost:3000`

---

## 📚 Using the Platform

### 1. Register/Login
1. Navigate to the application URL
2. Click "Sign up" to create an account
3. Fill in your details and register

### 2. Create a Project
1. Go to "Projects" in the navigation
2. Click "Create Project"
3. Enter project details (name, description, base URL)

### 3. Create Tests with NLP

**Example Test Script:**
```
go to https://example.com
click on Login button
type 'user@example.com' into Email field
type 'password123' into Password field
click on Submit button
verify 'Welcome' text is visible
```

**The system will:**
- Parse your plain English commands
- Use AI to understand intent
- Identify elements smartly (no CSS selectors needed!)
- Execute tests with auto-healing
- Capture screenshots
- Generate detailed reports

### 4. AI-Powered Test Generation

**From BRD Document:**
1. Go to "Tests" > "Generate from Document"
2. Upload your Business Requirements Document (PDF/DOCX/TXT)
3. AI will analyze and generate comprehensive test cases
4. Review and run the generated tests

### 5. Execute Tests
1. Select a test
2. Click "Run Test"
3. Watch real-time execution
4. View step-by-step results with screenshots
5. Get AI-powered failure root cause analysis

---

## 🎯 Key Features

### ✅ NLP Test Authoring
- Write tests in plain English
- No programming required
- Natural language commands

### 🤖 AI Auto-Healing
- Tests automatically adapt to UI changes
- Smart element detection
- Multiple fallback strategies
- Minimal maintenance

### 📊 Intelligent Reporting
- Step-by-step execution logs
- Screenshots for each step
- Root cause analysis for failures
- Metrics dashboard
- Pass/fail trends

### 🔗 Database Testing Support
- **Snowflake** connections
- **PostgreSQL** queries

### 🌐 Cross-Browser Testing
- Chromium (currently)
- Placeholder for Firefox, Safari, Edge

### ♿ WCAG 2.1 AA Compliant
- Keyboard navigation
- Screen reader compatible
- High contrast support
- Accessible to all users

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check logs
tail -f /var/log/supervisor/backend.err.log

# Common issues:
# 1. Port 8001 in use
sudo lsof -i :8001
kill -9 <PID>

# 2. Missing dependencies
cd /app/backend && pip install -r requirements.txt
```

### Frontend won't start
```bash
# Check logs
tail -f /var/log/supervisor/frontend.err.log

# Common issues:
# 1. Node modules missing
cd /app/frontend && yarn install

# 2. Port 3000 in use
sudo lsof -i :3000
```

### Tests failing to execute
```bash
# Reinstall Playwright browsers
playwright install chromium

# Check browser installation
playwright install --dry-run
```

---

## 📁 Project Structure

```
/app/
├── backend/
│   ├── models/          # Data models (User, Project, Test, Execution)
│   ├── services/        # Business logic services
│   │   ├── auth_service.py
│   │   ├── ai_service.py (Ollama integration)
│   │   ├── nlp_parser.py
│   │   └── executor/
│   │       ├── element_detector.py (Smart element detection)
│   │       └── playwright_executor.py
│   ├── utils/           # Utility functions
│   ├── server.py        # Main FastAPI application
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/       # React pages
│   │   ├── components/  # Reusable components
│   │   └── services/    # API integration
│   ├── package.json
│   └── tailwind.config.js
│
└── SETUP_GUIDE.md       # This file
```

---

## 🔐 Security Notes

**Important: Change these in production**
1. Update `JWT_SECRET_KEY` in backend/.env
2. Use strong MongoDB credentials
3. Enable HTTPS
4. Set proper CORS origins
5. Use OAuth for authentication (placeholder ready)

---

## 🎨 UI Features

- **Modern Gradient Design**: Beautiful, eye-catching interface
- **Responsive Layout**: Works on all screen sizes
- **Dark Mode Ready**: Easy to add dark mode support
- **Smooth Animations**: Framer Motion powered transitions
- **Accessible**: WCAG 2.1 AA compliant

---

## 🔮 Future Enhancements (Placeholders Ready)

- **JIRA Cloud Integration**: Fetch requirements directly from JIRA
- **Cloud Test Execution**: Run tests in cloud containers
- **OAuth Authentication**: Google, GitHub login
- **Multiple Databases**: MySQL, Oracle, SQL Server support
- **Cross-Browser**: Firefox, Safari, Edge support
- **CI/CD Webhooks**: Jenkins, GitHub Actions integration
- **Video Recording**: Full test execution videos
- **API Testing**: REST API endpoint testing
- **Performance Testing**: Load and stress testing

---

## 📞 Support

For issues or questions:
1. Check the logs: `/var/log/supervisor/`
2. Verify all services are running: `sudo supervisorctl status`
3. Check MongoDB connection: `mongo --eval "db.runCommand({ ping: 1 })"`
4. Test Ollama: `ollama list`

---

## 📝 API Documentation

Once running, visit:
- **API Docs**: `http://localhost:8001/docs`
- **Alternative Docs**: `http://localhost:8001/redoc`

---

## 🎉 You're Ready!

The platform is now fully set up and ready to use. Start by:
1. Creating an account
2. Creating your first project
3. Writing your first test in plain English
4. Running it and watching the magic happen!

**Remember**: This tool uses AI to understand your tests, so the more descriptive you are, the better it works!

---

**Built with ❤️ for QA Engineers and Testers**
