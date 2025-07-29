import { Loader2 } from 'lucide-react';
import AppLayout from './dashboard-layout';
import { useEffect, useState } from 'react';

interface LoadingSpinnerProps {
  minDuration?: number;
}

export default function LoadingSpinner({
  minDuration = 1500,
}: LoadingSpinnerProps) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  if (!showLoader) {
    return null;
  }

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
        <div className="w-32 bg-gray-200 rounded-full h-1.5 mt-2">
          <div
            className="bg-primary h-1.5 rounded-full animate-progress"
            style={{
              animationDuration: `${minDuration}ms`,
              animationTimingFunction: 'linear',
            }}
          />
        </div>
      </div>
    </AppLayout>
  );
}
