# TestAI Pro - Software Requirements

## 📦 Complete Software Stack

This document lists all software and dependencies required to run TestAI Pro on your local machine.

---

## 🎯 Core Software Requirements

### 1. Python 3.11 or Higher
- **Required For**: Backend API server
- **Download**: https://www.python.org/downloads/
- **Verify**: `python3.11 --version`
- **Minimum Version**: 3.11.0

---

### 2. Node.js 18+ and Yarn
- **Required For**: Frontend React application
- **Download**: https://nodejs.org/
- **Verify**: 
  - `node --version` (should be 18.x or higher)
  - `yarn --version`
- **Install Yarn**: `npm install -g yarn`

---

### 3. MongoDB 6.0+
- **Required For**: Database storage
- **Options**:
  - **Local**: https://www.mongodb.com/try/download/community
  - **Cloud**: https://www.mongodb.com/cloud/atlas (free tier available)
- **Verify**: `mongod --version`
- **Minimum Version**: 6.0.0

---

### 4. **Using Ollama Cloud** ✅
- **Required For**: AI-powered test generation and NLP parsing
- **Installation**: NOT REQUIRED - Using cloud-based API
- **Model**: gemini-3-pro-preview (cloud-hosted)
- **Setup**: Already configured in backend/.env
- **Benefits**: No local installation, no disk space, always updated

---

### 5. Git (Optional)
- **Required For**: Version control (optional)
- **Download**: https://git-scm.com/downloads
- **Verify**: `git --version`

---

## 🐍 Python Dependencies (Backend)

All Python packages in `backend/requirements.txt`:

### Web Framework
- **fastapi** (0.110.1) - Modern web framework
- **uvicorn** (0.25.0) - ASGI server

### Database
- **motor** (3.3.1) - Async MongoDB driver
- **pymongo** (4.5.0) - MongoDB driver
- **psycopg2-binary** (latest) - PostgreSQL driver
- **snowflake-connector-python** (latest) - Snowflake driver

### Authentication & Security
- **python-jose** (3.3.0) - JWT tokens
- **passlib** (1.7.4) - Password hashing
- **bcrypt** (4.1.3) - Secure hashing
- **pyjwt** (2.10.1) - JWT handling
- **cryptography** (42.0.8+) - Encryption

### Test Automation
- **playwright** (latest) - Browser automation
- **ollama** (latest) - AI integration

### Document Processing
- **PyPDF2** (latest) - PDF parsing
- **python-docx** (latest) - DOCX parsing
- **pillow** (latest) - Image processing

### Utilities
- **pydantic** (2.6.4+) - Data validation
- **python-dotenv** (1.0.1+) - Environment variables
- **requests** (2.31.0+) - HTTP client
- **python-multipart** (0.0.9+) - File uploads
- **email-validator** (2.2.0+) - Email validation

### Data Processing
- **pandas** (2.2.0+) - Data analysis
- **numpy** (1.26.0+) - Numerical computing

### Development Tools
- **pytest** (8.0.0+) - Testing
- **black** (24.1.1+) - Code formatting
- **isort** (5.13.2+) - Import sorting
- **flake8** (7.0.0+) - Linting
- **mypy** (1.8.0+) - Type checking

### AWS & Cloud
- **boto3** (1.34.129+) - AWS SDK

---

## 📦 Node.js Dependencies (Frontend)

All packages in `frontend/package.json`:

### Core Framework
- **react** (19.0.0) - UI framework
- **react-dom** (19.0.0) - React DOM renderer
- **react-scripts** (5.0.1) - Build tooling

### Routing
- **react-router-dom** (7.5.1+) - Navigation

### HTTP Client
- **axios** (1.8.4+) - API requests

### UI Components
- **@radix-ui/react-*** (latest) - Accessible component library
  - accordion, alert-dialog, avatar, checkbox, dialog
  - dropdown-menu, label, popover, progress, radio-group
  - select, separator, slider, switch, tabs, toast, tooltip

### Styling
- **tailwindcss** (3.4.17+) - Utility-first CSS
- **tailwind-merge** (3.2.0+) - Class merging
- **tailwindcss-animate** (1.0.7) - Animations
- **class-variance-authority** (0.7.1) - Variant management
- **clsx** (2.1.1) - Conditional classes

### Icons
- **lucide-react** (0.507.0+) - Icon library

### Forms
- **react-hook-form** (7.56.2+) - Form management
- **@hookform/resolvers** (5.0.1+) - Form validation
- **zod** (3.24.4+) - Schema validation

### Animations
- **framer-motion** (latest) - Animation library

### Code Editor
- **react-ace** (latest) - Code editor component
- **ace-builds** (latest) - Ace editor
- **@monaco-editor/react** (latest) - Monaco editor

### Utilities
- **date-fns** (4.1.0+) - Date formatting
- **react-dropzone** (latest) - File upload
- **react-syntax-highlighter** (latest) - Code highlighting
- **sonner** (2.0.3+) - Toast notifications

### Charts (for future use)
- **recharts** (latest) - Charting library

### Development Tools
- **@craco/craco** (7.1.0) - CRA configuration
- **eslint** (9.23.0) - Linting
- **eslint-plugin-react** (7.37.4) - React linting
- **eslint-plugin-jsx-a11y** (6.10.2) - Accessibility linting
- **autoprefixer** (10.4.20+) - CSS prefixing
- **postcss** (8.4.49+) - CSS processing

---

## 🔧 System Requirements

### Minimum Hardware
- **CPU**: 2 cores
- **RAM**: 4 GB
- **Storage**: 2 GB free space

### Recommended Hardware
- **CPU**: 4+ cores
- **RAM**: 8+ GB
- **Storage**: 2+ GB free space

### Operating Systems
- **Linux**: Ubuntu 20.04+, Debian 11+, CentOS 8+
- **macOS**: 11.0 (Big Sur) or later
- **Windows**: 10 or 11 (64-bit)

---

## 🌐 Network Requirements

### Ports Used
- **3000**: Frontend React app (development)
- **8001**: Backend FastAPI server
- **27017**: MongoDB database (if MongoDB used)

### Firewall Rules
```bash
# Allow these ports on localhost
sudo ufw allow 3000/tcp
sudo ufw allow 8001/tcp
sudo ufw allow 27017/tcp
sudo ufw allow 11434/tcp
```

---

## 📥 Installation Size

### Disk Space Requirements

**Backend:**
- Python packages: ~500 MB
- Playwright browsers: ~300 MB
- Total: ~800 MB

**Frontend:**
- Node modules: ~400 MB
- Build artifacts: ~100 MB
- Total: ~500 MB

**Database:**
- MongoDB installation: ~500 MB
- Initial data: ~50 MB

**Ollama:**
- **Using Ollama Cloud: 0 MB** ✅

**Total Space Required**: ~2 GB (saved ~2GB by using cloud!)

---

## 🔄 Version Compatibility Matrix

| Component | Minimum Version | Recommended | Tested With |
|-----------|----------------|-------------|-------------|
| Python | 3.11.0 | 3.11.5+ | 3.11.7 |
| Node.js | 18.0.0 | 18.18.0+ | 18.19.0 |
| MongoDB | 6.0.0 | 6.0.5+ | 6.0.8 |
| Ollama Cloud | Cloud API | N/A | API-based |
| Playwright | 1.40.0 | 1.45.0+ | 1.56.0 |

---

## 📋 Installation Checklist

Before starting, verify you have:

- [ ] Python 3.11+ installed
- [ ] Node.js 18+ installed
- [ ] Yarn package manager installed
- [ ] MongoDB 6.0+ installed and running
- [ ] Using Ollama Cloud - No installation needed! ✅
- [ ] At least 2 GB free disk space (saved 2GB!)
- [ ] Ports 3000, 8001, 27017 available

**All set?** Proceed to `QUICK_START.md` or `LOCAL_SETUP_GUIDE.md`

---

## 🆘 Alternative Options

### If you don't want to install MongoDB locally:
✅ Use **MongoDB Atlas** (cloud, free tier available)
- No local installation needed
- 512 MB free storage
- https://www.mongodb.com/cloud/atlas

### Ollama Cloud (Already Configured!)
✅ All AI features work out of the box
- NLP parsing fully functional
- Test generation from BRD works perfectly
- Test execution with AI auto-healing
- No local installation required

### If you have limited disk space:
- Use MongoDB Atlas instead of local MongoDB (~500MB saved)
- Ollama Cloud already saves ~2GB (no local AI models needed)

---

## 🐳 Docker Alternative (Optional)

If you prefer Docker:
```bash
# Coming soon - Docker Compose configuration
docker-compose up
```

This will automatically set up:
- Backend container
- Frontend container
- MongoDB container

**Note**: Docker configuration not included in current version.

---

## 📞 Getting Help

**Installation Issues?**
1. Check `LOCAL_SETUP_GUIDE.md` for detailed instructions
2. Review troubleshooting section
3. Verify all version requirements are met
4. Check firewall/antivirus settings

**Missing Dependencies?**
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
yarn install
```

---

**Ready to Install?** Follow `QUICK_START.md` for 5-minute setup! 🚀
