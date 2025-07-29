import { User } from '@/context/auth-context';

export const sessionAuth = {
  setToken: (token: string) => {
    if (token) {
      sessionStorage.setItem('authToken', token);
    }
  },
  getToken: (): string | null => {
    return sessionStorage.getItem('authToken');
  },

  removeToken: () => {
    sessionStorage.removeItem('authToken');
  },

  setUser: (user: User) => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  },

  getUser: (): User | null => {
    const userData = sessionStorage.getItem('user');
    if (!userData) return null;

    try {
      const parsed = JSON.parse(userData);

      if (typeof parsed === 'object' && parsed !== null) {
        return parsed as User;
      }

      return null;
    } catch (error) {
      console.error('Error parsing user from sessionStorage:', error);
      return null;
    }
  },

  removeUser: () => {
    sessionStorage.removeItem('user');
  },

  getAuthHeader: () => {
    const token = sessionStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  isAuthenticated: (): boolean => {
    return !!sessionStorage.getItem('authToken');
  },

  logout: () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
  },
};
