import AppLayout from '@/components/additional/dashboard-layout';
import { usePagaintedOtherClasses } from '@/hooks/queries/class';
import { useAllUsers } from '@/hooks/queries/users';
import { Class } from '@/lib/api';
import { getPageRange } from '@/lib/get-page-range';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DesktopTableSekeleton } from './desktop-table-skeleton';
import AnnouncementModal from './modals/announcement-modal';
import { GenericTable } from './tabel';
import TableHeader from './table-header';
import TablePagination from './table-pagination';
import { formatDate } from '@/lib/format-date';
import { Link } from 'lucide-react';

const OtherClassesDesktop = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: allUsers } = useAllUsers();
  const {
    data: otherClasses,
    error,
    status,
  } = usePagaintedOtherClasses({
    page: page,
    limit: 10,
    query: searchQuery,
  });

  const columns = [
    {
      header: 'Name',
      cell: (row: Class) => <span className="font-medium">{row.name}</span>,
    },
    {
      header: 'Main professor',
      cell: (row: Class) => {
        if (!allUsers?.data) {
          return <p>loading</p>;
        }
        const professor = allUsers.data.find(
          (user) => user._id === row.mainProfessor
        );

        return <span>{professor?.firstName ?? 'Unknow'}</span>;
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

  const totalPage = otherClasses?.pagination?.totalPages;

  return (
    <AppLayout>
      {status === 'pending' ? (
        <div>
          <DesktopTableSekeleton />
        </div>
      ) : status === 'error' ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <TableHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search for classes"
          />
          <GenericTable data={otherClasses.data} columns={columns} />
          {totalPage && totalPage > 1 ? (
            <TablePagination
              onPageChange={setPage}
              currentPage={page}
              pageRange={getPageRange(totalPage, page)}
              totalPage={totalPage}
            />
          ) : totalPage === 1 ? null : (
            <p className="text-lg text-primary font-semibold">0 pages found</p>
          )}
        </>
      )}
    </AppLayout>
  );
};

export default OtherClassesDesktop;
