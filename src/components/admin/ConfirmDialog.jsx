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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-md">
      <div className="bg-dark-card rounded-lg border border-[#2a2a2a] max-w-md w-full p-md">
        <div className="flex items-start gap-sm mb-md">
          <div
            className={`w-12 h-12 rounded-full bg-${type}/20 flex items-center justify-center flex-shrink-0`}
          >
            <AlertTriangle className={`w-5 h-5 text-${type}`} />
          </div>
          <div>
            <h3 className="text-heading-sm font-bold text-white mb-sm">{title}</h3>
            <p className="text-text-secondary text-body">{message}</p>
          </div>
        </div>

        <div className="flex items-center gap-sm">
          <button
            onClick={onConfirm}
            className={`flex-1 px-md py-sm ${buttonColors[type]} text-white font-bold rounded-lg transition-colors`}
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-md py-sm bg-dark border border-[#2a2a2a] text-white rounded-lg hover:border-primary transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
