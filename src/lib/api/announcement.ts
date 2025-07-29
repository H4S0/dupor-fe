import { announcementSchema } from '@/components/forms/create-class-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Announcements, getAuthConfig } from '../api';
import { apiDelete, apiGet, apiPost, apiPut } from '../response-wrapper';
import { sessionAuth } from '../session';

const token = sessionAuth.getToken();

export const createGlobalAnnouncement = async (
  data: z.infer<typeof announcementSchema>
) => {
  const res = await apiPost(
    `http://localhost:4000/api/v1/director/create-global-announcement`,
    data,
    getAuthConfig(token)
  );

  if (res.success && res.data) {
    toast.success('Global announcement successfully');
  } else {
    toast.error(res.error);
  }
};

export const createClassAnnouncement = async (
  data: z.infer<typeof announcementSchema>
) => {
  const res = await apiPut(
    `http://localhost:4000/api/v1/professor/create-class-announcement`,
    data,
    getAuthConfig(token)
  );

  if (res.success && res.data) {
    toast.success('Class announcement created successfully');
  } else {
    toast.error(res.error);
  }
};

export type GetAllAnnouncementsRes = {
  success: boolean;
  message?: string;
  data: Announcements[] | undefined;
  error?: string;
};

export const fetchAllAnnouncements = async () => {
  const res = await apiGet<GetAllAnnouncementsRes>(
    `http://localhost:4000/api/v1/global/all-announcements`,
    getAuthConfig(token)
  );

  if (!res.success) {
    return {
      success: false,
      error: res.error || 'Failed to fetch class info',
      data: undefined,
    };
  }

  return {
    success: true,
    data: res.data?.data,
    message: res.data?.message,
  };
};

export const deleteClassAnnouncement = async (
  classId: string | undefined | null,
  announcementId: string
) => {
  const res = await apiDelete<GetAllAnnouncementsRes>(
    `http://localhost:4000/api/v1/professor/${classId}/delete-announcement/${announcementId}`,
    getAuthConfig(token)
  );

  if (res.success) {
    toast.success('Announcement delete successfully');
  } else {
    toast.error(res.error);
  }
};

export const deleteGlobalAnnouncement = async (announcementId: string) => {
  const res = await apiDelete<GetAllAnnouncementsRes>(
    `http://localhost:4000/api/v1/director/delete-announcement/${announcementId}`,
    getAuthConfig(token)
  );

  if (res.success) {
    toast.success('Announcement delete successfully');
  } else {
    toast.error(res.error);
  }
};
