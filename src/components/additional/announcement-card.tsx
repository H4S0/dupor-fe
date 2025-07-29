import { Announcements } from '@/lib/api';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { formatDate } from '@/lib/format-date';
import { Button } from '../ui/button';
import { sessionAuth } from '@/lib/session';
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useCertainUser } from '@/hooks/queries/users';
import {
  deleteGlobalAnnouncement,
  deleteClassAnnouncement,
} from '@/lib/api/announcement';

const AnnouncementCard = ({
  classId,
  announcement,
}: {
  classId?: string;
  announcement: Announcements;
}) => {
  const user = sessionAuth.getUser();
  const owner = useCertainUser(announcement.ownerId);
  const pathname = useLocation();
  const isGlobal = pathname.pathname.includes('/global-announcements');
  const queryClient = useQueryClient();

  return (
    <Card className="relative pl-4 my-2" variant="card">
      <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-l-md" />
      <CardHeader className="text-xl">{announcement.heading}</CardHeader>
      <CardContent className="space-y-4">
        <p>{announcement.description}</p>
        {user?.role === 'director' && (
          <Button
            variant="destructive"
            onClick={async () => {
              isGlobal
                ? (await deleteGlobalAnnouncement(announcement._id),
                  queryClient.invalidateQueries({
                    queryKey: ['allAnnouncements'],
                  }))
                : (await deleteClassAnnouncement(classId, announcement._id),
                  queryClient.invalidateQueries({ queryKey: ['class'] }));
            }}
          >
            Delete Announcement
          </Button>
        )}
      </CardContent>
      <Separator className="my-3" />
      <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 p-5">
        <p className="text-sm text-muted-foreground">
          {owner.data?.data?.firstName} {owner.data?.data?.lastName} |{' '}
          {owner.data?.data?.role}
        </p>
        <p className="text-sm text-muted-foreground">
          {formatDate(announcement.createdAt)}
        </p>
      </CardFooter>
    </Card>
  );
};

export default AnnouncementCard;
