import { useState, useEffect, useCallback } from 'react';
import { Eye, Check, X, Truck, Clock, CheckCircle } from 'lucide-react';
import { getOrders } from '../../services/api';
import { adminApi } from '../../services/adminApi';
import OrderDetailModal from '../../components/admin/OrderDetailModal';

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getOrders();
      let filtered = data;

      if (statusFilter !== 'all') {
        filtered = data.filter((order) => order.status === statusFilter);
      }

      if (searchTerm) {
        filtered = filtered.filter(
          (order) =>
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.phone.includes(searchTerm) ||
            order._id.includes(searchTerm),
        );
      }

      setOrders(filtered);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearch = () => {
    fetchOrders();
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await adminApi.updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        icon: Clock,
        bgClass: 'bg-yellow-100 dark:bg-yellow-900/20',
        textClass: 'text-yellow-700 dark:text-yellow-400',
        text: 'Pending',
      },
      paid: {
        icon: CheckCircle,
        bgClass: 'bg-green-100 dark:bg-green-900/20',
        textClass: 'text-green-700 dark:text-green-400',
        text: 'Paid',
      },
      shipped: {
        icon: Truck,
        bgClass: 'bg-blue-100 dark:bg-blue-900/20',
        textClass: 'text-blue-700 dark:text-blue-400',
        text: 'Shipped',
      },
      delivered: {
        icon: Check,
        bgClass: 'bg-green-100 dark:bg-green-900/20',
        textClass: 'text-green-700 dark:text-green-400',
        text: 'Delivered',
      },
      cancelled: {
        icon: X,
        bgClass: 'bg-red-100 dark:bg-red-900/20',
        textClass: 'text-red-700 dark:text-red-400',
        text: 'Cancelled',
      },
    };

    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;

    return (
      <span
        className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${badge.bgClass} ${badge.textClass}`}
      >
        <Icon className="w-3 h-3" />
        <span>{badge.text}</span>
      </span>
    );
  };

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    paid: orders.filter((o) => o.status === 'paid').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order Management</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'All Orders', value: statusCounts.all, status: 'all' },
          { label: 'Pending', value: statusCounts.pending, status: 'pending' },
          { label: 'Paid', value: statusCounts.paid, status: 'paid' },
          { label: 'Shipped', value: statusCounts.shipped, status: 'shipped' },
        ].map((stat) => (
          <button
            key={stat.status}
            onClick={() => setStatusFilter(stat.status)}
            className={`p-4 rounded-lg border transition-all ${
              statusFilter === stat.status
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300'
            }`}
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
            <p className="text-gray-900 dark:text-white text-2xl font-bold mt-1">{stat.value}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search by customer name, phone, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-600 dark:text-gray-400">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-gray-600 dark:text-gray-400">No orders found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-gray-900 dark:text-white font-mono text-sm">#{order._id.slice(-8)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">{order.customerName}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{order.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 dark:text-gray-400">{order.items.length} items</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-blue-600 dark:text-blue-400 font-bold">{formatPrice(order.totalPrice)}</p>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'paid')}
                            className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors font-medium"
                          >
                            Confirm
                          </button>
                        )}
                        {order.status === 'paid' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'shipped')}
                            className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors font-medium"
                          >
                            Ship
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdateStatus={updateOrderStatus}
      />
    </div>
  );
}
