"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultController = void 0;
const exam_1 = __importDefault(require("../models/exam"));
const resultsModel_1 = __importDefault(require("../models/resultsModel"));
const user_1 = __importDefault(require("../models/user"));
const boom_1 = require("@hapi/boom");
const resultmailer_1 = require("../utils/nodemailer/resultmailer");
class ResultController {
    constructor() { }
    static async handleResultEvaluation(req, res, next) {
        try {
            const { fullScreenCount, highNoiseCount, outOfViewCount, attemptedQuestionCount, totalQuestionCount, examId, userId, easyDifficulty, mediumHardDifficulty, mcqCount, attemptedMcqCount, solvedMcqCount, } = req.body;
            const ExamData = await exam_1.default.findOne({ where: { id: examId } });
            if (!ExamData) {
                throw (0, boom_1.notFound)("Exam not found");
            }
            const UserData = await user_1.default.findOne({ where: { id: userId } });
            if (!UserData) {
                throw (0, boom_1.notFound)("User not found");
            }
            console.log(ExamData, UserData, "data>>>>>>>>>>>>>>>");
            let easyCodeQuestionMarks = 0, mediumHardCodeQuestionMarks = 0;
            console.log(easyDifficulty);
            if (easyDifficulty === true) {
                easyCodeQuestionMarks = ExamData.codeQuestionEasyMarks;
            }
            else if (mediumHardDifficulty === true) {
                mediumHardCodeQuestionMarks = ExamData.codeQuestionMediumHardMarks;
            }
            console.log(ExamData.mcqQuestionMarks, "ahsdkjlhf");
            const obtainedMarks = solvedMcqCount * ExamData.mcqQuestionMarks + easyCodeQuestionMarks + mediumHardCodeQuestionMarks;
            const totalMarks = ExamData.totalMarks;
            console.log(obtainedMarks, totalMarks, "marks>>>>>>>>>>>>>>>");
            const result = await resultsModel_1.default.create({
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
                throw (0, boom_1.conflict)("Result not evaluated");
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
            const mailSent = (0, resultmailer_1.sendEmail)(usersData, resultsData);
            if (!mailSent) {
                throw (0, boom_1.conflict)("Mail not sent");
            }
            res.status(200).json({ message: "Result evaluated successfully" });
        }
        catch (error) {
            console.log(error, "error>>>>>>>>>>>>>>>");
            next(error);
        }
    }
    static async getResult(req, res, next) {
        const { examId, userId } = req.body;
        let resultData = [];
        try {
            if (examId !== undefined && userId !== undefined) {
                // If both examId and userId are provided
                resultData = await resultsModel_1.default.findAll({
                    where: {
                        examId: examId,
                        userId: userId,
                    },
                    include: [
                        {
                            model: exam_1.default,
                        },
                    ],
                });
            }
            else if (examId !== undefined) {
                // If only examId is provided
                resultData = await resultsModel_1.default.findAll({
                    where: {
                        examId: examId,
                    },
                    include: [exam_1.default, user_1.default],
                });
            }
            else if (userId !== undefined) {
                // If only userId is provided
                resultData = await resultsModel_1.default.findAll({
                    where: {
                        userId: userId,
                    },
                    include: [exam_1.default, user_1.default],
                });
            }
            else {
                resultData = await resultsModel_1.default.findAll({
                    include: [exam_1.default, user_1.default],
                });
                if (resultData.length === 0) {
                    throw (0, boom_1.notFound)("Result not found");
                }
            }
            res.status(200).json({ data: resultData, message: "Result fetched successfully" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ResultController = ResultController;
//# sourceMappingURL=ResultController.js.map