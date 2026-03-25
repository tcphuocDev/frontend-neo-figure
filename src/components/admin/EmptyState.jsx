import { Inbox, Plus } from 'lucide-react';

/* eslint-disable no-unused-vars */
const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No data found',
  description = 'Get started by creating a new item',
  actionLabel = 'Create New',
  onAction,
}) => {
  /* eslint-enable no-unused-vars */
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-4 shadow-sm">
        <Icon className="w-10 h-10 text-text-secondary" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-text-secondary dark:text-gray-400 text-center max-w-sm mb-6">
        {description}
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
