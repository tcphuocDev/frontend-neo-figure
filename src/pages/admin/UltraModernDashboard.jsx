import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  TrendingUp,
  Calendar,
  Clock,
} from 'lucide-react';
import ModernStatCard from '../../components/admin/ModernStatCard';
import RecentActivity from '../../components/admin/RecentActivity';
import ModernTable from '../../components/admin/ModernTable';
import QuickActions from '../../components/admin/QuickActions';
import { formatPrice } from '../../utils/adminUtils';

const UltraModernDashboard = () => {
  // Stats data
  const [stats] = useState([
    {
      title: 'Total Revenue',
      value: formatPrice(125430000),
      change: 12.5,
      trend: 'up',
      icon: DollarSign,
      color: 'emerald',
      description: '+₫15.2M from last month',
    },
    {
      title: 'Active Orders',
      value: '1,832',
      change: 8.2,
      trend: 'up',
      icon: ShoppingCart,
      color: 'blue',
      description: '156 pending fulfillment',
    },
    {
      title: 'New Customers',
      value: '2,450',
      change: 15.3,
      trend: 'up',
      icon: Users,
      color: 'purple',
      description: '+347 this week',
    },
    {
      title: 'Products',
      value: '456',
      change: 3.1,
      trend: 'down',
      icon: Package,
      color: 'orange',
      description: '23 low in stock',
    },
  ]);

  // Recent activity data
  const [activities] = useState([
    {
      id: 1,
      type: 'order',
      title: 'New order received',
      description: 'Nguyễn Văn A ordered Gundam RX-78-2 and 2 other items',
      time: '2 minutes ago',
      user: 'System',
      status: 'success',
    },
    {
      id: 2,
      type: 'user',
      title: 'New customer registered',
      description: 'Trần Thị B signed up for an account',
      time: '15 minutes ago',
      user: 'System',
      status: 'success',
    },
    {
      id: 3,
      type: 'product',
      title: 'Product stock updated',
      description: 'One Piece Luffy Figure stock increased by 50 units',
      time: '1 hour ago',
      user: 'Admin',
      status: 'success',
    },
    {
      id: 4,
      type: 'order',
      title: 'Order shipped',
      description: 'Order #ORD-1234 has been shipped via Express delivery',
      time: '2 hours ago',
      user: 'Warehouse',
      status: 'success',
    },
    {
      id: 5,
      type: 'update',
      title: 'Price adjustment',
      description: 'Naruto Uzumaki Statue price changed from ₫2.5M to ₫2.1M',
      time: '3 hours ago',
      user: 'Admin',
      status: 'warning',
    },
  ]);

  // Recent orders table data
  const [recentOrders] = useState([
    {
      id: '#ORD-1234',
      customer: 'Nguyễn Văn A',
      product: 'Gundam RX-78-2',
      amount: 1250000,
      status: 'completed',
      date: '2026-03-07',
    },
    {
      id: '#ORD-1235',
      customer: 'Trần Thị B',
      product: 'One Piece Luffy',
      amount: 850000,
      status: 'pending',
      date: '2026-03-07',
    },
    {
      id: '#ORD-1236',
      customer: 'Lê Minh C',
      product: 'Naruto Uzumaki',
      amount: 2100000,
      status: 'shipped',
      date: '2026-03-06',
    },
    {
      id: '#ORD-1237',
      customer: 'Phạm Thị D',
      product: 'Dragon Ball Goku',
      amount: 1450000,
      status: 'completed',
      date: '2026-03-06',
    },
    {
      id: '#ORD-1238',
      customer: 'Hoàng Văn E',
      product: 'Evangelion Unit-01',
      amount: 3200000,
      status: 'pending',
      date: '2026-03-05',
    },
  ]);

  // Table columns
  const columns = [
    {
      key: 'id',
      label: 'Order ID',
      render: (value) => (
        <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">{value}</span>
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
    <div className="min-h-screen space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Welcome back! Here's what's happening today.</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Last 7 days
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl text-sm font-medium shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            View Report
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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

      {/* Charts & Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Recent Activity - Takes 1 column */}
        <div className="lg:col-span-1">
          <RecentActivity activities={activities} />
        </div>

        {/* Charts placeholder - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Revenue Overview
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sales performance over time
                </p>
              </div>
              <select className="px-3 py-2 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
            <div className="h-80 flex items-center justify-center text-gray-400 dark:text-gray-600">
              {/* Chart component would go here */}
              <div className="text-center">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Chart visualization</p>
                <p className="text-xs mt-1">Install recharts to see the chart</p>
              </div>
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
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
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
    </div>
  );
};

export default UltraModernDashboard;
