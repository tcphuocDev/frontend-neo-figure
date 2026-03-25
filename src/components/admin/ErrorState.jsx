import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorState = ({
  title = 'Something went wrong',
  message = 'We encountered an error while loading the data. Please try again.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-10 h-10 text-rose-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-sm mb-6">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-lg transition-colors duration-200 font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
