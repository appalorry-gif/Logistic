import React, { useState } from 'react';
import { Package, Plus, MapPin, Navigation, Truck, Clock, DollarSign, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react';

const EnhancedCustomerDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [showPostModal, setShowPostModal] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    weight: '',
    from: '',
    to: '',
    urgency: 'normal',
    budget: '',
  });

  const [postedProducts, setPostedProducts] = useState([
    {
      id: 'PROD#001',
      name: 'Electronic Components',
      category: 'Electronics',
      quantity: '2 boxes (50 kg)',
      from: 'Our Warehouse, Whitefield',
      to: 'Tech Park, Koramangala',
      status: 'Matched',
      driver: 'Rajesh Kumar',
      driverRating: 4.8,
      pickupTime: 'Today 10 AM',
      eta: 'Today 12 PM',
      cost: '₹400',
      savings: '₹200 (33%)',
    },
    {
      id: 'PROD#002',
      name: 'Office Supplies',
      category: 'Supplies',
      quantity: '10 boxes (120 kg)',
      from: 'Our Office, MG Road',
      to: 'Business Hub, Richmond',
      status: 'In Transit',
      driver: 'Amit Singh',
      driverRating: 4.9,
      pickupTime: 'Today 2 PM',
      eta: 'Today 4 PM',
      cost: '₹600',
      savings: '₹300 (33%)',
    },
    {
      id: 'PROD#003',
      name: 'Raw Materials',
      category: 'Industrial',
      quantity: '5 boxes (80 kg)',
      from: 'Storage, Peenya',
      to: 'Manufacturing, Yelahanka',
      status: 'Searching',
      driver: null,
      driverRating: null,
      pickupTime: 'Tomorrow 9 AM',
      eta: 'Tomorrow 11 AM',
      cost: '₹500',
      savings: '₹250 (33%)',
    },
  ]);

  const handlePostProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: `PROD#${postedProducts.length + 100}`,
      ...formData,
      quantity: `${formData.weight} kg`,
      status: 'Searching',
      driver: null,
      driverRating: null,
      cost: formData.budget,
      savings: `₹${Math.round(parseInt(formData.budget) * 0.33)}`,
    };
    setPostedProducts([newProduct, ...postedProducts]);
    setFormData({
      productName: '',
      category: '',
      weight: '',
      from: '',
      to: '',
      urgency: 'normal',
      budget: '',
    });
    setShowPostModal(false);
    alert('✅ Product posted successfully!');
  };

  const stats = [
    {
      label: 'Total Shipments',
      value: postedProducts.length,
      icon: Package,
      color: 'from-blue-600 to-blue-400',
    },
    {
      label: 'In Progress',
      value: postedProducts.filter(p => p.status === 'In Transit' || p.status === 'Matched').length,
      icon: Truck,
      color: 'from-cyan-600 to-cyan-400',
    },
    {
      label: 'Total Savings',
      value: '₹2,850',
      icon: DollarSign,
      color: 'from-emerald-600 to-emerald-400',
    },
    {
      label: 'Avg Cost/kg',
      value: '₹8.50',
      icon: TrendingDown,
      color: 'from-amber-600 to-amber-400',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Matched':
        return 'bg-green-500/20 text-green-400';
      case 'In Transit':
        return 'bg-blue-500/20 text-blue-400';
      case 'Delivered':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'Searching':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00d4ff] to-[#0099ff] p-6 text-white rounded-b-2xl shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs opacity-90">Welcome back</p>
            <h1 className="text-2xl font-bold">TechMart India</h1>
          </div>
          <button
            onClick={() => setShowPostModal(true)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg px-4 py-2 font-semibold text-sm transition-all flex items-center gap-2"
          >
            <Plus size={18} /> Post Product
          </button>
        </div>
        <p className="text-xs opacity-90">Ship your products on optimal routes • Save up to 40%</p>
      </div>

      {/* Stats Grid */}
      <div className="px-6 py-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-[#1a2f4a] rounded-xl border border-[#2a4f7a] p-4">
              <p className="text-[#7aa3d1] text-xs mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-[#2a4f7a]">
          <button
            onClick={() => setSelectedTab('dashboard')}
            className={`py-3 px-4 border-b-2 transition-all font-semibold text-sm ${
              selectedTab === 'dashboard'
                ? 'border-[#00d4ff] text-[#00d4ff]'
                : 'border-transparent text-[#7aa3d1] hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setSelectedTab('shipments')}
            className={`py-3 px-4 border-b-2 transition-all font-semibold text-sm ${
              selectedTab === 'shipments'
                ? 'border-[#00d4ff] text-[#00d4ff]'
                : 'border-transparent text-[#7aa3d1] hover:text-white'
            }`}
          >
            Active Shipments
          </button>
        </div>

        {/* Tab Content */}
        {selectedTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Key Insight */}
            <div className="bg-blue-500/10 border border-[#00d4ff]/30 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle size={20} className="text-[#00d4ff] flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-white mb-1">Smart Matching Active</p>
                  <p className="text-[#7aa3d1] text-xs">
                    Our AI is matching your products with drivers on optimal routes. You'll save 33% on shipping costs!
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Clock size={20} className="text-[#00d4ff]" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="bg-[#1a2f4a] rounded-lg p-4 border border-[#2a4f7a]">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-white">Electronic Components matched with Rajesh</p>
                    <span className="text-xs text-[#7aa3d1]">2 hours ago</span>
                  </div>
                  <p className="text-sm text-[#7aa3d1]">Driver rated 4.8⭐ • Pickup Today 10 AM</p>
                </div>
                <div className="bg-[#1a2f4a] rounded-lg p-4 border border-[#2a4f7a]">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-white">Office Supplies in transit</p>
                    <span className="text-xs text-[#7aa3d1]">Just now</span>
                  </div>
                  <p className="text-sm text-[#7aa3d1]">Current location: MG Road • ETA: 4 PM</p>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div>
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <DollarSign size={20} className="text-[#4ade80]" />
                Cost Savings Breakdown
              </h3>
              <div className="bg-gradient-to-br from-[#1a2f4a] to-[#1f3a52] rounded-lg border border-[#2a4f7a] p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Traditional Shipping (if separate)</span>
                    <span className="font-bold text-white">₹8,550</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">SmartMatch Shipping</span>
                    <span className="font-bold text-[#4ade80]">₹5,700</span>
                  </div>
                  <div className="border-t border-[#2a4f7a] pt-4 flex justify-between items-center">
                    <span className="font-semibold text-white">Total Savings</span>
                    <span className="text-2xl font-bold text-[#4ade80]">₹2,850 (33%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'shipments' && (
          <div className="space-y-4">
            {postedProducts.map((product) => (
              <div key={product.id} className="bg-[#1a2f4a] rounded-xl border border-[#2a4f7a] p-6 hover:border-[#00d4ff] transition-all">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <p className="text-[#7aa3d1] text-xs mb-1">{product.category}</p>
                    <h3 className="text-lg font-bold text-white">{product.name}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </div>

                {/* Location Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex gap-3">
                    <MapPin size={16} className="text-[#ff6b35] mt-0.5" />
                    <div>
                      <p className="text-xs text-[#7aa3d1]">From</p>
                      <p className="text-sm font-semibold text-white">{product.from}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Navigation size={16} className="text-[#4ade80] mt-0.5" />
                    <div>
                      <p className="text-xs text-[#7aa3d1]">To</p>
                      <p className="text-sm font-semibold text-white">{product.to}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-[#0f1419] rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-[#7aa3d1] mb-1">Pickup</p>
                      <p className="font-semibold text-sm text-white">{product.pickupTime}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        <Truck size={18} className="text-[#00d4ff]" />
                      </div>
                      <p className="text-xs text-[#7aa3d1]">In Transit</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-[#7aa3d1] mb-1">Delivery</p>
                      <p className="font-semibold text-sm text-white">{product.eta}</p>
                    </div>
                  </div>
                </div>

                {/* Driver Info (if matched) */}
                {product.driver && (
                  <div className="bg-[#0f1419] rounded-lg p-4 mb-4 border border-[#4ade80]/30">
                    <p className="text-xs text-[#7aa3d1] mb-3">Assigned Driver</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-white text-sm">{product.driver}</p>
                        <p className="text-xs text-[#7aa3d1]">⭐ {product.driverRating} rating</p>
                      </div>
                      <button className="bg-[#00d4ff]/20 hover:bg-[#00d4ff]/30 text-[#00d4ff] px-4 py-2 rounded-lg text-xs font-semibold transition-all">
                        Track Live
                      </button>
                    </div>
                  </div>
                )}

                {/* Cost */}
                <div className="flex justify-between items-center pt-4 border-t border-[#2a4f7a]">
                  <div>
                    <p className="text-xs text-[#7aa3d1]">Shipping Cost</p>
                    <p className="text-lg font-bold text-white">{product.cost}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#4ade80] font-semibold mb-1">You Saved</p>
                    <p className="text-lg font-bold text-[#4ade80]">{product.savings}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Post Product Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1f2e] rounded-2xl border border-[#2a4f7a] max-w-md w-full max-h-screen overflow-y-auto">
            <div className="bg-gradient-to-r from-[#00d4ff] to-[#0099ff] p-6 sticky top-0">
              <h2 className="text-white font-bold text-xl">Post New Product</h2>
              <p className="text-white/80 text-xs mt-1">Get matched with drivers on optimal routes</p>
            </div>

            <form onSubmit={handlePostProduct} className="p-6 space-y-4">
              <div>
                <label className="text-[#7aa3d1] text-sm font-semibold block mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => setFormData({...formData, productName: e.target.value})}
                  placeholder="e.g., Electronic Components"
                  className="w-full bg-[#0f1419] border border-[#2a4f7a] rounded-lg px-4 py-2 text-white placeholder-[#546e8e] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]"
                  required
                />
              </div>

              <div>
                <label className="text-[#7aa3d1] text-sm font-semibold block mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-[#0f1419] border border-[#2a4f7a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#00d4ff]"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Food">Food & Beverages</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#7aa3d1] text-sm font-semibold block mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    placeholder="100"
                    className="w-full bg-[#0f1419] border border-[#2a4f7a] rounded-lg px-4 py-2 text-white placeholder-[#546e8e] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[#7aa3d1] text-sm font-semibold block mb-2">Budget (₹)</label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    placeholder="500"
                    className="w-full bg-[#0f1419] border border-[#2a4f7a] rounded-lg px-4 py-2 text-white placeholder-[#546e8e] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[#7aa3d1] text-sm font-semibold block mb-2">Pickup Location</label>
                <input
                  type="text"
                  value={formData.from}
                  onChange={(e) => setFormData({...formData, from: e.target.value})}
                  placeholder="Your warehouse address"
                  className="w-full bg-[#0f1419] border border-[#2a4f7a] rounded-lg px-4 py-2 text-white placeholder-[#546e8e] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]"
                  required
                />
              </div>

              <div>
                <label className="text-[#7aa3d1] text-sm font-semibold block mb-2">Delivery Location</label>
                <input
                  type="text"
                  value={formData.to}
                  onChange={(e) => setFormData({...formData, to: e.target.value})}
                  placeholder="Destination address"
                  className="w-full bg-[#0f1419] border border-[#2a4f7a] rounded-lg px-4 py-2 text-white placeholder-[#546e8e] focus:outline-none focus:ring-2 focus:ring-[#00d4ff]"
                  required
                />
              </div>

              <div>
                <label className="text-[#7aa3d1] text-sm font-semibold block mb-2">Urgency</label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                  className="w-full bg-[#0f1419] border border-[#2a4f7a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#00d4ff]"
                >
                  <option value="normal">Normal (3-5 days)</option>
                  <option value="high">High (1-2 days)</option>
                  <option value="urgent">Urgent (Same day)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 bg-[#2a4f7a] hover:bg-[#3a5f8a] text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#00d4ff] to-[#0099ff] hover:shadow-lg hover:shadow-[#00d4ff]/50 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Post Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedCustomerDashboard;