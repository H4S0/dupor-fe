import { useIsMobile } from '@/hooks/use-mobile';
import AllUserDesktop from '@/components/tables/desktop-table/all-users-desktop';
import AllUsersMobile from '@/components/tables/mobile-table/all-users-mobile';
import { Skeleton } from '@/components/ui/skeleton';
import { startTransition, Suspense, useEffect, useState } from 'react';

const AllUsersIndex = () => {
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
          <AllUsersMobile />
        ) : (
          <AllUserDesktop />
        )
      ) : isMobile ? (
        <AllUsersMobile />
      ) : (
        <AllUserDesktop />
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

export default AllUsersIndex;
