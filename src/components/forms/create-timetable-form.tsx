import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { Card, CardContent } from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import AddSubjectToTimetableForm from './add-subject-timetable-form';
import { Button } from '../ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@/context/auth-context';
import { createTimetable } from '@/lib/api/timetable';

export const dayEnum = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
] as const;

export const createTimetableSchema = z.object({
  day: z.enum(dayEnum),
  startTime: z.string(),
  endTime: z.string(),
  subjects: z
    .array(
      z.object({
        subjectName: z.string(),
        professorId: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        room: z.string(),
      })
    )
    .max(7),
});

type CreateTimetableFormProps = {
  classId: string | undefined;
  setIsOpen: (isOpen: boolean) => void;
  professors: User[] | undefined;
};

const CreateTimetableForm = ({
  classId,
  setIsOpen,
  professors,
}: CreateTimetableFormProps) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof createTimetableSchema>>({
    resolver: zodResolver(createTimetableSchema),
  });

  if (!classId) {
    return (
      <p className="text-red font-semibold text-xl">
        Something went wrong please contact support!
      </p>
    );
  }

  const onSubmit: SubmitHandler<z.infer<typeof createTimetableSchema>> = async (
    data
  ) => {
    await createTimetable(data, classId);
    setIsOpen(false);
    queryClient.invalidateQueries({ queryKey: ['class'] });
  };

  return (
    <Card variant="form">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="pr-4 space-y-6">
            <FormField
              name="day"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day</FormLabel>
                  <FormControl>
                    <Input placeholder="Monday" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="startTime"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start time</FormLabel>
                  <FormControl>
                    <Input placeholder="7:00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="endTime"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End time</FormLabel>
                  <FormControl>
                    <Input placeholder="13:00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AddSubjectToTimetableForm form={form} professors={professors} />
          </CardContent>

          <Button type="submit" className="mt-4 w-full">
            Create
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default CreateTimetableForm;
