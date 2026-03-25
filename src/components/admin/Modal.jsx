import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div
        className={`bg-background-card dark:bg-gray-800 rounded-xl border border-border dark:border-gray-700 shadow-2xl ${sizes[size]} w-full max-h-[90vh] flex flex-col animate-slideUp`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border dark:border-gray-700">
          <h3 className="text-xl font-bold text-text-primary dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary dark:hover:text-white hover:bg-background dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="p-6 border-t border-border dark:border-gray-700 bg-background dark:bg-gray-900/30 flex items-center justify-end space-x-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
