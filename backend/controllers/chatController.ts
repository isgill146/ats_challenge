import { validateRequest } from '@/backend/helpers/utils';
import { chatSchema } from '@/backend/helpers/validation/chat';
import { getNextInterviewQuestion } from '@/backend/services/chatService';

export async function handleChatTurn(body: any) {
  const { jobDescription, candidateCV, conversationHistory } = validateRequest(chatSchema, body);
  const nextQuestion = await getNextInterviewQuestion(jobDescription, candidateCV, conversationHistory);
  return { nextQuestion };
}
