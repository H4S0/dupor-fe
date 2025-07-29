import { Suspense, startTransition, useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import AllClassesDesktop from '@/components/tables/desktop-table/all-classes-desktop';
import AllClassesMobile from '@/components/tables/mobile-table/all-classes-mobile';
import { Skeleton } from '@/components/ui/skeleton';

export const AllClassesIndex = () => {
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
          <AllClassesMobile />
        ) : (
          <AllClassesDesktop />
        )
      ) : isMobile ? (
        <AllClassesMobile />
      ) : (
        <AllClassesDesktop />
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

export default AllClassesIndex;
