import CreateUserForm from '@/components/forms/create-user-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const CreateUserModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create user</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <VisuallyHidden>
          <DialogTitle>Create user form</DialogTitle>
        </VisuallyHidden>
        <CreateUserForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
