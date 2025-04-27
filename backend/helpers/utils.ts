
import { BadRequestError } from '../../backend/helpers/errors';
import Joi from 'joi';



export function validateRequest(schema: Joi.ObjectSchema, data: any) {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    const message = error.details.map((detail) => detail.message).join('; ');
    throw new BadRequestError(message);
  }
  return value;
}



export function truncateText(text: string, maxLength = 3000) {
    return text.length > maxLength ? text.slice(0, maxLength) : text;
  }
  