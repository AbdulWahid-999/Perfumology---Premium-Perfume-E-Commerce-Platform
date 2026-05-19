import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchWishlist();
  }, [user, navigate]);

  const fetchWishlist = async () => {
    try {
      const { data } = await api.get('/wishlist');
      setWishlist(data);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const { data } = await api.delete(`/wishlist/${productId}`);
      setWishlist(data);
      setToast({
        message: 'Removed from wishlist',
        type: 'success',
      });
      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Failed to remove item',
        type: 'error',
      });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await api.post('/cart', {
        productId: product._id,
        quantity: 1,
      });
      setToast({
        message: `${product.name} added to cart!`,
        type: 'success',
      });
      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Failed to add to cart',
        type: 'error',
      });
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mb-4"></div>
          <p className="text-xl text-gray-600 font-semibold">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {toast && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="pointer-events-auto animate-scale-in">
            <div className={`bg-gradient-to-r ${
              toast.type === 'success' ? 'from-green-600 to-green-700' :
              toast.type === 'error' ? 'from-red-600 to-red-700' :
              'from-primary-600 to-accent-600'
            } text-white px-6 py-4 rounded-lg shadow-2xl`}>
              <p className="font-medium">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <FiHeart className="w-8 h-8 text-primary-600" />
          <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
        </div>

        {!wishlist || wishlist.products.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <FiHeart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Start adding your favorite perfumes to your wishlist!</p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-3 rounded-full hover:from-primary-700 hover:to-accent-700 transition-all duration-300 font-semibold"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-6">
              {wishlist.products.length} {wishlist.products.length === 1 ? 'item' : 'items'} in your wishlist
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <Link to={`/products/${product._id}`} className="block">
                    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-orange-50 h-64">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover p-4 hover:scale-110 transition-transform duration-500"
                      />
                      {product.stock > 0 ? (
                        <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                          In Stock
                        </span>
                      ) : (
                        <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="p-5">
                    <span className="inline-block bg-gradient-to-r from-primary-100 to-accent-100 text-primary-800 px-3 py-1 rounded-full text-xs font-bold capitalize mb-3">
                      {product.scentType}
                    </span>

                    <Link to={`/products/${product._id}`}>
                      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem] hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-sm text-gray-600 mb-4 font-medium">{product.brand}</p>

                    <div className="mb-4">
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                        ${product.price}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {product.stock > 0 && (
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-gradient-to-r from-primary-600 to-accent-600 text-white py-2.5 rounded-xl hover:from-primary-700 hover:to-accent-700 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm flex items-center justify-center gap-2"
                        >
                          <FiShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                      )}
                      <button
                        onClick={() => handleRemove(product._id)}
                        className="bg-red-500 text-white p-2.5 rounded-xl hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
