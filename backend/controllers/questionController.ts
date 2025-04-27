import { validateRequest } from '../helpers/utils';
import { generateQuestions } from '../services/questionService';
import { questionSchema } from '@/backend/helpers/validation/question';

export async function handleQuestionGeneration(body: any) {
  const { jobDescription, candidateCV } = validateRequest(questionSchema,body);
  const questions = await generateQuestions(jobDescription, candidateCV);
  return { questions };
}
