import React, { useState } from 'react';
import { MapPin, Phone, CheckCircle, Map as MapIcon, Box, Clock, ArrowRight, IndianRupee, Target, Filter } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icons for React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DriverHome = () => {
  const [taskStatus, setTaskStatus] = useState('heading_pickup'); 

  // Driver Summary
  const dailyStats = { earningsToday: 1850, tasksCompleted: 2, tasksAssigned: 4 };

  // Active Task Details
  const activeTask = {
    id: 'AWB#8849201', payout: '₹3,450', distanceToPickup: '4.2 km', estTime: '12 mins',
    pickup: { company: 'Sharma Electronics Hub', address: 'Gate 4, Plot 45, Peenya Industrial Area, Bangalore', contact: 'Ramesh (Warehouse Mgr)', phone: '+91 98765 43210', instructions: 'Enter through Gate 4. Park at Dock B.', coords: [13.0285, 77.5197] },
    dropoff: { company: 'TechHub Retail Pvt Ltd', address: 'Shop 12, Ground Floor, 100ft Road, Koramangala', instructions: 'Unload at the back alley entrance.', coords: [12.9352, 77.6245] },
    cargo: [
      { item: 'Fragile LED TVs', qty: '12 Boxes', weight: '240 kg', dims: '2x2x1 ft' },
      { item: 'Home Theater Systems', qty: '4 Pallets', weight: '600 kg', dims: '4x4x4 ft' }
    ],
    totalWeight: '840 kg', currentLocation: [13.0500, 77.5000]
  };

  const availableLoads = [
    { id: 'LD-902', from: 'Hebbal, BLR', to: 'Yelahanka, BLR', dist: '12 km', weight: '400 kg', rate: '₹750', tags: ['Fragile'], estTime: '25 mins' },
    { id: 'LD-903', from: 'Whitefield, BLR', to: 'Indiranagar, BLR', dist: '15 km', weight: '800 kg', rate: '₹1,100', tags: ['Heavy'], estTime: '40 mins' },
    { id: 'LD-904', from: 'Electronic City', to: 'Marathahalli', dist: '18 km', weight: '1,200 kg', rate: '₹1,450', tags: ['Fast Transit'], estTime: '45 mins' },
    { id: 'LD-905', from: 'Yeshwanthpur', to: 'KR Puram', dist: '22 km', weight: '1,500 kg', rate: '₹1,850', tags: ['Standard'], estTime: '55 mins' }
  ];

  const handleNextAction = () => {
    if (taskStatus === 'heading_pickup') setTaskStatus('arrived_pickup');
    else if (taskStatus === 'arrived_pickup') setTaskStatus('loading');
    else if (taskStatus === 'loading') setTaskStatus('in_transit');
    else if (taskStatus === 'in_transit') setTaskStatus('completed');
  };

  return (
    <div className="w-full bg-[#F4F7FB] min-h-screen font-sans p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* HEADER & TOP STATS */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Driver Command Center</h1>
            <p className="text-sm text-slate-500">Manage your active route and find new loads</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm flex items-center gap-4">
              <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><IndianRupee size={20}/></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Today's Earnings</p>
                <p className="text-xl font-black text-slate-800">₹{dailyStats.earningsToday}</p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm flex items-center gap-4">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Target size={20}/></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tasks Progress</p>
                <p className="text-xl font-black text-slate-800">{dailyStats.tasksCompleted} <span className="text-sm text-slate-400">/ {dailyStats.tasksAssigned}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN WEB DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: ACTIVE TASK (Takes up 2/3 of screen) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {taskStatus !== 'completed' ? (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Active Trip</span>
                    <h2 className="text-lg font-black text-slate-800">{activeTask.id}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Payout</p>
                    <p className="text-xl font-black text-emerald-600">{activeTask.payout}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100">
                  <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: taskStatus === 'heading_pickup' ? '25%' : taskStatus === 'arrived_pickup' ? '50%' : taskStatus === 'loading' ? '75%' : '100%' }}></div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Web Layout: Details on left, Map on right */}
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-4">
                      <div className="flex-1 bg-amber-50 border border-amber-100 p-3 rounded-lg flex items-center gap-3">
                        <Clock size={20} className="text-amber-500"/>
                        <div><p className="text-[10px] uppercase font-bold text-amber-600/70">ETA</p><p className="font-bold text-amber-700">{activeTask.estTime}</p></div>
                      </div>
                      <div className="flex-1 bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center gap-3">
                        <MapIcon size={20} className="text-slate-500"/>
                        <div><p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Distance</p><p className="font-bold text-slate-800">{activeTask.distanceToPickup}</p></div>
                      </div>
                    </div>

                    {/* Routing Info */}
                    <div className="relative pl-6">
                      <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-slate-200"></div>
                      
                      {/* Pickup */}
                      <div className="relative mb-6">
                        <div className={`absolute -left-[29px] top-1 w-3 h-3 rounded-full border-2 border-white ${(taskStatus === 'heading_pickup' || taskStatus === 'arrived_pickup' || taskStatus === 'loading') ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-emerald-500'}`}></div>
                        <h3 className="font-bold text-slate-900">Pickup: {activeTask.pickup.company}</h3>
                        <p className="text-sm text-slate-500 mt-1">{activeTask.pickup.address}</p>
                        <div className="mt-3 flex items-center gap-3">
                          <button className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1.5 rounded flex items-center gap-2 text-xs font-bold hover:bg-emerald-100 transition-colors"><Phone size={14}/> Call {activeTask.pickup.contact}</button>
                        </div>
                      </div>

                      {/* Dropoff */}
                      <div className={`relative ${taskStatus !== 'in_transit' ? 'opacity-50' : ''}`}>
                        <div className={`absolute -left-[29px] top-1 w-3 h-3 rounded-full border-2 border-white ${taskStatus === 'in_transit' ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-300'}`}></div>
                        <h3 className="font-bold text-slate-900">Dropoff: {activeTask.dropoff.company}</h3>
                        <p className="text-sm text-slate-500 mt-1">{activeTask.dropoff.address}</p>
                      </div>
                    </div>

                    {/* Cargo Manifest */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                       <div className="flex justify-between items-center mb-3">
                         <h4 className="font-bold text-slate-800 flex items-center gap-2"><Box size={16} className="text-blue-600"/> Cargo Manifest</h4>
                         <span className="text-xs font-bold bg-white border border-slate-200 px-2 py-1 rounded text-slate-600">Total: {activeTask.totalWeight}</span>
                       </div>
                       <div className="space-y-2">
                         {activeTask.cargo.map((item, idx) => (
                           <div key={idx} className="flex justify-between items-center bg-white border border-slate-200 p-2.5 rounded-lg text-sm">
                             <div><p className="font-bold text-slate-800">{item.item}</p><p className="text-xs text-slate-500">Dims: {item.dims}</p></div>
                             <div className="text-right"><p className="font-bold text-blue-600">{item.qty}</p><p className="text-xs text-slate-500 font-medium">{item.weight}</p></div>
                           </div>
                         ))}
                       </div>
                    </div>

                  </div>

                  {/* Web Embedded Map & Action Column */}
                  <div className="flex flex-col gap-4">
                    <div className="flex-1 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden min-h-[300px] relative z-0">
                      <MapContainer bounds={[activeTask.currentLocation, taskStatus === 'in_transit' ? activeTask.dropoff.coords : activeTask.pickup.coords]} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                        <Marker position={activeTask.currentLocation}><Popup>Current Location</Popup></Marker>
                        <Marker position={taskStatus === 'in_transit' ? activeTask.dropoff.coords : activeTask.pickup.coords}><Popup>Destination</Popup></Marker>
                        <Polyline positions={[activeTask.currentLocation, taskStatus === 'in_transit' ? activeTask.dropoff.coords : activeTask.pickup.coords]} color="#2563EB" weight={5} opacity={0.7}/>
                      </MapContainer>
                    </div>

                    <div className="pt-2">
                      {taskStatus === 'heading_pickup' && (
                        <button onClick={handleNextAction} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                          <MapPin size={18}/> I Have Arrived at Pickup
                        </button>
                      )}
                      
                      {taskStatus === 'arrived_pickup' && (
                        <button onClick={handleNextAction} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all">
                          Begin Loading Cargo
                        </button>
                      )}

                      {taskStatus === 'loading' && (
                        <button onClick={handleNextAction} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                          <CheckCircle size={18}/> Items Loaded • Start Trip
                        </button>
                      )}

                      {taskStatus === 'in_transit' && (
                        <button onClick={handleNextAction} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                          <CheckCircle size={18}/> Mark as Delivered
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="bg-white border border-emerald-200 rounded-xl p-12 text-center shadow-sm flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} className="text-emerald-600"/>
                </div>
                <h3 className="text-3xl font-black text-slate-800 mb-2">Trip Completed!</h3>
                <p className="text-slate-500 mb-8 text-lg">Great job. <span className="font-bold text-emerald-600">₹3,450</span> has been credited to your account.</p>
                <button onClick={() => setTaskStatus('heading_pickup')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-md transition-all">
                  Refresh Map
                </button>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: OPEN LOAD BOARD (Takes up 1/3 of screen) */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-140px)] min-h-[600px]">
              
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center gap-2"><MapPin size={18} className="text-blue-600"/> Open Load Board</h3>
                <button className="text-slate-400 hover:text-blue-600 transition-colors"><Filter size={18}/></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                {availableLoads.map((load, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-blue-400 transition-all hover:shadow-md cursor-pointer group">
                    <div className="flex justify-between items-start mb-3 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">{load.id}</span>
                          {load.tags.map(tag => <span key={tag} className="text-[9px] bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded uppercase font-bold">{tag}</span>)}
                        </div>
                        <p className="font-bold text-slate-800 text-sm flex items-center gap-2">
                          {load.from} <ArrowRight size={14} className="text-slate-400"/> {load.to}
                        </p>
                      </div>
                      <p className="font-black text-emerald-600 text-lg">{load.rate}</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-4 text-center divide-x divide-slate-100 border border-slate-100 rounded-lg p-2 bg-slate-50">
                      <div><p className="text-[10px] text-slate-400 font-bold uppercase">Dist</p><p className="text-xs font-bold text-slate-700">{load.dist}</p></div>
                      <div><p className="text-[10px] text-slate-400 font-bold uppercase">Weight</p><p className="text-xs font-bold text-slate-700">{load.weight}</p></div>
                      <div><p className="text-[10px] text-slate-400 font-bold uppercase">Time</p><p className="text-xs font-bold text-slate-700">{load.estTime}</p></div>
                    </div>

                    <button onClick={() => alert(`Accepted Load ${load.id}`)} className="w-full bg-slate-100 text-blue-600 font-bold py-2 rounded-lg text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      Review & Accept
                    </button>
                  </div>
                ))}
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DriverHome;