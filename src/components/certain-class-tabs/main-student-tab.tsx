import { usePaginatedStudents } from '@/hooks/queries/users';
import { formatDate } from '@/lib/format-date';
import { getPageRange } from '@/lib/get-page-range';
import { TabsContent } from '@radix-ui/react-tabs';
import { Link } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DesktopTableSekeleton } from '../tables/desktop-table/desktop-table-skeleton';
import { Column, GenericTable } from '../tables/desktop-table/tabel';
import TablePagination from '../tables/desktop-table/table-pagination';
import { StudentColumnWrapper } from './student-tab';
import TableHeader from '../tables/desktop-table/table-header';

const MainStudentTab = ({ classId }: { classId: string }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const {
    status: studentsStatus,
    data: studentsData,
    error: studentsError,
  } = usePaginatedStudents(
    {
      page,
      limit: 10,
      query: searchQuery,
    },
    classId
  );

  const columns: Column<StudentColumnWrapper>[] = [
    {
      header: 'First name',
      cell: (row) => row.firstName,
    },

    {
      header: 'Last name',
      cell: (row) => row.lastName,
    },

    {
      header: 'JMB',
      cell: (row) => row.jmb,
    },

    {
      header: 'Craeted at',
      cell: (row) => formatDate(row.createdAt),
    },

    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center gap-5">
          <NavLink to={`/dashboard/all-users/${row._id}`}>
            <Link className="w-5 h-5 hover:text-primary transition-colors" />
          </NavLink>
        </div>
      ),
    },
  ];
  const totalPage = studentsData?.pagination?.totalPages;
  return (
    <TabsContent value="students">
      <TableHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search for student"
      />

      {studentsStatus === 'pending' ? (
        <DesktopTableSekeleton />
      ) : studentsStatus === 'error' ? (
        <div>Error: {studentsError.message}</div>
      ) : (
        <>
          <GenericTable data={studentsData.data} columns={columns} />
          {totalPage && totalPage > 1 ? (
            <TablePagination
              onPageChange={setPage}
              totalPage={totalPage}
              pageRange={getPageRange(totalPage, page)}
              currentPage={studentsData?.pagination?.currentPage}
            />
          ) : totalPage === 1 ? null : (
            <p className="text-lg text-primary font-semibold">0 pages found</p>
          )}
        </>
      )}
    </TabsContent>
  );
};

export default MainStudentTab;
