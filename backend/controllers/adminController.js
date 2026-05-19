const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// Get dashboard analytics
const getDashboardAnalytics = async (req, res) => {
  try {
    // Total revenue
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Total orders
    const totalOrders = orders.length;

    // Total products
    const totalProducts = await Product.countDocuments();

    // Total users
    const totalUsers = await User.countDocuments({ role: 'user' });

    // Orders by status
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const processingOrders = await Order.countDocuments({ status: 'processing' });
    const shippedOrders = await Order.countDocuments({ status: 'shipped' });
    const deliveredOrders = await Order.countDocuments({ status: 'delivered' });
    const cancelledOrders = await Order.countDocuments({ status: 'cancelled' });

    // Low stock products (stock < 10)
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } })
      .select('name stock')
      .sort({ stock: 1 })
      .limit(10);

    // Recent orders
    const recentOrders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    // Top selling products
    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productId',
          totalSold: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    // Populate product details
    const topProductsWithDetails = await Product.populate(topProducts, {
      path: '_id',
      select: 'name imageUrl price'
    });

    // Sales by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const salesByMonth = await Order.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          totalSales: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      overview: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalUsers,
      },
      ordersByStatus: {
        pending: pendingOrders,
        processing: processingOrders,
        shipped: shippedOrders,
        delivered: deliveredOrders,
        cancelled: cancelledOrders,
      },
      lowStockProducts,
      recentOrders,
      topProducts: topProductsWithDetails,
      salesByMonth,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 });

    // Get order count for each customer
    const customersWithOrders = await Promise.all(
      customers.map(async (customer) => {
        const orderCount = await Order.countDocuments({ userId: customer._id });
        const orders = await Order.find({ userId: customer._id });
        const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);

        return {
          ...customer.toObject(),
          orderCount,
          totalSpent,
        };
      })
    );

    res.json(customersWithOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardAnalytics,
  getAllCustomers,
};
