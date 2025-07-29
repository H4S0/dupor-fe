import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type AnnouncementProps = {
  heading: string;
  description: string;
  ownerId: string;
  _id: string;
}[];

const AnnouncementModal = ({
  announcement,
}: {
  announcement: AnnouncementProps;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {' '}
        Announcements
        <span className="text-primary ml-1">({announcement.length})</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {announcement.length > 0 ? (
          announcement.map((item) => (
            <AlertDialogHeader key={item._id}>
              <AlertDialogTitle>{item.heading}</AlertDialogTitle>
              <AlertDialogDescription>
                {item.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
          ))
        ) : (
          <AlertDialogTitle className="font-semibold text-md">
            This class doesnt have any announcement
          </AlertDialogTitle>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-primary">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AnnouncementModal;
