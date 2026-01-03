import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Navbar from '../components/common/Navbar';
import { 
  FolderKanban, 
  FlaskConical, 
  PlayCircle, 
  TrendingUp, 
  Plus,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await dashboardAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats?.total_projects || 0,
      icon: FolderKanban,
      color: 'from-blue-500 to-blue-600',
      link: '/projects'
    },
    {
      title: 'Total Tests',
      value: stats?.total_tests || 0,
      icon: FlaskConical,
      color: 'from-purple-500 to-purple-600',
      link: '/tests'
    },
    {
      title: 'Test Executions',
      value: stats?.total_executions || 0,
      icon: PlayCircle,
      color: 'from-indigo-500 to-indigo-600',
      link: '/executions'
    },
    {
      title: 'Pass Rate',
      value: `${stats?.pass_rate || 0}%`,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600',
      link: '/reports'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar user={user} />
      
      <main className="container mx-auto px-6 py-8" data-testid="dashboard">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.full_name || user?.username}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Your AI-powered test automation dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Link key={index} to={stat.link}>
              <Card 
                className="p-6 hover:scale-105 transition-transform cursor-pointer border-2 border-transparent hover:border-blue-300"
                data-testid={`stat-card-${index}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      {stat.title}
                    </p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-4 bg-gradient-to-r ${stat.color} rounded-xl shadow-lg`}>
                    <stat.icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/projects">
              <Button 
                className="w-full h-full py-6 text-lg" 
                variant="primary"
                data-testid="create-project-button"
              >
                <Plus className="w-5 h-5 mr-2" aria-hidden="true" />
                Create Project
              </Button>
            </Link>
            <Link to="/tests">
              <Button 
                className="w-full h-full py-6 text-lg" 
                variant="success"
                data-testid="create-test-button"
              >
                <FlaskConical className="w-5 h-5 mr-2" aria-hidden="true" />
                Write Test
              </Button>
            </Link>
            <Link to="/reports">
              <Button 
                className="w-full h-full py-6 text-lg" 
                variant="outline"
                data-testid="view-reports-button"
              >
                <TrendingUp className="w-5 h-5 mr-2" aria-hidden="true" />
                View Reports
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Executions</h2>
          
          {stats?.recent_executions && stats.recent_executions.length > 0 ? (
            <div className="space-y-4">
              {stats.recent_executions.slice(0, 5).map((execution, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  data-testid={`execution-item-${index}`}
                >
                  <div className="flex items-center space-x-4">
                    {execution.status === 'passed' ? (
                      <CheckCircle className="w-6 h-6 text-green-500" aria-hidden="true" />
                    ) : execution.status === 'failed' ? (
                      <XCircle className="w-6 h-6 text-red-500" aria-hidden="true" />
                    ) : (
                      <Clock className="w-6 h-6 text-yellow-500" aria-hidden="true" />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">Test Execution</p>
                      <p className="text-sm text-gray-600">{execution.test_id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={
                      `px-3 py-1 rounded-full text-sm font-semibold 
                      ${execution.status === 'passed' ? 'bg-green-100 text-green-700' : 
                        execution.status === 'failed' ? 'bg-red-100 text-red-700' : 
                        'bg-yellow-100 text-yellow-700'}`
                    }>
                      {execution.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      {execution.duration_ms ? `${execution.duration_ms}ms` : 'Running...'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <PlayCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
              <p className="text-gray-600 text-lg">No test executions yet</p>
              <p className="text-gray-500 mt-2">Create and run your first test to see results here</p>
            </div>
          )}
        </Card>

        {/* Getting Started Guide */}
        {stats?.total_tests === 0 && (
          <Card className="p-8 mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Getting Started</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Create a Project</h3>
                  <p className="text-gray-600">Organize your tests by creating a project first</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Write Tests in Plain English</h3>
                  <p className="text-gray-600">Use natural language like "click on Login button" - no coding required!</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Run and Watch AI Magic</h3>
                  <p className="text-gray-600">Our AI finds elements, heals broken tests, and provides detailed reports</p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
