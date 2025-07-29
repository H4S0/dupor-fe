import AllGradesModal from '@/components/additional/all-grades-modal';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DatePickerDemo } from '@/components/ui/date-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User } from '@/context/auth-context';
import { useClassById } from '@/hooks/queries/class';
import { addingGrade } from '@/lib/api/grades';
import { sessionAuth } from '@/lib/session';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export const addingGradeSchema = z.object({
  subjectName: z.string(),
  status: z.enum(['interview', 'test', 'activity']),
  grade: z.coerce.number().positive(),
  date: z.coerce.date(),
});

const GradesTab = ({ user }: { user: User }) => {
  const sessionUser = sessionAuth.getUser();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof addingGradeSchema>>({
    resolver: zodResolver(addingGradeSchema),
  });

  const classData = useClassById(user.classId);
  const onSubmit: SubmitHandler<z.infer<typeof addingGradeSchema>> = async (
    data
  ) => {
    await addingGrade(user._id, data);
    form.reset();
    queryClient.invalidateQueries({ queryKey: ['certainGrades'] });
  };

  const subjectNames = classData?.data?.data?.timetables?.map((item) =>
    item.subjects.map((subject) => subject.subjectName)
  );

  return (
    <Card variant="card">
      <CardHeader>
        <CardTitle>Grades</CardTitle>
        <CardDescription>Manage grades records</CardDescription>
      </CardHeader>

      {sessionUser?.role === 'professor' && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="subjectName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Name</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(val) => field.onChange(val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject to add attendance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {classData.data?.data?.timetables?.length ? (
                            classData.data?.data?.timetables?.map((item) =>
                              item.subjects.map((subject) => (
                                <SelectItem
                                  key={subject.professorId}
                                  value={subject.subjectName}
                                >
                                  {subject.subjectName}
                                </SelectItem>
                              ))
                            )
                          ) : (
                            <SelectItem value="none">
                              There are no available parents
                            </SelectItem>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(val) => field.onChange(val)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="test">Test</SelectItem>
                        <SelectItem value="activity">Activity</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="grade"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Grade</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1-5" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <DatePickerDemo
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex flex-row flex-wrap gap-4 mb-3">
              <Button type="submit" className="w-full sm:w-auto flex-1">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      )}

      {subjectNames ? (
        <AllGradesModal subjectNames={subjectNames?.flat()} user={user} />
      ) : (
        <p>There is no subject for this class</p>
      )}
    </Card>
  );
};

export default GradesTab;
