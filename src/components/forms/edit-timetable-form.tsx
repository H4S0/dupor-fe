import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { dayEnum } from './create-timetable-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TimetableCardProps } from '../additional/timetable-card';
import { useQueryClient } from '@tanstack/react-query';
import EditSubjectForm from './edit-subject-form';
import { User } from '@/context/auth-context';
import { editTimetable } from '@/lib/api/timetable';

export const EditTimetableSchema = z.object({
  day: z.enum(dayEnum).optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
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
    .max(7)
    .optional(),
});

type EditTimetableFormProps = {
  setIsOpen: (isOpen: boolean) => void;
  timetable: TimetableCardProps;
  professors: User[] | undefined;
};

const EditTimetableForm = ({
  setIsOpen,
  timetable,
  professors,
}: EditTimetableFormProps) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof EditTimetableSchema>>({
    resolver: zodResolver(EditTimetableSchema),
    defaultValues: {
      day: timetable.day,
      startTime: timetable.startTime,
      endTime: timetable.endTime,
      subjects: timetable.subjects,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof EditTimetableSchema>> = async (
    data
  ) => {
    await editTimetable(data, timetable._id);

    setIsOpen(false);
    queryClient.invalidateQueries({ queryKey: ['class'] });
  };
  return (
    <Card variant="form">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <Input placeholder="07:00" {...field} />
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
            </div>

            <EditSubjectForm form={form} professors={professors} />
          </CardContent>

          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default EditTimetableForm;
