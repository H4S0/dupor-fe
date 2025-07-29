import { toast } from 'sonner';
import {
  GetPaginatedParams,
  GetPaginatedStudentsRes,
  GetPaginatedUserRes,
  GetUserRes,
  getAuthConfig,
  passwordRequestRes,
  updateUserPasswordReq,
  updateUserPasswordRes,
  updatedUserRes,
} from '../api';
import {
  apiDelete,
  apiGet,
  apiGetPaginated,
  apiPost,
  apiPut,
} from '../response-wrapper';
import { createUserSchema } from '@/components/forms/create-user-form';
import { createSHA512Hash, User } from '@/context/auth-context';
import { z } from 'zod';
import { updateFormSchema } from '@/components/forms/updating-user';
import { attendanceSchema } from '@/components/profile-tabs/tabs/attendance-tab';
import { sessionAuth } from '../session';

const token = sessionAuth.getToken();

export const createUser = async (data: z.infer<typeof createUserSchema>) => {
  const res = await apiPost<User, z.infer<typeof createUserSchema>>(
    'http://localhost:4000/api/v1/director/createUser',
    data,
    getAuthConfig(token)
  );

  if (res.success && res.data) {
    toast.success('User created successfully');
  }

  if (!res.success) {
    toast.error(res.error);
  }
};

export const fetchCertainUser = async (id: string | undefined) => {
  const res = await apiGet<GetUserRes>(
    `http://localhost:4000/api/v1/global/get-user/${id}`,
    getAuthConfig(token)
  );
  if (res.success && res.data) {
    return {
      success: true,
      data: res.data.data,
    };
  } else {
    return {
      success: false,
      data: undefined,
    };
  }
};

export const fetchPaginatedUsers = async (params: GetPaginatedParams) => {
  const res = await apiGetPaginated<GetPaginatedUserRes>(
    'http://localhost:4000/api/v1/director/get-all-paginated-users',
    {
      query: params.query,
      page: params.page ?? 1,
      limit: params.limit ?? 10,
    },
    getAuthConfig(token)
  );

  if (!res.success) {
    return {
      success: false,
      error: res.error || 'Failed to fetch class info',
      data: undefined,
      pagination: undefined,
    };
  }

  return {
    success: true,
    data: res.data?.data,
    pagination: res.data?.pagination,
    message: res.data?.message,
  };
};

export const fetchAllUsers = async () => {
  const res = await apiGet<Omit<GetPaginatedUserRes, 'pagination'>>(
    'http://localhost:4000/api/v1/global/get-all-users',
    getAuthConfig(token)
  );

  if (!res.success) {
    return {
      success: false,
      error: res.error || 'Failed to users class info',
      data: undefined,
    };
  }

  return {
    success: true,
    data: res.data?.data,
    message: res.data?.message,
  };
};

export const updateUser = async (
  userId: string | null | undefined,
  data: z.infer<typeof updateFormSchema>
) => {
  const res = await apiPut<updatedUserRes, z.infer<typeof updateFormSchema>>(
    `http://localhost:4000/api/v1/director/update-user/${userId}`,
    data,
    getAuthConfig(token)
  );
  if (res.success && res.data) {
    toast.success('Updated successfully');
    return res.data.data;
  } else {
    toast.error('Failed to update');
    return null;
  }
};

export const fetchPaginatedStudents = async (
  params: GetPaginatedParams,
  classId: string | undefined
): Promise<GetPaginatedStudentsRes> => {
  const { ...queryParams } = params;

  const response = await apiGetPaginated<GetPaginatedStudentsRes>(
    `http://localhost:4000/api/v1/global/get-class-student/${classId}`,
    {
      query: queryParams.query,
      page: queryParams.page ?? 1,
      limit: queryParams.limit ?? 10,
    },
    getAuthConfig(token)
  );

  if (!response.success) {
    return {
      success: false,
      error: response.error || 'Failed to fetch class info',
      data: undefined,
      pagination: undefined,
    };
  }

  return {
    success: true,
    data: response.data?.data,
    pagination: response.data?.pagination,
    message: response.data?.message,
  };
};

export const setInitialPassword = async (userId: string) => {
  const res = await apiPut(
    `http://localhost:4000/api/v1/director/set-initial-password/${userId}`,
    {},
    getAuthConfig(token)
  );

  if (res.success) {
    toast.success('Initial password set successfully');
  } else {
    toast.error(res.error);
  }
};

export const updateUserPasswordRequest = async () => {
  const res = await apiPut<passwordRequestRes>(
    `http://localhost:4000/api/v1/auth/request-password-change`,
    {},
    getAuthConfig(token)
  );

  if (res.success && res.data) {
    toast.success(
      'Password update requested successfully, please fill the form'
    );
    return res.data.data;
  } else {
    toast.error(res.error);
    return null;
  }
};

export const updateUserPassword = async (data: updateUserPasswordReq) => {
  const hashedPassword = await createSHA512Hash(data.password);

  const res = await apiPut<updateUserPasswordRes, updateUserPasswordReq>(
    `http://localhost:4000/api/v1/auth/set-new-password`,
    {
      passwordUpdateToken: data.passwordUpdateToken,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    },
    getAuthConfig(token)
  );

  if (!res.success) {
    toast.error(res.error);
    return {
      success: false,
    };
  } else {
    toast.success(res.data?.message);
    return {
      success: true,
    };
  }
};

export const createUserAttendance = async (
  studentId: string | undefined | null,
  data: z.infer<typeof attendanceSchema>
) => {
  const res = await apiPut(
    `http://localhost:4000/api/v1/professor/attendance/${studentId}`,
    data,
    getAuthConfig(token)
  );
  if (res.success && res.data) {
    toast.success('Attendance add successfully');
  }

  if (!res.success) {
    toast.error(res.error);
  }
};

export const deleteUser = async (id: string) => {
  const res = await apiDelete(
    `http://localhost:4000/api/v1/director/delete-user/${id}`,
    getAuthConfig(token)
  );

  if (res.success) {
    toast.success('User delete successfully');
  } else {
    toast.error('Fail due to delete user, please contact support');
  }
};
