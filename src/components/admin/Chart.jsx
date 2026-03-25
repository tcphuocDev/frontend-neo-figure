import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background-card dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-border dark:border-gray-700">
        <p className="text-sm font-medium text-text-primary dark:text-white mb-2">
          {label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const RevenueChart = ({ data }) => {
  return (
    <div className="bg-background-card dark:bg-gray-800 rounded-xl shadow-sm border border-border dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary dark:text-white">
          Revenue Overview
        </h3>
        <select className="px-3 py-1.5 text-sm border border-border dark:border-gray-600 rounded-lg bg-background-card dark:bg-gray-700 text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
          <option>Last year</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.3} />
          <XAxis dataKey="name" stroke="#6B7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#1677FF"
            strokeWidth={3}
            dot={{ fill: '#1677FF', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            name="Revenue"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const OrdersChart = ({ data }) => {
  return (
    <div className="bg-background-card dark:bg-gray-800 rounded-xl shadow-sm border border-border dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary dark:text-white">
          Orders Statistics
        </h3>
        <select className="px-3 py-1.5 text-sm border border-border dark:border-gray-600 rounded-lg bg-background-card dark:bg-gray-700 text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.3} />
          <XAxis dataKey="name" stroke="#6B7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="orders"
            fill="#1677FF"
            radius={[8, 8, 0, 0]}
            name="Orders"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
