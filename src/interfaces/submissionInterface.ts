export interface SubmitProblemResponse {
  id: number;
}

export interface getSubmissionDetailsResponse {
  code: string;
  statusCode: string;
  runtimeError: string;
  compileError: string;
  lastTestcase: string;
  codeOutput: string;
  expectedOutput: string;
  totalCorrect: string;
  totalTestcases: string;
  fullCodeOutput: string;
  testDescriptions: string;
  testBodies: string;
  testInfo: string;
  stdOutput: string;
}
