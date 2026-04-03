import React, { useState } from 'react';
import { 
  MoreVertical, Phone, Star, Truck, UserCheck, 
  AlertCircle, ShieldCheck, ClipboardList, MapPin, 
  ChevronRight, ArrowRight, Package 
} from 'lucide-react';
import './AdminDrivers.css';

const AdminDrivers = () => {
  const [drivers] = useState([
    { 
      name: 'Rajesh Kumar', id: 'DRV-102', status: 'Available', 
      rating: 4.8, trips: 142, vehicle: 'Tata Ace', phone: '+91 98765 43210',
      compliance: 'Verified', completionRate: '98%', lastTrip: '2 hours ago'
    },
    { 
      name: 'Vinod Singh', id: 'DRV-441', status: 'On Trip', 
      rating: 4.5, trips: 89, vehicle: 'Eicher Pro', phone: '+91 88776 55443',
      compliance: 'Pending Doc', completionRate: '92%', lastTrip: 'Active'
    },
    { 
      name: 'Amit Patel', id: 'DRV-098', status: 'Inactive', 
      rating: 4.2, trips: 215, vehicle: 'Mahindra Blazo', phone: '+91 77665 44332',
      compliance: 'Verified', completionRate: '95%', lastTrip: '3 days ago'
    },
  ]);

  const [pendingLoads] = useState([
    { id: 'L-9920', route: 'Pune ➔ Delhi', type: 'Fragile', wt: '800kg' },
    { id: 'L-9921', route: 'Mumbai ➔ Surat', type: 'Heavy', wt: '2.5 Ton' },
  ]);

  return (
    <div className="fleet-container animate-in fade-in duration-500">
      
      {/* 1. Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Fleet Command</h2>
          <p className="text-slate-500 text-sm">Real-time driver performance and assignment control</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-95">
          + Onboard New Driver
        </button>
      </div>

      {/* 2. Top Fleet Analytics Row */}
      <div className="fleet-stats-grid">
        <FleetStat label="Total Drivers" val="24" icon={<UsersIcon />} color="text-slate-600" />
        <FleetStat label="Active On Road" val="18" icon={<Truck size={20}/>} color="text-blue-600" />
        <FleetStat label="Avg Fleet Rating" val="4.6" icon={<Star size={20}/>} color="text-amber-500" />
        <FleetStat label="License Alerts" val="2" icon={<AlertCircle size={20}/>} color="text-rose-500" />
      </div>

      <div className="fleet-main-layout">
        
        {/* 3. Main Drivers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {drivers.map((driver, i) => (
            <div key={i} className="driver-card-rich group">
              {/* Compliance Badge */}
              <div className={`compliance-tag ${driver.compliance === 'Verified' ? 'compliance-ok' : 'compliance-warn'}`}>
                {driver.compliance}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-md text-blue-600 font-black text-lg">
                  {driver.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 leading-none">{driver.name}</h4>
                  <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">{driver.id}</p>
                </div>
              </div>

              {/* Delivery History Statistics */}
              <div className="delivery-mini-stats">
                <div className="mini-stat-item">
                  <span className="mini-stat-label">Trips</span>
                  <span className="mini-stat-val">{driver.trips}</span>
                </div>
                <div className="mini-stat-item border-x border-slate-200 px-4">
                  <span className="mini-stat-label">Success</span>
                  <span className="mini-stat-val">{driver.completionRate}</span>
                </div>
                <div className="mini-stat-item">
                  <span className="mini-stat-label">Last Active</span>
                  <span className="mini-stat-val">{driver.lastTrip}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2 text-slate-500 font-medium"><Truck size={14}/> {driver.vehicle}</div>
                   <div className={`font-bold ${driver.status === 'Available' ? 'text-emerald-600' : 'text-blue-600'}`}>{driver.status}</div>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium"><Phone size={14}/> {driver.phone}</div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-black transition-colors">Performance Detail</button>
                <button className="px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"><MoreVertical size={16}/></button>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Assignment Sidebar (Feature Upgrade) */}
        <div className="assignment-sidebar shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
              <ClipboardList size={18} className="text-blue-600"/> Assign Shipments
            </h3>
            <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-full">
              {pendingLoads.length} Pending
            </span>
          </div>

          <div className="space-y-4">
            {pendingLoads.map((load, i) => (
              <div key={i} className="load-item">
                <div className="flex justify-between items-start mb-2">
                   <span className="text-[10px] font-black text-slate-400">ID: {load.id}</span>
                   <span className="bg-white border border-slate-200 text-[9px] font-bold px-2 py-0.5 rounded uppercase">{load.type}</span>
                </div>
                <p className="text-xs font-bold text-slate-800 mb-1">{load.route}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                  <Package size={10}/> Weight: {load.wt}
                </div>
                <button className="assign-btn-sm hover:bg-blue-700 transition-colors shadow-sm">
                  Assign Driver ➔
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
             <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
               Drivers marked as <span className="font-bold">Available</span> are ready for immediate dispatch.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper Components
const FleetStat = ({ label, val, icon, color }) => (
  <div className="fleet-stat-card">
    <div>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      <div className={`text-2xl font-black mt-1 ${color}`}>{val}</div>
    </div>
    <div className="bg-slate-50 p-2.5 rounded-lg text-slate-400 border border-slate-100">
      {icon}
    </div>
  </div>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

export default AdminDrivers;