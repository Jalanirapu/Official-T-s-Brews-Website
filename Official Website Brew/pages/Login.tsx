import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { Coffee, Lock, User } from 'lucide-react';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'customer' | 'admin'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Only for admin mock
  const [name, setName] = useState(''); // Only for customer registration mock
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'customer') {
      // Mock customer login - just needs name/email
      if (!name || !email) return;
      login(name, email, 'customer');
      navigate('/profile');
    } else {
      // Mock admin login
      if (email === 'admin@tscoffee.com' && password === 'admin') {
        login('Admin User', email, 'admin');
        navigate('/reviews'); // Redirect admin to reviews for moderation
      } else {
        alert('Invalid Admin Credentials. Try: admin@tscoffee.com / admin');
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-stone-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden border border-stone-100">
        
        {/* Header */}
        <div className="bg-stone-900 p-8 text-center">
          <Coffee className="h-10 w-10 text-amber-500 mx-auto mb-2" />
          <h2 className="text-2xl font-serif font-bold text-white">Welcome Back</h2>
          <p className="text-stone-400 text-sm">Sign in to your account</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200">
          <button
            className={`flex-1 py-4 text-sm font-bold transition-colors ${
              activeTab === 'customer' 
                ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50/50' 
                : 'text-stone-500 hover:bg-stone-50'
            }`}
            onClick={() => setActiveTab('customer')}
          >
            Customer
          </button>
          <button
            className={`flex-1 py-4 text-sm font-bold transition-colors ${
              activeTab === 'admin' 
                ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50/50' 
                : 'text-stone-500 hover:bg-stone-50'
            }`}
            onClick={() => setActiveTab('admin')}
          >
            Admin Access
          </button>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            
            {activeTab === 'customer' && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Your Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-stone-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder={activeTab === 'admin' ? "admin@tscoffee.com" : "jane@example.com"}
                />
              </div>
            </div>

            {activeTab === 'admin' && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-stone-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-3 rounded-md font-bold hover:bg-amber-700 transition-colors mt-6"
            >
              {activeTab === 'customer' ? 'Sign In / Register' : 'Admin Login'}
            </button>
          </form>
          
          {activeTab === 'admin' && (
             <p className="mt-4 text-xs text-stone-500 text-center bg-stone-100 p-2 rounded">
                 Hint: Use <strong>admin@tscoffee.com</strong> / <strong>admin</strong>
             </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;