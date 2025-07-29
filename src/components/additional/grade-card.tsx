import { Grade } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useCertainUser } from '@/hooks/queries/users';

const GradeCard = ({ grade }: { grade: Grade }) => {
  const professor = useCertainUser(grade.professorId);

  return (
    <Card variant="card" className="my-3">
      <CardHeader className="flex flex-row items-center gap-2">
        <CardTitle>{grade.subjectName}</CardTitle>|
        <div className="flex items-center gap-2">
          <span className="text-primary font-semibold">
            {new Date(grade.date).toLocaleDateString()}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <p>
          Professor: {professor.data?.data?.firstName}{' '}
          {professor.data?.data?.lastName}
        </p>
        <p>Grade: {grade.grade}</p>
      </CardContent>
    </Card>
  );
};

export default GradeCard;
