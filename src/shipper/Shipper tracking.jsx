import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ShieldCheck, Phone, Clock, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import './ShipperTracking.css'; // Dedicated CSS

// Setup custom HTML marker
const createTruckIcon = (color) => L.divIcon({
  className: 'custom-truck-marker',
  html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><path d="M14 17h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// Component to smoothly move the map when a new truck is selected
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 10, { duration: 1.5 });
  }, [center, map]);
  return null;
};

const ShipperTracking = () => {
  // Rich data for the specific tracking view
  const shipments = [
    { 
      id: 'SHP#1260', 
      pickup: 'Pune, MH', dropoff: 'Delhi, DL', 
      driver: 'Rajesh Kumar', phone: '+91 98765 43210',
      status: 'In Transit', progress: 65, eta: 'Today, 4:30 PM',
      currentLoc: [22.7204, 75.8567], color: '#3b5998',
      route: [[18.5204, 73.8567], [22.7204, 75.8567], [28.6139, 77.2090]],
      history: [
        { status: 'Order Created', time: 'Oct 24, 08:00 AM', done: true },
        { status: 'Dispatched from Pune Hub', time: 'Oct 24, 11:30 AM', done: true },
        { status: 'Crossed Checkpoint: Indore', time: 'Today, 09:15 AM', done: true },
        { status: 'Arriving at Delhi', time: 'Pending', done: false }
      ]
    },
    { 
      id: 'SHP#1259', 
      pickup: 'Mumbai, MH', dropoff: 'Jaipur, RJ', 
      driver: 'Sanjay Singh', phone: '+91 87654 32109',
      status: 'Delayed', progress: 40, eta: 'Tomorrow, 10:00 AM',
      currentLoc: [20.2961, 73.0039], color: '#F59E0B',
      route: [[19.0760, 72.8777], [20.2961, 73.0039], [26.9124, 75.7873]],
      history: [
        { status: 'Order Created', time: 'Oct 23, 04:00 PM', done: true },
        { status: 'Dispatched from Mumbai', time: 'Oct 24, 06:00 AM', done: true },
        { status: 'Delayed due to traffic/weather', time: 'Today, 10:00 AM', done: false },
        { status: 'Arriving at Jaipur', time: 'Pending', done: false }
      ]
    }
  ];

  const [activeShipment, setActiveShipment] = useState(shipments[0]);

  return (
    <div className="tracking-wrapper">
      
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dedicated Tracking</h2>
          <p className="text-sm text-gray-500 mt-1">Select a shipment to view real-time location and milestones</p>
        </div>
      </div>

      <div className="tracking-layout">
        
        {/* Left Sidebar: Shipment List & Timeline */}
        <div className="tracking-sidebar">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Select Shipment</h3>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">{shipments.length} Active</span>
          </div>
          
          {/* Horizontal scroll for shipments (or vertical list) */}
          <div className="p-4 flex gap-3 overflow-x-auto border-b border-gray-100 bg-white">
            {shipments.map((ship) => (
              <div 
                key={ship.id}
                onClick={() => setActiveShipment(ship)}
                className={`min-w-[200px] p-3 rounded-lg border-2 cursor-pointer transition-all flex-shrink-0 ${
                  activeShipment.id === ship.id ? 'border-[#3b5998] bg-blue-50/50' : 'border-gray-100 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-gray-900 text-sm">{ship.id}</h4>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ship.color }}></div>
                </div>
                <p className="text-xs text-gray-500">{ship.pickup} to {ship.dropoff}</p>
              </div>
            ))}
          </div>

          {/* Timeline for the selected shipment */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-5">
              <h3 className="font-bold text-gray-800 text-sm mb-4">Tracking Journey</h3>
              <div className="timeline-container rounded-lg border border-gray-200 bg-white">
                {activeShipment.history.map((step, idx) => (
                  <div key={idx} className={`timeline-item ${step.done ? 'active' : ''}`}>
                    <div className={`timeline-dot ${step.done ? 'active' : ''}`}></div>
                    <div className="timeline-content">
                      <h4 className={step.done ? 'text-gray-900' : 'text-gray-400'}>{step.status}</h4>
                      <p>{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Interactive Map Area */}
        <div className="tracking-map-area">
          
          {/* Driver Detail Card */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-4">
               <div className="bg-blue-50 p-3 rounded-full text-[#3b5998]"><ShieldCheck size={24} /></div>
               <div>
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Driver / Vehicle</p>
                 <p className="text-lg font-bold text-gray-900">{activeShipment.driver}</p>
                 <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5"><Phone size={14}/> {activeShipment.phone}</p>
               </div>
            </div>
            <div className="text-right">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Est. Arrival</p>
                <p className="text-lg font-bold text-[#3b5998] flex items-center gap-1"><Clock size={16}/> {activeShipment.eta}</p>
            </div>
          </div>

          {/* Leaflet Map */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative z-0">
            <MapContainer 
              center={activeShipment.currentLoc} 
              zoom={6} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              
              <MapUpdater center={activeShipment.currentLoc} />

              {/* Render Markers for all shipments */}
              {shipments.map((truck) => (
                <Marker 
                  key={truck.id} 
                  position={truck.currentLoc} 
                  icon={createTruckIcon(truck.color)}
                  zIndexOffset={activeShipment.id === truck.id ? 1000 : 0}
                >
                  <Popup>
                    <div className="p-1 min-w-[150px]">
                      <strong className="text-gray-900 text-base">{truck.id}</strong>
                      <hr className="my-1 border-gray-100" />
                      <div className="flex flex-col gap-1 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1"><MapPin size={12}/> {truck.pickup}</span>
                        <span className="flex items-center gap-1"><MapPin size={12}/> {truck.dropoff}</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Show the route line for the currently selected shipment */}
              <Polyline 
                positions={activeShipment.route} 
                color={activeShipment.color} 
                weight={4} 
                dashArray="8, 8" 
              />
            </MapContainer>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShipperTracking;