import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiHeart, FiStar, FiEye } from 'react-icons/fi';
import api from '../services/api';

const ProductCard = ({ product, onAddToCart, onQuickView }) => {
  const { user } = useContext(AuthContext);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    if (user) {
      checkWishlist();
    }
  }, [user, product._id]);

  const checkWishlist = async () => {
    try {
      const { data } = await api.get(`/wishlist/check/${product._id}`);
      setIsInWishlist(data.inWishlist);
    } catch (error) {
      console.error('Failed to check wishlist:', error);
    }
  };

  const toggleWishlist = async (e) => {
    e.preventDefault();
    if (!user) return;

    setWishlistLoading(true);
    try {
      if (isInWishlist) {
        await api.delete(`/wishlist/${product._id}`);
        setIsInWishlist(false);
      } else {
        await api.post('/wishlist', { productId: product._id });
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    } finally {
      setWishlistLoading(false);
    }
  };
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 animate-fade-in hover:-translate-y-3">
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-orange-50 h-72">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover p-4 group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          {product.onSale && product.discount > 0 && (
            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-bounce-slow">
              🔥 {product.discount}% OFF
            </span>
          )}
          {user && (
            <button
              onClick={toggleWishlist}
              disabled={wishlistLoading}
              className={`${
                isInWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-600 hover:text-red-500'
              } p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50`}
            >
              <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
        <div className="absolute top-4 left-4 z-10">
          {product.stock > 0 ? (
            <span className="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse-slow">
              In Stock
            </span>
          ) : (
            <span className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              Out of Stock
            </span>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <span className="inline-block bg-gradient-to-r from-primary-100 to-accent-100 text-primary-800 px-3 py-1 rounded-full text-xs font-bold capitalize">
            {product.scentType}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-primary-600 transition-colors duration-300">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-2 font-medium">{product.brand}</p>

        {/* Rating Display */}
        {product.averageRating > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-bold text-gray-700">{product.averageRating}</span>
            <span className="text-xs text-gray-500">({product.numReviews || 0})</span>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <div>
            {product.onSale && product.discount > 0 ? (
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                    ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </span>
                </div>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Stock</p>
            <p className="text-sm font-semibold text-gray-700">{product.stock}</p>
          </div>
        </div>

        <div className="flex gap-2">
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 py-2.5 rounded-xl text-center hover:from-gray-200 hover:to-gray-300 font-semibold transition-all duration-300 transform hover:scale-105 text-sm flex items-center justify-center gap-1"
            >
              <FiEye className="w-4 h-4" />
              Quick View
            </button>
          )}
          {product.stock > 0 && onAddToCart && (
            <button
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-gradient-to-r from-primary-600 to-accent-600 text-white py-2.5 rounded-xl hover:from-primary-700 hover:to-accent-700 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm flex items-center justify-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
