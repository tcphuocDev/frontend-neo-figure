import { TrendingUp, TrendingDown } from 'lucide-react';

/* eslint-disable no-unused-vars */
const StatCard = ({
  title,
  value,
  change,
  icon: IconComponent,
  trend = 'up',
  color = 'primary',
}) => {
  /* eslint-enable no-unused-vars */
  const colors = {
    primary: 'from-primary to-primary-hover',
    success: 'from-success to-emerald-600',
    warning: 'from-warning to-orange-600',
    danger: 'from-error to-red-600',
    purple: 'from-purple-500 to-pink-500',
  };

  const bgColors = {
    primary: 'bg-primary/10',
    success: 'bg-success/10',
    warning: 'bg-warning/10',
    danger: 'bg-error/10',
    purple: 'bg-purple-500/10',
  };

  const iconColors = {
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-error',
    purple: 'text-purple-500',
  };

  return (
    <div className="bg-background-card dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-border dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${bgColors[color]}`}>
            <IconComponent className={`w-6 h-6 ${iconColors[color]}`} />
          </div>
          {change && (
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                trend === 'up' ? 'text-success' : 'text-error'
              }`}
            >
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{change}%</span>
            </div>
          )}
        </div>
        <div>
          <p className="text-sm text-text-secondary dark:text-gray-400 font-medium mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-text-primary dark:text-white">
            {value}
          </p>
        </div>
      </div>
      <div className={`h-1 bg-gradient-to-r ${colors[color]}`} />
    </div>
  );
};

export default StatCard;
