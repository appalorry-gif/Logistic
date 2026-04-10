import React, { useState } from 'react';
import { Menu, X, LogOut, Navigation, IndianRupee, User } from 'lucide-react';
import Login from './Login';
import DriverHome from './pages/driver/singleDriver/Driver home';
import DriverEarnings from './pages/driver/singleDriver/Driver earnings';
import DriverProfile from './pages/driver/singleDriver/Driver profile';

// IMPORT ADMIN & FLEET MANAGER
import AdminPortal from './pages/admin/AdminPortal';
import SuperAdmin from './pages/admin/SuperAdmin';
import EnhancedFleetManager from './pages/driver/multipleDriver/EnhancedFleetManager';

// CUSTOMER IMPORTS
import ShipperDashboard from './shipper/Shipper dashboard';
import ShipperLoads from './shipper/Shipper loads';
import ShipperTracking from './shipper/Shipper tracking';
import ShipperReports from './shipper/ShipperReports';
import ShipperSettings from './shipper/ShipperSettings';
import CompanyCustomer from './shipper/CompanyCustomer';

import './styles/Globals.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState({main: '', sub: '', title: ''});
  const [userName, setUserName] = useState('');
  const [userCompany, setUserCompany] = useState('');
  
  const [currentTab, setCurrentTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [onDuty, setOnDuty] = useState(true);

  const handleLogin = (roleObj, email) => {
    setIsLoggedIn(true);
    setUserRole(roleObj);
    
    if (roleObj.main === 'driver') {
      setUserName('Rajesh Kumar');
      setCurrentTab('home');
    } else if (roleObj.main === 'admin') {
      setUserName('Super Admin');
    } else if (roleObj.main === 'customer') {
      setUserName(roleObj.sub === 'public' ? 'ABC Manufacturing' : 'Enterprise Corp');
      setUserCompany(roleObj.sub === 'public' ? 'TechMart India' : 'Large Scale Shipping');
      setCurrentTab('home');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole({main: '', sub: '', title: ''});
  };

  // --- NAVIGATION LOGIC ---
  const handleSwitchToOwner = () => {
    setUserRole({ main: 'driver', sub: 'multiple', title: 'Fleet Owner' });
    setUserName('Muthu Logistics (Owner)');
  };

  const handleSwitchToDriver = () => {
    setUserRole({ main: 'driver', sub: '', title: 'Driver' });
    setUserName('Rajesh Kumar');
    setCurrentTab('home');
  };

  if (!isLoggedIn) return <Login onLogin={handleLogin} />;

  // 1. ADMIN
  if (userRole.main === 'admin') {
    if (userRole.sub === 'super') return <SuperAdmin onLogout={handleLogout} userName={userName} />;
    return <AdminPortal onLogout={handleLogout} userName={userName} />;
  }

  // 2. DRIVER
  if (userRole.main === 'driver') {
    // IF FLEET OWNER: Show the Enterprise Dashboard
    if (userRole.sub === 'multiple') {
      return (
        <EnhancedFleetManager 
          userName={userName} 
          onLogout={handleLogout} 
          onBackToDriver={handleSwitchToDriver} 
        />
      );
    }

    // IF SINGLE DRIVER: Show Mobile UI
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
          <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-lg px-4 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">🚚</div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Driver Profile</p>
                  <h1 className="text-base font-black text-white">{userName}</h1>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setOnDuty(!onDuty)} className={`px-3 py-1.5 rounded-lg font-bold text-xs ${onDuty ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                  {onDuty ? 'ON DUTY' : 'OFF DUTY'}
                </button>
                <button onClick={handleLogout} className="p-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20"><LogOut size={18} /></button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pb-24">
            {currentTab === 'home' && <DriverHome />}
            {currentTab === 'earnings' && <DriverEarnings />}
            {currentTab === 'profile' && <DriverProfile onSwitchToOwner={handleSwitchToOwner} />}
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-2 z-50">
            <div className="flex justify-around items-center max-w-md mx-auto">
              <button onClick={() => setCurrentTab('home')} className={`flex flex-col items-center p-3 rounded-xl ${currentTab === 'home' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}><Navigation size={20} /><span className="text-[10px] font-bold mt-1 uppercase">Trip</span></button>
              <button onClick={() => setCurrentTab('earnings')} className={`flex flex-col items-center p-3 rounded-xl ${currentTab === 'earnings' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}><IndianRupee size={20} /><span className="text-[10px] font-bold mt-1 uppercase">Wallet</span></button>
              <button onClick={() => setCurrentTab('profile')} className={`flex flex-col items-center p-3 rounded-xl ${currentTab === 'profile' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}><User size={20} /><span className="text-[10px] font-bold mt-1 uppercase">Profile</span></button>
            </div>
          </div>
        </div>
      );
  }

  // 3. CUSTOMER (SAME AS BEFORE)
  return null; // Add your customer logic here
}

export default App;