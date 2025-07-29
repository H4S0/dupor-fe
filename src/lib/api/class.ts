import { toast } from 'sonner';
import { z } from 'zod';
import {
  Class,
  ClassByIDRes,
  GetPaginatedClassRes,
  GetPaginatedParams,
  MainClassRes,
  TimeTable,
  getAuthConfig,
  schoolUpdateClassSchema,
} from '../api';
import {
  apiDelete,
  apiGet,
  apiGetPaginated,
  apiPost,
  apiPut,
} from '../response-wrapper';
import { createClassSchema } from '@/components/forms/create-class-form';
import { studentAddSchema } from '@/components/additional/add-students-modal';
import { sessionAuth } from '../session';

const token = sessionAuth.getToken();

export const fetchPaginatedClasses = async (
  params: GetPaginatedParams
): Promise<GetPaginatedClassRes> => {
  const { ...queryParams } = params;

  const response = await apiGetPaginated<GetPaginatedClassRes>(
    'http://localhost:4000/api/v1/director/get-classes',
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
      error: response.error || 'Failed to fetch classes',
      data: [],
      pagination: {
        totalCount: 0,
        totalPages: 0,
        currentPage: 0,
      },
    };
  }

  return {
    success: true,
    data: response.data?.data,
    pagination: response.data?.pagination,
    message: response.data?.message,
  };
};

export const fetchClassById = async (
  classId: string | undefined
): Promise<ClassByIDRes> => {
  const response = await apiGet<ClassByIDRes>(
    `http://localhost:4000/api/v1/global/get-class-info/${classId}`,
    getAuthConfig(token)
  );

  if (!response.success) {
    return {
      success: false,
      error: response.error || 'Failed to fetch class info',
      data: undefined,
    };
  }

  return {
    success: true,
    message: response.message,
    data: {
      classInfo: response.data?.data?.classInfo,
      timetables: response.data?.data?.timetables,
    },
  };
};

export const updateClass = async (
  data: z.infer<typeof schoolUpdateClassSchema>,
  classId: string
) => {
  const res = await apiPut(
    `http://localhost:4000/api/v1/director/update-class/${classId}`,
    data,
    getAuthConfig(token)
  );

  if (res.success) {
    toast.success('Class updated successfully');
  } else {
    toast.success(res.error);
  }
};

export const deleteClass = async (classId: string | undefined) => {
  const res = await apiDelete(
    `http://localhost:4000/api/v1/director/delete-class/${classId}`,
    getAuthConfig(token)
  );

  if (res.success) {
    toast.success('Class deleted successfully');
  } else {
    toast.success(res.error);
  }
};

export const fetchMainClass = async (): Promise<{
  mainClass: Class | undefined;
  mainClassTimetable: TimeTable;
}> => {
  const res = await apiGet<MainClassRes>(
    `http://localhost:4000/api/v1/professor/get-main-class`,
    getAuthConfig(token)
  );
  if (res.success && res.data) {
    return {
      mainClass: res.data.data.mainClass,
      mainClassTimetable: res.data.data.mainClassTimetable,
    };
  } else {
    return {
      mainClass: undefined,
      mainClassTimetable: undefined,
    };
  }
};

export const fetchOtherPaginatedClasses = async (
  params: GetPaginatedParams
): Promise<GetPaginatedClassRes> => {
  const { ...queryParams } = params;
  const res = await apiGetPaginated<GetPaginatedClassRes>(
    'http://localhost:4000/api/v1/professor/professor-matchup-class',
    {
      query: queryParams.query,
      page: queryParams.page ?? 1,
      limit: queryParams.limit ?? 10,
    },
    getAuthConfig(token)
  );

  if (!res.success) {
    return {
      success: false,
      error: res.error || 'Failed to fetch classes',
      data: [],
      pagination: {
        totalCount: 0,
        totalPages: 0,
        currentPage: 0,
      },
    };
  }

  return {
    success: true,
    data: res.data?.data,
    pagination: res.data?.pagination,
    message: res.data?.message,
  };
};

export const createClass = async (data: z.infer<typeof createClassSchema>) => {
  const res = await apiPost<Class, z.infer<typeof createClassSchema>>(
    'http://localhost:4000/api/v1/director/create-class',
    data,
    getAuthConfig(token)
  );

  if (res.success && res.data) {
    toast.success('Class created successfully');
  }

  toast.error(res.error);
};

export const removeStudentFromClass = async (studentId: string) => {
  const res = await apiDelete(
    `http://localhost:4000/api/v1/director/remove-student/${studentId}`,
    getAuthConfig(token)
  );

  if (res.success) {
    toast.success('Student removed successfully');
  } else {
    toast.success(res.error);
  }
};

export const addStudentToClass = async (
  classId: string,
  data: z.infer<typeof studentAddSchema>
) => {
  const res = await apiPut(
    `http://localhost:4000/api/v1/director/add-student/${classId}`,
    data,
    getAuthConfig(token)
  );

  if (res.success) {
    toast.success('Students added to class successfully');
  } else {
    toast.error(res.error);
  }
};

export const fetchParentClass = async () => {
  const response = await apiGet<ClassByIDRes>(
    `http://localhost:4000/api/v1/parent/get-class-info`,
    getAuthConfig(token)
  );

  if (!response.success) {
    return {
      success: false,
      error: response.error || 'Failed to fetch class info',
      data: undefined,
    };
  }

  return {
    success: true,
    message: response.message,
    data: {
      classInfo: response.data?.data?.classInfo,
      timetables: response.data?.data?.timetables,
    },
  };
};

export const fetchStudentClass = async () => {
  const response = await apiGet<ClassByIDRes>(
    `http://localhost:4000/api/v1/student/get-class-info`,
    getAuthConfig(token)
  );

  if (!response.success) {
    return {
      success: false,
      error: response.error || 'Failed to fetch class info',
      data: undefined,
    };
  }

  return {
    success: true,
    message: response.message,
    data: {
      classInfo: response.data?.data?.classInfo,
      timetables: response.data?.data?.timetables,
    },
  };
};
