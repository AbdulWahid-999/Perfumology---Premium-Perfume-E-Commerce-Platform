import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import Toast from '../components/Toast';
import api from '../services/api';

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      const { data } = await api.get('/cart');
      setCart(data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      const { data } = await api.put(`/cart/${itemId}`, { quantity });
      setCart(data);
      setToast({
        message: 'Quantity updated successfully',
        type: 'success',
        showViewCart: false,
      });
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Failed to update quantity',
        type: 'error',
        showViewCart: false,
      });
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const { data } = await api.delete(`/cart/${itemId}`);
      setCart(data);
      setToast({
        message: 'Item removed from cart',
        type: 'success',
        showViewCart: false,
      });
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Failed to remove item',
        type: 'error',
        showViewCart: false,
      });
    }
  };

  const getTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mb-4"></div>
          <p className="text-xl text-gray-600 font-semibold">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-12">
            <div className="mb-6">
              <svg className="w-32 h-32 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-xl text-gray-600 mb-8">Discover our amazing collection of perfumes!</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-primary-700 hover:to-accent-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          showViewCart={toast.showViewCart}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2 md:gap-3">
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Shopping Cart
          </h1>
          <p className="text-orange-100 text-sm md:text-base">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {cart.items.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl sticky top-4 border-2 border-primary-100">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Order Summary
              </h2>

              <div className="space-y-2 md:space-y-4 mb-4 md:mb-6">
                <div className="flex justify-between text-gray-600 text-sm md:text-lg">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span className="font-semibold">${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm md:text-lg">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm md:text-lg">
                  <span>Tax</span>
                  <span className="font-semibold">Calculated at checkout</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-3 md:pt-4 mt-3 md:mt-4">
                  <div className="flex justify-between text-lg md:text-2xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                      ${getTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3 md:py-4 rounded-2xl hover:from-primary-700 hover:to-accent-700 font-bold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl mb-2 md:mb-3 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <button
                onClick={() => navigate('/products')}
                className="w-full bg-gray-100 text-gray-800 py-3 md:py-4 rounded-2xl hover:bg-gray-200 font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-base md:text-lg"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </button>

              {/* Trust Badges */}
              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200 space-y-2 md:space-y-3">
                <div className="flex items-center text-xs md:text-sm text-gray-600">
                  <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center text-xs md:text-sm text-gray-600">
                  <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free shipping on all orders</span>
                </div>
                <div className="flex items-center text-xs md:text-sm text-gray-600">
                  <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>100% authentic products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
