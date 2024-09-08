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
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = __importStar(require("sequelize"));
const config_1 = require("../config");
const sequelize = config_1.Database.sequelize;
const Exams = sequelize.define("exams", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    examTitle: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    examDescription: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    mcqQuestionMarks: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    codeQuestionMediumHardMarks: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    codeQuestionEasyMarks: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    hasCodeQuestions: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    totalMarks: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
});
exports.default = Exams;
//# sourceMappingURL=exam.js.map