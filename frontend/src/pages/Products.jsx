import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import PriceRangeSlider from '../components/PriceRangeSlider';
import QuickViewModal from '../components/QuickViewModal';
import { ProductGridSkeleton } from '../components/LoadingSkeleton';
import Toast from '../components/Toast';
import api from '../services/api';
import { FiSearch, FiFilter, FiX, FiStar } from 'react-icons/fi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [brand, setBrand] = useState('');
  const [selectedScents, setSelectedScents] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [minRating, setMinRating] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [toast, setToast] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { user } = useAuth();
  const searchRef = useRef(null);

  const scentTypes = [
    { value: 'floral', label: '🌸 Floral', icon: '🌸' },
    { value: 'woody', label: '🌲 Woody', icon: '🌲' },
    { value: 'citrus', label: '🍊 Citrus', icon: '🍊' },
    { value: 'oriental', label: '🌙 Oriental', icon: '🌙' },
    { value: 'fresh', label: '💨 Fresh', icon: '💨' },
    { value: 'spicy', label: '🌶️ Spicy', icon: '🌶️' },
  ];

  useEffect(() => {
    fetchProducts();
  }, [search, brand, selectedScents, priceRange, minRating, inStockOnly, sortBy]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (search.length >= 2) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [search]);

  const fetchSuggestions = async () => {
    try {
      const { data } = await api.get('/products/search/suggestions', {
        params: { query: search },
      });
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (brand) params.brand = brand;
      if (priceRange.min > 0) params.minPrice = priceRange.min;
      if (priceRange.max < 500) params.maxPrice = priceRange.max;
      if (minRating) params.minRating = minRating;
      if (inStockOnly) params.inStock = 'true';
      if (sortBy) params.sortBy = sortBy;

      const { data } = await api.get('/products', { params });
      let fetchedProducts = data.products || [];

      // Filter by multiple scent types
      if (selectedScents.length > 0) {
        fetchedProducts = fetchedProducts.filter(product =>
          selectedScents.includes(product.scentType)
        );
      }

      setProducts(fetchedProducts);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      setToast({
        message: 'Please login to add items to cart',
        type: 'warning',
        showViewCart: false,
      });
      return;
    }

    try {
      await api.post('/cart', {
        productId: product._id,
        quantity: 1,
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

  const toggleScent = (scent) => {
    setSelectedScents(prev =>
      prev.includes(scent)
        ? prev.filter(s => s !== scent)
        : [...prev, scent]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setBrand('');
    setSelectedScents([]);
    setPriceRange({ min: 0, max: 500 });
    setMinRating('');
    setInStockOnly(false);
    setSortBy('');
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleQuickViewAddToCart = async (product, quantity) => {
    if (!user) {
      setToast({
        message: 'Please login to add items to cart',
        type: 'warning',
        showViewCart: false,
      });
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 animate-fade-in">
      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleQuickViewAddToCart}
        />
      )}

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
      <div className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 text-white py-16 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4 animate-slide-down">Our Collection</h1>
          <p className="text-xl text-orange-100 animate-slide-up">Discover your perfect fragrance from our curated selection</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-xl mb-8 border-2 border-primary-100 animate-scale-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FiFilter className="w-5 h-5 text-primary-600" />
              Search & Filter
            </h2>
            <button
              onClick={clearFilters}
              className="text-primary-600 hover:text-primary-800 font-semibold text-sm transition-colors flex items-center gap-1"
            >
              <FiX className="w-4 h-4" />
              Clear All
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative" ref={searchRef}>
              <input
                type="text"
                placeholder="Search perfumes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
              />
              <FiSearch className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />

              {/* Search Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border-2 border-primary-100 max-h-96 overflow-y-auto">
                  {suggestions.map((product) => (
                    <button
                      key={product._id}
                      onClick={() => {
                        setSearch(product.name);
                        setShowSuggestions(false);
                      }}
                      className="w-full flex items-center gap-4 p-4 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-gray-800">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                      </div>
                      <p className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                        ${product.price}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Scent Type Multi-Select */}
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Scent Types (Select Multiple)
            </label>
            <div className="flex flex-wrap gap-2">
              {scentTypes.map((scent) => (
                <button
                  key={scent.value}
                  onClick={() => toggleScent(scent.value)}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                    selectedScents.includes(scent.value)
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {scent.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Brand */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Brand
              </label>
              <input
                type="text"
                placeholder="e.g., Chanel"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors text-sm"
              />
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors text-sm"
              >
                <option value="">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popularity">Most Popular</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Price Range
            </label>
            <PriceRangeSlider
              min={0}
              max={500}
              value={priceRange}
              onChange={setPriceRange}
            />
          </div>

          {/* Rating Filter */}
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Minimum Rating
            </label>
            <div className="flex gap-2">
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(minRating === rating.toString() ? '' : rating.toString())}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 flex items-center gap-1 ${
                    minRating === rating.toString()
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FiStar className={minRating === rating.toString() ? 'fill-current' : ''} />
                  {rating}+
                </button>
              ))}
            </div>
          </div>

          {/* Stock Filter */}
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
              />
              <span className="text-sm font-bold text-gray-700">Show In Stock Only</span>
            </label>
          </div>
        </div>

        {/* Results Count */}
        {!loading && (
          <div className="mb-6 flex justify-between items-center animate-slide-up">
            <p className="text-gray-600 font-medium">
              {products.length > 0 ? (
                <>
                  Showing <span className="font-bold text-primary-600">{products.length}</span> product{products.length !== 1 ? 's' : ''}
                </>
              ) : (
                'No products found'
              )}
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 flex items-center animate-scale-in">
            <span className="text-2xl mr-3">⚠️</span>
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg animate-scale-in">
            <div className="text-6xl mb-4">
              <FiSearch className="w-24 h-24 mx-auto text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-3 rounded-full font-semibold hover:from-primary-700 hover:to-accent-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={product._id} style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleQuickView}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
