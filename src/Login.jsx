import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Truck, Package, ArrowRight, Shield } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || !selectedRole) {
      setError('Please fill all fields and select a role');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      onLogin(selectedRole, email);
      setIsLoading(false);
    }, 1000);
  };

  const demoCredentials = {
    driver: { email: 'driver@example.com', password: 'driver123' },
    customer: { email: 'customer@example.com', password: 'customer123' },
    admin: { email: 'admin@example.com', password: 'admin123' },
  };

  const fillDemo = (role) => {
    const creds = demoCredentials[role];
    setEmail(creds.email);
    setPassword(creds.password);
    setSelectedRole(role);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl mb-4 shadow-lg">
            <Truck size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">LogisticHub</h1>
          <p className="text-slate-500 text-sm mt-2">Smart Logistics Platform</p>
        </div>

        {/* Role Selection */}
        {!selectedRole ? (
          <div className="space-y-4 mb-8">
            <p className="text-center text-slate-600 font-semibold">Choose Your Role</p>

            {/* Driver Card */}
            <button
              onClick={() => setSelectedRole('driver')}
              className="w-full p-6 rounded-2xl border-2 border-slate-200 bg-white hover:border-blue-500 hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Truck size={28} className="text-white" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-slate-900 font-bold text-lg">Driver</h3>
                  <p className="text-slate-500 text-xs">Find loads to transport</p>
                </div>
                <ArrowRight size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
              </div>
            </button>

            {/* Customer Card */}
            <button
              onClick={() => setSelectedRole('customer')}
              className="w-full p-6 rounded-2xl border-2 border-slate-200 bg-white hover:border-emerald-500 hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package size={28} className="text-white" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-slate-900 font-bold text-lg">Customer</h3>
                  <p className="text-slate-500 text-xs">Ship your products</p>
                </div>
                <ArrowRight size={20} className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
              </div>
            </button>

            {/* Admin Card */}
            <button
              onClick={() => setSelectedRole('admin')}
              className="w-full p-6 rounded-2xl border-2 border-slate-200 bg-white hover:border-purple-500 hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield size={28} className="text-white" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-slate-900 font-bold text-lg">System Admin</h3>
                  <p className="text-slate-500 text-xs">Manage platform & users</p>
                </div>
                <ArrowRight size={20} className="text-slate-300 group-hover:text-purple-600 transition-colors" />
              </div>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Back Button */}
            <button
              onClick={() => {
                setSelectedRole(null);
                setEmail('');
                setPassword('');
                setError('');
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1"
            >
              ← Back to Role Selection
            </button>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 space-y-5">
              <div>
                <label className="text-slate-700 text-sm font-bold block mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 text-sm font-bold block mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-white ${
                  selectedRole === 'driver'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg hover:shadow-blue-500/30'
                    : selectedRole === 'customer'
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:shadow-lg hover:shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-purple-600 to-purple-500 hover:shadow-lg hover:shadow-purple-500/30'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {/* Demo Login */}
              <button
                type="button"
                onClick={() => fillDemo(selectedRole)}
                className="w-full py-2 text-blue-600 hover:text-blue-700 text-xs font-semibold transition-all border border-blue-200 rounded-lg hover:bg-blue-50"
              >
                Use Demo Credentials
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;