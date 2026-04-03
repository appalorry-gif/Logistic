import React from 'react';
import { Truck, ShieldCheck, FileText, HelpCircle, Settings, LogOut, ChevronRight, Star, MapPin, Phone, Mail, FileCheck, BadgeCheck, AlertTriangle, CreditCard } from 'lucide-react';

const DriverProfile = () => {
  return (
    <div className="w-full bg-[#F4F7FB] min-h-screen font-sans p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Driver Profile</h1>
            <p className="text-sm text-slate-500">Manage your identity, vehicle, and compliance documents</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COLUMN 1 & 2: Identity, Vehicle & Compliance */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* 1. Identity Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative shrink-0">
                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-black text-white shadow-lg">
                  RK
                </div>
                <div className="absolute bottom-0 right-0 bg-emerald-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-md">
                  <ShieldCheck size={16} className="text-white" />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl font-black text-slate-800">Rajesh Kumar</h3>
                <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mt-1">Platform ID: DRV-4492-BLR</p>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 mt-4">
                  <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-100 flex items-center gap-1.5">
                    <ShieldCheck size={14}/> Background Verified
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                    <Star size={14} className="fill-amber-500"/> 4.8 Rating
                  </span>
                </div>
              </div>
              <div className="w-full sm:w-auto flex flex-col gap-3 sm:border-l border-slate-100 sm:pl-6">
                <div className="flex items-center gap-3 text-sm text-slate-600"><Phone size={16} className="text-slate-400"/> +91 98765 43210</div>
                <div className="flex items-center gap-3 text-sm text-slate-600"><Mail size={16} className="text-slate-400"/> rajesh@example.com</div>
                <div className="flex items-center gap-3 text-sm text-slate-600"><MapPin size={16} className="text-slate-400"/> Bangalore, KA</div>
              </div>
            </div>

            {/* 2. Vehicle Specifications */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck size={18} className="text-blue-600"/> 
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest">Assigned Vehicle Specifications</h3>
                </div>
                <button className="text-xs font-bold text-blue-600 hover:underline">Request Change</button>
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Truck Number</p>
                  <p className="font-black text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 inline-block">KA-05-MQ-1234</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Vehicle Model</p>
                  <p className="font-bold text-slate-700 mt-1">Tata Ace Gold</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Body Type</p>
                  <p className="font-bold text-slate-700 mt-1">Closed Container</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Max Payload</p>
                  <p className="font-bold text-slate-700 mt-1">1.5 Tons (1500 kg)</p>
                </div>
              </div>
            </div>

            {/* 3. NEW: Compliance & Legal Documents */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck size={18} className="text-emerald-600"/> 
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest">Compliance & Documents</h3>
                </div>
                <button className="text-xs font-bold text-blue-600 hover:underline">Update Documents</button>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Driver License */}
                <div className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl bg-slate-50 hover:border-blue-200 transition-colors">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-blue-600 shadow-sm"><CreditCard size={24}/></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-800">Driver License (DL)</h4>
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Valid</span>
                    </div>
                    <p className="text-xs font-mono text-slate-500 mb-1">DL-14-20200012345</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Exp: 15 Oct 2032</p>
                  </div>
                </div>

                {/* RC Book */}
                <div className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl bg-slate-50 hover:border-blue-200 transition-colors">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-blue-600 shadow-sm"><FileText size={24}/></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-800">RC Book (Registration)</h4>
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Valid</span>
                    </div>
                    <p className="text-xs font-mono text-slate-500 mb-1">KA-05-MQ-1234</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Issued: 10 Jan 2021</p>
                  </div>
                </div>

                {/* National/State Permit */}
                <div className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl bg-slate-50 hover:border-blue-200 transition-colors">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-indigo-600 shadow-sm"><BadgeCheck size={24}/></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-800">Goods Carriage Permit</h4>
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Valid</span>
                    </div>
                    <p className="text-xs font-medium text-slate-500 mb-1">All India National Permit</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Exp: 22 Aug 2026</p>
                  </div>
                </div>

                {/* Insurance / PUC - Showing a Warning State */}
                <div className="flex items-start gap-4 p-4 border border-amber-200 rounded-xl bg-amber-50 hover:border-amber-300 transition-colors">
                  <div className="bg-white p-2.5 rounded-lg border border-amber-200 text-amber-500 shadow-sm"><AlertTriangle size={24}/></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-800">Vehicle Insurance</h4>
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Expiring Soon</span>
                    </div>
                    <p className="text-xs font-medium text-slate-500 mb-1">Comprehensive Cover (ICICI)</p>
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Exp: 15 Days Left</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* COLUMN 3: Settings Links */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
              <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600 border border-blue-100"><FileText size={20}/></div>
                  <div className="text-left">
                    <span className="block font-bold text-slate-800 text-sm">Upload Documents</span>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Manage PDF/Images</span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors"/>
              </button>
              
              <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-50 p-2.5 rounded-xl text-amber-600 border border-amber-100"><HelpCircle size={20}/></div>
                  <div className="text-left">
                    <span className="block font-bold text-slate-800 text-sm">Help & Support</span>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">24/7 Assistance</span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors"/>
              </button>

              <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-100 p-2.5 rounded-xl text-slate-600 border border-slate-200"><Settings size={20}/></div>
                  <span className="font-bold text-slate-800 text-sm">App Preferences</span>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors"/>
              </button>
            </div>

            <button className="w-full bg-white text-red-600 border border-red-200 p-4 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-red-50 hover:border-red-300 transition-all shadow-sm">
              <LogOut size={18}/> Sign Out
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DriverProfile;