import CodeQuestion from "../models/codeQuestionsModel";
import Exams from "../models/exam";
import MCQQuestion from "../models/mcqQuestionsModel";
import { NextFunction, Request, Response } from "express";
import { Op, Sequelize } from "sequelize";

export class QuestionController {
  public constructor() {}

  public static async addMcqQuestions(req: Request, res: Response, next: NextFunction) {
    try {
      const { questions } = req.body;
      console.log(questions);

      const createdQuestions = await MCQQuestion.bulkCreate(questions);
      console.log(createdQuestions);
      const data = createdQuestions.map((question) => question.get());
      console.log(data);
      res.status(200).json({ data, message: "MCQ questions added successfully" });
    } catch (error) {
      next(error);
    }
  }

  public static async addCodeQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const { questions } = req.body;
      console.log(questions);

      const createdQuestions = await CodeQuestion.bulkCreate(questions);
      console.log(createdQuestions);
      const data = createdQuestions.map((question) => question.get());
      console.log(data);
      res.status(200).json({ data, message: "Code questions added successfully" });
    } catch (error) {
      console.log(error, "question add error>>>>>>>>>>>>>");
      next(error);
    }
  }

  public static async getRandomMCQQuestion() {
    const mcqQuestions = await MCQQuestion.findAll({ order: [Sequelize.fn("RANDOM")], limit: 25 });
    return mcqQuestions;
  }

  public static async getRandomEasyCodeQuestion() {
    let codeQuestions = await CodeQuestion.findAll({
      where: { difficulty: "EASY" },
      order: [Sequelize.fn("RANDOM")],
      limit: 1,
    });
    if (codeQuestions.length === 0) {
      codeQuestions = await CodeQuestion.findAll({
        where: {
          [Op.or]: [{ difficulty: "MEDIUM" }, { difficulty: "HARD" }],
        },
        order: [Sequelize.fn("RANDOM")],
        limit: 1,
      });
    }
    return codeQuestions;
  }

  public static async getRandomMediumOrHardCodeQuestion() {
    let codeQuestions = await CodeQuestion.findAll({
      where: {
        [Op.or]: [{ difficulty: "MEDIUM" }, { difficulty: "HARD" }],
      },
      order: [Sequelize.fn("RANDOM")],
      limit: 1,
    });

    if (codeQuestions.length === 0) {
      codeQuestions = await CodeQuestion.findAll({
        where: {
          difficulty: "EASY",
        },
        order: [Sequelize.fn("RANDOM")],
        limit: 1,
      });
    }

    return codeQuestions;
  }
  public static async getRandomQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const randomMCQQuestions = await QuestionController.getRandomMCQQuestion();

      const getExam = await Exams.findOne({ where: { id } });
      let questionCollection = [];

      if (getExam && getExam.hasCodeQuestions === true) {
        const randomEasyCodeQuestions = await QuestionController.getRandomEasyCodeQuestion();
        const randomMediumHardCodeQuestions = await QuestionController.getRandomMediumOrHardCodeQuestion();
        questionCollection = [...randomMCQQuestions, ...randomEasyCodeQuestions, ...randomMediumHardCodeQuestions];
      } else {
        questionCollection = [...randomMCQQuestions];
      }
      res.json({ questionCollection, message: "Questions fetched successfully" });
    } catch (error) {
      next(error);
    }
  }
}
