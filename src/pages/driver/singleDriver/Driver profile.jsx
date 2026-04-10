import React, { useState } from 'react';
import { 
  User, Truck, ShieldCheck, FileText, Settings, HelpCircle, LogOut, 
  Star, MapPin, Phone, Mail, FileCheck, BadgeCheck, AlertTriangle, 
  CreditCard, Wind, ExternalLink, Briefcase, Edit2, Save, X, Building, 
  Landmark, ArrowRight, Lock, Eye, EyeOff
} from 'lucide-react';

// Make sure we extract onSwitchToOwner from props here!
const DriverProfile = ({ onSwitchToOwner }) => {
  const [isOwnerOperator, setIsOwnerOperator] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [showOwnerLogin, setShowOwnerLogin] = useState(false);
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [formData, setFormData] = useState({
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh@example.com',
    location: 'Thanjavur, TN',
    truckNum: 'TN 49 AZ 1024',
    truckModel: 'Tata Signa 1918.T',
    truckType: '20ft Container',
    payload: '12 Tons',
    ownerName: 'Muthu Logistics Pvt Ltd',
    ownerPhone: '+91 99887 76655',
    ownerId: 'OWN-9921-TN',
    businessName: 'Rajesh Transport Services',
    gstin: '33AABCR1234D1Z5',
    panNumber: 'AABCR1234D',
    bankAccount: 'XXXX XXXX 8890',
    bankIfsc: 'SBIN0001234'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOwnerLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!ownerEmail || !ownerPassword) {
      setLoginError('Please enter your credentials.');
      return;
    }

    setIsLoggingIn(true);
    
    // Log the user in and instantly switch the page!
    setTimeout(() => {
      setIsLoggingIn(false);
      setShowOwnerLogin(false);
      
      // If the function is available, run it to change the screen
      if (onSwitchToOwner) {
        onSwitchToOwner();
      } else {
        // Only show this if something broke in App.jsx
        console.error("onSwitchToOwner function was not passed down from App.jsx");
      }
    }, 1000);
  };

  const tneSevaiLink = "https://www.tnesevai.tn.gov.in/citizen/portallogin.aspx";

  return (
    <div className="w-full bg-[#F4F7FB] min-h-screen font-sans p-6 pb-24 md:pb-6 animate-fade-in relative">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Page Header & Toggles */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Driver & Vehicle Profile</h1>
            <p className="text-sm text-slate-500">Manage identity, truck ownership, and compliance</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-lg border border-slate-200 flex shadow-sm">
              <button onClick={() => setIsOwnerOperator(true)} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${isOwnerOperator ? 'bg-blue-600 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}>
                Owner Operator
              </button>
              <button onClick={() => setIsOwnerOperator(false)} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${!isOwnerOperator ? 'bg-blue-600 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}>
                Hired Driver
              </button>
            </div>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="bg-white border border-slate-200 text-slate-700 px-4 py-1.5 rounded-lg shadow-sm font-bold text-sm flex items-center gap-2 hover:bg-slate-50 transition-colors">
                <Edit2 size={16}/> Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setIsEditing(false)} className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg shadow-sm font-bold text-sm hover:bg-slate-50 transition-colors">Cancel</button>
                <button onClick={() => setIsEditing(false)} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg shadow-sm font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors"><Save size={16}/> Save</button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COLUMN 1 & 2 */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Identity */}
            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-bl-xl text-xs font-bold border-b border-l border-blue-100">
                {isOwnerOperator ? 'Owner Operator' : 'Hired Driver'}
              </div>
              <div className="relative shrink-0">
                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-black text-white shadow-lg">{formData.name.charAt(0)}</div>
                <div className="absolute bottom-0 right-0 bg-emerald-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-md"><ShieldCheck size={16} className="text-white" /></div>
              </div>
              <div className="flex-1 w-full">
                {!isEditing ? (
                  <>
                    <h3 className="text-2xl font-black text-slate-800 text-center sm:text-left">{formData.name}</h3>
                    <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mt-1 text-center sm:text-left">Platform ID: DRV-4492</p>
                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 mt-4 mb-4 sm:mb-0">
                      <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-100 flex items-center gap-1.5"><ShieldCheck size={14}/> Verified</span>
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100"><Star size={14} className="fill-amber-500"/> 4.8 Rating</span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3 w-full">
                    <div><label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" /></div>
                  </div>
                )}
              </div>
              <div className="w-full sm:w-auto flex flex-col gap-3 sm:border-l border-slate-100 sm:pl-6">
                {!isEditing ? (
                  <>
                    <div className="flex items-center justify-center sm:justify-start gap-3 text-sm text-slate-600"><Phone size={16} className="text-slate-400"/> {formData.phone}</div>
                    <div className="flex items-center justify-center sm:justify-start gap-3 text-sm text-slate-600"><Mail size={16} className="text-slate-400"/> {formData.email}</div>
                    <div className="flex items-center justify-center sm:justify-start gap-3 text-sm text-slate-600"><MapPin size={16} className="text-slate-400"/> {formData.location}</div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Location" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Truck Details */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2"><Truck size={18} className="text-blue-600"/> <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest">Assigned Truck Details</h3></div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div><p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Truck Number</p>{!isEditing ? <p className="font-black text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 inline-block">{formData.truckNum}</p> : <input type="text" name="truckNum" value={formData.truckNum} onChange={handleInputChange} className="w-full p-2 bg-white border border-blue-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500" />}</div>
                <div><p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Vehicle Model</p>{!isEditing ? <p className="font-bold text-slate-700 mt-1">{formData.truckModel}</p> : <input type="text" name="truckModel" value={formData.truckModel} onChange={handleInputChange} className="w-full p-2 bg-white border border-blue-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500" />}</div>
                <div><p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Body Type</p>{!isEditing ? <p className="font-bold text-slate-700 mt-1">{formData.truckType}</p> : <input type="text" name="truckType" value={formData.truckType} onChange={handleInputChange} className="w-full p-2 bg-white border border-blue-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500" />}</div>
                <div><p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Max Payload</p>{!isEditing ? <p className="font-bold text-slate-700 mt-1">{formData.payload}</p> : <input type="text" name="payload" value={formData.payload} onChange={handleInputChange} className="w-full p-2 bg-white border border-blue-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500" />}</div>
              </div>

              {/* DYNAMIC SECTION */}
              {!isOwnerOperator ? (
                <div className="mx-6 mb-6 p-5 bg-indigo-50 border border-indigo-100 rounded-xl relative">
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-indigo-500 rounded-l-xl"></div>
                  <h4 className="flex items-center gap-2 font-bold text-indigo-900 text-sm mb-4 pl-2"><Briefcase size={16} className="text-indigo-600"/> Registered Vehicle Owner</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-2">
                    <div><p className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest mb-1">Company Name</p>{!isEditing ? <p className="font-bold text-slate-700">{formData.ownerName}</p> : <input type="text" name="ownerName" value={formData.ownerName} onChange={handleInputChange} className="w-full p-2 bg-white border border-indigo-300 rounded-md text-sm outline-none" />}</div>
                    <div><p className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest mb-1">Contact</p>{!isEditing ? <p className="font-bold text-indigo-600">{formData.ownerPhone}</p> : <input type="text" name="ownerPhone" value={formData.ownerPhone} onChange={handleInputChange} className="w-full p-2 bg-white border border-indigo-300 rounded-md text-sm outline-none" />}</div>
                    <div><p className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest mb-1">Owner ID</p>{!isEditing ? <p className="font-bold text-slate-700">{formData.ownerId}</p> : <input type="text" name="ownerId" value={formData.ownerId} onChange={handleInputChange} className="w-full p-2 bg-white border border-indigo-300 rounded-md text-sm outline-none" />}</div>
                  </div>
                </div>
              ) : (
                <div className="mx-6 mb-6 p-5 bg-slate-50 border border-slate-200 rounded-xl relative">
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-slate-500 rounded-l-xl"></div>
                  <h4 className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-4 pl-2"><Building size={16} className="text-slate-600"/> Business & Financial Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2">
                    <div><p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Business Name</p>{!isEditing ? <p className="font-bold text-slate-700">{formData.businessName}</p> : <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} className="w-full p-2 bg-white border border-slate-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500" />}</div>
                    <div><p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">GSTIN Number</p>{!isEditing ? <p className="font-bold font-mono text-slate-700">{formData.gstin}</p> : <input type="text" name="gstin" value={formData.gstin} onChange={handleInputChange} className="w-full p-2 bg-white border border-slate-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500" />}</div>
                    <div><p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">PAN Number</p>{!isEditing ? <p className="font-bold font-mono text-slate-700">{formData.panNumber}</p> : <input type="text" name="panNumber" value={formData.panNumber} onChange={handleInputChange} className="w-full p-2 bg-white border border-slate-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500" />}</div>
                    
                    <div className="md:col-span-2 bg-white border border-emerald-100 p-3 rounded-lg mt-2 flex items-start gap-3">
                      <Landmark size={20} className="text-emerald-500 mt-1"/>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><p className="text-[10px] uppercase font-bold text-emerald-600/70 tracking-widest mb-1">Payout Account No.</p>{!isEditing ? <p className="font-bold font-mono text-slate-800">{formData.bankAccount}</p> : <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleInputChange} className="w-full p-2 bg-white border border-emerald-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-emerald-500" />}</div>
                        <div><p className="text-[10px] uppercase font-bold text-emerald-600/70 tracking-widest mb-1">IFSC Code</p>{!isEditing ? <p className="font-bold font-mono text-slate-800">{formData.bankIfsc}</p> : <input type="text" name="bankIfsc" value={formData.bankIfsc} onChange={handleInputChange} className="w-full p-2 bg-white border border-emerald-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-emerald-500" />}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Compliance & Legal Documents */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-2"><FileCheck size={18} className="text-emerald-600"/> <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest">Compliance & Documents</h3></div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col p-4 border border-amber-200 rounded-xl bg-amber-50 hover:shadow-md transition-shadow relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-white p-2.5 rounded-lg border border-amber-200 text-amber-500 shadow-sm"><CreditCard size={24}/></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1"><h4 className="font-bold text-slate-800">Driver License (DL)</h4><span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase animate-pulse">Expiring</span></div>
                      <p className="text-xs font-mono text-slate-500 mb-1">DL-14-20200012345</p><p className="text-[10px] text-red-600 font-black uppercase tracking-wider">Exp: 10 Days Left</p>
                    </div>
                  </div>
                  <a href={tneSevaiLink} target="_blank" rel="noreferrer" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-lg text-xs flex justify-center items-center gap-2 transition-colors">Renew Now on TNeSevai <ExternalLink size={14}/></a>
                </div>

                <div className="flex flex-col p-4 border border-red-200 rounded-xl bg-red-50 hover:shadow-md transition-shadow relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-white p-2.5 rounded-lg border border-red-200 text-red-500 shadow-sm"><Wind size={24}/></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1"><h4 className="font-bold text-slate-800">Air Pollution (PUC)</h4><span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Expired</span></div>
                      <p className="text-xs font-mono text-slate-500 mb-1">PUC-TN-49-9921</p><p className="text-[10px] text-red-600 font-black uppercase tracking-wider">Expired: Yesterday</p>
                    </div>
                  </div>
                  <a href={tneSevaiLink} target="_blank" rel="noreferrer" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg text-xs flex justify-center items-center gap-2 transition-colors">Renew Now on TNeSevai <ExternalLink size={14}/></a>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMN 3: Settings Links */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            
            {/* --- OWNER DASHBOARD LOGIN BUTTON --- */}
            {isOwnerOperator && (
              <button 
                onClick={() => setShowOwnerLogin(true)}
                className="w-full bg-slate-900 text-white p-5 rounded-xl flex items-center justify-between hover:bg-slate-800 transition-colors shadow-lg group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-slate-800 p-2.5 rounded-lg text-blue-400"><Building size={24}/></div>
                  <div className="text-left">
                    <span className="block font-black text-sm">Fleet Portal</span>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase mt-0.5">Manage Your Business</span>
                  </div>
                </div>
                <ArrowRight size={20} className="text-slate-500 group-hover:text-white transition-colors" />
              </button>
            )}

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
              <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-4"><div className="bg-blue-50 p-2.5 rounded-xl text-blue-600 border border-blue-100"><FileText size={20}/></div><div className="text-left"><span className="block font-bold text-slate-800 text-sm">Upload Documents</span><span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Manage PDF/Images</span></div></div>
              </button>
              <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-4"><div className="bg-amber-50 p-2.5 rounded-xl text-amber-600 border border-amber-100"><HelpCircle size={20}/></div><div className="text-left"><span className="block font-bold text-slate-800 text-sm">Help & Support</span><span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">24/7 Assistance</span></div></div>
              </button>
              <button className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-4"><div className="bg-slate-100 p-2.5 rounded-xl text-slate-600 border border-slate-200"><Settings size={20}/></div><span className="font-bold text-slate-800 text-sm">App Preferences</span></div>
              </button>
            </div>
            
            <button className="w-full bg-white text-red-600 border border-red-200 p-4 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-all shadow-sm">
              <LogOut size={18}/> Sign Out
            </button>
          </div>

        </div>
      </div>

      {/* --- FLEET OWNER LOGIN MODAL --- */}
      {showOwnerLogin && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col relative">
            <button onClick={() => setShowOwnerLogin(false)} className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"><X size={20}/></button>
            
            <div className="p-8 text-center bg-slate-900 text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/30"><Building size={32} /></div>
              <h2 className="text-2xl font-black">Fleet Portal</h2>
              <p className="text-blue-200 text-sm mt-1">Enterprise Login</p>
            </div>

            <form onSubmit={handleOwnerLoginSubmit} className="p-8 space-y-5">
              <div>
                <label className="text-slate-700 text-sm font-bold block mb-2">Company Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3.5 text-slate-400" />
                  <input type="email" value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} placeholder="admin@company.com" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              
              <div>
                <label className="text-slate-700 text-sm font-bold block mb-2">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3.5 text-slate-400" />
                  <input type={showPassword ? 'text' : 'password'} value={ownerPassword} onChange={(e) => setOwnerPassword(e.target.value)} placeholder="Enter password" className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 outline-none focus:ring-2 focus:ring-blue-500" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {loginError && <p className="text-red-600 text-sm font-bold bg-red-50 p-3 rounded-lg">{loginError}</p>}

              <button type="submit" disabled={isLoggingIn} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-white shadow-lg shadow-blue-500/30 transition-all flex justify-center items-center gap-2">
                {isLoggingIn ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <>Login to Dashboard <ArrowRight size={18}/></>}
              </button>
              <button type="button" onClick={() => { setOwnerEmail('admin@example.com'); setOwnerPassword('password'); }} className="w-full text-xs font-bold text-slate-400 hover:text-slate-600 mt-2">Autofill Demo Info</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default DriverProfile;