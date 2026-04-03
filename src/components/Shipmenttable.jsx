import React, { useState } from 'react';
import { Eye, MapPin, Clock, MapPinIcon } from 'lucide-react';

const ShipmentTable = ({ shipments, onViewDetails, onViewMap }) => {
  const [expanded, setExpanded] = useState(null);

  const getStatusBadge = (status) => {
    const badges = {
      'In Transit': 'badge-info',
      'Delivered': 'badge-success',
      'Pending': 'badge-warning',
      'Cancelled': 'badge-error',
    };
    return badges[status] || 'badge-info';
  };

  const getStatusDot = (status) => {
    const dots = {
      'In Transit': 'bg-cyan-500',
      'Delivered': 'bg-emerald-500',
      'Pending': 'bg-amber-500',
      'Cancelled': 'bg-red-500',
    };
    return dots[status] || 'bg-slate-400';
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Active Shipments</h3>
      <div className="space-y-3">
        {shipments.map((shipment) => (
          <div
            key={shipment.id}
            onClick={() => setExpanded(expanded === shipment.id ? null : shipment.id)}
            className="border border-slate-200 rounded-lg p-5 hover:shadow-md hover:border-blue-300 cursor-pointer transition-all bg-white"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusDot(shipment.status)}`}></div>
                  <p className="font-semibold text-slate-900">{shipment.id}</p>
                </div>
                <p className="text-sm text-slate-600 flex items-center gap-1">
                  <MapPin size={14} /> {shipment.pickup} → {shipment.dropoff}
                </p>
              </div>
              <span className={getStatusBadge(shipment.status)}>
                {shipment.status}
              </span>
            </div>

            {shipment.progress !== undefined && shipment.progress > 0 && (
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-600 font-medium">Progress</span>
                  <span className="font-bold text-blue-600">{shipment.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${shipment.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {shipment.driver && (
                <div>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">Driver</p>
                  <p className="font-semibold text-slate-900 mt-1">{shipment.driver}</p>
                </div>
              )}
              {shipment.eta && (
                <div>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wide flex items-center gap-1">
                    <Clock size={12} /> ETA
                  </p>
                  <p className="font-semibold text-slate-900 mt-1">{shipment.eta}</p>
                </div>
              )}
              {shipment.distance && (
                <div>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">Distance</p>
                  <p className="font-semibold text-slate-900 mt-1">{shipment.distance}</p>
                </div>
              )}
              {shipment.rate && (
                <div>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">Rate</p>
                  <p className="font-semibold text-emerald-600 text-lg mt-1">{shipment.rate}</p>
                </div>
              )}
            </div>

            {expanded === shipment.id && (
              <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails && onViewDetails(shipment.id);
                  }}
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1"
                >
                  <Eye size={14} /> View Details
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewMap && onViewMap(shipment.id);
                  }}
                  className="flex-1 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1"
                >
                  <MapPinIcon size={14} /> Track
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShipmentTable;