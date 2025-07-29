import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { useAttendanceBySubjectAndStudent } from '@/hooks/queries/attendance';
import { sessionAuth } from '@/lib/session';
import { User } from '@/context/auth-context';
import { Mails } from 'lucide-react';
import { acceptExplaination, declineExplaination } from '@/lib/api/attendance';
import { useQueryClient } from '@tanstack/react-query';
import { ClassByIDRes } from '@/lib/api';

const AllAttendanceModal = ({
  subjectNames,
  user,
}: {
  subjectNames: string[];
  user: User;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(subjectNames[0] ?? '');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const sessionUser = sessionAuth.getUser();
  const queryClient = useQueryClient();

  const { data: attendanceData, isLoading } = useAttendanceBySubjectAndStudent(
    selectedSubject,
    user._id
  );

  const handleToggleExplanation = (attendanceId: string) => {
    setExpandedItem((prev) => (prev === attendanceId ? null : attendanceId));
  };

  const handleAcceptExplanation = async (attendanceId: string) => {
    await acceptExplaination(user._id, attendanceId);
    queryClient.invalidateQueries({
      queryKey: ['certainAttendance', selectedSubject, user._id],
    });
  };

  const handleDeclineExplaination = async (attendanceId: string) => {
    await declineExplaination(user._id, attendanceId);
    queryClient.invalidateQueries({
      queryKey: ['certainAttendance', selectedSubject, user._id],
    });

    setExpandedItem(null);
  };

  const classData = queryClient.getQueryData<ClassByIDRes>([
    'class',
    user.classId,
  ]);

  const isMainProfessor =
    sessionUser?._id === classData?.data?.classInfo?.mainProfessor;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="w-full mt-2">
          View all attendance
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-y-auto p-4">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-base md:text-lg">
            {user.firstName} {user.lastName} | {user.jmb}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3 border-r border-border pr-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
            {subjectNames.map((subject) => (
              <Button
                key={subject}
                variant={selectedSubject === subject ? 'secondary' : 'ghost'}
                onClick={() => setSelectedSubject(subject)}
                className="w-full justify-start text-start whitespace-nowrap"
              >
                {subject}
              </Button>
            ))}
          </div>

          <div className="w-full md:w-2/3 space-y-4">
            <div className="text-lg font-semibold">
              Attendance for{' '}
              <span className="text-primary">{selectedSubject}</span>
            </div>

            {isLoading ? (
              <p className="text-sm text-muted-foreground">
                Loading attendance...
              </p>
            ) : (
              <div className="text-sm text-muted-foreground space-y-2">
                {attendanceData?.data?.length ? (
                  attendanceData.data.map((item) => (
                    <div key={item._id} className="flex flex-col border-b pb-1">
                      <div className="flex item-center justify-between">
                        <div className="flex flex-col items-start">
                          <span>
                            Date: {new Date(item.date).toLocaleDateString()}
                          </span>
                          <span>Status: {item.status}</span>
                        </div>
                        {item.absentExplaination &&
                          isMainProfessor &&
                          item.status === 'absent' && (
                            <div className="relative w-fit">
                              <Mails
                                size={32}
                                onClick={() =>
                                  handleToggleExplanation(item._id)
                                }
                              />

                              {item.absentExplaination && (
                                <div className="absolute top-0 left-0 bg-primary h-3 w-3 rounded-full" />
                              )}
                            </div>
                          )}
                      </div>

                      {expandedItem === item._id && item.absentExplaination && (
                        <>
                          <h3 className="text-primary font-bold mt-5">
                            Parents absent explanation
                          </h3>
                          <p>{item.absentExplaination}</p>
                          <div className="flex items-center flex-col sm:flex-row gap-5 w-full mt-5">
                            <Button
                              className="w-full sm:w-1/2"
                              onClick={() => handleAcceptExplanation(item._id)}
                            >
                              Accept
                            </Button>
                            <Button
                              className="w-full sm:w-1/2"
                              variant="secondary"
                              onClick={() =>
                                handleDeclineExplaination(item._id)
                              }
                            >
                              Decline
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                ) : (
                  <p>
                    No attendance records found for{' '}
                    <strong>{selectedSubject}</strong>.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AllAttendanceModal;
