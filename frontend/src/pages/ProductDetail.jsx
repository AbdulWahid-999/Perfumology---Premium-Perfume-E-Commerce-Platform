import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import ReviewSection from '../components/ReviewSection';
import RelatedProducts from '../components/RelatedProducts';
import RecentlyViewed from '../components/RecentlyViewed';
import ImageGallery from '../components/ImageGallery';
import api from '../services/api';
import { FiArrowLeft, FiShoppingCart, FiTruck, FiAward, FiGift } from 'react-icons/fi';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);

      // Add to recently viewed
      const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      const filtered = recentlyViewed.filter(p => p._id !== data._id);
      const updated = [{ _id: data._id, name: data.name, brand: data.brand, price: data.price, imageUrl: data.imageUrl }, ...filtered].slice(0, 10);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
    } catch (err) {
      setError('Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      setToast({
        message: 'Please login to add items to cart',
        type: 'warning',
        showViewCart: false,
      });
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    try {
      await api.post('/cart', {
        productId: product._id,
        quantity,
      });
      setToast({
        message: `${product.name} added to cart!`,
        type: 'success',
        showViewCart: true,
      });
    } catch (err) {
      setToast({
        message: err.response?.data?.message || 'Failed to add to cart',
        type: 'error',
        showViewCart: false,
      });
    }
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mb-4"></div>
          <p className="text-xl text-gray-600 font-semibold">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-8 rounded-2xl text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-2">{error || 'Product not found'}</h2>
            <button
              onClick={() => navigate('/products')}
              className="mt-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 rounded-full hover:from-primary-700 hover:to-accent-700 transition-all duration-300"
            >
              Back to Products
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

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="mb-6 flex items-center text-primary-600 hover:text-primary-800 font-semibold transition-colors duration-300 group"
        >
          <FiArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Products
        </button>

        {/* Product Details */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Image Gallery */}
            <div className="relative p-8 lg:p-12">
              {product.images && product.images.length > 0 ? (
                <ImageGallery images={product.images} productName={product.name} />
              ) : (
                <div className="relative bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-[500px] object-cover"
                  />
                </div>
              )}
              {product.stock > 0 ? (
                <div className="absolute top-12 right-12 bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg z-10">
                  ✓ In Stock
                </div>
              ) : (
                <div className="absolute top-12 right-12 bg-red-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg z-10">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-8 lg:p-12">
              {/* Scent Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 text-primary-800 px-4 py-2 rounded-full text-sm font-bold capitalize">
                  {getScentIcon(product.scentType)} {product.scentType} Scent
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Brand */}
              <p className="text-2xl text-gray-600 mb-6 font-medium">{product.brand}</p>

              {/* Price */}
              <div className="mb-8">
                {product.onSale && product.discount > 0 ? (
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                        ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                      </span>
                      <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg animate-pulse-slow">
                        🔥 {product.discount}% OFF
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl text-gray-500 line-through">
                        ${product.price}
                      </span>
                      <span className="text-green-600 font-bold text-lg">
                        Save ${(product.price * (product.discount / 100)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    <span className="text-gray-500 ml-2">USD</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-3">About this fragrance</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
              </div>

              {/* Product Details */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Product Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Brand:</span>
                    <span className="text-gray-800 font-semibold">{product.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Scent Type:</span>
                    <span className="text-gray-800 font-semibold capitalize">{product.scentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Availability:</span>
                    <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock > 0 ? `${product.stock} units available` : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Section */}
              {product.stock > 0 ? (
                <div>
                  <div className="mb-6">
                    <label className="block text-gray-800 text-lg font-bold mb-3">
                      Quantity
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="bg-gray-200 hover:bg-gray-300 w-12 h-12 rounded-xl font-bold text-xl transition-colors duration-300"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
                        className="w-20 text-center px-4 py-3 border-2 border-gray-300 rounded-xl text-xl font-bold focus:outline-none focus:border-primary-500"
                      />
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="bg-gray-200 hover:bg-gray-300 w-12 h-12 rounded-xl font-bold text-xl transition-colors duration-300"
                      >
                        +
                      </button>
                      <span className="text-gray-600">
                        (Max: {product.stock})
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-4 rounded-2xl hover:from-primary-700 hover:to-accent-700 text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
                  >
                    <FiShoppingCart className="w-6 h-6" />
                    <span>Add to Cart</span>
                  </button>

                  <div className="mt-4 text-center text-sm text-gray-600">
                    <p>✓ Free shipping on all orders</p>
                    <p>✓ Authentic products guaranteed</p>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl text-center">
                  <p className="text-xl font-bold mb-2">Out of Stock</p>
                  <p className="text-sm">This product is currently unavailable</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <FiTruck className="w-12 h-12 mx-auto mb-3 text-primary-600" />
            <h3 className="font-bold text-gray-800 mb-2">Free Shipping</h3>
            <p className="text-gray-600 text-sm">Fast delivery to your doorstep</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <FiAward className="w-12 h-12 mx-auto mb-3 text-primary-600" />
            <h3 className="font-bold text-gray-800 mb-2">100% Authentic</h3>
            <p className="text-gray-600 text-sm">Genuine products guaranteed</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <FiGift className="w-12 h-12 mx-auto mb-3 text-primary-600" />
            <h3 className="font-bold text-gray-800 mb-2">Gift Ready</h3>
            <p className="text-gray-600 text-sm">Elegant packaging included</p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          <ReviewSection productId={id} />
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <RelatedProducts productId={id} />
        </div>

        {/* Recently Viewed Section */}
        <RecentlyViewed currentProductId={id} />
      </div>
    </div>
  );
};

export default ProductDetail;
