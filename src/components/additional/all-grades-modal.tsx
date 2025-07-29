import { User } from '@/context/auth-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog';
import { useState } from 'react';
import { Button } from '../ui/button';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useGradesBySubjectAndStudent } from '@/hooks/queries/grades';
import { Separator } from '../ui/separator';

const AllGradesModal = ({
  subjectNames,
  user,
}: {
  subjectNames: string[];
  user: User;
}) => {
  const [selectedSubject, setSelectedSubject] = useState(subjectNames[0] ?? '');
  const [isOpen, setIsOpen] = useState(false);

  const { data: gradesData, isLoading } = useGradesBySubjectAndStudent(
    selectedSubject,
    user._id
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="w-full mt-2">
          View all grades
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

          <div className="w-full md:w-1/2 space-y-4">
            <div className="text-lg font-semibold">
              Grades for
              <span>{selectedSubject}</span>
            </div>

            {isLoading ? (
              <p>Loading attendance...</p>
            ) : (
              <div>
                {gradesData?.data?.length ? (
                  gradesData.data.map((grade) => (
                    <>
                      <div
                        key={grade._id}
                        className="flex flex-col items-start"
                      >
                        <div className="flex flex-row items-center gap-2">
                          <span>
                            Date: {new Date(grade.date).toLocaleDateString()}
                          </span>
                          |<span className="text-primary">{grade.status}</span>
                        </div>
                        <span>Grade: {grade.grade}</span>
                      </div>

                      <Separator className="my-2 w-full" />
                    </>
                  ))
                ) : (
                  <p>
                    No grades records found for{' '}
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

export default AllGradesModal;
