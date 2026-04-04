import React from 'react';
import { 
  PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { 
  Truck, CheckCircle, Clock, IndianRupee, 
  LogOut, Users, Zap, MoreHorizontal, Navigation
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip as MapTooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './AdminDashboard.scss';

// Custom Marker Creator
const createIcon = (status) => L.divIcon({
  className: `custom-marker ${status}`,
  html: `<div class="marker-pin"></div>`,
  iconSize: [20, 20]
});

const AdminDashboard = () => {
  // Stats Data
  const donutData = [{ name: 'Completed', value: 60, color: '#34A853' }, { name: 'In Transit', value: 30, color: '#4285F4' }, { name: 'Pending', value: 10, color: '#FBBC05' }];
  const monthlyData = [{ month: 'Jan', count: 18 }, { month: 'Feb', count: 25 }, { month: 'Mar', count: 20 }, { month: 'Apr', count: 32 }, { month: 'May', count: 22 }, { month: 'Jun', count: 30 }];

  // NEW: Advanced Tracking Data (India Wide)
  const activeRoutes = [
    { id: 'T-901', status: 'active', path: [[19.076, 72.877], [22.719, 75.857], [28.613, 77.209]], current: [22.719, 75.857], label: 'Mumbai-Delhi' },
    { id: 'T-442', status: 'active', path: [[12.971, 77.594], [13.082, 80.270]], current: [13.015, 79.132], label: 'BLR-Chennai' },
    { id: 'T-112', status: 'active', path: [[22.572, 88.363], [17.385, 78.486]], current: [20.296, 85.824], label: 'Kolkata-Hyd' }
  ];

  const pendingHubs = [
    { id: 'HUB-PN', status: 'pending', pos: [18.520, 73.856], label: 'Pune Hub: 4 Loads' },
    { id: 'HUB-NG', status: 'pending', pos: [21.145, 79.088], label: 'Nagpur Hub: 2 Loads' }
  ];

  const teamMembers = [
    { name: 'Rajesh Kumar', task: 'AWB-1253', status: 'Moving', speed: '45 km/h', score: '9.8', initial: 'RK' },
    { name: 'Vinod Singh', task: 'AWB-1257', status: 'Loading', speed: '0 km/h', score: '8.5', initial: 'VS' },
    { name: 'Sanjay Singh', task: 'AWB-1259', status: 'Moving', speed: '62 km/h', score: '9.2', initial: 'SS' },
  ];

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Fleet Control Center</h1>
          <p>Real-time India Logistics Operations</p>
        </div>
        <button className="flex items-center gap-2 border border-red-200 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-sm">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="stats-grid">
        <StatCard title="Active Shipments" value="24" icon={<Truck size={28}/>} bgColor="bg-[#4285F4]" darkBg="bg-[#3367D6]" />
        <StatCard title="Completed Deliveries" value="120" icon={<CheckCircle size={28}/>} bgColor="bg-[#34A853]" darkBg="bg-[#2B8A44]" />
        <StatCard title="Pending Loads" value="8" icon={<Clock size={28}/>} bgColor="bg-[#FBBC05]" darkBg="bg-[#E0A800]" />
        <StatCard title="Total Revenue" value="₹12,50,000" icon={<IndianRupee size={28}/>} bgColor="bg-[#EA4335]" darkBg="bg-[#C53929]" />
      </div>

      <div className="main-content-layout">
        <div className="space-y-6">
          {/* LIVE TRACKER - ENHANCED */}
          <div className="card live-tracking-wrapper">
            <div className="card-header">
              <h3 className="flex items-center gap-2"><Navigation size={18} className="text-blue-600 fill-blue-100"/> India Live Network</h3>
              <div className="flex gap-4">
                <span className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 uppercase"><div className="w-2 h-2 rounded-full bg-blue-600 pulse-lite"/> {activeRoutes.length} Active</span>
                <span className="flex items-center gap-1.5 text-[10px] font-black text-amber-500 uppercase"><div className="w-2 h-2 rounded-sm bg-amber-500"/> {pendingHubs.length} Pending Hubs</span>
              </div>
            </div>
            <div className="h-[400px] relative z-0">
              <MapContainer center={[22.0, 78.96]} zoom={5} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                
                {/* Render Active Routes and Moving Markers */}
                {activeRoutes.map(route => (
                  <React.Fragment key={route.id}>
                    <Polyline positions={route.path} color="#4285F4" weight={2} opacity={0.3} dashArray="5, 10" />
                    <Marker position={route.current} icon={createIcon('active')}>
                      <MapTooltip permanent direction="top" className="map-tooltip">{route.id}: {route.label}</MapTooltip>
                    </Marker>
                  </React.Fragment>
                ))}

                {/* Render Pending Hubs */}
                {pendingHubs.map(hub => (
                  <Marker key={hub.id} position={hub.pos} icon={createIcon('pending')}>
                    <MapTooltip direction="bottom" className="map-tooltip">{hub.label}</MapTooltip>
                  </Marker>
                ))}
              </MapContainer>
              <div className="eta-badge shadow-xl bg-slate-900 border border-slate-700">
                <Zap size={14} className="text-amber-400 fill-amber-400"/> System Load: Normal
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h3>Recent Activity</h3><button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={18}/></button></div>
            <table className="w-full text-sm text-left">
               <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                 <tr><th className="p-4">ID</th><th className="p-4">Pickup</th><th className="p-4">Destination</th><th className="p-4">Status</th></tr>
               </thead>
               <tbody className="divide-y divide-slate-100 text-slate-600">
                 {['#1253', '#1257', '#1256'].map((id, i) => (
                   <tr key={id} className="hover:bg-slate-50 transition-colors">
                     <td className="p-4 font-bold text-slate-800">{id}</td>
                     <td className="p-4">Pune</td><td className="p-4">Delhi</td>
                     <td className="p-4"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${i === 2 ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-700'}`}>{i === 2 ? 'PENDING' : 'ACTIVE'}</span></td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>

          <div className="card">
            <div className="card-header"><h3 className="flex items-center gap-2"><Users size={18} className="text-blue-600"/> Live Team Status</h3></div>
            <div className="card-body team-list">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="member-item">
                  <div className="member-info"><div className="avatar">{member.initial}</div><div className="details"><h4>{member.name}</h4><p>{member.status} • {member.speed}</p></div></div>
                  <div className="task-badge">{member.task}</div>
                  <div className="performance"><div className="score">{member.score}</div><div className="label">Score</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <div className="card">
            <div className="card-header"><h3>Status Distribution</h3></div>
            <div className="card-body">
              <div className="h-[180px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={donutData} innerRadius={50} outerRadius={75} dataKey="value" stroke="none">{donutData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
              <div className="mt-4 space-y-2">
                {donutData.map(d => (
                  <div key={d.name} className="flex justify-between items-center text-xs"><span className="flex items-center gap-2 font-medium"><div className="w-3 h-3 rounded-sm" style={{backgroundColor: d.color}}></div>{d.name}</span><span className="font-bold text-slate-800">{d.value}%</span></div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h3>Monthly Throughput</h3></div>
            <div className="card-body">
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs><linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4285F4" stopOpacity={0.3}/><stop offset="95%" stopColor="#4285F4" stopOpacity={0}/></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10}} dy={10} /><YAxis hide /><Tooltip /><Area type="monotone" dataKey="count" stroke="#4285F4" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h3>Fleet Overview</h3></div>
            <div className="card-body space-y-4">
              <StatusProgress label="Available" val="12" total="20" color="bg-[#34A853]" />
              <StatusProgress label="On Trip" val="8" total="20" color="bg-[#4285F4]" />
              <StatusProgress label="Inactive" val="2" total="20" color="bg-[#FBBC05]" />
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h3>Account Summary</h3></div>
            <div className="card-body financial-grid">
              <div className="fin-item"><label>Receivable</label><div className="val text-orange-600">₹1,80,000</div></div>
              <div className="fin-item"><label>Settled</label><div className="val text-emerald-600">₹10,70,000</div></div>
              <button className="btn-view-all">Download Audit Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, bgColor, darkBg }) => (
  <div className={`${bgColor} rounded-xl shadow-md flex overflow-hidden text-white h-24 transition-transform hover:translate-y-[-4px]`}>
    <div className={`${darkBg} w-20 flex items-center justify-center shrink-0`}>{icon}</div>
    <div className="p-4 flex flex-col justify-center">
      <p className="text-[10px] font-bold uppercase tracking-wider opacity-80 leading-none mb-2">{title}</p>
      <p className="text-2xl font-black tracking-tight">{value}</p>
    </div>
  </div>
);

const StatusProgress = ({ label, val, total, color }) => (
  <div>
    <div className="flex justify-between text-xs font-bold mb-1"><span className="text-slate-500">{label}</span><span className="text-slate-800">{val}</span></div>
    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${(val/total)*100}%` }}></div></div>
  </div>
);

export default AdminDashboard;