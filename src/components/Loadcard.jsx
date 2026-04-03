import React from 'react';

const LoadCard = ({ load, onAccept, expanded = false, onToggle }) => {
  const statusColors = {
    'Available': 'bg-emerald-100 text-emerald-700',
    'Taken': 'bg-slate-100 text-slate-700',
    'Expired': 'bg-red-100 text-red-700',
  };

  return (
    <div
      onClick={onToggle}
      className={`card p-5 cursor-pointer transition-all transform ${
        expanded ? 'ring-2 ring-blue-500 shadow-lg scale-[1.02]' : 'hover:shadow-md'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Pickup Location</p>
          <p className="text-sm font-bold text-slate-900">{load.pickup}</p>
        </div>
        <span className="text-lg font-bold text-emerald-600">₹{load.rate}</span>
      </div>

      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Dropoff Location</p>
          <p className="text-sm font-bold text-slate-900">{load.dropoff}</p>
        </div>
        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">{load.distance}</span>
      </div>

      {load.status && (
        <div className={`text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4 ${statusColors[load.status] || 'bg-blue-100 text-blue-700'}`}>
          {load.status}
        </div>
      )}

      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
          {load.weight && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">⚖️ Weight</span>
              <span className="font-bold text-slate-900">{load.weight}</span>
            </div>
          )}
          {load.eta && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">⏱️ Estimated Time</span>
              <span className="font-bold text-slate-900">{load.eta}</span>
            </div>
          )}
          {onAccept && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAccept();
              }}
              className="w-full bg-gradient-primary hover:shadow-lg text-white rounded-lg py-3 font-semibold text-sm transition-all"
            >
              ✓ Accept Load
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LoadCard;