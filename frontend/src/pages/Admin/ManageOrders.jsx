import { useState, useEffect } from 'react';
import api from '../../services/api';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders/all');
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      alert('Order status updated successfully!');
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      processing: 'bg-blue-100 text-blue-800 border-blue-300',
      shipped: 'bg-purple-100 text-purple-800 border-purple-300',
      delivered: 'bg-green-100 text-green-800 border-green-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      processing: '📦',
      shipped: '🚚',
      delivered: '✅',
      cancelled: '❌',
    };
    return icons[status] || '📋';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mb-4"></div>
          <p className="text-xl text-gray-600 font-semibold">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">📋 Manage Orders</h1>
          <p className="text-orange-100">View and update customer orders</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-2xl">
            <div className="text-8xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h3>
            <p className="text-gray-600">Orders will appear here once customers start purchasing</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-primary-100 hover:border-primary-300 transition-all duration-300">
                {/* Order Header */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 border-b-2 border-primary-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="flex items-center">
                          <span className="mr-2">👤</span>
                          <span className="font-semibold">{order.userId?.name}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="mr-2">📧</span>
                          <span>{order.userId?.email}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="mr-2">📅</span>
                          <span>
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start justify-end">
                      <div className="w-full md:w-auto">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Update Status
                        </label>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className={`w-full px-4 py-3 rounded-xl font-bold border-2 cursor-pointer transition-all duration-300 ${getStatusColor(
                            order.status
                          )}`}
                        >
                          <option value="pending">⏳ Pending</option>
                          <option value="processing">📦 Processing</option>
                          <option value="shipped">🚚 Shipped</option>
                          <option value="delivered">✅ Delivered</option>
                          <option value="cancelled">❌ Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-6">
                  {/* Items */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                      <span className="mr-2">🛍️</span>
                      Order Items
                    </h4>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <span className="font-bold text-lg text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-primary-100">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                      <span className="mr-2">📍</span>
                      Shipping Address
                    </h4>
                    <p className="text-gray-700">
                      {order.shippingAddress.street}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                      {order.shippingAddress.country}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="border-t-2 border-gray-200 pt-4 flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Order Total:</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
