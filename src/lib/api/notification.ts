import { createNotificationSchema } from '@/components/profile-tabs/tabs/notification-tab';
import { getAuthConfig, NotificationRes } from '../api';
import { apiDelete, apiGet, apiPost } from '../response-wrapper';
import { sessionAuth } from '../session';
import { z } from 'zod';
import { toast } from 'sonner';

const token = sessionAuth.getToken();

export const fetchNotificationByUser = async (
  userId: string
): Promise<NotificationRes> => {
  const res = await apiGet<NotificationRes>(
    `http://localhost:4000/api/v1/global/get-notification/${userId}`,
    getAuthConfig(token)
  );

  if (res.success) {
    return {
      data: res.data?.data,
    };
  } else {
    return {
      data: undefined,
      message: res.message,
    };
  }
};

export const createNotification = async (
  userId: string,
  data: z.infer<typeof createNotificationSchema>
) => {
  const res = await apiPost(
    `http://localhost:4000/api/v1/director/create-notification/${userId}`,
    data,
    getAuthConfig(token)
  );

  if (res.success) {
    toast.success('Notification created successfully');
  } else {
    toast.error(res.error);
  }
};

export const deleteNotification = async (id: string) => {
  const res = await apiDelete(
    `http://localhost:4000/api/v1/director/delete-notification/${id}`,
    getAuthConfig(token)
  );

  if (res.success) {
    toast.success('Notification deleted successfully');
  } else {
    toast.error(res.error);
  }
};
