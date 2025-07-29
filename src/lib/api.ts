import { User } from '@/context/auth-context';
import type StudentColumnWrapper from '@/pages/dashboard/director/certain-class';
import z from 'zod';

export const getAuthConfig = (token: string | null) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export type GetPaginatedParams = {
  query?: string;
  limit?: number;
  page?: number;
};

type PaginationData = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

export type Subjects = {
  professorId: string;
  subjectName: string;
  grade: number;
  _id: string;
};

export type Students = {
  firstName: string;
  parentName: string;
  parentPhoneNumber: number;
  parentId: string;
  _id: string;
  subjects: Subjects[];
  createdAt: string;
};

export type Announcements = {
  heading: string;
  description: string;
  _id: string;
  ownerId: string;
  createdAt: string;
};

export type Class = {
  _id: string;
  name: string;
  numberOfStudents: number;
  mainProfessor: string;
  createdAt: string;
  students: Students[];
  announcements: Announcements[];
};

export type GetPaginatedClassRes = {
  success: boolean;
  message?: string;
  data: Class[] | undefined;
  pagination: PaginationData | undefined;
  error?: string;
};

export type ClassById = {
  classInfo:
    | {
        _id: string;
        className: string;
        numberOfStudents: number;
        mainProfessor: string;
        announcements: Announcements[];
        academicYear: string;
      }
    | undefined;
  timetables: TimeTable;
};

export type ClassByIDRes = {
  success: boolean;
  message?: string;
  data: ClassById | undefined;
  error?: string;
};

export enum WeekDay {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
}

export type TimeTable =
  | {
      _id: string;
      classId: string;
      day: WeekDay;
      startTime: string;
      endTime: string;
      subjects: {
        subjectName: string;
        professorId: string;
        room: string;
        startTime: string;
        endTime: string;
      }[];
    }[]
  | undefined;

export const schoolUpdateClassSchema = z.object({
  name: z.string().min(1, 'Class name is required').optional(),
  numberOfStudents: z
    .number()
    .min(1, 'At least one student is required')
    .optional(),
  mainProfessor: z.string().min(1, 'Main professor ID is required').optional(),
  academicYear: z.string().optional(),
  students: z.array(z.string()).optional(),
});

export type GetPaginatedStudentsRes = {
  success: boolean;
  message?: string;
  data: (typeof StudentColumnWrapper)[] | undefined;
  pagination: PaginationData | undefined;
  error?: string;
};

export type updatedUserRes = {
  data: User | undefined;
};

export type updateUserPasswordReq = {
  password: string;
  confirmPassword: string;
  passwordUpdateToken: string | null;
};

export type passwordRequestRes = {
  message: string;
  data: {
    resetUrl: string;
  };
};

export type updateUserPasswordRes = {
  message?: string;
  success: boolean;
};

export type GetPaginatedUserRes = {
  success: boolean;
  message?: string;
  data: User[] | undefined;
  pagination: PaginationData | undefined;
  error?: string;
};

export type GetUserRes = {
  success: boolean;
  message?: string;
  data: User | undefined;
  pagination: PaginationData | undefined;
  error?: string;
};

export type MainClassRes = {
  data: {
    mainClass: Class | undefined;
    mainClassTimetable: TimeTable;
  };
};

export type OtherClassesRes = {
  data: {
    matchingClass: Class | undefined;
    matchingClassTimetable: TimeTable;
  };
};

export type Attendance = {
  _id: string;
  studentId: string;
  professorId: string;
  classId: string;
  subjectName: string;
  absentExplaination: string;
  date: Date;
  status: string;
  createdAt: string;
};

export type Grade = {
  _id: string;
  studentId: string;
  professorId: string;
  classId: string;
  subjectName: string;
  grade: number;
  date: Date;
  status: string;
  createdAt: string;
};

export type GradeRes = {
  data: Grade[] | undefined;
  message?: string;
  error?: string;
};

export type AttendanceRes = {
  data: Attendance[] | undefined;
  message?: string;
  error?: string;
};

export type StudentByParentRes = {
  data: User | undefined;
  message?: string;
  error?: string;
};

export type AbsentExplanationOpts = {
  absentExplaination: string;
};

export type Notification = {
  _id: string;
  heading: string;
  description: string;
  createdAt: Date;
};

export type NotificationRes = {
  data: Notification[] | undefined;
  message?: string;
  error?: string;
};
