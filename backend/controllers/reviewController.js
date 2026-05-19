const Review = require('../models/Review');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Helper function to update product rating
const updateProductRating = async (productId) => {
  const reviews = await Review.find({ productId });

  if (reviews.length === 0) {
    await Product.findByIdAndUpdate(productId, {
      averageRating: 0,
      numReviews: 0,
    });
    return;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  await Product.findByIdAndUpdate(productId, {
    averageRating: averageRating.toFixed(1),
    numReviews: reviews.length,
  });
};

// Add a review
const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      productId,
      userId: req.user._id,
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    // Check if user purchased this product
    const userOrders = await Order.find({
      userId: req.user._id,
      'items.productId': productId,
    });

    const verifiedPurchase = userOrders.length > 0;

    const review = await Review.create({
      productId,
      userId: req.user._id,
      rating,
      comment,
      verifiedPurchase,
    });

    await updateProductRating(productId);

    const populatedReview = await Review.findById(review._id).populate('userId', 'name');

    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    // Calculate average rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;

    res.json({
      reviews,
      averageRating: parseFloat(averageRating),
      totalReviews: reviews.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a review
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();

    await updateProductRating(review.productId);

    const populatedReview = await Review.findById(review._id).populate('userId', 'name');

    res.json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    const productId = review.productId;
    await Review.findByIdAndDelete(reviewId);

    await updateProductRating(productId);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
};
