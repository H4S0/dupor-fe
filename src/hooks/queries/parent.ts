import { StudentByParentRes } from '@/lib/api';
import { fetchStudentByParentId } from '@/lib/api/parent';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useParentStudent = () => {
  return useSuspenseQuery<StudentByParentRes>({
    queryKey: ['certainUser'],
    queryFn: () => fetchStudentByParentId(),
  });
};
