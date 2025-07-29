import { AttendanceRes } from '@/lib/api';
import {
  fetchAttendanceBySubjectAndStudent,
  fetchStudentAttendance,
} from '@/lib/api/attendance';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useAttendanceBySubjectAndStudent = (
  subjectName: string,
  studentId: string
) => {
  return useSuspenseQuery<AttendanceRes>({
    queryKey: ['certainAttendance', subjectName, studentId],
    queryFn: () => fetchAttendanceBySubjectAndStudent(subjectName, studentId),
  });
};

export const useAttendance = () => {
  return useSuspenseQuery<AttendanceRes>({
    queryKey: ['parentAttendance'],
    queryFn: () => fetchStudentAttendance(),
  });
};
