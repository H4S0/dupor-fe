import { SubmitHandler, useForm } from 'react-hook-form';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { announcementSchema } from './create-class-form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { createClassAnnouncement } from '@/lib/api/announcement';

type CreateAnnouncementForm = {
  setIsOpen: (isOpen: boolean) => void;
  isMainProfessor: boolean;
};

const CreateClassAnnouncementForm = ({
  setIsOpen,
  isMainProfessor,
}: CreateAnnouncementForm) => {
  const query = useQueryClient();
  const form = useForm<z.infer<typeof announcementSchema>>({
    resolver: zodResolver(announcementSchema),
  });
  const onSubmit: SubmitHandler<z.infer<typeof announcementSchema>> = async (
    data
  ) => {
    await createClassAnnouncement(data);
    setIsOpen(false);
    if (isMainProfessor) {
      query.invalidateQueries({ queryKey: ['mainClass'] });
    } else {
      query.invalidateQueries({ queryKey: ['class'] });
    }
  };

  return (
    <Card variant="form">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-3">
            <FormField
              name="heading"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Announcement Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Rest day announcement" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Announcement Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Rest day announcement descritpion"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full">
              Create announcement
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CreateClassAnnouncementForm;
