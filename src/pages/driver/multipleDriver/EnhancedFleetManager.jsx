import React, { useState } from 'react';
import { 
  Menu, X, Truck, Users, Package, DollarSign, MapPin, 
  Activity, Search, ArrowRight, MoreVertical, Building2, 
  Gauge, Thermometer, Clock, CheckCircle2, ShieldAlert, Route
} from 'lucide-react';

// IMPORT THE OTHER TABS
import FleetRoster from './FleetRoster';
import DriverManagement from './DriverManagement';
import RevenueExpenses from './RevenueExpenses';
import OwnerProfile from './OwnerProfile'; 

const EnhancedFleetManager = ({ userName = "Fleet Owner", onLogout, onBackToDriver }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dispatch');
  const [searchQuery, setSearchQuery] = useState('');

  // --- MODAL STATES ---
  const [activeKpiModal, setActiveKpiModal] = useState(null); // 'assets' | 'available' | 'transit' | 'pending' | null
  const [selectedLoadToMatch, setSelectedLoadToMatch] = useState(null);

  // --- ENRICHED ENTERPRISE MOCK DATA ---
  const fleet = [
    { id: 'TN-49-AZ-1024', type: '20ft Container', capacity: 18, driver: 'Rajesh K.', status: 'In Transit', location: 'NH-44, Madurai', dest: 'Chennai Port', eta: 'Today, 4:30 PM', speed: '62 km/h', temp: 'N/A', fuel: 75 },
    { id: 'TN-45-XX-8821', type: 'Flatbed', capacity: 24, driver: 'Suresh M.', status: 'Available', location: 'Base Yard, Trichy', dest: '-', eta: '-', speed: '0 km/h', temp: 'N/A', fuel: 40 },
    { id: 'TN-68-BB-9090', type: 'Refrigerated', capacity: 12, driver: 'Prakash V.', status: 'Loading', location: 'Salem Industrial', dest: 'Coimbatore Hub', eta: 'Tomorrow, 9:00 AM', speed: '0 km/h', temp: '-4°C', fuel: 82 },
    { id: 'TN-09-CC-1122', type: '20ft Container', capacity: 18, driver: 'Unassigned', status: 'Maintenance', location: 'Service Center', dest: '-', eta: 'Oct 15', speed: '0 km/h', temp: 'N/A', fuel: 15 },
    { id: 'TN-33-DD-4455', type: 'Box Truck', capacity: 9, driver: 'Kumar A.', status: 'Available', location: 'Chennai North', dest: '-', eta: '-', speed: '0 km/h', temp: 'N/A', fuel: 55 },
    { id: 'TN-11-EE-7777', type: 'Flatbed', capacity: 24, driver: 'Mani K.', status: 'In Transit', location: 'NH-7, Hosur', dest: 'Bangalore', eta: 'Tonight, 8:00 PM', speed: '55 km/h', temp: 'N/A', fuel: 60 }
  ];

  const pendingLoads = [
    { id: 'LD-9021', type: 'Electronics', weight: 8, origin: 'Chennai North', dest: 'Bangalore', rate: '₹18,500', pickup: 'Today, 8 PM', reqType: 'Box Truck', distance: '345 km' },
    { id: 'LD-9022', type: 'Steel Coils', weight: 22, origin: 'Trichy Yard', dest: 'Hosur', rate: '₹24,000', pickup: 'Tomorrow, 6 AM', reqType: 'Flatbed', distance: '290 km' },
    { id: 'LD-9023', type: 'Frozen Pharma', weight: 4, origin: 'Madurai', dest: 'Chennai Port', rate: '₹32,000', pickup: 'Tonight, 11 PM', reqType: 'Refrigerated', distance: '460 km' },
  ];

  // Helper to get trucks for KPI modals
  const getKpiData = () => {
    if (activeKpiModal === 'assets') return fleet;
    if (activeKpiModal === 'available') return fleet.filter(f => f.status === 'Available');
    if (activeKpiModal === 'transit') return fleet.filter(f => f.status === 'In Transit' || f.status === 'Loading');
    return [];
  };

  // Helper to assign a truck to a load
  const handleAssignTruck = (truckId, loadId) => {
    alert(`Success! Truck ${truckId} has been dispatched for Load ${loadId}.`);
    setSelectedLoadToMatch(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans text-slate-800 relative">
      
      {/* --- SIDEBAR --- */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col fixed h-full z-20 shadow-xl`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-950">
          {sidebarOpen && <div className="flex items-center gap-2 text-white font-bold tracking-wide"><Truck size={20} className="text-blue-500" /> MRG Fleet</div>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white mx-auto">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 text-sm">
          {[
            { id: 'dispatch', icon: Activity, label: 'Dispatch Center' },
            { id: 'fleet', icon: Truck, label: 'Fleet Roster' },
            { id: 'drivers', icon: Users, label: 'Driver Management' },
            { id: 'financials', icon: DollarSign, label: 'Revenue & Expenses' },
            { id: 'profile', icon: Building2, label: 'Enterprise Profile' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium ${
                activeTab === item.id ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-slate-400'} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-slate-800 capitalize">{activeTab.replace('-', ' ')}</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-md text-sm focus:ring-2 focus:ring-blue-500 w-72 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button onClick={onLogout} className="text-sm font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
              Sign Out
            </button>
          </div>
        </header>

        <div className="p-6 max-w-screen-2xl mx-auto">
          
          {/* TAB 1: DISPATCH CENTER */}
          {activeTab === 'dispatch' && (
            <div className="animate-fade-in space-y-6">
              
              {/* Executive Metrics - NOW INTERACTIVE */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { id: 'assets', label: 'Total Assets', value: fleet.length, sub: 'Active in system', color: 'blue' },
                  { id: 'available', label: 'Available to Load', value: fleet.filter(f => f.status === 'Available').length, sub: 'Ready for dispatch', color: 'emerald' },
                  { id: 'transit', label: 'In Transit', value: fleet.filter(f => f.status === 'In Transit' || f.status === 'Loading').length, sub: 'Currently moving', color: 'sky' },
                  { id: 'pending', label: 'Pending Loads', value: pendingLoads.length, sub: 'Awaiting assignment', color: 'amber' }
                ].map((stat) => (
                  <div 
                    key={stat.id} 
                    onClick={() => setActiveKpiModal(stat.id)}
                    className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between cursor-pointer hover:border-slate-400 hover:shadow-md transition-all group"
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-slate-500 text-sm font-semibold">{stat.label}</p>
                      <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-600 transition-colors"/>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <p className="text-3xl font-black text-slate-800">{stat.value}</p>
                      <p className={`text-xs font-medium text-${stat.color}-600 bg-${stat.color}-50 px-2 py-0.5 rounded`}>{stat.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Split View: Fleet Status vs Dispatch Queue */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* Left side: Dense Fleet Roster */}
                <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
                  <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <h2 className="font-bold flex items-center gap-2"><Truck size={18} className="text-blue-600"/> Live Fleet Status</h2>
                  </div>
                  
                  <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
                      <thead className="bg-slate-50 sticky top-0 shadow-sm z-10">
                        <tr className="text-slate-500">
                          <th className="p-3 font-semibold border-b border-slate-200">Vehicle Info</th>
                          <th className="p-3 font-semibold border-b border-slate-200">Status & Route</th>
                          <th className="p-3 font-semibold border-b border-slate-200">Telematics</th>
                          <th className="p-3 font-semibold border-b border-slate-200">ETA / Dest</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {fleet.map((truck) => (
                          <tr key={truck.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="p-3">
                              <p className="font-black text-slate-800">{truck.id}</p>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{truck.type} • {truck.capacity}T</p>
                              <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-600">
                                <Users size={12} className={truck.driver !== 'Unassigned' ? "text-blue-500" : "text-red-400"}/> 
                                {truck.driver}
                              </div>
                            </td>
                            
                            <td className="p-3">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
                                truck.status === 'Available' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                                truck.status === 'In Transit' ? 'bg-sky-100 text-sky-700 border border-sky-200' :
                                truck.status === 'Loading' ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-red-50 text-red-600 border border-red-100'
                              }`}>
                                {truck.status}
                              </span>
                              <div className="flex items-start gap-1 text-xs text-slate-600">
                                <MapPin size={12} className="text-slate-400 mt-0.5 shrink-0" />
                                <p className="font-medium truncate max-w-[150px]">{truck.location}</p>
                              </div>
                            </td>
                            
                            <td className="p-3">
                              <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 w-24">
                                  <Gauge size={12}/> {truck.speed}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                                  <Thermometer size={12} className={truck.temp !== 'N/A' ? "text-blue-500" : ""}/> {truck.temp}
                                </div>
                              </div>
                            </td>
                            
                            <td className="p-3">
                              {truck.dest !== '-' ? (
                                <>
                                  <p className="font-bold text-slate-700 text-xs truncate max-w-[120px]">{truck.dest}</p>
                                  <p className="text-[10px] font-bold text-emerald-600 mt-1 flex items-center gap-1"><Clock size={10}/> {truck.eta}</p>
                                </>
                              ) : (
                                <span className="text-xs text-slate-400">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right side: Dispatch Board */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col min-h-[600px]">
                  <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <h2 className="font-bold flex items-center gap-2"><Package size={18} className="text-amber-500"/> Dispatch Queue</h2>
                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">{pendingLoads.length} Loads</span>
                  </div>
                  
                  <div className="p-4 overflow-y-auto flex-1 space-y-4 bg-slate-50/50">
                    {pendingLoads.map((load) => (
                      <div key={load.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:border-blue-400 transition-colors relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
                        <div className="flex justify-between items-start mb-2 pl-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">{load.id}</span>
                          <span className="text-sm font-black text-emerald-600">{load.rate}</span>
                        </div>
                        
                        <div className="pl-2 mb-3">
                          <h3 className="font-bold text-slate-800 text-sm">{load.type}</h3>
                          <p className="text-[10px] font-bold text-slate-500 uppercase">{load.weight} Tons • {load.reqType}</p>
                        </div>
                        
                        <div className="relative pl-6 border-l-2 border-slate-100 space-y-3 mb-4 ml-4">
                          <div className="relative">
                            <div className="absolute w-2.5 h-2.5 bg-slate-300 rounded-full -left-[19px] top-1"></div>
                            <p className="text-xs font-bold text-slate-700">{load.origin}</p>
                          </div>
                          <div className="relative">
                            <div className="absolute w-2.5 h-2.5 bg-blue-500 rounded-full -left-[19px] top-1"></div>
                            <p className="text-xs font-bold text-slate-700">{load.dest}</p>
                          </div>
                        </div>

                        <button 
                          onClick={() => setSelectedLoadToMatch(load)}
                          className="w-full ml-2 bg-slate-900 text-white font-bold py-2 rounded-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 text-xs"
                        >
                          Find Matching Truck <Search size={14}/>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: FLEET ROSTER */}
          {activeTab === 'fleet' && <FleetRoster />}

          {/* TAB 3: DRIVER MANAGEMENT */}
          {activeTab === 'drivers' && <DriverManagement />}

          {/* TAB 4: REVENUE & EXPENSES */}
          {activeTab === 'financials' && <RevenueExpenses />}

          {/* TAB 5: ENTERPRISE PROFILE */}
         {activeTab === 'profile' && <OwnerProfile userName={userName} onBackToDriver={onBackToDriver} />}

        </div>
      </main>

      {/* ========================================================= */}
      {/* MODAL 1: KPI DETAILS (List trucks/loads based on top cards) */}
      {/* ========================================================= */}
      {activeKpiModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800 capitalize">
                {activeKpiModal === 'pending' ? 'Pending Loads Dashboard' : `Fleet Status: ${activeKpiModal}`}
              </h2>
              <button onClick={() => setActiveKpiModal(null)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-500"><X size={20}/></button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-3 bg-slate-50 flex-1">
              {activeKpiModal === 'pending' ? (
                // Show Pending Loads List
                pendingLoads.map(load => (
                  <div key={load.id} className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center shadow-sm">
                    <div>
                      <p className="font-bold text-sm text-slate-800">{load.id} - {load.type}</p>
                      <p className="text-xs text-slate-500 mt-1">{load.origin} <ArrowRight size={10} className="inline"/> {load.dest}</p>
                    </div>
                    <button onClick={() => { setActiveKpiModal(null); setSelectedLoadToMatch(load); }} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100">Match Truck</button>
                  </div>
                ))
              ) : (
                // Show Filtered Trucks List
                getKpiData().map(truck => (
                  <div key={truck.id} className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-100 p-2 rounded-lg"><Truck size={20} className="text-slate-600"/></div>
                      <div>
                        <p className="font-bold text-sm text-slate-800">{truck.id}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{truck.driver} • {truck.location}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${truck.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700'}`}>{truck.status}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: MATCH LOAD TO FLEET (Smart Assignment Interface) */}
      {/* ========================================================= */}
      {selectedLoadToMatch && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black flex items-center gap-2"><Route size={20} className="text-blue-400"/> Dispatch Assignment</h2>
                <p className="text-xs text-slate-400 font-medium mt-1">Matching Load {selectedLoadToMatch.id} to available fleet assets</p>
              </div>
              <button onClick={() => setSelectedLoadToMatch(null)} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"><X size={20}/></button>
            </div>
            
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {/* Left Column: Load Requirements */}
              <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-200 p-6 overflow-y-auto">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Load Requirements</h3>
                
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4">
                  <p className="font-black text-lg text-slate-800 mb-1">{selectedLoadToMatch.type}</p>
                  <p className="text-xs font-bold text-amber-600 bg-amber-50 inline-block px-2 py-1 rounded border border-amber-100 mb-4">{selectedLoadToMatch.weight} Tons Required</p>
                  
                  <div className="space-y-3 relative pl-2">
                    <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-slate-200"></div>
                    <div className="relative pl-6">
                      <div className="absolute w-3 h-3 bg-white border-2 border-slate-400 rounded-full -left-1 top-0.5"></div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Pickup</p>
                      <p className="font-bold text-slate-700 text-sm">{selectedLoadToMatch.origin}</p>
                      <p className="text-xs text-slate-500">{selectedLoadToMatch.pickup}</p>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full -left-1 top-0.5"></div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Dropoff</p>
                      <p className="font-bold text-slate-700 text-sm">{selectedLoadToMatch.dest}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Expected Payout</p>
                  <p className="text-2xl font-black text-emerald-600">{selectedLoadToMatch.rate}</p>
                </div>
              </div>

              {/* Right Column: Compatible Available Trucks */}
              <div className="w-full md:w-2/3 p-6 overflow-y-auto bg-white">
                <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recommended Matches</h3>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 size={14}/> Only showing Available</span>
                </div>

                <div className="space-y-4">
                  {/* Filter fleet to only show 'Available' trucks that have enough capacity */}
                  {fleet.filter(t => t.status === 'Available' && t.capacity >= selectedLoadToMatch.weight).length > 0 ? (
                    fleet.filter(t => t.status === 'Available' && t.capacity >= selectedLoadToMatch.weight).map(truck => (
                      <div key={truck.id} className="border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-blue-400 hover:shadow-md transition-all group">
                        
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 shrink-0">
                            <Truck size={24}/>
                          </div>
                          <div>
                            <p className="font-black text-slate-800">{truck.id}</p>
                            <p className="text-xs text-slate-500 font-medium">{truck.type} • {truck.capacity}T Capacity</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase"><MapPin size={10} className="inline"/> Near: {truck.location}</p>
                          </div>
                        </div>

                        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4">
                          <div className="text-left sm:text-right hidden sm:block">
                            <p className="text-xs font-bold text-slate-800">{truck.driver}</p>
                            <p className="text-[10px] text-emerald-600 font-bold uppercase mt-0.5">Ready Now</p>
                          </div>
                          <button 
                            onClick={() => handleAssignTruck(truck.id, selectedLoadToMatch.id)}
                            className="bg-slate-900 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors shadow-sm w-full sm:w-auto"
                          >
                            Assign
                          </button>
                        </div>

                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 bg-slate-50 border border-slate-200 rounded-xl">
                      <ShieldAlert size={40} className="mx-auto text-amber-500 mb-3"/>
                      <h4 className="font-bold text-slate-800">No compatible trucks available</h4>
                      <p className="text-sm text-slate-500 mt-1">None of your available trucks meet the {selectedLoadToMatch.weight} Ton capacity requirement.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default EnhancedFleetManager;