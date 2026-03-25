import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

const ModernStatCard = ({
  title,
  value,
  change,
  icon: Icon,
  trend = 'up',
  color = 'blue',
  description,
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      icon: 'text-blue-600 dark:text-blue-400',
      gradient: 'from-blue-500 to-blue-600',
      ring: 'ring-blue-100 dark:ring-blue-900/50',
    },
    green: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      icon: 'text-emerald-600 dark:text-emerald-400',
      gradient: 'from-emerald-500 to-emerald-600',
      ring: 'ring-emerald-100 dark:ring-emerald-900/50',
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-950/30',
      icon: 'text-orange-600 dark:text-orange-400',
      gradient: 'from-orange-500 to-orange-600',
      ring: 'ring-orange-100 dark:ring-orange-900/50',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-950/30',
      icon: 'text-purple-600 dark:text-purple-400',
      gradient: 'from-purple-500 to-purple-600',
      ring: 'ring-purple-100 dark:ring-purple-900/50',
    },
    pink: {
      bg: 'bg-pink-50 dark:bg-pink-950/30',
      icon: 'text-pink-600 dark:text-pink-400',
      gradient: 'from-pink-500 to-pink-600',
      ring: 'ring-pink-100 dark:ring-pink-900/50',
    },
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700/50 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Background gradient effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-3 rounded-xl ${colors.bg} ring-1 ${colors.ring} group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={`w-6 h-6 ${colors.icon}`} />
          </div>

          {change !== undefined && (
            <div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                trend === 'up'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                  : 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400'
              }`}
            >
              {trend === 'up' ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</p>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1 pt-1">
              {description}
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
          )}
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
};

export default ModernStatCard;
