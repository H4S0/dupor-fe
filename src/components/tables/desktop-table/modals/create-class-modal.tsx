import CreateClassForm from '@/components/forms/create-class-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { User } from '@/context/auth-context';
import { useState } from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const CreateClassModal = ({
  students,
  professors,
}: {
  professors: User[] | undefined;
  students: User[] | undefined;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full">
        <Button variant="secondary">Create class</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <VisuallyHidden>
          <DialogTitle>Create class form</DialogTitle>
        </VisuallyHidden>
        <CreateClassForm
          students={students}
          professors={professors}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassModal;
