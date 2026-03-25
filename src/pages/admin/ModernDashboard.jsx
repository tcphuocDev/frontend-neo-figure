import { useState } from 'react';
import {
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Activity,
} from 'lucide-react';
import StatCard from '../../components/admin/StatCard';
import { RevenueChart, OrdersChart } from '../../components/admin/Chart';
import DataTable from '../../components/admin/DataTable';
import { formatPrice, formatDate } from '../../utils/adminUtils';

const ModernDashboard = () => {
  const [stats] = useState({
    totalUsers: 2450,
    totalOrders: 1832,
    revenue: 125430000,
    inventory: 456,
  });

  const [revenueData] = useState([
    { name: 'Mon', revenue: 12500000 },
    { name: 'Tue', revenue: 15200000 },
    { name: 'Wed', revenue: 11800000 },
    { name: 'Thu', revenue: 18400000 },
    { name: 'Fri', revenue: 21500000 },
    { name: 'Sat', revenue: 25300000 },
    { name: 'Sun', revenue: 20600000 },
  ]);

  const [ordersData] = useState([
    { name: 'Mon', orders: 45 },
    { name: 'Tue', orders: 52 },
    { name: 'Wed', orders: 38 },
    { name: 'Thu', orders: 61 },
    { name: 'Fri', orders: 73 },
    { name: 'Sat', orders: 85 },
    { name: 'Sun', orders: 68 },
  ]);

  const [recentOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'Nguyễn Văn A',
      product: 'Gundam RX-78-2',
      amount: 1250000,
      status: 'completed',
      date: '2026-03-05T10:30:00',
    },
    {
      id: 'ORD-002',
      customer: 'Trần Thị B',
      product: 'One Piece Luffy Figure',
      amount: 850000,
      status: 'pending',
      date: '2026-03-05T09:15:00',
    },
    {
      id: 'ORD-003',
      customer: 'Lê Minh C',
      product: 'Naruto Uzumaki Statue',
      amount: 2100000,
      status: 'shipped',
      date: '2026-03-04T16:45:00',
    },
    {
      id: 'ORD-004',
      customer: 'Phạm Thị D',
      product: 'Dragon Ball Goku',
      amount: 1450000,
      status: 'completed',
      date: '2026-03-04T14:20:00',
    },
    {
      id: 'ORD-005',
      customer: 'Hoàng Văn E',
      product: 'Evangelion Unit-01',
      amount: 3200000,
      status: 'pending',
      date: '2026-03-04T11:00:00',
    },
  ]);

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'bg-success/10 text-success',
      pending: 'bg-warning/10 text-warning',
      shipped: 'bg-primary-light text-primary',
      cancelled: 'bg-error/10 text-error',
    };

    const labels = {
      completed: 'Completed',
      pending: 'Pending',
      shipped: 'Shipped',
      cancelled: 'Cancelled',
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  const columns = [
    {
      key: 'id',
      label: 'Order ID',
      sortable: true,
      render: (value) => <span className="font-mono font-medium">{value}</span>,
    },
    {
      key: 'customer',
      label: 'Customer',
      sortable: true,
    },
    {
      key: 'product',
      label: 'Product',
      sortable: true,
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (value) => (
        <span className="font-semibold">{formatPrice(value)}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => getStatusBadge(value),
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (value) => formatDate(value),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary dark:text-white mb-1">
            Dashboard Overview
          </h1>
          <p className="text-text-secondary dark:text-gray-400">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>
        <button className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg">
          Download Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change={12.5}
          trend="up"
          icon={Users}
          color="primary"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          change={8.2}
          trend="up"
          icon={ShoppingCart}
          color="success"
        />
        <StatCard
          title="Revenue"
          value={formatPrice(stats.revenue)}
          change={15.3}
          trend="up"
          icon={DollarSign}
          color="warning"
        />
        <StatCard
          title="Inventory Items"
          value={stats.inventory.toLocaleString()}
          change={3.1}
          trend="down"
          icon={Package}
          color="purple"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <OrdersChart data={ordersData} />
      </div>

      {/* Table and Activity Feed */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="xl:col-span-2">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Recent Orders
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Monitor your latest customer orders
            </p>
          </div>
          <DataTable
            data={recentOrders}
            columns={columns}
            searchable={true}
            onRowClick={(row) => console.log('Order clicked:', row)}
          />
        </div>

        {/* Activity Feed */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Activity className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Latest activities in your store
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              {
                action: 'New order placed',
                user: 'Nguyễn Văn A',
                time: '2 minutes ago',
                color: 'cyan',
              },
              {
                action: 'Product added',
                user: 'Admin',
                time: '15 minutes ago',
                color: 'emerald',
              },
              {
                action: 'Order shipped',
                user: 'System',
                time: '1 hour ago',
                color: 'blue',
              },
              {
                action: 'New user registered',
                user: 'Trần Thị B',
                time: '2 hours ago',
                color: 'purple',
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
              >
                <div
                  className={`w-2 h-2 rounded-full bg-${activity.color}-500`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    by {activity.user}
                  </p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDashboard;
