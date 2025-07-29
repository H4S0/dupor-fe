import {
  BookOpenCheck,
  Landmark,
  Megaphone,
  StickyNote,
  User,
  UsersRound,
} from 'lucide-react';

export const directorItems = {
  navMain: [
    {
      title: 'Classes',
      url: '#',
      icon: Landmark,
      isActive: true,
      items: [
        {
          title: 'View all classes',
          url: '/dashboard/all-classes',
        },
        {
          title: 'Create class',
          url: '#',
        },
      ],
    },
    {
      title: 'Users',
      url: '#',
      icon: UsersRound,
      items: [
        {
          title: 'Create user',
          url: '#',
        },
        {
          title: 'View all users',
          url: '/dashboard/all-users',
        },
      ],
    },
    {
      title: 'Announcement',
      url: '#',
      icon: Megaphone,
      items: [
        {
          title: 'Create announcement',
          url: '#',
        },
        {
          title: 'View all announcement',
          url: '/dashboard/global-announcements',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: StickyNote,
      items: [
        {
          title: 'View documentation',
          url: '/docs/introduction',
        },
      ],
    },
  ],
};

export const professorItems = {
  navMain: [
    {
      title: 'Classes',
      url: '#',
      icon: Landmark,
      isActive: true,
      items: [
        {
          title: 'Main class',
          url: '/dashboard/main-class',
        },
        {
          title: 'Other classes',
          url: '/dashboard/other-classes',
        },
      ],
    },
    {
      title: 'Notification',
      url: '',
      icon: Megaphone,
      isActive: true,
      items: [
        {
          title: 'Global announcements',
          url: '/dashboard/global-announcements',
        },
      ],
    },
    {
      title: 'Test checking',
      url: '',
      icon: BookOpenCheck,
      isActive: true,
      items: [
        {
          title: 'Test check',
          url: '/dashboard/test-checking',
        },
        {
          title: 'Test creation',
          url: '/dashboard/test-creation',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: StickyNote,
      items: [
        {
          title: 'View documentation',
          url: '/docs/introduction',
        },
      ],
    },
  ],
};

export const parentItems = {
  navMain: [
    {
      title: 'Student',
      url: '',
      icon: User,
      isActive: true,
      items: [
        {
          title: 'Grades informations',
          url: '/dashboard/grades',
        },
        {
          title: 'Attendance information',
          url: '/dashboard/attendance',
        },
      ],
    },
    {
      title: 'Class',
      url: '',
      icon: Landmark,
      isActive: true,
      items: [
        {
          title: 'Class information',
          url: '/dashboard/parent/class',
        },
      ],
    },
    {
      title: 'Notification',
      url: '',
      icon: Megaphone,
      isActive: true,
      items: [
        {
          title: 'Global announcements',
          url: '/dashboard/global-announcements',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: StickyNote,
      items: [
        {
          title: 'View documentation',
          url: '/docs/introduction',
        },
      ],
    },
  ],
};

export const studentItems = {
  navMain: [
    {
      title: 'Student',
      url: '',
      icon: User,
      isActive: true,
      items: [
        {
          title: 'Grades informations',
          url: '/dashboard/grades',
        },
        {
          title: 'Attendance information',
          url: '/dashboard/attendance',
        },
      ],
    },
    {
      title: 'Class',
      url: '',
      icon: Landmark,
      isActive: true,
      items: [
        {
          title: 'Class information',
          url: '/dashboard/student/class',
        },
      ],
    },

    {
      title: 'Documentation',
      url: '#',
      icon: StickyNote,
      items: [
        {
          title: 'View documentation',
          url: '/docs/introduction',
        },
      ],
    },
  ],
};

export function useItemsByRole(userRole: string | null) {
  switch (userRole) {
    case 'director':
      return directorItems;
    case 'professor':
      return professorItems;
    case 'parent':
      return parentItems;
    case 'student':
      return studentItems;
    default:
      return { navMain: [] };
  }
}
