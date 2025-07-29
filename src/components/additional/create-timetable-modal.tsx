import { useState } from 'react';
import CreateTimetableForm from '../forms/create-timetable-form';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { User } from '@/context/auth-context';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const CreateTimetableModal = ({
  classId,
  professors,
}: {
  classId: string | undefined;
  professors: User[] | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>Create timetable by day</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <VisuallyHidden>
          <DialogTitle>Create timetable form</DialogTitle>
        </VisuallyHidden>
        <CreateTimetableForm
          classId={classId}
          setIsOpen={setIsOpen}
          professors={professors}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTimetableModal;
