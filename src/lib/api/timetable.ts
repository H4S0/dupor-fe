import { EditTimetableSchema } from '@/components/forms/edit-timetable-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { getAuthConfig, TimeTable } from '../api';
import { apiDelete, apiPost, apiPut } from '../response-wrapper';
import { createTimetableSchema } from '@/components/forms/create-timetable-form';
import { sessionAuth } from '../session';

const token = sessionAuth.getToken();

export const createTimetable = async (
  data: z.infer<typeof createTimetableSchema>,
  classId: string
) => {
  const res = await apiPost<z.infer<typeof createTimetableSchema>>(
    `http://localhost:4000/api/v1/director/create-timetable/${classId}`,
    data,
    getAuthConfig(token)
  );

  if (res.success && res.data) {
    toast.success('Timetable create successfully');
  }

  if (!res.success) {
    toast.error(res.error);
  }
};

export const deleteTimetable = async (
  classId: string | undefined,
  timetableId: string
) => {
  const res = await apiDelete<TimeTable>(
    `http://localhost:4000/api/v1/director/${classId}/delete-timetable/${timetableId}`,
    getAuthConfig(token)
  );

  if (res.success && res.data) {
    toast.success('Timetable deleted successfully');
  }

  if (!res.success) {
    toast.error(res.error);
  }
};

export const editTimetable = async (
  data: z.infer<typeof EditTimetableSchema>,
  timetableId: string
) => {
  const res = await apiPut(
    `http://localhost:4000/api/v1/director/edit-timetable/${timetableId}`,
    data,
    getAuthConfig(token)
  );

  if (res.success && res.data) {
    toast.success('Timetable updated successfully');
  }

  if (!res.success) {
    toast.error(res.error);
  }
};
