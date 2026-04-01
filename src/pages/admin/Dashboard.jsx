import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Bot,
} from 'lucide-react';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

import { getProducts, getOrders, getCategories } from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCategories: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const revenueChart = [
    { name: 'Mon', revenue: 12000000 },
    { name: 'Tue', revenue: 15000000 },
    { name: 'Wed', revenue: 9000000 },
    { name: 'Thu', revenue: 20000000 },
    { name: 'Fri', revenue: 18000000 },
    { name: 'Sat', revenue: 22000000 },
    { name: 'Sun', revenue: 17000000 },
  ];

  const ordersChart = [
    { name: 'Mon', orders: 40 },
    { name: 'Tue', orders: 55 },
    { name: 'Wed', orders: 30 },
    { name: 'Thu', orders: 60 },
    { name: 'Fri', orders: 75 },
    { name: 'Sat', orders: 90 },
    { name: 'Sun', orders: 65 },
  ];

  const colorClasses = {
    primary: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-500',
    },
    danger: {
      bg: 'bg-red-500/20',
      text: 'text-red-500',
    },
    success: {
      bg: 'bg-green-500/20',
      text: 'text-green-500',
    },
    warning: {
      bg: 'bg-yellow-500/20',
      text: 'text-yellow-500',
    },
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [productsRes, ordersRes, categoriesRes] = await Promise.all([
        getProducts({}),
        getOrders(),
        getCategories(),
      ]);

      const orders = ordersRes.data;

      const totalRevenue = orders.reduce(
        (sum, order) => sum + order.totalPrice,
        0,
      );

      setStats({
        totalProducts: productsRes.data.pagination?.total || 0,
        totalOrders: orders.length,
        totalRevenue,
        totalCategories: categoriesRes.data.length,
      });

      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'primary',
      link: '/admin/products',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'danger',
      link: '/admin/orders',
    },
    {
      title: 'Revenue',
      value: formatPrice(stats.totalRevenue),
      icon: DollarSign,
      color: 'success',
      link: '/admin/orders',
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: TrendingUp,
      color: 'warning',
      link: '/admin/categories',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-400">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-md">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-md rounded-xl border border-[#2a2a2a]">
        <h1 className="text-heading-lg font-bold text-white">Welcome Admin 👋</h1>
        <p className="text-gray-400">Manage your store dashboard</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-md">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const colors = colorClasses[stat.color];

          return (
            <Link
              key={stat.title}
              to={stat.link}
              className="bg-[#121212] p-md rounded-xl border border-[#2a2a2a] hover:border-blue-500/40 transition-all hover:-translate-y-1"
            >
              <div className="flex justify-between items-center mb-md">
                <div
                  className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
              </div>

              <p className="text-gray-400 text-body">{stat.title}</p>
              <h2 className="text-white text-heading-md font-bold mt-xs">
                {stat.value}
              </h2>
            </Link>
          );
        })}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
        {/* REVENUE */}
        <div className="bg-[#121212] p-md rounded-xl border border-[#2a2a2a]">
          <h3 className="text-white font-semibold mb-md">Revenue (7 days)</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueChart}>
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
              />
              <CartesianGrid stroke="#2a2a2a" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ORDERS */}
        <div className="bg-[#121212] p-6 rounded-xl border border-[#2a2a2a]">
          <h3 className="text-white font-semibold mb-4">Orders (7 days)</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ordersChart}>
              <Bar dataKey="orders" fill="#3b82f6" />
              <CartesianGrid stroke="#2a2a2a" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-[#121212] p-6 rounded-xl border border-[#2a2a2a]">
        <div className="flex justify-between mb-4">
          <h3 className="text-white font-semibold">Recent Orders</h3>

          <Link
            to="/admin/orders"
            className="text-blue-500 hover:underline text-sm"
          >
            View All
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-gray-400 text-center py-6">No orders yet</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex justify-between items-center p-4 bg-[#0f0f0f] rounded-lg"
              >
                <div>
                  <p className="text-white font-medium">{order.customerName}</p>
                  <p className="text-gray-400 text-sm">
                    {order.items.length} items
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-blue-500 font-semibold">
                    {formatPrice(order.totalPrice)}
                  </p>

                  <span className="text-xs text-gray-400">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-[#121212] p-6 rounded-xl border border-[#2a2a2a]">
        <h3 className="text-white font-semibold mb-4">Quick Actions</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/products/new"
            className="p-4 bg-[#0f0f0f] rounded-lg text-center hover:border-blue-500 border border-[#2a2a2a]"
          >
            <Package className="mx-auto text-blue-500 mb-2" />
            <p className="text-white text-sm">Add Product</p>
          </Link>

          <Link
            to="/admin/categories/new"
            className="p-4 bg-[#0f0f0f] rounded-lg text-center hover:border-blue-500 border border-[#2a2a2a]"
          >
            <TrendingUp className="mx-auto text-blue-500 mb-2" />
            <p className="text-white text-sm">Add Category</p>
          </Link>

          <Link
            to="/admin/orders"
            className="p-4 bg-[#0f0f0f] rounded-lg text-center hover:border-blue-500 border border-[#2a2a2a]"
          >
            <ShoppingCart className="mx-auto text-blue-500 mb-2" />
            <p className="text-white text-sm">Orders</p>
          </Link>

          <Link
            to="/admin/agents"
            className="p-4 bg-[#0f0f0f] rounded-lg text-center hover:border-blue-500 border border-[#2a2a2a]"
          >
            <Bot className="mx-auto text-blue-500 mb-2" />
            <p className="text-white text-sm">AI Agents</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
