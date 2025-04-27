import Joi from 'joi';

export const chatSchema = Joi.object({
  jobDescription: Joi.string().min(30).required(),
  candidateCV: Joi.string().min(30).required(),
  conversationHistory: Joi.array().items(
    Joi.object({
      role: Joi.string().valid('user', 'assistant').required(),
      content: Joi.string().required(),
    })
  ).optional(),
});
