import React from 'react';

const StatCard = ({ label, value, change, icon: Icon, color = 'from-blue-600 to-blue-400' }) => {
  const isPositive = change?.startsWith('+');
  
  return (
    <div className="card p-6 hover:shadow-lg transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-md`}>
          {Icon && <Icon size={28} className="text-white" strokeWidth={1.5} />}
        </div>
      </div>
      {change && (
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            isPositive 
              ? 'bg-emerald-100 text-emerald-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {change}
          </span>
          <span className="text-xs text-slate-500">from last week</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;