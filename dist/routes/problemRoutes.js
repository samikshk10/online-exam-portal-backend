"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemRouter = void 0;
// import { exceptionHandler } from "@src/middlewares";
const leetcodeauth_1 = require("../middlewares/leetcodeauth");
const classes_1 = require("../classes");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
class ProblemRouter extends classes_1.RouterClass {
    constructor() {
        super();
    }
    define() {
        this.router
            .route("/get/multiple")
            .post((0, middlewares_1.exceptionHandler)(leetcodeauth_1.leetCodeAuthCheck), (0, middlewares_1.exceptionHandler)(controllers_1.ProblemController.multipleProblem));
        this.router
            .route("/get/single")
            .post((0, middlewares_1.exceptionHandler)(leetcodeauth_1.leetCodeAuthCheck), (0, middlewares_1.exceptionHandler)(controllers_1.ProblemController.singleProblem));
        this.router
            .route("/submit")
            .post((0, middlewares_1.exceptionHandler)(leetcodeauth_1.leetCodeAuthCheck), (0, middlewares_1.exceptionHandler)(controllers_1.ProblemController.submitProblem));
        this.router
            .route("/get/submission")
            .post((0, middlewares_1.exceptionHandler)(leetcodeauth_1.leetCodeAuthCheck), (0, middlewares_1.exceptionHandler)(controllers_1.ProblemController.getSubmissionDetails));
    }
}
exports.ProblemRouter = ProblemRouter;
//# sourceMappingURL=problemRoutes.js.map