import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { useState } from 'react';
import CreateAnnouncementForm from '../forms/create-announcement-form';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const CreateAnnouncementModal = ({
  isMainProfessor,
}: {
  isMainProfessor: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>Create create announcement</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <VisuallyHidden>
          <DialogTitle>Create announcement form</DialogTitle>
        </VisuallyHidden>
        <CreateAnnouncementForm
          setIsOpen={setIsOpen}
          isMainProfessor={isMainProfessor}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateAnnouncementModal;
