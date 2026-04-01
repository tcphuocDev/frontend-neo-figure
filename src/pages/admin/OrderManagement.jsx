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
        color: 'warning',
        text: 'Pending',
      },
      paid: {
        icon: CheckCircle,
        color: 'success',
        text: 'Paid',
      },
      shipped: {
        icon: Truck,
        color: 'primary',
        text: 'Shipped',
      },
      delivered: {
        icon: Check,
        color: 'success',
        text: 'Delivered',
      },
      cancelled: {
        icon: X,
        color: 'danger',
        text: 'Cancelled',
      },
    };

    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;

    return (
      <span
        className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs bg-${badge.color}/20 text-${badge.color}`}
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
    <div className="space-y-md">
      {/* Header */}
      <div>
        <h2 className="text-heading-lg font-bold text-white">Order Management</h2>
        <p className="text-text-secondary mt-xs">Manage customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-md">
        {[
          { label: 'All Orders', value: statusCounts.all, status: 'all' },
          { label: 'Pending', value: statusCounts.pending, status: 'pending' },
          { label: 'Paid', value: statusCounts.paid, status: 'paid' },
          { label: 'Shipped', value: statusCounts.shipped, status: 'shipped' },
        ].map((stat) => (
          <button
            key={stat.status}
            onClick={() => setStatusFilter(stat.status)}
            className={`p-md rounded-lg border transition-all ${
              statusFilter === stat.status
                ? 'bg-primary/20 border-primary'
                : 'bg-dark-card border-[#2a2a2a] hover:border-primary/50'
            }`}
          >
            <p className="text-text-secondary text-sm">{stat.label}</p>
            <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-dark-card p-sm rounded-lg border border-[#2a2a2a]">
        <div className="flex items-center space-x-sm">
          <input
            type="text"
            placeholder="Search by customer name, phone, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-sm py-xs bg-dark border border-[#2a2a2a] rounded-lg text-sm text-white focus:border-primary focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-md py-xs bg-primary text-dark font-bold rounded-lg text-sm hover:bg-primary/90 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-dark-card rounded-lg border border-[#2a2a2a] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-text-secondary">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">No orders found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark border-b border-[#2a2a2a]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2a]">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-dark/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-white font-mono text-sm">#{order._id.slice(-8)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium">{order.customerName}</p>
                        <p className="text-text-secondary text-sm">{order.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-text-secondary">{order.items.length} items</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-primary font-bold">{formatPrice(order.totalPrice)}</p>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="p-2 text-text-secondary hover:text-primary hover:bg-dark rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'paid')}
                            className="px-3 py-1 text-xs bg-success/20 text-success rounded hover:bg-success/30 transition-colors"
                          >
                            Confirm
                          </button>
                        )}
                        {order.status === 'paid' && (
                          <button
                            onClick={() => updateOrderStatus(order._id, 'shipped')}
                            className="px-3 py-1 text-xs bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors"
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
