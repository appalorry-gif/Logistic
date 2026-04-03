import React, { useState } from 'react';
import { Menu, X, LogOut, ChevronRight, Navigation, IndianRupee } from 'lucide-react';
import Login from './Login';
import DriverHome from './pages/driver/Driver home';
import DriverEarnings from './pages/driver/Driver earnings';
import DriverProfile from './pages/driver/Driver profile';
import ShipperDashboard from './shipper/Shipper dashboard';
import ShipperLoads from './shipper/Shipper loads';
import ShipperTracking from './shipper/Shipper tracking';
import ShipperReports from './shipper/ShipperReports';
import ShipperSettings from './shipper/ShipperSettings';

// IMPORT THE NEW ADMIN PORTAL
import AdminPortal from './pages/admin/AdminPortal';

import './styles/Globals.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('');
  const [userCompany, setUserCompany] = useState('');
  
  const [selectedTruckForLoad, setSelectedTruckForLoad] = useState(null);
  const [currentTab, setCurrentTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [onDuty, setOnDuty] = useState(true);

  const handleLogin = (role, email) => {
    setIsLoggedIn(true);
    setUserRole(role);
    
    // Set Profile details based on role
    if (role === 'driver') {
      setUserName('Rajesh Kumar');
      setUserCompany('');
      setCurrentTab('home');
    } else if (role === 'admin') {
      setUserName('Super Admin');
      setUserCompany('Logistics Hub HQ');
      // AdminPortal handles its own internal tabs, so we don't need to set CurrentTab here
    } else {
      setUserName('ABC Manufacturing');
      setUserCompany('TechMart India');
      setCurrentTab('home');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentTab('home');
    setSelectedTruckForLoad(null);
  };

  // 1. Show Login Screen if not authenticated
  if (!isLoggedIn) return <Login onLogin={handleLogin} />;

  // 2. ============ ADMIN PORTAL (NEW MULTI-PAGE SYSTEM) ============
  if (userRole === 'admin') {
    return <AdminPortal onLogout={handleLogout} userName={userName} />;
  }

  // 3. ============ DRIVER APP (MOBILE-WEB THEME) ============
  if (userRole === 'driver') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
        <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">🚚</div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Driver Profile</p>
                  <h1 className="text-base font-black text-white">{userName}</h1>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setOnDuty(!onDuty)} className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${onDuty ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                  {onDuty ? 'ON DUTY' : 'OFF DUTY'}
                </button>
                <button onClick={handleLogout} className="p-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20"><LogOut size={18} /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-24">
          {currentTab === 'home' && <DriverHome />}
          {currentTab === 'earnings' && <DriverEarnings />}
          {currentTab === 'profile' && <DriverProfile />}
        </div>

        {/* Driver Bottom Nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-2 shadow-2xl z-50">
          <div className="flex justify-around items-center max-w-md mx-auto">
            <button onClick={() => setCurrentTab('home')} className={`flex flex-col items-center p-3 rounded-xl transition-all ${currentTab === 'home' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-500'}`}>
              <Navigation size={20} /><span className="text-[10px] font-bold mt-1 uppercase">Trip</span>
            </button>
            <button onClick={() => setCurrentTab('earnings')} className={`flex flex-col items-center p-3 rounded-xl transition-all ${currentTab === 'earnings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-500'}`}>
              <IndianRupee size={20} /><span className="text-[10px] font-bold mt-1 uppercase">Wallet</span>
            </button>
            <button onClick={() => setCurrentTab('profile')} className={`flex flex-col items-center p-3 rounded-xl transition-all ${currentTab === 'profile' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-500'}`}>
              <Menu size={20} /><span className="text-[10px] font-bold mt-1 uppercase">Menu</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. ============ CUSTOMER / SHIPPER PORTAL ============
  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans">
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-all">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-100">📦</div>
              <div><h1 className="font-bold text-slate-900 leading-none">LogisticHub</h1><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Shipper Console</p></div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right border-r border-slate-200 pr-6 hidden sm:block">
              <p className="text-sm font-bold text-slate-800">{userCompany}</p>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Business Account</p>
            </div>
            <button onClick={handleLogout} className="p-2 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-all"><LogOut size={18} /></button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Shipper Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white border-r border-slate-200 overflow-hidden flex flex-col shadow-sm`}>
          <nav className="flex-1 px-3 py-6 space-y-1">
            {[
              { id: 'home', label: 'Dashboard', icon: '📊' },
              { id: 'loads', label: 'Manage Loads', icon: '🚚' },
              { id: 'tracking', label: 'Live Tracking', icon: '📍' },
              { id: 'reports', label: 'Analytics', icon: '📑' },
              { id: 'settings', label: 'Account Settings', icon: '⚙️' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${currentTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'}`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {currentTab === 'home' && <ShipperDashboard onAssignTruck={(t) => { setSelectedTruckForLoad(t); setCurrentTab('loads'); }} />}
            {currentTab === 'loads' && <ShipperLoads incomingTruckData={selectedTruckForLoad} />}
            {currentTab === 'tracking' && <ShipperTracking />}
            {currentTab === 'reports' && <ShipperReports />}
            {currentTab === 'settings' && <ShipperSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;