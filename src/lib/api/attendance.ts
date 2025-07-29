import { toast } from 'sonner';
import { AbsentExplanationOpts, AttendanceRes, getAuthConfig } from '../api';
import { apiDelete, apiGet, apiPut } from '../response-wrapper';
import { sessionAuth } from '../session';

const token = sessionAuth.getToken();

export const fetchAttendanceBySubjectAndStudent = async (
  subjectName: string,
  studentId: string
): Promise<AttendanceRes> => {
  const res = await apiGet<AttendanceRes>(
    `http://localhost:4000/api/v1/global/get-attendance/${studentId}?subjectName=${subjectName}`,
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

export const fetchStudentAttendance = async (): Promise<AttendanceRes> => {
  const res = await apiGet<AttendanceRes>(
    'http://localhost:4000/api/v1/global/get-attendance',
    getAuthConfig(token)
  );

  if (res.success && res.data) {
    return {
      data: res.data.data,
      message: res.data.message,
    };
  } else {
    return {
      data: undefined,
      error: res.error,
    };
  }
};

export const sendAbsentExplaination = async (
  data: AbsentExplanationOpts,
  studentId: string
) => {
  const res = await apiPut(
    `http://localhost:4000/api/v1/parent/send-absent-explaination/${studentId}`,
    data,
    getAuthConfig(token)
  );

  if (res.success) {
    toast.success('Explaination sent successfully');
  } else {
    toast.success(res.error);
  }
};

export const acceptExplaination = async (
  studentId: string,
  attendanceId: string
) => {
  const res = await apiDelete(
    `http://localhost:4000/api/v1/professor/accept-explaination/${studentId}/${attendanceId}`,
    getAuthConfig(token)
  );

  if (res.success) {
    toast.success('Explaination accept successfully');
  } else {
    toast.error(res.error);
  }
};

export const declineExplaination = async (
  studentId: string,
  attendanceId: string
) => {
  const res = await apiPut(
    `http://localhost:4000/api/v1/professor/decline-explaination/${studentId}/${attendanceId}`,
    {},
    getAuthConfig(token)
  );

  if (res.success) {
    toast.success('Explaination declined successfully');
  } else {
    toast.error(res.error);
  }
};
