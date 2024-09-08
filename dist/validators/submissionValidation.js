"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputGetSubmissionDetailsSchema = exports.inputSubmitProblemSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const inputSubmitProblemSchema = joi_1.default.object({
    language: joi_1.default.string().required(),
    code: joi_1.default.string().required(),
    slug: joi_1.default.string().required(),
});
exports.inputSubmitProblemSchema = inputSubmitProblemSchema;
const inputGetSubmissionDetailsSchema = joi_1.default.object({
    submissionId: joi_1.default.number().required(),
});
exports.inputGetSubmissionDetailsSchema = inputGetSubmissionDetailsSchema;
//# sourceMappingURL=submissionValidation.js.map