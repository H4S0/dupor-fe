import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { User } from '@/context/auth-context';
import { sessionAuth } from '@/lib/session';
import { updateUser } from '@/lib/api/user';
import { NavLink } from 'react-router-dom';

//sve u jedno zod-schemas file
const accountTypeEnum = ['student', 'parent', 'professor', 'director'] as const;

export const updateFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  jmb: z.number().optional(),
  role: z.enum(accountTypeEnum).optional().nullable(),
  image: z.string().optional(),
  parentId: z.string().optional(),
});

const UpdatingUserForm = ({
  user,
  parents,
  currentParent,
}: {
  user: User;
  parents?: User[] | undefined | null;
  currentParent: User | undefined | null;
}) => {
  const sessionUser = sessionAuth.getUser();
  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),

    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      jmb: user.jmb,
      role: user.role,
      parentId: user.parentId,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof updateFormSchema>> = async (
    data
  ) => {
    await updateUser(user?._id, data);
  };

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="firstName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="First name"
                  disabled={sessionUser?.role !== 'director'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="lastName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Last name"
                  disabled={sessionUser?.role !== 'director'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="jmb"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>JMB</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Your JMB"
                  disabled={sessionUser?.role !== 'director'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="role"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>User role</FormLabel>
              <Select
                disabled={sessionUser?.role !== 'director'}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder={user.role} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="professor">Professor</SelectItem>
                  <SelectItem value="director">Director</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {user.studentId && (
          <NavLink
            to={`/dashboard/${
              user.role === 'director' ? 'all-users' : 'main-class'
            }/${user.studentId}`}
          >
            <Button variant="outline" className="w-full sm:w-auto">
              View student
            </Button>
          </NavLink>
        )}

        {sessionUser?.role === 'director' && user.role === 'student' && (
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-5 w-full sm:col-span-2">
            <div className="flex-1">
              <FormField
                name="parentId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User parent</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`${
                            currentParent?.firstName || 'Parent'
                          } | ${currentParent?.jmb || 'JMB'}`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {parents?.length ? (
                            parents.map((parent) => (
                              <SelectItem key={parent._id} value={parent._id}>
                                {parent.firstName} | {parent.jmb}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none">
                              There are no available parents
                            </SelectItem>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {(sessionUser?.role === 'director' ||
          sessionUser?.role === 'professor') &&
          user.parentId && (
            <div className="sm:col-span-2">
              <NavLink
                to={`/dashboard/${
                  user.role === 'director' ? 'all-users' : 'main-class'
                }/${user.parentId}`}
              >
                <Button variant="outline" className="w-full sm:w-auto">
                  View parent
                </Button>
              </NavLink>
            </div>
          )}

        <div className="sm:col-span-2">
          <Button
            type="submit"
            variant="secondary"
            disabled={form.formState.isSubmitting}
          >
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdatingUserForm;
