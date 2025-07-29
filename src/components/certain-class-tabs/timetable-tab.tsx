import CreateTimetableModal from '../additional/create-timetable-modal';
import { TimerIcon } from 'lucide-react';
import { TabsContent } from '../ui/tabs';
import TimetableCard from '../additional/timetable-card';
import { TimeTable } from '@/lib/api';
import { User } from '@/context/auth-context';
import { sessionAuth } from '@/lib/session';

type TimetableTabProps = {
  classId: string;
  timetable: TimeTable;
  professors?: User[] | undefined;
};

const TimetableTab = ({
  classId,
  timetable,
  professors,
}: TimetableTabProps) => {
  const sessionUser = sessionAuth.getUser();

  return (
    <TabsContent value="timetable">
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center gap-2 text-xl">
          <TimerIcon size={32} />
          <p className="font-semibold">Weekly Timetable</p>
        </div>

        {sessionUser?.role === 'director' && (
          <CreateTimetableModal classId={classId} professors={professors} />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {timetable?.map((timetable) => (
          <TimetableCard
            key={timetable._id}
            timetable={timetable}
            classId={classId}
            professors={professors}
          />
        ))}
      </div>
    </TabsContent>
  );
};

export default TimetableTab;
