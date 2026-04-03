import React from 'react';
import { Star, ChevronRight, TrendingUp, IndianRupee, Activity, CheckCircle, Target, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const DriverEarnings = () => {
  const earnings = { today: 3450, goal: 5000, week: '₹24,320', total: '₹89,650', rating: 4.8 };
  const progressPercent = Math.min((earnings.today / earnings.goal) * 100, 100);

  const earningsHistory = [
    { date: 'Today, 2:30 PM', amount: '+₹1,200', trip: 'AWB#8849201', type: 'Delivery' },
    { date: 'Yesterday', amount: '+₹2,250', trip: 'AWB#8849200', type: 'Delivery' },
    { date: 'Dec 10', amount: '+₹1,850', trip: 'AWB#8849199', type: 'Delivery' },
    { date: 'Dec 10', amount: '+₹250', trip: 'Bonus', type: 'Incentive' },
    { date: 'Dec 08', amount: '+₹3,100', trip: 'AWB#8849190', type: 'Delivery' },
  ];

  const weeklyData = [
    { day: 'Mon', earned: 2100 }, { day: 'Tue', earned: 3400 }, { day: 'Wed', earned: 1850 },
    { day: 'Thu', earned: 4200 }, { day: 'Fri', earned: 3100 }, { day: 'Sat', earned: 4500 },
  ];

  return (
    <div className="w-full bg-[#F4F7FB] min-h-screen font-sans p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Wallet & Earnings</h1>
            <p className="text-sm text-slate-500">Track your daily goals, payouts, and financial history</p>
          </div>
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={16}/> Download Statement
          </button>
        </div>

        {/* TOP KPI ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Main Goal Card */}
          <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 shadow-md text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mt-10 -mr-10 blur-2xl"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <p className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-1">Today's Earnings</p>
                <p className="text-4xl font-black">₹{earnings.today.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <IndianRupee size={28} className="text-white" />
              </div>
            </div>

            {/* Daily Goal Progress Bar */}
            <div className="relative z-10">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold text-blue-100 flex items-center gap-1.5"><Target size={14}/> Daily Goal: ₹{earnings.goal.toLocaleString('en-IN')}</span>
                <span className="font-black text-sm">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-blue-900/50 h-2.5 rounded-full overflow-hidden border border-blue-500/30">
                <div className="bg-emerald-400 h-full rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2 text-blue-600"><TrendingUp size={18}/> <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">This Week</span></div>
            <p className="text-3xl font-black text-slate-800">{earnings.week}</p>
            <p className="text-xs text-emerald-600 font-bold mt-2">+12% from last week</p>
          </div>
          
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2 text-amber-500"><Star size={18} className="fill-amber-500/20"/> <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Avg Rating</span></div>
            <p className="text-3xl font-black text-slate-800">{earnings.rating} <span className="text-lg text-slate-400 font-bold">/ 5</span></p>
            <p className="text-xs text-slate-500 font-medium mt-2">Based on 284 lifetime trips</p>
          </div>
        </div>

        {/* BOTTOM ROW: CHARTS & TRANSACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Weekly Chart */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Weekly Earnings Breakdown</h3>
            </div>
            <div className="flex-1 p-5 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(val) => `₹${val}`} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="earned" fill="#3B82F6" radius={[6, 6, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2"><Activity size={18} className="text-blue-600"/> Recent Transactions</h3>
            </div>
            <div className="divide-y divide-slate-100 flex-1 overflow-y-auto">
              {earningsHistory.map((item, idx) => (
                <div key={idx} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${item.type === 'Incentive' ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
                      {item.type === 'Incentive' ? <Star size={18}/> : <CheckCircle size={18}/>}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-800">{item.trip}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-1">
                    <p className="font-black text-emerald-600 text-base">{item.amount}</p>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors"/>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full p-3 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors border-t border-slate-100">
              View All Statements
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DriverEarnings;