import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { GoogleGenAI } from '@google/genai';
import { TestCreationSchema } from '../test-creation';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

type FormValues = z.infer<typeof TestCreationSchema>;

type EvaluationProps = {
  form: UseFormReturn<FormValues>;
  setLoadingEval: (isLoading: boolean) => void;
  setLlmResponse: (text: string | undefined) => void;
};

export const handleTestCreation = async ({
  form,
  setLoadingEval,
  setLlmResponse,
}: EvaluationProps) => {
  const subjectName = form.getValues('subjectName');
  const tasksNumber = form.getValues('tasksNumber');
  const topic = form.getValues('topic');

  try {
    setLoadingEval(true);
    setLlmResponse(undefined);

    const prompt = generateCreationPrompt(subjectName, tasksNumber, topic);

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ text: prompt }],
    });

    const resultText = result.text;

    if (!resultText) {
      return;
    }
    console.log('Gemini response:', resultText);
    setLlmResponse(resultText);
    toast.success('Evaluation received!');
  } catch (error) {
    console.error('Error calling Gemini:', error);
    toast.error('Failed to get evaluation from Gemini');
  } finally {
    setLoadingEval(false);
  }
};

export const generateCreationPrompt = (
  subjectName: string,
  tasksNumber: number,
  topic: string
) => {
  const instructions = `
You are creating a student test in HTML format (for rich text editors). 
The test should have:
- a title (h2),
- three tasks (each with a heading),
- bold instructions (**),
- bullet points or ordered lists where needed,
- clear spacing between sections (use <br /> or <hr />),
- avoid using Markdown syntax like "**bold**" or "---" and use HTML tags instead.

The subject is: ${subjectName}
Number of tasks: ${tasksNumber}
Topic: ${topic}

Respond ONLY with valid HTML formatted for a rich text editor.
`;

  return instructions.trim();
};
