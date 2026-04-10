import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, Download, PieChart, Wallet, 
  FileText, ArrowRight, Truck, MapPin, CheckCircle2, Clock,
  X, Receipt, Calendar, Activity, ChevronRight, AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const RevenueExpenses = () => {
  // MODAL STATE
  const [activeFinanceModal, setActiveFinanceModal] = useState(null); // 'revenue' | 'expenses' | 'profit' | null

  // CHART DATA
  const monthlyData = [
    { name: 'Week 1', revenue: 145000, expense: 85000 },
    { name: 'Week 2', revenue: 162000, expense: 92000 },
    { name: 'Week 3', revenue: 135000, expense: 78000 },
    { name: 'Week 4', revenue: 180000, expense: 98000 }
  ];

  // MOCK DATA FOR REVENUE BREAKDOWN
  const revenueByAsset = [
    { truck: 'TN-49-AZ-1024', type: '20ft Container', revenue: 185000, trips: 12, topRoute: 'Chennai - Bangalore' },
    { truck: 'TN-33-DD-4455', type: 'Box Truck', revenue: 154000, trips: 18, topRoute: 'Local Distribution' },
    { truck: 'TN-68-BB-9090', type: 'Refrigerated', revenue: 148000, trips: 8, topRoute: 'Salem - Coimbatore' },
    { truck: 'TN-45-XX-8821', type: 'Flatbed', revenue: 135000, trips: 6, topRoute: 'Trichy - Hosur' }
  ];

  // MOCK DATA FOR EXPENSE LEDGER
  const detailedExpenses = [
    { id: 'EXP-101', date: 'Oct 24', category: 'Fuel', desc: 'Reliance Pump NH-44', truck: 'TN-49-AZ-1024', amount: 14500, status: 'Paid' },
    { id: 'EXP-102', date: 'Oct 23', category: 'Maintenance', desc: 'Engine Oil & Filters', truck: 'TN-09-CC-1122', amount: 8500, status: 'Paid' },
    { id: 'EXP-103', date: 'Oct 22', category: 'Toll', desc: 'FASTag Recharge', truck: 'Fleet Wallet', amount: 10000, status: 'Paid' },
    { id: 'EXP-104', date: 'Oct 21', category: 'Driver Pay', desc: 'Trip Advance', truck: 'TN-33-DD-4455', amount: 5000, status: 'Paid' },
    { id: 'EXP-105', date: 'Oct 20', category: 'Fuel', desc: 'IOCL Highway Station', truck: 'TN-68-BB-9090', amount: 18200, status: 'Paid' },
  ];

  // TRIP LEDGER DATA
  const recentTrips = [
    { id: 'TRP-9921', date: 'Oct 24, 2026', truck: 'TN-49-AZ-1024', route: 'Chennai → Bangalore', revenue: 28500, expenses: 14200, status: 'Settled' },
    { id: 'TRP-9920', date: 'Oct 23, 2026', truck: 'TN-68-BB-9090', route: 'Madurai → Coimbatore', revenue: 18000, expenses: 8500, status: 'Pending' },
    { id: 'TRP-9919', date: 'Oct 21, 2026', truck: 'TN-45-XX-8821', route: 'Trichy → Hosur', revenue: 22400, expenses: 11000, status: 'Settled' },
    { id: 'TRP-9918', date: 'Oct 19, 2026', truck: 'TN-33-DD-4455', route: 'Chennai → Hyderabad', revenue: 45000, expenses: 24500, status: 'Settled' },
    { id: 'TRP-9917', date: 'Oct 18, 2026', truck: 'TN-49-AZ-1024', route: 'Bangalore → Chennai', revenue: 26000, expenses: 13800, status: 'Settled' },
  ];

  return (
    <div className="animate-fade-in pb-10 relative">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><DollarSign size={20} className="text-blue-600"/> Financial Overview</h2>
          <p className="text-sm text-slate-500">Track gross revenue, fleet expenses, route margins, and ledgers.</p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-colors">
          <Download size={16}/> Export Full Ledger
        </button>
      </div>

      {/* FINANCIAL KPIS - NOW INTERACTIVE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* REVENUE CARD */}
        <div 
          onClick={() => setActiveFinanceModal('revenue')}
          className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm relative overflow-hidden cursor-pointer hover:border-blue-400 hover:shadow-md transition-all group"
        >
          <Wallet className="absolute -right-4 -top-4 w-24 h-24 text-slate-50 opacity-50 group-hover:scale-110 transition-transform duration-500"/>
          <div className="flex justify-between items-start relative z-10">
            <p className="text-slate-500 font-bold text-sm uppercase tracking-wider mb-2">Gross Revenue (MTD)</p>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors"/>
          </div>
          <p className="text-4xl font-black text-slate-800 relative z-10">₹6.22 L</p>
          <p className="text-emerald-600 flex items-center gap-1 text-sm font-bold mt-2 relative z-10"><TrendingUp size={16}/> +8.4% vs last month</p>
        </div>

        {/* EXPENSES CARD */}
        <div 
          onClick={() => setActiveFinanceModal('expenses')}
          className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm relative overflow-hidden cursor-pointer hover:border-red-400 hover:shadow-md transition-all group"
        >
          <PieChart className="absolute -right-4 -top-4 w-24 h-24 text-slate-50 opacity-50 group-hover:scale-110 transition-transform duration-500"/>
          <div className="flex justify-between items-start relative z-10">
            <p className="text-slate-500 font-bold text-sm uppercase tracking-wider mb-2">Total Expenses (MTD)</p>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-red-500 transition-colors"/>
          </div>
          <p className="text-4xl font-black text-slate-800 relative z-10">₹3.53 L</p>
          <p className="text-amber-600 flex items-center gap-1 text-sm font-bold mt-2 relative z-10"><TrendingUp size={16}/> +2.1% vs last month</p>
        </div>

        {/* NET PROFIT CARD */}
        <div 
          onClick={() => setActiveFinanceModal('profit')}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl border border-blue-500 p-6 shadow-md text-white relative overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-blue-500/20 transition-all group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mt-8 -mr-8 blur-2xl group-hover:bg-white/10 transition-colors duration-500"></div>
          <div className="flex justify-between items-start relative z-10">
            <p className="text-blue-200 font-bold text-sm uppercase tracking-wider mb-2">Net Profit Margin</p>
            <ChevronRight size={18} className="text-blue-300 group-hover:text-white transition-colors"/>
          </div>
          <p className="text-4xl font-black relative z-10">₹2.69 L</p>
          <p className="text-emerald-300 flex items-center gap-1 text-sm font-bold mt-2 relative z-10"><TrendingUp size={16}/> Fleet Margin: 43.2%</p>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        
        {/* REVENUE VS EXPENSE CHART */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Cash Flow (This Month)</h3>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">Weekly Breakdown</span>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}}/>
                <Bar dataKey="revenue" name="Gross Revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="expense" name="Fleet Expenses" fill="#cbd5e1" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* EXPENSE BREAKDOWN */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-800">Top Expense Categories</h3>
          </div>
          <div className="space-y-5 flex-1 mt-2">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-sm"><span className="font-bold text-slate-700">Fuel Costs</span><span className="font-bold text-slate-800">₹1.85 L</span></div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-amber-500 h-full w-[52%]"></div></div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-sm"><span className="font-bold text-slate-700">Driver Payouts</span><span className="font-bold text-slate-800">₹95.0 K</span></div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-blue-500 h-full w-[26%]"></div></div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-sm"><span className="font-bold text-slate-700">Tolls & Taxes (FASTag)</span><span className="font-bold text-slate-800">₹42.5 K</span></div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-indigo-500 h-full w-[12%]"></div></div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-sm"><span className="font-bold text-slate-700">Maintenance & Parts</span><span className="font-bold text-slate-800">₹30.5 K</span></div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-red-400 h-full w-[10%]"></div></div>
            </div>
          </div>
          <button 
            onClick={() => setActiveFinanceModal('expenses')}
            className="w-full mt-4 bg-slate-50 text-blue-600 font-bold py-3 rounded-lg text-sm border border-blue-100 hover:bg-blue-100 transition-colors"
          >
            View Full Ledger
          </button>
        </div>

      </div>

      {/* ========================================= */}
      {/* DETAILED TRIP LEDGER                      */}
      {/* ========================================= */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><FileText size={18} className="text-blue-600"/> Recent Trip Ledger</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="p-4">Trip ID & Date</th>
                <th className="p-4">Route & Asset</th>
                <th className="p-4">Freight Revenue</th>
                <th className="p-4">Route Expenses</th>
                <th className="p-4">Net Margin</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Documentation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentTrips.map((trip, i) => {
                const profit = trip.revenue - trip.expenses;
                const marginPercent = ((profit / trip.revenue) * 100).toFixed(1);
                
                return (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <p className="font-black text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs inline-block mb-1 border border-slate-200">{trip.id}</p>
                      <p className="text-xs font-bold text-slate-500">{trip.date}</p>
                    </td>
                    
                    <td className="p-4">
                      <p className="font-bold text-slate-800 flex items-center gap-1.5"><MapPin size={14} className="text-blue-500"/> {trip.route}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 flex items-center gap-1"><Truck size={12}/> {trip.truck}</p>
                    </td>
                    
                    <td className="p-4">
                      <p className="font-black text-emerald-600">₹{trip.revenue.toLocaleString()}</p>
                    </td>
                    
                    <td className="p-4">
                      <p className="font-bold text-red-500">- ₹{trip.expenses.toLocaleString()}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-0.5">Fuel & Tolls</p>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-black text-slate-800">₹{profit.toLocaleString()}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded inline-block w-fit ${marginPercent >= 40 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {marginPercent}% Margin
                        </span>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      {trip.status === 'Settled' ? (
                        <span className="flex items-center gap-1 text-emerald-700 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                          <CheckCircle2 size={14}/> Settled
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-700 text-xs font-bold bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                          <Clock size={14} className="text-amber-500"/> Pending
                        </span>
                      )}
                    </td>
                    
                    <td className="p-4 text-right">
                      <button className="text-blue-600 font-bold text-xs hover:bg-blue-50 px-3 py-1.5 rounded-md transition-colors border border-transparent hover:border-blue-200 inline-flex items-center gap-1.5">
                        <Download size={14}/> Invoice
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================== */}
      {/* INTERACTIVE MODALS (REVENUE / EXPENSE / PROFIT BREAKDOWNS) */}
      {/* ========================================================== */}
      {activeFinanceModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className={`px-6 py-4 border-b flex justify-between items-center text-white ${
              activeFinanceModal === 'revenue' ? 'bg-blue-600' : 
              activeFinanceModal === 'expenses' ? 'bg-slate-800' : 'bg-indigo-700'
            }`}>
              <div>
                <h2 className="text-lg font-black flex items-center gap-2">
                  {activeFinanceModal === 'revenue' && <><Wallet size={20}/> Revenue Breakdown (MTD)</>}
                  {activeFinanceModal === 'expenses' && <><Receipt size={20}/> Expense Ledger (MTD)</>}
                  {activeFinanceModal === 'profit' && <><Activity size={20}/> Profitability Leaderboard</>}
                </h2>
                <p className="text-xs opacity-80 mt-1">Detailed analysis of calculated values.</p>
              </div>
              <button onClick={() => setActiveFinanceModal(null)} className="p-1 hover:bg-white/20 rounded-lg transition-colors"><X size={20}/></button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto bg-slate-50 flex-1">
              
              {/* MODAL: REVENUE BREAKDOWN */}
              {activeFinanceModal === 'revenue' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Total Value Origin</p>
                      <p className="text-sm text-blue-900 font-medium">The ₹6.22 L is derived from 44 completed trips across 4 active trucks.</p>
                    </div>
                    <p className="text-2xl font-black text-blue-700">₹6,22,000</p>
                  </div>
                  
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-200 pb-2">Revenue Generation by Asset</h3>
                  <div className="space-y-3">
                    {revenueByAsset.map((asset, i) => (
                      <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="bg-slate-100 p-2.5 rounded-lg text-slate-500"><Truck size={20}/></div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{asset.truck}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{asset.type} • {asset.trips} Trips</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-emerald-600 text-lg">₹{asset.revenue.toLocaleString()}</p>
                          <p className="text-xs font-medium text-slate-500 mt-0.5">Top Route: {asset.topRoute}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MODAL: EXPENSE LEDGER */}
              {activeFinanceModal === 'expenses' && (
                <div className="space-y-4">
                  <div className="bg-slate-100 border border-slate-200 p-4 rounded-xl flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Deductions</p>
                      <p className="text-sm text-slate-700 font-medium">The ₹3.53 L represents all operating costs incurred this month.</p>
                    </div>
                    <p className="text-2xl font-black text-red-600">₹3,53,000</p>
                  </div>

                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-200 pb-2">Itemized Recent Expenses</h3>
                  <div className="space-y-3">
                    {detailedExpenses.map((exp, i) => (
                      <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center shadow-sm">
                        <div className="flex items-start gap-4">
                          <div className={`p-2.5 rounded-lg ${exp.category === 'Fuel' ? 'bg-amber-100 text-amber-600' : exp.category === 'Maintenance' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                            <Receipt size={20}/>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-slate-800 text-sm">{exp.desc}</p>
                              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">{exp.id}</span>
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                              <p className="text-xs font-bold text-slate-500 flex items-center gap-1"><Calendar size={12}/> {exp.date}</p>
                              <p className="text-xs font-bold text-slate-500 flex items-center gap-1"><Truck size={12}/> {exp.truck}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-red-600 text-base">- ₹{exp.amount.toLocaleString()}</p>
                          <p className="text-[10px] font-bold text-emerald-600 uppercase mt-1 flex items-center justify-end gap-1"><CheckCircle2 size={10}/> {exp.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MODAL: PROFITABILITY */}
              {activeFinanceModal === 'profit' && (
                <div className="space-y-4">
                  <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Net Calculation</p>
                      <p className="text-sm text-indigo-900 font-medium">₹6.22L Revenue - ₹3.53L Expenses = ₹2.69L Net Profit.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-indigo-700">₹2,69,000</p>
                      <p className="text-xs font-bold text-indigo-500">43.2% Margin</p>
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-200 pb-2">Most Profitable Assets</h3>
                  <div className="space-y-3">
                    {revenueByAsset.map((asset, i) => {
                      // Mocking an expense ratio for the profit breakdown
                      const estimatedExpense = asset.revenue * 0.55; 
                      const profit = asset.revenue - estimatedExpense;
                      const margin = ((profit / asset.revenue) * 100).toFixed(1);

                      return (
                        <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center shadow-sm">
                          <div>
                            <p className="font-bold text-slate-800 text-sm flex items-center gap-2"><Truck size={14} className="text-slate-400"/> {asset.truck}</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 text-emerald-600">{margin}% Profit Margin</p>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-indigo-600 text-lg">₹{profit.toLocaleString()}</p>
                            <p className="text-xs font-medium text-slate-500 mt-0.5">Net Profit</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="mt-6 bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle size={20} className="text-amber-500 shrink-0 mt-0.5"/>
                    <div>
                      <p className="font-bold text-amber-800 text-sm">Optimization Insight</p>
                      <p className="text-xs text-amber-700 mt-1">Truck TN-45-XX-8821 has a lower profit margin (38%) due to higher empty return trips on the Trichy-Hosur route. Consider booking return loads on this lane.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RevenueExpenses;