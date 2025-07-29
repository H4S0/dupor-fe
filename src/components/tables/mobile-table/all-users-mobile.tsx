import AppLayout from '@/components/additional/dashboard-layout';
import { useInfiniteUsers } from '@/hooks/queries/users';
import TableHeader from '../desktop-table/table-header';
import { startTransition, useEffect, useState } from 'react';
import CreateUserModal from '../desktop-table/modals/create-user-modal';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import UserCard from './cards/user-card';

const AllUsersMobile = () => {
  const [deferredSearchQuery, setDeferredSearchQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { inView, ref } = useInView();
  const { data, fetchNextPage, isFetching } = useInfiniteUsers({
    query: deferredSearchQuery,
    limit: 10,
  });

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

  return (
    <AppLayout>
      <TableHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        ActionCreateButton={CreateUserModal}
        title="Manage Users"
        descriptionWord="user"
        searchPlaceholder="Search for users"
      />
      {data.pages.map((userPage) =>
        userPage?.data?.map((user, index) => {
          const isLast = (userPage.data?.length ?? 0) - 1 === index;
          return (
            <UserCard
              userData={user}
              ref={isLast ? ref : null}
              key={user._id}
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

export default AllUsersMobile;
