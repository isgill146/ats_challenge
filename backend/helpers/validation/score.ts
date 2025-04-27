import Joi from 'joi';

export const scoreSchema = Joi.object({
    jobDescription: Joi.string().min(30).required(),
    candidateCV: Joi.string().min(30).required(),
    candidateAnswers: Joi.string().min(10).required(),
    averageAnswerTime: Joi.number().required(),
  });
  
