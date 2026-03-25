import { AlertTriangle } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
}) {
  if (!isOpen) return null;

  const buttonColors = {
    danger: 'bg-danger hover:bg-danger/90',
    warning: 'bg-warning hover:bg-warning/90',
    success: 'bg-success hover:bg-success/90',
    primary: 'bg-primary hover:bg-primary/90',
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card rounded-lg border border-[#2a2a2a] max-w-md w-full p-6">
        <div className="flex items-start space-x-4 mb-6">
          <div
            className={`w-12 h-12 rounded-full bg-${type}/20 flex items-center justify-center flex-shrink-0`}
          >
            <AlertTriangle className={`w-6 h-6 text-${type}`} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-text-secondary text-sm">{message}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 ${buttonColors[type]} text-white font-bold rounded-lg transition-colors`}
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-dark border border-[#2a2a2a] text-white rounded-lg hover:border-primary transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
