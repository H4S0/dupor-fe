import { ThemeProvider } from '@/components/theme-provider/provider';
import DocsSidebar from './docs-components/sidebar/docs-sidebar-items';
import { Link, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import sidebarItems from './docs-components/sidebar/sidebar-items-data';

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const currentIndex = sidebarItems.findIndex(
    (route) => route.path === location.pathname
  );
  const isNext = sidebarItems[currentIndex + 1];
  const isPrev = sidebarItems[currentIndex - 1];

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex px-6 md:px-12 lg:px-24 py-6 gap-8">
        <aside className="w-64 shrink-0">
          <DocsSidebar />
        </aside>

        <main className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-5xl">{children}</div>
          <div className="flex flex-col md:flex-row items-center w-full gap-5 justify-around mt-12 pt-6">
            {isPrev ? (
              <Card variant="card" className="w-72">
                <Link
                  to={isPrev.path}
                  className="flex flex-col items-start gap-2"
                >
                  ← Previous
                  <span className="font-semibold">{isPrev.title}</span>
                </Link>
              </Card>
            ) : (
              <div />
            )}

            {isNext ? (
              <Card variant="card" className="w-72">
                <Link
                  to={isNext.path}
                  className="flex flex-col items-end gap-2"
                >
                  Next →<span className="font-semibold">{isNext.title}</span>
                </Link>
              </Card>
            ) : (
              <div />
            )}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default DocsLayout;
