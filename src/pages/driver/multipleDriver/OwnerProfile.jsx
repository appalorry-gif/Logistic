import React, { useState } from 'react';
import { 
  Building2, Settings, HelpCircle, LogOut, Phone, Mail, MapPin, 
  ShieldCheck, CreditCard, FileText, Edit2, Save, FileCheck, 
  ChevronRight, Landmark, Briefcase, Globe, Fingerprint, Activity,
  CheckCircle2 // <--- ADD THIS
} from 'lucide-react';
// Added onBackToDriver prop to handle the navigation back
const OwnerProfile = ({ userName = "Muthu Logistics Pvt Ltd", onBackToDriver }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: userName,
    ownerName: 'Muthukumar S.',
    phone: '+91 99887 76655',
    secondaryPhone: '+91 99443 22110',
    email: 'admin@muthulogistics.com',
    hqLocation: 'Guindy, Chennai, TN',
    yardLocation: 'Thanjavur Highway, TN',
    gstin: '33AABCM1234D1Z5',
    panNumber: 'AABCM1234D',
    msmeReg: 'UDYAM-TN-21-0098745',
    tradeLicense: 'CHN/TRL/2024/9921',
    bankAccount: 'XXXX XXXX 5564',
    bankIfsc: 'HDFC0001234',
    bankBranch: 'Main Branch, Chennai'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="font-sans text-slate-800 animate-fade-in w-full pb-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-3 text-slate-900">
            <Building2 size={28} className="text-blue-600"/> Enterprise Profile
          </h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">Review credentials and business infrastructure settings.</p>
        </div>
        
        <div className="flex gap-3">
            {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl shadow-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors">
                <Edit2 size={16}/> Edit Details
            </button>
            ) : (
            <div className="flex gap-3">
                <button onClick={() => setIsEditing(false)} className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl shadow-sm font-bold">Cancel</button>
                <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl shadow-md font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <Save size={16}/> Save Changes
                </button>
            </div>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        <div className="xl:col-span-2 space-y-6">
          
          {/* 1. LEGAL IDENTITY & INFRASTRUCTURE */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-24 h-24 bg-blue-600 text-white rounded-3xl flex items-center justify-center font-black text-4xl shadow-lg shadow-blue-200 shrink-0">
                        {formData.companyName.charAt(0)}
                    </div>
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100 uppercase tracking-tighter">Gold Partner</span>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 border-b border-slate-50 pb-4 mb-2">
                        {!isEditing ? (
                            <h2 className="text-3xl font-black text-slate-900">{formData.companyName}</h2>
                        ) : (
                            <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="w-full text-2xl font-black border-b-2 border-blue-500 outline-none p-1" />
                        )}
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Established Fleet Operator</p>
                    </div>
                    
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Fingerprint size={12}/> Trade License</p>
                        {!isEditing ? <p className="font-bold text-slate-700">{formData.tradeLicense}</p> : <input name="tradeLicense" value={formData.tradeLicense} onChange={handleInputChange} className="w-full bg-slate-50 border p-2 rounded-lg text-sm font-bold"/>}
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><ShieldCheck size={12}/> MSME Registration</p>
                        {!isEditing ? <p className="font-bold text-slate-700">{formData.msmeReg}</p> : <input name="msmeReg" value={formData.msmeReg} onChange={handleInputChange} className="w-full bg-slate-50 border p-2 rounded-lg text-sm font-bold"/>}
                    </div>
                </div>
            </div>
          </div>

          {/* 2. CONTACT HUB */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Globe size={16} className="text-blue-500"/> Operational Contact Hub
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Primary Mobile</p><p className="font-bold text-slate-800">{formData.phone}</p></div>
                <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Backup Mobile</p><p className="font-bold text-slate-800">{formData.secondaryPhone}</p></div>
                <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Enterprise Email</p><p className="font-bold text-blue-600 underline">{formData.email}</p></div>
              </div>
              <div className="space-y-4 border-l pl-8 border-slate-100">
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1"><Building2 size={12}/> Registered HQ</p>
                    <p className="font-bold text-slate-700 text-sm">{formData.hqLocation}</p>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1"><MapPin size={12}/> Primary Yard</p>
                    <p className="font-bold text-slate-700 text-sm">{formData.yardLocation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. TAX & BANKING */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2"><CreditCard size={18} className="text-emerald-600"/><h3 className="font-bold text-sm text-slate-800 uppercase tracking-widest">Financial Vault</h3></div>
                <span className="text-[10px] font-black text-emerald-600 flex items-center gap-1"><CheckCircle2 size={12}/> Bank Verified</span>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="grid grid-cols-2 gap-4 border-r border-slate-100 pr-8">
                    <div><p className="text-[10px] uppercase font-bold text-slate-400 mb-1">GSTIN</p><p className="font-mono font-bold text-slate-800">{formData.gstin}</p></div>
                    <div><p className="text-[10px] uppercase font-bold text-slate-400 mb-1">PAN Card</p><p className="font-mono font-bold text-slate-800">{formData.panNumber}</p></div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600"><Landmark size={20}/></div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Payout Account</p>
                            <p className="font-bold font-mono text-slate-800">{formData.bankAccount}</p>
                            <p className="text-xs text-slate-400 font-medium">{formData.bankIfsc} • {formData.bankBranch}</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACCOUNT HEALTH & ACTIONS */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* Profile Completion Card */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <Activity className="absolute -right-4 -bottom-4 w-24 h-24 text-white opacity-5"/>
            <h3 className="font-black text-sm uppercase tracking-widest mb-4">Enterprise Health</h3>
            <div className="flex justify-between items-end mb-2">
                <span className="text-3xl font-black">92%</span>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">KYC Complete</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
                <div className="bg-blue-500 h-full w-[92%] shadow-[0_0_12px_rgba(59,130,246,0.5)]"></div>
            </div>
            <p className="text-xs text-slate-400 font-medium">Verify your secondary yard location to reach 100% and unlock higher load limits.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-100">
            <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 group transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600"><FileText size={20}/></div>
                <div className="text-left">
                  <span className="block font-bold text-slate-800 text-sm group-hover:text-blue-600">Company Documents</span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Manage PDF/KYC</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300"/>
            </button>
            
            <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 group transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-amber-50 p-2.5 rounded-xl text-amber-600"><HelpCircle size={20}/></div>
                <div className="text-left">
                  <span className="block font-bold text-slate-800 text-sm group-hover:text-amber-600">Enterprise Support</span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">24/7 Priority Desk</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300"/>
            </button>
          </div>

          {/* Special Logout: Back to Driver Mode */}
          <div className="p-2">
            <button 
                onClick={onBackToDriver}
                className="w-full bg-white text-slate-600 border border-slate-200 p-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all shadow-sm"
            >
                <LogOut size={18}/> Exit Enterprise Portal
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-3 font-bold px-4 uppercase tracking-tighter">Returning to driver mode will disable fleet-wide management features.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OwnerProfile;