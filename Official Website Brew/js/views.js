import { getState } from './store.js';

// Icons SVG Map for ease of use
const Icons = {
  Coffee: `<i data-lucide="coffee"></i>`,
  ShoppingBag: `<i data-lucide="shopping-bag"></i>`,
  User: `<i data-lucide="user"></i>`,
  Menu: `<i data-lucide="menu"></i>`,
  X: `<i data-lucide="x"></i>`,
  Star: `<i data-lucide="star"></i>`,
  Trash: `<i data-lucide="trash-2"></i>`,
  Plus: `<i data-lucide="plus"></i>`,
  Minus: `<i data-lucide="minus"></i>`,
  Check: `<i data-lucide="check"></i>`,
  MapPin: `<i data-lucide="map-pin"></i>`,
  CreditCard: `<i data-lucide="credit-card"></i>`,
  Package: `<i data-lucide="package"></i>`,
  Lock: `<i data-lucide="lock"></i>`
};

export const Navbar = () => {
  const { cart, user } = getState();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return `
    <nav class="fixed top-0 w-full z-50 bg-stone-900 text-stone-100 shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <a href="#/" class="flex items-center space-x-2 font-serif text-2xl font-bold tracking-wider">
            <span class="text-amber-500">${Icons.Coffee}</span>
            <span>T's Coffee & Brews</span>
          </a>

          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-8">
              <a href="#/" class="text-stone-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="#/drinks" class="text-stone-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Drinks</a>
              <a href="#/merch" class="text-stone-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Merchandise</a>
              <a href="#/about" class="text-stone-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="#/reviews" class="text-stone-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Reviews</a>
            </div>
          </div>

          <div class="hidden md:flex items-center space-x-6">
            <a href="#/cart" class="relative p-2 hover:text-amber-500 transition-colors">
              ${Icons.ShoppingBag}
              ${totalItems > 0 ? `<span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-amber-600 rounded-full">${totalItems}</span>` : ''}
            </a>

            ${user ? `
               <div class="flex items-center space-x-4">
                 <a href="#/profile" class="flex items-center space-x-2 text-stone-300 hover:text-amber-500">
                   ${Icons.User}
                   <span class="text-sm font-medium">${user.role === 'admin' ? 'Admin' : 'Profile'}</span>
                 </a>
                 <button data-action="logout" class="text-sm text-stone-400 hover:text-white">Logout</button>
               </div>
            ` : `
              <a href="#/login" class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold rounded-full transition-colors">Login</a>
            `}
          </div>
          
          <!-- Mobile Menu Button (simplified for vanilla demo) -->
          <div class="-mr-2 flex md:hidden">
             <a href="#/cart" class="text-white p-2">Cart (${totalItems})</a>
          </div>
        </div>
      </div>
    </nav>
  `;
};

export const Footer = () => `
  <footer class="bg-stone-900 text-stone-400 py-12 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <div class="flex items-center space-x-2 text-white font-serif text-xl font-bold mb-4">
          <span class="text-amber-500">${Icons.Coffee}</span>
          <span>T's Coffee & Brews</span>
        </div>
        <p class="text-sm leading-relaxed">Crafting the finest bulk beverages for homes, offices, and events.</p>
      </div>
      <div>
        <h3 class="text-white font-bold mb-4">Quick Links</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="#/drinks" class="hover:text-amber-500">Shop Drinks</a></li>
          <li><a href="#/merch" class="hover:text-amber-500">Merchandise</a></li>
        </ul>
      </div>
      <div>
        <p class="text-xs">© 2024 T's Coffee & Brews.</p>
      </div>
    </div>
  </footer>
`;

const ProductCard = (product) => `
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group">
    <div class="relative h-64 overflow-hidden">
      <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
      <div class="absolute top-2 right-2 bg-stone-900/80 text-white text-xs px-2 py-1 rounded">${product.category}</div>
    </div>
    <div class="p-6 flex flex-col flex-grow">
      <h3 class="text-xl font-bold text-stone-800 font-serif mb-2">${product.name}</h3>
      <p class="text-stone-600 text-sm mb-4 flex-grow">${product.description}</p>
      <div class="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
        <div>
          <span class="text-lg font-bold text-amber-700">$${product.price.toFixed(2)}</span>
          <span class="text-xs text-stone-500 block">/ ${product.unit}</span>
        </div>
        <button 
          data-action="add-to-cart" 
          data-id="${product.id}"
          class="flex items-center space-x-1 bg-stone-800 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          ${Icons.Plus} <span>Add</span>
        </button>
      </div>
    </div>
  </div>
`;

// --- Pages ---

export const Home = () => `
  <div class="flex flex-col">
    <section class="relative h-[80vh] flex items-center justify-center">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" class="w-full h-full object-cover brightness-50" />
      </div>
      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
          T's Coffee <br/> <span class="text-amber-500">&</span> Brews
        </h1>
        <p class="text-xl md:text-2xl text-stone-200 mb-8 max-w-2xl mx-auto">
          From farm-fresh coffee grounds to gallons of sweet tea. We supply the soul of your gathering.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#/drinks" class="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full transition-all text-lg">Shop Drinks</a>
          <a href="#/merch" class="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-bold rounded-full transition-all text-lg">Merchandise</a>
        </div>
      </div>
    </section>
    <section class="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl font-serif font-bold text-stone-900 mb-12">Featured Products</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${getState().products.slice(0, 3).map(ProductCard).join('')}
      </div>
    </section>
  </div>
`;

export const Drinks = () => {
  const { products } = getState();
  const cats = ['Coffee (Bulk)', 'Coffee Subscription', 'Hot Chocolate', 'Cold Drink (Gallons)'];
  
  const sections = cats.map(cat => {
    const items = products.filter(p => p.category === cat);
    return `
      <div class="py-16 border-b border-stone-200 last:border-0">
        <h2 class="text-3xl font-serif font-bold text-stone-800 mb-6">${cat}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${items.map(ProductCard).join('')}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      <h1 class="text-5xl font-serif font-bold text-stone-900 mb-6 text-center">Our Drinks Menu</h1>
      ${sections}
    </div>
  `;
};

export const Merch = () => {
  const items = getState().products.filter(p => p.category === 'Merchandise');
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      <h1 class="text-5xl font-serif font-bold text-stone-900 mb-12 text-center">Merchandise</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${items.map(ProductCard).join('')}
      </div>
    </div>
  `;
};

export const About = () => `
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
    <h1 class="text-5xl font-serif font-bold text-stone-900 mb-6 text-center">Our Story</h1>
    <div class="prose prose-stone prose-lg mx-auto text-stone-700">
      <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" class="w-full h-80 object-cover rounded-xl shadow-lg mb-12" />
      <p class="mb-6">Founded in 2020, <strong>T's Coffee & Brews</strong> started with a simple mission: to make high-quality beverages accessible in bulk.</p>
    </div>
  </div>
`;

export const Reviews = () => {
  const { reviews, user } = getState();
  const isAdmin = user?.role === 'admin';
  const displayedReviews = isAdmin ? reviews : reviews.filter(r => r.approved);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      <div class="text-center mb-16">
        <h1 class="text-5xl font-serif font-bold text-stone-900 mb-6">${isAdmin ? 'Review Moderation' : 'Customer Reviews'}</h1>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        ${!isAdmin ? `
          <div class="lg:col-span-1">
            <div class="bg-white p-6 rounded-xl shadow-lg border border-stone-100 sticky top-24">
              <h3 class="text-2xl font-bold text-stone-800 mb-4">Write a Review</h3>
              <form id="review-form" class="space-y-4">
                <input type="text" name="author" required placeholder="Your Name" class="w-full px-3 py-2 border border-stone-300 rounded-md" />
                <select name="rating" class="w-full px-3 py-2 border border-stone-300 rounded-md">
                   <option value="5">5 Stars</option>
                   <option value="4">4 Stars</option>
                   <option value="3">3 Stars</option>
                   <option value="2">2 Stars</option>
                   <option value="1">1 Star</option>
                </select>
                <textarea name="text" required placeholder="Your review..." rows="4" class="w-full px-3 py-2 border border-stone-300 rounded-md"></textarea>
                <button type="submit" class="w-full bg-stone-900 text-white py-3 rounded-md font-bold hover:bg-stone-800">Submit Review</button>
              </form>
            </div>
          </div>
        ` : ''}
        
        <div class="${isAdmin ? 'lg:col-span-3' : 'lg:col-span-2'} space-y-6">
          ${displayedReviews.length === 0 ? '<p>No reviews yet.</p>' : displayedReviews.map(r => `
            <div class="bg-white p-6 rounded-lg shadow-sm border ${r.approved ? 'border-stone-100' : 'border-amber-200 bg-amber-50'}">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-bold text-stone-900">${r.author} ${!r.approved ? '<span class="text-xs bg-amber-200 px-2 rounded">Pending</span>' : ''}</h4>
                  <div class="flex text-amber-400 text-sm">${'★'.repeat(r.rating)}</div>
                </div>
                ${isAdmin ? `
                  <div class="flex space-x-2">
                    ${!r.approved ? `<button data-action="approve-review" data-id="${r.id}" class="text-green-600 hover:text-green-800 p-1">${Icons.Check}</button>` : ''}
                    <button data-action="delete-review" data-id="${r.id}" class="text-red-600 hover:text-red-800 p-1">${Icons.Trash}</button>
                  </div>
                ` : `<span class="text-xs text-stone-400">${r.date}</span>`}
              </div>
              <p class="mt-2 text-stone-700">"${r.text}"</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
};

export const Cart = () => {
  const { cart } = getState();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  if (cart.length === 0) return `
    <div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h2 class="text-3xl font-serif font-bold text-stone-800 mb-4">Your cart is empty</h2>
      <a href="#/drinks" class="px-8 py-3 bg-amber-600 text-white rounded-full font-bold">Start Shopping</a>
    </div>
  `;

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      <h1 class="text-4xl font-serif font-bold text-stone-900 mb-12">Shopping Cart</h1>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div class="lg:col-span-2 space-y-6">
          ${cart.map(item => `
            <div class="flex items-center bg-white p-4 rounded-lg shadow-sm border border-stone-100">
              <img src="${item.image}" class="w-24 h-24 object-cover rounded-md" />
              <div class="flex-grow ml-6">
                <h3 class="text-lg font-bold text-stone-900">${item.name}</h3>
                <p class="text-sm text-stone-500">${item.unit}</p>
                <div class="text-amber-700 font-bold">$${item.price.toFixed(2)}</div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="flex items-center border border-stone-300 rounded-md">
                   <button data-action="update-qty" data-id="${item.id}" data-qty="${item.quantity - 1}" class="p-2">${Icons.Minus}</button>
                   <span class="px-2">${item.quantity}</span>
                   <button data-action="update-qty" data-id="${item.id}" data-qty="${item.quantity + 1}" class="p-2">${Icons.Plus}</button>
                </div>
                <button data-action="remove-from-cart" data-id="${item.id}" class="text-red-500 hover:text-red-700">${Icons.Trash}</button>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="lg:col-span-1">
          <div class="bg-stone-50 p-6 rounded-xl border border-stone-200">
            <h3 class="text-xl font-bold mb-6">Order Summary</h3>
            <div class="space-y-3 text-sm text-stone-600 border-b border-stone-200 pb-6 mb-6">
              <div class="flex justify-between"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
              <div class="flex justify-between"><span>Shipping</span><span>${shipping === 0 ? 'Free' : '$' + shipping}</span></div>
            </div>
            <div class="flex justify-between text-lg font-bold mb-8"><span>Total</span><span>$${total.toFixed(2)}</span></div>
            <button onclick="alert('Proceeding to Stripe Checkout...')" class="w-full bg-stone-900 text-white py-4 rounded-md font-bold">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const Login = () => `
  <div class="min-h-[80vh] flex items-center justify-center px-4 bg-stone-50">
    <div class="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden border border-stone-100">
      
      <!-- Header -->
      <div class="bg-stone-900 p-8 text-center">
        <div class="mx-auto text-amber-500 w-10 h-10 mb-2">${Icons.Coffee}</div>
        <h2 class="text-2xl font-serif font-bold text-white">Welcome Back</h2>
      </div>

      <!-- Tabs -->
      <div class="flex border-b border-stone-200">
        <button
          class="login-tab flex-1 py-4 text-sm font-bold transition-colors text-amber-600 border-b-2 border-amber-600 bg-amber-50/50"
          data-tab="customer"
        >
          Customer
        </button>
        <button
          class="login-tab flex-1 py-4 text-sm font-bold transition-colors text-stone-500 hover:bg-stone-50"
          data-tab="admin"
        >
          Admin Access
        </button>
      </div>

      <!-- Form -->
      <div class="p-8">
        <form id="login-form" class="space-y-4">
          <!-- Hidden input to track current role -->
          <input type="hidden" name="role" id="login-role" value="customer">

          <!-- Customer Name Field -->
          <div id="customer-fields">
             <label class="block text-sm font-medium text-stone-700 mb-1">Your Name</label>
             <div class="relative">
                 <div class="absolute left-3 top-2.5 h-5 w-5 text-stone-400">${Icons.User}</div>
                 <input type="text" name="name" id="input-name" placeholder="Jane Doe" class="w-full pl-10 pr-3 py-2 border border-stone-300 rounded-md" />
             </div>
          </div>

          <!-- Email Field (Shared) -->
          <div>
            <label class="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
            <div class="relative">
                 <div class="absolute left-3 top-2.5 h-5 w-5 text-stone-400">${Icons.User}</div>
                 <input type="email" name="email" required placeholder="name@example.com" class="w-full pl-10 pr-3 py-2 border border-stone-300 rounded-md" />
            </div>
          </div>

          <!-- Admin Password Field -->
          <div id="admin-fields" class="hidden">
             <label class="block text-sm font-medium text-stone-700 mb-1">Password</label>
             <div class="relative">
                 <div class="absolute left-3 top-2.5 h-5 w-5 text-stone-400">${Icons.Lock}</div>
                 <input type="password" name="password" id="input-password" placeholder="••••••••" class="w-full pl-10 pr-3 py-2 border border-stone-300 rounded-md" />
             </div>
          </div>

          <button type="submit" id="login-btn" class="w-full bg-amber-600 text-white py-3 rounded-md font-bold hover:bg-amber-700 transition-colors mt-6">
            Sign In / Register
          </button>
        </form>

        <p id="admin-hint" class="hidden mt-4 text-xs text-stone-500 text-center bg-stone-100 p-2 rounded">
           Hint: Use <strong>admin@tscoffee.com</strong> / <strong>admin</strong>
        </p>
      </div>
    </div>
  </div>
`;

export const Profile = () => {
  const { user, orders } = getState();
  if (!user) {
    window.location.hash = '#/login';
    return '';
  }

  if (user.role === 'admin') {
      return `
        <div class="max-w-4xl mx-auto px-4 py-16 text-center">
            <h1 class="text-4xl font-serif font-bold mb-4">Admin Dashboard</h1>
            <p>Welcome, ${user.name}. Go to <a href="#/reviews" class="text-amber-600 underline">Reviews</a> to moderate.</p>
        </div>
      `;
  }

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      <h1 class="text-4xl font-serif font-bold text-stone-900 mb-2">My Account</h1>
      <p class="mb-12">Welcome back, ${user.name}</p>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
         <div class="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border">
            <h3 class="font-bold mb-4 flex items-center gap-2">${Icons.User} Saved Details</h3>
            <p>${user.email}</p>
            <p class="text-stone-500 text-sm mt-2">123 Coffee Lane<br>Brewtown, CA 90210</p>
         </div>
         <div class="lg:col-span-2">
            <h3 class="font-bold mb-4 flex items-center gap-2">${Icons.Package} Order History</h3>
            <div class="bg-white rounded-xl shadow-sm border border-stone-100 divide-y">
               ${orders.length > 0 ? orders.map(o => `
                 <div class="p-6">
                    <div class="flex justify-between mb-2">
                       <span class="font-bold">${o.id}</span>
                       <span class="text-xs font-bold px-2 py-1 rounded bg-stone-100">${o.status}</span>
                    </div>
                    <p class="text-sm text-stone-600">${o.itemsSummary}</p>
                    <div class="text-right font-bold mt-2">$${o.total.toFixed(2)}</div>
                 </div>
               `).join('') : '<div class="p-6 text-stone-500">No orders yet.</div>'}
            </div>
         </div>
      </div>
    </div>
  `;
};