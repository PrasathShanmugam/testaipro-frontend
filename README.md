# TestAIPro Frontend - AI-Powered Test Automation UI

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/react-19.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-18+-green.svg)

**TestAIPro Frontend** is the React-based frontend application for the AI-powered test automation platform. It provides an intuitive UI for creating, managing, and executing automated tests.

---

## ✨ Features

- 🎨 **Modern UI** - Built with React 19, Tailwind CSS, and Radix UI
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 📝 **NLP Test Authoring** - Write tests in plain English
- 🤖 **AI Test Generation** - Generate tests from documents
- 🎭 **Test Execution** - Execute and monitor test runs
- 📊 **Dashboard** - View test statistics and execution history
- 🔐 **Authentication** - Secure user authentication
- 📸 **Screenshot Viewing** - View test execution screenshots
- 📱 **Responsive Design** - Works on desktop and tablet

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Yarn (recommended) or npm
- Backend API running (see [testaipro-backend](https://github.com/yourusername/testaipro-backend))

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/testaipro-frontend.git
cd testaipro-frontend
```

### Step 2: Install Dependencies

```bash
# Using Yarn (recommended)
yarn install

# Or using npm
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

For production:

```env
REACT_APP_BACKEND_URL=https://api.yourdomain.com
```

### Step 4: Start Development Server

```bash
# Using Yarn
yarn start

# Or using npm
npm start
```

The application will open at http://localhost:3000

### Step 5: Build for Production

```bash
# Using Yarn
yarn build

# Or using npm
npm run build
```

The production build will be in the `build/` directory.

---

## 🏗️ Project Structure

```
.
├── public/                # Static files
│   └── index.html
├── src/
│   ├── components/       # React components
│   │   ├── common/       # Common components
│   │   └── ui/           # UI components (Radix UI)
│   ├── pages/            # Page components
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Dashboard.js
│   ├── services/         # API services
│   │   └── api.js
│   ├── hooks/            # Custom React hooks
│   │   └── use-toast.js
│   ├── lib/              # Utilities
│   │   └── utils.js
│   ├── App.js            # Main app component
│   ├── index.js          # Entry point
│   └── index.css         # Global styles
├── plugins/               # Webpack plugins
│   ├── health-check/
│   └── visual-edits/
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── craco.config.js
```

---

## 🎨 Tech Stack

- **React 19** - UI framework
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Monaco Editor** - Code editor
- **Recharts** - Data visualization

---

## 🔧 Development

### Available Scripts

```bash
# Start development server
yarn start

# Build for production
yarn build

# Run tests
yarn test

# Lint code
yarn lint
```

### Code Style

- Use ESLint for linting
- Follow React best practices
- Use functional components with hooks
- Maintain accessibility standards (WCAG 2.1 AA)

---

## 🔌 API Integration

The frontend communicates with the backend API through the `api.js` service file.

### API Configuration

Update the backend URL in `.env`:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

### Authentication

The frontend uses JWT tokens stored in `localStorage`. The token is automatically included in API requests via axios interceptors.

### API Services

- `authAPI` - Authentication endpoints
- `projectsAPI` - Project management
- `testsAPI` - Test management
- `executionsAPI` - Test execution
- `dashboardAPI` - Dashboard statistics

---

## 🎯 Features Overview

### Authentication
- User registration
- User login
- Protected routes
- Token-based authentication

### Project Management
- Create projects
- List projects
- Update projects
- Delete projects

### Test Management
- Create tests with NLP scripts
- Parse NLP scripts
- Generate tests from documents
- View and edit tests
- Delete tests

### Test Execution
- Execute tests
- Monitor execution status
- View execution results
- View screenshots

### Dashboard
- View statistics
- Recent executions
- Pass rate metrics

---

## 🐳 Docker Deployment (Optional)

### Build Docker Image

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
```

### Run with Docker

```bash
docker build -t testaipro-frontend .
docker run -p 3000:3000 testaipro-frontend
```

---

## 🔐 Security Considerations

- **API URL**: Use environment variables for backend URL
- **HTTPS**: Always use HTTPS in production
- **Token Storage**: Tokens stored in localStorage (consider httpOnly cookies for production)
- **CORS**: Ensure backend CORS is configured correctly

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## ♿ Accessibility

This application is designed to be WCAG 2.1 AA compliant:

- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA labels
- Color contrast compliance
- Focus management

---

## 🧪 Testing

```bash
# Run tests
yarn test

# Run tests with coverage
yarn test --coverage
```

---

## 📦 Build & Deploy

### Build for Production

```bash
yarn build
```

### Deploy to Static Hosting

The `build/` directory can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting service

### Environment Variables in Production

Make sure to set `REACT_APP_BACKEND_URL` in your hosting platform's environment variables.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📝 License

MIT License - see LICENSE file for details

---

## 🔗 Related Repositories

- **Backend**: [testaipro-backend](https://github.com/yourusername/testaipro-backend)

---

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check the documentation
- Review the backend API docs

---

## 🎨 UI Components

This project uses Radix UI components for accessibility and Tailwind CSS for styling. All components are located in `src/components/ui/`.

---

**Built for QA Engineers and Testers** 🚀

