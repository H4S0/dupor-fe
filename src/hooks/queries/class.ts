import {
  GetPaginatedParams,
  GetPaginatedClassRes,
  ClassByIDRes,
  Class,
  TimeTable,
} from '@/lib/api';
import {
  fetchClassById,
  fetchMainClass,
  fetchOtherPaginatedClasses,
  fetchPaginatedClasses,
  fetchParentClass,
  fetchStudentClass,
} from '@/lib/api/class';
import {
  useQuery,
  keepPreviousData,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

export const usePaginatedClasses = (params: GetPaginatedParams) => {
  return useQuery<GetPaginatedClassRes>({
    queryKey: ['paginatedClasses', params.page, params.query],
    queryFn: () => fetchPaginatedClasses(params),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
};
export const useInfiniteClasses = (
  params: Omit<GetPaginatedParams, 'page'>
) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['paginatedClasses', params.query, params.limit],
    queryFn: ({ pageParam = 1 }) =>
      fetchPaginatedClasses({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pagination?.currentPage;
      const totalPages = lastPage.pagination?.totalPages;

      if (
        currentPage !== undefined &&
        totalPages !== undefined &&
        currentPage < totalPages
      ) {
        return currentPage + 1;
      }

      return undefined;
    },
  });
};

export const usePagaintedOtherClasses = (params: GetPaginatedParams) => {
  return useQuery<GetPaginatedClassRes>({
    queryKey: ['paginatedOtherClasses', params.page, params.query],
    queryFn: () => fetchOtherPaginatedClasses(params),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
};

export const useInfiniteOtherClasses = (params: GetPaginatedParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['paginatedOtherClasses', params.page, params.query],
    queryFn: () => fetchOtherPaginatedClasses({ ...params, page: params.page }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.pagination?.currentPage;
      const totalPages = lastPage.pagination?.totalPages;

      if (
        currentPage !== undefined &&
        totalPages !== undefined &&
        currentPage < totalPages
      ) {
        return currentPage + 1;
      }

      return undefined;
    },
  });
};

export const useClassById = (classId: string | undefined) => {
  return useSuspenseQuery<ClassByIDRes>({
    queryKey: ['class', classId],
    queryFn: () => fetchClassById(classId),
  });
};

export const useMainClass = () => {
  return useSuspenseQuery<{
    mainClass: Class | undefined;
    mainClassTimetable: TimeTable;
  }>({
    queryKey: ['mainClass'],
    queryFn: () => fetchMainClass(),
  });
};

export const useParentClass = () => {
  return useSuspenseQuery<ClassByIDRes>({
    queryKey: ['parentClass'],
    queryFn: () => fetchParentClass(),
  });
};

export const useStudentClass = () => {
  return useSuspenseQuery<ClassByIDRes>({
    queryKey: ['studentClass'],
    queryFn: () => fetchStudentClass(),
  });
};
