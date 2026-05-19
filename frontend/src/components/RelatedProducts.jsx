import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FiArrowRight } from 'react-icons/fi';

const RelatedProducts = ({ productId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedProducts();
  }, [productId]);

  const fetchRelatedProducts = async () => {
    try {
      const { data } = await api.get(`/products/${productId}/related`);
      setRelatedProducts(data);
    } catch (error) {
      console.error('Failed to fetch related products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">You May Also Like</h2>
        <Link
          to="/products"
          className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2 transition-colors"
        >
          View All
          <FiArrowRight />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-orange-50 h-64">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover p-4 group-hover:scale-110 transition-transform duration-500"
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

            <div className="p-5">
              <span className="inline-block bg-gradient-to-r from-primary-100 to-accent-100 text-primary-800 px-3 py-1 rounded-full text-xs font-bold capitalize mb-3">
                {product.scentType}
              </span>

              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-primary-600 transition-colors">
                {product.name}
              </h3>

              <p className="text-sm text-gray-600 mb-4 font-medium">{product.brand}</p>

              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  ${product.price}
                </span>
                <span className="text-primary-600 group-hover:text-primary-700 font-semibold flex items-center gap-1">
                  View Details
                  <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
