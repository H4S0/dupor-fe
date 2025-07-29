import AppLayout from '@/components/additional/dashboard-layout';
import { Button } from '@/components/ui/button';
import { useInfiniteClasses } from '@/hooks/queries/class';
import { startTransition, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ClassCard from './cards/class-card';
import TableHeader from '../desktop-table/table-header';
import CreateClassModal from '../desktop-table/modals/create-class-modal';
import { useAllUsers } from '@/hooks/queries/users';

const AllClassesMobile = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deferredSearchQuery, setDeferredSearchQuery] = useState('');
  const { inView, ref } = useInView();
  const { data, fetchNextPage, isFetching } = useInfiniteClasses({
    query: deferredSearchQuery,
    limit: 10,
  });
  const { data: allUsers } = useAllUsers();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    startTransition(() => {
      setDeferredSearchQuery(value);
    });
  };

  const students = allUsers?.data?.filter((user) => user.role === 'student');
  const professors = allUsers?.data?.filter(
    (user) => user.role === 'professor'
  );

  return (
    <AppLayout>
      <TableHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        ActionCreateButton={CreateClassModal}
        actionCreateButtonProps={{ students, professors }}
        title="Manage Classes"
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
            Loading More Classes
          </Button>
        </div>
      )}
    </AppLayout>
  );
};

export default AllClassesMobile;
