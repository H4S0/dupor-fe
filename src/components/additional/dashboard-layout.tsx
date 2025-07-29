import { useAuth } from '@/hooks/use-auth';
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from '../sidebar/dashboard-sidebar';
import DashboardNavbar from '../sidebar/navbar';
import { ThemeProvider } from '../theme-provider/provider';

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);

  React.useEffect(() => {
    if (!isLoading) {
      setIsCheckingAuth(false);
    }
  }, [isLoading]);

  React.useEffect(() => {
    if (!isCheckingAuth && (!user || !isAuthenticated)) {
      navigate('/');
    }
  }, [user, isAuthenticated, isCheckingAuth, navigate]);

  if (!user || !isAuthenticated) {
    return null;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
          <AppSidebar user={user} logout={logout} key={user._id} />
          <div className="flex-1 flex flex-col">
            <DashboardNavbar />
            <div className="flex-1 overflow-auto p-4 md:p-8">
              <div className="max-w-6xl mx-auto w-full">{children}</div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default AppLayout;
