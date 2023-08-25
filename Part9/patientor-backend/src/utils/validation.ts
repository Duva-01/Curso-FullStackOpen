import Joi from 'joi';

export const patientValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  dateOfBirth: Joi.string().required(),
  ssn: Joi.string().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  occupation: Joi.string().required(),
  entries: Joi.array().items(Joi.object()).optional()
});
