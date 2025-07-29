import { useIsMobile } from '@/hooks/use-mobile';
import OtherClassesDesktop from '@/components/tables/desktop-table/other-classes-desktop';
import { Skeleton } from '@/components/ui/skeleton';
import OtherClassesMobile from '@/components/tables/mobile-table/other-classes-mobile';
import { startTransition, Suspense, useEffect, useState } from 'react';

const OtherClassesIndex = () => {
  const [isRendering, setIsRendering] = useState(false);
  const isMobile = useIsMobile();

  const handleLayoutChange = () => {
    startTransition(() => {
      setIsRendering(true);
    });
  };

  useEffect(() => {
    handleLayoutChange();
  }, [isMobile]);

  return (
    <Suspense fallback={<LayoutSkeleton />}>
      {isRendering ? (
        isMobile ? (
          <OtherClassesMobile />
        ) : (
          <OtherClassesDesktop />
        )
      ) : isMobile ? (
        <OtherClassesMobile />
      ) : (
        <OtherClassesDesktop />
      )}
    </Suspense>
  );
};

const LayoutSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-[200px]" />
    <Skeleton className="h-4 w-[250px]" />
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  </div>
);

export default OtherClassesIndex;
