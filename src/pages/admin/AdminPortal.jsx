import React, { useState } from 'react';
import { LayoutDashboard, Truck, Users, BarChart3, Settings, LogOut, Search, Menu, X, Plus } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import AdminShipments from './AdminShipments';
import AdminDrivers from './AdminDrivers';
import AdminFinancials from './AdminFinancials';

const AdminPortal = ({ onLogout, userName }) => {
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
          <div className="bg-blue-600 p-2 rounded-lg shrink-0"><Truck size={24} /></div>
          {sidebarOpen && <span className="font-black text-xl tracking-tight uppercase">Logistic<span className="text-blue-400">Hub</span></span>}
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="font-bold text-sm whitespace-nowrap">{item.label}</span>}
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
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input type="text" placeholder="Search shipments, drivers, or invoices..." className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm w-80 focus:ring-2 focus:ring-blue-500 transition-all outline-none" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
               <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 leading-none">Admin Control</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-widest">Main Tenant</p>
               </div>
               <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-blue-100 flex items-center justify-center text-blue-600 font-black">
                  A
               </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto bg-[#F4F7FB] p-8">
          <div className="max-w-[1600px] mx-auto">
            {activeTab === 'dashboard' && <AdminDashboard />}
            {activeTab === 'shipments' && <AdminShipments />}
            {activeTab === 'drivers' && <AdminDrivers />}
            {activeTab === 'financials' && <AdminFinancials />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPortal;