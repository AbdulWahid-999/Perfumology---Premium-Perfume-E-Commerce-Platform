const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price cannot be negative'],
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot exceed 100%'],
    },
    onSale: {
      type: Boolean,
      default: false,
    },
    brand: {
      type: String,
      required: [true, 'Please add a brand'],
    },
    scentType: {
      type: String,
      enum: ['floral', 'woody', 'citrus', 'oriental', 'fresh', 'spicy'],
      required: [true, 'Please add a scent type'],
    },
    imageUrl: {
      type: String,
      default: 'https://via.placeholder.com/300',
    },
    images: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    sizes: {
      type: [String],
      default: ['50ml', '100ml'],
    },
    popularity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
