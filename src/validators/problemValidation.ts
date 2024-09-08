import Joi from "joi";

const filterDataSchema = Joi.object({
  searchKeywords: Joi.string().allow("").optional(),
  difficulty: Joi.string().allow("").optional(),
  tags: Joi.array().items(Joi.string()).optional(),
});

const problemSetKeysSchema = Joi.object({
  categorySlug: Joi.string().allow("").optional(),
  limit: Joi.number().integer().min(1).optional(),
  skip: Joi.number().integer().min(0).optional(),
  filters: filterDataSchema.allow({}),
});

export { filterDataSchema, problemSetKeysSchema };
