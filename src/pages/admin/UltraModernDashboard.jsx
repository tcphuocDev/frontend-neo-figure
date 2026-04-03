import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import ModernStatCard from '../../components/admin/ModernStatCard';
import ModernTable from '../../components/admin/ModernTable';
import QuickActions from '../../components/admin/QuickActions';
import { formatPrice } from '../../utils/adminUtils';
import { adminApi } from '../../services/adminApi';
import { getOrders } from '../../services/api';

const UltraModernDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        adminApi.getDashboardStats(),
        getOrders(),
      ]);

      const statsData = statsRes.data;

      // Format stats for display
      const formattedStats = [
        {
          title: 'Total Revenue',
          value: formatPrice(statsData.totalRevenue || 0),
          change: 12.5,
          trend: 'up',
          icon: DollarSign,
          color: 'emerald',
          description: 'Total sales revenue',
        },
        {
          title: 'Total Orders',
          value: statsData.totalOrders || 0,
          change: 8.2,
          trend: 'up',
          icon: ShoppingCart,
          color: 'blue',
          description: `${statsData.totalOrders || 0} total orders`,
        },
        {
          title: 'Total Customers',
          value: statsData.totalUsers || 0,
          change: 15.3,
          trend: 'up',
          icon: Users,
          color: 'purple',
          description: 'Registered users',
        },
        {
          title: 'Products',
          value: statsData.totalProducts || 0,
          change: statsData.lowStockProducts > 0 ? -3.1 : 0,
          trend: statsData.lowStockProducts > 0 ? 'down' : 'up',
          icon: Package,
          color: 'orange',
          description: `${statsData.lowStockProducts || 0} low in stock`,
        },
      ];

      setStats(formattedStats);

      // Format recent orders
      const orders = ordersRes.data.slice(0, 5).map((order) => ({
        id: order._id,
        customer: order.customerName || 'N/A',
        product: order.items?.[0]?.name || 'N/A',
        amount: order.totalPrice,
        status: order.status || 'pending',
        date: new Date(order.createdAt || Date.now()).toLocaleDateString('vi-VN'),
      }));

      setRecentOrders(orders);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Table columns
  const columns = [
    {
      key: 'id',
      label: 'Order ID',
      render: (value) => (
        <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
          {value.substring(0, 8)}...
        </span>
      ),
    },
    {
      key: 'customer',
      label: 'Customer',
      render: (value) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
            {value
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)}
          </div>
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: 'product',
      label: 'Product',
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value) => (
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          {formatPrice(value)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const statusConfig = {
          completed: {
            bg: 'bg-emerald-50 dark:bg-emerald-950/30',
            text: 'text-emerald-700 dark:text-emerald-400',
            label: 'Completed',
          },
          pending: {
            bg: 'bg-orange-50 dark:bg-orange-950/30',
            text: 'text-orange-700 dark:text-orange-400',
            label: 'Pending',
          },
          shipped: {
            bg: 'bg-blue-50 dark:bg-blue-950/30',
            text: 'text-blue-700 dark:text-blue-400',
            label: 'Shipped',
          },
        };
        const config = statusConfig[value] || statusConfig.pending;
        return (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${config.text.replace('text-', 'bg-')} mr-1.5`}
            />
            {config.label}
          </span>
        );
      },
    },
    {
      key: 'date',
      label: 'Date',
      render: (value) => <span className="text-gray-600 dark:text-gray-400 text-sm">{value}</span>,
    },
  ];

  return (
    <div className="min-h-screen space-y-6">
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-sm"
          >
            <div>
              <h1 className="text-heading-lg font-bold text-gray-900 dark:text-white mb-xs">
                Dashboard
              </h1>
              <p className="text-body text-gray-600 dark:text-gray-400 flex items-center gap-xs">
                <Calendar className="w-4 h-4" />
                <span>Welcome back! Here's what's happening today.</span>
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-sm"
          >
            {stats.map((stat, index) => (
              <ModernStatCard key={index} {...stat} />
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <QuickActions />
          </motion.div>

          {/* Charts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-1 gap-sm"
          >
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 p-sm h-full">
              <div className="flex items-center justify-between mb-sm">
                <div>
                  <h3 className="text-heading-sm font-semibold text-gray-900 dark:text-white mb-xs">
                    Revenue Overview
                  </h3>
                  <p className="text-body text-gray-600 dark:text-gray-400">
                    Sales performance over time
                  </p>
                </div>
              </div>
              <div className="h-80 flex items-center justify-center text-gray-400 dark:text-gray-600">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 mx-auto mb-sm opacity-50" />
                  <p className="text-body">Chart visualization coming soon</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Orders Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mb-sm">
              <h3 className="text-heading-sm font-semibold text-gray-900 dark:text-white mb-xs">
                Recent Orders
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Latest customer orders and their status
              </p>
            </div>
            <ModernTable
              data={recentOrders}
              columns={columns}
              searchable
              filterable
              exportable
              onRowClick={(row) => console.log('Row clicked:', row)}
            />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default UltraModernDashboard;
