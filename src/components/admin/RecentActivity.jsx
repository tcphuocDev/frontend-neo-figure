import { motion } from 'framer-motion';
import {
  ShoppingBag,
  UserPlus,
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react';

const ActivityItem = ({ activity, index }) => {
  const iconMap = {
    order: ShoppingBag,
    user: UserPlus,
    product: Package,
    update: TrendingUp,
  };

  const colorMap = {
    order: {
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      icon: 'text-blue-600 dark:text-blue-400',
      dot: 'bg-blue-500',
    },
    user: {
      bg: 'bg-purple-50 dark:bg-purple-950/30',
      icon: 'text-purple-600 dark:text-purple-400',
      dot: 'bg-purple-500',
    },
    product: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      icon: 'text-emerald-600 dark:text-emerald-400',
      dot: 'bg-emerald-500',
    },
    update: {
      bg: 'bg-orange-50 dark:bg-orange-950/30',
      icon: 'text-orange-600 dark:text-orange-400',
      dot: 'bg-orange-500',
    },
  };

  const statusMap = {
    success: { icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400' },
    pending: { icon: Clock, color: 'text-orange-600 dark:text-orange-400' },
    failed: { icon: XCircle, color: 'text-red-600 dark:text-red-400' },
    warning: { icon: AlertCircle, color: 'text-yellow-600 dark:text-yellow-400' },
  };

  const Icon = iconMap[activity.type] || ShoppingBag;
  const colors = colorMap[activity.type] || colorMap.order;
  const StatusIcon = activity.status ? statusMap[activity.status]?.icon : null;
  const statusColor = activity.status ? statusMap[activity.status]?.color : '';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 cursor-pointer"
    >
      {/* Timeline line */}
      {index !== 0 && (
        <div className="absolute left-[30px] top-0 w-px h-4 bg-gray-200 dark:bg-gray-700" />
      )}

      {/* Icon */}
      <div
        className={`relative flex-shrink-0 w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center ring-1 ring-gray-100 dark:ring-gray-800 group-hover:scale-110 transition-transform duration-200`}
      >
        <Icon className={`w-5 h-5 ${colors.icon}`} />
        <div
          className={`absolute -bottom-1 -right-1 w-3 h-3 ${colors.dot} rounded-full ring-2 ring-white dark:ring-gray-900`}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
            {activity.title}
          </p>
          {StatusIcon && <StatusIcon className={`w-4 h-4 flex-shrink-0 ${statusColor}`} />}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
          {activity.description}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 dark:text-gray-500">{activity.time}</span>
          {activity.user && (
            <>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500 dark:text-gray-500">by {activity.user}</span>
            </>
          )}
        </div>
      </div>

      {/* Hover indicator */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
      </div>
    </motion.div>
  );
};

const RecentActivity = ({ activities = [] }) => {
  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700/50">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Latest updates from your store
          </p>
        </div>
        <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
          View all
        </button>
      </div>

      {/* Activity list */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <ActivityItem key={activity.id || index} activity={activity} index={index} />
          ))
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
              No recent activity
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Activity will appear here as it happens
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
