import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Changing target from 'root' to 'app' to match index.html
const rootElement = document.getElementById('app');
if (!rootElement) {
  // Graceful fallback if running in a mixed environment
  console.warn("React root not found, likely running Vanilla JS version.");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}