import React, { useState } from 'react';
import { 
  Truck, Search, Download, Eye, MessageSquare, Plus, 
  Filter, ChevronRight, FileCheck, AlertCircle, MoreVertical,
  Package, User, Calendar, IndianRupee, MapPin
} from 'lucide-react';
import './AdminShipments.css';

const AdminShipments = () => {
  const [activeTab, setActiveTab] = useState('All');

  const shipments = [
    { 
        id: 'AWB-8801', 
        customer: 'Samsung Electronics',
        pickup: 'Pune Hub', 
        destination: 'Delhi Terminal', 
        status: 'In Transit', 
        driver: 'Rajesh Kumar', 
        vehicle: 'MH12-CD-4567', 
        load: 'Electronics',
        weight: '1.2 Tons',
        value: '₹14.2L',
        eta: 'Tomorrow, 10:00 AM'
    },
    { 
        id: 'AWB-8802', 
        customer: 'Amazon India',
        pickup: 'Mumbai WH-4', 
        destination: 'Jaipur Sort Center', 
        status: 'Assigned', 
        driver: 'Sanjay Singh', 
        vehicle: 'RJ14-AB-1234', 
        load: 'General Parcel',
        weight: '850 Kg',
        value: '₹4.5L',
        eta: 'Today, 06:00 PM'
    },
    { 
        id: 'AWB-8803', 
        customer: 'Tata Motors',
        pickup: 'Chennai Plant', 
        destination: 'Bangalore Hub', 
        status: 'Pending', 
        driver: 'Vinod Singh', 
        vehicle: 'TN10-EE-8901', 
        load: 'Spare Parts',
        weight: '2.4 Tons',
        value: '₹22.0L',
        eta: 'Pending Dispatch'
    },
    { 
        id: 'AWB-8804', 
        customer: 'Reliance Retail',
        pickup: 'Surat DC', 
        destination: 'Mumbai Mall', 
        status: 'Completed', 
        driver: 'Amit Patel', 
        vehicle: 'GJ03-LM-2345', 
        load: 'Apparel',
        weight: '600 Kg',
        value: '₹12.8L',
        eta: 'Delivered'
    },
  ];

  return (
    <div className="admin-shipments-container">
      {/* 1. STICKY HEADER */}
      <header className="admin-header">
        <div className="header-content">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" /> Live Logistics Control
            </div>
            <h1 className="text-2xl font-black text-slate-900">Shipment Management</h1>
          </div>
          <div className="flex gap-3">
            <button className="btn-icon bg-white px-4 py-2 flex items-center gap-2 text-sm font-bold">
                <Download size={16}/> Export Ledger
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all">
                <Plus size={18}/> New Dispatch
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-8">
        
        {/* 2. KPI SUMMARY */}
        <div className="metrics-grid">
          <MetricItem label="Active Dispatch" count="24" icon={<Truck size={20}/>} />
          <MetricItem label="Fleet On-Road" count="18" icon={<MapPin size={20}/>} />
          <MetricItem label="Pending Docs" count="3" icon={<AlertCircle size={20}/>} highlight="text-amber-500" />
          <MetricItem label="Revenue (MTD)" count="₹84.2L" icon={<IndianRupee size={20}/>} highlight="text-emerald-600" />
        </div>

        {/* 3. SEARCH & FILTERS */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {['All', 'Assigned', 'In Transit', 'Completed'].map(t => (
              <button 
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-5 py-2 text-xs font-bold uppercase rounded-md transition-all ${activeTab === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {t}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input type="text" placeholder="Search by Waybill, Driver, or Customer..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-96 outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <button className="btn-icon"><Filter size={18}/></button>
          </div>
        </div>

        {/* 4. SHIPMENT LEDGER TABLE */}
        <div className="shipment-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th><input type="checkbox" className="rounded border-slate-300" /></th>
                <th>Shipment & Customer</th>
                <th>Route Details</th>
                <th>Status</th>
                <th>Load Information</th>
                <th>Fleet Personnel</th>
                <th className="text-right">Manage</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s, i) => (
                <tr key={i}>
                  <td><input type="checkbox" className="rounded border-slate-300" /></td>
                  <td>
                    <div className="route-cluster">
                      <span className="text-bold text-indigo-600 font-mono tracking-tighter">{s.id}</span>
                      <span className="text-dim flex items-center gap-1 font-bold"><User size={10}/> {s.customer}</span>
                    </div>
                  </td>
                  <td>
                    <div className="route-cluster">
                      <div className="flex items-center gap-2 text-bold">
                        <span>{s.pickup}</span>
                        <ChevronRight size={14} className="text-slate-300" />
                        <span>{s.destination}</span>
                      </div>
                      <span className="text-dim flex items-center gap-1 font-medium italic text-blue-500 underline"><Calendar size={10}/> ETA: {s.eta}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-pill status-${s.status.toLowerCase().replace(' ', '-')}`}>
                      {s.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div className="load-cluster">
                      <span className="text-bold flex items-center gap-1"><Package size={14} className="text-slate-400"/> {s.load}</span>
                      <div className="flex gap-3 text-dim">
                        <span>{s.weight}</span>
                        <span className="text-money font-black">{s.value}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="route-cluster">
                      <span className="text-bold">{s.driver}</span>
                      <span className="text-dim font-mono">{s.vehicle}</span>
                    </div>
                  </td>
                  <td>
                    <div className="action-stack">
                      <button className="btn-icon" title="Full Analytics"><Eye size={16}/></button>
                      <button className="btn-icon" title="Live Comms"><MessageSquare size={16}/></button>
                      <button className="btn-icon"><MoreVertical size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

// Reusable Helper Component
const MetricItem = ({ label, count, highlight = "text-slate-800", icon }) => (
  <div className="metric-card">
    <div className="flex justify-between items-start">
        <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className={`text-2xl font-black ${highlight}`}>{count}</p>
        </div>
        <div className="text-slate-200">{icon}</div>
    </div>
  </div>
);

export default AdminShipments;