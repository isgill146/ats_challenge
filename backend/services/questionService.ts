import { callOpenAI } from '../helpers/external/openai';
import { truncateText } from '../helpers/utils';
import { logger } from '../helpers/logger';

export async function generateQuestions(jobDescription: string, candidateCV: string) {

  const shortJD = truncateText(jobDescription);
  const shortCV = truncateText(candidateCV);


  try {
    const prompt = `
You are an AI recruiter assistant. Based on the following job description and candidate CV, generate a list of 5 technical and 3 behavioral interview questions.

Job Description:
${shortJD}

Candidate CV:
${shortCV}
    `;
    return await callOpenAI(prompt);
  } catch (err) {
    logger.error('Error in questionService.generateQuestions', err);
    throw err;
  }
}
