import Exams from "../models/exam";
import Results from "../models/resultsModel";
import User from "../models/user";
import { conflict, notFound } from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
import { sendEmail } from "../utils/nodemailer/resultmailer";

export class ResultController {
  public constructor() {}

  public static async handleResultEvaluation(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        fullScreenCount,
        highNoiseCount,
        outOfViewCount,
        attemptedQuestionCount,
        totalQuestionCount,
        examId,
        userId,
        easyDifficulty,
        mediumHardDifficulty,
        mcqCount,
        attemptedMcqCount,
        solvedMcqCount,
      } = req.body;
      const ExamData = await Exams.findOne({ where: { id: examId } });
      if (!ExamData) {
        throw notFound("Exam not found");
      }
      const UserData = await User.findOne({ where: { id: userId } });
      if (!UserData) {
        throw notFound("User not found");
      }
      console.log(ExamData, UserData, "data>>>>>>>>>>>>>>>");
      let easyCodeQuestionMarks = 0,
        mediumHardCodeQuestionMarks = 0;
      console.log(easyDifficulty);
      if (easyDifficulty === true) {
        easyCodeQuestionMarks = ExamData.codeQuestionEasyMarks;
      } else if (mediumHardDifficulty === true) {
        mediumHardCodeQuestionMarks = ExamData.codeQuestionMediumHardMarks;
      }
      console.log(ExamData.mcqQuestionMarks, "ahsdkjlhf");
      const obtainedMarks =
        solvedMcqCount * ExamData.mcqQuestionMarks + easyCodeQuestionMarks + mediumHardCodeQuestionMarks;
      const totalMarks = ExamData.totalMarks;

      console.log(obtainedMarks, totalMarks, "marks>>>>>>>>>>>>>>>");

      const result = await Results.create({
        fullScreenCount: fullScreenCount,
        highNoiseCount: highNoiseCount,
        outOfViewCount: outOfViewCount,
        attemptedQuestionCount: attemptedQuestionCount,
        obtainedMarks: obtainedMarks,
        totalMarks: totalMarks,
        examId: examId,
        userId: userId,
      });
      console.log("thi sis result", result);
      if (!result) {
        throw conflict("Result not evaluated");
      }

      const usersData = {
        fullName: UserData?.fullName,
        email: UserData?.email,
      };

      const resultsData = {
        attemptedMcqCount: attemptedMcqCount,
        EasyCodeQuestionSolved: easyDifficulty ? 1 : null,
        mediumHardCodeQuestionSolved: mediumHardDifficulty ? 1 : null,
        obtainedMarks: obtainedMarks,
        totalMarks: totalMarks,
        attemptedQuestionCount: attemptedQuestionCount,
        totalQuestionCount: totalQuestionCount,
      };

      const mailSent = sendEmail(usersData, resultsData);
      if (!mailSent) {
        throw conflict("Mail not sent");
      }

      res.status(200).json({ message: "Result evaluated successfully" });
    } catch (error) {
      console.log(error, "error>>>>>>>>>>>>>>>");
      next(error);
    }
  }

  public static async getResult(req: Request, res: Response, next: NextFunction) {
    const { examId, userId } = req.body;
    let resultData = [];

    try {
      if (examId !== undefined && userId !== undefined) {
        // If both examId and userId are provided
        resultData = await Results.findAll({
          where: {
            examId: examId,
            userId: userId,
          },
          include: [
            {
              model: Exams,
            },
          ],
        });
      } else if (examId !== undefined) {
        // If only examId is provided
        resultData = await Results.findAll({
          where: {
            examId: examId,
          },
          include: [Exams, User],
        });
      } else if (userId !== undefined) {
        // If only userId is provided
        resultData = await Results.findAll({
          where: {
            userId: userId,
          },
          include: [Exams, User],
        });
      } else {
        resultData = await Results.findAll({
          include: [Exams, User],
        });

        if (resultData.length === 0) {
          throw notFound("Result not found");
        }
      }
      res.status(200).json({ data: resultData, message: "Result fetched successfully" });
    } catch (error) {
      next(error);
    }
  }
}
