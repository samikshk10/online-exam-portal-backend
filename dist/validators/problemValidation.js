"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.problemSetKeysSchema = exports.filterDataSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const filterDataSchema = joi_1.default.object({
    searchKeywords: joi_1.default.string().allow("").optional(),
    difficulty: joi_1.default.string().allow("").optional(),
    tags: joi_1.default.array().items(joi_1.default.string()).optional(),
});
exports.filterDataSchema = filterDataSchema;
const problemSetKeysSchema = joi_1.default.object({
    categorySlug: joi_1.default.string().allow("").optional(),
    limit: joi_1.default.number().integer().min(1).optional(),
    skip: joi_1.default.number().integer().min(0).optional(),
    filters: filterDataSchema.allow({}),
});
exports.problemSetKeysSchema = problemSetKeysSchema;
//# sourceMappingURL=problemValidation.js.map