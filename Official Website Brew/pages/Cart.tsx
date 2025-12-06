import React, { useState } from 'react';
import { useAppContext } from '../App';
import { Trash2, Plus, Minus, CreditCard, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useAppContext();
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-serif font-bold text-stone-800 mb-4">Your cart is empty</h2>
        <p className="text-stone-600 mb-8">Looks like you haven't added any bulk brews yet.</p>
        <Link to="/drinks" className="px-8 py-3 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      <h1 className="text-4xl font-serif font-bold text-stone-900 mb-12">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg shadow-sm border border-stone-100">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0" />
              <div className="flex-grow sm:ml-6 text-center sm:text-left">
                <h3 className="text-lg font-bold text-stone-900">{item.name}</h3>
                <p className="text-sm text-stone-500">{item.unit} | {item.category}</p>
                <div className="text-amber-700 font-bold mt-1">${item.price.toFixed(2)}</div>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <div className="flex items-center border border-stone-300 rounded-md">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-stone-100 text-stone-600"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium text-stone-900 w-12 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-stone-100 text-stone-600"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 sticky top-24">
            <h3 className="text-xl font-bold text-stone-900 mb-6 font-serif">Order Summary</h3>
            
            <div className="space-y-3 text-sm text-stone-600 mb-6 pb-6 border-b border-stone-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping {subtotal > 100 && '(Free)'}</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (Est.)</span>
                <span>${(subtotal * 0.08).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between text-lg font-bold text-stone-900 mb-8">
              <span>Total</span>
              <span>${(total + (subtotal * 0.08)).toFixed(2)}</span>
            </div>

            <button 
              onClick={() => setShowPaymentInfo(true)}
              className="w-full bg-stone-900 text-white py-4 rounded-md font-bold hover:bg-amber-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Lock className="h-4 w-4" />
              <span>Proceed to Checkout</span>
            </button>
            <p className="text-xs text-center text-stone-500 mt-4">
              Secure checkout powered by Stripe (Mock)
            </p>
          </div>
        </div>
      </div>

      {/* Payment Integration Explanation Modal */}
      {showPaymentInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-amber-600" />
                  Payment Integration Guide
                </h2>
                <button 
                  onClick={() => setShowPaymentInfo(false)}
                  className="text-stone-400 hover:text-stone-600"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              <div className="prose prose-stone prose-sm">
                <p className="lead text-lg text-stone-700 mb-4">
                  Since this is a frontend demo, actual credit card processing isn't active. 
                  Here is exactly how you would integrate payments for this Coffee Shop website:
                </p>

                <h3 className="font-bold text-stone-900 text-lg mt-4">1. Choose a Payment Provider</h3>
                <p>The industry standard for React apps is <strong>Stripe</strong>. It's secure, developer-friendly, and handles PCI compliance.</p>

                <h3 className="font-bold text-stone-900 text-lg mt-4">2. Backend Requirements</h3>
                <p>You cannot process payments securely purely on the frontend (React). You need a small backend (Node.js, Python, or Firebase Functions) to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Keep your Stripe Secret Key hidden.</li>
                  <li>Create a "Payment Intent" when the user clicks checkout.</li>
                  <li>Calculate the total price on the server (never trust the client-side price).</li>
                </ul>

                <h3 className="font-bold text-stone-900 text-lg mt-4">3. Frontend Implementation Steps</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Install <code>@stripe/react-stripe-js</code> and <code>@stripe/stripe-js</code>.</li>
                  <li>Wrap your app (or checkout route) in the <code>&lt;Elements&gt;</code> provider.</li>
                  <li>Create a Checkout Form component using <code>PaymentElement</code>.</li>
                  <li>On submit, call <code>stripe.confirmPayment()</code>.</li>
                </ol>

                <div className="bg-stone-100 p-4 rounded mt-4 font-mono text-xs">
                  {`// Example React Integration
const handleSubmit = async (event) => {
  event.preventDefault();
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: { return_url: "https://your-site.com/success" },
  });
};`}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-100 flex justify-end">
                <button 
                  onClick={() => setShowPaymentInfo(false)}
                  className="px-6 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800"
                >
                  Close & Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;