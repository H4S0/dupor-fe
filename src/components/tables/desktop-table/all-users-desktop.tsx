import AppLayout from '@/components/additional/dashboard-layout';
import { User } from '@/context/auth-context';
import { usePaginatedUsers } from '@/hooks/queries/users';
import { getPageRange } from '@/lib/get-page-range';
import { Link, Trash } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CreateUserModal from './modals/create-user-modal';
import { GenericTable } from './tabel';
import TableHeader from './table-header';
import TablePagination from './table-pagination';
import { formatDate } from '@/lib/format-date';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { deleteUser } from '@/lib/api/user';
import { useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

const AllUserDesktop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { isPending, isError, error, data } = usePaginatedUsers({
    page,
    limit: 10,
    query: searchQuery,
  });

  const columns = [
    {
      header: 'Name',
      cell: (row: User) => <span className="font-medium">{row.firstName}</span>,
    },
    {
      header: 'Last name',
      cell: (row: User) => <span>{row.lastName}</span>,
    },
    {
      header: 'JMB',
      cell: (row: User) => <span>{row.jmb}</span>,
    },
    {
      header: 'Role',
      cell: (row: User) => <Badge>{row.role}</Badge>,
    },
    {
      header: 'First time login',
      cell: (row: User) => (
        <Badge variant={row.isFirstLogin ? 'secondary' : 'destructive'}>
          {row.isFirstLogin ? 'True' : 'False'}
        </Badge>
      ),
    },
    {
      header: 'Created',
      cell: (row: User) => <span>{formatDate(row.createdAt)}</span>,
    },
    {
      header: 'Actions',
      cell: (row: User) => (
        <div className="flex items-center gap-3">
          <NavLink to={`/dashboard/all-users/${row._id}`}>
            <Link className="w-5 h-5 hover:text-primary transition-colors" />
          </NavLink>
          <Button
            variant="outline"
            size="icon"
            onClick={async () => {
              await deleteUser(row._id);
              queryClient.invalidateQueries({
                queryKey: ['paginatedUsers', { query: searchQuery, page }],
              });
            }}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const totalPage = data?.pagination?.totalPages;

  return (
    <AppLayout>
      {isPending ? (
        <Skeleton />
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <TableHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            ActionCreateButton={CreateUserModal}
            title="Manage Users"
            descriptionWord="user"
            searchPlaceholder="Search for users"
          />

          <GenericTable
            data={data?.data || []}
            columns={columns}
            emptyState={
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No users found</p>
              </div>
            }
          />

          {totalPage && totalPage > 1 ? (
            <TablePagination
              onPageChange={setPage}
              currentPage={page}
              pageRange={getPageRange(totalPage, page)}
              totalPage={totalPage}
            />
          ) : null}
        </>
      )}
    </AppLayout>
  );
};

export default AllUserDesktop;
