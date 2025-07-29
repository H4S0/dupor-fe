import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './context/auth-context';
import ProtectedRoutes from './components/additional/protected-route';
import LoadingSpinner from './components/additional/loading-spinner';

const Login = lazy(() => import('./pages/Login'));
const SetPassword = lazy(() => import('./pages/dashboard/profile/SetPassword'));
const ProfilePage = lazy(() => import('./pages/dashboard/profile'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const AllClasses = lazy(() => import('./pages/dashboard/director/all-classes'));
const CertainClass = lazy(
  () => import('./pages/dashboard/director/certain-class')
);
const AllUsers = lazy(() => import('./pages/dashboard/director/all-users'));
const CertainUser = lazy(
  () => import('./pages/dashboard/director/certain-user')
);
const GlobalAnnouncements = lazy(
  () => import('./pages/dashboard/director/global-announcement')
);
const MainClass = lazy(() => import('./pages/dashboard/professor/main-class'));
const OtherClasses = lazy(
  () => import('./pages/dashboard/professor/other-classes')
);
const ParentStudent = lazy(
  () => import('./pages/dashboard/parent/parent-student')
);
const ParentAttendance = lazy(
  () => import('./pages/dashboard/parent/parent-attendance')
);
const ParentClass = lazy(() => import('./pages/dashboard/parent/parent-class'));
const ParentGradePage = lazy(
  () => import('./pages/dashboard/parent/parent-grade-page')
);
const TestCheck = lazy(() => import('./pages/dashboard/professor/test-check'));
const TestCreation = lazy(
  () => import('./pages/dashboard/professor/test-creation')
);
const StudentClass = lazy(
  () => import('./pages/dashboard/student/student-class')
);
const Introduction = lazy(() => import('./pages/docs/pages/introduction'));
const GettingStarted = lazy(() => import('./pages/docs/pages/getting-started'));
const Director = lazy(() => import('./pages/docs/pages/director'));
const CreatingUser = lazy(() => import('./pages/docs/pages/creating-user'));
const CreatingClass = lazy(() => import('./pages/docs/pages/creating-class'));
const Notification = lazy(() => import('./pages/docs/pages/notification'));
const Professor = lazy(() => import('./pages/docs/pages/professor'));
const AttendanceManager = lazy(
  () => import('./pages/docs/pages/attendance-manager')
);
const GradeManager = lazy(() => import('./pages/docs/pages/grade-manager'));
const TestChecking = lazy(() => import('./pages/docs/pages/test-checking'));
const TestCreating = lazy(() => import('./pages/docs/pages/test-creation'));
const Parent = lazy(() => import('./pages/docs/pages/parent'));
const AbsentExplanation = lazy(
  () => import('./pages/docs/pages/absent-explaination')
);
const Student = lazy(() => import('./pages/docs/pages/student'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Toaster richColors />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/docs/introduction" element={<Introduction />} />
            <Route path="/docs/getting-started" element={<GettingStarted />} />
            <Route path="/docs/director" element={<Director />} />
            <Route path="/docs/creating-user" element={<CreatingUser />} />
            <Route path="/docs/creating-class" element={<CreatingClass />} />
            <Route path="/docs/notification" element={<Notification />} />
            <Route path="/docs/professor" element={<Professor />} />
            <Route
              path="/docs/attendance-manager"
              element={<AttendanceManager />}
            />
            <Route path="/docs/grade-manager" element={<GradeManager />} />
            <Route path="/docs/test-checking" element={<TestChecking />} />
            <Route path="/docs/test-creation" element={<TestCreating />} />
            <Route path="/docs/parent" element={<Parent />} />
            <Route
              path="/docs/absent-explaination"
              element={<AbsentExplanation />}
            />
            <Route path="/docs/student" element={<Student />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/dashboard/set-new-password"
                element={<SetPassword />}
              />
              <Route path="/dashboard/user-profile" element={<ProfilePage />} />
              <Route path="/dashboard/all-classes" element={<AllClasses />} />
              <Route
                path="/dashboard/all-classes/:classId"
                element={<CertainClass />}
              />
              <Route path="/dashboard/all-users" element={<AllUsers />} />
              <Route
                path="/dashboard/all-users/:userId"
                element={<CertainUser />}
              />
              <Route
                path="/dashboard/global-announcements"
                element={<GlobalAnnouncements />}
              />
              <Route path="/dashboard/main-class" element={<MainClass />} />
              <Route
                path="/dashboard/other-classes"
                element={<OtherClasses />}
              />
              <Route
                path="/dashboard/parent/student"
                element={<ParentStudent />}
              />
              <Route path="/dashboard/parent/class" element={<ParentClass />} />
              <Route
                path="/dashboard/attendance"
                element={<ParentAttendance />}
              />
              <Route
                path="/dashboard/student/class"
                element={<StudentClass />}
              />
              <Route path="/dashboard/grades" element={<ParentGradePage />} />
              <Route path="/dashboard/test-checking" element={<TestCheck />} />
              <Route
                path="/dashboard/test-creation"
                element={<TestCreation />}
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
