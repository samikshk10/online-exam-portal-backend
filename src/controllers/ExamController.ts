import CodeQuestion from "../models/codeQuestionsModel";
import ExamSchedule from "../models/examSchedule";
import Exams from "../models/exam";
import MCQQuestion from "../models/mcqQuestionsModel";
import User from "../models/user";
import e, { NextFunction, Request, Response } from "express";
import { conflict } from "@hapi/boom";
import { UserInterface } from "@src/interfaces";
import { create } from "axios";
import { generate } from "generate-password";
import { sign, verify } from "jsonwebtoken";
import { sendEmail } from "../utils/nodemailer/mailer";

export class ExamController {
  public constructor() { }

  public static async LoginExam(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, token } = req.body;
      const user = await User.findOne({ where: { email } });
      console.log("this is user", user);
      if (!user) {
        throw conflict("User not found");
      }
      if (user.role !== "USER") {
        throw conflict("User not authorized to login");
      }
      if (user.status !== "ACTIVE") {
        throw conflict("User is not active");
      }

      const verifyToken = await verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
        if (err) {
          throw conflict("Token Expired");
        } else {
          return decoded;
        }
      });

      console.log("this is verify token", verifyToken);

      if (verifyToken.email !== email) {
        throw conflict("Invalid credential for this token");
      }
      console.log(verifyToken);

      const examSchedule = await ExamSchedule.findOne({
        where: { userId: user.id, password, examId: verifyToken.examId },
      });

      if (!examSchedule) {
        throw conflict("Invalid credentials or exam might be unscheduled");
      }

      if (examSchedule.active === false) {
        throw conflict("Exam is not active");
      }
      const data = {
        examId: verifyToken.examId,
        userId: user.id,
      };

      res.status(200).json({
        data,
        message: "User logged in successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  public static async ViewParticipants(req: Request, res: Response, next: NextFunction) {
    try {
      const { examId } = req.body;
      const examData = await ExamSchedule.findOne({ where: { examId } });
      if (!examData) {
        throw conflict("No Exam Found");
      }
      const participants = await ExamSchedule.findAll({
        where: { examId },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "fullName", "email"],
          },
        ],
      });

      if (!participants) {
        throw conflict("No participants found");
      }

      return res.status(200).json({ data: participants, message: "Participants fetched successfully" });
    }
    catch (error: any) {
      next(error);
    }
  }

  public static async AddExam(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        examTitle,
        examDescription,
        mcqQuestionMarks,
        codeQuestionEasyMarks,
        codeQuestionMediumHardMarks,
        hasCodeQuestions,
      } = req.body;

      console.log("this is req.body", req.body);
      const data = {
        examTitle,
        examDescription,
        mcqQuestionMarks,
        codeQuestionEasyMarks,
        codeQuestionMediumHardMarks,
        hasCodeQuestions,
        totalMarks: mcqQuestionMarks * 25 + codeQuestionEasyMarks + codeQuestionMediumHardMarks,
      };
      const createdExamData = await Exams.create(data);
      if (createdExamData) {
        res.status(200).json({ data: createdExamData, message: "Exams added successfully" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  public static async ScheduleExam(req: Request, res: Response, next: NextFunction) {
    try {
      const { examId } = req.body;

      const getUsers = await User.findAll({ where: { status: "ACTIVE", role: "USER" } });

      if (getUsers.length === 0) {
        throw conflict("No active users found");
      }

      const findExam = await Exams.findOne({ where: { id: examId } });
      if (!findExam) {
        throw conflict("No exam found");
      }

      getUsers.map(async (user) => {
        const schedule = await ExamSchedule.create({
          examId,
          userId: user.id,
          password: generate({ length: 8, numbers: true }),
        });
        console.log("this is schedle", schedule);
        const userData = {
          email: user.email,
          fullName: user.fullName,
          id: user.id,
        };

        const scheduleData = {
          password: schedule.password,
        };
        const payload = {
          email: user.email,
          examId,
          userId: user.id,
        };

        const token = await sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

        //send mail to user
        sendEmail(userData, scheduleData, token);
      });
      res.status(200).json({ message: "Exam scheduled successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public static async UnScheduleExam(req: Request, res: Response, next: NextFunction) {
    try {
      const { examId } = req.body;

      const deletedCount = await ExamSchedule.destroy({ where: { examId } });
      console.log("thios is deleted count", deletedCount);
      if (deletedCount > 0) {
        res.status(200).json({ message: "Exam unscheduled successfully" });
      } else {
        throw conflict("No exam found to unschedule");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public static async GetExams(req: Request, res: Response, next: NextFunction) {
    try {
      const examData = await Exams.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: ExamSchedule,
            as: "examSchedules",
            attributes: ["id"],
          },
        ],
      });

      if (examData) {
        const examsWithScheduleCheck = examData.map((exam) => ({
          ...exam.toJSON(),
          existScheduleExam: exam?.examSchedules.length > 0,
        }));

        res.status(200).json({ data: examsWithScheduleCheck, message: "Exams fetched successfully" });
      }
    } catch (error) {
      next(error);
    }
  }

  public static async DashboardData(req: Request, res: Response, next: NextFunction) {
    try {
      const totalUser = await User.count({ where: { role: "USER" } });
      const totalAdmin = await User.count({ where: { role: "ADMIN" } });
      const totalExam = await Exams.count();
      const totalScheduledExam = await ExamSchedule.count({ where: { active: true } });
      const totalMCQquestions = await MCQQuestion.count();
      const totalCodeQuestions = await CodeQuestion.count();

      res.status(200).json({
        data: {
          totalExaminee: totalUser,
          totalAdmin,
          totalExam,
          totalScheduledExam,
          totalMCQquestions,
          totalCodeQuestions,
        },
        message: "Dashboard data fetched successfully",
      });
    } catch (error: any) {
      next(error);
    }
  }
}
