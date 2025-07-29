import { DesktopTableSekeleton } from '../tables/desktop-table/desktop-table-skeleton';
import { getPageRange } from '@/lib/get-page-range';
import { Column, GenericTable } from '../tables/desktop-table/tabel';
import TablePagination from '../tables/desktop-table/table-pagination';
import { TabsContent } from '../ui/tabs';
import { formatDate } from '@/lib/format-date';
import { Link, Trash } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import TableHeader from '../tables/desktop-table/table-header';
import { usePaginatedStudents } from '@/hooks/queries/users';
import { Button } from '../ui/button';
import { removeStudentFromClass } from '@/lib/api/class';
import { useQueryClient } from '@tanstack/react-query';
import AddStudentsModal from '../additional/add-students-modal';
import { User } from '@/context/auth-context';

export type StudentColumnWrapper = {
  _id: string;
  classId: string;
  firstName: string;
  lastName: string;
  image: string;
  isFirstLogin: boolean;
  jmb: number;
  role: string;
  createdAt: string;
  parentId: string;
};

const StudentTab = ({
  classId,
  students,
}: {
  classId: string;
  students: User[] | undefined;
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();
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
          <Button
            variant="outline"
            onClick={async () => {
              await removeStudentFromClass(row._id);
              queryClient.invalidateQueries({ queryKey: ['students'] });
              queryClient.invalidateQueries({ queryKey: ['allUsers'] });
            }}
          >
            <Trash className="w-5 h-5 hover:text-primary transition-colors" />
          </Button>
        </div>
      ),
    },
  ];
  const totalPage = studentsData?.pagination?.totalPages;
  const classStudents = studentsData?.data;
  return (
    <TabsContent value="students">
      <TableHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        ActionCreateButton={AddStudentsModal}
        actionCreateButtonProps={{ students, classStudents, classId }}
        searchPlaceholder="Search for student"
      />

      {studentsStatus === 'pending' ? (
        <DesktopTableSekeleton />
      ) : studentsStatus === 'error' ? (
        <div>Error: {studentsError.message}</div>
      ) : (
        <>
          <GenericTable data={classStudents} columns={columns} />
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

export default StudentTab;
