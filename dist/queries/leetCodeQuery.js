"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submissionQuery = exports.problemQuery = void 0;
exports.problemQuery = `query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
    problemsetQuestionList: questionList(
      categorySlug: $categorySlug,
      limit: $limit,
      skip: $skip,
      filters: $filters
    ) {
      total: totalNum
      questions: data {
        difficulty
        title
        titleSlug
        topicTags {
          name
          id
          slug
        }
      }
    }
  }`;
exports.submissionQuery = `query mySubmissionDetails($submissionId: Int!) {
  submissionDetails(submissionId: $submissionId) {
    runtime
    runtimeDisplay
    runtimePercentile
    runtimeDistribution
    memory
    memoryDisplay
    memoryPercentile
    memoryDistribution
    code
    timestamp
    statusCode
    user {
      username
      profile {
        realName
        userAvatar
      }
    }
    lang {
      name
      verboseName
    }
    question {
      questionId
      titleSlug
      hasFrontendPreview
    }
    notes
    flagType
    topicTags {
      tagId
      slug
      name
    }
    runtimeError
    compileError
    lastTestcase
    codeOutput
    expectedOutput
    totalCorrect
    totalTestcases
    fullCodeOutput
    testDescriptions
    testBodies
    testInfo
    stdOutput
  }
}`;
//# sourceMappingURL=leetCodeQuery.js.map