"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const codeQuestionsModel_1 = __importDefault(require("../models/codeQuestionsModel"));
const exam_1 = __importDefault(require("../models/exam"));
const mcqQuestionsModel_1 = __importDefault(require("../models/mcqQuestionsModel"));
const sequelize_1 = require("sequelize");
class QuestionController {
    constructor() { }
    static async addMcqQuestions(req, res, next) {
        try {
            const { questions } = req.body;
            console.log(questions);
            const createdQuestions = await mcqQuestionsModel_1.default.bulkCreate(questions);
            console.log(createdQuestions);
            const data = createdQuestions.map((question) => question.get());
            console.log(data);
            res.status(200).json({ data, message: "MCQ questions added successfully" });
        }
        catch (error) {
            next(error);
        }
    }
    static async addCodeQuestion(req, res, next) {
        try {
            const { questions } = req.body;
            console.log(questions);
            const createdQuestions = await codeQuestionsModel_1.default.bulkCreate(questions);
            console.log(createdQuestions);
            const data = createdQuestions.map((question) => question.get());
            console.log(data);
            res.status(200).json({ data, message: "Code questions added successfully" });
        }
        catch (error) {
            console.log(error, "question add error>>>>>>>>>>>>>");
            next(error);
        }
    }
    static async getRandomMCQQuestion() {
        const mcqQuestions = await mcqQuestionsModel_1.default.findAll({ order: [sequelize_1.Sequelize.fn("RANDOM")], limit: 25 });
        return mcqQuestions;
    }
    static async getRandomEasyCodeQuestion() {
        let codeQuestions = await codeQuestionsModel_1.default.findAll({
            where: { difficulty: "EASY" },
            order: [sequelize_1.Sequelize.fn("RANDOM")],
            limit: 1,
        });
        if (codeQuestions.length === 0) {
            codeQuestions = await codeQuestionsModel_1.default.findAll({
                where: {
                    [sequelize_1.Op.or]: [{ difficulty: "MEDIUM" }, { difficulty: "HARD" }],
                },
                order: [sequelize_1.Sequelize.fn("RANDOM")],
                limit: 1,
            });
        }
        return codeQuestions;
    }
    static async getRandomMediumOrHardCodeQuestion() {
        let codeQuestions = await codeQuestionsModel_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [{ difficulty: "MEDIUM" }, { difficulty: "HARD" }],
            },
            order: [sequelize_1.Sequelize.fn("RANDOM")],
            limit: 1,
        });
        if (codeQuestions.length === 0) {
            codeQuestions = await codeQuestionsModel_1.default.findAll({
                where: {
                    difficulty: "EASY",
                },
                order: [sequelize_1.Sequelize.fn("RANDOM")],
                limit: 1,
            });
        }
        return codeQuestions;
    }
    static async getRandomQuestion(req, res, next) {
        try {
            const { id } = req.params;
            const randomMCQQuestions = await QuestionController.getRandomMCQQuestion();
            const getExam = await exam_1.default.findOne({ where: { id } });
            let questionCollection = [];
            if (getExam && getExam.hasCodeQuestions === true) {
                const randomEasyCodeQuestions = await QuestionController.getRandomEasyCodeQuestion();
                const randomMediumHardCodeQuestions = await QuestionController.getRandomMediumOrHardCodeQuestion();
                questionCollection = [...randomMCQQuestions, ...randomEasyCodeQuestions, ...randomMediumHardCodeQuestions];
            }
            else {
                questionCollection = [...randomMCQQuestions];
            }
            res.json({ questionCollection, message: "Questions fetched successfully" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.QuestionController = QuestionController;
//# sourceMappingURL=QuestionController.js.map