import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { Card, CardContent, CardFooter } from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { User } from '@/context/auth-context';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import StudentSelectionField from '../additional/student-selection-field';
import { useQueryClient } from '@tanstack/react-query';
import { createClass } from '@/lib/api/class';

export const announcementSchema = z.object({
  heading: z.string().min(1, 'Heading is required'),
  description: z.string().min(1, 'Description is required'),
});

export const createClassSchema = z.object({
  name: z.string().min(1, 'Class name is required'),
  numberOfStudents: z.coerce
    .number()
    .min(1, 'At least one student is required'),
  mainProfessor: z.string().min(1, 'Main professor ID is required'),
  academicYear: z.string(),
  students: z.array(z.string()).optional(),
  announcements: z.array(announcementSchema).optional(),
});

type CreateClassFormProps = {
  students: User[] | undefined;
  professors: User[] | undefined;
  setIsOpen: (isOpen: boolean) => void;
};

const CreateClassForm = ({
  students,
  professors,
  setIsOpen,
}: CreateClassFormProps) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof createClassSchema>>({
    resolver: zodResolver(createClassSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof createClassSchema>> = async (
    data
  ) => {
    await createClass(data);
    setIsOpen(false);
    queryClient.invalidateQueries({ queryKey: ['paginatedClasses'] });
  };

  return (
    <Card variant="form">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your class name" {...field} />
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
                      type="number"
                      placeholder="Maximum number of students"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="academicYear"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academic Year</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2024/25" {...field} />
                  </FormControl>
                  <FormMessage />
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
                                {professor.firstName} | {professor.jmb}
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-1 md:col-span-2">
              <StudentSelectionField students={students} form={form} />
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              Submit
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CreateClassForm;
