const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');

    if (cart) {
      res.json(cart);
    } else {
      res.json({ userId: req.user._id, items: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Please provide product ID and quantity' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    let cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].price = product.price;
      } else {
        cart.items.push({
          productId,
          quantity,
          price: product.price,
        });
      }
    } else {
      cart = await Cart.create({
        userId: req.user._id,
        items: [
          {
            productId,
            quantity,
            price: product.price,
          },
        ],
      });
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate('items.productId');
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    const product = await Product.findById(item.productId);

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    item.quantity = quantity;
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('items.productId');
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('items.productId');
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      cart.items = [];
      await cart.save();
      res.json({ message: 'Cart cleared' });
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
