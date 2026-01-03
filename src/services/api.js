import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API methods
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const projectsAPI = {
  create: (data) => api.post('/projects', data),
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const testsAPI = {
  create: (data) => api.post('/tests', data),
  getAll: (projectId) => api.get('/tests', { params: { project_id: projectId } }),
  getById: (id) => api.get(`/tests/${id}`),
  update: (id, data) => api.put(`/tests/${id}`, data),
  delete: (id) => api.delete(`/tests/${id}`),
  parse: (script) => api.post('/tests/parse', { script }),
  generateFromDocument: (file, projectId) => {
    const formData = new FormData();
    formData.append('file', file);
    if (projectId) formData.append('project_id', projectId);
    return api.post('/tests/generate-from-document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const executionsAPI = {
  create: (data) => api.post('/executions', data),
  getAll: (params) => api.get('/executions', { params }),
  getById: (id) => api.get(`/executions/${id}`),
  getScreenshot: (executionId, stepNumber) => 
    `${API_BASE}/executions/${executionId}/screenshot/${stepNumber}`,
};

export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
};

export default api;
