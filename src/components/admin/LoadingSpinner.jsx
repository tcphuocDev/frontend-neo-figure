import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className={`${sizes[size]} text-primary animate-spin mb-3`} />
      {text && <p className="text-text-secondary text-sm">{text}</p>}
    </div>
  );
}
