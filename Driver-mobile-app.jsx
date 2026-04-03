import React, { useState } from 'react';
import { MapPin, Zap, TrendingUp, Navigation, Phone, LogOut, Settings, Bell, Star, Clock, DollarSign, Truck } from 'lucide-react';

const DriverMobileApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeLoad, setActiveLoad] = useState(null);
  const [onDuty, setOnDuty] = useState(true);

  const mockLoads = [
    { id: 1, pickup: 'Electronics Hub, Whitefield', dropoff: 'Tech Park, Koramangala', distance: '24 km', rate: '₹1,200', weight: '500 kg', status: 'Available' },
    { id: 2, pickup: 'Garment Factory, Bangalore', dropoff: 'Retail Store, MG Road', distance: '18 km', rate: '₹950', weight: '300 kg', status: 'Available' },
    { id: 3, pickup: 'Warehouse, Hebbal', dropoff: 'Distribution Center, Yelahanka', distance: '12 km', rate: '₹750', weight: '400 kg', status: 'Available' },
  ];

  const earnings = {
    today: '₹3,450',
    week: '₹24,320',
    total: '₹89,650',
    rating: 4.8
  };

  const activeTrip = {
    id: 'DRV#2024001',
    status: 'In Transit',
    pickup: 'Industrial Area, Peenya',
    dropoff: 'Commercial Hub, Richmond Town',
    distance: '16 km',
    eta: '2:34 PM',
    compensation: '₹1,450',
    customer: 'ABC Manufacturing',
    rating: null
  };

  return (
    <div className="bg-gradient-to-br from-[#0f1419] via-[#1a1f2e] to-[#0f1419] min-h-screen text-white font-sans flex flex-col">
      {/* Status Bar */}
      <div className="bg-[#1a1f2e] px-4 py-2 flex justify-between items-center text-xs border-b border-[#2a3f5f]">
        <span>9:41</span>
        <div className="flex gap-1">
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header with Duty Toggle */}
      <div className="bg-gradient-to-r from-[#ff6b35] to-[#ff8555] px-4 py-4 shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-xs opacity-90">Welcome back</p>
            <h1 className="text-xl font-bold">Rajesh Kumar</h1>
          </div>
          <button 
            onClick={() => setOnDuty(!onDuty)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${onDuty ? 'bg-white text-[#ff6b35]' : 'bg-white/20 text-white'}`}
          >
            {onDuty ? '🟢 On Duty' : '⚫ Off Duty'}
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={16} />
          <span>Bangalore, KA</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'home' && (
          <div className="p-4 space-y-4">
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#1a2f4a] rounded-2xl p-4 border border-[#2a4f7a]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#7aa3d1]">Today Earnings</span>
                  <DollarSign size={16} className="text-[#ff6b35]" />
                </div>
                <p className="text-2xl font-bold">{earnings.today}</p>
              </div>
              <div className="bg-[#1a2f4a] rounded-2xl p-4 border border-[#2a4f7a]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#7aa3d1]">This Week</span>
                  <TrendingUp size={16} className="text-[#4ade80]" />
                </div>
                <p className="text-2xl font-bold">{earnings.week}</p>
              </div>
            </div>

            {/* Active Trip */}
            {activeTrip.status === 'In Transit' && (
              <div className="bg-gradient-to-r from-[#1a2f4a] to-[#1f3a52] rounded-2xl p-4 border-l-4 border-[#ff6b35]">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-xs text-[#7aa3d1]">Active Trip</p>
                    <p className="text-lg font-bold">{activeTrip.id}</p>
                  </div>
                  <span className="text-xs bg-[#ff6b35]/20 text-[#ff8555] px-3 py-1 rounded-full font-semibold">🟢 {activeTrip.status}</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex gap-2">
                    <MapPin size={16} className="text-[#ff6b35] flex-shrink-0" />
                    <span className="text-sm">{activeTrip.pickup}</span>
                  </div>
                  <div className="flex gap-2">
                    <Navigation size={16} className="text-[#4ade80] flex-shrink-0" />
                    <span className="text-sm">{activeTrip.dropoff}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#2a4f7a]">
                  <div>
                    <p className="text-xs text-[#7aa3d1]">Distance</p>
                    <p className="font-bold text-sm">{activeTrip.distance}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7aa3d1]">ETA</p>
                    <p className="font-bold text-sm">{activeTrip.eta}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7aa3d1]">Earning</p>
                    <p className="font-bold text-sm text-[#4ade80]">{activeTrip.compensation}</p>
                  </div>
                </div>
                <button className="w-full mt-3 bg-[#ff6b35] hover:bg-[#ff5522] rounded-lg py-3 font-semibold text-sm transition-all flex items-center justify-center gap-2">
                  <Navigation size={16} /> Start Navigation
                </button>
              </div>
            )}

            {/* Available Loads Section */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Truck size={20} className="text-[#ff6b35]" />
                  Available Loads
                </h2>
                <span className="text-xs bg-[#ff6b35]/20 text-[#ff8555] px-2 py-1 rounded">3 new</span>
              </div>

              <div className="space-y-3">
                {mockLoads.map((load) => (
                  <div
                    key={load.id}
                    onClick={() => setActiveLoad(activeLoad === load.id ? null : load.id)}
                    className={`bg-[#1a2f4a] rounded-xl p-3 border border-[#2a4f7a] cursor-pointer transition-all transform ${
                      activeLoad === load.id ? 'ring-2 ring-[#ff6b35] scale-102' : 'hover:border-[#ff6b35]/50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="text-xs text-[#7aa3d1] mb-1">Pickup</p>
                        <p className="text-sm font-semibold">{load.pickup}</p>
                      </div>
                      <span className="text-lg font-bold text-[#4ade80]">{load.rate}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-xs text-[#7aa3d1] mb-1">Dropoff</p>
                        <p className="text-sm font-semibold">{load.dropoff}</p>
                      </div>
                      <span className="text-xs text-[#7aa3d1]">{load.distance}</span>
                    </div>

                    {activeLoad === load.id && (
                      <div className="mt-3 pt-3 border-t border-[#2a4f7a] space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#7aa3d1]">Weight:</span>
                          <span>{load.weight}</span>
                        </div>
                        <button className="w-full bg-[#ff6b35] hover:bg-[#ff5522] rounded-lg py-2 font-semibold text-sm transition-all">
                          Accept Load
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="p-4 space-y-4">
            <div className="bg-gradient-to-br from-[#1a2f4a] to-[#1f3a52] rounded-2xl p-6 border border-[#2a4f7a]">
              <p className="text-[#7aa3d1] text-sm mb-2">Total Lifetime Earnings</p>
              <p className="text-4xl font-bold mb-4">{earnings.total}</p>
              <div className="flex items-center gap-2 mb-4">
                <Star size={20} className="text-yellow-400 fill-yellow-400" />
                <span className="text-2xl font-bold">{earnings.rating}</span>
                <span className="text-[#7aa3d1]">/ 5.0</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0f1419]/50 rounded-lg p-3">
                  <p className="text-xs text-[#7aa3d1]">Completed Trips</p>
                  <p className="text-xl font-bold">284</p>
                </div>
                <div className="bg-[#0f1419]/50 rounded-lg p-3">
                  <p className="text-xs text-[#7aa3d1]">Avg Rating</p>
                  <p className="text-xl font-bold">4.8★</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a2f4a] rounded-2xl p-4 border border-[#2a4f7a]">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Clock size={18} className="text-[#ff6b35]" />
                Recent Earnings
              </h3>
              <div className="space-y-3">
                {[
                  { date: 'Today', amount: '+₹1,200', trip: 'DRV#2024001' },
                  { date: 'Yesterday', amount: '+₹2,250', trip: 'DRV#2024000' },
                  { date: 'Dec 10', amount: '+₹1,850', trip: 'DRV#2023999' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center pb-3 border-b border-[#2a4f7a] last:border-b-0">
                    <div>
                      <p className="font-semibold text-sm">{item.trip}</p>
                      <p className="text-xs text-[#7aa3d1]">{item.date}</p>
                    </div>
                    <p className="font-bold text-[#4ade80]">{item.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-4 space-y-4">
            <div className="bg-[#1a2f4a] rounded-2xl p-6 border border-[#2a4f7a] text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff8555] mx-auto mb-4 flex items-center justify-center text-3xl font-bold">RK</div>
              <p className="text-lg font-bold">Rajesh Kumar</p>
              <p className="text-sm text-[#7aa3d1] mb-4">Driver ID: DRV#00124</p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-[#7aa3d1] text-xs">License</p>
                  <p className="font-semibold text-sm">✓ Valid</p>
                </div>
                <div>
                  <p className="text-[#7aa3d1] text-xs">Insurance</p>
                  <p className="font-semibold text-sm">✓ Active</p>
                </div>
                <div>
                  <p className="text-[#7aa3d1] text-xs">Status</p>
                  <p className="font-semibold text-sm">✓ Verified</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full bg-[#1a2f4a] hover:bg-[#1f3a52] rounded-lg py-3 font-semibold text-sm flex items-center justify-center gap-2 border border-[#2a4f7a] transition-all">
                <Phone size={18} /> Contact Support
              </button>
              <button className="w-full bg-[#1a2f4a] hover:bg-[#1f3a52] rounded-lg py-3 font-semibold text-sm flex items-center justify-center gap-2 border border-[#2a4f7a] transition-all">
                <Settings size={18} /> Preferences
              </button>
              <button className="w-full bg-red-500/10 hover:bg-red-500/20 rounded-lg py-3 font-semibold text-sm flex items-center justify-center gap-2 border border-red-500/30 text-red-400 transition-all">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1f2e] border-t border-[#2a3f5f] px-4 py-3 flex justify-around items-center">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'home' ? 'text-[#ff6b35]' : 'text-[#7aa3d1]'
          }`}
        >
          <Truck size={24} />
          <span className="text-xs">Loads</span>
        </button>
        <button
          onClick={() => setActiveTab('earnings')}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'earnings' ? 'text-[#ff6b35]' : 'text-[#7aa3d1]'
          }`}
        >
          <DollarSign size={24} />
          <span className="text-xs">Earnings</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'profile' ? 'text-[#ff6b35]' : 'text-[#7aa3d1]'
          }`}
        >
          <Bell size={24} />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default DriverMobileApp;