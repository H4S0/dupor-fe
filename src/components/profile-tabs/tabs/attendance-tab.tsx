import AllAttendanceModal from '@/components/additional/all-attendance-modal';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { DatePickerDemo } from '@/components/ui/date-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
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
import { createUserAttendance } from '@/lib/api/user';
import { sessionAuth } from '@/lib/session';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export const attendanceSchema = z.object({
  subjectName: z.string(),
  present: z.enum(['absent', 'unabsent', '']),
  date: z.coerce.date(),
});

const AttendanceTab = ({ user }: { user: User }) => {
  const sessionUser = sessionAuth.getUser();
  const form = useForm<z.infer<typeof attendanceSchema>>({
    resolver: zodResolver(attendanceSchema),
  });
  const queryClient = useQueryClient();
  const classData = useClassById(user.classId);
  const onSubmit: SubmitHandler<z.infer<typeof attendanceSchema>> = async (
    data
  ) => {
    await createUserAttendance(user?._id, data);
    form.reset({
      subjectName: '',
      present: '',
      date: undefined,
    });
    queryClient.invalidateQueries({ queryKey: ['certainAttendance'] });
  };

  const subjectNames = classData?.data?.data?.timetables?.map((item) =>
    item.subjects.map((subject) => subject.subjectName)
  );

  return (
    <Card variant="card">
      <CardHeader>
        <CardTitle>Attendance</CardTitle>
        <CardDescription>Manage attendance records</CardDescription>
      </CardHeader>

      {sessionUser?.role === 'professor' && (
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
              name="present"
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
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="unabsent">Unabsent</SelectItem>
                      </SelectContent>
                    </Select>
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

            <div className="flex flex-row flex-wrap gap-4">
              <Button type="submit" className="w-full sm:w-auto flex-1">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      )}
      {subjectNames ? (
        <AllAttendanceModal subjectNames={subjectNames?.flat()} user={user} />
      ) : (
        <p>There is no subject for this class</p>
      )}
    </Card>
  );
};

export default AttendanceTab;
