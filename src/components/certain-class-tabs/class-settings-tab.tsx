import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Announcements, schoolUpdateClassSchema } from '@/lib/api';
import { Button } from '../ui/button';
import { FormField, FormItem, FormLabel, FormControl, Form } from '../ui/form';
import { Input } from '../ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/context/auth-context';
import { TabsContent } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { deleteClass, updateClass } from '@/lib/api/class';
import { sessionAuth } from '@/lib/session';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

type ClassInfo = {
  _id: string;
  className: string;
  numberOfStudents: number;
  mainProfessor: string;
  announcements: Announcements[];
  academicYear: string;
};

type ClassSettingsTabProps = {
  classData: ClassInfo;
  professors: User[] | undefined;
};

const ClassSettingsTab = ({ classData, professors }: ClassSettingsTabProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const sessionUser = sessionAuth.getUser();
  const form = useForm<z.infer<typeof schoolUpdateClassSchema>>({
    resolver: zodResolver(schoolUpdateClassSchema),
    defaultValues: {
      name: classData.className,
      mainProfessor: classData.mainProfessor,
      numberOfStudents: classData.numberOfStudents,
      academicYear: classData.academicYear,
    },
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof schoolUpdateClassSchema>
  > = async (data) => {
    const updates: Partial<z.infer<typeof schoolUpdateClassSchema>> = {};

    if (data.name !== classData.className) {
      updates.name = data.name;
    }
    if (data.mainProfessor !== classData.mainProfessor) {
      updates.mainProfessor = data.mainProfessor;
    }
    if (data.numberOfStudents !== classData.numberOfStudents) {
      updates.numberOfStudents = data.numberOfStudents;
    }
    if (data.academicYear !== classData.academicYear) {
      updates.academicYear = data.academicYear;
    }

    if (Object.keys(updates).length === 0) {
      return;
    }

    await updateClass(updates, classData._id);
    queryClient.invalidateQueries({ queryKey: ['class'] });
  };

  return (
    <TabsContent value="settings">
      <Card variant="card">
        <CardHeader className="text-2xl font-bold pb-2">
          Class Settings
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <h3 className="text-lg font-semibold ">General Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={sessionUser?.role !== 'director'}
                          placeholder="Enter the class name"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="mainProfessor"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main professor</FormLabel>
                      <FormControl>
                        <Select
                          disabled={sessionUser?.role !== 'director'}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a professor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {professors ? (
                                professors.map((professor) => (
                                  <SelectItem
                                    key={professor._id}
                                    value={professor._id}
                                  >
                                    {professor.firstName}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="none">
                                  There is no created professors
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
                  name="numberOfStudents"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum number of students</FormLabel>
                      <FormControl>
                        <Input
                          disabled={sessionUser?.role !== 'director'}
                          placeholder="The maximum number of students"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="academicYear"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic year</FormLabel>
                      <FormControl>
                        <Input
                          disabled={sessionUser?.role !== 'director'}
                          placeholder="2023/24"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={sessionUser?.role !== 'director'}>
                Save updates
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="rounded-lg border border-red-200 dark:border-red-800 m-5 flex flex-col items-start gap-5 p-5">
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
            Danger Zone
          </h3>

          <div>
            <h4 className="font-medium">Delete this class</h4>
            <p className="text-sm text-muted-foreground">
              Once you delete a class, there is no going back. Please be
              certain.
            </p>
          </div>
          <Button
            disabled={sessionUser?.role !== 'director'}
            variant="destructive"
            className="w-full sm:w-auto"
            onClick={async () => {
              await deleteClass(classData._id);
              queryClient.invalidateQueries({ queryKey: ['paginatedClasses'] });
              navigate('/dashboard/all-classes');
            }}
          >
            Delete Class
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default ClassSettingsTab;
