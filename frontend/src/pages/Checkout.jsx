import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FiGift } from 'react-icons/fi';

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

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
      if (data.items.length === 0) {
        navigate('/cart');
      }
      setCart(data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  const getTotal = () => {
    const subtotal = cart.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    const giftWrappingFee = giftWrapping ? 5 : 0;
    return subtotal + giftWrappingFee;
  };

  const getSubtotal = () => {
    return cart.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/orders', {
        shippingAddress,
        giftWrapping,
        giftMessage: giftWrapping ? giftMessage : '',
      });
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2 md:gap-3">
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Checkout
          </h1>
          <p className="text-orange-100 text-sm md:text-base">Complete your order</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border-2 border-primary-100">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Shipping Address
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div>
                  <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors text-sm md:text-base"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleChange}
                      placeholder="New York"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors text-sm md:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleChange}
                      placeholder="NY"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors text-sm md:text-base"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                      Zip / Postal Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingAddress.zipCode}
                      onChange={handleChange}
                      placeholder="10001"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors text-sm md:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleChange}
                      placeholder="United States"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors text-sm md:text-base"
                      required
                    />
                  </div>
                </div>

                {/* Gift Wrapping Option */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 md:p-6 rounded-2xl border-2 border-primary-200">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <FiGift className="w-5 h-5 md:w-6 md:h-6 text-primary-600" />
                    <h3 className="text-base md:text-lg font-bold text-gray-800">Gift Options</h3>
                  </div>

                  <label className="flex items-center gap-2 md:gap-3 cursor-pointer mb-3 md:mb-4">
                    <input
                      type="checkbox"
                      checked={giftWrapping}
                      onChange={(e) => setGiftWrapping(e.target.checked)}
                      className="w-4 h-4 md:w-5 md:h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                    />
                    <span className="text-gray-700 font-medium text-sm md:text-base">
                      Add gift wrapping (+$5.00)
                    </span>
                  </label>

                  {giftWrapping && (
                    <div className="animate-scale-in">
                      <label className="block text-gray-700 text-xs md:text-sm font-bold mb-2">
                        Gift Message (Optional)
                      </label>
                      <textarea
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        placeholder="Add a personal message..."
                        rows="3"
                        className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors resize-none text-sm md:text-base"
                        maxLength={200}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {giftMessage.length}/200 characters
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3 md:py-4 rounded-2xl hover:from-primary-700 hover:to-accent-700 disabled:from-gray-400 disabled:to-gray-500 font-bold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Placing Order...
                    </span>
                  ) : (
                    <>
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Place Order
                    </>
                  )}
                </button>
              </form>
            </div>
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

              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                {cart.items.map((item) => (
                  <div key={item._id} className="flex justify-between items-start pb-3 md:pb-4 border-b border-gray-200">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm md:text-base">{item.productId?.name}</p>
                      <p className="text-xs md:text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-gray-800 text-sm md:text-base">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                <div className="flex justify-between text-gray-600 text-sm md:text-lg">
                  <span>Subtotal</span>
                  <span className="font-semibold">${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm md:text-lg">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm md:text-lg">
                  <span>Tax</span>
                  <span className="font-semibold">Included</span>
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

              {/* Trust Badges */}
              <div className="pt-4 md:pt-6 border-t border-gray-200 space-y-2 md:space-y-3">
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
                  <span>Free shipping</span>
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

export default Checkout;
