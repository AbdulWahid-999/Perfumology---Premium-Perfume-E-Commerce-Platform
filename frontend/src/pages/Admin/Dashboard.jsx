import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign, FiTrendingUp, FiAlertCircle, FiBarChart2 } from 'react-icons/fi';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await api.get('/admin/analytics');
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMonthName = (month) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mb-4"></div>
          <p className="text-xl text-gray-600 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <p className="text-xl text-gray-600">Failed to load analytics</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-orange-100 text-sm md:text-base">Manage your perfume store</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border-2 border-primary-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs md:text-sm font-bold text-gray-600">Revenue</h3>
              <FiDollarSign className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </div>
            <p className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              ${analytics.overview.totalRevenue.toFixed(0)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Total earnings</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border-2 border-blue-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs md:text-sm font-bold text-gray-600">Orders</h3>
              <FiShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
            </div>
            <p className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {analytics.overview.totalOrders}
            </p>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border-2 border-purple-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs md:text-sm font-bold text-gray-600">Products</h3>
              <FiPackage className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
            </div>
            <p className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {analytics.overview.totalProducts}
            </p>
            <p className="text-xs text-gray-500 mt-1">In catalog</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border-2 border-orange-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs md:text-sm font-bold text-gray-600">Customers</h3>
              <FiUsers className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
            </div>
            <p className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {analytics.overview.totalUsers}
            </p>
            <p className="text-xs text-gray-500 mt-1">Registered</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 md:mb-8">
          {/* Orders by Status */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiBarChart2 className="text-primary-600" />
              Orders by Status
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="font-bold text-yellow-600">{analytics.ordersByStatus.pending}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Processing</span>
                <span className="font-bold text-blue-600">{analytics.ordersByStatus.processing}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Shipped</span>
                <span className="font-bold text-purple-600">{analytics.ordersByStatus.shipped}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Delivered</span>
                <span className="font-bold text-green-600">{analytics.ordersByStatus.delivered}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cancelled</span>
                <span className="font-bold text-red-600">{analytics.ordersByStatus.cancelled}</span>
              </div>
            </div>
          </div>

          {/* Sales Chart */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg lg:col-span-2">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiTrendingUp className="text-primary-600" />
              Sales Trend (Last 6 Months)
            </h2>
            <div className="space-y-3">
              {analytics.salesByMonth.map((month, index) => {
                const maxSales = Math.max(...analytics.salesByMonth.map(m => m.totalSales));
                const percentage = (month.totalSales / maxSales) * 100;

                return (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {getMonthName(month._id.month)} {month._id.year}
                      </span>
                      <span className="text-sm font-bold text-primary-600">
                        ${month.totalSales.toFixed(0)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary-600 to-accent-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        {analytics.lowStockProducts.length > 0 && (
          <div className="bg-red-50 border-2 border-red-200 p-4 md:p-6 rounded-2xl mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
              <FiAlertCircle className="text-red-600" />
              Low Stock Alert
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {analytics.lowStockProducts.map((product) => (
                <div key={product._id} className="bg-white p-3 md:p-4 rounded-xl border border-red-200">
                  <p className="font-semibold text-gray-800 text-sm md:text-base">{product.name}</p>
                  <p className="text-red-600 font-bold text-sm">Only {product.stock} left</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Products */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Top Selling Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 text-xs md:text-sm font-bold text-gray-600">Product</th>
                  <th className="text-right py-3 px-2 text-xs md:text-sm font-bold text-gray-600">Sold</th>
                  <th className="text-right py-3 px-2 text-xs md:text-sm font-bold text-gray-600">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {analytics.topProducts.map((product, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2 md:gap-3">
                        <img
                          src={product._id?.imageUrl}
                          alt={product._id?.name}
                          className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-lg"
                        />
                        <span className="font-medium text-gray-800 text-xs md:text-sm">{product._id?.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-2 font-bold text-primary-600 text-sm md:text-base">
                      {product.totalSold}
                    </td>
                    <td className="text-right py-3 px-2 font-bold text-green-600 text-sm md:text-base">
                      ${product.revenue.toFixed(0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Link
            to="/admin/products"
            className="group bg-gradient-to-r from-primary-600 to-accent-600 text-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl md:text-2xl font-bold">Manage Products</h2>
              <FiPackage className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <p className="text-orange-100 text-sm md:text-base">Add, edit, or delete products</p>
          </Link>

          <Link
            to="/admin/orders"
            className="group bg-gradient-to-r from-primary-600 to-accent-600 text-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl md:text-2xl font-bold">Manage Orders</h2>
              <FiShoppingBag className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <p className="text-orange-100 text-sm md:text-base">View and update order status</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
