import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { User } from '@/context/auth-context';
import StudentSelectionField from './student-selection-field';
import { Form } from '../ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '../ui/separator';
import { addStudentToClass } from '@/lib/api/class';
import { useQueryClient } from '@tanstack/react-query';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export const studentAddSchema = z.object({
  students: z.array(z.string()).optional(),
});

const AddStudentsModal = ({
  students,
  classStudents,
  classId,
}: {
  students: User[] | undefined;
  classStudents: User[] | undefined;
  classId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof studentAddSchema>>({
    resolver: zodResolver(studentAddSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof studentAddSchema>> = async (
    data
  ) => {
    await addStudentToClass(classId, data);
    queryClient.invalidateQueries({ queryKey: ['students'] });
    queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    setIsOpen(false);
    form.reset();
  };

  const filteredStudents = students?.filter((i) => !i.classId);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>Add students</Button>
      </DialogTrigger>
      <DialogContent>
        <VisuallyHidden>
          <DialogTitle>Update class by adding students</DialogTitle>
        </VisuallyHidden>
        <DialogDescription>
          Students that are already in class
        </DialogDescription>
        {classStudents?.map((student) => (
          <div key={student._id}>
            <p className="font-semibold text-sm">
              {student.firstName} | {student.jmb}
            </p>
          </div>
        ))}

        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <StudentSelectionField students={filteredStudents} form={form} />
            <Button type="submit" className="w-full mt-3">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentsModal;
