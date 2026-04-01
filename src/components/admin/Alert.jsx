import { AlertCircle, CheckCircle, X } from 'lucide-react';

export default function Alert({ type = 'info', message, onClose }) {
  const styles = {
    success: {
      bg: 'bg-success/10',
      border: 'border-success',
      text: 'text-success',
      icon: CheckCircle,
    },
    error: {
      bg: 'bg-error/10',
      border: 'border-error',
      text: 'text-error',
      icon: AlertCircle,
    },
    warning: {
      bg: 'bg-warning/10',
      border: 'border-warning',
      text: 'text-warning',
      icon: AlertCircle,
    },
    info: {
      bg: 'bg-primary-light',
      border: 'border-primary',
      text: 'text-primary',
      icon: AlertCircle,
    },
  };

  const style = styles[type] || styles.info;
  const Icon = style.icon;

  return (
    <div
      className={`${style.bg} ${style.border} border rounded-lg p-md flex items-start gap-sm`}
    >
      <Icon className={`w-5 h-5 ${style.text} flex-shrink-0 mt-0.5`} />
      <p className={`flex-1 ${style.text} text-body`}>{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className={`${style.text} hover:opacity-70 transition-opacity`}
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
