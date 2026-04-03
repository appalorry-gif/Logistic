import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, TrendingUp, Users, Truck, MapPin, Settings, LogOut, Menu, X, Download, Filter, Plus, Eye } from 'lucide-react';

const ShipperPortal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLoad, setSelectedLoad] = useState(null);

  // Mock Data
  const stats = [
    { label: 'Total Shipments', value: '1,284', change: '+12%', icon: Package, color: 'from-[#ff6b35] to-[#ff8555]' },
    { label: 'In Transit', value: '156', change: '+8%', icon: Truck, color: 'from-[#00d4ff] to-[#0099ff]' },
    { label: 'Completed', value: '1,095', change: '+15%', icon: TrendingUp, color: 'from-[#4ade80] to-[#22c55e]' },
    { label: 'Total Expense', value: '₹45,280', change: '-3%', icon: Users, color: 'from-[#a855f7] to-[#9333ea]' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 42000, expenses: 24000 },
    { month: 'Feb', revenue: 53000, expenses: 29000 },
    { month: 'Mar', revenue: 48000, expenses: 26000 },
    { month: 'Apr', revenue: 61000, expenses: 32000 },
    { month: 'May', revenue: 55000, expenses: 28000 },
    { month: 'Jun', revenue: 67000, expenses: 34000 },
  ];

  const shipmentStatus = [
    { name: 'Delivered', value: 1095, color: '#4ade80' },
    { name: 'In Transit', value: 156, color: '#00d4ff' },
    { name: 'Pending', value: 33, color: '#fbbf24' },
  ];

  const activeLoads = [
    {
      id: 'SHP#2024001',
      pickup: 'Electronics Hub, Whitefield',
      dropoff: 'Tech Park, Koramangala',
      driver: 'Rajesh Kumar',
      status: 'In Transit',
      eta: '2:34 PM',
      distance: '24 km',
      rate: '₹1,200',
      progress: 65,
    },
    {
      id: 'SHP#2024002',
      pickup: 'Garment Factory, Bangalore',
      dropoff: 'Retail Store, MG Road',
      driver: 'Amit Singh',
      status: 'In Transit',
      eta: '4:15 PM',
      distance: '18 km',
      rate: '₹950',
      progress: 45,
    },
    {
      id: 'SHP#2024003',
      pickup: 'Warehouse, Hebbal',
      dropoff: 'Distribution Center, Yelahanka',
      driver: 'Priya Sharma',
      status: 'Pending',
      eta: '9:00 AM',
      distance: '12 km',
      rate: '₹750',
      progress: 0,
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0f1419] via-[#1a1f2e] to-[#0f1419] text-white font-sans">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-[#1a1f2e] border-r border-[#2a3f5f] transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-20 bg-gradient-to-r from-[#ff6b35] to-[#ff8555] flex items-center justify-center border-b border-[#2a3f5f]">
          <div className="text-2xl font-black">
            {sidebarOpen ? '📦 LOGISTICS' : '📦'}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { id: 'home', label: 'Dashboard', icon: '📊' },
            { id: 'loads', label: 'Manage Loads', icon: '🚚' },
            { id: 'tracking', label: 'Live Tracking', icon: '📍' },
            { id: 'reports', label: 'Reports', icon: '📑' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-[#ff6b35] text-white shadow-lg'
                  : 'text-[#7aa3d1] hover:bg-[#2a4f7a]'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-semibold">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-[#2a3f5f]">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-semibold">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="h-20 bg-[#1a1f2e] border-b border-[#2a3f5f] px-6 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-[#7aa3d1] hover:text-white transition-all"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-6">
            <input
              type="text"
              placeholder="Search shipments..."
              className="bg-[#2a3f5f] px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
            />
            <div className="text-right">
              <p className="text-sm font-semibold">ABC Manufacturing</p>
              <p className="text-xs text-[#7aa3d1]">Last login: Today 9:42 AM</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'home' && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-[#ff6b35] to-[#ff8555] rounded-2xl p-6">
                <h1 className="text-3xl font-bold mb-2">Welcome back, Arun!</h1>
                <p className="text-sm opacity-90">You have 156 active shipments across 12 cities</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-[#1a2f4a] rounded-xl border border-[#2a4f7a] p-6 hover:border-[#ff6b35] transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-xs text-[#7aa3d1] mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <stat.icon size={24} />
                      </div>
                    </div>
                    <p className="text-xs text-[#4ade80]">{stat.change} from last week</p>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-[#1a2f4a] rounded-xl border border-[#2a4f7a] p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Revenue vs Expenses</h3>
                    <button className="text-[#7aa3d1] hover:text-white">
                      <Filter size={18} />
                    </button>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a4f7a" />
                      <XAxis dataKey="month" stroke="#7aa3d1" />
                      <YAxis stroke="#7aa3d1" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1a2f4a', border: '1px solid #2a4f7a' }}
                        cursor={{ fill: '#2a4f7a' }}
                      />
                      <Bar dataKey="revenue" fill="#ff6b35" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="expenses" fill="#4ade80" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Shipment Status */}
                <div className="bg-[#1a2f4a] rounded-xl border border-[#2a4f7a] p-6">
                  <h3 className="text-lg font-bold mb-4">Shipment Status</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={shipmentStatus}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {shipmentStatus.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {shipmentStatus.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                          {item.name}
                        </span>
                        <span className="font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Shipments */}
              <div className="bg-[#1a2f4a] rounded-xl border border-[#2a4f7a] p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Active Shipments</h3>
                  <button className="bg-[#ff6b35] hover:bg-[#ff5522] px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
                    <Plus size={16} /> New Shipment
                  </button>
                </div>
                <div className="space-y-3">
                  {activeLoads.map((load) => (
                    <div
                      key={load.id}
                      onClick={() => setSelectedLoad(selectedLoad?.id === load.id ? null : load)}
                      className="bg-[#0f1419] rounded-lg p-4 border border-[#2a4f7a] hover:border-[#ff6b35] cursor-pointer transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{load.id}</p>
                          <p className="text-xs text-[#7aa3d1]">{load.pickup} → {load.dropoff}</p>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          load.status === 'In Transit' ? 'bg-[#00d4ff]/20 text-[#00d4ff]' : 'bg-[#fbbf24]/20 text-[#fbbf24]'
                        }`}>
                          {load.status}
                        </span>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#7aa3d1]">Progress</span>
                          <span className="font-semibold">{load.progress}%</span>
                        </div>
                        <div className="w-full bg-[#2a4f7a] rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#ff6b35] to-[#ff8555] h-2 rounded-full transition-all"
                            style={{ width: `${load.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-3 text-xs">
                        <div>
                          <p className="text-[#7aa3d1]">Driver</p>
                          <p className="font-semibold">{load.driver}</p>
                        </div>
                        <div>
                          <p className="text-[#7aa3d1]">ETA</p>
                          <p className="font-semibold">{load.eta}</p>
                        </div>
                        <div>
                          <p className="text-[#7aa3d1]">Distance</p>
                          <p className="font-semibold">{load.distance}</p>
                        </div>
                        <div>
                          <p className="text-[#7aa3d1]">Rate</p>
                          <p className="font-semibold text-[#4ade80]">{load.rate}</p>
                        </div>
                      </div>
                      {selectedLoad?.id === load.id && (
                        <div className="mt-3 pt-3 border-t border-[#2a4f7a] grid grid-cols-2 gap-2">
                          <button className="bg-[#ff6b35]/20 text-[#ff8555] py-2 rounded text-xs font-semibold hover:bg-[#ff6b35]/30 transition-all">
                            <Eye size={14} className="inline mr-1" /> View Details
                          </button>
                          <button className="bg-[#00d4ff]/20 text-[#00d4ff] py-2 rounded text-xs font-semibold hover:bg-[#00d4ff]/30 transition-all">
                            View on Map
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'loads' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Loads</h2>
                <button className="bg-[#ff6b35] hover:bg-[#ff5522] px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all">
                  <Plus size={18} /> Create New Load
                </button>
              </div>

              <div className="bg-[#1a2f4a] rounded-xl border border-[#2a4f7a] p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Pickup Location', 'Dropoff Location', 'Vehicle Type', 'Weight/Quantity', 'Special Requirements', 'Delivery Date'].map((field, idx) => (
                    <div key={idx}>
                      <label className="text-xs text-[#7aa3d1] mb-2 block font-semibold">{field}</label>
                      <input
                        type="text"
                        placeholder={field}
                        className="w-full bg-[#0f1419] border border-[#2a4f7a] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35] transition-all"
                      />
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full bg-[#ff6b35] hover:bg-[#ff5522] py-3 rounded-lg font-semibold transition-all">
                  Create Load
                </button>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Analytics & Reports</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#1a2f4a] rounded-xl border border-[#2a4f7a] p-6">
                  <h3 className="text-lg font-bold mb-4">Monthly Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a4f7a" />
                      <XAxis dataKey="month" stroke="#7aa3d1" />
                      <YAxis stroke="#7aa3d1" />
                      <Tooltip contentStyle={{ backgroundColor: '#1a2f4a', border: '1px solid #2a4f7a' }} />
                      <Line type="monotone" dataKey="revenue" stroke="#ff6b35" strokeWidth={2} dot={{ fill: '#ff6b35' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-[#1a2f4a] rounded-xl border border-[#2a4f7a] p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Download Reports</h3>
                    <Download size={18} className="text-[#ff6b35]" />
                  </div>
                  <div className="space-y-2">
                    {['Monthly Invoice', 'Shipment Report', 'Driver Performance', 'Cost Analysis'].map((report, idx) => (
                      <button key={idx} className="w-full bg-[#0f1419] hover:bg-[#2a4f7a] rounded-lg px-4 py-3 text-left text-sm font-semibold border border-[#2a4f7a] transition-all">
                        📊 {report}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShipperPortal;