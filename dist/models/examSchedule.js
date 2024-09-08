"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = __importStar(require("sequelize"));
const exam_1 = __importDefault(require("./exam"));
const user_1 = __importDefault(require("./user"));
const config_1 = require("../config");
const sequelize = config_1.Database.sequelize;
const ExamSchedule = sequelize.define("exam_schedules", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    examId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "exams",
            key: "id",
        },
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    paranoid: false,
    underscored: true,
    freezeTableName: true,
});
// ExamSchedule Exam Relation
exam_1.default.hasMany(ExamSchedule, { foreignKey: "examId", as: "examSchedules" });
ExamSchedule.belongsTo(exam_1.default, { foreignKey: "examId" });
// User Exam Schedule Relation
user_1.default.hasMany(ExamSchedule, { foreignKey: "userId", as: "examScheduleUser" });
ExamSchedule.belongsTo(user_1.default, { foreignKey: "userId" });
exports.default = ExamSchedule;
//# sourceMappingURL=examSchedule.js.map