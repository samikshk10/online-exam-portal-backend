import {
  GraphQLRequestConfig,
  ProblemsetQuestionListResponse,
  getSubmissionDetailsResponse,
  getSubmissionRequestConfig,
} from "../interfaces";
import { LeetCodeEndPoint } from "../config";
import { problemQuery, submissionQuery } from "../queries";
import { badRequest } from "@hapi/boom";

async function fetchProblemDetails({ variables }: GraphQLRequestConfig): Promise<ProblemsetQuestionListResponse> {
  try {
    const response = await fetch(LeetCodeEndPoint.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest",
      },
      body: JSON.stringify({
        operationName: "problemsetQuestionList",
        variables,
        query: problemQuery,
      }),
    });
    if (!response) {
      throw badRequest("Error fetching problems");
    }

    const result = await response.json();
    return result.data;
  } catch (error: any) {
    throw new Error(`Error fetching data from GraphQL endpoint: ${error}`);
  }
}

async function fetchSubmissionDetails({
  variables,
}: getSubmissionRequestConfig): Promise<getSubmissionDetailsResponse> {
  try {
    const response = await fetch(LeetCodeEndPoint.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: LeetCodeEndPoint.cookie,
        "x-requested-with": "XMLHttpRequest",
      },
      body: JSON.stringify({
        operationName: "mySubmissionDetails",
        variables,
        query: submissionQuery,
      }),
    });
    if (!response) {
      throw badRequest("Error fetching submission details");
    }

    const result = await response.json();
    return result.data;
  } catch (error: any) {
    throw new Error(`Error fetching data from GraphQL endpoint: ${error}`);
  }
}
export { fetchProblemDetails, fetchSubmissionDetails };
