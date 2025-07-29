import AnnouncementCard from '@/components/additional/announcement-card';
import AppLayout from '@/components/additional/dashboard-layout';
import GlobalAnnouncementModal from '@/components/additional/global-announcement-modal';
import { useAllAnnouncements } from '@/hooks/queries/announcement';
import { sessionAuth } from '@/lib/session';

const GlobalAnnouncements = () => {
  const queryData = useAllAnnouncements();
  const sessionUser = sessionAuth.getUser();
  const isLoading = queryData?.isLoading;
  const isError = queryData?.isError;

  const announcements = queryData?.data?.data ?? [];

  const CenteredMessage = ({ children }: { children: React.ReactNode }) => (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="max-w-md w-full text-center">{children}</div>
    </div>
  );

  if (isLoading) {
    return (
      <AppLayout>
        <CenteredMessage>
          <p className="text-xl font-medium">Loading announcements...</p>
        </CenteredMessage>
      </AppLayout>
    );
  }

  if (isError) {
    return (
      <AppLayout>
        <CenteredMessage>
          <p className="text-xl font-medium text-red-500">
            Failed to load announcements.
          </p>
        </CenteredMessage>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {sessionUser?.role === 'director' && (
        <div className="p-4">
          <GlobalAnnouncementModal />
        </div>
      )}

      <div className="mt-5">
        {announcements.length > 0 ? (
          <div className="px-4 max-w-6xl mx-auto">
            {announcements.map((item) => (
              <AnnouncementCard key={item._id} announcement={item} />
            ))}
          </div>
        ) : (
          <CenteredMessage>
            <p className="text-gray-500 text-lg">No announcements found.</p>
          </CenteredMessage>
        )}
      </div>
    </AppLayout>
  );
};

export default GlobalAnnouncements;
