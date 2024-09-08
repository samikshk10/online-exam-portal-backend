import { RouterClass } from "../classes";
import { ExamController } from "../controllers/ExamController";
import { ResultController } from "../controllers/ResultController";
import { exceptionHandler } from "../middlewares";

// import { exceptionHandler } from "@src/middlewares";
export class ExamRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router.route("/add-exam").post(exceptionHandler(ExamController.AddExam));
    this.router.route("/get-exam").get(exceptionHandler(ExamController.GetExams));
    this.router.route("/schedule-exam").post(exceptionHandler(ExamController.ScheduleExam));
    this.router.route("/unschedule-exam").post(exceptionHandler(ExamController.UnScheduleExam));
    this.router.route("/login-exam").post(exceptionHandler(ExamController.LoginExam));
    this.router.route("/results").post(exceptionHandler(ResultController.handleResultEvaluation));
    this.router.route("/get-results").post(exceptionHandler(ResultController.getResult));
    this.router.route("/get-dashboard-data").get(exceptionHandler(ExamController.DashboardData));
  }
}
