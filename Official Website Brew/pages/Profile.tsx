import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { Package, CreditCard, MapPin, Save, User } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, orders } = useAppContext();
  const [address, setAddress] = useState('123 Coffee Lane');
  const [city, setCity] = useState('Brewtown, CA 90210');
  const [card, setCard] = useState('**** **** **** 4242');
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If Admin, show a different dashboard or redirect
  if (user.role === 'admin') {
     return (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">Admin Dashboard</h1>
            <p className="text-xl text-stone-600 mb-8">Welcome, {user.name}.</p>
            <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg inline-block">
                <p>Please navigate to the <strong>Reviews</strong> page to moderate content.</p>
            </div>
        </div>
     );
  }

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would send API request
    alert("Profile information saved!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">My Account</h1>
        <p className="text-stone-600">Welcome back, {user.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                <User className="h-5 w-5 text-amber-600" />
                Saved Details
              </h3>
              <button 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="text-sm font-bold text-amber-600 hover:text-amber-700"
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">
                    Shipping Address
                </label>
                <div className="flex items-start gap-3 text-stone-700">
                    <MapPin className="h-5 w-5 mt-0.5 text-stone-400" />
                    {isEditing ? (
                        <div className="w-full space-y-2">
                            <input 
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)} 
                                className="w-full p-2 border rounded"
                            />
                            <input 
                                value={city} 
                                onChange={(e) => setCity(e.target.value)} 
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    ) : (
                        <div>
                            <p>{address}</p>
                            <p>{city}</p>
                        </div>
                    )}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">
                    Payment Method
                </label>
                <div className="flex items-center gap-3 text-stone-700">
                    <CreditCard className="h-5 w-5 text-stone-400" />
                    {isEditing ? (
                         <input 
                            value={card} 
                            onChange={(e) => setCard(e.target.value)} 
                            className="w-full p-2 border rounded"
                         />
                    ) : (
                        <p className="font-mono">{card}</p>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order History */}
        <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
                <div className="p-6 border-b border-stone-100">
                    <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                        <Package className="h-5 w-5 text-amber-600" />
                        Order History
                    </h3>
                </div>

                {orders.length === 0 ? (
                    <div className="p-12 text-center text-stone-500">
                        No orders found. Time to start brewing!
                    </div>
                ) : (
                    <div className="divide-y divide-stone-100">
                        {orders.map((order) => (
                            <div key={order.id} className="p-6 hover:bg-stone-50 transition-colors">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                                    <div className="mb-2 sm:mb-0">
                                        <span className="font-bold text-stone-900">{order.id}</span>
                                        <span className="text-stone-400 mx-2">•</span>
                                        <span className="text-stone-500 text-sm">{order.date}</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block text-center w-fit ${
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                        'bg-amber-100 text-amber-700'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                                <p className="text-stone-600 text-sm mb-2">{order.itemsSummary}</p>
                                <div className="text-right font-bold text-stone-900">
                                    ${order.total.toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;