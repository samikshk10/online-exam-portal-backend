import { CodeSnippet, ProblemDifficulty } from "leetcode-api-typescript";

export interface singleProblemInterfaceOutput {
  id?: number;
  content?: string;
  testCase?: string;
  codeSnippets?: CodeSnippet[];
}

export interface multipleProblemInterfaceOutput {
  id?: number;
  title?: string;
  difficulty?: ProblemDifficulty;
}
