import { apiPost } from '@/lib/response-wrapper';
import { sessionAuth } from '@/lib/session';
import { useEffect, useState, createContext } from 'react';
import { toast } from 'sonner';

export type UserRole = 'student' | 'parent' | 'professor' | 'director' | null;

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  jmb: number;
  role: UserRole;
  isFirstLogin: boolean;
  createdAt: string;
  image: string;
  parentId: string;
  studentId: string;
  classId: string;
}

export interface AuthResponse {
  data: {
    user: User;
    token: string;
  };
  message?: string;
}

export interface LoginData {
  jmb: number;
  password: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // ✅ NEW
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
}

export async function createSHA512Hash(data: string) {
  const encoded = new TextEncoder().encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-512', encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // ✅ NEW

  useEffect(() => {
    const storedUser = sessionAuth.getUser();
    const isAuth = sessionAuth.isAuthenticated();

    if (storedUser && isAuth) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  const login = async (data: LoginData) => {
    const hashedPassword = await createSHA512Hash(data.password);

    const res = await apiPost<AuthResponse, LoginData>(
      'http://localhost:4000/api/v1/auth/login',
      {
        ...data,
        password: hashedPassword,
      }
    );

    if (res.success && res.data) {
      const { data } = res.data;

      sessionAuth.setToken(data.token);
      sessionAuth.setUser(data.user);
      setIsAuthenticated(true);
      setUser(data.user);

      toast.success('Logged in successfully');
    }
  };

  const logout = () => {
    sessionAuth.logout();
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const updateUser = (updatedUser: User) => {
    sessionAuth.setUser(updatedUser);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
