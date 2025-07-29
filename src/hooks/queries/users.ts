import {
  GetPaginatedParams,
  GetPaginatedStudentsRes,
  GetPaginatedUserRes,
} from '@/lib/api';
import {
  fetchPaginatedStudents,
  fetchPaginatedUsers,
  fetchAllUsers,
  fetchCertainUser,
} from '@/lib/api/user';
import {
  useQuery,
  keepPreviousData,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

export const usePaginatedStudents = (
  params: GetPaginatedParams,
  classId: string | undefined
) => {
  return useQuery<GetPaginatedStudentsRes>({
    queryKey: ['students', params.page, params.query],
    queryFn: () => fetchPaginatedStudents(params, classId),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePaginatedUsers = (params: GetPaginatedParams) => {
  return useQuery<GetPaginatedUserRes>({
    queryKey: ['paginatedUsers', params.page, params.query],
    queryFn: () => fetchPaginatedUsers(params),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
};

export const useInfiniteUsers = (params: Omit<GetPaginatedParams, 'page'>) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['paginatedUsers', params.query, params.limit],
    queryFn: ({ pageParam = 1 }) =>
      fetchPaginatedUsers({ ...params, page: pageParam }),
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

export const useAllUsers = () => {
  return useSuspenseQuery<Omit<GetPaginatedUserRes, 'pagination'>>({
    queryKey: ['allUsers'],
    queryFn: () => fetchAllUsers(),
  });
};

export const useCertainUser = (id: string | undefined) => {
  return useSuspenseQuery({
    queryKey: ['certainUser', id],
    queryFn: () => fetchCertainUser(id),
  });
};
