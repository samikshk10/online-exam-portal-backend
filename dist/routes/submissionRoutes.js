"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionRouter = void 0;
// import { exceptionHandler } from "@src/middlewares";
const leetcodeauth_1 = require("../middlewares/leetcodeauth");
const classes_1 = require("../classes");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
class SubmissionRouter extends classes_1.RouterClass {
    constructor() {
        super();
    }
    define() {
        this.router
            .route("/problem/submit")
            .post((0, middlewares_1.exceptionHandler)(leetcodeauth_1.leetCodeAuthCheck), (0, middlewares_1.exceptionHandler)(controllers_1.SubmissionController.submitProblem));
        this.router
            .route("/get/submission-detail")
            .post((0, middlewares_1.exceptionHandler)(leetcodeauth_1.leetCodeAuthCheck), (0, middlewares_1.exceptionHandler)(controllers_1.SubmissionController.getSubmissionDetails));
    }
}
exports.SubmissionRouter = SubmissionRouter;
//# sourceMappingURL=submissionRoutes.js.map