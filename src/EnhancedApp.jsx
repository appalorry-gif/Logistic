import React, { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import Login from './Login';
import EnhancedDriverHome from './EnhancedDriverHome';
import EnhancedCustomerDashboard from './EnhancedCustomerDashboard';
import DriverEarnings from './driver-earnings';
import DriverProfile from './driver-profile';
import OwnerDriverTracker from './pages/driver/singleDriver/OwnerDriverTracker';
import './styles/globals.css';

function EnhancedApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('');

  const [currentTab, setCurrentTab] = useState('home');
  
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogin = (role, email) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(email.split('@')[0]);
    if (role === 'driver') {
      setCurrentTab('home');
    } else if (role === 'owner') {
      setCurrentTab('drivers');
    } else {
      setCurrentTab('home');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName('');
    setCurrentTab('home');
  };

  // ============ LOGIN PAGE ============
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // ============ DRIVER/OWNER APP ============
  if (userRole === 'driver' || userRole === 'owner') {
    const isOwner = userRole === 'owner';
    const tabs = isOwner ? ['home', 'earnings', 'profile', 'drivers'] : ['home', 'earnings', 'profile'];
    return (
      <div className="bg-gradient-to-br from-[#0f1419] via-[#1a1f2e] to-[#0f1419] min-h-screen text-white font-sans flex flex-col">
        {/* Status Bar (Mobile) */}
        <div className="bg-[#1a1f2e] px-4 py-2 flex justify-between items-center text-xs border-b border-[#2a3f5f] md:hidden">
          <span>9:41</span>
          <div className="flex gap-1">
            <span>📶</span>
            <span>📡</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#ff6b35] to-[#ff8555] px-4 md:px-6 py-4 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs opacity-90">Welcome back</p>
              <h1 className="text-xl md:text-2xl font-bold">{isOwner ? 'Fleet Owner' : 'Rajesh Kumar'}</h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full font-semibold text-sm transition-all flex items-center gap-2"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-20 md:pb-10">
          <div className="px-4 md:px-6 py-6">
            {currentTab === 'home' && <EnhancedDriverHome />}
            {currentTab === 'earnings' && <DriverEarnings />}
            {currentTab === 'profile' && <DriverProfile />}
            {isOwner && currentTab === 'drivers' && <OwnerDriverTracker />}
          </div>
        </div>

        {/* Bottom Navigation (Mobile) */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#1a1f2e] border-t border-[#2a3f5f] px-4 py-3 flex justify-around items-center md:hidden">
          <button
            onClick={() => setCurrentTab('home')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              currentTab === 'home' ? 'text-[#ff6b35]' : 'text-[#7aa3d1]'
            }`}
          >
            <span className="text-2xl">🚚</span>
            <span className="text-xs">Loads</span>
          </button>
          <button
            onClick={() => setCurrentTab('earnings')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              currentTab === 'earnings' ? 'text-[#ff6b35]' : 'text-[#7aa3d1]'
            }`}
          >
            <span className="text-2xl">💰</span>
            <span className="text-xs">Earnings</span>
          </button>
          <button
            onClick={() => setCurrentTab('profile')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              currentTab === 'profile' ? 'text-[#ff6b35]' : 'text-[#7aa3d1]'
            }`}
          >
            <span className="text-2xl">👤</span>
            <span className="text-xs">Profile</span>
          </button>
          {isOwner && (
            <button
              onClick={() => setCurrentTab('drivers')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                currentTab === 'drivers' ? 'text-[#ff6b35]' : 'text-[#7aa3d1]'
              }`}
            >
              <span className="text-2xl">🚛</span>
              <span className="text-xs">Drivers</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ CUSTOMER APP ============
  if (userRole === 'customer') {
    return (
      <div className="bg-gradient-to-br from-[#0f1419] via-[#1a1f2e] to-[#0f1419] min-h-screen text-white font-sans">
        {/* Top Navigation */}
        <div className="bg-[#1a1f2e] border-b border-[#2a3f5f] px-4 md:px-6 py-4 flex justify-between items-center sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📦</span>
            <h1 className="text-lg font-bold">LogisticHub</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-lg font-semibold text-sm text-red-400 transition-all flex items-center gap-2"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Main Content */}
        <EnhancedCustomerDashboard />
      </div>
    );
  }

  return null;
}

export default EnhancedApp;