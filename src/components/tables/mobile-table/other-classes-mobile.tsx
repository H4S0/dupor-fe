import AppLayout from '@/components/additional/dashboard-layout';
import { useInfiniteOtherClasses } from '@/hooks/queries/class';
import { startTransition, useEffect, useState } from 'react';
import TableHeader from '../desktop-table/table-header';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import ClassCard from './cards/class-card';

const OtherClassesMobile = () => {
  const { inView, ref } = useInView();
  const [searchQuery, setSearchQuery] = useState('');
  const [deferredSearchQuery, setDeferredSearchQuery] = useState('');
  const { data, fetchNextPage, isFetching } = useInfiniteOtherClasses({
    query: deferredSearchQuery,
    limit: 10,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    startTransition(() => {
      setDeferredSearchQuery(value);
    });
  };

  return (
    <AppLayout>
      <TableHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        title="Manage classes"
        descriptionWord="class"
        searchPlaceholder="Search for classes"
      />
      {data.pages.map((classPage) =>
        classPage?.data?.map((item, index) => {
          const isLast = (classPage.data?.length ?? 0) - 1 === index;
          return (
            <ClassCard
              classData={item}
              ref={isLast ? ref : null}
              key={item._id}
            />
          );
        })
      )}

      {isFetching && (
        <div className="w-fit mx-auto py-8">
          <Button variant={'ghost'} disabled>
            Loading More Users
          </Button>
        </div>
      )}
    </AppLayout>
  );
};

export default OtherClassesMobile;
