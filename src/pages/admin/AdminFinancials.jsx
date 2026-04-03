import React from 'react';
import { 
  IndianRupee, TrendingUp, ArrowUpRight, ArrowDownRight, 
  FileText, Download, BarChart3, Clock, Wallet, ArrowRight,
  Filter, CheckCircle2, AlertCircle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import './AdminFinancials.css';

const AdminFinancials = () => {
  const chartData = [
    { name: 'Mon', rev: 4000, exp: 2400 },
    { name: 'Tue', rev: 3000, exp: 1398 },
    { name: 'Wed', rev: 2000, exp: 9800 },
    { name: 'Thu', rev: 2780, exp: 3908 },
    { name: 'Fri', rev: 1890, exp: 4800 },
    { name: 'Sat', rev: 2390, exp: 3800 },
    { name: 'Sun', rev: 3490, exp: 4300 },
  ];

  const transactions = [
    { id: 'TXN-9921', entity: 'Sharma Hub', type: 'Credit', amount: '₹14,200', status: 'Paid', date: '02 Apr 2026' },
    { id: 'TXN-9922', entity: 'Rajesh (Driver)', type: 'Debit', amount: '₹4,500', status: 'Pending', date: '03 Apr 2026' },
    { id: 'TXN-9923', entity: 'TechHub Retail', type: 'Credit', amount: '₹22,000', status: 'Paid', date: '03 Apr 2026' },
  ];

  return (
    <div className="financials-container animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div className="fin-header">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Financial Intelligence</h2>
          <p className="text-slate-500 text-sm">Tenant: LogisticHub Main Node • FY 2026-27</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-50">
            <Download size={16}/> Export Reports
          </button>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            Generate Invoice
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="kpi-row">
        <KpiCard label="Net Revenue" value="₹42,85,200" trend="+12.5%" isUp={true} />
        <KpiCard label="Carrier Payouts" value="₹28,10,000" trend="+4.2%" isUp={false} />
        <KpiCard label="Gross Profit" value="₹14,75,200" trend="+18.1%" isUp={true} />
        <KpiCard label="Tax Liability" value="₹2,54,000" trend="GST Collected" isUp={null} />
      </div>

      <div className="fin-main-grid">
        
        {/* Left Side: Growth & Ledger */}
        <div className="space-y-6">
          <div className="chart-card">
            <div className="card-title">
              <span>Revenue vs Expenditure</span>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-[10px] font-bold text-blue-500"><div className="w-2 h-2 bg-blue-500 rounded-full"/> Revenue</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-300"><div className="w-2 h-2 bg-slate-300 rounded-full"/> Expense</span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} />
                  <YAxis hide />
                  <Tooltip />
                  <Area type="monotone" dataKey="rev" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="exp" stroke="#cbd5e1" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="ledger-card">
            <div className="card-title">
              <span>Recent Financial Ledger</span>
              <button className="text-blue-600 text-xs font-bold hover:underline">View All Txn</button>
            </div>
            <table className="ledger-table">
              <thead>
                <tr>
                  <th>Ref ID</th>
                  <th>Entity</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={i}>
                    <td className="font-mono font-bold text-slate-400">{t.id}</td>
                    <td className="font-bold text-slate-700">{t.entity}</td>
                    <td className="text-slate-500">{t.date}</td>
                    <td>
                      <span className={`font-bold ${t.type === 'Credit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {t.type === 'Credit' ? 'IN' : 'OUT'}
                      </span>
                    </td>
                    <td className="font-black text-slate-800">{t.amount}</td>
                    <td>
                      <span className={`status-tag ${t.status === 'Paid' ? 'status-paid' : 'status-pending'}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Summaries */}
        <div className="space-y-6">
          <div className="summary-card bg-slate-900 text-white border-none shadow-xl">
             <h4 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">Account Balances</h4>
             <div className="space-y-4">
               <div>
                 <p className="text-slate-400 text-xs font-medium">Main Wallet</p>
                 <h3 className="text-3xl font-black">₹1,80,000</h3>
               </div>
               <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                 <div>
                   <p className="text-slate-400 text-[10px] font-bold uppercase">Pending Out</p>
                   <p className="text-rose-400 font-bold">₹24,500</p>
                 </div>
                 <div>
                   <p className="text-slate-400 text-[10px] font-bold uppercase">Expected In</p>
                   <p className="text-emerald-400 font-bold">₹88,000</p>
                 </div>
               </div>
               <button className="w-full mt-4 bg-blue-600 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-500">
                 <Wallet size={18}/> Withdrawal Request
               </button>
             </div>
          </div>

          <div className="summary-card">
            <h4 className="card-title text-sm uppercase text-slate-400 font-black">Tax (GST) Breakdown</h4>
            <div className="gst-list mt-4">
              <GstItem label="IGST (Inter-state)" value="₹1,24,000" />
              <GstItem label="CGST (Central)" value="₹65,000" />
              <GstItem label="SGST (State)" value="₹65,000" />
              <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                <AlertCircle size={20} className="text-amber-500 shrink-0"/>
                <p className="text-[11px] text-amber-700 leading-relaxed font-medium">
                  GST Filing for March is due in 12 days. Please ensure all invoices are verified.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper Components
const KpiCard = ({ label, value, trend, isUp }) => (
  <div className="kpi-card">
    <span className="kpi-label">{label}</span>
    <div className="kpi-value">{value}</div>
    {trend && (
      <div className={`kpi-trend ${isUp === null ? 'text-slate-400' : isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
        {isUp === true && <ArrowUpRight size={14}/>}
        {isUp === false && <ArrowDownRight size={14}/>}
        {trend}
      </div>
    )}
  </div>
);

const GstItem = ({ label, value }) => (
  <div className="gst-item">
    <span className="text-sm font-semibold text-slate-500">{label}</span>
    <span className="text-sm font-black text-slate-800">{value}</span>
  </div>
);

export default AdminFinancials;