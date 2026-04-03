import React, { useState } from 'react';
import { Truck, Navigation, MapPin, Package, Star, Clock, DollarSign, Plus, AlertCircle } from 'lucide-react';

const EnhancedDriverHome = () => {
  const [selectedTab, setSelectedTab] = useState('available-loads');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pickedProducts, setPickedProducts] = useState([]);

  // Available loads (traditional)
  const availableLoads = [
    {
      id: 'LOAD#001',
      from: 'Electronics Hub, Whitefield',
      to: 'Tech Park, Koramangala',
      distance: '24 km',
      rate: '₹1,200',
      weight: '500 kg',
      urgency: 'High',
      customer: 'ABC Manufacturing',
    },
  ];

  // Available products from customers at nearby locations (NEW CONCEPT)
  const availableProducts = [
    {
      id: 'PROD#001',
      name: 'Electronic Components Box',
      quantity: '2 boxes (50 kg)',
      from: 'Electronics Hub, Whitefield',
      to: 'Tech Park, Koramangala', // Your destination!
      distance: '24 km (On your route!)',
      pay: '₹400',
      customer: 'TechMart India',
      rating: 4.8,
      type: 'Electronics',
      pickup: 'Anytime today',
      status: 'Available',
    },
    {
      id: 'PROD#002',
      name: 'Clothing Shipment',
      quantity: '5 boxes (80 kg)',
      from: 'Garment District, Indiranagar',
      to: 'Tech Park, Koramangala', // Your destination!
      distance: '18 km (On your route!)',
      pay: '₹550',
      customer: 'Fashion Hub',
      rating: 4.9,
      type: 'Apparel',
      pickup: 'Today 2 PM',
      status: 'Available',
    },
    {
      id: 'PROD#003',
      name: 'Office Furniture',
      quantity: '1 item (200 kg)',
      from: 'Industrial Area, Peenya',
      to: 'Business Park, Richmond Town',
      distance: '16 km (On your route!)',
      pay: '₹800',
      customer: 'Furniture Plus',
      rating: 4.7,
      type: 'Furniture',
      pickup: 'Today 3 PM',
      status: 'Available',
    },
  ];

  const activeTrip = {
    id: 'DRV#2024001',
    status: 'Ready to Pickup',
    destination: 'Tech Park, Koramangala',
    distance: '16 km',
    eta: '2:34 PM',
    compensation: '₹1,450',
    currentLoad: '0/500 kg',
  };

  const handlePickProduct = (product) => {
    if (!pickedProducts.find(p => p.id === product.id)) {
      setPickedProducts([...pickedProducts, product]);
      alert(`✅ ${product.name} added to your truck!`);
    }
  };

  const totalEarnings = pickedProducts.reduce((sum, p) => {
    const amount = parseInt(p.pay.replace('₹', '').replace(',', ''));
    return sum + amount;
  }, 0) + parseInt(activeTrip.compensation.replace('₹', '').replace(',', ''));

  const totalWeight = pickedProducts.reduce((sum, p) => {
    const weight = parseInt(p.quantity.match(/\d+/)[0]);
    return sum + weight;
  }, 0) + 500;

  return (
    <div className="space-y-6 pb-20">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-[#ff6b35] to-[#ff8555] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs opacity-90">Ready to deliver</p>
            <h2 className="text-2xl font-bold">Rajesh Kumar</h2>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-90">Truck Load</p>
            <p className="text-xl font-bold">{totalWeight} kg</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <p className="text-xs opacity-90">Potential Earnings</p>
            <p className="text-xl font-bold">₹{totalEarnings}</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <p className="text-xs opacity-90">Destination</p>
            <p className="text-sm font-bold truncate">{activeTrip.destination}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-[#2a4f7a] px-4">
        <button
          onClick={() => setSelectedTab('available-loads')}
          className={`py-3 px-4 border-b-2 transition-all font-semibold text-sm ${
            selectedTab === 'available-loads'
              ? 'border-[#ff6b35] text-[#ff6b35]'
              : 'border-transparent text-[#7aa3d1] hover:text-white'
          }`}
        >
          <Truck size={16} className="inline mr-2" />
          Full Loads (1)
        </button>
        <button
          onClick={() => setSelectedTab('nearby-products')}
          className={`py-3 px-4 border-b-2 transition-all font-semibold text-sm ${
            selectedTab === 'nearby-products'
              ? 'border-[#ff6b35] text-[#ff6b35]'
              : 'border-transparent text-[#7aa3d1] hover:text-white'
          }`}
        >
          <Package size={16} className="inline mr-2" />
          Nearby Products (3)
        </button>
        <button
          onClick={() => setSelectedTab('picked-products')}
          className={`py-3 px-4 border-b-2 transition-all font-semibold text-sm ${
            selectedTab === 'picked-products'
              ? 'border-[#ff6b35] text-[#ff6b35]'
              : 'border-transparent text-[#7aa3d1] hover:text-white'
          }`}
        >
          <CheckCircle2 size={16} className="inline mr-2" />
          Picked ({pickedProducts.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="px-4">
        {selectedTab === 'available-loads' && (
          <div className="space-y-4">
            <div className="bg-[#1a2f4a] rounded-xl border border-[#2a4f7a] p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs text-[#7aa3d1] mb-1">Full Shipment</p>
                  <p className="text-lg font-bold text-white">{availableLoads[0].id}</p>
                </div>
                <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold">
                  High Priority
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex gap-2 text-sm">
                  <MapPin size={16} className="text-[#ff6b35]" />
                  <span className="text-white">{availableLoads[0].from}</span>
                </div>
                <div className="flex gap-2 text-sm">
                  <Navigation size={16} className="text-[#4ade80]" />
                  <span className="text-white">{availableLoads[0].to}</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div>
                  <p className="text-xs text-[#7aa3d1]">Distance</p>
                  <p className="font-bold text-sm text-white">{availableLoads[0].distance}</p>
                </div>
                <div>
                  <p className="text-xs text-[#7aa3d1]">Weight</p>
                  <p className="font-bold text-sm text-white">{availableLoads[0].weight}</p>
                </div>
                <div>
                  <p className="text-xs text-[#7aa3d1]">Rate</p>
                  <p className="font-bold text-sm text-[#4ade80]">{availableLoads[0].rate}</p>
                </div>
                <div>
                  <p className="text-xs text-[#7aa3d1]">Customer</p>
                  <p className="font-bold text-xs text-white">{availableLoads[0].customer}</p>
                </div>
              </div>
              <button className="w-full bg-[#ff6b35] hover:bg-[#ff5522] text-white py-3 rounded-lg font-semibold transition-all">
                Accept Load
              </button>
            </div>
          </div>
        )}

        {selectedTab === 'nearby-products' && (
          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-[#00d4ff]/30 rounded-lg p-4 flex gap-3">
              <AlertCircle size={20} className="text-[#00d4ff] flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-white mb-1">Smart Load Concept</p>
                <p className="text-[#7aa3d1] text-xs">
                  These products are from customers on your route! Pick them up to optimize your load and earn extra.
                </p>
              </div>
            </div>

            {availableProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#1a2f4a] rounded-xl border border-[#2a4f7a] hover:border-[#ff6b35] transition-all p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="text-xs text-[#00d4ff] font-semibold mb-1">{product.type}</p>
                    <p className="text-lg font-bold text-white">{product.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#4ade80]">{product.pay}</p>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-white font-semibold">{product.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex gap-2 text-sm">
                    <MapPin size={16} className="text-[#ff6b35] flex-shrink-0" />
                    <span className="text-white">{product.from}</span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <Navigation size={16} className="text-[#4ade80] flex-shrink-0" />
                    <span className="text-white">{product.to}</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-4 py-3 bg-[#0f1419] rounded-lg p-2">
                  <div>
                    <p className="text-xs text-[#7aa3d1]">Distance</p>
                    <p className="font-bold text-xs text-white">{product.distance}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7aa3d1]">Weight</p>
                    <p className="font-bold text-xs text-white">{product.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7aa3d1]">Pickup</p>
                    <p className="font-bold text-xs text-white">{product.pickup}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#7aa3d1]">From</p>
                    <p className="font-bold text-xs text-white">{product.customer}</p>
                  </div>
                </div>

                <button
                  onClick={() => handlePickProduct(product)}
                  disabled={pickedProducts.find(p => p.id === product.id)}
                  className={`w-full py-2 rounded-lg font-semibold transition-all text-sm flex items-center justify-center gap-2 ${
                    pickedProducts.find(p => p.id === product.id)
                      ? 'bg-[#4ade80]/20 text-[#4ade80] cursor-not-allowed'
                      : 'bg-[#00d4ff]/20 text-[#00d4ff] hover:bg-[#00d4ff]/30'
                  }`}
                >
                  {pickedProducts.find(p => p.id === product.id) ? (
                    <>✓ Picked Up</>
                  ) : (
                    <>
                      <Plus size={16} /> Pick This Product
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'picked-products' && (
          <div className="space-y-4">
            {pickedProducts.length === 0 ? (
              <div className="bg-[#1a2f4a] rounded-xl border border-[#2a4f7a] p-8 text-center">
                <Package size={32} className="text-[#7aa3d1] mx-auto mb-3 opacity-50" />
                <p className="text-[#7aa3d1]">No products picked yet</p>
                <p className="text-xs text-[#546e8e] mt-2">Browse nearby products to optimize your truck load</p>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] rounded-xl p-4 text-white">
                  <p className="text-sm opacity-90">Total Picked Products</p>
                  <p className="text-2xl font-bold">{pickedProducts.length} Products</p>
                </div>
                {pickedProducts.map((product) => (
                  <div key={product.id} className="bg-[#1a2f4a] rounded-xl border border-[#4ade80] p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm font-bold text-white">{product.name}</p>
                        <p className="text-xs text-[#7aa3d1]">{product.type}</p>
                      </div>
                      <p className="text-lg font-bold text-[#4ade80]">{product.pay}</p>
                    </div>
                    <div className="text-xs text-[#7aa3d1] space-y-1 mb-3">
                      <p>📍 {product.from}</p>
                      <p>🧭 {product.to}</p>
                    </div>
                    <button
                      onClick={() => setPickedProducts(pickedProducts.filter(p => p.id !== product.id))}
                      className="w-full text-red-400 hover:text-red-300 text-xs font-semibold py-2 border border-red-500/30 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Bottom Summary Card */}
      {pickedProducts.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f1419] via-[#0f1419] to-transparent p-4">
          <div className="bg-[#1a2f4a] border border-[#4ade80] rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-[#7aa3d1]">Total Weight</p>
                <p className="font-bold text-white">{totalWeight} kg</p>
              </div>
              <div>
                <p className="text-xs text-[#7aa3d1]">Products</p>
                <p className="font-bold text-white">{pickedProducts.length + 1}</p>
              </div>
              <div>
                <p className="text-xs text-[#7aa3d1]">Total Earnings</p>
                <p className="font-bold text-[#4ade80]">₹{totalEarnings}</p>
              </div>
            </div>
            <button className="w-full bg-[#ff6b35] hover:bg-[#ff5522] text-white py-3 rounded-lg font-semibold">
              Start Delivery 🚚
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedDriverHome;