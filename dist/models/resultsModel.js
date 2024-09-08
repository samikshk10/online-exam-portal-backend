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
const Results = sequelize.define("results", {
    id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    fullScreenCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    highNoiseCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    outOfViewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    attemptedQuestionCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    obtainedMarks: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true,
    },
    totalMarks: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true,
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
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
});
user_1.default.hasMany(Results, { foreignKey: "userId", as: "users" });
Results.belongsTo(user_1.default, { foreignKey: "userId" });
exam_1.default.hasMany(Results, { foreignKey: "userId", as: "exams" });
Results.belongsTo(exam_1.default, { foreignKey: "examId" });
exports.default = Results;
//# sourceMappingURL=resultsModel.js.map