import AppLayout from '@/components/additional/dashboard-layout';
import GradeCard from '@/components/additional/grade-card';
import { useAllGrades } from '@/hooks/queries/grades';

const StudentGrade = () => {
  const data = useAllGrades();

  return (
    <AppLayout>
      {data.data?.data?.map((item) => (
        <GradeCard key={item._id} grade={item} />
      ))}
    </AppLayout>
  );
};

export default StudentGrade;
