import { NotificationRes } from '@/lib/api';
import { fetchNotificationByUser } from '@/lib/api/notification';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useUserNotification = (userId: string) => {
  return useSuspenseQuery<NotificationRes>({
    queryKey: ['notification', userId],
    queryFn: () => fetchNotificationByUser(userId),
  });
};
