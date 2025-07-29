import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { createNotification } from '@/lib/api/notification';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { createNotificationSchema } from '../profile-tabs/tabs/notification-tab';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useState } from 'react';

const CreateNotificationForm = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof createNotificationSchema>>({
    resolver: zodResolver(createNotificationSchema),
  });

  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<
    z.infer<typeof createNotificationSchema>
  > = async (data) => {
    await createNotification(userId, data);
    queryClient.invalidateQueries({ queryKey: ['notification'] });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="mt-5">Create notification</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <VisuallyHidden>
          <DialogTitle>Create notification form</DialogTitle>
        </VisuallyHidden>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              name="heading"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heading</FormLabel>
                  <FormControl>
                    <Input placeholder="Director call" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please come at my office tomorrow"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">Create notification</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNotificationForm;
