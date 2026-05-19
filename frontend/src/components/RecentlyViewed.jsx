import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';

const RecentlyViewed = ({ currentProductId }) => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    // Filter out current product
    const filtered = recent.filter(p => p._id !== currentProductId);
    setRecentProducts(filtered.slice(0, 4));
  }, [currentProductId]);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <FiClock className="w-6 h-6 text-primary-600" />
        <h2 className="text-3xl font-bold text-gray-900">Recently Viewed</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProducts.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-orange-50 h-48">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover p-4 group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="p-4">
              <h3 className="text-sm font-bold text-gray-800 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
                {product.name}
              </h3>

              <p className="text-xs text-gray-600 mb-2 font-medium">{product.brand}</p>

              <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
