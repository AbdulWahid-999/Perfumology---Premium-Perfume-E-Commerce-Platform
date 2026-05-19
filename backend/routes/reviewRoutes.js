const express = require('express');
const {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addReview);
router.get('/product/:productId', getProductReviews);
router.put('/:reviewId', protect, updateReview);
router.delete('/:reviewId', protect, deleteReview);

module.exports = router;
