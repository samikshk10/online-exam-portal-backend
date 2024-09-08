import Joi from "joi";

const inputSubmitProblemSchema = Joi.object({
  language: Joi.string().required(),
  code: Joi.string().required(),
  slug: Joi.string().required(),
});

const inputGetSubmissionDetailsSchema = Joi.object({
  submissionId: Joi.number().required(),
});

export { inputSubmitProblemSchema, inputGetSubmissionDetailsSchema };
