import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Truck, CheckCircle, Clock, Navigation, MoreHorizontal, PlusCircle, Package, Weight } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ShipperDashboard.css';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Green Icon for Available Trucks
const availableIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

// Geographical boundaries of India [SouthWest, NorthEast]
const indiaBounds = [
  [6.5, 68.1], // SW
  [35.5, 97.4] // NE
];

const ShipperDashboard = ({ onAssignTruck }) => {
  const activeShipments = [
    { id: '#1260', pickup: 'Pune', destination: 'Delhi', status: 'In Transit', driver: 'Rajesh Kumar', pos: [18.5204, 73.8567], progress: 65, color: '#3B82F6' },
    { id: '#1259', pickup: 'Mumbai', destination: 'Jaipur', status: 'In Transit', driver: 'Sanjay Singh', pos: [19.0760, 72.8777], progress: 40, color: '#F59E0B' },
  ];

  // UPGRADED: Added distance to available trucks to make the sidebar more realistic
  const availableTrucks = [
    { id: 'TRK-9901', type: '14ft Closed Body', maxCapacityKg: 4000, ratePerKg: 12.50, driver: 'Arun V.', pos: [12.9716, 77.5946], city: 'Bangalore', distance: '12 km away' },
    { id: 'TRK-4421', type: 'Eicher Pro', maxCapacityKg: 7000, ratePerKg: 9.80, driver: 'Manoj K.', pos: [13.0827, 80.2707], city: 'Chennai', distance: '45 km away' },
    { id: 'TRK-8812', type: 'Tata Ace', maxCapacityKg: 1500, ratePerKg: 15.00, driver: 'Suresh R.', pos: [28.6139, 77.2090], city: 'Delhi', distance: '8 km away' },
  ];

  const donutData = [
    { name: 'Completed', value: 60, color: '#10B981' },
    { name: 'In Transit', value: 30, color: '#3B82F6' },
    { name: 'Available', value: 10, color: '#22C55E' },
  ];

  const weeklyVolume = [
    { day: 'Mon', tons: 45 }, { day: 'Tue', tons: 52 }, { day: 'Wed', tons: 38 },
    { day: 'Thu', tons: 65 }, { day: 'Fri', tons: 48 }, { day: 'Sat', tons: 25 },
  ];

  const handleAssignClick = (truck) => {
    if (onAssignTruck) {
      onAssignTruck(truck);
    }
  };

  // Custom Tooltip for the Bar Chart
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
          <p className="text-xs font-bold text-slate-500 mb-1">{label}</p>
          <p className="text-indigo-600 font-black text-lg">{payload[0].value} <span className="text-xs text-slate-500">Tons</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        
        {/* Header Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active Fleet" value="24" icon={<Truck />} color="bg-blue-600" />
          <StatCard title="Available Trucks" value="12" icon={<PlusCircle />} color="bg-emerald-500" />
          <StatCard title="Pending Loads" value="8" icon={<Clock />} color="bg-amber-500" />
          <StatCard title="Total Volume" value="273T" icon={<Package />} color="bg-indigo-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LIVE TRACKING MAP */}
          <div className="lg:col-span-2 map-panel">
            <div className="panel-header">
              <div>
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live India Network
                </h3>
                <p className="text-xs text-slate-500">Assign loads to available trucks in your area</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-tighter">
                <div className="flex items-center gap-1.5 text-blue-600"><div className="w-2 h-2 rounded-full bg-blue-500"></div> In Transit</div>
                <div className="flex items-center gap-1.5 text-emerald-600"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Available</div>
              </div>
            </div>

            <div className="map-container-custom">
              <MapContainer 
                center={[22.5937, 78.9629]} 
                zoom={4} 
                minZoom={4}
                maxBounds={indiaBounds}
                maxBoundsViscosity={1.0}
                style={{ height: '100%', width: '100%', backgroundColor: '#e2e8f0' }}
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                
                {/* Active Trucks (Blue) */}
                {activeShipments.map((ship) => (
                  <Marker key={ship.id} position={ship.pos}>
                    <Popup>
                      <div className="text-xs font-sans p-1">
                        <p className="font-bold text-blue-600">{ship.id} - In Transit</p>
                        <p className="text-slate-500">Moving {ship.pickup} to {ship.destination}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* AVAILABLE TRUCKS (Green) */}
                {availableTrucks.map((truck) => (
                  <Marker key={truck.id} position={truck.pos} icon={availableIcon}>
                    <Popup>
                      <div className="text-xs font-sans p-1 w-48">
                        <div className="flex justify-between items-center mb-2">
                           <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase text-[9px]">Available</span>
                           <span className="font-bold text-slate-700">{truck.id}</span>
                        </div>
                        <p className="font-medium text-slate-800">{truck.type}</p>
                        <p className="text-slate-500">Capacity: {truck.maxCapacityKg} kg</p>
                        
                        <button onClick={() => handleAssignClick(truck)} className="assign-btn">
                          <PlusCircle size={14}/> Add My Item
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              {/* UPGRADED: Floating Location Quick-List */}
              <div className="floating-quick-list" style={{ width: '280px' }}>
                <div className="flex justify-between items-end mb-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nearby Available</p>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md font-bold">3 Trucks</span>
                </div>
                
                <div className="space-y-3">
                   {availableTrucks.map(t => (
                     <div key={t.id} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0 group">
                       <div className="flex flex-col w-full pr-3">
                         <div className="flex justify-between items-start w-full">
                           <span className="text-xs font-bold text-slate-800">{t.city}</span>
                           <span className="text-[9px] font-semibold text-slate-400">{t.distance}</span>
                         </div>
                         <span className="text-[10px] text-slate-500 mb-1.5">{t.type}</span>
                         
                         {/* Visual Capacity Bar */}
                         <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden flex items-center">
                            {/* Empty truck means 0% used, so full green bar representing available space */}
                            <div className="bg-emerald-400 h-full rounded-full" style={{ width: '100%' }}></div>
                         </div>
                         <span className="text-[9px] text-emerald-600 font-bold mt-1">
                           <Weight size={10} className="inline mr-0.5"/> {t.maxCapacityKg} kg Space Available
                         </span>
                       </div>
                       
                       <button onClick={() => handleAssignClick(t)} className="p-2 text-white bg-emerald-500 hover:bg-emerald-600 shadow-sm shadow-emerald-200 rounded-lg transition-all" title="Assign Load">
                         <PlusCircle size={16}/>
                       </button>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>

          {/* SIDE ANALYTICS PANEL */}
          <div className="flex flex-col gap-6">
            
            {/* Composition Donut */}
            <div className="map-panel">
              <div className="panel-header border-b-0 pb-0">
                <h3 className="font-bold text-slate-800 text-sm">Fleet Utilization</h3>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-5">
                <div className="h-[160px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={donutData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                        {donutData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} stroke="none" />))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full space-y-2 mt-4">
                  {donutData.map((stat) => (
                    <div key={stat.name} className="flex justify-between items-center px-2">
                      <span className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }}></div>{stat.name}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{stat.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* UPGRADED: Weekly Volume Bar Chart */}
            <div className="map-panel flex-1">
              <div className="panel-header border-b-0 pb-0 flex justify-between items-end">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Weekly Tonnage</h3>
                  <p className="text-2xl font-black text-indigo-600 mt-0.5">273<span className="text-sm font-semibold text-slate-500">T</span></p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-md">
                  +12% vs last week
                </span>
              </div>
              
              <div className="flex-1 p-5 h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyVolume} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTons" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    
                    {/* Added YAxis to prevent it from looking empty */}
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                    
                    <RechartsTooltip content={<CustomBarTooltip />} cursor={{fill: '#f8fafc'}} />
                    <Bar dataKey="tons" fill="url(#colorTons)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>

        {/* RECENT LOGS TABLE */}
        <div className="map-panel">
          <div className="panel-header">
            <h3 className="font-bold text-slate-800 text-sm">Fleet Activity Stream</h3>
            <button className="text-[#3b5998] text-xs font-bold hover:underline">Download Report</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Truck/Waybill</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Personnel</th>
                  <th className="px-6 py-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[...activeShipments, ...availableTrucks.slice(0,2)].map((s, idx) => (
                  <tr key={idx} className="table-row-hover transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-700">{s.id}</td>
                    <td className="px-6 py-4 text-slate-600">{s.city || `${s.pickup} → ${s.destination}`}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        s.status ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {s.status || 'Available'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{s.driver}</td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-slate-400 hover:text-[#3b5998] transition-colors"><MoreHorizontal size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

// Reusable Stat Card
const StatCard = ({ title, value, icon, color }) => (
  <div className="stat-card">
    <div className={`${color} stat-icon-wrapper`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
      <p className="text-2xl font-black text-slate-800">{value}</p>
    </div>
  </div>
);

export default ShipperDashboard;