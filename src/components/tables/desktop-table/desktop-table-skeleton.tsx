import { Skeleton } from '@/components/ui/skeleton';

export const DesktopTableSekeleton = () => (
  <div className="space-y-2 mt-4">
    <div className="rounded-md border p-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex items-center gap-4 py-2">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-w-full" />
        </div>
      ))}
    </div>
  </div>
);
