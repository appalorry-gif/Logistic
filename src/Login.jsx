import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Truck, Package, ArrowRight, Shield, User, Building2, Command, ChevronDown } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [expandedRole, setExpandedRole] = useState(null); // Controls which menu slides open
  const [showForm, setShowForm] = useState(false); // Controls showing the login form
  const [selectedFullRole, setSelectedFullRole] = useState({ main: '', sub: '', title: '' });
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      onLogin(selectedFullRole, email);
      setIsLoading(false);
    }, 1000);
  };

  const handleSubRoleClick = (mainRole, subId, title) => {
    setSelectedFullRole({ main: mainRole, sub: subId, title: title });
    setShowForm(true);
    setError('');
  };

  const resetSelection = () => {
    setShowForm(false);
    setExpandedRole(null);
    setEmail('');
    setPassword('');
  };

  const fillDemo = () => {
    setEmail(`demo@${selectedFullRole.sub}.com`);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center px-4 py-8 font-sans">
      <div className="w-full max-w-md">
        
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl mb-4 shadow-lg">
            <Truck size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">MRG Logistics</h1>
          <p className="text-slate-500 text-sm mt-2">Smart Connection Platform</p>
        </div>

        {!showForm ? (
          <div className="space-y-4 animate-fade-in">
            <p className="text-center text-slate-600 font-bold mb-6">Select Your Account Type</p>

            {/* --- DRIVER SECTION (Direct Click to Form) --- */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden transition-all duration-300 hover:border-blue-500 hover:shadow-lg cursor-pointer group">
              <button 
                onClick={() => handleSubRoleClick('driver', 'single', 'Driver')} 
                className="w-full p-6 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Truck size={28} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-slate-900 font-bold text-lg">Driver</h3>
                    <p className="text-slate-500 text-xs">Find loads to transport</p>
                  </div>
                </div>
                <ArrowRight size={24} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
              </button>
            </div>

            {/* --- CUSTOMER SECTION (Dropdown) --- */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden transition-all duration-300">
              <button onClick={() => setExpandedRole(expandedRole === 'customer' ? null : 'customer')} className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 flex items-center justify-center"><Package size={28} className="text-white" /></div>
                  <div className="text-left"><h3 className="text-slate-900 font-bold text-lg">Customer</h3><p className="text-slate-500 text-xs">Ship your products</p></div>
                </div>
                <ChevronDown size={24} className={`text-slate-400 transition-transform duration-300 ${expandedRole === 'customer' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`bg-slate-50 border-t border-slate-100 transition-all duration-300 ${expandedRole === 'customer' ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 space-y-2">
                  <button onClick={() => handleSubRoleClick('customer', 'public', 'Public Customer')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-100 text-emerald-900 transition-colors text-left">
                    <User size={18} className="text-emerald-600" /><span className="font-semibold text-sm">Public (Individual)</span>
                  </button>
                  <button onClick={() => handleSubRoleClick('customer', 'company', 'Company Customer')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-100 text-emerald-900 transition-colors text-left">
                    <Building2 size={18} className="text-emerald-600" /><span className="font-semibold text-sm">Company (Enterprise)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* --- ADMIN SECTION (Dropdown) --- */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden transition-all duration-300">
              <button onClick={() => setExpandedRole(expandedRole === 'admin' ? null : 'admin')} className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center"><Shield size={28} className="text-white" /></div>
                  <div className="text-left"><h3 className="text-slate-900 font-bold text-lg">System Admin</h3><p className="text-slate-500 text-xs">Manage platform & users</p></div>
                </div>
                <ChevronDown size={24} className={`text-slate-400 transition-transform duration-300 ${expandedRole === 'admin' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`bg-slate-50 border-t border-slate-100 transition-all duration-300 ${expandedRole === 'admin' ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 space-y-2">
                  <button onClick={() => handleSubRoleClick('admin', 'regular', 'System Admin')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-purple-100 text-purple-900 transition-colors text-left">
                    <Shield size={18} className="text-purple-600" /><span className="font-semibold text-sm">Admin</span>
                  </button>
                  <button onClick={() => handleSubRoleClick('admin', 'super', 'Super Admin')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-purple-100 text-purple-900 transition-colors text-left">
                    <Command size={18} className="text-purple-600" /><span className="font-semibold text-sm">Super Admin</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        ) : (
          
          /* --- LOGIN FORM SECTION --- */
          <div className="space-y-6 animate-slide-in">
            <button onClick={resetSelection} className="text-slate-500 hover:text-slate-800 text-sm font-semibold flex items-center gap-1 transition-colors">← Back to roles</button>
            <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 space-y-5 relative overflow-hidden">
              <div className="text-center mb-6 pb-6 border-b border-slate-100">
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-2
                  ${selectedFullRole.main === 'driver' ? 'bg-blue-100 text-blue-700' : ''}
                  ${selectedFullRole.main === 'customer' ? 'bg-emerald-100 text-emerald-700' : ''}
                  ${selectedFullRole.main === 'admin' ? 'bg-purple-100 text-purple-700' : ''}
                `}>{selectedFullRole.title}</span>
                <h2 className="text-xl font-bold text-slate-800">Account Login</h2>
              </div>
              
              <div>
                <label className="text-slate-700 text-sm font-bold block mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3.5 text-slate-400" />
                  <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all"/>
                </div>
              </div>

              <div>
                <label className="text-slate-700 text-sm font-bold block mb-2">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3.5 text-slate-400" />
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }} placeholder="Enter your password" className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all"/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3"><p className="text-red-700 text-sm font-medium">{error}</p></div>}

              <button type="submit" disabled={isLoading} className={`w-full py-3.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 text-white shadow-lg disabled:opacity-70 disabled:cursor-not-allowed
                  ${selectedFullRole.main === 'driver' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30' : ''}
                  ${selectedFullRole.main === 'customer' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30' : ''}
                  ${selectedFullRole.main === 'admin' ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/30' : ''}
                `}>
                {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <>Secure Login <ArrowRight size={18} /></>}
              </button>

              <button type="button" onClick={fillDemo} className="w-full py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors">Autofill Demo Credentials</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;