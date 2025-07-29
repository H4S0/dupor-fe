import { z } from 'zod';
import { apiGet, apiPost } from '../response-wrapper';
import { addingGradeSchema } from '@/components/profile-tabs/tabs/grades-tab';
import { getAuthConfig, GradeRes } from '../api';
import { toast } from 'sonner';
import { sessionAuth } from '../session';

const token = sessionAuth.getToken();

export const addingGrade = async (
  studentId: string,
  data: z.infer<typeof addingGradeSchema>
) => {
  const res = await apiPost(
    `http://localhost:4000/api/v1/professor/add-grade/${studentId}`,
    data,
    getAuthConfig(token)
  );

  if (res.success) {
    toast.success('Grade added successfully');
  } else {
    toast.error(res.error);
  }
};

export const fetchGradesBySubjectAndStudent = async (
  subjectName: string,
  studentId: string
): Promise<GradeRes> => {
  const res = await apiGet<GradeRes>(
    `http://localhost:4000/api/v1/global/get-grade/${studentId}?subjectName=${subjectName}`,
    getAuthConfig(token)
  );

  if (res.success && res.data) {
    return {
      data: res.data.data,
      message: res.data.message,
    };
  }

  if (!res.success) {
    return {
      error: res.error,
      data: undefined,
    };
  }

  return {
    error: 'Unexpected error occurred',
    data: undefined,
  };
};

export const fetchAllStudentGrades = async () => {
  const res = await apiGet<GradeRes>(
    `http://localhost:4000/api/v1/global/get-all-grades`,
    getAuthConfig(token)
  );

  if (res.success && res.data) {
    return {
      data: res.data.data,
      message: res.data.message,
    };
  }

  if (!res.success) {
    return {
      error: res.error,
      data: undefined,
    };
  }

  return {
    error: 'Unexpected error occurred',
    data: undefined,
  };
};
