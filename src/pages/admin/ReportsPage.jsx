import { useState } from 'react';
import {
  Download,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
} from 'lucide-react';
import { RevenueChart, OrdersChart } from '../../components/admin/Chart';
import StatCard from '../../components/admin/StatCard';
import { formatPrice } from '../../utils/adminUtils';

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState('7days');

  const [salesData] = useState([
    { name: 'Mon', revenue: 12500000, orders: 45 },
    { name: 'Tue', revenue: 15200000, orders: 52 },
    { name: 'Wed', revenue: 11800000, orders: 38 },
    { name: 'Thu', revenue: 18400000, orders: 61 },
    { name: 'Fri', revenue: 21500000, orders: 73 },
    { name: 'Sat', revenue: 25300000, orders: 85 },
    { name: 'Sun', revenue: 20600000, orders: 68 },
  ]);

  const [topProducts] = useState([
    { name: 'Gundam RX-78-2', sales: 125, revenue: 156250000 },
    { name: 'One Piece Luffy', sales: 98, revenue: 83300000 },
    { name: 'Naruto Uzumaki', sales: 76, revenue: 159600000 },
    { name: 'Dragon Ball Goku', sales: 64, revenue: 92800000 },
    { name: 'Evangelion Unit-01', sales: 52, revenue: 166400000 },
  ]);

  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  return (
    <div className="space-y-md">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-lg font-bold text-text-primary dark:text-white mb-xs">
            Reports & Analytics
          </h1>
          <p className="text-text-secondary dark:text-gray-400">
            View detailed reports and insights about your business
          </p>
        </div>
        <div className="flex items-center gap-sm">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-md py-sm border border-border dark:border-gray-600 rounded-lg bg-background-card dark:bg-gray-700 text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="3months">Last 3 months</option>
            <option value="year">This year</option>
          </select>
          <button className="inline-flex items-center gap-sm px-md py-sm bg-primary hover:bg-primary-hover text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          change={15.3}
          trend="up"
          icon={DollarSign}
          color="success"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders.toString()}
          change={8.2}
          trend="up"
          icon={ShoppingCart}
          color="primary"
        />
        <StatCard
          title="Avg. Order Value"
          value={formatPrice(avgOrderValue)}
          change={5.7}
          trend="up"
          icon={TrendingUp}
          color="warning"
        />
        <StatCard
          title="New Customers"
          value="142"
          change={12.1}
          trend="up"
          icon={Users}
          color="purple"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
        <RevenueChart data={salesData} />
        <OrdersChart data={salesData} />
      </div>

      {/* Top Products */}
      <div className="bg-background-card dark:bg-gray-800 rounded-xl shadow-sm border border-border dark:border-gray-700 p-md">
        <h3 className="text-heading-sm font-semibold text-text-primary dark:text-white mb-md">
          Top Selling Products
        </h3>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between pb-4 border-b border-border dark:border-gray-800 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-sm">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg text-white font-bold shadow-md">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-text-primary dark:text-white">
                    {product.name}
                  </p>
                  <p className="text-body text-text-secondary dark:text-gray-400">
                    {product.sales} units sold
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-text-primary dark:text-white">
                  {formatPrice(product.revenue)}
                </p>
                <p className="text-sm text-success">Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sales by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
        <div className="bg-background-card dark:bg-gray-800 rounded-xl shadow-sm border border-border dark:border-gray-700 p-md">
          <h3 className="text-heading-sm font-semibold text-text-primary dark:text-white mb-md">
            Sales by Category
          </h3>
          <div className="space-y-sm">
            {[
              { category: 'Gundam', percentage: 35, revenue: 87500000 },
              { category: 'One Piece', percentage: 25, revenue: 62500000 },
              { category: 'Naruto', percentage: 20, revenue: 50000000 },
              { category: 'Dragon Ball', percentage: 15, revenue: 37500000 },
              { category: 'Others', percentage: 5, revenue: 12500000 },
            ].map((item, index) => (
              <div key={index} className="space-y-xs">
                <div className="flex items-center justify-between text-body">
                  <span className="font-medium text-text-primary dark:text-white">
                    {item.category}
                  </span>
                  <span className="text-text-secondary dark:text-gray-400">
                    {item.percentage}%
                  </span>
                </div>
                <div className="relative h-2 bg-background dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-primary rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-small-text text-text-secondary dark:text-gray-400">
                  {formatPrice(item.revenue)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background-card dark:bg-gray-800 rounded-xl shadow-sm border border-border dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-6">
            Customer Insights
          </h3>
          <div className="space-y-md">
            <div>
              <div className="flex items-center justify-between mb-xs">
                <p className="text-body font-medium text-text-secondary dark:text-gray-400">
                  New Customers
                </p>
                <p className="text-2xl font-bold text-text-primary dark:text-white">
                  142
                </p>
              </div>
              <div className="flex items-center gap-sm text-body text-success">
                <TrendingUp className="w-4 h-4" />
                <span>+12.1% from last period</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-xs">
                <p className="text-body font-medium text-text-secondary dark:text-gray-400">
                  Returning Customers
                </p>
                <p className="text-heading-md font-bold text-text-primary dark:text-white">
                  68%
                </p>
              </div>
              <div className="relative h-2 bg-background dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-primary rounded-full"
                  style={{ width: '68%' }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-xs">
                <p className="text-body font-medium text-text-secondary dark:text-gray-400">
                  Customer Satisfaction
                </p>
                <p className="text-heading-md font-bold text-text-primary dark:text-white">
                  4.8/5
                </p>
              </div>
              <div className="flex items-center gap-xs">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? 'text-warning' : 'text-gray-300 dark:text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
