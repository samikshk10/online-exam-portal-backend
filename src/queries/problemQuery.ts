export const problemQuery = `query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
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

export const submissionQuery = `query mySubmissionDetails($submissionId: Int!) {
    submissionDetails(submissionId: $submissionId) {      
      code
      statusCode
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
