"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("./userModel"));
const mcqQuestionsModel_1 = __importDefault(require("./mcqQuestionsModel"));
const Model = {
    User: userModel_1.default,
    MCQQuestion: mcqQuestionsModel_1.default,
};
exports.default = Model;
//# sourceMappingURL=index.js.map