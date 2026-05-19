import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiShoppingCart, FiEye } from 'react-icons/fi';
import api from '../services/api';

const QuickViewModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const getScentIcon = (scent) => {
    const icons = {
      floral: '🌸',
      woody: '🌲',
      citrus: '🍊',
      oriental: '🌙',
      fresh: '💨',
      spicy: '🌶️'
    };
    return icons[scent] || '✨';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-900">Quick View</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="relative bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-8">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-80 object-cover rounded-xl"
              />
              {product.stock > 0 ? (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  ✓ In Stock
                </div>
              ) : (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-3">
                <span className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 text-primary-800 px-3 py-1 rounded-full text-sm font-bold capitalize">
                  {getScentIcon(product.scentType)} {product.scentType} Scent
                </span>
              </div>

              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h3>

              <p className="text-xl text-gray-600 mb-4 font-medium">{product.brand}</p>

              <div className="mb-4">
                <span className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  ${product.price}
                </span>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Description</h4>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl mb-6">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600 font-medium">Brand:</span>
                    <span className="text-gray-800 font-semibold ml-2">{product.brand}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Stock:</span>
                    <span className={`font-semibold ml-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock > 0 ? `${product.stock} units` : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>

              {product.stock > 0 && (
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-lg font-bold text-lg transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
                        className="w-16 text-center px-3 py-2 border-2 border-gray-300 rounded-lg text-lg font-bold focus:outline-none focus:border-primary-500"
                      />
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="bg-gray-200 hover:bg-gray-300 w-10 h-10 rounded-lg font-bold text-lg transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3 rounded-xl hover:from-primary-700 hover:to-accent-700 text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                    >
                      <FiShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <Link
                      to={`/products/${product._id}`}
                      className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-300 font-bold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FiEye className="w-5 h-5" />
                      Full Details
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
