import { problemDifficulty } from "../enums";

export interface QuestionTag {
  name: string;
  id: string;
  slug: string;
}

export interface Question {
  difficulty: string;
  title: string;
  titleSlug: string;
  topicTags: QuestionTag[];
}

export interface ProblemsetQuestionListResponse {
  total: number;
  questions: Question[];
}

export interface filterData {
  difficulty: problemDifficulty;
  tags: string[];
}

export interface ProblemSetKeys {
  categorySlug: string;
  limit: number;
  skip: number;
  filters: filterData;
}

export interface GraphQLRequestConfig {
  variables?: ProblemSetKeys;
}

export interface getSubmissionInput {
  submissionId: number;
}

export interface getSubmissionRequestConfig {
  variables?: getSubmissionInput;
}
