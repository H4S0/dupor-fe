import AppLayout from '@/components/additional/dashboard-layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UploadDropzone } from '@/lib/uploadthing';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Trash } from 'lucide-react';

import { MathEditor } from '@/components/tiptap-templates/simple/simple-editor';
import formatText from '@/lib/format-text';
import {
  extractTextWithGemini,
  handleEvaluation,
} from './ai-request/test-evoluation';

export const addingExerciseSchema = z.object({
  exercise: z.array(
    z.object({
      task: z.string(),
      points: z.number().min(1),
    })
  ),
});

const TestCheck = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [ocrText, setOcrText] = useState<string | undefined>('');
  const [loadingOCR, setLoadingOCR] = useState(false);
  const [loadingEval, setLoadingEval] = useState(false);
  const [editorContent, setEditorContent] = useState<string | undefined>('');
  const [evaluationResult, setEvaluationResult] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (ocrText) {
      setEditorContent(formatText(ocrText));
    }
  }, [ocrText]);

  const form = useForm<z.infer<typeof addingExerciseSchema>>({
    resolver: zodResolver(addingExerciseSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'exercise',
  });

  const handleOCR = async () => {
    if (!imageUrl) return;

    try {
      setLoadingOCR(true);
      toast.info('Extracting text from image using Gemini...');

      const extractedText = await extractTextWithGemini(imageUrl);
      setOcrText(extractedText);
      toast.success('Text extracted from image!');

      await handleEvaluation({
        form,
        ocrText,
        setEvaluationResult,
        setLoadingEval,
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to extract text with Gemini');
    } finally {
      setLoadingOCR(false);
    }
  };

  return (
    <AppLayout>
      <Card variant="card">
        <CardHeader>
          <CardTitle>Test checking tool</CardTitle>
          <CardDescription>
            AI-powered test correction tool – instantly extract and evaluate
            handwritten or printed tests using image recognition and smart
            grading. <br />
            <span className="text-primary font-semibold">
              Please note: While this tool provides fast and helpful feedback,
              it may not be 100% accurate. Always review results manually for
              best accuracy.
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <div className="mb-4">
              <Button
                type="button"
                onClick={() =>
                  append({
                    task: '',
                    points: 0,
                  })
                }
              >
                Add Exercise
              </Button>
            </div>

            {fields.length > 0 && (
              <ScrollArea className="h-[300px] pr-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="border p-4 rounded-xl my-5 bg-secondary"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <FormField
                        name={`exercise.${index}.task`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Task</FormLabel>
                            <FormControl>
                              <Input placeholder="Task 1" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        name={`exercise.${index}.points`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full md:w-40">
                            <FormLabel>Max Points</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="10"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                      className="w-full md:w-auto mt-3"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            )}

            {imageUrl === null ? (
              <UploadDropzone
                appearance={{
                  button({ isUploading }) {
                    return [
                      'px-10 font-semibold text-black bg-primary',
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
              <div className="relative w-full mt-6 flex justify-center">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                    <div className="w-6 h-6 border-2 border-t-transparent border-gray-700 rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  onLoad={() => setImageLoading(false)}
                  className={`max-w-xl max-h-[500px] object-contain rounded shadow-md ${
                    imageLoading
                      ? 'opacity-0'
                      : 'opacity-100 transition-opacity duration-300'
                  }`}
                />
              </div>
            )}

            {imageUrl && (
              <div className="mt-6 flex flex-col gap-3">
                <Button onClick={handleOCR} disabled={loadingOCR}>
                  {loadingOCR ? 'Processing image...' : 'Upload & Extract Text'}
                </Button>
                <Button variant="destructive" onClick={() => setImageUrl(null)}>
                  <Trash />
                  <span>Remove picture</span>
                </Button>

                {evaluationResult && (
                  <pre className="mt-4 p-4 bg-green-100 rounded border text-sm whitespace-pre-wrap text-green-900">
                    {evaluationResult}
                  </pre>
                )}
              </div>
            )}
          </Form>

          <MathEditor content={editorContent} onChange={setEditorContent} />
          <Button
            className="mt-3"
            onClick={() => {
              handleEvaluation({
                form,
                ocrText: editorContent,
                setEvaluationResult,
                setLoadingEval,
              });
            }}
            disabled={loadingEval}
          >
            {loadingEval ? 'Checking...' : 'Check Test'}
          </Button>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default TestCheck;
