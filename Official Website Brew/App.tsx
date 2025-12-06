import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Product, CartItem, Review, ReviewSubmission, User, Order } from './types';
import { INITIAL_REVIEWS } from './constants';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Drinks from './pages/Drinks';
import Merchandise from './pages/Merchandise';
import About from './pages/About';
import Reviews from './pages/Reviews';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Footer from './components/Footer';

// --- Context Setup ---

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  reviews: Review[];
  addReview: (submission: ReviewSubmission) => void;
  approveReview: (reviewId: string) => void;
  deleteReview: (reviewId: string) => void;
  user: User | null;
  login: (name: string, email: string, role: 'admin' | 'customer') => void;
  logout: () => void;
  orders: Order[]; // Mock orders for the current user
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within a AppProvider');
  return context;
};

// --- Main App Component ---

const App: React.FC = () => {
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Review State
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // User State
  const [user, setUser] = useState<User | null>(null);

  // Mock Orders State (reset when user logs out/in in a real app, but static here)
  const [orders] = useState<Order[]>([
    { id: 'ORD-2023-881', date: '2023-12-01', status: 'Delivered', total: 45.00, itemsSummary: 'Roaster\'s Choice Box' },
    { id: 'ORD-2023-902', date: '2024-01-15', status: 'Shipped', total: 108.00, itemsSummary: 'Sumatra Mandheling (5lb), Classic Lemonade' },
    { id: 'ORD-2024-004', date: '2024-02-10', status: 'Processing', total: 28.00, itemsSummary: 'Insulated Travel Tumbler' }
  ]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const addReview = (submission: ReviewSubmission) => {
    const newReview: Review = {
      id: Date.now().toString(),
      ...submission,
      approved: false,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newReview, ...prev]); 
  };

  const approveReview = (reviewId: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, approved: true } : r));
  };

  const deleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
  };

  const login = (name: string, email: string, role: 'admin' | 'customer') => {
    setUser({ id: Date.now().toString(), name, email, role });
  };

  const logout = () => {
    setUser(null);
  };
  
  // Scroll to top on route change
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  return (
    <AppContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      reviews, addReview, approveReview, deleteReview,
      user, login, logout, orders
    }}>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-stone-50">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/drinks" element={<Drinks />} />
              <Route path="/merch" element={<Merchandise />} />
              <Route path="/about" element={<About />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;