import AppLayout from '@/components/additional/dashboard-layout';
import { usePaginatedClasses } from '@/hooks/queries/class';
import { useAllUsers } from '@/hooks/queries/users';
import { Class } from '@/lib/api';
import { getPageRange } from '@/lib/get-page-range';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AnnouncementModal from './modals/announcement-modal';
import CreateClassModal from './modals/create-class-modal';
import { GenericTable } from './tabel';
import TableHeader from './table-header';
import TablePagination from './table-pagination';
import { formatDate } from '@/lib/format-date';
import { Link } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const AllClassesDesktop = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    isPending: isClassesPending,
    isError: isClassesError,
    error: classesError,
    data: paginatedClass,
  } = usePaginatedClasses({
    page,
    limit: 10,
    query: searchQuery,
  });

  const {
    isPending: isUsersPending,
    isError: isUsersError,
    error: usersError,
    data: allUsers,
  } = useAllUsers();

  const isLoading = isClassesPending || isUsersPending;
  const isError = isClassesError || isUsersError;

  const columns = [
    {
      header: 'Name',
      cell: (row: Class) => <span className="font-medium">{row.name}</span>,
    },
    {
      header: 'Professor',
      cell: (row: Class) => {
        const professor = allUsers?.data?.find(
          (user) => user._id === row.mainProfessor
        );
        return <span>{professor?.firstName ?? 'Unknown'}</span>;
      },
    },
    {
      header: 'Number of Students',
      cell: (row: Class) => <span>{row.numberOfStudents}</span>,
    },
    {
      header: 'Announcement',
      cell: (row: Class) => (
        <div className="hover:underline hover:underline-offset-4 hover:decoration-primary cursor-pointer">
          <AnnouncementModal announcement={row.announcements} />
        </div>
      ),
    },
    {
      header: 'Created',
      cell: (row: Class) => <span>{formatDate(row.createdAt)}</span>,
    },
    {
      header: 'Actions',
      cell: (row: Class) => (
        <div className="flex items-center">
          <NavLink to={`/dashboard/all-classes/${row._id}`}>
            <Link className="w-5 h-5 hover:text-primary transition-colors" />
          </NavLink>
        </div>
      ),
    },
  ];

  const totalPage = paginatedClass?.pagination?.totalPages;
  const students = allUsers?.data?.filter(
    (user) => user.role === 'student' && !user.classId
  );
  const professors = allUsers?.data?.filter(
    (user) => user.role === 'professor'
  );

  return (
    <AppLayout>
      {isLoading ? (
        <Skeleton />
      ) : isError ? (
        <div>Error: {classesError?.message || usersError?.message}</div>
      ) : (
        <>
          <TableHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            ActionCreateButton={CreateClassModal}
            actionCreateButtonProps={{ students, professors }}
            title="Manage Classes"
            descriptionWord="class"
            searchPlaceholder="Search for classes"
          />

          <GenericTable
            data={paginatedClass?.data || []}
            columns={columns}
            emptyState={
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No classes found</p>
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

export default AllClassesDesktop;
