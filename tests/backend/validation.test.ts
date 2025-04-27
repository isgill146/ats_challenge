import { describe, it, expect } from 'vitest';
import { validateRequest } from '../../backend/helpers/utils';
import { questionSchema } from '../../backend/helpers/validation/question';
import { chatSchema } from '../../backend/helpers/validation/chat';
import { scoreSchema } from '../../backend/helpers/validation/score';

describe('Validation Tests', () => {
  // Job Description + Candidate CV validation
  it('should pass validation for valid job description and CV (questionSchema)', () => {
    const validData = {
      jobDescription: 'This is a valid job description with enough length and detail.',
      candidateCV: 'This is a valid CV content that meets the minimum character requirements.'
    };
    const result = validateRequest(questionSchema, validData);
    expect(result).toEqual(validData);
  });

  it('should fail validation for short job description (questionSchema)', () => {
    const invalidData = {
      jobDescription: 'Too short.',
      candidateCV: 'This is a valid CV.'
    };
    expect(() => validateRequest(questionSchema, invalidData)).toThrow();
  });

  it('should fail validation for missing candidateCV (questionSchema)', () => {
    const invalidData = {
      jobDescription: 'This is a valid JD.'
    };
    expect(() => validateRequest(questionSchema, invalidData)).toThrow();
  });

  // Chat Schema
  it('should pass validation for chatSchema with valid conversation history', () => {
    const validData = {
      jobDescription: 'This is a valid job description with enough length and detail.',
      candidateCV: 'This is a valid CV content that meets the minimum character requirements.',
      conversationHistory: [
        { role: 'user', content: 'Tell me about scaling.' },
        { role: 'assistant', content: 'Scaling can be done via...' }
      ]
    };
    const result = validateRequest(chatSchema, validData);
    expect(result).toEqual(validData);
  });

  it('should fail validation if conversationHistory is missing (chatSchema)', () => {
    const invalidData = {
      jobDescription: 'Good JD content here.',
      candidateCV: 'Good CV content here.'
    };
    expect(() => validateRequest(chatSchema, invalidData)).toThrow();
  });

  // Scoring Schema
  it('should pass validation for scoringSchema with all fields', () => {
    const validData = {
        jobDescription: 'This is a valid job description with enough length and detail.',
        candidateCV: 'This is a valid CV content that meets the minimum character requirements.',
      candidateAnswers: 'These are some candidate answers.',
      averageAnswerTime: 45
    };
    const result = validateRequest(scoreSchema, validData);
    expect(result).toEqual(validData);
  });

  it('should fail validation for scoringSchema if averageAnswerTime is missing', () => {
    const invalidData = {
      jobDescription: 'Good JD.',
      candidateCV: 'Good CV.',
      candidateAnswers: 'These are some candidate answers.',
    };
    expect(() => validateRequest(scoreSchema, invalidData)).toThrow();
  });
});
