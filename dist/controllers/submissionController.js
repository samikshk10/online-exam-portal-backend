"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionController = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const boom_2 = require("@hapi/boom");
const helpers_1 = require("../helpers");
const validation_1 = require("../middlewares/validation");
const leetcode_api_typescript_1 = require("leetcode-api-typescript");
const submissionValidation_1 = require("../validators/submissionValidation");
class SubmissionController {
    constructor() { }
    static async submitProblem(req, res, next) {
        try {
            validation_1.Validator.check(submissionValidation_1.inputSubmitProblemSchema, req.body);
            const { language, code, slug } = req.body;
            const problem = new leetcode_api_typescript_1.Problem(slug);
            await problem.detail();
            const submissionResult = await problem.submit(language, code);
            if (!submissionResult.id)
                throw (0, boom_2.badRequest)("Error submitting problem");
            res.json({ data: submissionResult, message: 'Problem submitted successfully' });
        }
        catch (error) {
            if (error instanceof Error) {
                throw boom_1.default.badRequest(error.message);
            }
            else {
                next(error);
            }
        }
    }
    static async getSubmissionDetails(req, res, next) {
        try {
            const validatedData = validation_1.Validator.check(submissionValidation_1.inputGetSubmissionDetailsSchema, req.body);
            const { submissionId } = req.body;
            const variables = {
                variables: {
                    submissionId
                },
            };
            const data = await (0, helpers_1.fetchProblemDetails)(variables);
            if (data.total === 0) {
                throw (0, boom_2.badRequest)("No problems found");
            }
            res.json({ data, message: "Problems fetched successfully" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SubmissionController = SubmissionController;
//# sourceMappingURL=SubmissionController.js.map