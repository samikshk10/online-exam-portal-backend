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
const CodeQuestion = sequelize.define("codequestions", {
    id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    question: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    difficulty: {
        type: Sequelize.ENUM("EASY", "MEDIUM", "HARD"),
        defaultValue: "EASY",
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING,
        defaultValue: "code",
        allowNull: false,
    },
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
});
exports.default = CodeQuestion;
//# sourceMappingURL=codeQuestionsModel.js.map