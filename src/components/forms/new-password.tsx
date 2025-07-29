import { zodResolver } from '@hookform/resolvers/zod';

import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { updateUserPassword } from '@/lib/api/user';

export const updatePasswordSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});

const NewPasswordForm = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
  });
  const [searchParams] = useSearchParams();
  const passwordToken = searchParams.get('token');

  const onSubmit: SubmitHandler<z.infer<typeof updatePasswordSchema>> = async (
    data
  ) => {
    const res = await updateUserPassword({
      password: data.password,
      confirmPassword: data.confirmPassword,
      passwordUpdateToken: passwordToken,
    });

    if (res.success) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center md:p-10 pt-10">
      <Card variant="form">
        <CardHeader>
          <CardTitle>Update your password</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={form.formState.isSubmitting}>
                Update password
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default NewPasswordForm;
