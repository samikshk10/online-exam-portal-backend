"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamController = void 0;
const codeQuestionsModel_1 = __importDefault(require("../models/codeQuestionsModel"));
const examSchedule_1 = __importDefault(require("../models/examSchedule"));
const exam_1 = __importDefault(require("../models/exam"));
const mcqQuestionsModel_1 = __importDefault(require("../models/mcqQuestionsModel"));
const user_1 = __importDefault(require("../models/user"));
const boom_1 = require("@hapi/boom");
const generate_password_1 = require("generate-password");
const jsonwebtoken_1 = require("jsonwebtoken");
const mailer_1 = require("../utils/nodemailer/mailer");
class ExamController {
    constructor() { }
    static async LoginExam(req, res, next) {
        try {
            const { email, password, token } = req.body;
            const user = await user_1.default.findOne({ where: { email } });
            console.log("this is user", user);
            if (!user) {
                throw (0, boom_1.conflict)("User not found");
            }
            if (user.role !== "USER") {
                throw (0, boom_1.conflict)("User not authorized to login");
            }
            if (user.status !== "ACTIVE") {
                throw (0, boom_1.conflict)("User is not active");
            }
            const verifyToken = await (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
                if (err) {
                    throw (0, boom_1.conflict)("Token Expired");
                }
                else {
                    return decoded;
                }
            });
            console.log("this is verify token", verifyToken);
            if (verifyToken.email !== email) {
                throw (0, boom_1.conflict)("Invalid credential for this token");
            }
            console.log(verifyToken);
            const examSchedule = await examSchedule_1.default.findOne({
                where: { userId: user.id, password, examId: verifyToken.examId },
            });
            if (!examSchedule) {
                throw (0, boom_1.conflict)("Invalid credentials or exam might be unscheduled");
            }
            if (examSchedule.active === false) {
                throw (0, boom_1.conflict)("Exam is not active");
            }
            const data = {
                examId: verifyToken.examId,
                userId: user.id,
            };
            res.status(200).json({
                data,
                message: "User logged in successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async ViewParticipants(req, res, next) {
        try {
            const { examId } = req.body;
            const examData = await examSchedule_1.default.findOne({ where: { examId } });
            if (!examData) {
                throw (0, boom_1.conflict)("No Exam Found");
            }
            const participants = await examSchedule_1.default.findAll({
                where: { examId },
                include: [
                    {
                        model: user_1.default,
                        as: "user",
                        attributes: ["id", "fullName", "email"],
                    },
                ],
            });
            if (!participants) {
                throw (0, boom_1.conflict)("No participants found");
            }
            return res.status(200).json({ data: participants, message: "Participants fetched successfully" });
        }
        catch (error) {
            next(error);
        }
    }
    static async AddExam(req, res, next) {
        try {
            const { examTitle, examDescription, mcqQuestionMarks, codeQuestionEasyMarks, codeQuestionMediumHardMarks, hasCodeQuestions, } = req.body;
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
            const createdExamData = await exam_1.default.create(data);
            if (createdExamData) {
                res.status(200).json({ data: createdExamData, message: "Exams added successfully" });
            }
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async ScheduleExam(req, res, next) {
        try {
            const { examId } = req.body;
            const getUsers = await user_1.default.findAll({ where: { status: "ACTIVE", role: "USER" } });
            if (getUsers.length === 0) {
                throw (0, boom_1.conflict)("No active users found");
            }
            const findExam = await exam_1.default.findOne({ where: { id: examId } });
            if (!findExam) {
                throw (0, boom_1.conflict)("No exam found");
            }
            getUsers.map(async (user) => {
                const schedule = await examSchedule_1.default.create({
                    examId,
                    userId: user.id,
                    password: (0, generate_password_1.generate)({ length: 8, numbers: true }),
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
                const token = await (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
                //send mail to user
                (0, mailer_1.sendEmail)(userData, scheduleData, token);
            });
            res.status(200).json({ message: "Exam scheduled successfully" });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async UnScheduleExam(req, res, next) {
        try {
            const { examId } = req.body;
            const deletedCount = await examSchedule_1.default.destroy({ where: { examId } });
            console.log("thios is deleted count", deletedCount);
            if (deletedCount > 0) {
                res.status(200).json({ message: "Exam unscheduled successfully" });
            }
            else {
                throw (0, boom_1.conflict)("No exam found to unschedule");
            }
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async GetExams(req, res, next) {
        try {
            const examData = await exam_1.default.findAll({
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: examSchedule_1.default,
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
        }
        catch (error) {
            next(error);
        }
    }
    static async DashboardData(req, res, next) {
        try {
            const totalUser = await user_1.default.count({ where: { role: "USER" } });
            const totalAdmin = await user_1.default.count({ where: { role: "ADMIN" } });
            const totalExam = await exam_1.default.count();
            const totalScheduledExam = await examSchedule_1.default.count({ where: { active: true } });
            const totalMCQquestions = await mcqQuestionsModel_1.default.count();
            const totalCodeQuestions = await codeQuestionsModel_1.default.count();
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
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ExamController = ExamController;
//# sourceMappingURL=ExamController.js.map