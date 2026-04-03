import { useState, useEffect } from 'react';
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
import { adminApi } from '../../services/adminApi';

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({});
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  // Map dateRange to API period parameter
  const getPeriodParam = (range) => {
    const periodMap = {
      '7days': '7d',
      '30days': '30d',
      '3months': '90d',
      'year': '365d',
    };
    return periodMap[range] || '7d';
  };

  useEffect(() => {
    fetchReportsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  const fetchReportsData = async () => {
    setLoading(true);
    try {
      const period = getPeriodParam(dateRange);

      const [stats, revenue, ordersStats, products] = await Promise.all([
        adminApi.getDashboardStats(),
        adminApi.getRevenue(period),
        adminApi.getOrdersStats(period),
        adminApi.getTopProducts(5),
      ]);

      setDashboardStats(stats.data);

      // Combine revenue and orders data
      const combined = revenue.data.map(r => {
        const orderData = ordersStats.data.find(o => o.date === r.date);
        return {
          name: new Date(r.date).toLocaleDateString('en-US', { weekday: 'short' }),
          revenue: r.revenue,
          orders: orderData?.count || 0,
        };
      });
      setSalesData(combined);

      // Format top products
      const formattedProducts = products.data.map(p => ({
        name: p.name,
        sales: p.soldCount,
        revenue: p.price * p.soldCount,
      }));
      setTopProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = salesData.reduce((sum, day) => sum + (day.revenue || 0), 0);
  const totalOrders = salesData.reduce((sum, day) => sum + (day.orders || 0), 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  if (loading && salesData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading reports...</p>
        </div>
      </div>
    );
  }

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
