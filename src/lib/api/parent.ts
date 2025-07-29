import { getAuthConfig, StudentByParentRes } from '../api';
import { apiGet } from '../response-wrapper';
import { sessionAuth } from '../session';

const token = sessionAuth.getToken();

export const fetchStudentByParentId = async (): Promise<StudentByParentRes> => {
  const res = await apiGet<StudentByParentRes>(
    'http://localhost:4000/api/v1/parent/get-student',
    getAuthConfig(token)
  );

  if (res.success && res.data) {
    return {
      data: res.data.data,
      message: res.message,
    };
  } else {
    return {
      message: res.error,
      data: undefined,
    };
  }
};
