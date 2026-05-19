const Wishlist = require('../models/Wishlist');

// Get user's wishlist
const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.user._id }).populate('products');

    if (!wishlist) {
      wishlist = await Wishlist.create({ userId: req.user._id, products: [] });
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    let wishlist = await Wishlist.findOne({ userId: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        userId: req.user._id,
        products: [productId],
      });
    } else {
      // Check if product already in wishlist
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }

      wishlist.products.push(productId);
      await wishlist.save();
    }

    const populatedWishlist = await Wishlist.findById(wishlist._id).populate('products');

    res.json(populatedWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ userId: req.user._id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();

    const populatedWishlist = await Wishlist.findById(wishlist._id).populate('products');

    res.json(populatedWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check if product is in wishlist
const checkWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ userId: req.user._id });

    if (!wishlist) {
      return res.json({ inWishlist: false });
    }

    const inWishlist = wishlist.products.some(
      (id) => id.toString() === productId
    );

    res.json({ inWishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
};
