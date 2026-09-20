import { createContext, useCallback, useContext, useRef, useState } from 'react';

const ToastContext = createContext({ showToast: () => {} });

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timeouts = useRef({});

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    clearTimeout(timeouts.current[id]);
    delete timeouts.current[id];
  }, []);

  const showToast = useCallback((message, { type = 'default' } = {}) => {
    const id = ++idCounter;
    setToasts((current) => [...current, { id, message, type }]);
    timeouts.current[id] = setTimeout(() => dismissToast(id), 3000);
  }, [dismissToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4 sm:items-end sm:px-6"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto animate-fade-slide-up rounded-full px-4 py-2.5 text-sm font-medium shadow-lifted ${
              toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-stone-900 text-white'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
