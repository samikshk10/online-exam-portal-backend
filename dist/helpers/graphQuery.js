"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSubmissionDetails = exports.fetchProblemDetails = void 0;
const config_1 = require("../config");
const queries_1 = require("../queries");
const boom_1 = require("@hapi/boom");
async function fetchProblemDetails({ variables }) {
    try {
        const response = await fetch(config_1.LeetCodeEndPoint.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-requested-with": "XMLHttpRequest",
            },
            body: JSON.stringify({
                operationName: "problemsetQuestionList",
                variables,
                query: queries_1.problemQuery,
            }),
        });
        if (!response) {
            throw (0, boom_1.badRequest)("Error fetching problems");
        }
        const result = await response.json();
        return result.data;
    }
    catch (error) {
        throw new Error(`Error fetching data from GraphQL endpoint: ${error}`);
    }
}
exports.fetchProblemDetails = fetchProblemDetails;
async function fetchSubmissionDetails({ variables, }) {
    try {
        const response = await fetch(config_1.LeetCodeEndPoint.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                cookie: config_1.LeetCodeEndPoint.cookie,
                "x-requested-with": "XMLHttpRequest",
            },
            body: JSON.stringify({
                operationName: "mySubmissionDetails",
                variables,
                query: queries_1.submissionQuery,
            }),
        });
        if (!response) {
            throw (0, boom_1.badRequest)("Error fetching submission details");
        }
        const result = await response.json();
        return result.data;
    }
    catch (error) {
        throw new Error(`Error fetching data from GraphQL endpoint: ${error}`);
    }
}
exports.fetchSubmissionDetails = fetchSubmissionDetails;
//# sourceMappingURL=graphQuery.js.map