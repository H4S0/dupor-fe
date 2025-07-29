import { User, Users, BookOpen, Briefcase } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const loginFormSchema = z.object({
  jmb: z.coerce
    .number({
      required_error: 'You need to insert your jmbg to login',
    })
    .positive(),
  password: z.string(),
  role: z.enum(['student', 'parent', 'professor', 'director'], {
    required_error: 'You need to select your role to login',
  }),
});

const LoginForm = () => {
  const [isCapsLock, setIsCapsLock] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setIsCapsLock(e.getModifierState('CapsLock'));
  };

  const onSubmit: SubmitHandler<z.infer<typeof loginFormSchema>> = async (
    data
  ) => {
    await login(data);
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center md:p-10 pt-10">
      <Card
        className="w-full max-w-md mx-auto sm:max-w-lg md:max-w-xl"
        variant="card"
      >
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-2xl">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center sm:text-base">
            Sign in to access your school dashboard
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form
            className="w-full text-left"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <CardContent className="space-y-6">
              <FormField
                name="role"
                control={form.control}
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-2 sm:gap-3"
                    >
                      <div className="flex items-center justify-center space-x-2 border p-3 rounded-lg hover:border-primary transition-colors">
                        <FormControl>
                          <RadioGroupItem value="student" id="student" />
                        </FormControl>
                        <User className="hidden md:block" />
                        <Label htmlFor="student" className="whitespace-nowrap">
                          Student
                        </Label>
                      </div>
                      <div className="flex items-center justify-center space-x-2 border p-3 rounded-lg hover:border-primary transition-colors">
                        <FormControl>
                          <RadioGroupItem value="parent" id="parent" />
                        </FormControl>
                        <Users className="hidden md:block" />
                        <Label htmlFor="parent" className="whitespace-nowrap">
                          Parent
                        </Label>
                      </div>
                      <div className="flex items-center justify-center space-x-2 border p-3 rounded-lg hover:border-primary transition-colors">
                        <FormControl>
                          <RadioGroupItem value="professor" id="professor" />
                        </FormControl>
                        <BookOpen className="hidden md:block" />
                        <Label
                          htmlFor="professor"
                          className="whitespace-nowrap"
                        >
                          Professor
                        </Label>
                      </div>
                      <div className="flex items-center justify-center space-x-2 border p-3 rounded-lg hover:border-primary transition-colors">
                        <FormControl>
                          <RadioGroupItem value="director" id="director" />
                        </FormControl>
                        <Briefcase className="hidden md:block" />
                        <Label htmlFor="director" className="whitespace-nowrap">
                          Director
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                )}
              />

              <div className="space-y-4">
                <FormField
                  name="jmb"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>JMBG</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please insert your JMBG"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <p
                          className={cn(
                            'text-sm font-semibold duration-200 transition-opacity',
                            isCapsLock ? 'opacity-100' : 'opacity-0'
                          )}
                        >
                          Caps lock active
                        </p>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          onKeyDown={handleKeyDown}
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={form.formState.isSubmitting}>
                Login
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
