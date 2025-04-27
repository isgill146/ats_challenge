import { logger } from '../helpers/logger';
import { callOpenAI } from '../helpers/external/openai';
import { truncateText } from '../helpers/utils';

type CandidateScore = {
    technicalAcumen: number;
    communicationSkills: number;
    responsivenessAgility: number;
    problemSolvingAdaptability: number;
    culturalFit: number;
    overallScore: number;
    summary: string;
  };

export async function scoreCandidate(
  jobDescription: string,
  candidateCV: string,
  candidateAnswers: string,
  averageAnswerTime: number
): Promise<CandidateScore> {
  const shortJD = truncateText(jobDescription);
  const shortCV = truncateText(candidateCV);
  const shortAnswers = truncateText(candidateAnswers, 4000);

  try {
    const prompt = `
    You are an expert technical recruiter and interviewer.
    
    You are given:
    
    - Job Description
    - Candidate CV
    - Candidate Interview Answers
    - Average Answer Time (seconds)
    
    Your task is to evaluate the candidate strictly across multiple categories and provide a detailed score breakdown.
    
    Scoring Categories:
    - technicalAcumen (1-10): Accuracy and depth of technical responses.
    - communicationSkills (1-10): Clarity, coherence, and articulation.
    - responsivenessAgility (1-10): Speed and agility of thinking (based on average answer time and thoughtful responses).
    - problemSolvingAdaptability (1-10): Ability to handle follow-ups, problem-solving attitude.
    - culturalFit (1-10): Soft skills, professionalism, attitude fit for team/company.
    
    Then compute:
    - overallScore: Average of all category scores (rounded to one decimal).
    
    Finally, provide:
    - summary: Short paragraph highlighting strengths and weaknesses.
    
    Respond strictly in the following JSON format:
    {
      "technicalAcumen": <number>,
      "communicationSkills": <number>,
      "responsivenessAgility": <number>,
      "problemSolvingAdaptability": <number>,
      "culturalFit": <number>,
      "overallScore": <number>,
      "summary": "<text>"
    }
    
    Inputs:
    
    Job Description:
    ${shortJD}
    
    Candidate CV:
    ${shortCV}
    
    Candidate Interview Answers:
    ${shortAnswers}
    
    Average Time per Answer: ${averageAnswerTime} seconds
    `;
    

    const response = await callOpenAI(prompt);

    const cleaned = response
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const result = JSON.parse(cleaned);

    return {
        technicalAcumen: result.technicalAcumen,
        communicationSkills: result.communicationSkills,
        responsivenessAgility: result.responsivenessAgility,
        problemSolvingAdaptability: result.problemSolvingAdaptability,
        culturalFit: result.culturalFit,
        overallScore: result.overallScore,
        summary: result.summary
    };
  } catch (err) {
    logger.error('Error in scoreService.scoreCandidate', err);
    throw err;
  }
}
