import Boom from "@hapi/boom";
import { badRequest } from "@hapi/boom";
import { fetchProblemDetails, fetchSubmissionDetails } from "../helpers";
import {
  GraphQLRequestConfig,
  ProblemSetKeys,
  ProblemsetQuestionListResponse,
  SubmitProblemResponse,
  getSubmissionDetailsResponse,
  getSubmissionRequestConfig,
  singleProblemInterfaceOutput,
} from "../interfaces";
import { Validator } from "../middlewares/validation";
import { problemSetKeysSchema } from "../validators/problemValidation";
import { Request, Response, NextFunction } from "express";
import { Problem } from "leetcode-api-typescript";
import { inputGetSubmissionDetailsSchema, inputSubmitProblemSchema } from "../validators/submissionValidation";

export class ProblemController {
  public constructor() {}

  public static async singleProblem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slug } = req.body;

      const problems = new Problem(slug);

      await problems.detail();

      const response: singleProblemInterfaceOutput = {
        id: problems.id,
        content: problems.content,
        testCase: problems.sampleTestCase,
        codeSnippets: problems.codeSnippets,
      };

      res.json({ data: response, message: "Problem fetched successfully" });
    } catch (error) {
      next(error);
    }
  }

  public static async submitProblem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      Validator.check(inputSubmitProblemSchema, req.body);
      const { language, code, slug } = req.body;
      const problem = new Problem(slug);
      await problem.detail();
      const submissionResult: SubmitProblemResponse = await problem.submit(language, code);

      if (!submissionResult.id) throw badRequest("Error submitting problem");

      res.json({ data: submissionResult, message: "Problem submitted successfully" });
    } catch (error: any) {
      if (error instanceof Error) {
        throw Boom.badRequest(error.message);
      } else {
        next(error);
      }
    }
  }

  public static async getSubmissionDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      Validator.check(inputGetSubmissionDetailsSchema, req.body);

      const { submissionId } = req.body;

      const variables: getSubmissionRequestConfig = {
        variables: {
          submissionId,
        },
      };

      const data: getSubmissionDetailsResponse = await fetchSubmissionDetails(variables);
      if (!data)
        throw badRequest("No submission found", {
          message: `No submission for for Id ${submissionId}`,
        });

      res.json({ data, message: "Submission Details fetched successfully" });
    } catch (error) {
      next(error);
    }
  }

  public static async multipleProblem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validatedData: ProblemSetKeys = Validator.check(problemSetKeysSchema, req.body);

      const variables: GraphQLRequestConfig = {
        variables: {
          categorySlug: validatedData.categorySlug,
          limit: validatedData.limit,
          skip: validatedData.skip,
          filters: validatedData.filters,
        },
      };

      const data: ProblemsetQuestionListResponse = await fetchProblemDetails(variables);

      if (data.total === 0) {
        throw badRequest("No problems found");
      }

      res.json({ data, message: "Problems fetched successfully" });
    } catch (error) {
      next(error);
    }
  }
}
