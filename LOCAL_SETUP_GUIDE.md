# TestAI Pro - Complete Local Setup Guide

This guide will help you set up and run the complete TestAI Pro application (frontend + backend) from scratch on your local machine.

## 🎯 What You'll Get

A fully functional test automation platform with:
- ✅ **Frontend**: React web UI for creating and managing tests
- ✅ **Backend API**: FastAPI with async test execution
- ✅ **PostgreSQL**: Relational database for storing tests & results
- ✅ **Weaviate**: Vector database for semantic search
- ✅ **MinIO**: S3-compatible storage for screenshots
- ✅ **Redis + Celery**: Async task queue for test execution
- ✅ **Alembic**: Database migrations

---

## 📋 Prerequisites

Before you start, make sure you have:

### Required
- ✅ **Docker Desktop** (for running PostgreSQL, Redis, etc.)
  - Download: https://www.docker.com/products/docker-desktop/
  - **Must be running before starting services**
  
- ✅ **Python 3.11 or higher**
  - Download: https://www.python.org/downloads/
  - Check version: `python --version`
  
- ✅ **Node.js 18+ and Yarn** (for frontend)
  - Download Node.js: https://nodejs.org/
  - Install Yarn: `npm install -g yarn`
  - Check versions: `node --version` and `yarn --version`

### Optional but Recommended
- **VS Code** (code editor)
- **Postman** (for testing APIs)
- **pgAdmin** or **DBeaver** (for viewing database)

---

## 🚀 Complete Setup Steps

### Step 1: Clone the Repository (if not already done)

```powershell
cd "e:\Automation Technical\Amida\DevWorkspace"
git clone <your-repo-url> TestAIPro
cd TestAIPro
```

---

### Step 2: Start Docker Services

**Important**: Make sure Docker Desktop is running!

```powershell
# Make sure you're in the project root
cd "e:\Automation Technical\Amida\DevWorkspace\TestAIPro"

# Start all services (PostgreSQL, Weaviate, MinIO, Redis)
docker-compose up -d

# Verify all services are running
docker-compose ps
```

Expected output - all should show "Up" status:
```
NAME                STATUS    PORTS
testai_postgres     Up        0.0.0.0:5432->5432/tcp
testai_weaviate     Up        0.0.0.0:8080->8080/tcp
testai_minio        Up        0.0.0.0:9000-9001->9000-9001/tcp
testai_redis        Up        0.0.0.0:6379->6379/tcp
```

**Check Service Health:**
```powershell
# View logs if any service fails
docker-compose logs postgres
docker-compose logs redis
```

---

### Step 3: Set Up Backend

#### 3.1 Create Python Virtual Environment

```powershell
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# If you get execution policy error:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# Then try activating again
```

You should see `(venv)` in your terminal prompt.

#### 3.2 Install Python Dependencies

```powershell
# Still in backend directory with venv activated
# Upgrade pip first
python -m pip install --upgrade pip

# Install all requirements
pip install -r requirements.txt

# This installs: FastAPI, SQLAlchemy, Alembic, Celery, Redis, Weaviate, MinIO, etc.
```

#### 3.3 Install Playwright Browsers

```powershell
# Install Chromium for test execution
playwright install chromium

# This downloads ~150MB
```

#### 3.4 Create Environment Configuration

Create a file named `.env` in the `backend` directory with this content:

```env
# Database
DATABASE_URL=postgresql+asyncpg://testai_user:testai_password@localhost:5432/testai_db

# Redis & Celery
REDIS_URL=redis://localhost:6379/0
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0

# MinIO (S3 Storage)
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET_NAME=testai-artifacts
S3_USE_SSL=false

# Weaviate (Vector DB)
WEAVIATE_URL=http://localhost:8080

# Ollama (AI - optional, can leave as-is)
OLLAMA_BASE_URL=https://ollama.ai
OLLAMA_API_KEY=your_api_key_here

# Security (change in production!)
SECRET_KEY=dev-secret-key-change-in-production-12345
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:8000

# Environment
ENVIRONMENT=development
```

**Important**: Save this file as `backend\.env`

#### 3.5 Initialize Database with Alembic

```powershell
# Still in backend directory with venv activated

# Create initial database migration
alembic revision --autogenerate -m "Initial schema"

# Apply the migration (creates all tables)
alembic upgrade head

# Verify migration was successful
alembic current
```

Expected output:
```
INFO  [alembic.runtime.migration] Running upgrade  -> abc123, Initial schema
abc123def456 (head)
```

---

### Step 4: Start Backend Services

You'll need **3 separate terminal windows** for the backend:

#### Terminal 1: Celery Worker (for async test execution)

```powershell
cd "e:\Automation Technical\Amida\DevWorkspace\TestAIPro\backend"
.\venv\Scripts\Activate.ps1

# Start Celery worker
celery -A celery_app worker --loglevel=info --pool=solo
```

Keep this running. You should see:
```
[tasks]
  . tasks.cleanup_old_executions
  . tasks.execute_test

celery@YOURHOSTNAME ready.
```

#### Terminal 2: FastAPI Backend Server

```powershell
cd "e:\Automation Technical\Amida\DevWorkspace\TestAIPro\backend"
.\venv\Scripts\Activate.ps1

# Start FastAPI server
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

Keep this running. You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

**Test the API**: Open http://localhost:8000/docs in your browser
- You should see the FastAPI interactive documentation

#### Terminal 3: Keep available for commands

Keep this terminal for running migrations, testing, etc.

---

### Step 5: Set Up Frontend

Open a **new terminal** for the frontend:

```powershell
# Navigate to frontend directory
cd "e:\Automation Technical\Amida\DevWorkspace\TestAIPro\frontend"

# Install dependencies (first time only - takes a few minutes)
yarn install

# Start development server
yarn start
```

The frontend will automatically open in your browser at http://localhost:3000

**If it doesn't open automatically**, navigate to: http://localhost:3000

---

## ✅ Verify Everything is Working

### 1. Check All Services

Open these URLs in your browser:

| Service | URL | Expected Result |
|---------|-----|-----------------|
| **Frontend** | http://localhost:3000 | React app loads |
| **Backend API Docs** | http://localhost:8000/docs | Swagger UI loads |
| **Health Check** | http://localhost:8000/api/health | `{"status": "healthy"}` |
| **MinIO Console** | http://localhost:9001 | Login page (minioadmin/minioadmin) |

### 2. Test Backend Services

In a terminal with venv activated:

```powershell
cd backend
.\venv\Scripts\Activate.ps1

python -c "
from services.storage_service import storage_service
from services.vector_service import vector_service
import redis

print('✅ Storage Service Ready:', storage_service.is_ready())
print('✅ Vector Service Ready:', vector_service.is_ready())

r = redis.from_url('redis://localhost:6379/0')
print('✅ Redis Ready:', r.ping())
print('\nAll services are operational!')
"
```

All should return `True`.

---

## 🎮 Play with the Application

### Option 1: Use the Frontend (Web UI)

1. Open http://localhost:3000
2. Click "Register" to create an account
3. Log in with your credentials
4. Create a new project
5. Create a test using the NLP script editor
6. Execute the test and see results

### Option 2: Use Postman (API Testing)

See the **POSTMAN_API_GUIDE.md** guide for detailed API examples.

**Quick Test Flow:**

1. **Register a User**
```
POST http://localhost:8000/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "full_name": "Test User"
}
```

2. **Create a Project**
```
POST http://localhost:8000/api/projects
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "name": "My First Project",
  "description": "Testing TestAI Pro",
  "base_url": "https://example.com"
}
```

3. **Create a Test**
```
POST http://localhost:8000/api/tests
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "name": "Login Test",
  "description": "Test login functionality",
  "project_id": "<project_id>",
  "test_type": "ui",
  "nlp_script": "go to https://example.com\nclick on Login button\ntype 'user@test.com' into Email field"
}
```

4. **Execute Test (Async)**
```
POST http://localhost:8000/api/executions
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "test_id": "<test_id>",
  "browser": "chromium"
}
```

5. **Check Execution Status**
```
GET http://localhost:8000/api/executions/<execution_id>
Authorization: Bearer <your_token>
```

---

## 🎨 Understanding the Architecture

```
Your Application Stack:

Frontend (React)           Backend (FastAPI)
http://localhost:3000  →   http://localhost:8000
        │                           │
        └───────────────┬───────────┘
                        │
        ┌───────────────┼───────────────────┐
        ▼               ▼                   ▼
   PostgreSQL       Weaviate            MinIO
    (Data)       (Vector Search)    (Screenshots)
        │               
        ▼               
    Redis + Celery
  (Async Tasks)
```

**What each service does:**
- **Frontend**: User interface for creating and managing tests
- **Backend**: REST API, business logic, authentication
- **PostgreSQL**: Stores users, projects, tests, execution results
- **Weaviate**: Semantic search for finding similar tests
- **MinIO**: Stores test screenshots and artifacts (like AWS S3)
- **Redis**: Message queue for async operations
- **Celery**: Background workers that execute tests asynchronously

---

## 🛠️ Development Workflow

### Making Database Changes

When you modify models (e.g., add a new field):

```powershell
cd backend
.\venv\Scripts\Activate.ps1

# Create migration
alembic revision --autogenerate -m "Add new field to User table"

# Review the migration file in alembic/versions/

# Apply migration
alembic upgrade head
```

### Restarting Services

If you make code changes:

**Backend (auto-reloads with --reload flag):**
- Just save your file, uvicorn will restart automatically

**Frontend (auto-reloads):**
- Just save your file, React will rebuild automatically

**Celery (manual restart needed):**
```powershell
# Press CTRL+C in Celery terminal
# Then restart:
celery -A celery_app worker --loglevel=info --pool=solo
```

**Docker Services (rarely needed):**
```powershell
docker-compose restart postgres
# or
docker-compose restart redis
```

---

## 🛑 Stopping Everything

### Stop Backend Services
1. Press `CTRL+C` in each terminal (Celery, FastAPI, Frontend)

### Stop Docker Services
```powershell
docker-compose down

# To also delete all data (fresh start):
docker-compose down -v
```

---

## 🔄 Daily Startup Routine

**When you come back to work on the app:**

```powershell
# Terminal 1: Start Docker services
cd "e:\Automation Technical\Amida\DevWorkspace\TestAIPro"
docker-compose up -d

# Terminal 2: Start Celery
cd backend
.\venv\Scripts\Activate.ps1
celery -A celery_app worker --loglevel=info --pool=solo

# Terminal 3: Start Backend API
cd backend
.\venv\Scripts\Activate.ps1
uvicorn server:app --reload --host 0.0.0.0 --port 8000

# Terminal 4: Start Frontend
cd frontend
yarn start
```

**Browser will open to**: http://localhost:3000

---

## 🐛 Troubleshooting

### "Docker services won't start"

```powershell
# Make sure Docker Desktop is running
# Check for port conflicts
docker-compose down
docker-compose up -d
docker-compose ps
```

### "Can't connect to database"

```powershell
# Wait 15 seconds for PostgreSQL to fully start
Start-Sleep -Seconds 15

# Check if it's running
docker-compose logs postgres

# Test connection
docker exec -it testai_postgres psql -U testai_user -d testai_db -c "SELECT 1;"
```

### "Frontend won't start"

```powershell
# Delete node_modules and reinstall
cd frontend
Remove-Item -Recurse -Force node_modules
yarn install
yarn start
```

### "Alembic migration fails"

```powershell
# Check current state
alembic current

# Reset if needed
alembic downgrade base
alembic upgrade head

# Or fresh start (loses data!)
docker-compose down -v
docker-compose up -d
Start-Sleep -Seconds 15
alembic revision --autogenerate -m "Initial schema"
alembic upgrade head
```

### "Port already in use"

```powershell
# Find what's using port 8000
netstat -ano | findstr :8000

# Kill the process (replace <PID> with actual number)
taskkill /PID <PID> /F
```

---

## 📚 Additional Resources

### Documentation Files
- **POSTMAN_API_GUIDE.md** (in artifacts) - Complete API testing guide with examples
- **ALEMBIC_MIGRATION_GUIDE.md** (in artifacts) - Database migration best practices
- **walkthrough.md** (in artifacts) - Implementation details and architecture

### Service Consoles
- **MinIO Console**: http://localhost:9001 (username: minioadmin, password: minioadmin)
  - View uploaded test screenshots here
  
- **API Documentation**: http://localhost:8000/docs
  - Interactive API testing
  
- **PostgreSQL** (use any client):
  - Host: localhost:5432
  - User: testai_user
  - Password: testai_password
  - Database: testai_db

### Useful Commands

```powershell
# Check Docker services
docker-compose ps
docker-compose logs <service_name>

# Database operations
alembic current                    # Current version
alembic history                    # Migration history
alembic upgrade head               # Apply migrations
alembic downgrade -1               # Rollback one migration

# Backend
pip list                           # Installed packages
python -m pytest                   # Run tests (if available)

# Frontend
yarn build                         # Production build
yarn test                          # Run tests
```

---

## 🎯 Next Steps to Explore

1. **Create your first test using the UI**
   - Try the NLP script editor
   - Execute and watch it run
   - View screenshots in MinIO

2. **Explore the API with Postman**
   - Follow POSTMAN_API_GUIDE.md
   - Test all endpoints
   - Create automated flows

3. **Modify the database schema**
   - Add a field to a model
   - Create and apply migration
   - See it in the database

4. **Monitor test execution**
   - Watch Celery logs as tests run
   - See real-time status updates
   - Check execution results

5. **Play with features**
   - Create multiple projects
   - Organize tests with tags
   - Use filters and search
   - View analytics dashboard

---

## 💡 Pro Tips

1. **Keep terminals organized**: Use Windows Terminal or similar with tabs
2. **Use VS Code**: Open the entire project folder for easy editing
3. **Check logs often**: Celery and FastAPI logs show what's happening
4. **Backup database**: Before major changes, backup with `docker-compose down` (keeps volumes)
5. **Use Postman Collections**: Save your API requests for reuse

---

## ✨ You're All Set!

Your TestAI Pro application is now running locally. You have:

✅ Frontend at http://localhost:3000  
✅ Backend API at http://localhost:8000  
✅ All services running in Docker  
✅ Database with migrations  
✅ Async test execution with Celery  
✅ S3 storage for screenshots  
✅ Vector search capability  

**Start exploring and building your test automation workflows!** 🚀

---

**Need help?** Check the troubleshooting section above or review the documentation files in the project.

Happy Testing! 🎉
