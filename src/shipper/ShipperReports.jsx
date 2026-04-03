import React, { useState } from 'react';
import { Download, FileText, Calendar, Filter, FileSpreadsheet, TrendingUp, IndianRupee, Clock, CheckCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import './ShipperReports.css';

const ShipperReports = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Chart Data: Freight Spend over 6 months
  const spendData = [
    { month: 'May', spend: 210000 }, { month: 'Jun', spend: 250000 },
    { month: 'Jul', spend: 230000 }, { month: 'Aug', spend: 280000 },
    { month: 'Sep', spend: 260000 }, { month: 'Oct', spend: 310000 },
  ];

  // Chart Data: On-Time Delivery Rate
  const performanceData = [
    { month: 'May', rate: 92 }, { month: 'Jun', rate: 94 },
    { month: 'Jul', rate: 89 }, { month: 'Aug', rate: 95 },
    { month: 'Sep', rate: 97 }, { month: 'Oct', rate: 98 },
  ];

  // Expanded Realistic Reports Library
  const availableReports = [
    { id: 1, name: 'Oct 2024 Freight Expense', date: 'Oct 31, 2024', category: 'financial', format: 'excel', size: '1.2 MB' },
    { id: 2, name: 'Q3 Tax & GST Consolidated', date: 'Oct 15, 2024', category: 'compliance', format: 'pdf', size: '3.4 MB' },
    { id: 3, name: 'Fleet On-Time Performance', date: 'Oct 01, 2024', category: 'operational', format: 'pdf', size: '850 KB' },
    { id: 4, name: 'Sep 2024 Carrier Settlements', date: 'Sep 30, 2024', category: 'financial', format: 'excel', size: '2.1 MB' },
    { id: 5, name: 'Active e-Way Bills Register', date: 'Ongoing', category: 'compliance', format: 'excel', size: '500 KB' },
    { id: 6, name: 'Damaged/Rejected Goods Log', date: 'Sep 15, 2024', category: 'operational', format: 'pdf', size: '1.1 MB' },
  ];

  const filteredReports = activeTab === 'all' ? availableReports : availableReports.filter(r => r.category === activeTab);

  return (
    <div className="reports-wrapper">
      
      {/* Header */}
      <div className="reports-header">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
          <p className="text-sm text-gray-500">Monitor logistical performance and download official records.</p>
        </div>
        <button className="bg-[#3b5998] hover:bg-[#2d4373] text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
          <Filter size={16} /> Advanced Filters
        </button>
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="kpi-card">
          <h3 className="kpi-title"><IndianRupee size={16} className="text-emerald-500"/> YTD Freight Spend</h3>
          <p className="kpi-value">₹15,40,000</p>
          <p className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-auto">
            <TrendingUp size={12}/> +8.4% from last year
          </p>
        </div>
        <div className="kpi-card">
          <h3 className="kpi-title"><CheckCircle size={16} className="text-blue-500"/> Avg Delivery Success Rate</h3>
          <p className="kpi-value">95.8%</p>
          <p className="text-xs text-blue-600 font-bold flex items-center gap-1 mt-auto">
            Top Carrier: BlueDart Logistics
          </p>
        </div>
        <div className="kpi-card">
          <h3 className="kpi-title"><Clock size={16} className="text-amber-500"/> Avg Transit Time</h3>
          <p className="kpi-value">2.4 Days</p>
          <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-auto">
            Across 142 total shipments
          </p>
        </div>
      </div>

      {/* MIDDLE SECTION: CHARTS & GENERATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Left: Spend Chart */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm lg:col-span-1">
          <h3 className="font-bold text-gray-800 text-sm mb-4">Monthly Freight Spend (₹)</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={(val) => `₹${val/1000}k`} />
                <RechartsTooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="spend" fill="#3b5998" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Middle: Performance Chart */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm lg:col-span-1">
          <h3 className="font-bold text-gray-800 text-sm mb-4">On-Time Delivery Rate (%)</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[80, 100]} />
                <RechartsTooltip />
                <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Custom Report Generator */}
        <div className="generator-box lg:col-span-1 flex flex-col">
          <h3 className="font-bold text-gray-900 mb-1">Generate Custom Report</h3>
          <p className="text-xs text-gray-500 mb-4">Export specific data for your records or auditing.</p>
          
          <div className="space-y-3 flex-1">
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase">Data Module</label>
              <select className="generator-input mt-1">
                <option>Freight Settlements (Invoices)</option>
                <option>e-Way Bill Register</option>
                <option>Shipment Tracking Logs</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase">From</label>
                <input type="date" className="generator-input mt-1" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase">To</label>
                <input type="date" className="generator-input mt-1" />
              </div>
            </div>
          </div>
          
          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-lg mt-4 transition-colors flex justify-center items-center gap-2">
            <Download size={16}/> Export as CSV
          </button>
        </div>

      </div>

      {/* BOTTOM SECTION: REPORT LIBRARY */}
      <div>
        <h3 className="font-bold text-gray-900 text-lg mb-4">Document Library</h3>
        
        {/* Custom Tabs */}
        <div className="report-tabs-container">
          <button className={`report-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All Documents</button>
          <button className={`report-tab ${activeTab === 'financial' ? 'active' : ''}`} onClick={() => setActiveTab('financial')}>Financial & Billing</button>
          <button className={`report-tab ${activeTab === 'operational' ? 'active' : ''}`} onClick={() => setActiveTab('operational')}>Operational Logs</button>
          <button className={`report-tab ${activeTab === 'compliance' ? 'active' : ''}`} onClick={() => setActiveTab('compliance')}>Tax & Compliance</button>
        </div>

        {/* Report Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredReports.map((report) => (
            <div key={report.id} className="report-file-card">
              <div className="flex items-start gap-3">
                <div className={`report-icon-wrapper ${report.format}`}>
                  {report.format === 'pdf' ? <FileText size={20} /> : <FileSpreadsheet size={20} />}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm leading-tight line-clamp-2" title={report.name}>{report.name}</h4>
                  <p className="text-xs text-gray-400 mt-1 font-medium">{report.date}</p>
                </div>
              </div>
              
              <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-100">
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">{report.size}</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{report.format}</span>
              </div>
              
              <button className="btn-download-sm mt-1">
                <Download size={14} /> Download File
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ShipperReports;