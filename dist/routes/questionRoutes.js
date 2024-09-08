"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionRouter = void 0;
const classes_1 = require("../classes");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
class QuestionRouter extends classes_1.RouterClass {
    constructor() {
        super();
    }
    define() {
        this.router.route("/add/mcqquestions").post((0, middlewares_1.exceptionHandler)(controllers_1.QuestionController.addMcqQuestions));
        this.router.route("/add/codequestions").post((0, middlewares_1.exceptionHandler)(controllers_1.QuestionController.addCodeQuestion));
        this.router.route("/get/questioncollections/:id").get((0, middlewares_1.exceptionHandler)(controllers_1.QuestionController.getRandomQuestion));
    }
}
exports.QuestionRouter = QuestionRouter;
//# sourceMappingURL=questionRoutes.js.map