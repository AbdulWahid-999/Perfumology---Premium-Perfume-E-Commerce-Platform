import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Toast = ({ message, type = 'success', onClose, showViewCart = false }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
  };

  const colors = {
    success: 'from-green-500 to-emerald-600',
    error: 'from-red-500 to-rose-600',
    info: 'from-blue-500 to-cyan-600',
    warning: 'from-yellow-500 to-orange-600',
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="pointer-events-auto animate-scale-in">
        <div className={`bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-6 rounded-2xl shadow-2xl min-w-[320px] max-w-md`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">{icons[type]}</span>
            <div className="flex-1">
              <p className="font-semibold text-lg">{message}</p>
              {showViewCart && (
                <div className="mt-3 flex gap-2">
                  <Link
                    to="/cart"
                    className="bg-white text-primary-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-50 transition-colors"
                  >
                    View Cart
                  </Link>
                  <button
                    onClick={onClose}
                    className="bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
