import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { FormField, FormItem, FormLabel, FormControl, Form } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { announcementSchema } from '../forms/create-class-form';
import { createGlobalAnnouncement } from '@/lib/api/announcement';

const GlobalAnnouncementModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const query = useQueryClient();
  const form = useForm<z.infer<typeof announcementSchema>>({
    resolver: zodResolver(announcementSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof announcementSchema>> = async (
    data
  ) => {
    await createGlobalAnnouncement(data);
    setIsOpen(false);
    query.invalidateQueries({ queryKey: ['allAnnouncements'] });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>Create global announcement</Button>
      </DialogTrigger>
      <DialogContent>
        <Card variant="form">
          <CardHeader>
            <CardTitle>Create announcement form</CardTitle>
            <CardDescription>anno desc</CardDescription>
          </CardHeader>

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
      </DialogContent>
    </Dialog>
  );
};

export default GlobalAnnouncementModal;
