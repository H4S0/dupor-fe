import AppLayout from '@/components/additional/dashboard-layout';
import { MathEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { handleTestCreation } from './ai-request/test-creation-handle';
import { useState } from 'react';

export const TestCreationSchema = z.object({
  subjectName: z.string(),
  tasksNumber: z.coerce.number(),
  topic: z.string(),
});

const TestCreation = () => {
  const [llmResponse, setLlmResponse] = useState<string | undefined>(undefined);
  const [loadingEval, setLoadingEval] = useState(false);
  const form = useForm<z.infer<typeof TestCreationSchema>>({
    resolver: zodResolver(TestCreationSchema),
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof TestCreationSchema>
  > = async () => {
    await handleTestCreation({
      form: form,
      setLlmResponse: setLlmResponse,
      setLoadingEval: setLoadingEval,
    });
  };

  return (
    <AppLayout>
      <Card variant="card">
        <CardHeader>
          <CardTitle>Test creation tool</CardTitle>
          <CardDescription className="text-primary font-semibold">
            This is a temporary test creation tool. Your test will not be
            saved—if you refresh or leave the page, all entered information will
            be lost.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  name="subjectName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Math" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="tasksNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task number</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="topic"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject topic (module)</FormLabel>
                    <FormControl>
                      <Input placeholder="Integrals & Functions" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter>
                <Button type="submit" disabled={loadingEval}>
                  Request LLM response
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>

      <MathEditor className="min-h-[1000px]" content={llmResponse} />
    </AppLayout>
  );
};

export default TestCreation;
