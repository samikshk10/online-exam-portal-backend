// import { exceptionHandler } from "@src/middlewares";
import { leetCodeAuthCheck } from "../middlewares/leetcodeauth";
import { RouterClass } from "../classes";
import { ProblemController } from "../controllers";
import { exceptionHandler } from "../middlewares";
export class ProblemRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router
      .route("/get/multiple")
      .post(exceptionHandler(leetCodeAuthCheck), exceptionHandler(ProblemController.multipleProblem));
    this.router
      .route("/get/single")
      .post(exceptionHandler(leetCodeAuthCheck), exceptionHandler(ProblemController.singleProblem));
    this.router
      .route("/submit")
      .post(exceptionHandler(leetCodeAuthCheck), exceptionHandler(ProblemController.submitProblem));
    this.router
      .route("/get/submission")
      .post(exceptionHandler(leetCodeAuthCheck), exceptionHandler(ProblemController.getSubmissionDetails));
  }
}
