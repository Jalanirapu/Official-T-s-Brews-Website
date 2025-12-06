import { PRODUCTS, INITIAL_REVIEWS, MOCK_ORDERS } from './data.js';

// The Single Source of Truth
const state = {
  cart: [],
  reviews: [...INITIAL_REVIEWS],
  user: null, // { name, email, role, id }
  orders: [...MOCK_ORDERS],
  products: PRODUCTS
};

// Listeners to trigger UI updates
let listeners = [];

export const subscribe = (listener) => {
  listeners.push(listener);
};

const notify = () => {
  listeners.forEach(listener => listener());
};

// Actions
export const actions = {
  addToCart: (product) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({ ...product, quantity: 1 });
    }
    notify();
  },

  removeFromCart: (productId) => {
    state.cart = state.cart.filter(item => item.id !== productId);
    notify();
  },

  updateQuantity: (productId, quantity) => {
    if (quantity < 1) return;
    const item = state.cart.find(i => i.id === productId);
    if (item) {
      item.quantity = quantity;
      notify();
    }
  },

  login: (name, email, role) => {
    state.user = { id: Date.now().toString(), name, email, role };
    notify();
  },

  logout: () => {
    state.user = null;
    notify();
  },

  addReview: (author, rating, text) => {
    const newReview = {
      id: Date.now().toString(),
      author,
      rating: parseInt(rating),
      text,
      approved: false,
      date: new Date().toISOString().split('T')[0]
    };
    state.reviews.unshift(newReview);
    notify();
  },

  approveReview: (reviewId) => {
    const review = state.reviews.find(r => r.id === reviewId);
    if (review) review.approved = true;
    notify();
  },

  deleteReview: (reviewId) => {
    state.reviews = state.reviews.filter(r => r.id !== reviewId);
    notify();
  }
};

export const getState = () => state;
