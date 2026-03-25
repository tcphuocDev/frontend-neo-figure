import { motion } from 'framer-motion';
import { Plus, Package, Users, ShoppingCart, Settings, ArrowRight } from 'lucide-react';

const QuickAction = ({ icon: Icon, label, description, color, onClick }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    emerald: 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
    orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
  };

  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700/50 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 transition-all duration-300 text-left overflow-hidden"
    >
      {/* Gradient background on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      <div className="relative">
        {/* Icon */}
        <div
          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg shadow-${color}-500/30 mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>

        {/* Content */}
        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
          {label}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>

        {/* Arrow indicator */}
        <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Get started</span>
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.button>
  );
};

const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      label: 'Add Product',
      description: 'Create a new product listing',
      color: 'blue',
      onClick: () => console.log('Add product'),
    },
    {
      icon: ShoppingCart,
      label: 'New Order',
      description: 'Process a manual order',
      color: 'purple',
      onClick: () => console.log('New order'),
    },
    {
      icon: Users,
      label: 'Add Customer',
      description: 'Register a new customer',
      color: 'emerald',
      onClick: () => console.log('Add customer'),
    },
    {
      icon: Settings,
      label: 'Settings',
      description: 'Configure your store',
      color: 'orange',
      onClick: () => console.log('Settings'),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Quick Actions</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Frequently used actions at your fingertips
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <QuickAction {...action} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
