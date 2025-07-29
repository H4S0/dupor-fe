import { GradeRes } from '@/lib/api';
import {
  fetchAllStudentGrades,
  fetchGradesBySubjectAndStudent,
} from '@/lib/api/grades';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGradesBySubjectAndStudent = (
  subjectName: string,
  studentId: string
) => {
  return useSuspenseQuery<GradeRes>({
    queryKey: ['certainGrades', subjectName, studentId],
    queryFn: () => fetchGradesBySubjectAndStudent(subjectName, studentId),
  });
};

export const useAllGrades = () => {
  return useSuspenseQuery<GradeRes>({
    queryKey: ['allGrades'],
    queryFn: () => fetchAllStudentGrades(),
  });
};
