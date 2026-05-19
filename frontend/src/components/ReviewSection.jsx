import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import StarRating from './StarRating';
import api from '../services/api';
import { FiEdit2, FiTrash2, FiCheckCircle } from 'react-icons/fi';

const ReviewSection = ({ productId }) => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showAddReview, setShowAddReview] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const { data } = await api.get(`/reviews/product/${productId}`);
      setReviews(data.reviews);
      setAverageRating(data.averageRating);
      setTotalReviews(data.totalReviews);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      setToast({ message: 'Please login to add a review', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      if (editingReview) {
        await api.put(`/reviews/${editingReview._id}`, { rating, comment });
        setToast({ message: 'Review updated successfully', type: 'success' });
      } else {
        await api.post('/reviews', { productId, rating, comment });
        setToast({ message: 'Review added successfully', type: 'success' });
      }
      setRating(5);
      setComment('');
      setShowAddReview(false);
      setEditingReview(null);
      fetchReviews();
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Failed to submit review',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setRating(review.rating);
    setComment(review.comment);
    setShowAddReview(true);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      await api.delete(`/reviews/${reviewId}`);
      setToast({ message: 'Review deleted successfully', type: 'success' });
      fetchReviews();
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Failed to delete review',
        type: 'error',
      });
    }
  };

  const cancelEdit = () => {
    setEditingReview(null);
    setRating(5);
    setComment('');
    setShowAddReview(false);
  };

  return (
    <div className="mt-12">
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

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <div className="flex items-center gap-3 mt-2">
            <StarRating rating={averageRating} readonly size="text-2xl" />
            <span className="text-lg font-semibold text-gray-700">
              {averageRating.toFixed(1)} out of 5
            </span>
            <span className="text-gray-500">({totalReviews} reviews)</span>
          </div>
        </div>
        {user && !showAddReview && (
          <button
            onClick={() => setShowAddReview(true)}
            className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all"
          >
            Write a Review
          </button>
        )}
      </div>

      {showAddReview && (
        <form onSubmit={handleSubmitReview} className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingReview ? 'Edit Your Review' : 'Write Your Review'}
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <StarRating rating={rating} onRatingChange={setRating} size="text-3xl" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Share your experience with this product..."
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all disabled:opacity-50"
            >
              {loading ? 'Submitting...' : editingReview ? 'Update Review' : 'Submit Review'}
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <StarRating rating={review.rating} readonly size="text-lg" />
                    {review.verifiedPurchase && (
                      <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
                        <FiCheckCircle /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <p className="text-gray-800 mb-2">{review.comment}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-medium">{review.userId?.name || 'Anonymous'}</span>
                    <span>•</span>
                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                {user && user._id === review.userId?._id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="text-primary-600 hover:text-primary-700 p-2"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
