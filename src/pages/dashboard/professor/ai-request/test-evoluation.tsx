import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { GoogleGenAI } from '@google/genai';
import { addingExerciseSchema } from '../test-check';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

type FormValues = z.infer<typeof addingExerciseSchema>;

type EvaluationProps = {
  form: UseFormReturn<FormValues>;
  ocrText: string | undefined;
  setLoadingEval: (isLoading: boolean) => void;
  setEvaluationResult: (text: string | undefined) => void;
};

export const handleEvaluation = async ({
  form,
  ocrText,
  setEvaluationResult,
  setLoadingEval,
}: EvaluationProps) => {
  if (!ocrText) {
    toast.error('No extracted text to evaluate!');
    return;
  }

  const exercises = form.getValues('exercise');
  if (!exercises || exercises.length === 0) {
    toast.error('Please add at least one exercise with max points!');
    return;
  }

  try {
    setLoadingEval(true);
    setEvaluationResult(undefined);

    const prompt = generatePrompt(exercises, ocrText);

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ text: prompt }],
    });

    const resultText = result.text;

    if (!resultText) {
      return;
    }

    const lines = resultText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => /^Task \d+: \d+\/\d+$/.test(line));

    if (lines.length > 0) {
      setEvaluationResult(lines?.join('\n'));
    } else {
      setEvaluationResult(resultText);
    }

    toast.success('Evaluation received!');
  } catch (error) {
    console.error('Error calling Gemini:', error);
    toast.error('Failed to get evaluation from Gemini');
  } finally {
    setLoadingEval(false);
  }
};

export const generatePrompt = (
  exercises: { task: string; points: number }[],
  ocrText: string
) => {
  const instructions = `
You are an assistant grading a student's test.

Only grade the exact number of tasks provided below. If the student's answers contain more than that, ignore all other content.

⚠️ Mathematical expressions may be written in LaTeX format. Interpret LaTeX syntax accurately during evaluation.

Here are the tasks to grade:

${exercises
  .map((ex, i) => `Task ${i + 1}: ${ex.task} - Max points: ${ex.points}`)
  .join('\n')}

This is the student's full answer extracted from the image:
"""
${ocrText}
"""

⚠️ IMPORTANT: Only evaluate the ${
    exercises.length
  } task(s) listed above. Ignore all other text or answers. Match answers to tasks strictly in order.

Return the result in the following format (no explanation):
Task 1: X/Y
Task 2: X/Y
...`;

  return instructions.trim();
};

export async function extractTextWithGemini(imageUrl: string) {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  const base64ImageData = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string)?.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  const result = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        inlineData: {
          mimeType: blob.type || 'image/jpeg',
          data: base64ImageData,
        },
      },
      {
        text: 'Extract all visible text from this image. Do not interpret it, only return the raw text.',
      },
    ],
  });

  return result.text;
}
