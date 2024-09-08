"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemController = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const boom_2 = require("@hapi/boom");
const helpers_1 = require("../helpers");
const validation_1 = require("../middlewares/validation");
const problemValidation_1 = require("../validators/problemValidation");
const leetcode_api_typescript_1 = require("leetcode-api-typescript");
const submissionValidation_1 = require("../validators/submissionValidation");
class ProblemController {
    constructor() { }
    static async singleProblem(req, res, next) {
        try {
            const { slug } = req.body;
            const problems = new leetcode_api_typescript_1.Problem(slug);
            await problems.detail();
            const response = {
                id: problems.id,
                content: problems.content,
                testCase: problems.sampleTestCase,
                codeSnippets: problems.codeSnippets,
            };
            res.json({ data: response, message: "Problem fetched successfully" });
        }
        catch (error) {
            next(error);
        }
    }
    static async submitProblem(req, res, next) {
        try {
            validation_1.Validator.check(submissionValidation_1.inputSubmitProblemSchema, req.body);
            const { language, code, slug } = req.body;
            const problem = new leetcode_api_typescript_1.Problem(slug);
            await problem.detail();
            const submissionResult = await problem.submit(language, code);
            if (!submissionResult.id)
                throw (0, boom_2.badRequest)("Error submitting problem");
            res.json({ data: submissionResult, message: "Problem submitted successfully" });
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
            validation_1.Validator.check(submissionValidation_1.inputGetSubmissionDetailsSchema, req.body);
            const { submissionId } = req.body;
            const variables = {
                variables: {
                    submissionId,
                },
            };
            const data = await (0, helpers_1.fetchSubmissionDetails)(variables);
            if (!data)
                throw (0, boom_2.badRequest)("No submission found", {
                    message: `No submission for for Id ${submissionId}`,
                });
            res.json({ data, message: "Submission Details fetched successfully" });
        }
        catch (error) {
            next(error);
        }
    }
    static async multipleProblem(req, res, next) {
        try {
            const validatedData = validation_1.Validator.check(problemValidation_1.problemSetKeysSchema, req.body);
            const variables = {
                variables: {
                    categorySlug: validatedData.categorySlug,
                    limit: validatedData.limit,
                    skip: validatedData.skip,
                    filters: validatedData.filters,
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
exports.ProblemController = ProblemController;
//# sourceMappingURL=ProblemController.js.map