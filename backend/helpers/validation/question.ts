import Joi from 'joi';

export const questionSchema = Joi.object({
  jobDescription: Joi.string().min(30).required(),
  candidateCV: Joi.string().min(30).required(),
});
