import { RouterClass } from "../classes";
import { QuestionController } from "../controllers";
import { exceptionHandler } from "../middlewares";

export class QuestionRouter extends RouterClass {
  constructor() {
    super();
  }

  public define(): void {
    this.router.route("/add/mcqquestions").post(exceptionHandler(QuestionController.addMcqQuestions));
    this.router.route("/add/codequestions").post(exceptionHandler(QuestionController.addCodeQuestion));
    this.router.route("/get/questioncollections/:id").get(exceptionHandler(QuestionController.getRandomQuestion));
  }
}
