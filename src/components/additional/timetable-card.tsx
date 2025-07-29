import { WeekDay } from '@/lib/api';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { sessionAuth } from '@/lib/session';
import { useQueryClient } from '@tanstack/react-query';
import EditTimetableModal from './edit-timetable-modal';
import { User } from '@/context/auth-context';
import { deleteTimetable } from '@/lib/api/timetable';

export type TimetableCardProps = {
  _id: string;
  classId: string;
  day: WeekDay;
  startTime: string;
  endTime: string;
  subjects: {
    subjectName: string;
    professorId: string;
    room: string;
    startTime: string;
    endTime: string;
  }[];
};

const TimetableCard = ({
  timetable,
  classId,
  professors,
}: {
  timetable: TimetableCardProps;
  classId: string | undefined;
  professors: User[] | undefined;
}) => {
  const queryClient = useQueryClient();
  const sessionUser = sessionAuth.getUser();

  return (
    <>
      <Card className="border-l-4 border-l-primary" variant="card">
        <CardHeader className="flex flex-row items-center justify-between text-xl font-semibold text-primary">
          {timetable.day}
          {sessionUser?.role === 'director' && (
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                onClick={async () => {
                  await deleteTimetable(classId, timetable._id);
                  queryClient.invalidateQueries({ queryKey: ['class'] });
                }}
              >
                <Trash2 />
              </Button>

              <EditTimetableModal
                timetable={timetable}
                professors={professors}
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {timetable.subjects.map((subject, index) => (
            <div
              key={index}
              className="border border-l-4 border-l-primary rounded-md p-4"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="font-medium text-base">{subject.subjectName}</p>
                  <p className="text-sm text-muted-foreground">
                    {subject.startTime} - {subject.endTime}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {subject.room}
                  </p>
                  <p className="text-sm italic text-gray-600">
                    {subject.professorId}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default TimetableCard;
