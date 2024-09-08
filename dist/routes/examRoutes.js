"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamRouter = void 0;
const classes_1 = require("../classes");
const ExamController_1 = require("../controllers/ExamController");
const ResultController_1 = require("../controllers/ResultController");
const middlewares_1 = require("../middlewares");
// import { exceptionHandler } from "@src/middlewares";
class ExamRouter extends classes_1.RouterClass {
    constructor() {
        super();
    }
    define() {
        this.router.route("/add-exam").post((0, middlewares_1.exceptionHandler)(ExamController_1.ExamController.AddExam));
        this.router.route("/get-exam").get((0, middlewares_1.exceptionHandler)(ExamController_1.ExamController.GetExams));
        this.router.route("/schedule-exam").post((0, middlewares_1.exceptionHandler)(ExamController_1.ExamController.ScheduleExam));
        this.router.route("/unschedule-exam").post((0, middlewares_1.exceptionHandler)(ExamController_1.ExamController.UnScheduleExam));
        this.router.route("/login-exam").post((0, middlewares_1.exceptionHandler)(ExamController_1.ExamController.LoginExam));
        this.router.route("/results").post((0, middlewares_1.exceptionHandler)(ResultController_1.ResultController.handleResultEvaluation));
        this.router.route("/get-results").post((0, middlewares_1.exceptionHandler)(ResultController_1.ResultController.getResult));
        this.router.route("/get-dashboard-data").get((0, middlewares_1.exceptionHandler)(ExamController_1.ExamController.DashboardData));
    }
}
exports.ExamRouter = ExamRouter;
//# sourceMappingURL=examRoutes.js.map