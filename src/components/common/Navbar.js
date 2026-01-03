import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, LogOut, LayoutDashboard, FolderKanban, FlaskConical, PlayCircle, BarChart3 } from 'lucide-react';
import Button from './Button';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/projects', label: 'Projects', icon: FolderKanban },
    { path: '/tests', label: 'Tests', icon: FlaskConical },
    { path: '/executions', label: 'Executions', icon: PlayCircle },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
  ];
  
  return (
    <nav 
      className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-3 group"
            aria-label="Go to dashboard"
          >
            <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform" aria-hidden="true" />
            <div>
              <h1 className="text-2xl font-bold">TestAI Pro</h1>
              <p className="text-xs text-blue-100">AI-Powered Test Automation</p>
            </div>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-1" role="menubar">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                role="menuitem"
                className={
                  `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 
                  ${isActive(path) 
                    ? 'bg-white/20 shadow-lg' 
                    : 'hover:bg-white/10'
                  }
                  focus:outline-none focus:ring-2 focus:ring-white/50`
                }
                aria-current={isActive(path) ? 'page' : undefined}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
          
          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-semibold">{user?.username || 'User'}</p>
              <p className="text-xs text-blue-100">{user?.email}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-white text-white hover:bg-white hover:text-blue-600"
              data-testid="logout-button"
              aria-label="Log out"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
