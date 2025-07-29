import { fetchAllAnnouncements } from '@/lib/api/announcement';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useAllAnnouncements = () => {
  return useSuspenseQuery({
    queryKey: ['allAnnouncements'],
    queryFn: () => fetchAllAnnouncements(),
  });
};
