import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Zap, Users, TrendingUp, MessageSquare, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AIAssistant from './AIAssistant';

function Layout({ children }) {
  const [showAssistant, setShowAssistant] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/campaign-creator', icon: Zap, label: 'Campaign Creator' },
    { path: '/leads', icon: Users, label: 'Leads' },
    { path: '/conversions', icon: TrendingUp, label: 'Conversions' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/95 backdrop-blur-sm shadow-xl border-purple-200-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-primary-600">Marketing Hero</h1>
          <p className="text-sm text-gray-500 mt-1">Lead Gen & Conversion</p>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={() => setShowAssistant(!showAssistant)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-700 hover:to-purple-700 transition-all shadow-md"
          >
            <MessageSquare size={20} />
            <span>AI Assistant</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 overflow-auto">
        {children}
      </main>

      {/* AI Assistant Panel */}
      {showAssistant && (
        <AIAssistant onClose={() => setShowAssistant(false)} />
      )}
    </div>
  );
}

export default Layout;
