import React, { useState } from 'react';
import { 
  Users, Search, Filter, ShieldCheck, AlertTriangle, Star, 
  Phone, Mail, X, Truck, Calendar, Clock, FileCheck, MessageSquare, 
  ShieldAlert, UserPlus, ChevronDown, Check, Activity, 
  Lock, Eye, EyeOff, MapPin, Award // Added missing icons here
} from 'lucide-react';

const DriverManagement = () => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [driverPassword, setDriverPassword] = useState('');
  const [driverUsername, setDriverUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Added missing state here
  
  // STATES FOR INTERACTIVITY
  const [filterMode, setFilterMode] = useState('All'); // 'All', 'On Duty', 'Off Duty', 'Alerts'
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ENRICHED ENTERPRISE MOCK DATA
  const [drivers, setDrivers] = useState([
    { 
      id: 'DRV-001', name: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh.k@mrgfleet.com', 
      status: 'On Duty', compliance: 'Clear', trips: 142, rating: 4.8, onTime: '96%',
      assignedTruck: 'TN-49-AZ-1024', joined: '12 Jan 2024',
      documents: { license: 'Valid', medical: 'Valid', background: 'Verified' },
      alerts: []
    },
    { 
      id: 'DRV-002', name: 'Suresh M.', phone: '+91 98765 43211', email: 'suresh.m@mrgfleet.com', 
      status: 'Off Duty', compliance: 'Clear', trips: 89, rating: 4.9, onTime: '98%',
      assignedTruck: 'TN-45-XX-8821', joined: '05 Mar 2025',
      documents: { license: 'Valid', medical: 'Valid', background: 'Verified' },
      alerts: []
    },
    { 
      id: 'DRV-003', name: 'Prakash V.', phone: '+91 98765 43212', email: 'prakash.v@mrgfleet.com', 
      status: 'On Duty', compliance: 'Warning', trips: 204, rating: 4.6, onTime: '91%',
      assignedTruck: 'TN-68-BB-9090', joined: '22 Aug 2023',
      documents: { license: 'Expiring Soon', medical: 'Valid', background: 'Verified' },
      alerts: ['Heavy Vehicle License expires in 15 days']
    },
    { 
      id: 'DRV-004', name: 'Mani K.', phone: '+91 98765 43213', email: 'mani.k@mrgfleet.com', 
      status: 'Off Duty', compliance: 'Critical', trips: 56, rating: 4.2, onTime: '84%',
      assignedTruck: 'TN-11-EE-7777', joined: '10 Nov 2025',
      documents: { license: 'Valid', medical: 'Expired', background: 'Pending Review' },
      alerts: ['Medical Fitness Certificate Expired', 'Background Check Pending']
    },
    { 
      id: 'DRV-005', name: 'Ajith S.', phone: '+91 98765 43214', email: 'ajith.s@mrgfleet.com', 
      status: 'On Duty', compliance: 'Clear', trips: 120, rating: 4.7, onTime: '94%',
      assignedTruck: 'TN-33-DD-4455', joined: '15 Jan 2026',
      documents: { license: 'Valid', medical: 'Valid', background: 'Verified' },
      alerts: []
    }
  ]);

  // SMART FILTERING LOGIC
  const filteredDrivers = drivers.filter(driver => {
    // 1. Search Query Match
    const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          driver.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Status/Compliance Filter Match
    let matchesFilter = true;
    if (filterMode === 'Alerts') {
      matchesFilter = driver.compliance !== 'Clear';
    } else if (filterMode !== 'All') {
      matchesFilter = driver.status === filterMode;
    }

    return matchesSearch && matchesFilter;
  });

  // KPI CALCULATIONS
  const activeCount = drivers.filter(d => d.status === 'On Duty').length;
  const alertCount = drivers.filter(d => d.compliance !== 'Clear').length;

  const handleOnboardSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowOnboardModal(false);
      alert("New driver profile created successfully and pending document verification.");
    }, 1500);
  };

  return (
    <div className="animate-fade-in relative pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Users size={20} className="text-blue-600"/> Driver Personnel</h2>
          <p className="text-sm text-slate-500">Manage hired drivers, compliance documents, and route performance.</p>
        </div>
        <div className="flex gap-3 relative">
          
          {/* Custom Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`border px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2 transition-colors ${filterMode !== 'All' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              <Filter size={16}/> {filterMode === 'All' ? 'Filter View' : filterMode} <ChevronDown size={14}/>
            </button>
            
            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                {['All', 'On Duty', 'Off Duty', 'Alerts'].map(mode => (
                  <button 
                    key={mode}
                    onClick={() => { setFilterMode(mode); setShowFilterMenu(false); }}
                    className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-between border-b border-slate-50 last:border-0"
                  >
                    {mode === 'Alerts' ? 'Compliance Issues' : mode} 
                    {filterMode === mode && <Check size={16} className="text-blue-600"/>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => setShowOnboardModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <UserPlus size={16}/> Onboard Driver
          </button>
        </div>
      </div>

      {/* INTERACTIVE KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div 
          onClick={() => setFilterMode('All')}
          className={`bg-white rounded-xl border p-5 shadow-sm cursor-pointer transition-all ${filterMode === 'All' ? 'border-blue-500 ring-4 ring-blue-50' : 'border-slate-200 hover:border-blue-300'}`}
        >
          <div className="flex justify-between items-center mb-2"><h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">Total Workforce</h3><Users className="text-blue-500" size={20}/></div>
          <p className="text-3xl font-black text-slate-800">{drivers.length} <span className="text-sm font-medium text-slate-400">Drivers</span></p>
        </div>
        
        <div 
          onClick={() => setFilterMode('On Duty')}
          className={`bg-white rounded-xl border p-5 shadow-sm cursor-pointer transition-all ${filterMode === 'On Duty' ? 'border-emerald-500 ring-4 ring-emerald-50' : 'border-slate-200 hover:border-emerald-300'}`}
        >
          <div className="flex justify-between items-center mb-2"><h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">Active on Shift</h3><Truck className="text-emerald-500" size={20}/></div>
          <p className="text-3xl font-black text-slate-800">{activeCount} <span className="text-sm font-medium text-slate-400">On Duty</span></p>
        </div>
        
        <div 
          onClick={() => setFilterMode('Alerts')}
          className={`rounded-xl border p-5 shadow-sm cursor-pointer transition-all ${filterMode === 'Alerts' ? 'bg-red-50 border-red-500 ring-4 ring-red-50' : 'bg-white border-red-200 hover:border-red-400'}`}
        >
          <div className="flex justify-between items-center mb-2"><h3 className="text-red-700 font-bold text-sm uppercase tracking-wider">Compliance Alerts</h3><AlertTriangle className="text-red-600" size={20}/></div>
          <p className="text-3xl font-black text-red-700">{alertCount} <span className="text-sm font-medium text-red-500">Action Required</span></p>
        </div>
      </div>

      {/* DRIVER TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search drivers by name or ID..." 
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none w-72 focus:ring-2 focus:ring-blue-500 transition-all" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {filterMode !== 'All' && (
            <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
              Showing: <span className="text-blue-600">{filterMode === 'Alerts' ? 'Compliance Issues' : filterMode}</span>
            </span>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-slate-500 font-semibold">
                <th className="p-4">Driver Identity</th>
                <th className="p-4">Assigned Vehicle</th>
                <th className="p-4">Shift Status</th>
                <th className="p-4">Performance</th>
                <th className="p-4">Compliance</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDrivers.length > 0 ? filteredDrivers.map((driver, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => setSelectedDriver(driver)}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg border shrink-0 ${driver.compliance !== 'Clear' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>
                        {driver.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{driver.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{driver.id}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Truck size={14} className="text-slate-400"/>
                      <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{driver.assignedTruck}</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${driver.status === 'On Duty' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                      {driver.status}
                    </span>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 font-bold text-slate-800"><Star size={14} className="text-amber-500 fill-amber-500"/> {driver.rating}</div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">{driver.trips} Trips • {driver.onTime} On-Time</p>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    {driver.compliance === 'Clear' && <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider"><ShieldCheck size={12}/> Clear</span>}
                    {driver.compliance === 'Warning' && <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider"><AlertTriangle size={12}/> Warning</span>}
                    {driver.compliance === 'Critical' && <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 border border-red-200 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider"><AlertTriangle size={12}/> Critical</span>}
                  </td>
                  
                  <td className="p-4 text-right">
                    <button className="bg-white border border-slate-200 text-blue-600 px-3 py-1.5 rounded-md text-xs font-bold group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                      View Dossier
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-slate-500">
                    <AlertTriangle size={32} className="mx-auto mb-3 text-slate-300"/>
                    <p className="font-bold text-slate-700">No drivers match your filters.</p>
                    <p className="text-xs mt-1">Try adjusting your search or clearing your status filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ====================================================== */}
      {/* ONBOARD NEW DRIVER MODAL (EXPANDED WITH LOGIN SETUP)   */}
      {/* ====================================================== */}
      {showOnboardModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[95vh]">
            
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black flex items-center gap-2"><UserPlus size={20} className="text-blue-400"/> New Driver Enrollment</h2>
                <p className="text-xs text-slate-400 mt-1">Fill out personal, professional, and security details.</p>
              </div>
              <button onClick={() => setShowOnboardModal(false)} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleOnboardSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50">
                
                {/* 1. PERSONAL DETAILS */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <Users size={14}/> Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2"><label className="block text-xs font-bold text-slate-700 mb-1">Full Name (As per Govt ID)</label><input required type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Kumar S."/></div>
                    <div><label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label><input required type="date" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"/></div>
                    
                    <div><label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label><input required type="tel" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="+91"/></div>
                    <div><label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label><input type="email" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="driver@example.com"/></div>
                    <div><label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label><select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"><option value="">Select...</option><option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option></select></div>
                    
                    <div className="md:col-span-3"><label className="block text-xs font-bold text-slate-700 mb-1">Permanent Residential Address</label><textarea required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 h-16" placeholder="Enter complete address..."></textarea></div>
                  </div>
                </div>

                {/* 2. PROFESSIONAL & EMERGENCY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Licensing */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2 flex items-center gap-2"><FileCheck size={14}/> Licensing & Exp</h3>
                    <div className="space-y-4">
                      <div><label className="block text-xs font-bold text-slate-700 mb-1">HMV License Number</label><input required type="text" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono uppercase focus:ring-2 focus:ring-blue-500 outline-none" placeholder="TN-XX-XXXXXXX"/></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-xs font-bold text-slate-700 mb-1">License Expiry</label><input required type="date" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-600"/></div>
                        <div><label className="block text-xs font-bold text-slate-700 mb-1">Experience (Yrs)</label><input required type="number" min="0" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 5"/></div>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h3 className="text-xs font-bold text-red-600 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2 flex items-center gap-2"><AlertTriangle size={14}/> Emergency Contact</h3>
                    <div className="space-y-4">
                      <div><label className="block text-xs font-bold text-slate-700 mb-1">Contact Person Name</label><input required type="text" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none" placeholder="Spouse/Parent Name"/></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-xs font-bold text-slate-700 mb-1">Relation</label><input required type="text" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none" placeholder="e.g. Wife"/></div>
                        <div><label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label><input required type="tel" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none" placeholder="+91"/></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. ACCOUNT CREDENTIALS SETUP */}
                <div className="bg-slate-900 rounded-xl p-6 shadow-lg text-white border border-slate-700 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  
                  <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2"><Lock size={14}/> App Access Credentials</h3>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded font-bold">Mobile App Login</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Login Username</label>
                      <input 
                        required 
                        type="text" 
                        value={driverUsername}
                        onChange={(e) => setDriverUsername(e.target.value)}
                        className="w-full p-2.5 bg-slate-800 border border-slate-600 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 text-white" 
                        placeholder="e.g. rajesh_kumar"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-slate-400">Access Password</label>
                        <button 
                          type="button" 
                          onClick={() => setDriverPassword(`MrgFleet@${Math.floor(1000 + Math.random() * 9000)}`)}
                          className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Auto-Generate
                        </button>
                      </div>
                      
                      <div className="relative">
                        <input 
                          required 
                          type={showPassword ? 'text' : 'password'} 
                          value={driverPassword}
                          onChange={(e) => setDriverPassword(e.target.value)}
                          className="w-full p-2.5 bg-slate-800 border border-slate-600 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 text-white pr-10" 
                          placeholder="Set secure password"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors">
                          {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* MODAL FOOTER */}
              <div className="px-6 py-4 bg-white border-t border-slate-200 flex justify-end gap-3">
                <button type="button" onClick={() => setShowOnboardModal(false)} className="px-6 py-2.5 rounded-lg font-bold text-slate-600 hover:bg-slate-100">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center justify-center min-w-[180px]">
                  {isSubmitting ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Save & Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* 2. DRIVER DOSSIER MODAL                   */}
      {/* ========================================= */}
      {selectedDriver && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-900 text-white flex justify-between items-center">
              <h2 className="text-lg font-black flex items-center gap-2"><Users size={20} className="text-blue-400"/> Driver Dossier</h2>
              <button onClick={() => setSelectedDriver(null)} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"><X size={20}/></button>
            </div>
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden bg-slate-50">
              <div className="w-full md:w-1/2 p-6 overflow-y-auto border-r bg-white flex flex-col items-center">
                  <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-4xl font-black mb-3 border border-blue-100 shadow-sm">{selectedDriver.name.charAt(0)}</div>
                  <h3 className="text-2xl font-black text-slate-800">{selectedDriver.name}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase bg-slate-100 px-3 py-1 rounded-full mt-2 border">{selectedDriver.id}</p>
                  <div className="w-full space-y-3 mt-6">
                    <div className="bg-slate-50 p-4 rounded-xl border space-y-2">
                        <p className="flex items-center gap-3 text-sm text-slate-700 font-medium"><Phone size={16} className="text-slate-400"/> {selectedDriver.phone}</p>
                        <p className="flex items-center gap-3 text-sm text-slate-700 font-medium"><Mail size={16} className="text-slate-400"/> {selectedDriver.email}</p>
                        <p className="flex items-center gap-3 text-sm text-slate-700 font-medium"><Calendar size={16} className="text-slate-400"/> Joined {selectedDriver.joined}</p>
                    </div>
                  </div>
              </div>
              <div className="w-full md:w-1/2 p-6 overflow-y-auto">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Activity size={14}/> Stats</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white p-4 rounded-xl border shadow-sm text-center"><Star size={20} className="text-amber-500 fill-amber-500 mx-auto mb-1"/><p className="text-2xl font-black">{selectedDriver.rating}</p></div>
                  <div className="bg-white p-4 rounded-xl border shadow-sm text-center"><Clock size={20} className="text-emerald-500 mx-auto mb-1"/><p className="text-2xl font-black">{selectedDriver.onTime}</p></div>
                </div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><FileCheck size={14}/> Compliance</h3>
                <div className="space-y-2">
                   <div className="flex justify-between bg-white border p-3 rounded-lg text-sm font-bold text-slate-700"><span>HMV License</span><span className="text-emerald-600">Valid</span></div>
                   <div className="flex justify-between bg-white border p-3 rounded-lg text-sm font-bold text-slate-700"><span>Medical Fit</span><span className="text-emerald-600">Valid</span></div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-white border-t border-slate-200 flex justify-end gap-3">
              <button className="bg-slate-50 border px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors hover:bg-slate-100"><Phone size={16}/> Call</button>
              <button className="bg-blue-600 border border-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors hover:bg-blue-700 shadow-lg shadow-blue-500/20"><MessageSquare size={16}/> Message</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverManagement;