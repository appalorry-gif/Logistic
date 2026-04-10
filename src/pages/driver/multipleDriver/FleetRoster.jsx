import React, { useState } from 'react';
import { 
  Truck, Search, Filter, MapPin, Activity, Settings, 
  X, Navigation, Fuel, Battery, Gauge, AlertTriangle, 
  Calendar, Clock, Zap, ShieldAlert, CheckCircle2, User // <-- Added User here
} from 'lucide-react';

const FleetRoster = () => {
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // ENRICHED ENTERPRISE MOCK DATA
  const fleet = [
    { 
      id: 'TN-49-AZ-1024', make: 'Tata Signa 1918.T', type: '20ft Container', driver: 'Rajesh K.', 
      status: 'Active', fuel: 75, speed: '65 km/h', rpm: '1450',
      location: 'NH-44, Madurai', lastPing: 'Just now', odometer: '145,230 km', 
      battery: '24.2V', coolant: '88°C', tireStatus: 'Normal',
      lastService: '12 Oct 2026', nextService: 'In 4,500 km', engine: 'Optimal', alerts: []
    },
    { 
      id: 'TN-45-XX-8821', make: 'Ashok Leyland 3120', type: 'Flatbed', driver: 'Suresh M.', 
      status: 'Idle', fuel: 40, speed: '0 km/h', rpm: '0',
      location: 'Base Yard, Trichy', lastPing: '2 mins ago', odometer: '89,400 km', 
      battery: '23.8V', coolant: 'Ambient', tireStatus: 'Normal',
      lastService: '05 Nov 2026', nextService: 'In 12,000 km', engine: 'Off', alerts: []
    },
    { 
      id: 'TN-68-BB-9090', make: 'Eicher Pro 3015', type: 'Refrigerated', driver: 'Prakash V.', 
      status: 'Active', fuel: 82, speed: '42 km/h', rpm: '1200',
      location: 'Salem Industrial', lastPing: '10 sec ago', odometer: '210,050 km', 
      battery: '24.5V', coolant: '90°C', tireStatus: 'Warning', 
      lastService: '28 Sep 2026', nextService: 'In 800 km', engine: 'Optimal', 
      alerts: ['Low pressure: Rear Left Tire']
    },
    { 
      id: 'TN-09-CC-1122', make: 'Tata Ultra 1918', type: '20ft Container', driver: 'Unassigned', 
      status: 'Maintenance', fuel: 15, speed: '0 km/h', rpm: '0',
      location: 'TVS Service Center', lastPing: '4 hours ago', odometer: '340,900 km', 
      battery: '11.2V', coolant: 'N/A', tireStatus: 'Critical',
      lastService: 'Currently in shop', nextService: 'N/A', engine: 'Needs Repair', 
      alerts: ['Battery Voltage Critical', 'Engine Check Light ON']
    }
  ];

  return (
    <div className="animate-fade-in relative">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Truck size={20} className="text-blue-600"/> Asset Roster & Telematics</h2>
          <p className="text-sm text-slate-500">Monitor vehicle health, IoT sensors, and live GPS assignments.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Filter size={16}/> Filter View
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors">
            + Add Asset
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Fleet Assets</p>
          <p className="text-3xl font-black text-slate-800 mt-1">{fleet.length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active & Routing</p>
          <p className="text-3xl font-black text-slate-800 mt-1">2 <span className="text-sm font-medium text-emerald-600 ml-1">healthy</span></p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-slate-400">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Idle at Yard</p>
          <p className="text-3xl font-black text-slate-800 mt-1">1</p>
        </div>
        <div className="bg-red-50 p-5 rounded-xl border border-red-200 shadow-sm border-l-4 border-l-red-500">
          <p className="text-red-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1"><AlertTriangle size={14}/> Action Required</p>
          <p className="text-3xl font-black text-red-700 mt-1">1 <span className="text-sm font-medium text-red-500 ml-1">in shop</span></p>
        </div>
      </div>

      {/* FLEET TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by plate, make, or driver..." 
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-72 transition-all shadow-sm" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-slate-500 font-semibold">
                <th className="p-4">Asset Identification</th>
                <th className="p-4">Current Driver</th>
                <th className="p-4">Location & Ping</th>
                <th className="p-4">IoT Vitals</th>
                <th className="p-4 text-right">Diagnostics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fleet.map((truck) => (
                <tr key={truck.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => setSelectedTruck(truck)}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-10 rounded-full ${truck.status === 'Active' ? 'bg-emerald-500' : truck.status === 'Idle' ? 'bg-slate-300' : 'bg-red-500'}`}></div>
                      <div>
                        <p className="font-black text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs inline-block mb-1 border border-slate-200">{truck.id}</p>
                        <p className="font-bold text-slate-700">{truck.make}</p>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{truck.type}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    {truck.driver !== 'Unassigned' ? (
                      <div>
                        <p className="font-bold text-slate-700">{truck.driver}</p>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-1 inline-block ${
                          truck.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                        }`}>{truck.status}</span>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 inline-flex items-center gap-1"><AlertTriangle size={12}/> Unassigned</span>
                    )}
                  </td>
                  
                  <td className="p-4">
                    <p className="font-bold text-slate-800 flex items-center gap-1.5"><MapPin size={14} className="text-blue-500"/> {truck.location}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase flex items-center gap-1"><Activity size={10}/> Last Ping: {truck.lastPing}</p>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Fuel size={14} className="text-slate-400 w-4"/>
                        <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden"><div className={`h-full ${truck.fuel > 20 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{width: `${truck.fuel}%`}}></div></div>
                        <span className="text-xs font-bold text-slate-700 w-8">{truck.fuel}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Battery size={14} className={parseFloat(truck.battery) > 23 ? "text-slate-400 w-4" : "text-red-500 w-4"}/>
                        <span className={`text-xs font-bold ${parseFloat(truck.battery) > 23 ? 'text-slate-700' : 'text-red-600'}`}>{truck.battery}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4 text-right">
                    {truck.alerts.length > 0 ? (
                      <button className="bg-red-50 text-red-600 border border-red-200 font-bold text-xs px-3 py-1.5 rounded-md flex items-center justify-end gap-1.5 ml-auto hover:bg-red-100 transition-colors">
                        <ShieldAlert size={14}/> {truck.alerts.length} Alerts
                      </button>
                    ) : (
                      <button className="bg-slate-100 text-slate-600 border border-slate-200 font-bold text-xs px-3 py-1.5 rounded-md flex items-center justify-end gap-1.5 ml-auto hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
                        <Activity size={14}/> View IoT Data
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================= */}
      {/* ADVANCED TELEMATICS MODAL                 */}
      {/* ========================================= */}
      {selectedTruck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                    selectedTruck.status === 'Active' ? 'bg-emerald-500 text-white' : 
                    selectedTruck.status === 'Maintenance' ? 'bg-red-500 text-white' : 'bg-slate-500 text-white'
                  }`}>
                    {selectedTruck.status}
                  </span>
                  <h2 className="text-xl font-black tracking-wide">{selectedTruck.id}</h2>
                </div>
                <p className="text-xs text-slate-400 font-medium">{selectedTruck.make} • {selectedTruck.type}</p>
              </div>
              <button onClick={() => setSelectedTruck(null)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"><X size={20}/></button>
            </div>
            
            {/* Modal Body */}
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden bg-slate-50">
              
              {/* Left Column: Live Vitals */}
              <div className="w-full md:w-1/2 p-6 overflow-y-auto border-r border-slate-200">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Activity size={14}/> Live Telemetry</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
                    <Gauge size={24} className="text-blue-500 mb-2"/>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Speed</p>
                    <p className="text-2xl font-black text-slate-800 mt-1">{selectedTruck.speed}</p>
                    <p className="text-xs text-slate-500 font-medium">{selectedTruck.rpm} RPM</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
                    <Fuel size={24} className={selectedTruck.fuel > 20 ? "text-emerald-500 mb-2" : "text-red-500 mb-2"}/>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fuel Level</p>
                    <p className={`text-2xl font-black mt-1 ${selectedTruck.fuel > 20 ? 'text-slate-800' : 'text-red-600'}`}>{selectedTruck.fuel}%</p>
                    <p className="text-xs text-slate-500 font-medium">Est. Range: ~{selectedTruck.fuel * 4} km</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><MapPin size={12}/> Last Known Location</p>
                    <p className="font-bold text-slate-800 text-sm">{selectedTruck.location}</p>
                    <p className="text-xs text-emerald-600 font-bold mt-1">Live Ping: {selectedTruck.lastPing}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><User size={12}/> Active Driver</p>
                    <p className="font-bold text-slate-800 text-sm">{selectedTruck.driver}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Engine & Diagnostics */}
              <div className="w-full md:w-1/2 p-6 overflow-y-auto bg-white">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Settings size={14}/> Engine & Diagnostics</h3>
                
                {/* Alerts Section */}
                {selectedTruck.alerts.length > 0 ? (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-xl mb-6 shadow-sm">
                    <h4 className="font-bold text-red-800 text-sm mb-2 flex items-center gap-2"><ShieldAlert size={16}/> Active DTC Alerts</h4>
                    <ul className="space-y-2">
                      {selectedTruck.alerts.map((alert, idx) => (
                        <li key={idx} className="text-xs font-bold text-red-700 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> {alert}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl mb-6 flex items-center gap-3 shadow-sm">
                    <CheckCircle2 className="text-emerald-500" size={24}/>
                    <div>
                      <h4 className="font-bold text-emerald-800 text-sm">System Healthy</h4>
                      <p className="text-xs text-emerald-600 font-medium">No active diagnostic trouble codes.</p>
                    </div>
                  </div>
                )}

                {/* Sensor Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 border border-slate-100 rounded-lg bg-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Odometer</p>
                    <p className="font-black text-slate-700 mt-0.5">{selectedTruck.odometer}</p>
                  </div>
                  <div className="p-3 border border-slate-100 rounded-lg bg-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Battery Volt</p>
                    <p className={`font-black mt-0.5 flex items-center gap-1 ${parseFloat(selectedTruck.battery) > 23 ? 'text-slate-700' : 'text-red-600'}`}><Zap size={14}/> {selectedTruck.battery}</p>
                  </div>
                  <div className="p-3 border border-slate-100 rounded-lg bg-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Engine Coolant</p>
                    <p className="font-black text-slate-700 mt-0.5">{selectedTruck.coolant}</p>
                  </div>
                  <div className="p-3 border border-slate-100 rounded-lg bg-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Tire Pressure</p>
                    <p className={`font-black mt-0.5 ${selectedTruck.tireStatus === 'Normal' ? 'text-emerald-600' : 'text-amber-600'}`}>{selectedTruck.tireStatus}</p>
                  </div>
                </div>

                {/* Maintenance Timeline */}
                <div className="border border-slate-200 rounded-xl p-4">
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2 mb-4"><Calendar size={16} className="text-blue-500"/> Service Timeline</h4>
                  <div className="relative pl-4 border-l-2 border-slate-200 space-y-4 ml-2">
                    <div className="relative">
                      <div className="absolute w-3 h-3 bg-white border-2 border-emerald-500 rounded-full -left-[23px] top-0.5"></div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Last Service</p>
                      <p className="font-bold text-slate-700 text-sm">{selectedTruck.lastService}</p>
                    </div>
                    <div className="relative">
                      <div className="absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full -left-[23px] top-0.5"></div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Next Scheduled</p>
                      <p className="font-bold text-slate-700 text-sm">{selectedTruck.nextService}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};
export default FleetRoster;