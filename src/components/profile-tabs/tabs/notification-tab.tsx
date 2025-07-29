import CreateNotificationForm from '@/components/forms/create-notification-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUserNotification } from '@/hooks/queries/notification';
import { deleteNotification } from '@/lib/api/notification';
import { sessionAuth } from '@/lib/session';
import { useQueryClient } from '@tanstack/react-query';
import z from 'zod';

export const createNotificationSchema = z.object({
  heading: z.string(),
  description: z.string(),
});

const NotificationTab = ({ userId }: { userId: string }) => {
  const sessionUser = sessionAuth.getUser();
  const notificationData = useUserNotification(userId);
  const queryClient = useQueryClient();

  return (
    <Card variant="card">
      <CardHeader>
        <CardTitle>User notifications</CardTitle>
        <CardDescription>
          {notificationData.data?.data?.length
            ? 'View your notifcations down here'
            : 'You dont have any new notifcations'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {notificationData.data?.data?.map((notification) => (
          <Card
            key={notification._id}
            variant="card"
            className="flex flex-col items-start gap-2"
          >
            <CardTitle>{notification.heading}</CardTitle>
            <CardDescription>
              {notification.description} |{' '}
              {new Date(notification.createdAt).toLocaleDateString()}
            </CardDescription>
            <CardFooter className="w-full">
              <Button
                variant="outline"
                className="w-full"
                onClick={async () => {
                  await deleteNotification(notification._id);
                  queryClient.invalidateQueries({ queryKey: ['notification'] });
                }}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
        {sessionUser?.role === 'director' && (
          <CreateNotificationForm userId={userId} />
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationTab;
