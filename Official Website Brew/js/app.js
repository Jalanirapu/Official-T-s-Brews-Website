import { actions, getState, subscribe } from './store.js';
import { Navbar, Footer, Home, Drinks, Merch, About, Reviews, Cart, Login, Profile } from './views.js';

const app = document.getElementById('app');

// Router Logic
const routes = {
  '/': Home,
  '/drinks': Drinks,
  '/merch': Merch,
  '/about': About,
  '/reviews': Reviews,
  '/cart': Cart,
  '/login': Login,
  '/profile': Profile
};

const render = () => {
  const hash = window.location.hash.slice(1) || '/';
  // Simple check to remove trailing slash or handle params if needed (simplified here)
  const path = hash.split('?')[0];
  
  const View = routes[path] || Home;
  
  app.innerHTML = `
    ${Navbar()}
    <main class="flex-grow pt-20">
      ${View()}
    </main>
    ${Footer()}
  `;
  
  // Re-initialize icons after render
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

// Initial Render and Subscribe to changes
subscribe(render);
window.addEventListener('hashchange', render);
window.addEventListener('load', render);

// Global Event Delegation
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  const tab = e.target.closest('.login-tab');

  // Handle Login Tabs
  if (tab) {
     const role = tab.dataset.tab;
     const allTabs = document.querySelectorAll('.login-tab');
     const roleInput = document.getElementById('login-role');
     const customerFields = document.getElementById('customer-fields');
     const adminFields = document.getElementById('admin-fields');
     const loginBtn = document.getElementById('login-btn');
     const adminHint = document.getElementById('admin-hint');

     // Reset styles
     allTabs.forEach(t => {
        t.className = 'login-tab flex-1 py-4 text-sm font-bold transition-colors text-stone-500 hover:bg-stone-50';
     });

     // Set Active Style
     tab.className = 'login-tab flex-1 py-4 text-sm font-bold transition-colors text-amber-600 border-b-2 border-amber-600 bg-amber-50/50';

     // Update Logic
     if (role === 'customer') {
         roleInput.value = 'customer';
         customerFields.classList.remove('hidden');
         adminFields.classList.add('hidden');
         loginBtn.innerText = 'Sign In / Register';
         adminHint.classList.add('hidden');
         document.getElementById('input-name').setAttribute('required', 'true');
         document.getElementById('input-password').removeAttribute('required');
     } else {
         roleInput.value = 'admin';
         customerFields.classList.add('hidden');
         adminFields.classList.remove('hidden');
         loginBtn.innerText = 'Admin Login';
         adminHint.classList.remove('hidden');
         document.getElementById('input-name').removeAttribute('required');
         document.getElementById('input-password').setAttribute('required', 'true');
     }
  }

  // Handle Standard Actions
  if (!btn) return;
  
  const action = btn.dataset.action;
  const id = btn.dataset.id;
  
  if (action === 'add-to-cart') {
    const product = getState().products.find(p => p.id === id);
    actions.addToCart(product);
  } else if (action === 'remove-from-cart') {
    actions.removeFromCart(id);
  } else if (action === 'update-qty') {
    actions.updateQuantity(id, parseInt(btn.dataset.qty));
  } else if (action === 'approve-review') {
    actions.approveReview(id);
  } else if (action === 'delete-review') {
    actions.deleteReview(id);
  } else if (action === 'logout') {
    actions.logout();
    window.location.hash = '#/';
  }
});

// Form Submissions
document.addEventListener('submit', (e) => {
  if (e.target.id === 'login-form') {
    e.preventDefault();
    const formData = new FormData(e.target);
    const role = formData.get('role');
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    if (role === 'admin') {
        if (email === 'admin@tscoffee.com' && password === 'admin') {
            actions.login('Admin User', email, 'admin');
            window.location.hash = '#/reviews';
        } else {
            alert('Invalid Admin Credentials. Try: admin@tscoffee.com / admin');
        }
    } else {
        // Customer Login (Mock)
        if (name && email) {
            actions.login(name, email, 'customer');
            window.location.hash = '#/profile';
        }
    }

  } else if (e.target.id === 'review-form') {
    e.preventDefault();
    const formData = new FormData(e.target);
    actions.addReview(
      formData.get('author'),
      formData.get('rating'),
      formData.get('text')
    );
    e.target.reset();
    alert('Review submitted for approval!');
  }
});