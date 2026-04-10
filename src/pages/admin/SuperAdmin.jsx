import React, { useState } from 'react';
import { Menu, X, LogOut, Shield, Users, BarChart3, Package } from 'lucide-react';

const SuperAdmin = ({ onLogout, userName }) => {
  const [currentTab, setCurrentTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-all">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-md shadow-red-100">👑</div>
              <div>
                <h1 className="font-bold text-slate-900 leading-none">LogisticHub</h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Super Admin</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right border-r border-slate-200 pr-6 hidden sm:block">
              <p className="text-sm font-bold text-slate-800">{userName}</p>
              <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider">Super Administrator</p>
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
              { id: 'overview', label: 'System Overview', icon: '📊' },
              { id: 'users', label: 'User Management', icon: '👥' },
              { id: 'admins', label: 'Admin Management', icon: '🛡️' },
              { id: 'system', label: 'System Settings', icon: '⚙️' },
              { id: 'security', label: 'Security & Audit', icon: '🔒' },
              { id: 'analytics', label: 'Platform Analytics', icon: '📈' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${currentTab === item.id ? 'bg-red-600 text-white shadow-lg shadow-red-100' : 'text-slate-500 hover:bg-slate-50 hover:text-red-600'}`}
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
            {currentTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">System Overview</h2>
                  <div className="flex gap-4">
                    <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm">
                      <p className="text-slate-500 text-sm">Total Users</p>
                      <p className="text-slate-900 font-bold">1,247</p>
                    </div>
                    <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm">
                      <p className="text-slate-500 text-sm">Active Sessions</p>
                      <p className="text-slate-900 font-bold">89</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="text-blue-600" size={24} />
                      <h3 className="font-bold text-slate-900">Drivers</h3>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">423</p>
                    <p className="text-slate-500 text-sm">Active fleet members</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Package className="text-emerald-600" size={24} />
                      <h3 className="font-bold text-slate-900">Customers</h3>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">687</p>
                    <p className="text-slate-500 text-sm">Registered shippers</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="text-purple-600" size={24} />
                      <h3 className="font-bold text-slate-900">Admins</h3>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">12</p>
                    <p className="text-slate-500 text-sm">System administrators</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="text-orange-600" size={24} />
                      <h3 className="font-bold text-slate-900">Revenue</h3>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">₹2.4M</p>
                    <p className="text-slate-500 text-sm">Monthly platform revenue</p>
                  </div>
                </div>
              </div>
            )}

            {currentTab === 'users' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <p className="text-slate-600">Advanced user management interface coming soon...</p>
                </div>
              </div>
            )}

            {currentTab === 'admins' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Admin Management</h2>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <p className="text-slate-600">Admin role and permission management coming soon...</p>
                </div>
              </div>
            )}

            {currentTab === 'system' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">System Settings</h2>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <p className="text-slate-600">System configuration and maintenance tools coming soon...</p>
                </div>
              </div>
            )}

            {currentTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Security & Audit</h2>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <p className="text-slate-600">Security monitoring and audit logs coming soon...</p>
                </div>
              </div>
            )}

            {currentTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Platform Analytics</h2>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <p className="text-slate-600">Comprehensive platform analytics coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;