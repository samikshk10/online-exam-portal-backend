"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.problemQuery = void 0;
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
//# sourceMappingURL=leetCodeQueries.js.map