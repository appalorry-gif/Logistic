import React, { useState } from 'react';
import { LayoutDashboard, Truck, Users, BarChart3, Settings, LogOut, Bell, Search, Menu } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import AdminShipments from './AdminShipments';
import AdminDrivers from './AdminDrivers';
import AdminFinancials from './AdminFinancials';

const AdminPortal = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={20}/> },
    { id: 'shipments', label: 'Manage Shipments', icon: <Truck size={20}/> },
    { id: 'drivers', label: 'Fleet & Drivers', icon: <Users size={20}/> },
    { id: 'financials', label: 'Revenue & Accounts', icon: <BarChart3 size={20}/> },
   
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#1E293B] text-white transition-all duration-300 flex flex-col shadow-xl z-50`}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-700">
          <div className="bg-blue-500 p-2 rounded-lg"><Truck size={24} /></div>
          {sidebarOpen && <span className="font-black text-xl tracking-tight">LOGISTIC<span className="text-blue-400">PRO</span></span>}
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              {sidebarOpen && <span className="font-bold text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button onClick={onLogout} className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
            <LogOut size={20} />
            {sidebarOpen && <span className="font-bold text-sm">Logout System</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
              <Menu size={20} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input type="text" placeholder="Quick search..." className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-all">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-none">Admin Control</p>
                <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-widest">Super Admin</p>
              </div>
              <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" className="w-9 h-9 rounded-full border border-slate-200 shadow-sm" alt="admin" />
            </div>
          </div>
        </header>

        {/* DYNAMIC PAGE LOADING */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'shipments' && <AdminShipments />}
          {activeTab === 'drivers' && <AdminDrivers />}
          {activeTab === 'financials' && <AdminFinancials />}
        </div>
      </main>
    </div>
  );
};

export default AdminPortal;