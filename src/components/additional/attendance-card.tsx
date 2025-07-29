import { useCertainUser } from '@/hooks/queries/users';
import { Attendance } from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import AbsentExplainationModal from './absent-explaination';
import { sessionAuth } from '@/lib/session';

const AttendanceCard = ({ data }: { data: Attendance }) => {
  const professor = useCertainUser(data.professorId);
  const sessionUser = sessionAuth.getUser();
  return (
    <div className="border rounded-xl p-5 shadow-sm mb-4 transition hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h2 className="text-lg font-bold ">{data.subjectName}</h2>
          <p className="text-sm ">
            Date: {new Date(data.date).toLocaleDateString()}
          </p>
        </div>
        <Badge className="py-2 px-6 text-md">{data.status}</Badge>
      </div>

      <div className="text-sm text-muted-foreground mb-3">
        Professor:{' '}
        {professor.isLoading ? (
          <Loader2 className="inline-block h-4 w-4 animate-spin text-gray-400" />
        ) : (
          <>
            {professor.data?.data?.firstName} {professor.data?.data?.lastName}
          </>
        )}
      </div>

      {sessionUser?.role === 'parent' && data.status === 'absent' && (
        <AbsentExplainationModal studentId={data.studentId} />
      )}
    </div>
  );
};

export default AttendanceCard;
