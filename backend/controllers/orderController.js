const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const sendEmail = require('../utils/sendEmail');

const createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city ||
        !shippingAddress.state || !shippingAddress.zipCode || !shippingAddress.country) {
      return res.status(400).json({ message: 'Please provide complete shipping address' });
    }

    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    for (const item of cart.items) {
      if (item.productId.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${item.productId.name}`
        });
      }
    }

    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const totalAmount = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      totalAmount,
      shippingAddress,
    });

    for (const item of cart.items) {
      const product = await Product.findById(item.productId._id);
      product.stock -= item.quantity;
      await product.save();
    }

    cart.items = [];
    await cart.save();

    const populatedOrder = await Order.findById(order._id).populate('items.productId');

    // Send email notification to admin
    try {
      const itemsList = orderItems.map(item =>
        `<li>${item.name} - Quantity: ${item.quantity} - Price: $${item.price}</li>`
      ).join('');

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">New Order Received - Perfumology</h2>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Customer:</strong> ${req.user.name}</p>
          <p><strong>Email:</strong> ${req.user.email}</p>

          <h3 style="color: #ea580c;">Order Items:</h3>
          <ul>${itemsList}</ul>

          <h3 style="color: #ea580c;">Shipping Address:</h3>
          <p>
            ${shippingAddress.street}<br>
            ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}<br>
            ${shippingAddress.country}
          </p>

          <h3 style="color: #ea580c;">Total Amount: $${totalAmount.toFixed(2)}</h3>

          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This is an automated notification from Perfumology.
          </p>
        </div>
      `;

      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Order #${order._id} - Perfumology`,
        html: emailHtml,
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
    }

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('items.productId')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('userId', 'name email')
      .populate('items.productId')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Please provide status' });
    }

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate('userId', 'name email')
      .populate('items.productId');

    res.json(populatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
