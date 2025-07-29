import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import EditTimetableForm from '../forms/edit-timetable-form';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { TimetableCardProps } from './timetable-card';
import { User } from '@/context/auth-context';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

type EditTimetableModalProps = {
  timetable: TimetableCardProps;
  professors: User[] | undefined;
};

const EditTimetableModal = ({
  timetable,
  professors,
}: EditTimetableModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant="outline" type="button">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <VisuallyHidden>
          <DialogTitle>Edit timetable by day</DialogTitle>
        </VisuallyHidden>
        <EditTimetableForm
          setIsOpen={setIsOpen}
          timetable={timetable}
          professors={professors}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditTimetableModal;
