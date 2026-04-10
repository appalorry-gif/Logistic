import React, { useState } from 'react';
import { Menu, X, LogOut, Building2, Users, Package } from 'lucide-react';

const CompanyCustomer = ({ onLogout, userName, userCompany }) => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-all">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-md shadow-purple-100">🏢</div>
              <div>
                <h1 className="font-bold text-slate-900 leading-none">LogisticHub</h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Enterprise Portal</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right border-r border-slate-200 pr-6 hidden sm:block">
              <p className="text-sm font-bold text-slate-800">{userCompany}</p>
              <p className="text-[10px] text-purple-600 font-bold uppercase tracking-wider">Enterprise Account</p>
            </div>
            <button onClick={onLogout} className="p-2 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-all"><LogOut size={18} /></button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white border-r border-slate-200 overflow-hidden flex flex-col shadow-sm`}>
          <nav className="flex-1 px-3 py-6 space-y-1">
            {[
              { id: 'dashboard', label: 'Enterprise Dashboard', icon: '📊' },
              { id: 'bulk', label: 'Bulk Shipments', icon: '📦' },
              { id: 'contracts', label: 'Contract Management', icon: '📋' },
              { id: 'analytics', label: 'Business Analytics', icon: '📈' },
              { id: 'team', label: 'Team Management', icon: '👥' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${currentTab === item.id ? 'bg-purple-600 text-white shadow-lg shadow-purple-100' : 'text-slate-500 hover:bg-slate-50 hover:text-purple-600'}`}
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
            {currentTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">Enterprise Dashboard</h2>
                  <div className="flex gap-4">
                    <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm">
                      <p className="text-slate-500 text-sm">Monthly Shipments</p>
                      <p className="text-slate-900 font-bold">247</p>
                    </div>
                    <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm">
                      <p className="text-slate-500 text-sm">Active Contracts</p>
                      <p className="text-slate-900 font-bold">12</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Package className="text-blue-600" size={24} />
                      <h3 className="font-bold text-slate-900">Bulk Shipments</h3>
                    </div>
                    <p className="text-slate-600 text-sm">Manage large-scale cargo movements with dedicated fleet allocation.</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Building2 className="text-purple-600" size={24} />
                      <h3 className="font-bold text-slate-900">Contract Rates</h3>
                    </div>
                    <p className="text-slate-600 text-sm">Negotiated pricing for regular shipping routes and volumes.</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="text-emerald-600" size={24} />
                      <h3 className="font-bold text-slate-900">Dedicated Support</h3>
                    </div>
                    <p className="text-slate-600 text-sm">24/7 enterprise support with dedicated account managers.</p>
                  </div>
                </div>
              </div>
            )}

            {currentTab === 'bulk' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Bulk Shipments</h2>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <p className="text-slate-600">Bulk shipment management interface coming soon...</p>
                </div>
              </div>
            )}

            {currentTab === 'contracts' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Contract Management</h2>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <p className="text-slate-600">Contract management interface coming soon...</p>
                </div>
              </div>
            )}

            {currentTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Business Analytics</h2>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <p className="text-slate-600">Advanced analytics dashboard coming soon...</p>
                </div>
              </div>
            )}

            {currentTab === 'team' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Team Management</h2>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <p className="text-slate-600">Team management interface coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCustomer;