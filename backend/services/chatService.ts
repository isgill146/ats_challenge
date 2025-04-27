import { callOpenAIChat } from '@/backend/helpers/external/openai';
import { truncateText } from '@/backend/helpers/utils';
import { logger } from '@/backend/helpers/logger';

export async function getNextInterviewQuestion(
  jobDescription: string,
  candidateCV: string,
  conversationHistory: { role: 'user' | 'assistant'; content: string }[]
) {
  const shortJD = truncateText(jobDescription);
  const shortCV = truncateText(candidateCV);

  try {
    const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
        {
          role: 'system',
          content: `
      You are an expert AI technical recruiter conducting a structured real-time interview.
      
      Updated Rules:
      - After each candidate answer:
        - If the candidate seems confused or asks for clarification ("I didn't understand", "can you repeat?", etc.), briefly reframe or clarify your last question, and ask it again.
        - If the candidate gives a valid but shallow answer, ask **one** follow-up question to dig deeper.
        - After clarification + follow-up (maximum one of each), **then move to the next topic** from the Job Description.
      - Always be professional, neutral, and supportive — like a real technical interviewer.
      - Focus on gathering insights into candidate's thinking, experience, and decision-making.
      - Ask one strong interview question at a time — no greetings, no thank yous between turns.
      - Do not repeat the entire Job Description or CV again after each turn.
      - Keep the conversation flowing logically and naturally.
      
      Respond only with the next interview question (or clarification if needed).
      `
        },
        {
          role: 'user',
          content: `Here is the Job Description:\n${shortJD}\n\nHere is the Candidate CV:\n${shortCV}`,
        },
        ...conversationHistory,
      ];
      
      

    return await callOpenAIChat(messages);

  } catch (err) {
    logger.error('Error in chatService.getNextInterviewQuestion', err);
    throw err;
  }
}
