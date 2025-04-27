import { validateRequest } from '../helpers/utils';
import { scoreCandidate } from '../services/scoreService';
import { scoreSchema } from '@/backend/helpers/validation/score';

export async function handleScoring(body: any) {
  const { jobDescription, candidateCV, candidateAnswers, averageAnswerTime } = validateRequest(scoreSchema, body);
  return await scoreCandidate(jobDescription, candidateCV, candidateAnswers, averageAnswerTime);
}
