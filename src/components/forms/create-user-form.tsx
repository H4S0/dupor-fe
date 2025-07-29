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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useQueryClient } from '@tanstack/react-query';
import { UploadDropzone } from '@/lib/uploadthing';
import { toast } from 'sonner';
import { useState } from 'react';
import { createUser } from '@/lib/api/user';

const accountTypeEnum = ['student', 'parent', 'professor', 'director'] as const;

export const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  jmb: z.coerce.number().positive(),
  role: z.enum(accountTypeEnum),
  image: z.string().optional().nullable(),
  parentId: z.string().optional(),
});

const CreateUserForm = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof createUserSchema>> = async (
    data
  ) => {
    await createUser({
      ...data,
      image: imageUrl,
      parentId: data.parentId,
    });

    setIsOpen(false);
    queryClient.invalidateQueries({ queryKey: ['paginatedUsers'] });
  };

  return (
    <Card variant="form">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the user's first name"
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
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the user's last name"
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
                        placeholder="Enter the user's JMB"
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
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select user role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="professor">Professor</SelectItem>
                            <SelectItem value="director">Director</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              {imageUrl === null ? (
                <UploadDropzone
                  appearance={{
                    button({ isUploading }) {
                      return [
                        'px-10 font-semibold text-black bg-primary',
                        'ut-ready:bg-green-500 after:bg-yellow-700',
                        isUploading
                          ? 'cursor-not-allowed opacity-50 pointer-events-none'
                          : 'cursor-pointer',
                      ].join(' ');
                    },
                    container: 'cursor-pointer p-5',
                    allowedContent:
                      'flex h-8 items-center justify-center px-2 text-white',
                  }}
                  endpoint={(routeRegistry) => routeRegistry.videoAndImage}
                  onClientUploadComplete={(file) => {
                    setImageLoading(true);
                    setImageUrl(file[0].url);
                    toast.success('Image uploaded successfully');
                  }}
                  onUploadError={(error) => {
                    console.error(error, error.cause);
                    toast.error('Image upload failed, please contact support');
                  }}
                />
              ) : (
                <div className="relative w-full">
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                      <div className="w-6 h-6 border-2 border-t-transparent border-gray-700 rounded-full animate-spin" />
                    </div>
                  )}
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    onLoad={() => setImageLoading(false)}
                    className={`w-full h-auto rounded ${
                      imageLoading
                        ? 'opacity-0'
                        : 'opacity-100 transition-opacity duration-300'
                    }`}
                  />
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              Create user
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CreateUserForm;
