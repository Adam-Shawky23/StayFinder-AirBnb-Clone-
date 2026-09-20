import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './features/auth/AuthContext.jsx';
import { WishlistProvider } from './features/wishlist/WishlistContext.jsx';
import { ToastProvider } from './features/toast/ToastContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './index.css';

async function enableMocking() {
  const { worker } = await import('./mocks/browser.js');
  return worker.start({ onUnhandledRequest: 'bypass' });
}

function renderApp() {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <ToastProvider>
            <AuthProvider>
              <WishlistProvider>
                <App />
              </WishlistProvider>
            </AuthProvider>
          </ToastProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

enableMocking()
  .catch((err) => {
    // Render the app regardless — individual requests will surface a
    // friendly error (see src/lib/http.js) instead of leaving a blank page.
    console.error('Mock API failed to start:', err);
  })
  .then(renderApp);
