import React, { useState } from 'react';
import { 
  Star, ChevronRight, TrendingUp, IndianRupee, Activity, CheckCircle, 
  Target, Download, X, Receipt, FileText, Calendar, ArrowRight, 
  Clock, MapIcon, ThumbsUp, MessageSquare 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const DriverEarnings = () => {
  const [activeModal, setActiveModal] = useState(null); // 'today' | 'statements' | 'week' | 'rating' | null

  const earnings = { today: 3450, goal: 5000, week: '₹24,320', total: '₹89,650', rating: 4.8 };
  const progressPercent = Math.min((earnings.today / earnings.goal) * 100, 100);

  // --- MOCK DATA FOR MODALS ---
  const todaysBreakdown = [
    { id: 'AWB#8849201', desc: 'Base Trip Fare (BLR -> MYs)', type: 'credit', amount: 2800, time: '2:30 PM' },
    { id: 'AWB#8849201', desc: 'Toll Reimbursement (NICE Road)', type: 'credit', amount: 450, time: '2:30 PM' },
    { id: 'SYS-BONUS', desc: 'Peak Hour Driving Incentive', type: 'credit', amount: 250, time: '3:00 PM' },
    { id: 'SYS-FEE', desc: 'Platform Usage Fee (1.5%)', type: 'debit', amount: -50, time: '3:00 PM' }
  ];

  const statementsList = [
    { id: 'STMT-NOV-W1', date: '01 Nov - 07 Nov 2026', trips: 14, amount: '₹24,320', status: 'Processing' },
    { id: 'STMT-OCT-W4', date: '24 Oct - 31 Oct 2026', trips: 18, amount: '₹31,500', status: 'Paid to Bank' },
    { id: 'STMT-OCT-W3', date: '17 Oct - 23 Oct 2026', trips: 12, amount: '₹19,200', status: 'Paid to Bank' },
    { id: 'STMT-OCT-W2', date: '10 Oct - 16 Oct 2026', trips: 15, amount: '₹22,100', status: 'Paid to Bank' },
    { id: 'STMT-OCT-W1', date: '01 Oct - 09 Oct 2026', trips: 10, amount: '₹16,400', status: 'Paid to Bank' },
  ];

  const weekDetails = {
    totalTrips: 14,
    totalHours: '42h 15m',
    totalDistance: '1,120 km',
    daily: [
      { day: 'Wednesday (Today)', trips: 2, amount: '₹3,450', status: 'Active' },
      { day: 'Tuesday', trips: 3, amount: '₹5,200', status: 'Cleared' },
      { day: 'Monday', trips: 2, amount: '₹3,100', status: 'Cleared' },
      { day: 'Sunday', trips: 4, amount: '₹7,450', status: 'Cleared' },
      { day: 'Saturday', trips: 3, amount: '₹5,120', status: 'Cleared' }
    ]
  };

  const ratingDetails = {
    totalReviews: 284,
    distribution: { 5: 240, 4: 35, 3: 7, 2: 2, 1: 0 },
    compliments: ['Always on time', 'Safe driving', 'Polite behavior'],
    recentFeedback: [
      { shipper: 'Sharma Electronics', rating: 5, comment: 'Arrived 10 mins early, handled fragile TVs with great care.', date: 'Today' },
      { shipper: 'Reliable Movers', rating: 4, comment: 'Good trip, slightly delayed due to traffic but communicated well.', date: 'Yesterday' },
      { shipper: 'TechSupply India', rating: 5, comment: 'Excellent and professional. Highly recommended.', date: 'Dec 10' }
    ]
  };

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
    <div className="w-full bg-[#F4F7FB] min-h-screen font-sans p-6 relative">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Wallet & Earnings</h1>
            <p className="text-sm text-slate-500">Track your daily goals, payouts, and financial history</p>
          </div>
        </div>

        {/* TOP KPI ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Main Goal Card - CLICKABLE */}
          <div 
            onClick={() => setActiveModal('today')}
            className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 shadow-md text-white relative overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-blue-500/30 transition-all group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mt-10 -mr-10 blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <p className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-1 flex items-center gap-2">
                  Today's Earnings <span className="bg-blue-800 text-[10px] px-2 py-0.5 rounded text-blue-100">Click for details</span>
                </p>
                <p className="text-4xl font-black">₹{earnings.today.toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors">
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

          {/* Quick Stats - THIS WEEK (CLICKABLE) */}
          <div 
            onClick={() => setActiveModal('week')}
            className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col justify-center cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-blue-600">
                <TrendingUp size={18}/> <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">This Week</span>
              </div>
              <ArrowRight size={14} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-3xl font-black text-slate-800">{earnings.week}</p>
            <p className="text-xs text-emerald-600 font-bold mt-2 bg-emerald-50 inline-block px-2 py-1 rounded w-max border border-emerald-100">+12% from last week</p>
          </div>
          
          {/* Quick Stats - AVG RATING (CLICKABLE) */}
          <div 
            onClick={() => setActiveModal('rating')}
            className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col justify-center cursor-pointer hover:border-amber-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-amber-500">
                <Star size={18} className="fill-amber-500/20"/> <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Avg Rating</span>
              </div>
              <ArrowRight size={14} className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-3xl font-black text-slate-800">{earnings.rating} <span className="text-lg text-slate-400 font-bold">/ 5</span></p>
            <p className="text-xs text-slate-500 font-medium mt-2">Based on {ratingDetails.totalReviews} trips</p>
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
            <button 
              onClick={() => setActiveModal('statements')}
              className="w-full p-3 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors border-t border-slate-100 flex justify-center items-center gap-2"
            >
              View All Detailed Statements <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* MODAL 1: TODAY'S EARNINGS BREAKDOWN        */}
      {/* ========================================= */}
      {activeModal === 'today' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Receipt size={20} className="text-blue-600"/> Today's Breakdown
              </h2>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"><X size={20}/></button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="text-center mb-8">
                <p className="text-slate-500 text-sm font-semibold mb-1">Total Earned Today</p>
                <p className="text-5xl font-black text-emerald-600">₹3,450</p>
                <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>

              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">Line Items</h3>
              <div className="space-y-4">
                {todaysBreakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{item.desc}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-0.5">Ref: {item.id} • {item.time}</p>
                    </div>
                    <p className={`font-black ${item.type === 'credit' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {item.type === 'credit' ? '+' : '-'}₹{Math.abs(item.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors shadow-sm">
                <Download size={16}/> Download Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* MODAL 2: THIS WEEK PERFORMANCE             */}
      {/* ========================================= */}
      {activeModal === 'week' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 border-b border-slate-100 bg-blue-50 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                  <TrendingUp size={20} className="text-blue-600"/> Weekly Performance
                </h2>
                <p className="text-xs text-blue-600 mt-1 font-semibold">Nov 01 - Nov 07</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-blue-100 rounded-lg text-blue-500 transition-colors"><X size={20}/></button>
            </div>
            
            <div className="p-6 overflow-y-auto bg-white space-y-6">
              {/* Top Level Week Stats */}
              <div className="grid grid-cols-3 gap-4 text-center divide-x divide-slate-100 bg-slate-50 border border-slate-100 rounded-xl p-4">
                <div>
                  <CheckCircle size={20} className="mx-auto mb-1 text-emerald-500"/>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Total Trips</p>
                  <p className="text-lg font-black text-slate-800">{weekDetails.totalTrips}</p>
                </div>
                <div>
                  <Clock size={20} className="mx-auto mb-1 text-amber-500"/>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Hours Driven</p>
                  <p className="text-lg font-black text-slate-800">{weekDetails.totalHours}</p>
                </div>
                <div>
                  <MapIcon size={20} className="mx-auto mb-1 text-blue-500"/>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Distance</p>
                  <p className="text-lg font-black text-slate-800">{weekDetails.totalDistance}</p>
                </div>
              </div>

              {/* Daily Breakdown */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">Daily Earning Log</h3>
                <div className="space-y-3">
                  {weekDetails.daily.map((day, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{day.day}</p>
                        <p className="text-[10px] font-bold text-slate-500 mt-0.5">{day.trips} Trips Completed</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-emerald-600 text-base">{day.amount}</p>
                        <p className={`text-[10px] font-bold uppercase tracking-wider ${day.status === 'Active' ? 'text-amber-500' : 'text-slate-400'}`}>
                          {day.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button onClick={() => setActiveModal(null)} className="bg-slate-200 text-slate-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-slate-300 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* MODAL 3: RATINGS & REVIEWS DEEP DIVE         */}
      {/* ========================================= */}
      {activeModal === 'rating' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 border-b border-slate-100 bg-amber-50 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-amber-900 flex items-center gap-2">
                  <Star size={20} className="text-amber-600 fill-amber-600"/> Driver Reputation
                </h2>
                <p className="text-xs text-amber-600/80 mt-1 font-semibold">Based on {ratingDetails.totalReviews} Lifetime Trips</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-amber-100 rounded-lg text-amber-600 transition-colors"><X size={20}/></button>
            </div>
            
            <div className="p-6 overflow-y-auto bg-white space-y-6">
              
              {/* Rating Distribution */}
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 border border-slate-100 rounded-xl p-5">
                <div className="text-center">
                  <p className="text-5xl font-black text-slate-800">{earnings.rating}</p>
                  <div className="flex text-amber-400 my-2 justify-center">
                    <Star size={16} className="fill-amber-400"/><Star size={16} className="fill-amber-400"/><Star size={16} className="fill-amber-400"/><Star size={16} className="fill-amber-400"/><Star size={16} className="fill-amber-400 opacity-50"/>
                  </div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Overall Score</p>
                </div>
                
                <div className="flex-1 w-full space-y-1.5 border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-6">
                  {[5,4,3,2,1].map((star) => (
                    <div key={star} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <span className="w-2">{star}</span><Star size={10}/>
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full rounded-full" style={{ width: `${(ratingDetails.distribution[star] / ratingDetails.totalReviews) * 100}%` }}></div>
                      </div>
                      <span className="w-6 text-right">{ratingDetails.distribution[star]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliment Badges */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <ThumbsUp size={14}/> Top Compliments
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ratingDetails.compliments.map(comp => (
                    <span key={comp} className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-full text-xs font-bold">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Reviews */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <MessageSquare size={14}/> Recent Feedback
                </h3>
                <div className="space-y-4">
                  {ratingDetails.recentFeedback.map((review, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm relative">
                      <span className="absolute top-4 right-4 text-[10px] font-bold text-slate-400">{review.date}</span>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-slate-800 text-sm">{review.shipper}</span>
                        <div className="flex gap-0.5 text-amber-400">
                          {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} className="fill-amber-400"/>)}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 italic">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button onClick={() => setActiveModal(null)} className="bg-slate-200 text-slate-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-slate-300 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* MODAL 4: ALL WEEKLY STATEMENTS             */}
      {/* ========================================= */}
      {activeModal === 'statements' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <FileText size={20} className="text-blue-600"/> All Earnings Statements
                </h2>
                <p className="text-xs text-slate-500 mt-1">Download your official payout documents for tax purposes.</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"><X size={20}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
              {statementsList.map((stmt, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md hover:border-blue-300 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg text-blue-600 border border-blue-100">
                      <Calendar size={24}/>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{stmt.date}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-xs text-slate-500">Ref: {stmt.id}</p>
                        <span className="text-slate-300">•</span>
                        <p className="text-xs font-semibold text-slate-600">{stmt.trips} Trips Completed</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-left sm:text-right">
                      <p className="font-black text-lg text-emerald-600">{stmt.amount}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${stmt.status === 'Processing' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {stmt.status}
                      </span>
                    </div>
                    <button className="bg-slate-100 p-2.5 rounded-lg text-slate-600 hover:bg-blue-600 hover:text-white transition-colors border border-slate-200" title="Download PDF">
                      <Download size={18}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DriverEarnings;