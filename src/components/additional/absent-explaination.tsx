import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '../ui/textarea';
import { DialogTitle } from '@radix-ui/react-dialog';
import { sendAbsentExplaination } from '@/lib/api/attendance';

export const AbsentExplanationSchema = z.object({
  absentExplaination: z.string().min(1, 'Explanation is required'),
});

const AbsentExplanationModal = ({ studentId }: { studentId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof AbsentExplanationSchema>>({
    resolver: zodResolver(AbsentExplanationSchema),
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof AbsentExplanationSchema>
  > = async (data) => {
    await sendAbsentExplaination(data, studentId);
    setIsOpen(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Send Absence Explanation</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Absence Explanation</DialogTitle>
          <DialogDescription>
            This explanation will be sent to the professor who marked the
            absence, as well as to the class coordinator. They will decide
            whether to accept or reject it.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="absentExplaination"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Explanation</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a clear reason for your absence..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="w-full mt-6" type="submit">
              Send Explanation
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AbsentExplanationModal;
