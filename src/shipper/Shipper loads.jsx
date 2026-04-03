import React, { useState, useEffect } from 'react';
import { MapPin, Truck, Calendar, Package, IndianRupee, Scale, AlertCircle, ShieldAlert, ThermometerSnowflake, X, FileText, Navigation, CheckCircle, User, Star, Hash } from 'lucide-react';
import './ShipperLoads.css';

const ShipperLoads = ({ incomingTruckData }) => {
  // Pre-selected truck (passed from Tracking Dashboard)
  const [preSelectedTruck, setPreSelectedTruck] = useState(incomingTruckData || null);

  const [formData, setFormData] = useState({
    pickup: preSelectedTruck ? preSelectedTruck.city : '', 
    dropoff: '',
    weight: '',
    length: '', width: '', height: '',
    goodsType: 'general',
    declaredValue: '',
    requirements: '',
    deliveryDate: '',
    flags: {
      fragile: false,
      hazardous: false,
      coldChain: false
    }
  });

  const [feeSummary, setFeeSummary] = useState({ baseFee: 0, fuelSurcharge: 0, insuranceFee: 0, gst: 0, totalFee: 0, utilizedPercent: 0 });
  
  // Autocomplete State
  const [activeDropdown, setActiveDropdown] = useState(null);
  const cities = ['Bangalore, KA', 'Mumbai, MH', 'Delhi, DL', 'Chennai, TN', 'Pune, MH', 'Hyderabad, KA', 'Kolkata, TS', 'Ahmedabad, WB', 'Jaipur, RJ', 'Surat, GJ'];

  // Dynamic Calculations Engine
  useEffect(() => {
    const weightNum = parseFloat(formData.weight) || 0;
    const valueNum = parseFloat(formData.declaredValue) || 0;
    
    let baseFee = 0;
    let utilizedPercent = 0;

    if (preSelectedTruck) {
      utilizedPercent = (weightNum / preSelectedTruck.maxCapacityKg) * 100;
      baseFee = weightNum * preSelectedTruck.ratePerKg;
    } else {
      baseFee = weightNum * 15.00; // General market rate
    }

    // Surcharges for special flags
    let handlingSurcharges = 0;
    if (formData.flags.hazardous) handlingSurcharges += 1500;
    if (formData.flags.coldChain) handlingSurcharges += 2000;

    const subTotal = baseFee + handlingSurcharges;
    
    // Real-world cost breakdown
    const fuelSurcharge = subTotal * 0.08; // 8% fuel surcharge
    const insuranceFee = valueNum * 0.005; // 0.5% of declared value
    const preGstTotal = subTotal + fuelSurcharge + insuranceFee;
    const gst = preGstTotal * 0.18; // 18% GST

    setFeeSummary({
      baseFee: subTotal,
      fuelSurcharge: fuelSurcharge,
      insuranceFee: insuranceFee,
      gst: gst,
      totalFee: preGstTotal + gst,
      utilizedPercent: utilizedPercent
    });
  }, [formData.weight, formData.declaredValue, formData.flags, preSelectedTruck]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Trigger dropdown for location fields
    if (name === 'pickup' || name === 'dropoff') {
      setActiveDropdown(value.length > 1 ? name : null);
    }
  };

  const selectCity = (field, city) => {
    setFormData(prev => ({ ...prev, [field]: city }));
    setActiveDropdown(null);
  };

  const handleFlagToggle = (flag) => {
    setFormData((prev) => ({
      ...prev,
      flags: { ...prev.flags, [flag]: !prev.flags[flag] }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (preSelectedTruck && feeSummary.utilizedPercent > 100) {
      alert("Error: Weight exceeds truck's maximum capacity!");
      return;
    }
    const mode = preSelectedTruck ? `assigned to ${preSelectedTruck.id}` : 'posted to Open Load Board';
    alert(`Load successfully ${mode}! Total Fee: ₹${feeSummary.totalFee.toLocaleString('en-IN', {maximumFractionDigits: 0})}`);
  };

  const removeAssignedTruck = () => {
    setPreSelectedTruck(null);
    setFormData(prev => ({ ...prev, pickup: '' })); 
  };

  return (
    <div className="loads-wrapper">
      <div className="loads-header">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{preSelectedTruck ? 'Assign Load to Vehicle' : 'Post New Load'}</h2>
          <p className="text-sm text-gray-500">Configure shipment details and calculate logistics costs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Form Area */}
        <div className="lg:col-span-2 loads-card">
          
          {/* DETAILED DRIVER & TRUCK PROFILE */}
          {preSelectedTruck && (
            <div className="bg-white border-2 border-[#3b5998] rounded-xl mb-6 overflow-hidden">
              <div className="bg-[#3b5998] px-4 py-2 flex justify-between items-center text-white">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1"><CheckCircle size={14}/> Vehicle Reserved</span>
                <button onClick={removeAssignedTruck} className="hover:text-red-300 transition-colors" title="Cancel Assignment"><X size={16} /></button>
              </div>
              
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Driver Info */}
                <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 pr-0 md:pr-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center border-2 border-emerald-500 text-slate-400">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{preSelectedTruck.driver}</h4>
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-500 mt-0.5">
                      <Star size={12} className="fill-amber-500"/> 4.8 Rating
                      <span className="text-gray-400 font-medium">• 142 Trips</span>
                    </div>
                  </div>
                </div>

                {/* Truck Specs */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1"><Hash size={10}/> Vehicle ID</p>
                    <p className="text-sm font-bold text-gray-800">{preSelectedTruck.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1"><Truck size={10}/> Type</p>
                    <p className="text-sm font-bold text-gray-800">{preSelectedTruck.type}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1"><IndianRupee size={10}/> Base Rate</p>
                    <p className="text-sm font-bold text-emerald-600">₹{preSelectedTruck.ratePerKg}/kg</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1"><MapPin size={10}/> Current Loc</p>
                    <p className="text-sm font-bold text-gray-800">{preSelectedTruck.city || preSelectedTruck.currentLocation}</p>
                  </div>
                </div>
              </div>

              {/* Dynamic Capacity Bar */}
              <div className="bg-slate-50 px-4 py-3 border-t border-gray-100">
                <div className="flex justify-between text-xs font-bold text-gray-600 mb-1.5">
                  <span>Weight Capacity Utilization</span>
                  <span className={feeSummary.utilizedPercent > 100 ? 'text-red-600' : 'text-[#3b5998]'}>
                    {formData.weight || 0} kg / {preSelectedTruck.maxCapacityKg} kg
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${feeSummary.utilizedPercent > 100 ? 'bg-red-500' : 'bg-[#3b5998]'}`} 
                    style={{ width: `${Math.min(feeSummary.utilizedPercent, 100)}%` }}
                  ></div>
                </div>
                {feeSummary.utilizedPercent > 100 && (
                  <p className="text-[10px] text-red-600 font-bold mt-1.5 flex items-center gap-1"><AlertCircle size={12}/> Overweight payload! Please reduce weight.</p>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            {/* Section 1: Routing */}
            <div className="form-section">
              <h4 className="form-section-title"><Navigation size={16}/> Routing & Schedule</h4>
              <div className="form-grid">
                
                {/* Pickup Location with Autocomplete */}
                <div className="input-group relative">
                  <label className="input-label">Origin / Pickup</label>
                  <div className="input-wrapper">
                    <MapPin className="input-icon" size={16} />
                    <input type="text" name="pickup" value={formData.pickup} onChange={handleChange} onFocus={() => formData.pickup.length > 1 && setActiveDropdown('pickup')} onBlur={() => setTimeout(() => setActiveDropdown(null), 200)} className="custom-input" required autoComplete="off" />
                  </div>
                  {activeDropdown === 'pickup' && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
                      {cities.filter(c => c.toLowerCase().includes(formData.pickup.toLowerCase())).map(city => (
                        <div key={city} onClick={() => selectCity('pickup', city)} className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 flex items-center gap-2 border-b border-gray-50 last:border-0">
                          <MapPin size={14} className="text-gray-400"/> {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dropoff Location with Autocomplete */}
                <div className="input-group relative">
                  <label className="input-label">Destination / Dropoff</label>
                  <div className="input-wrapper">
                    <MapPin className="input-icon" size={16} />
                    <input type="text" name="dropoff" value={formData.dropoff} onChange={handleChange} onFocus={() => formData.dropoff.length > 1 && setActiveDropdown('dropoff')} onBlur={() => setTimeout(() => setActiveDropdown(null), 200)} placeholder="Enter dropoff address" className="custom-input" required autoComplete="off" />
                  </div>
                  {activeDropdown === 'dropoff' && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
                      {cities.filter(c => c.toLowerCase().includes(formData.dropoff.toLowerCase())).map(city => (
                        <div key={city} onClick={() => selectCity('dropoff', city)} className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 flex items-center gap-2 border-b border-gray-50 last:border-0">
                          <MapPin size={14} className="text-gray-400"/> {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="input-group full-width">
                  <label className="input-label">Requested Dispatch Date & Time</label>
                  <div className="input-wrapper">
                    <Calendar className="input-icon" size={16} />
                    <input type="datetime-local" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} className="custom-input" required />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Cargo Specs */}
            <div className="form-section">
              <h4 className="form-section-title"><Package size={16}/> Cargo Specifications</h4>
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">Commodity Type</label>
                  <div className="input-wrapper">
                    <FileText className="input-icon" size={16} />
                    <select name="goodsType" value={formData.goodsType} onChange={handleChange} className="custom-input" required>
                      <option value="general">General Goods / FMCG</option>
                      <option value="electronics">Electronics & Appliances</option>
                      <option value="machinery">Industrial Machinery</option>
                      <option value="textiles">Textiles & Apparel</option>
                      <option value="food">Food & Perishables</option>
                    </select>
                  </div>
                </div>
                
                <div className="input-group">
                  <label className="input-label">Total Gross Weight (Kg)</label>
                  <div className="input-wrapper">
                    <Scale className="input-icon" size={16} />
                    <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="e.g., 1500" className="custom-input" required min="1" />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Dimensions (L x W x H in ft)</label>
                  <div className="dimensions-grid">
                    <input type="number" name="length" placeholder="L" value={formData.length} onChange={handleChange} className="custom-input no-icon text-center" />
                    <input type="number" name="width" placeholder="W" value={formData.width} onChange={handleChange} className="custom-input no-icon text-center" />
                    <input type="number" name="height" placeholder="H" value={formData.height} onChange={handleChange} className="custom-input no-icon text-center" />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Declared Value (For Insurance)</label>
                  <div className="input-wrapper">
                    <IndianRupee className="input-icon" size={16} />
                    <input type="number" name="declaredValue" value={formData.declaredValue} onChange={handleChange} placeholder="Goods value in ₹" className="custom-input" />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Handling */}
            <div className="form-section">
              <h4 className="form-section-title"><ShieldAlert size={16}/> Handling & Compliance</h4>
              
              <div className="input-group mb-4">
                <label className="input-label mb-1">Special Handling Flags</label>
                <div className="flag-group">
                  <label>
                    <input type="checkbox" className="flag-checkbox" checked={formData.flags.fragile} onChange={() => handleFlagToggle('fragile')} />
                    <span className="flag-label"><Package size={14}/> Fragile</span>
                  </label>
                  <label>
                    <input type="checkbox" className="flag-checkbox" checked={formData.flags.hazardous} onChange={() => handleFlagToggle('hazardous')} />
                    <span className="flag-label"><ShieldAlert size={14}/> Hazardous Material</span>
                  </label>
                  <label>
                    <input type="checkbox" className="flag-checkbox" checked={formData.flags.coldChain} onChange={() => handleFlagToggle('coldChain')} />
                    <span className="flag-label"><ThermometerSnowflake size={14}/> Cold Chain / Reefer</span>
                  </label>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Additional Instructions</label>
                <textarea name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Gate numbers, contact persons, specific loading equipment required..." className="custom-input" />
              </div>
            </div>

            {/* DETAILED FINANCIAL RECEIPT */}
            <div className="fee-summary mb-6">
              <h4 className="font-bold text-gray-800 border-b border-gray-200 pb-2 mb-2">Cost Breakdown</h4>
              <div className="fee-row">
                <span>Base Freight Charge</span>
                <span>₹{feeSummary.baseFee.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="fee-row">
                <span>Fuel Surcharge (8%)</span>
                <span>₹{feeSummary.fuelSurcharge.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="fee-row">
                <span>Cargo Insurance Premium (0.5%)</span>
                <span>₹{feeSummary.insuranceFee.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="fee-row text-gray-500">
                <span>GST (18%)</span>
                <span>₹{feeSummary.gst.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="fee-total">
                <span className="text-slate-800">Total Payable Amount</span>
                <span className="text-[#FF5A1F]">₹{feeSummary.totalFee.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-publish flex items-center justify-center gap-2"
              disabled={preSelectedTruck && feeSummary.utilizedPercent > 100}
            >
              <CheckCircle size={18}/>
              {preSelectedTruck ? 'Confirm Assignment & Pay' : 'Post to Open Load Board'}
            </button>
          </form>
        </div>

        {/* Sidebar History */}
        <div className="loads-card h-fit sticky top-6">
          <h3 className="loads-card-title">Recent Postings</h3>
          <div>
            {[
              { id: 'SHP#1260', from: 'Pune', to: 'Delhi', status: 'Assigned', time: '10 mins ago', type: 'Electronics', color: 'text-blue-600 bg-blue-100' },
              { id: 'SHP#1259', from: 'Mumbai', to: 'Jaipur', status: 'In Transit', time: '2 hours ago', type: 'Textiles', color: 'text-amber-600 bg-amber-100' },
              { id: 'SHP#1258', from: 'Chennai', to: 'Bangalore', status: 'Delivered', time: 'Yesterday', type: 'Machinery', color: 'text-emerald-600 bg-emerald-100' },
            ].map((load, idx) => (
              <div key={idx} className="history-item">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-gray-800 text-sm">{load.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${load.color}`}>
                    {load.status}
                  </span>
                </div>
                <p className="text-xs text-gray-800 font-bold mb-1">{load.from} → {load.to}</p>
                <p className="text-[10px] text-gray-500 font-medium">Commodity: {load.type} • {load.time}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShipperLoads;